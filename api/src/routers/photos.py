"""Photo upload router — streams files to MinIO, returns presigned URLs."""

from __future__ import annotations

import uuid
from typing import Any

from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile, status
from minio import Minio
from minio.error import S3Error
from sqlalchemy.ext.asyncio import AsyncSession

from src.auth import get_current_user_claims
from src.config import settings
from src.database import get_db
from src.models.inspection import Inspection, InspectionPhoto
from src.schemas.inspection import InspectionPhotoRead

router = APIRouter(prefix="/photos", tags=["photos"])


def _get_minio_client() -> Minio:
    return Minio(
        endpoint=settings.MINIO_ENDPOINT,
        access_key=settings.MINIO_ACCESS_KEY,
        secret_key=settings.MINIO_SECRET_KEY,
        secure=settings.MINIO_SECURE,
    )


def _build_presigned_url(storage_key: str) -> str:
    """Build a presigned URL for reading a photo from MinIO."""
    from datetime import timedelta

    client = _get_minio_client()
    try:
        url = client.presigned_get_object(
            settings.MINIO_BUCKET_PHOTOS,
            storage_key,
            expires=timedelta(hours=1),
        )
        # If MINIO_PUBLIC_URL differs from MINIO_ENDPOINT, rewrite the host
        if settings.MINIO_PUBLIC_URL and settings.MINIO_PUBLIC_URL != f"http://{settings.MINIO_ENDPOINT}":
            internal_base = f"http://{settings.MINIO_ENDPOINT}"
            url = url.replace(internal_base, settings.MINIO_PUBLIC_URL, 1)
        return url
    except S3Error:
        return ""


@router.post(
    "/upload",
    response_model=InspectionPhotoRead,
    status_code=status.HTTP_201_CREATED,
    summary="Upload a photo to MinIO and record it against an inspection",
)
async def upload_photo(
    inspection_id: uuid.UUID = Form(...),
    item_id: uuid.UUID | None = Form(default=None),
    caption: str | None = Form(default=None),
    file: UploadFile = File(...),
    db: AsyncSession = Depends(get_db),
    _: dict[str, Any] = Depends(get_current_user_claims),
) -> InspectionPhoto:
    # Verify the inspection exists
    inspection = await db.get(Inspection, inspection_id)
    if inspection is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Inspection not found")

    content_type = file.content_type or "application/octet-stream"
    extension = (file.filename or "photo.jpg").rsplit(".", 1)[-1].lower()
    photo_id = uuid.uuid4()
    storage_key = f"inspections/{inspection_id}/{photo_id}.{extension}"

    # Read file content
    file_bytes = await file.read()
    file_size = len(file_bytes)

    # Upload to MinIO
    import io

    client = _get_minio_client()
    try:
        client.put_object(
            bucket_name=settings.MINIO_BUCKET_PHOTOS,
            object_name=storage_key,
            data=io.BytesIO(file_bytes),
            length=file_size,
            content_type=content_type,
        )
    except S3Error as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Failed to upload file to storage: {exc}",
        ) from exc

    photo = InspectionPhoto(
        id=photo_id,
        inspection_id=inspection_id,
        item_id=item_id,
        storage_key=storage_key,
        original_filename=file.filename,
        content_type=content_type,
        file_size_bytes=file_size,
        caption=caption,
    )
    db.add(photo)
    await db.flush()
    await db.refresh(photo)
    return photo


@router.get(
    "/{photo_id}/url",
    summary="Get a fresh presigned URL for a photo",
)
async def get_presigned_url(
    photo_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    _: dict[str, Any] = Depends(get_current_user_claims),
) -> dict[str, str]:
    photo = await db.get(InspectionPhoto, photo_id)
    if photo is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Photo not found")
    url = _build_presigned_url(photo.storage_key)
    return {"url": url}


@router.delete("/{photo_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_photo(
    photo_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    _: dict[str, Any] = Depends(get_current_user_claims),
) -> None:
    photo = await db.get(InspectionPhoto, photo_id)
    if photo is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Photo not found")
    # Remove from MinIO
    client = _get_minio_client()
    try:
        client.remove_object(settings.MINIO_BUCKET_PHOTOS, photo.storage_key)
    except S3Error:
        pass  # Log and continue — DB record should still be removed
    await db.delete(photo)

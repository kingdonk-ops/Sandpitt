"""Reports router — stub for PDF generation."""

from __future__ import annotations

import uuid
from typing import Any

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from sqlalchemy import select

from src.auth import get_current_user_claims
from src.database import get_db
from src.models.inspection import Inspection, InspectionItem

router = APIRouter(prefix="/reports", tags=["reports"])


@router.get(
    "/inspections/{inspection_id}/pdf",
    summary="Generate a PDF report for an inspection (stub)",
    responses={
        200: {"content": {"application/pdf": {}}, "description": "PDF report"},
    },
)
async def generate_inspection_pdf(
    inspection_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    _: dict[str, Any] = Depends(get_current_user_claims),
) -> JSONResponse:
    """
    Stub endpoint for PDF report generation.

    In a production implementation this would:
    1. Fetch the full inspection with items and photos.
    2. Render an HTML template (Jinja2) with the data.
    3. Convert to PDF using WeasyPrint or a headless browser.
    4. Stream the PDF back (or upload to MinIO and return a presigned URL).
    """
    result = await db.execute(
        select(Inspection)
        .where(Inspection.id == inspection_id)
        .options(
            selectinload(Inspection.items).selectinload(InspectionItem.photos),
            selectinload(Inspection.photos),
            selectinload(Inspection.site),
            selectinload(Inspection.asset),
            selectinload(Inspection.inspector),
        )
    )
    inspection = result.scalar_one_or_none()
    if inspection is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Inspection not found")

    # TODO: Replace with real PDF generation
    return JSONResponse(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        content={
            "detail": "PDF generation not yet implemented",
            "inspection_id": str(inspection_id),
            "inspection_title": inspection.title,
            "status": inspection.status.value,
            "items_count": len(inspection.items),
            "photos_count": len(inspection.photos),
        },
    )


@router.get(
    "/summary",
    summary="Get inspection summary statistics",
)
async def get_summary(
    db: AsyncSession = Depends(get_db),
    _: dict[str, Any] = Depends(get_current_user_claims),
) -> dict[str, Any]:
    """Return aggregate counts per status for dashboard widgets."""
    from sqlalchemy import func
    from src.models.inspection import InspectionStatus

    result = await db.execute(
        select(Inspection.status, func.count(Inspection.id))
        .group_by(Inspection.status)
    )
    rows = result.all()
    counts = {row[0].value: row[1] for row in rows}

    # Ensure all statuses present
    for s in InspectionStatus:
        counts.setdefault(s.value, 0)

    return {
        "by_status": counts,
        "total": sum(counts.values()),
    }

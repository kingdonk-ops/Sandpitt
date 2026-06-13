"""Inspections CRUD router — create, read, update, submit, list by status."""

from __future__ import annotations

import uuid
from datetime import datetime, timezone
from typing import Any

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from src.auth import get_current_user_claims
from src.database import get_db
from src.models.inspection import Inspection, InspectionItem, InspectionStatus
from src.schemas.inspection import (
    InspectionCreate,
    InspectionListItem,
    InspectionRead,
    InspectionSubmit,
    InspectionUpdate,
    InspectionItemCreate,
    InspectionItemRead,
    InspectionItemUpdate,
)

router = APIRouter(prefix="/inspections", tags=["inspections"])

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

_LOAD_FULL = [
    selectinload(Inspection.items).selectinload(InspectionItem.photos),
    selectinload(Inspection.photos),
]


async def _get_inspection_or_404(db: AsyncSession, inspection_id: uuid.UUID) -> Inspection:
    result = await db.execute(
        select(Inspection)
        .where(Inspection.id == inspection_id)
        .options(*_LOAD_FULL)
    )
    inspection = result.scalar_one_or_none()
    if inspection is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Inspection not found")
    return inspection


# ---------------------------------------------------------------------------
# Inspection endpoints
# ---------------------------------------------------------------------------


@router.get("", response_model=list[InspectionListItem])
async def list_inspections(
    status_filter: InspectionStatus | None = Query(default=None, alias="status"),
    site_id: uuid.UUID | None = Query(default=None),
    inspector_id: uuid.UUID | None = Query(default=None),
    limit: int = Query(default=50, le=200),
    offset: int = Query(default=0, ge=0),
    db: AsyncSession = Depends(get_db),
    _: dict[str, Any] = Depends(get_current_user_claims),
) -> list[Inspection]:
    q = select(Inspection).order_by(Inspection.created_at.desc()).limit(limit).offset(offset)
    if status_filter is not None:
        q = q.where(Inspection.status == status_filter)
    if site_id is not None:
        q = q.where(Inspection.site_id == site_id)
    if inspector_id is not None:
        q = q.where(Inspection.inspector_id == inspector_id)
    result = await db.execute(q)
    return list(result.scalars().all())


@router.post("", response_model=InspectionRead, status_code=status.HTTP_201_CREATED)
async def create_inspection(
    body: InspectionCreate,
    db: AsyncSession = Depends(get_db),
    _: dict[str, Any] = Depends(get_current_user_claims),
) -> Inspection:
    items_data = body.items
    inspection_data = body.model_dump(exclude={"items"})
    inspection = Inspection(**inspection_data)
    db.add(inspection)
    await db.flush()  # Get the inspection.id

    for idx, item_data in enumerate(items_data):
        item = InspectionItem(
            inspection_id=inspection.id,
            order_index=idx,
            **item_data.model_dump(),
        )
        db.add(item)

    await db.flush()

    # Re-fetch with eager loads
    return await _get_inspection_or_404(db, inspection.id)


@router.get("/{inspection_id}", response_model=InspectionRead)
async def get_inspection(
    inspection_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    _: dict[str, Any] = Depends(get_current_user_claims),
) -> Inspection:
    return await _get_inspection_or_404(db, inspection_id)


@router.patch("/{inspection_id}", response_model=InspectionRead)
async def update_inspection(
    inspection_id: uuid.UUID,
    body: InspectionUpdate,
    db: AsyncSession = Depends(get_db),
    _: dict[str, Any] = Depends(get_current_user_claims),
) -> Inspection:
    inspection = await _get_inspection_or_404(db, inspection_id)
    for key, value in body.model_dump(exclude_unset=True).items():
        setattr(inspection, key, value)
    # If status transitions to in_progress and started_at is not set
    if body.status == InspectionStatus.in_progress and inspection.started_at is None:
        inspection.started_at = datetime.now(tz=timezone.utc)
    await db.flush()
    await db.refresh(inspection)
    return await _get_inspection_or_404(db, inspection_id)


@router.post("/{inspection_id}/submit", response_model=InspectionRead)
async def submit_inspection(
    inspection_id: uuid.UUID,
    body: InspectionSubmit,
    db: AsyncSession = Depends(get_db),
    _: dict[str, Any] = Depends(get_current_user_claims),
) -> Inspection:
    """Transition an in-progress inspection to pending_review."""
    inspection = await _get_inspection_or_404(db, inspection_id)
    if inspection.status != InspectionStatus.in_progress:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Cannot submit inspection with status '{inspection.status.value}'",
        )
    inspection.status = InspectionStatus.pending_review
    inspection.submitted_at = datetime.now(tz=timezone.utc)
    if body.notes:
        inspection.notes = body.notes
    await db.flush()
    return await _get_inspection_or_404(db, inspection_id)


@router.post("/{inspection_id}/complete", response_model=InspectionRead)
async def complete_inspection(
    inspection_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    _: dict[str, Any] = Depends(get_current_user_claims),
) -> Inspection:
    """Transition a pending_review inspection to completed (supervisor action)."""
    inspection = await _get_inspection_or_404(db, inspection_id)
    if inspection.status != InspectionStatus.pending_review:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Cannot complete inspection with status '{inspection.status.value}'",
        )
    inspection.status = InspectionStatus.completed
    inspection.completed_at = datetime.now(tz=timezone.utc)
    await db.flush()
    return await _get_inspection_or_404(db, inspection_id)


@router.post("/{inspection_id}/cancel", response_model=InspectionRead)
async def cancel_inspection(
    inspection_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    _: dict[str, Any] = Depends(get_current_user_claims),
) -> Inspection:
    """Cancel an inspection that has not yet been completed."""
    inspection = await _get_inspection_or_404(db, inspection_id)
    if inspection.status == InspectionStatus.completed:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Cannot cancel a completed inspection",
        )
    inspection.status = InspectionStatus.cancelled
    await db.flush()
    return await _get_inspection_or_404(db, inspection_id)


@router.delete("/{inspection_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_inspection(
    inspection_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    _: dict[str, Any] = Depends(get_current_user_claims),
) -> None:
    inspection = await db.get(Inspection, inspection_id)
    if inspection is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Inspection not found")
    await db.delete(inspection)


# ---------------------------------------------------------------------------
# Inspection Item endpoints (nested under inspection)
# ---------------------------------------------------------------------------


@router.post(
    "/{inspection_id}/items",
    response_model=InspectionItemRead,
    status_code=status.HTTP_201_CREATED,
)
async def add_item(
    inspection_id: uuid.UUID,
    body: InspectionItemCreate,
    db: AsyncSession = Depends(get_db),
    _: dict[str, Any] = Depends(get_current_user_claims),
) -> InspectionItem:
    inspection = await db.get(Inspection, inspection_id)
    if inspection is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Inspection not found")
    item = InspectionItem(inspection_id=inspection_id, **body.model_dump())
    db.add(item)
    await db.flush()
    await db.refresh(item)
    return item


@router.patch(
    "/{inspection_id}/items/{item_id}",
    response_model=InspectionItemRead,
)
async def update_item(
    inspection_id: uuid.UUID,
    item_id: uuid.UUID,
    body: InspectionItemUpdate,
    db: AsyncSession = Depends(get_db),
    _: dict[str, Any] = Depends(get_current_user_claims),
) -> InspectionItem:
    result = await db.execute(
        select(InspectionItem)
        .where(InspectionItem.id == item_id, InspectionItem.inspection_id == inspection_id)
        .options(selectinload(InspectionItem.photos))
    )
    item = result.scalar_one_or_none()
    if item is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found")
    for key, value in body.model_dump(exclude_unset=True).items():
        setattr(item, key, value)
    await db.flush()
    await db.refresh(item)
    return item

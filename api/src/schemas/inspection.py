"""Inspection, InspectionItem, and InspectionPhoto schemas."""

from __future__ import annotations

from datetime import datetime
from uuid import UUID

from src.models.inspection import InspectionItemResult, InspectionStatus
from src.schemas.common import BaseSchema, TimestampSchema


# ---------------------------------------------------------------------------
# InspectionPhoto
# ---------------------------------------------------------------------------


class InspectionPhotoBase(BaseSchema):
    storage_key: str
    original_filename: str | None = None
    content_type: str = "image/jpeg"
    file_size_bytes: int | None = None
    caption: str | None = None


class InspectionPhotoRead(InspectionPhotoBase, TimestampSchema):
    id: UUID
    inspection_id: UUID
    item_id: UUID | None = None
    presigned_url: str | None = None


# ---------------------------------------------------------------------------
# InspectionItem
# ---------------------------------------------------------------------------


class InspectionItemBase(BaseSchema):
    order_index: int = 0
    question: str
    result: InspectionItemResult = InspectionItemResult.pending
    notes: str | None = None


class InspectionItemCreate(InspectionItemBase):
    pass


class InspectionItemUpdate(BaseSchema):
    result: InspectionItemResult | None = None
    notes: str | None = None


class InspectionItemRead(InspectionItemBase, TimestampSchema):
    id: UUID
    inspection_id: UUID
    photos: list[InspectionPhotoRead] = []


# ---------------------------------------------------------------------------
# Inspection
# ---------------------------------------------------------------------------


class InspectionBase(BaseSchema):
    title: str
    reference_number: str | None = None
    site_id: UUID
    asset_id: UUID | None = None
    inspector_id: UUID | None = None
    scheduled_at: datetime | None = None
    notes: str | None = None


class InspectionCreate(InspectionBase):
    items: list[InspectionItemCreate] = []


class InspectionUpdate(BaseSchema):
    title: str | None = None
    status: InspectionStatus | None = None
    asset_id: UUID | None = None
    inspector_id: UUID | None = None
    scheduled_at: datetime | None = None
    notes: str | None = None


class InspectionRead(InspectionBase, TimestampSchema):
    id: UUID
    status: InspectionStatus
    started_at: datetime | None = None
    submitted_at: datetime | None = None
    completed_at: datetime | None = None
    items: list[InspectionItemRead] = []
    photos: list[InspectionPhotoRead] = []


class InspectionListItem(BaseSchema):
    """Lightweight representation used in list endpoints."""

    id: UUID
    title: str
    reference_number: str | None = None
    status: InspectionStatus
    site_id: UUID
    asset_id: UUID | None = None
    inspector_id: UUID | None = None
    scheduled_at: datetime | None = None
    created_at: datetime
    updated_at: datetime


class InspectionSubmit(BaseSchema):
    """Request body for submitting an in-progress inspection for review."""

    notes: str | None = None

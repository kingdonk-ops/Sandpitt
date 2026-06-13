"""Asset schemas."""

from __future__ import annotations

from uuid import UUID

from src.schemas.common import BaseSchema, TimestampSchema


class AssetBase(BaseSchema):
    site_id: UUID
    name: str
    asset_code: str | None = None
    description: str | None = None
    asset_type: str | None = None
    manufacturer: str | None = None
    model_number: str | None = None
    serial_number: str | None = None
    lat: float | None = None
    lng: float | None = None
    is_active: bool = True
    notes: str | None = None


class AssetCreate(AssetBase):
    pass


class AssetUpdate(BaseSchema):
    name: str | None = None
    asset_code: str | None = None
    description: str | None = None
    asset_type: str | None = None
    manufacturer: str | None = None
    model_number: str | None = None
    serial_number: str | None = None
    lat: float | None = None
    lng: float | None = None
    is_active: bool | None = None
    notes: str | None = None


class AssetRead(AssetBase, TimestampSchema):
    id: UUID

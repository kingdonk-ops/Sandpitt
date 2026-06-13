"""Site schemas."""

from __future__ import annotations

from uuid import UUID

from pydantic import field_validator

from src.schemas.common import BaseSchema, TimestampSchema


class LatLng(BaseSchema):
    lat: float
    lng: float


class SiteBase(BaseSchema):
    name: str
    address: str | None = None
    city: str | None = None
    state: str | None = None
    country: str = "AU"
    postcode: str | None = None
    notes: str | None = None
    lat: float | None = None
    lng: float | None = None


class SiteCreate(SiteBase):
    pass


class SiteUpdate(BaseSchema):
    name: str | None = None
    address: str | None = None
    city: str | None = None
    state: str | None = None
    country: str | None = None
    postcode: str | None = None
    notes: str | None = None
    lat: float | None = None
    lng: float | None = None


class SiteRead(SiteBase, TimestampSchema):
    id: UUID

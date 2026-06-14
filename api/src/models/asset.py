"""Asset and Site ORM models with PostGIS geometry support."""

from __future__ import annotations

import uuid
from typing import TYPE_CHECKING

from geoalchemy2 import Geometry
from sqlalchemy import ForeignKey, String, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.models.base import Base, TimestampMixin, UUIDMixin

if TYPE_CHECKING:
    from src.models.inspection import Inspection


class Site(UUIDMixin, TimestampMixin, Base):
    """A physical location that may contain multiple assets.

    `location` is stored as a PostGIS GEOMETRY(Point, 4326) column —
    SRID 4326 = WGS 84 (standard GPS lat/lng).
    """

    __tablename__ = "sites"

    name: Mapped[str] = mapped_column(String(500), nullable=False)
    address: Mapped[str | None] = mapped_column(Text, nullable=True)
    city: Mapped[str | None] = mapped_column(String(255), nullable=True)
    state: Mapped[str | None] = mapped_column(String(100), nullable=True)
    country: Mapped[str] = mapped_column(String(100), default="AU", nullable=False)
    postcode: Mapped[str | None] = mapped_column(String(20), nullable=True)
    # PostGIS point: ST_SetSRID(ST_MakePoint(lng, lat), 4326)
    location: Mapped[object | None] = mapped_column(
        Geometry(geometry_type="POINT", srid=4326), nullable=True
    )
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)

    # Relationships
    assets: Mapped[list["Asset"]] = relationship(
        "Asset", back_populates="site", lazy="select", cascade="all, delete-orphan"
    )
    inspections: Mapped[list["Inspection"]] = relationship(
        "Inspection", back_populates="site", lazy="select"
    )

    def __repr__(self) -> str:
        return f"<Site id={self.id} name={self.name!r}>"


class Asset(UUIDMixin, TimestampMixin, Base):
    """A specific piece of equipment or infrastructure at a Site."""

    __tablename__ = "assets"

    site_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("sites.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    name: Mapped[str] = mapped_column(String(500), nullable=False)
    asset_code: Mapped[str | None] = mapped_column(String(100), unique=True, nullable=True)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    asset_type: Mapped[str | None] = mapped_column(String(100), nullable=True)
    manufacturer: Mapped[str | None] = mapped_column(String(255), nullable=True)
    model_number: Mapped[str | None] = mapped_column(String(255), nullable=True)
    serial_number: Mapped[str | None] = mapped_column(String(255), nullable=True)
    # PostGIS point for the specific asset location within the site
    location: Mapped[object | None] = mapped_column(
        Geometry(geometry_type="POINT", srid=4326), nullable=True
    )
    is_active: Mapped[bool] = mapped_column(default=True, nullable=False)
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)

    # Relationships
    site: Mapped["Site"] = relationship("Site", back_populates="assets", lazy="select")
    inspections: Mapped[list["Inspection"]] = relationship(
        "Inspection", back_populates="asset", lazy="select"
    )

    def __repr__(self) -> str:
        return f"<Asset id={self.id} name={self.name!r}>"

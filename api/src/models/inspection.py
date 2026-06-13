"""Inspection, InspectionItem, and InspectionPhoto ORM models."""

from __future__ import annotations

import enum
import uuid
from datetime import datetime
from typing import TYPE_CHECKING

from sqlalchemy import DateTime, Enum, ForeignKey, Integer, String, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.models.base import Base, TimestampMixin, UUIDMixin

if TYPE_CHECKING:
    from src.models.asset import Asset, Site
    from src.models.user import User


class InspectionStatus(str, enum.Enum):
    scheduled = "scheduled"
    in_progress = "in_progress"
    pending_review = "pending_review"
    completed = "completed"
    cancelled = "cancelled"


class InspectionItemResult(str, enum.Enum):
    pass_ = "pass"
    fail = "fail"
    na = "na"
    pending = "pending"


class Inspection(UUIDMixin, TimestampMixin, Base):
    """Top-level inspection record.

    An inspection is linked to a Site (required) and optionally a single
    Asset within that site.  The assigned inspector is a User row.
    """

    __tablename__ = "inspections"

    title: Mapped[str] = mapped_column(String(500), nullable=False)
    reference_number: Mapped[str | None] = mapped_column(
        String(100), unique=True, nullable=True, index=True
    )
    status: Mapped[InspectionStatus] = mapped_column(
        Enum(InspectionStatus, name="inspection_status"),
        default=InspectionStatus.scheduled,
        nullable=False,
        index=True,
    )
    site_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("sites.id", ondelete="RESTRICT"),
        nullable=False,
        index=True,
    )
    asset_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("assets.id", ondelete="SET NULL"),
        nullable=True,
        index=True,
    )
    inspector_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="SET NULL"),
        nullable=True,
        index=True,
    )
    scheduled_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), nullable=True
    )
    started_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), nullable=True
    )
    submitted_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), nullable=True
    )
    completed_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), nullable=True
    )
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)

    # Relationships
    site: Mapped["Site"] = relationship("Site", back_populates="inspections", lazy="select")
    asset: Mapped["Asset | None"] = relationship(
        "Asset", back_populates="inspections", lazy="select"
    )
    inspector: Mapped["User | None"] = relationship(
        "User", back_populates="inspections", lazy="select"
    )
    items: Mapped[list["InspectionItem"]] = relationship(
        "InspectionItem",
        back_populates="inspection",
        lazy="select",
        cascade="all, delete-orphan",
        order_by="InspectionItem.order_index",
    )
    photos: Mapped[list["InspectionPhoto"]] = relationship(
        "InspectionPhoto",
        back_populates="inspection",
        lazy="select",
        cascade="all, delete-orphan",
    )

    def __repr__(self) -> str:
        return f"<Inspection id={self.id} status={self.status!r}>"


class InspectionItem(UUIDMixin, TimestampMixin, Base):
    """A single checklist item within an Inspection."""

    __tablename__ = "inspection_items"

    inspection_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("inspections.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    order_index: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    question: Mapped[str] = mapped_column(Text, nullable=False)
    result: Mapped[InspectionItemResult] = mapped_column(
        Enum(InspectionItemResult, name="inspection_item_result"),
        default=InspectionItemResult.pending,
        nullable=False,
    )
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)

    # Relationships
    inspection: Mapped["Inspection"] = relationship("Inspection", back_populates="items")
    photos: Mapped[list["InspectionPhoto"]] = relationship(
        "InspectionPhoto",
        back_populates="item",
        lazy="select",
    )

    def __repr__(self) -> str:
        return f"<InspectionItem id={self.id} result={self.result!r}>"


class InspectionPhoto(UUIDMixin, TimestampMixin, Base):
    """A photo stored in MinIO, associated with an Inspection (and optionally an Item)."""

    __tablename__ = "inspection_photos"

    inspection_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("inspections.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    item_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("inspection_items.id", ondelete="SET NULL"),
        nullable=True,
        index=True,
    )
    # MinIO object key, e.g. "inspections/<inspection_id>/<uuid>.jpg"
    storage_key: Mapped[str] = mapped_column(String(1000), nullable=False)
    original_filename: Mapped[str | None] = mapped_column(String(500), nullable=True)
    content_type: Mapped[str] = mapped_column(String(100), default="image/jpeg", nullable=False)
    file_size_bytes: Mapped[int | None] = mapped_column(Integer, nullable=True)
    caption: Mapped[str | None] = mapped_column(Text, nullable=True)

    # Relationships
    inspection: Mapped["Inspection"] = relationship("Inspection", back_populates="photos")
    item: Mapped["InspectionItem | None"] = relationship(
        "InspectionItem", back_populates="photos"
    )

    def __repr__(self) -> str:
        return f"<InspectionPhoto id={self.id} key={self.storage_key!r}>"

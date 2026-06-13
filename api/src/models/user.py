"""User model — synced from Keycloak via JWT claims."""

from __future__ import annotations

import uuid

from sqlalchemy import Boolean, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.models.base import Base, TimestampMixin, UUIDMixin


class User(UUIDMixin, TimestampMixin, Base):
    """Local mirror of a Keycloak user.

    The `keycloak_id` is the `sub` claim from the JWT — it is the canonical
    identity identifier.  The `id` column is the internal UUID used for
    foreign-key relationships within this database.
    """

    __tablename__ = "users"

    keycloak_id: Mapped[str] = mapped_column(String(255), unique=True, nullable=False, index=True)
    email: Mapped[str] = mapped_column(String(320), unique=True, nullable=False, index=True)
    full_name: Mapped[str | None] = mapped_column(String(500), nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    is_admin: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)

    # Relationships
    inspections: Mapped[list["Inspection"]] = relationship(  # type: ignore[name-defined]  # noqa: F821
        "Inspection",
        back_populates="inspector",
        lazy="select",
    )

    def __repr__(self) -> str:
        return f"<User id={self.id} email={self.email!r}>"

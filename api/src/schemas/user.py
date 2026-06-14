"""User schemas."""

from __future__ import annotations

from uuid import UUID

from pydantic import EmailStr

from src.schemas.common import BaseSchema, TimestampSchema


class UserBase(BaseSchema):
    email: EmailStr
    full_name: str | None = None
    is_active: bool = True
    is_admin: bool = False


class UserCreate(UserBase):
    keycloak_id: str


class UserUpdate(BaseSchema):
    full_name: str | None = None
    is_active: bool | None = None
    is_admin: bool | None = None


class UserRead(UserBase, TimestampSchema):
    id: UUID
    keycloak_id: str

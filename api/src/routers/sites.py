"""Sites CRUD router."""

from __future__ import annotations

import uuid
from typing import Any

from fastapi import APIRouter, Depends, HTTPException, status
from geoalchemy2.functions import ST_MakePoint, ST_SetSRID
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.auth import get_current_user_claims
from src.database import get_db
from src.models.asset import Site
from src.schemas.site import SiteCreate, SiteRead, SiteUpdate

router = APIRouter(prefix="/sites", tags=["sites"])


def _apply_location(site: Site, lat: float | None, lng: float | None) -> None:
    if lat is not None and lng is not None:
        site.location = ST_SetSRID(ST_MakePoint(lng, lat), 4326)


@router.get("", response_model=list[SiteRead])
async def list_sites(
    db: AsyncSession = Depends(get_db),
    _: dict[str, Any] = Depends(get_current_user_claims),
) -> list[Site]:
    result = await db.execute(select(Site).order_by(Site.name))
    return list(result.scalars().all())


@router.post("", response_model=SiteRead, status_code=status.HTTP_201_CREATED)
async def create_site(
    body: SiteCreate,
    db: AsyncSession = Depends(get_db),
    _: dict[str, Any] = Depends(get_current_user_claims),
) -> Site:
    data = body.model_dump(exclude={"lat", "lng"})
    site = Site(**data)
    _apply_location(site, body.lat, body.lng)
    db.add(site)
    await db.flush()
    await db.refresh(site)
    return site


@router.get("/{site_id}", response_model=SiteRead)
async def get_site(
    site_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    _: dict[str, Any] = Depends(get_current_user_claims),
) -> Site:
    site = await db.get(Site, site_id)
    if site is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Site not found")
    return site


@router.patch("/{site_id}", response_model=SiteRead)
async def update_site(
    site_id: uuid.UUID,
    body: SiteUpdate,
    db: AsyncSession = Depends(get_db),
    _: dict[str, Any] = Depends(get_current_user_claims),
) -> Site:
    site = await db.get(Site, site_id)
    if site is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Site not found")
    update_data = body.model_dump(exclude_unset=True, exclude={"lat", "lng"})
    for key, value in update_data.items():
        setattr(site, key, value)
    if body.lat is not None or body.lng is not None:
        _apply_location(site, body.lat, body.lng)
    await db.flush()
    await db.refresh(site)
    return site


@router.delete("/{site_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_site(
    site_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    _: dict[str, Any] = Depends(get_current_user_claims),
) -> None:
    site = await db.get(Site, site_id)
    if site is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Site not found")
    await db.delete(site)

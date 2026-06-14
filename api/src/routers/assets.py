"""Assets CRUD router."""

from __future__ import annotations

import uuid
from typing import Any

from fastapi import APIRouter, Depends, HTTPException, Query, status
from geoalchemy2.functions import ST_MakePoint, ST_SetSRID
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.auth import get_current_user_claims
from src.database import get_db
from src.models.asset import Asset
from src.schemas.asset import AssetCreate, AssetRead, AssetUpdate

router = APIRouter(prefix="/assets", tags=["assets"])


def _apply_location(asset: Asset, lat: float | None, lng: float | None) -> None:
    if lat is not None and lng is not None:
        asset.location = ST_SetSRID(ST_MakePoint(lng, lat), 4326)


@router.get("", response_model=list[AssetRead])
async def list_assets(
    site_id: uuid.UUID | None = Query(default=None, description="Filter by site"),
    active_only: bool = Query(default=True),
    db: AsyncSession = Depends(get_db),
    _: dict[str, Any] = Depends(get_current_user_claims),
) -> list[Asset]:
    q = select(Asset).order_by(Asset.name)
    if site_id is not None:
        q = q.where(Asset.site_id == site_id)
    if active_only:
        q = q.where(Asset.is_active.is_(True))
    result = await db.execute(q)
    return list(result.scalars().all())


@router.post("", response_model=AssetRead, status_code=status.HTTP_201_CREATED)
async def create_asset(
    body: AssetCreate,
    db: AsyncSession = Depends(get_db),
    _: dict[str, Any] = Depends(get_current_user_claims),
) -> Asset:
    data = body.model_dump(exclude={"lat", "lng"})
    asset = Asset(**data)
    _apply_location(asset, body.lat, body.lng)
    db.add(asset)
    await db.flush()
    await db.refresh(asset)
    return asset


@router.get("/{asset_id}", response_model=AssetRead)
async def get_asset(
    asset_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    _: dict[str, Any] = Depends(get_current_user_claims),
) -> Asset:
    asset = await db.get(Asset, asset_id)
    if asset is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Asset not found")
    return asset


@router.patch("/{asset_id}", response_model=AssetRead)
async def update_asset(
    asset_id: uuid.UUID,
    body: AssetUpdate,
    db: AsyncSession = Depends(get_db),
    _: dict[str, Any] = Depends(get_current_user_claims),
) -> Asset:
    asset = await db.get(Asset, asset_id)
    if asset is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Asset not found")
    update_data = body.model_dump(exclude_unset=True, exclude={"lat", "lng"})
    for key, value in update_data.items():
        setattr(asset, key, value)
    if body.lat is not None or body.lng is not None:
        _apply_location(asset, body.lat, body.lng)
    await db.flush()
    await db.refresh(asset)
    return asset


@router.delete("/{asset_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_asset(
    asset_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    _: dict[str, Any] = Depends(get_current_user_claims),
) -> None:
    asset = await db.get(Asset, asset_id)
    if asset is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Asset not found")
    await db.delete(asset)

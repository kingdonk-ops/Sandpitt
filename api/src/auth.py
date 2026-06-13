"""JWT authentication dependency using Keycloak JWKS."""

from __future__ import annotations

from typing import Any

import httpx
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError, jwt

from src.config import settings

_bearer = HTTPBearer(auto_error=True)

# Simple in-memory JWKS cache (refreshed on 401 from jose)
_jwks_cache: dict[str, Any] | None = None


async def _get_jwks() -> dict[str, Any]:
    global _jwks_cache
    if _jwks_cache is None:
        async with httpx.AsyncClient() as client:
            resp = await client.get(settings.KEYCLOAK_JWKS_URL, timeout=10.0)
            resp.raise_for_status()
            _jwks_cache = resp.json()
    return _jwks_cache


async def get_current_user_claims(
    credentials: HTTPAuthorizationCredentials = Depends(_bearer),
) -> dict[str, Any]:
    """Validate the Bearer JWT and return its claims dict."""
    token = credentials.credentials
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        jwks = await _get_jwks()
        claims = jwt.decode(
            token,
            jwks,
            algorithms=["RS256"],
            audience=settings.KEYCLOAK_CLIENT_ID,
            options={"verify_exp": True},
        )
        return claims  # type: ignore[return-value]
    except JWTError:
        # Attempt a JWKS refresh once in case keys have rotated
        global _jwks_cache
        _jwks_cache = None
        try:
            jwks = await _get_jwks()
            claims = jwt.decode(
                token,
                jwks,
                algorithms=["RS256"],
                audience=settings.KEYCLOAK_CLIENT_ID,
                options={"verify_exp": True},
            )
            return claims  # type: ignore[return-value]
        except JWTError:
            raise credentials_exception


async def require_admin(
    claims: dict[str, Any] = Depends(get_current_user_claims),
) -> dict[str, Any]:
    """Require the `admin` realm role."""
    roles: list[str] = (
        claims.get("realm_access", {}).get("roles", [])
    )
    if "admin" not in roles:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin role required",
        )
    return claims

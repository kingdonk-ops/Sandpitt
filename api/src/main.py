"""FastAPI application factory."""

from __future__ import annotations

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.config import settings
from src.routers import assets, inspections, photos, reports, sites

app = FastAPI(
    title="Sandpitt Inspection API",
    version="0.1.0",
    description="Inspection management system API — see /docs for interactive reference.",
    docs_url="/docs",
    redoc_url="/redoc",
)

# ---------------------------------------------------------------------------
# CORS
# ---------------------------------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------------------------
# Routers
# ---------------------------------------------------------------------------
_API_PREFIX = "/api/v1"

app.include_router(sites.router, prefix=_API_PREFIX)
app.include_router(assets.router, prefix=_API_PREFIX)
app.include_router(inspections.router, prefix=_API_PREFIX)
app.include_router(photos.router, prefix=_API_PREFIX)
app.include_router(reports.router, prefix=_API_PREFIX)


# ---------------------------------------------------------------------------
# Health check (no auth required — used by Docker health check)
# ---------------------------------------------------------------------------
@app.get("/health", tags=["meta"], include_in_schema=False)
async def health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/", tags=["meta"], include_in_schema=False)
async def root() -> dict[str, str]:
    return {"message": "Sandpitt Inspection API", "docs": "/docs"}

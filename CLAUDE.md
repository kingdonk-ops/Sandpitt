# Sandpitt Inspection System — Developer Guide

## Architecture Overview

```
sandpitt/
├── api/          FastAPI backend (Python 3.12)
├── mobile/       Expo / React Native app (TypeScript)
├── admin/        Next.js 14 admin UI (TypeScript)
├── infra/        Keycloak realm config, Postgres init scripts
└── docker-compose.yml
```

### Key Services

| Service    | URL                   | Purpose                              |
|------------|-----------------------|--------------------------------------|
| api        | http://localhost:8000 | REST API (FastAPI + SQLAlchemy)      |
| admin      | http://localhost:3000 | Admin dashboard (Next.js)            |
| keycloak   | http://localhost:8080 | Auth / JWT issuer                    |
| minio      | http://localhost:9000 | Photo storage (S3-compatible)        |
| minio-ui   | http://localhost:9001 | MinIO Console                        |
| metabase   | http://localhost:3001 | Analytics / BI                       |
| postgres   | localhost:5432        | PostgreSQL 16 + PostGIS 3.4          |

## Getting Started

### 1. Prerequisites

- Docker Desktop (or Docker Engine + Compose plugin)
- Python 3.12+ (for local API dev)
- Node 20+ (for mobile / admin dev)
- [uv](https://github.com/astral-sh/uv) (recommended for Python venv)

### 2. Configure environment

```bash
cp .env.example .env
# Edit .env — at minimum change all "changeme_*" values
```

### 3. Start infrastructure

```bash
# Start everything (first run takes a few minutes for image pulls)
docker compose up -d

# Watch logs
docker compose logs -f api

# Check health
docker compose ps
```

### 4. Run database migrations

```bash
# Via docker exec (uses the running api container)
docker compose exec api alembic upgrade head

# Or locally (requires DATABASE_URL in your shell env)
cd api
uv sync
source .venv/bin/activate
alembic upgrade head
```

## API Development

```bash
cd api

# Create virtual environment and install dependencies
uv sync

# Activate
source .venv/bin/activate   # Linux/macOS
# .venv\Scripts\activate    # Windows

# Run locally (hot reload)
uvicorn src.main:app --reload --host 0.0.0.0 --port 8000

# Run tests
pytest tests/ -v

# Lint / format
ruff check src/
ruff format src/

# Type-check
mypy src/
```

### Creating a new migration

```bash
cd api
alembic revision --autogenerate -m "describe your change"
alembic upgrade head
```

### API Docs

- Swagger UI: http://localhost:8000/docs
- ReDoc:      http://localhost:8000/redoc

## Mobile Development

```bash
cd mobile
npm install

# Start Expo dev server
npx expo start

# Run on iOS simulator
npx expo run:ios

# Run on Android emulator
npx expo run:android
```

The mobile app expects the API at `EXPO_PUBLIC_API_URL` (defaults to `http://localhost:8000`).
Update `mobile/src/api/client.ts` or the env var for device testing.

## Admin UI Development

```bash
cd admin
npm install

# Start dev server
npm run dev         # http://localhost:3000

# Build for production
npm run build
npm run start

# Type-check
npm run type-check

# Lint
npm run lint
```

## Key Design Decisions

### Inspection Statuses

Inspections flow through a defined lifecycle:

```
scheduled → in_progress → pending_review → completed
                       ↘ cancelled
```

| Status          | Meaning                                        |
|-----------------|------------------------------------------------|
| `scheduled`     | Created, assigned, not yet started             |
| `in_progress`   | Inspector has opened it on mobile              |
| `pending_review`| Inspector submitted, awaiting supervisor sign-off |
| `completed`     | Supervisor approved                            |
| `cancelled`     | Voided before completion                       |

### Authentication (Keycloak + JWT)

- Keycloak issues JWTs (RS256).
- The API fetches the JWKS from Keycloak and validates tokens locally — no round-trips per request.
- The `Authorization: Bearer <token>` header is required on all protected endpoints.
- Mobile uses `expo-secure-store` to persist the refresh token.
- Admin uses `next-auth` with the Keycloak OIDC provider.

### Photo Storage (MinIO)

1. Mobile/Admin calls `POST /api/v1/photos/upload` with `multipart/form-data`.
2. API streams the file to MinIO (`inspection-photos` bucket).
3. API returns a **presigned URL** (1-hour expiry) for direct download.
4. The `InspectionPhoto.storage_key` column stores the MinIO object key.

### Geolocation (PostGIS)

`Site.location` and `Asset.location` are stored as PostGIS `GEOMETRY(Point, 4326)` columns.
Use `ST_AsGeoJSON(location)` in raw SQL or GeoAlchemy2 for ORM access.

### All IDs are UUIDs (v4)

Generated server-side via the `UUIDMixin` in `api/src/models/base.py`.

## Repo Layout Details

```
api/
├── alembic/            Alembic migration environment
│   ├── env.py
│   ├── script.py.mako
│   └── versions/       Migration scripts
├── src/
│   ├── main.py         App factory, CORS, router wiring
│   ├── config.py       Pydantic-settings (reads .env)
│   ├── database.py     Async SQLAlchemy engine + session
│   ├── models/         ORM models
│   ├── routers/        FastAPI route handlers
│   └── schemas/        Pydantic request/response schemas
├── tests/
└── pyproject.toml

mobile/
├── app/                Expo Router file-based routes
│   ├── (tabs)/         Bottom-tab navigator
│   └── inspection/     Detail screens
└── src/
    ├── api/            Axios client + typed API calls
    └── hooks/          Shared React hooks

admin/
├── src/
│   ├── app/            Next.js App Router pages
│   ├── components/     Reusable UI components
│   └── lib/            API client, utilities
└── public/
```

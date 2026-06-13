"""Application configuration via pydantic-settings (reads from .env / environment)."""

from __future__ import annotations

from pydantic import AnyHttpUrl, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    # ------------------------------------------------------------------
    # Database
    # ------------------------------------------------------------------
    DATABASE_URL: str = "postgresql+asyncpg://sandpitt:changeme_postgres@localhost:5432/sandpitt"

    # ------------------------------------------------------------------
    # API
    # ------------------------------------------------------------------
    API_HOST: str = "0.0.0.0"
    API_PORT: int = 8000
    API_DEBUG: bool = False
    SECRET_KEY: str = "changeme_super_secret_key_min_32_chars"
    ALLOWED_ORIGINS: str = "http://localhost:3000,http://localhost:19006"

    @field_validator("ALLOWED_ORIGINS", mode="before")
    @classmethod
    def parse_origins(cls, v: str) -> str:
        return v

    @property
    def allowed_origins_list(self) -> list[str]:
        return [o.strip() for o in self.ALLOWED_ORIGINS.split(",") if o.strip()]

    # ------------------------------------------------------------------
    # Keycloak / OIDC
    # ------------------------------------------------------------------
    KEYCLOAK_URL: str = "http://keycloak:8080"
    KEYCLOAK_REALM: str = "sandpitt"
    KEYCLOAK_CLIENT_ID: str = "sandpitt-api"
    KEYCLOAK_CLIENT_SECRET: str = "changeme_keycloak_secret"
    KEYCLOAK_JWKS_URL: str = (
        "http://keycloak:8080/realms/sandpitt/protocol/openid-connect/certs"
    )

    # ------------------------------------------------------------------
    # MinIO
    # ------------------------------------------------------------------
    MINIO_ENDPOINT: str = "minio:9000"
    MINIO_ACCESS_KEY: str = "minioadmin"
    MINIO_SECRET_KEY: str = "changeme_minio_secret"
    MINIO_BUCKET_PHOTOS: str = "inspection-photos"
    MINIO_SECURE: bool = False
    MINIO_PUBLIC_URL: str = "http://localhost:9000"


settings = Settings()

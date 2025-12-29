from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List

class Settings(BaseSettings):
    DATABASE_URL: str
    REDIS_URL: str  # Corrected to match docker-compose.yml
    ALLOWED_ORIGINS: str = "*"

    model_config = SettingsConfigDict(extra='ignore')

settings = Settings()

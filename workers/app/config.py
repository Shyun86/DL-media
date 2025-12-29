from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    DATABASE_URL: str
    REDIS_URL: str # Corrected to match docker-compose.yml
    NAS_MEDIA_PATH: str = "/media/final"

    model_config = SettingsConfigDict(extra='ignore')

settings = Settings()

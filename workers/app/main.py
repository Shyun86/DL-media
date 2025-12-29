import logging
from urllib.parse import urlparse
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from .downloader import MediaDownloader
from .database import AsyncSessionLocal
from .models import Media
from .config import settings, Settings
from arq.connections import RedisSettings

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

async def download_media_task(ctx, url: str):
    """
    Arq task to download media from a URL and save metadata to the database.
    """
    downloader = MediaDownloader()
    db_session: AsyncSession = AsyncSessionLocal()
    
    try:
        logger.info(f"🚀 Démarrage du téléchargement pour: {url}")
        
        # Use the downloader to get the media
        media_data = await downloader.download_and_process(
            url,
            destination_folder=settings.NAS_MEDIA_PATH
        )
        
        # Check if a file with the same hash already exists
        stmt = select(Media).where(Media.file_hash == media_data["file_hash"])
        result = await db_session.execute(stmt)
        existing_media = result.scalars().first()
        
        if existing_media:
            logger.warning(f"👍 Fichier déjà existant (hash: {media_data['file_hash']}). Pas d'ajout en BDD.")
            # Optionally, we could still link this URL to the existing media
            return {"status": "skipped", "reason": "duplicate", "hash": media_data["file_hash"]}

        # Create a new Media object
        new_media = Media(
            file_hash=media_data["file_hash"],
            file_path=media_data["filename"], # path is relative to NAS_MEDIA_PATH
            media_type=media_data["type"].upper(),
            file_size=media_data["file_size"],
            source_url=url
        )
        
        db_session.add(new_media)
        await db_session.commit()
        
        logger.info(f"✅ Téléchargement et enregistrement réussis pour: {url}")
        return {"status": "success", "file_hash": new_media.file_hash}

    except Exception as e:
        logger.error(f"❌ Erreur lors du traitement de {url}: {e}", exc_info=True)
        await db_session.rollback()
        # Optionally, re-raise to have Arq mark the job as failed
        raise
    finally:
        await db_session.close()


# Arq worker settings
# Parse Redis URL for host and port
redis_url = urlparse(settings.REDIS_URL)

class WorkerSettings:
    """
    Defines the settings for the Arq worker.
    """
    # The list of functions to expose to the queue
    functions = [download_media_task]
    
    # Redis connection settings
    redis_settings = RedisSettings(host=redis_url.hostname, port=redis_url.port)
    
    # Name of the queue to listen to
    queue_name = "arq:queue"

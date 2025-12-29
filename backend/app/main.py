from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from pathlib import Path
import redis.asyncio as redis
from arq import create_pool
from arq.connections import RedisSettings
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession


# App-specific imports
from . import models, schemas
from .database import init_db, get_db
from .cookies import CookieManager
from .config import settings

app = FastAPI()

# Add a startup event to initialize the database
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from pathlib import Path
import redis.asyncio as redis
from arq import create_pool
from arq.connections import RedisSettings
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from urllib.parse import urlparse

# App-specific imports
from . import models, schemas
from .database import init_db, get_db
from .cookies import CookieManager
from .config import settings

app = FastAPI()

# Add a startup event to initialize the database
@app.on_event("startup")
async def startup_event():
    await init_db()
    # Parse the Redis URL to get host and port
    redis_url = urlparse(settings.REDIS_URL)
    # Initialize Redis pool for Arq
    app.state.redis_pool = await create_pool(
        RedisSettings(host=redis_url.hostname, port=redis_url.port)
    )


@app.on_event("shutdown")
async def shutdown_event():
    if app.state.redis_pool:
        await app.state.redis_pool.close()

# Configuration CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS.split(','),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

cookie_manager = CookieManager(Path("/data/cookies.txt"))

@app.get("/")
def read_root():
    return {"message": "MediaFetcher Backend is Ready 🚀"}

@app.post("/api/download", response_model=schemas.DownloadResponse)
async def enqueue_download(request: schemas.DownloadRequest, redis_pool: redis.Redis = Depends(lambda: app.state.redis_pool)):
    if not request.url:
        raise HTTPException(status_code=400, detail="URL is required")
    
    job = await redis_pool.enqueue_job("download_media_task", request.url, _queue_name="arq:queue")
    return {"job_id": job.job_id, "status": "queued"}

@app.post("/api/update-cookies", response_model=schemas.CookieUpdateResponse)
async def update_cookies(payload: schemas.CookieUpdateRequest):
    """Receives cookies from the extension and updates the file."""
    try:
        if not payload.cookies:
            return schemas.CookieUpdateResponse(status="ignored", count=0)
            
        cookie_manager.update_cookies([c.dict() for c in payload.cookies])
        return schemas.CookieUpdateResponse(status="success", count=len(payload.cookies))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/media", response_model=List[schemas.Media])
async def list_media(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(models.Media).limit(100))
    media_items = result.scalars().all()
    return media_items

@app.get("/api/folders", response_model=List[schemas.Folder])
async def list_folders(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(models.Folder))
    folders = result.scalars().all()
    return folders
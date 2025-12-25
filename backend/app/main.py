from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from arq import create_pool
from arq.connections import RedisSettings

# Imports internes
from .database import engine, Base
from .config import settings
from .downloader import MediaDownloader

# --- Modèle de données pour la requête API ---
class DownloadRequest(BaseModel):
    url: str

# --- Gestion du Cycle de Vie ---
@asynccontextmanager
async def lifespan(app: FastAPI):
    # 1. Démarrage BDD
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    
    # 2. Connexion Redis pour l'API (pour envoyer les tâches)
    app.state.redis = await create_pool(RedisSettings.from_dsn(settings.REDIS_URL))
    
    yield
    
    # 3. Nettoyage
    await app.state.redis.close()
    await engine.dispose()

app = FastAPI(title="App-DL Backend", lifespan=lifespan)

# --- CONFIGURATION CORS (CRUCIAL POUR LE FRONTEND) ---
# Autorise le frontend (React) à parler au backend (FastAPI)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En prod, on mettrait l'IP précise, mais "*" est plus simple ici
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health", tags=["System"])
async def health_check():
    return {"status": "ok", "service": "backend-api"}

# --- ROUTE API : C'est ici que le Frontend va frapper ---
@app.post("/api/download", tags=["Media"])
async def trigger_download(request: DownloadRequest):
    """Reçoit une URL du frontend et l'envoie au worker."""
    try:
        # Envoi de la tâche au Worker via Redis
        await app.state.redis.enqueue_job('download_media_task', request.url)
        return {"status": "queued", "message": "Téléchargement démarré", "url": request.url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# --- WORKER & TÂCHES ---
async def download_media_task(ctx, url: str):
    print(f"🚀 [Worker] Nouvelle tâche : {url}")
    downloader = MediaDownloader()
    try:
        # Téléchargement vers le volume NAS
        result = await downloader.download_and_process(url, "/data/media")
        print(f"✅ [Worker] Succès : {result['filename']}")
        return result
    except Exception as e:
        print(f"❌ [Worker] Erreur : {str(e)}")
        raise e

class WorkerSettings:
    redis_settings = RedisSettings.from_dsn(settings.REDIS_URL)
    job_timeout = 3600  # 1 heure max
    functions = [download_media_task]
    
    async def on_startup(ctx):
        print("🟢 [Worker] Prêt.")

    async def on_shutdown(ctx):
        print("🔴 [Worker] Arrêté.")
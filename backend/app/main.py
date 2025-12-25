from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Any
from pathlib import Path
from app.worker import download_media_task
from app.cookies import CookieManager

app = FastAPI()

# Configuration CORS pour autoriser le Frontend ET l'Extension
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # L'extension a besoin de ça
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Gestionnaire de cookies (stockés dans /data/cookies.txt)
cookie_manager = CookieManager(Path("/data/cookies.txt"))

class DownloadRequest(BaseModel):
    url: str

class CookieData(BaseModel):
    name: str
    value: str
    domain: str
    path: str
    secure: bool
    expirationDate: Optional[float] = None

class CookiePayload(BaseModel):
    url: str # L'URL de la page d'où viennent les cookies
    cookies: List[CookieData]

@app.get("/")
def read_root():
    return {"message": "MediaFetcher Backend is Ready 🚀"}

@app.post("/api/download")
async def start_download(request: DownloadRequest):
    if not request.url:
        raise HTTPException(status_code=400, detail="URL is required")
    
    # On délègue la tâche au worker
    job = await download_media_task.delay(request.url)
    return {"status": "queued", "job_id": job.job_id, "url": request.url}

@app.post("/api/update-cookies")
async def update_cookies(payload: CookiePayload):
    """Reçoit les cookies de l'extension et met à jour le fichier"""
    try:
        if not payload.cookies:
            return {"status": "ignored", "message": "Aucun cookie reçu"}
            
        cookie_manager.update_cookies([c.dict() for c in payload.cookies])
        return {"status": "success", "message": f"{len(payload.cookies)} cookies mis à jour pour {payload.url}"}
    except Exception as e:
        print(f"Erreur cookie: {e}")
        raise HTTPException(status_code=500, detail=str(e))
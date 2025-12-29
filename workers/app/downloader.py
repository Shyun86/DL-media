import asyncio
import hashlib
import shutil
import logging
import os
import subprocess
from pathlib import Path
from tempfile import TemporaryDirectory
from typing import Dict, Any

import yt_dlp

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

COOKIE_FILE = Path("/data/cookies.txt")

class MediaDownloader:
    @staticmethod
    async def _calculate_sha256(file_path: Path) -> str:
        sha256_hash = hashlib.sha256()
        with open(file_path, "rb") as f:
            for byte_block in iter(lambda: f.read(4096), b""):
                sha256_hash.update(byte_block)
        return sha256_hash.hexdigest()

    async def _try_gallery_dl(self, url: str, tmp_path: Path) -> Path:
        logger.info(f"🖼️ Tentative avec gallery-dl pour : {url}")
        
        cmd = [
            "gallery-dl",
            "--directory", str(tmp_path),
            "--no-mtime",
            "--write-metadata", 
            url
        ]
        
        # Ajout des cookies si présents
        if COOKIE_FILE.exists():
            cmd.extend(["--cookies", str(COOKIE_FILE)])

        process = await asyncio.create_subprocess_exec(
            *cmd,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE
        )
        stdout, stderr = await process.communicate()

        if process.returncode != 0:
            error_msg = stderr.decode()
            logger.error(f"gallery-dl a échoué : {error_msg}")
            raise RuntimeError(f"gallery-dl failed. Logs: {error_msg[:200]}...")

        files = [f for f in tmp_path.rglob("*") if f.is_file() and f.suffix.lower() in ['.jpg', '.jpeg', '.png', '.gif', '.webp']]
        if not files:
            raise FileNotFoundError("gallery-dl a fini mais aucune image trouvée.")

        return files[0]

    async def download_and_process(self, url: str, destination_folder: str) -> Dict[str, Any]:
        dest_path = Path(destination_folder)
        dest_path.mkdir(parents=True, exist_ok=True)

        with TemporaryDirectory(dir=destination_folder) as tmpdir:
            tmp_path = Path(tmpdir)
            loop = asyncio.get_running_loop()
            
            final_file_path = None
            detected_type = "video"
            info_title = "Unknown"

            # Options de base (communes)
            base_opts = {
                'quiet': True,
                'no_warnings': True,
                # LA CLE MAGIQUE : On utilise le fichier de cookies s'il existe
                'cookiefile': str(COOKIE_FILE) if COOKIE_FILE.exists() else None,
            }

            try:
                # 1. Analyse (Probe)
                probe_opts = base_opts.copy()
                probe_opts.update({'extract_flat': True, 'ignore_no_formats_error': True})
                
                with yt_dlp.YoutubeDL(probe_opts) as ydl_probe:
                    info = await loop.run_in_executor(None, lambda: ydl_probe.extract_info(url, download=False))
                    if 'twitter' in url and not info.get('formats'):
                         raise ValueError("Twitter sans vidéo détectée -> switch gallery-dl")

                # 2. Téléchargement YT-DLP
                dl_opts = base_opts.copy()
                dl_opts.update({
                    'outtmpl': str(tmp_path / '%(id)s.%(ext)s'),
                    'noplaylist': True,
                    'format': 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best',
                })

                with yt_dlp.YoutubeDL(dl_opts) as ydl:
                    info_dict = await loop.run_in_executor(None, lambda: ydl.extract_info(url, download=True))
                    if 'requested_downloads' in info_dict:
                        final_file_path = Path(info_dict['requested_downloads'][0]['filepath'])
                    else:
                        final_file_path = Path(ydl.prepare_filename(info_dict))
                    info_title = info_dict.get('title', 'Video')

            except Exception as e:
                logger.warning(f"⚠️ Passage à gallery-dl ({str(e)})...")
                try:
                    final_file_path = await self._try_gallery_dl(url, tmp_path)
                    detected_type = "image"
                    info_title = final_file_path.stem
                except Exception as g_e:
                    logger.error(f"❌ Tout a échoué.")
                    raise g_e

            if not final_file_path or not final_file_path.exists():
                raise FileNotFoundError("Aucun fichier final récupéré.")

            file_hash = await self._calculate_sha256(final_file_path)
            original_ext = final_file_path.suffix
            final_filename = f"{file_hash}{original_ext}"
            final_destination = dest_path / final_filename

            await loop.run_in_executor(None, shutil.move, str(final_file_path), str(final_destination))
            
            return {
                "title": info_title,
                "file_size": final_destination.stat().st_size,
                "file_hash": file_hash,
                "filename": final_filename,
                "type": detected_type
            }
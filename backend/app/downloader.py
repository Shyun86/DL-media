import asyncio
import hashlib
import json
import shutil
from pathlib import Path
from tempfile import TemporaryDirectory
from typing import Dict, Any

import yt_dlp

class MediaDownloader:
    """
    Téléchargeur média utilisant yt-dlp et ffmpeg.
    Optimisé pour utiliser le volume NAS pour les fichiers temporaires.
    """

    @staticmethod
    async def _calculate_sha256(file_path: Path) -> str:
        sha256_hash = hashlib.sha256()
        with open(file_path, "rb") as f:
            for byte_block in iter(lambda: f.read(4096), b""):
                sha256_hash.update(byte_block)
        return sha256_hash.hexdigest()

    @staticmethod
    async def _get_video_codecs(file_path: Path) -> Dict[str, str]:
        command = [
            "ffprobe", "-v", "quiet", "-print_format", "json",
            "-show_streams", str(file_path),
        ]
        process = await asyncio.create_subprocess_exec(
            *command,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE
        )
        stdout, stderr = await process.communicate()

        if process.returncode != 0:
            raise RuntimeError(f"ffprobe failed: {stderr.decode()}")

        streams = json.loads(stdout)["streams"]
        codecs = {
            "video": next((s["codec_name"] for s in streams if s["codec_type"] == "video"), None),
            "audio": next((s["codec_name"] for s in streams if s["codec_type"] == "audio"), None),
        }
        return codecs

    async def download_and_process(self, url: str, destination_folder: str) -> Dict[str, Any]:
        # 1. On s'assure que le dossier de destination (NAS) existe AVANT tout
        dest_path = Path(destination_folder)
        dest_path.mkdir(parents=True, exist_ok=True)

        # 2. CRUCIAL : On crée le dossier temporaire SUR LE NAS (dir=destination_folder)
        # Cela évite de saturer le disque système /tmp du conteneur
        with TemporaryDirectory(dir=destination_folder) as tmpdir:
            tmp_path = Path(tmpdir)
            print(f"📁 [Downloader] Utilisation du dossier temporaire : {tmp_path}")
            
            ydl_opts = {
                'outtmpl': str(tmp_path / '%(id)s.%(ext)s'),
                'format': 'bestvideo[ext=mp4][vcodec^=avc]+bestaudio[ext=m4a]/best[ext=mp4]/best',
                'noplaylist': True,
            }

            downloaded_file_path = None
            info_dict = {}

            loop = asyncio.get_running_loop()
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info_dict = await loop.run_in_executor(None, lambda: ydl.extract_info(url, download=True))
                downloaded_file_path = Path(ydl.prepare_filename(info_dict))

            if not downloaded_file_path or not downloaded_file_path.exists():
                raise FileNotFoundError("yt-dlp failed to download the file.")

            final_file_path = downloaded_file_path
            
            # 3. Vérification Codecs / Conversion
            codecs = await self._get_video_codecs(downloaded_file_path)
            is_compatible = codecs.get("video") == "h264" and codecs.get("audio") == "aac"

            if not is_compatible:
                print(f"⚙️ [Downloader] Conversion requise (Codecs actuels: {codecs})")
                converted_file_path = downloaded_file_path.with_suffix(".converted.mp4")
                ffmpeg_cmd = [
                    "ffmpeg", "-i", str(downloaded_file_path),
                    "-c:v", "libx264", "-c:a", "aac",
                    "-y", str(converted_file_path)
                ]
                process = await asyncio.create_subprocess_exec(
                    *ffmpeg_cmd,
                    stdout=asyncio.subprocess.PIPE,
                    stderr=asyncio.subprocess.PIPE
                )
                _, stderr = await process.communicate()

                if process.returncode != 0:
                    raise RuntimeError(f"ffmpeg conversion failed: {stderr.decode()}")
                
                final_file_path = converted_file_path

            # 4. Hash et Déplacement final
            file_hash = await self._calculate_sha256(final_file_path)
            file_size = final_file_path.stat().st_size
            
            final_filename = f"{file_hash}.mp4"
            final_destination = dest_path / final_filename

            # Déplacement atomique (car même disque)
            await loop.run_in_executor(None, shutil.move, str(final_file_path), str(final_destination))
            
            return {
                "title": info_dict.get("title", "Unknown Title"),
                "duration": info_dict.get("duration", 0),
                "file_size": file_size,
                "file_hash": file_hash,
                "filename": final_filename,
            }
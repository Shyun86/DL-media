# MediaFetcher — AI Context Specification

## GLOBAL GOAL

Build a full-stack web application named "MediaFetcher" deployed via **Docker Compose** inside an **Alpine Linux LXC** container on Proxmox.
Core features: Live feed aggregation (best effort), media downloading, storage on TrueNAS (SMB/NFS), and browser extension integration.

---

## INFRASTRUCTURE SPECIFICATIONS

- **Host OS:** Alpine Linux (LXC).
- **Deployment:** Docker & Docker Compose (Critical for dependency management).
- **Storage:**
  - TrueNAS VM (on same Proxmox host).
  - Mounted volume in Docker container: `/mnt/media`.
- **Network:** Application handles local and remote access.

---

## FRONTEND STACK

- **Framework:** React + TypeScript + Vite.
- **UI Library:** TailwindCSS + shadcn/ui.
- **State Management:** Zustand + TanStack Query.
- **Video:** HTML5 Video Tag (Requires MP4/H.264/AAC compatibility).

---

## BACKEND STACK (Dockerized)

- **Container:** Python 3.11+ (Slim or Alpine based image).
- **Framework:** FastAPI.
- **Database:** PostgreSQL (Run as separate Docker service).
- **Cache/Queue:** Redis (Run as separate Docker service).
- **Task Queue:** Arq (Lightweight, Redis-backed) or Celery (if strict requirements).
- **System Tools (Inside Container):**
  - `ffmpeg` (CRITICAL for transcoding).
  - `yt-dlp` (Latest version).
  - `cryptography` (For cookie encryption).

---

## DATA & STORAGE MODEL

### Reference Counting (Strict)
- **Physical File:** Stored on TrueNAS mount. Unique by Hash (SHA256).
- **Virtual Link:** `LibraryItem` in DB linking User <-> MediaFile.
- **Deletion Logic:**
  - `DELETE LibraryItem`.
  - Check `MediaFile.ref_count`.
  - If 0 -> `os.remove(path_on_truenas)`.

---

## MEDIA PROCESSING PIPELINE

1.  **Input:** URL from Extension or Feed.
2.  **Download:** `yt-dlp` attempts to download best quality.
3.  **Verification:** Check container and codec (`ffprobe`).
4.  **Transcode (If needed):**
    - If format != mp4 OR codec != h264:
    - Run `ffmpeg -i input -c:v libx264 -c:a aac output.mp4`.
    - *Note:* This ensures playback on all browsers (iOS/Desktop).

---

## FEED AGGREGATION ("HARDCORE" MODE)

- **Fail-Safe:** Connectors must implement try/catch blocks.
- **Behavior:** If a connector fails (timeout/ban), return empty list. Do NOT retry aggressively.
- **Session:** Use encrypted cookies provided by the extension.

---

## BROWSER EXTENSION

- **Manifest V3.**
- **No VPN Automation:** User is responsible for network context (VPN) when exporting cookies.
- **Features:**
  - Button: "Send Cookie Jar to Server".
  - Button: "Download This Media".

---

## SECURITY

- **Cookies:** AES-GCM encrypted in DB.
- **CORS:** Configure to allow Extension Origin.
- **Auth:** JWT for Frontend, Token for Extension.

---

## DEVELOPMENT STEPS

1.  **Infrastructure:** Write `docker-compose.yml` (Postgres, Redis, Backend, Frontend-builder).
2.  **Backend Core:** FastAPI setup + Database Models + Ref Counting Logic.
3.  **Downloader:** `yt-dlp` + `ffmpeg` wrapper implementation.
4.  **Frontend:** Dashboard + Video Player.
5.  **Extension:** Basic popup and API communication.

---

END OF SPECIFICATION
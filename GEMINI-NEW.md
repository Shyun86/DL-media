📂 Project MediaFetcher - Master Design Document
Vision: An all-in-one self-hosted platform to aggregate, archive, and consume social media content without cloud dependency. Current Status: Phase 4.5 (Hybrid Backend Operational / Frontend MVP in progress).

1. Project Objectives
Centralize: Retrieve content from multiple platforms (YouTube, TikTok, X, Insta, etc.) via a single interface.

Archive: Store media locally on a NAS (Physical data ownership).

Organize: Manage files via a fluid web interface with virtual folders and tags, without duplicating physical files.

View: Play videos and images comfortably directly from the browser (Integrated Player).

2. Functional Specifications (Frontend & UX)
🖥️ Dashboard
Global View: Instant system status.

Statistics: Download counters (In Progress / Success / Failed).

Recent History: Quick logs of the latest actions.

🏠 Home / Feed (Gallery)
Global Feed: A "Pinterest-style" view of all stored media.

Media Cards: Visual preview (Thumbnail), Title, Source platform icon.

Smart Filters: By Type (Video/Image/Audio), By Platform, By Date.

📚 Library (Organization)
Virtual Folders: Creation of collections (e.g., "Cosplay", "Tech", "Memes") independent of physical storage.

Multi-Membership: A single file can belong to multiple virtual folders (0 disk space duplication).

Search: Global search bar (Title, Tags, Source).

⚙️ Settings
User Account: Access management (Admin/User).

Connections: Cookie status (YouTube Premium, Twitter, etc.).

Storage: Visualization of NAS disk space used/remaining.

🧩 Browser Extension
Role: Secure bridge between the browser and the server.

Functions:

Automatic cookie export to the Backend.

Media detection on the active page.

"Quick Download" button (Send to NAS).

3. Technical Specifications (Backend & Engine)
🧱 Architecture
Type: Modular Monolithic Web Application (Frontend SPA + Backend API).

Containerization: Docker Compose (Isolated services).

Communication: REST API (FastAPI) + WebSocket (Real-time) + Queue (Redis).

⚙️ Tech Stack
Frontend: React 18, TypeScript, TailwindCSS, Vite.

Backend: Python 3.11, FastAPI.

Queue & Workers: Redis + Arq (Asynchronous download management).

Database: PostgreSQL (Metadata, Users, Virtual structure).

Physical Storage: NAS (TrueNAS Scale) mounted via NFS/SMB in containers.

🔧 Download Engines (The "Brain")
The system uses a Hybrid strategy to guarantee the best quality:

Analysis (Probe): The worker inspects the URL via yt-dlp to determine content type.

Smart Routing:

🎥 Video (YouTube, TikTok, Twitch): Engine yt-dlp.

🎵 Audio (Soundcloud): Engine yt-dlp. Extraction to MP3.

🖼️ Image (X/Twitter, Insta, Pinterest): Engine gallery-dl. Download of the original (JPG/PNG/WEBP).

Finalization & Transcoding:
1. Verification (ffprobe): For videos, check if the container is MP4 and codecs are H.264/AAC.
2. Transcoding (ffmpeg): If not compliant, transcode to ensure maximum web compatibility. This is critical.
3. SHA256 Hash calculation: Binary deduplication on the final, compliant file.
4. Renaming: `{sha256}.{ext}`.
5. Atomic move: From the temporary directory (`/media/tmp`) to the final storage (`/media/final`).

4. Security & Authentication
Cookie Management:

Cookies are never exposed to the Frontend.

Transfer flow: Extension -> API (Secure POST) -> cookies.txt File (Backend only).

Format: Netscape (compatible with yt-dlp and gallery-dl).

Pairing: The extension communicates only with the server's local IP.

Encryption (Target V1.5): AES encrypted storage of cookies at rest.

5. Data Organization
Physical Structure (On Disk/NAS)
The directory structure is Flat to ensure compatibility with other software (Plex, Jellyfin):

/mnt/truenas/App-DL/media/
├── tmp/            # Temporary workspace for downloads
└── final/          # Definitive storage (hashed filenames)
Logical Structure (Database)
Organization is managed by PostgreSQL:

Table Media: ID, Hash, Path, Metadata, Type.

Table Folder: ID, Name, Parent_ID.

Table MediaFolder: Junction table (n-n) allowing one media to be in multiple folders.

6. Development Philosophy
Stable First: If one engine fails, the other takes over (Fallback). No silent crashes.

Agnostic: The system treats Video, Audio, and Image with equal care.

Local First: Everything is stored locally, nothing in the cloud.

Extensible: Worker architecture allows adding other engines later (e.g., torrent, aria2).

7. Implementation Context (AI Reference)
7.1 Project Structure
The project follows a standard monorepo structure utilizing Docker Compose. This structure separates concerns between the API layer, the processing layer, and the presentation layer.

/project-root
├── docker-compose.yml      # Orchestrates all services
├── .env                    # Environment variables (Gitignored)
├── GEMINI-NEW.md           # This Master Design Document
│
├── backend/                # FastAPI Application (API Layer)
│   ├── Dockerfile
│   ├── requirements.txt
│   └── app/
│       ├── main.py         # API Routes, WebSocket & Startup
│       ├── database.py     # DB Connection & Base Model
│       ├── models.py       # SQLAlchemy ORM Models
│       └── schemas.py      # Pydantic Schemas for API I/O
│
├── frontend/               # React + Vite Application (Presentation Layer)
│   ├── Dockerfile
│   ├── package.json
│   ├── vite.config.ts
│   └── src/
│       ├── App.tsx         # Main Component & Routing
│       ├── components/     # UI Components (Dashboard, Gallery, etc.)
│       └── api/            # Fetch/Axios wrappers for backend communication
│
├── workers/                # Arq Worker Application (Processing Layer)
│   ├── Dockerfile
│   ├── requirements.txt
│   └── app/
│       ├── main.py         # Arq Worker Settings & Task Definitions
│       └── downloader.py   # Core Logic (yt-dlp, gallery-dl, ffmpeg)
│
└── extension/              # Chrome Extension (Manifest V3)
    ├── manifest.json
    ├── popup.html
    └── popup.js

7.2 Key Environment Variables (.env)
Required for Docker Compose context.

# Common
POSTGRES_USER=mediafetcher
POSTGRES_PASSWORD=secure_password
POSTGRES_DB=mediafetcher_db
REDIS_HOST=redis
NAS_MEDIA_PATH=/mnt/truenas/App-DL/media

# Backend
ALLOWED_ORIGINS=* # For CORS

# Frontend
VITE_API_URL=http://<SERVER_IP>:8000

7.3 API Endpoints Contract (V1)
The backend exposes the following routes for the Frontend and Extension:

GET /: Health check.

POST /api/download:
- Input: `{ "url": "https://..." }`
- Action: Enqueues a download job to Redis.
- Output: `{ "job_id": "...", "status": "queued" }`

POST /api/update-cookies:
- Input: `{ "url": "...", "cookies": [...] }`
- Action: Updates cookies.txt (Netscape format).
- Output: `{ "status": "success", "count": X }`

GET /api/media:
- Action: Lists all media files from the database.
- Output: `[{ "id": "...", "file_path": "...", ... }]`

GET /api/folders:
- Action: Lists all virtual folders.
- Output: `[{ "id": "...", "name": "...", ... }]`

7.4 Database Schema (PostgreSQL)
Definitive schema for SQLAlchemy ORM, reflecting the logical data structure. The `uuid-ossp` extension should be enabled in PostgreSQL for `uuid_generate_v4`.

**Table: media**
- `id` (UUID, Primary Key, default: `uuid_generate_v4()`)
- `file_hash` (String, Unique, Not Null): SHA256 hash of the physical file.
- `file_path` (String, Not Null): Relative path on the NAS (e.g., "final/hash.mp4").
- `media_type` (Enum: 'VIDEO', 'IMAGE', 'AUDIO', Not Null)
- `file_size` (BigInteger, Not Null): Size in bytes.
- `source_url` (String, Nullable): Original URL of the media.
- `created_at` (DateTime, default: `func.now()`)

**Table: folders**
- `id` (UUID, Primary Key, default: `uuid_generate_v4()`)
- `name` (String, Not Null)
- `parent_id` (UUID, ForeignKey('folders.id'), Nullable): For nested folders.
- `created_at` (DateTime, default: `func.now()`)

**Table: media_folders** (Junction Table for Many-to-Many relationship)
- `media_id` (UUID, ForeignKey('media.id', ondelete='CASCADE'), Primary Key)
- `folder_id` (UUID, ForeignKey('folders.id', ondelete='CASCADE'), Primary Key)

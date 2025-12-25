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

🎥 Video (YouTube, TikTok, Twitch): Engine yt-dlp. Forced conversion to MP4 (H.264/AAC) for maximum web compatibility.

🎵 Audio (Soundcloud): Engine yt-dlp. Extraction to MP3 (192kbps).

🖼️ Image (X/Twitter, Insta, Pinterest): Engine gallery-dl. Download of the original (JPG/PNG/WEBP) without destructive conversion.

Finalization:

SHA256 Hash calculation (Binary deduplication).

Renaming: {sha256}.{ext}.

Atomic move to /media.

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

Plaintext

/mnt/truenas/App-DL/media/
├── tmp/            # Temporary workspace
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
# MediaFetcher — Frontend Context (V1)

## 0) Purpose of this document
This document is the single source of truth for building the **MediaFetcher Frontend (V1)**.
It defines:
- UI/UX rules and visual design (theme, tokens, layout)
- Pages, routing, behaviors, and interactions
- Component expectations and reusable patterns
- Frontend data flow (API + WebSocket contracts expected)
- Non-goals and constraints for V1

The frontend is a **multipage web app** (React Router) with a cohesive layout and consistent components.

---

## 1) Product summary (Frontend scope)
MediaFetcher is a self-hosted web platform that:
- shows **local stored media** (Home)
- organizes media into **virtual folders** (Library)
- provides a **Live Feed aggregator** (Feed) to browse content from platforms and download directly
- monitors download jobs and stats (Dashboard)
- manages user settings, platform connections, storage config, and extension status (Settings)

Supported platforms in V1:
- Instagram
- TikTok
- Reddit
- Twitter/X
- YouTube (**Shorts only**, not long videos)

---

## 2) Tech decisions (Frontend)
**Mandatory stack (V1):**
- React 18 + TypeScript
- Vite
- React Router (multipage)
- TailwindCSS
- shadcn/ui (component base)
- lucide-react (icons)
- TanStack Query (API cache & async state)
- Zustand (UI-only state: modals, viewer state, selected platforms, etc.)
- WebSocket client for real-time events (downloads, notifications)

**Charts:**
- Recharts (preferred) OR Chart.js if needed later. (V1 should keep charts minimal.)

**Media playback:**
- HTML5 `<video>` for videos (backend ensures MP4/H.264/AAC compatibility).

---

## 3) Routing (V1)
Routes must exist exactly as follows:

- `/login`
- `/signup`
- `/dashboard`
- `/home`
- `/feed`
- `/library`
- `/library/:folderId`
- `/media/:id`
- `/settings`
- `/notifications`

### Why `/media/:id`?
- It allows a **permalink** to any media item (shareable URL, browser history, refresh safe).
- The viewer can still open as a modal, but `/media/:id` guarantees deep linking.

### Why `/library/:folderId`?
- It is the canonical page for a selected folder.
- Enables direct links to a folder and correct navigation/back behavior.

---

## 4) Global layout & navigation
### Layout: Sidebar + Main content
- Left sidebar (collapsible)
- Main content area to the right
- Top actions can exist per page; a global topbar is optional (see below)

### Sidebar behavior
- Collapsible (expanded and compact modes)
- Order (top to bottom):
  1. Dashboard
  2. Home
  3. Feed
  4. Library
  5. Settings (must be visually separated at the bottom)

### Mobile support (V1)
V1 MUST be usable on mobile.

**Hamburger sidebar** meaning:
- On small screens, the sidebar becomes hidden and is opened by a “hamburger” button (☰).
- In practice:
  - A top-left button opens a Drawer containing sidebar navigation.
  - Closing the drawer: tapping outside, close button, ESC (when possible).

---

## 5) Design system (V1)

### 5.1 Theme
- Dark theme
- Very dark gray backgrounds
- Purple as primary accent
- Cards: “soft” style (subtle border + subtle shadow + gentle elevation)
- Spacing: airy / comfortable (not dense)
- Border radius: medium

### 5.2 Primary purple palette (provided)
Use this exact palette as the project base (map to tokens as needed):

- #F8E6FF
- #EBB9FE
- #DF8BFD
- #D25EFD
- #C631FC
- #AB03EA
- #9803CE
- #7702A1
- #550274
- #340146
- #130019

Recommendation for token mapping (example):
- `--mf-accent-500: #C631FC`
- `--mf-accent-600: #AB03EA`
- `--mf-accent-700: #9803CE`

### 5.3 Typography
- Default font: **Inter** (recommended)
  - If Inter is not available, use system UI fonts.
- Clear hierarchy:
  - Page title: large + bold
  - Section title: medium + semibold
  - Body: normal weight
  - Muted text: lower contrast

(If you asked “what do you mean by typo”: it’s the font choice and text hierarchy.)

### 5.4 Components styling rules
- Buttons:
  - Primary = purple
  - Secondary = neutral dark
  - Destructive = red
- Badges:
  - Status badges: Completed (purple), In progress (purple), Failed (red), Queued (gray)
- Inputs:
  - Rounded, dark background, clear focus ring (purple)
- Cards:
  - Soft border + soft shadow
  - Clear padding and spacing
- Empty states:
  - Must be designed, not blank: icon + title + short explanation + CTA

### 5.5 Page-level visual reference
UI must match the style of the provided screenshots:
- dashboard stats cards
- recent activity list with badges and actions
- home/feed media cards with platform badge and overlay actions
- settings cards sections (Storage, Download Settings, Browser Integration, Notifications, Supported Sites)

---

## 6) Global UX rules
### 6.1 Notifications center (persistent)
- There is a notification center (bell icon or dedicated area)
- Notifications are **persistent** (stored server-side) and shown in UI
- In addition to the center, toasts may appear for immediate feedback

### 6.2 Confirmations
- Destructive actions use a confirmation modal:
  - Delete media (delete local file or unlink? depends on backend)
  - Remove from folder (optional)
  - Disconnect platform account (optional)
- Confirmation modal is **systematic** (always required)

### 6.3 Error behavior
- Download error:
  - show toast with “Retry”
  - job card shows failed status
- Inaccessible media:
  - clicking the item opens an error panel/modal:
    - show error message
    - show “Remove from library” or “Retry metadata fetch” if supported
    - never silently hide the item

---

## 7) Viewer / Preview behavior (Twitter-like)
### 7.1 Open behavior
- Viewer opens on **single click**
- Viewer supports:
  - close button top-right
  - ESC closes
  - clicking outside / on viewer borders closes

### 7.2 Viewer implementation (both required)
- Modal overlay viewer (default UX)
- Also supports route deep-link:
  - `/media/:id`
  - Opening `/media/:id` shows the same viewer UI (as a page or page+modal style)

### 7.3 Viewer audio/video rules
- Autoplay enabled
- Audio starts **ON** by default (not muted)

### 7.4 Viewer actions (V1)
- `Add to library` (opens modal with folder selection)
- `Delete` (confirmation modal)
- `Download` action:
  - Only required/visible when media originates from Feed context or when a “download source” exists
  - In Home/Library, download button can be omitted if media is already stored (optional)

### 7.5 Navigation inside viewer
- Must support BOTH:
  - keyboard arrows (prev/next)
  - swipe / touch navigation (mobile)

### 7.6 Playback speed control
- Speed control exists but is configured from a Settings section/tab.
- Viewer reads default speed preference from user settings.

---

## 8) Page specifications

### 8.1 Login (`/login`) and Signup (`/signup`)
Auth method V1:
- email + password
- roles: admin / user (role is managed server-side, frontend displays it and gates admin-only settings if needed)

Login UX:
- clear errors
- loading states
- password visibility toggle
- link to signup
- after login redirect to `/dashboard`

Signup UX:
- minimal fields (email, password, confirm password)
- after signup redirect to `/dashboard` (or `/login` depending backend)

### 8.2 Dashboard (`/dashboard`)
Purpose:
- show system status overview and recent jobs

UI:
- 4 stat cards: Total / Completed / In Progress / Failed
- Recent Activity list with status badge and actions

Recent job fields (V1 list):
- progress (during running) OR final status when finished
- title
- platform
- size
- time (hour)

Actions on job cards (V1):
- Retry
- Cancel
- View logs

Real-time:
- Use WebSocket events to update progress and statuses continuously.

### 8.3 Home (`/home`)
Purpose:
- global local media gallery (all downloaded content)

Layout:
- Pinterest-style grid (responsive)
- media cards show:
  - thumbnail / preview
  - title
  - platform badge/icon
  - type (video/image/audio) marker if needed

Filters (V1):
- by Type (video/image/audio)
- by Platform
- sort default: newest first

Scrolling:
- infinite scroll with pagination via API
- skeleton loading placeholders for grid items are recommended (but user said “no” for option 41; so use minimal spinners or simple placeholders)

Click:
- single click opens viewer

### 8.4 Library (`/library` and `/library/:folderId`)
Purpose:
- organize media into virtual folders & subfolders

Folder cards (top-level):
- cover image (select from media in folder)
- folder name
- small stats (media count, total size optional)

Subfolders:
- displayed as a **compact list of small cards**
- still shows name + small stats

Folder selection and navigation:
- `/library` shows root folders
- `/library/:folderId` shows folder content + subfolders + media grid

Add to folders UX:
- A button `Add to folders` opens a modal:
  - folder tree / list
  - multi-select folders
  - confirm applies links without duplicating files

Cover image:
- can be chosen from existing media in the folder/subfolder (no manual upload required in V1)

### 8.5 Feed (LIVE) (`/feed`)
Purpose:
- live aggregated feed across selected platforms + download from web UI

Top controls:
- platform selection as a dropdown at top
- search bar fixed at top
- selected platforms shown as chips

Feed behavior:
- infinite scroll continuous loading
- cards are standardized across platforms

Each feed card includes:
- thumbnail / preview
- title (if known)
- platform badge
- action buttons on the side:
  - Download (enqueue)
  - Preview (opens viewer)
  - (Optional) Save/Bookmark later

Search:
- searches on selected platforms only

YouTube rule:
- YouTube feed items must represent **Shorts only**.

### 8.6 Settings (`/settings`)
Settings are displayed as **cards/sections** (like provided screenshot).
A “Save Changes” button exists top-right.

Sections required (V1):
1) Storage & Paths
2) Download Settings
3) Browser Integration
4) Notifications
5) Supported Sites
6) Connected Accounts (platform connection)

#### 8.6.1 Storage & Paths
- shows NAS path / root directory (read-only or editable depending backend)
- shows file naming pattern (V1 backend uses hash naming; UI can still show pattern but may be disabled)
- “organize by date” toggle (if supported)

#### 8.6.2 Download Settings
- V1 download quality is auto-best (backend), but UI can still display a quality selector for future
- max concurrent downloads
- thumbnail toggle
- keep original toggle
- audio extraction toggle (for future; V1 supports audio as media type)

#### 8.6.3 Browser Integration
- auto-update cookies toggle
- extension status panel (Connected / Active)
- actions: open extension, refresh status

#### 8.6.4 Notifications
- global enable toggle
- types toggles:
  - Download Started
  - Download Completed
  - Download Failed
  - New Library Created (optional)
- notifications are persistent (loaded from backend)

#### 8.6.5 Supported Sites
- grid of platforms with status “Active”
- shows download counts (optional)

#### 8.6.6 Connected Accounts
For each platform:
- platform name
- button:
  - Connect (if disconnected)
  - Disconnect (if connected)
- show connected account name if possible (username/handle returned by backend)
- show connection state badge

Connection flow UX:
- click Connect -> opens new window or instructions -> user logs in -> extension exports cookies -> status changes to connected.

---

## 9) Frontend data flow

### 9.1 API base
Frontend uses `VITE_API_URL` as base URL.
All API calls go through a shared API client layer.

### 9.2 WebSocket
Frontend maintains one WS connection after login:
- receives download progress
- receives new notifications
- updates UI in real time (Dashboard, Notifications center)

---

## 10) Expected API contracts (Frontend-facing)
This section defines what the frontend expects. The backend must implement similar endpoints.

Auth:
- `POST /auth/login`
- `POST /auth/signup`
- `POST /auth/logout`
- `GET /auth/me`

Media:
- `GET /media?type=&platform=&cursor=`
- `GET /media/:id`
- `DELETE /media/:id`

Libraries:
- `GET /folders`
- `GET /folders/:id`
- `POST /folders`
- `PATCH /folders/:id`
- `DELETE /folders/:id`
- `POST /folders/:id/cover` (select from existing media)
- `POST /media/:id/folders` (bulk assign to multiple folders)

Downloads:
- `POST /downloads/enqueue` (from feed item URL)
- `GET /downloads/recent`
- `POST /downloads/:id/retry`
- `POST /downloads/:id/cancel`
- `GET /downloads/:id/logs`

Feed (live):
- `GET /feed?platforms=ig,tk,rd,x,ytshorts&cursor=`
- `GET /feed/search?q=...&platforms=...&cursor=`

Settings:
- `GET /settings`
- `PATCH /settings`

Notifications:
- `GET /notifications`
- `POST /notifications/mark-read`
- `DELETE /notifications/:id` (optional)

Connected accounts:
- `GET /connections`
- `POST /connections/:platform/connect` (starts flow / returns instructions)
- `POST /connections/:platform/disconnect`

Extension status:
- `GET /extension/status`

---

## 11) Expected WebSocket events
WebSocket message examples (suggested structure):

Download progress:
```json
{
  "type": "download.progress",
  "jobId": "uuid",
  "progress": 67,
  "status": "downloading",
  "title": "Nature Photography Collection",
  "platform": "imgur",
  "sizeBytes": 123456789
}
Download finished:

json
Copier le code
{
  "type": "download.finished",
  "jobId": "uuid",
  "status": "completed",
  "mediaId": "uuid"
}
Download failed:

json
Copier le code
{
  "type": "download.failed",
  "jobId": "uuid",
  "status": "failed",
  "error": "Access denied - requires authentication"
}
New notification:

json
Copier le code
{
  "type": "notification.new",
  "id": "uuid",
  "level": "info",
  "title": "Download completed",
  "message": "Saved to NAS",
  "createdAt": "2025-12-26T00:00:00Z"
}
12) Role-based UI (admin/user)
Frontend must:

read user role from /auth/me

hide or disable admin-only settings if user is not admin

still allow basic browsing and downloads for normal users

Admin-only examples (V1):

storage path configuration

max concurrent downloads global limit (if global)

supported sites toggles (if system-level)

13) Non-goals for V1 (Frontend)
DRM bypass UI flows

Advanced content analysis (OCR/transcripts)

Advanced permission matrix

Complex theming system beyond dark+purple

Offline-first mode

14) Deliverable expectations (what to build)
A complete, working frontend app that:

compiles and runs (Vite)

has all routes and UI screens

integrates with API + WS (even with mocked responses initially)

matches the defined design style and interactions

is mobile usable

END.
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  LayoutDashboard,
  Home,
  Rss,
  Library,
  Settings,
  Bell,
  FolderOpen,
  Download,
  Trash2,
  FolderPlus,
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Music2,
  Image as ImageIcon,
  Search,
  SlidersHorizontal,
  Sparkles,
  ExternalLink,
} from "lucide-react";

const nav = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Home", icon: Home, href: "/home" },
  { label: "Feed", icon: Rss, href: "/feed" },
  { label: "Library", icon: Library, href: "/library" },
];

type MediaType = "video" | "image" | "audio";

type PlatformKey = "yt" | "ig" | "tt" | "rd" | "x";

type FeedItem = {
  id: string;
  type: MediaType;
  title: string;
  platformKey: PlatformKey;
  platformLabel: "YouTube Shorts" | "Instagram" | "TikTok" | "Reddit" | "Twitter/X";
  author?: string;
  timeLabel: string;
  thumb: string; // fallback poster
  src?: string; // video/audio source
  originUrl?: string;
};

const mockFeed: FeedItem[] = [
  {
    id: "f1",
    type: "video",
    title: "Street Drift — Quick Clip",
    platformKey: "yt",
    platformLabel: "YouTube Shorts",
    author: "@TurboDaily",
    timeLabel: "Just now",
    thumb:
      "https://images.unsplash.com/photo-1517949908119-720d3d8f5cce?auto=format&fit=crop&w=900&q=70",
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    originUrl: "https://youtube.com/shorts/abc",
  },
  {
    id: "f2",
    type: "image",
    title: "Minimal Desk Setup",
    platformKey: "ig",
    platformLabel: "Instagram",
    author: "@studio.vibes",
    timeLabel: "2m ago",
    thumb:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=70",
    originUrl: "https://instagram.com/p/xyz",
  },
  {
    id: "f3",
    type: "video",
    title: "AI Prompt Trick (fast)",
    platformKey: "tt",
    platformLabel: "TikTok",
    author: "@promptlab",
    timeLabel: "6m ago",
    thumb:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=900&q=70",
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    originUrl: "https://tiktok.com/@promptlab/video/123",
  },
  {
    id: "f4",
    type: "image",
    title: "Cool rendering (WIP)",
    platformKey: "rd",
    platformLabel: "Reddit",
    author: "u/renderkid",
    timeLabel: "12m ago",
    thumb:
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=900&q=70",
    originUrl: "https://reddit.com/r/blender/...",
  },
  {
    id: "f5",
    type: "audio",
    title: "Ambient loop",
    platformKey: "x",
    platformLabel: "Twitter/X",
    author: "@audio.wave",
    timeLabel: "25m ago",
    thumb:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=900&q=70",
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3",
    originUrl: "https://x.com/...",
  },
];

function Sidebar({ collapsed = false }: { collapsed?: boolean }) {
  return (
    <aside
      className={
        "hidden md:flex h-screen sticky top-0 border-r border-white/10 bg-black/30 backdrop-blur-xl " +
        (collapsed ? "w-20" : "w-72")
      }
    >
      <div className="flex flex-col w-full">
        <div className="px-5 py-5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-fuchsia-500/60 to-violet-500/40 ring-1 ring-white/10" />
            {!collapsed && (
              <div className="leading-tight">
                <div className="text-white font-semibold">MediaFetcher</div>
                <div className="text-xs text-white/50">Live feed aggregator</div>
              </div>
            )}
          </div>
        </div>

        <nav className="px-3 space-y-1">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-white/80 hover:text-white hover:bg-white/5 transition " +
                (item.href === "/feed" ? "bg-white/5 text-white" : "")
              }
            >
              <item.icon className="h-5 w-5" />
              {!collapsed && <span className="text-sm">{item.label}</span>}
            </a>
          ))}
        </nav>

        <div className="mt-auto px-3 pb-4">
          <div className="h-px bg-white/10 my-3" />
          <a
            href="/settings"
            className={
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-white/80 hover:text-white hover:bg-white/5 transition"
            }
          >
            <Settings className="h-5 w-5" />
            {!collapsed && <span className="text-sm">Settings</span>}
          </a>
          <a
            href="#notifications"
            className="mt-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-white/80 hover:text-white hover:bg-white/5 transition"
          >
            <Bell className="h-5 w-5" />
            {!collapsed && <span className="text-sm">Notifications</span>}
          </a>
        </div>
      </div>
    </aside>
  );
}

function TypePill({ type }: { type: MediaType }) {
  const icon =
    type === "video" ? (
      <Play className="h-3.5 w-3.5" />
    ) : type === "image" ? (
      <ImageIcon className="h-3.5 w-3.5" />
    ) : (
      <Music2 className="h-3.5 w-3.5" />
    );
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/40 px-2 py-1 text-[11px] text-white/80">
      {icon}
      {type}
    </span>
  );
}

function PlatformBadge({ label }: { label: FeedItem["platformLabel"] }) {
  return (
    <Badge className="bg-violet-500/20 text-violet-200 border border-violet-500/30">
      {label}
    </Badge>
  );
}

function ViewerContent({
  item,
  onClose,
  onPrev,
  onNext,
}: {
  item: FeedItem;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="relative w-full h-[80vh] md:h-[82vh] flex flex-col">
      {/* Close button */}
      <Button
        size="icon"
        variant="secondary"
        className="absolute right-4 top-4 z-20 bg-black/50 hover:bg-black/70 border border-white/10 text-white rounded-xl"
        onClick={onClose}
        title="Close"
      >
        <X className="h-4 w-4" />
      </Button>

      {/* Prev/Next */}
      <Button
        size="icon"
        variant="secondary"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 border border-white/10 text-white rounded-xl"
        onClick={onPrev}
        title="Previous"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <Button
        size="icon"
        variant="secondary"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 border border-white/10 text-white rounded-xl"
        onClick={onNext}
        title="Next"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>

      {/* Media */}
      <div className="flex-1 overflow-hidden rounded-2xl border border-white/10 bg-black/40">
        {item.type === "image" ? (
          <img
            src={item.thumb}
            alt=""
            className="h-full w-full object-contain"
          />
        ) : item.type === "video" ? (
          <video
            src={item.src}
            className="h-full w-full object-contain"
            controls
            autoPlay
          />
        ) : (
          <div className="h-full w-full flex flex-col items-center justify-center gap-4 p-8">
            <div className="text-white/85 font-semibold">Audio</div>
            <audio src={item.src} controls autoPlay />
          </div>
        )}
      </div>

      {/* Info / actions */}
      <div className="mt-4 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="text-white text-lg font-semibold truncate">
              {item.title}
            </div>
            <PlatformBadge label={item.platformLabel} />
            <TypePill type={item.type} />
          </div>
          <div className="text-xs text-white/45 mt-2">
            {item.author ? `${item.author} • ` : ""}{item.timeLabel}
          </div>
          {item.originUrl && (
            <a
              href={item.originUrl}
              className="mt-2 inline-flex items-center gap-2 text-xs text-violet-200/90 hover:text-violet-200"
              target="_blank"
              rel="noreferrer"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Open source
            </a>
          )}
        </div>

        <div className="flex items-center gap-2 justify-end">
          <Button
            className="bg-violet-600 hover:bg-violet-600/90 rounded-xl"
            onClick={() => alert("Download (enqueue) — mock")}
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button
            variant="secondary"
            className="bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl"
            onClick={() => alert("Add to library (folders modal) — mock")}
          >
            <FolderPlus className="h-4 w-4 mr-2" />
            Add to library
          </Button>
          <Button
            variant="secondary"
            className="bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl"
            onClick={() => alert("Delete — confirmation modal in real app")}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

function FeedCard({
  item,
  onOpen,
  onDownload,
}: {
  item: FeedItem;
  onOpen: () => void;
  onDownload: () => void;
}) {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  // Autoplay/pause based on visibility (works nicely with snap scrolling)
  React.useEffect(() => {
    if (item.type !== "video") return;
    const el = videoRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!videoRef.current) continue;
          if (e.isIntersecting && e.intersectionRatio >= 0.75) {
            // Attempt to play with sound; some browsers may require a user gesture.
            videoRef.current.play().catch(() => {
              // If autoplay with sound is blocked, try muted autoplay.
              videoRef.current!.muted = true;
              videoRef.current!.play().catch(() => {});
            });
          } else {
            videoRef.current.pause();
          }
        }
      },
      { threshold: [0, 0.5, 0.75, 1] }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [item.type]);

  return (
    <div className="w-full scroll-snap-item">
      {/* TikTok/Shorts-like vertical card */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-sm">
        {/* 9:16-ish frame */}
        <div
          className="relative w-full bg-black/40"
          style={{ aspectRatio: "9 / 16" }}
        >
          {/* Media surface */}
          {item.type === "video" ? (
            <video
              ref={videoRef}
              src={item.src}
              poster={item.thumb}
              className="absolute inset-0 h-full w-full object-cover"
              playsInline
              loop
              autoPlay
              // try unmuted first; observer fallback sets muted=true if blocked
              muted={false}
              onClick={onOpen}
            />
          ) : item.type === "image" ? (
            <img
              src={item.thumb}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
              onClick={onOpen}
              role="button"
            />
          ) : (
            <div
              className="absolute inset-0 h-full w-full flex items-center justify-center"
              onClick={onOpen}
              role="button"
            >
              <div className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white/80">
                <div className="flex items-center gap-2">
                  <Music2 className="h-4 w-4" />
                  Audio preview
                </div>
              </div>
            </div>
          )}

          {/* Top badges */}
          <div className="absolute left-3 top-3 flex items-center gap-2">
            <PlatformBadge label={item.platformLabel} />
            <TypePill type={item.type} />
          </div>

          {/* Download button (lower-right, like your screenshot) */}
          <div className="absolute right-3 bottom-24 flex flex-col gap-2">
            <Button
              size="icon"
              className="bg-violet-600 hover:bg-violet-600/90 rounded-2xl h-12 w-12"
              title="Download"
              onClick={(e) => {
                e.stopPropagation();
                onDownload();
              }}
            >
              <Download className="h-5 w-5" />
            </Button>
          </div>

          {/* Bottom overlay info */}
          <div className="absolute inset-x-0 bottom-0 p-4">
            <div className="rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl p-3">
              <div
                className="text-white/95 font-semibold leading-snug cursor-pointer"
                onClick={onOpen}
              >
                {item.title}
              </div>
              <div className="mt-2 text-xs text-white/60 flex items-center gap-2 flex-wrap">
                {item.author && <span>{item.author}</span>}
                {item.author && <span className="text-white/30">•</span>}
                <span>{item.timeLabel}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FeedMockPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

  const [query, setQuery] = React.useState("");

  // Download modal (after click download, user can pick library/folder)
  const [downloadOpen, setDownloadOpen] = React.useState(false);
  const [downloadTarget, setDownloadTarget] = React.useState<FeedItem | null>(null);
  const [destLibrary, setDestLibrary] = React.useState<string>("auto");

  const [platforms, setPlatforms] = React.useState<Record<PlatformKey, boolean>>({
    yt: true,
    ig: true,
    tt: true,
    rd: true,
    x: true,
  });

  const selectedPlatforms = (Object.keys(platforms) as PlatformKey[]).filter(
    (k) => platforms[k]
  );

  const filtered = React.useMemo(() => {
    const selected = new Set(selectedPlatforms);
    return mockFeed
      .filter((f) => selected.has(f.platformKey))
      .filter((f) =>
        query.trim().length === 0
          ? true
          : f.title.toLowerCase().includes(query.trim().toLowerCase()) ||
            (f.author ?? "").toLowerCase().includes(query.trim().toLowerCase())
      );
  }, [query, selectedPlatforms.join(",")]);

  const [viewerOpen, setViewerOpen] = React.useState(false);
  const [viewerIndex, setViewerIndex] = React.useState(0);

  const openViewer = (id: string) => {
    const idx = filtered.findIndex((m) => m.id === id);
    setViewerIndex(Math.max(0, idx));
    setViewerOpen(true);
  };

  const openDownload = (id: string) => {
    const it = filtered.find((m) => m.id === id) ?? null;
    setDownloadTarget(it);
    setDownloadOpen(true);
  };

  const closeViewer = () => setViewerOpen(false);

  const prev = () => setViewerIndex((i) => (i - 1 + filtered.length) % filtered.length);
  const next = () => setViewerIndex((i) => (i + 1) % filtered.length);

  React.useEffect(() => {
    if (!viewerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeViewer();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [viewerOpen, filtered.length]);

  const viewerItem = filtered[viewerIndex];

  const setPlatform = (key: PlatformKey, value: boolean) => {
    setPlatforms((p) => ({ ...p, [key]: value }));
  };

  const platformLabel = (k: PlatformKey) =>
    k === "yt"
      ? "YouTube Shorts"
      : k === "ig"
      ? "Instagram"
      : k === "tt"
      ? "TikTok"
      : k === "rd"
      ? "Reddit"
      : "Twitter/X";

  return (
    <div className="min-h-screen bg-[radial-gradient(1200px_600px_at_15%_0%,rgba(168,85,247,0.18),transparent_55%),radial-gradient(900px_500px_at_85%_10%,rgba(236,72,153,0.10),transparent_55%),linear-gradient(to_bottom,rgba(0,0,0,0.92),rgba(0,0,0,0.96))]">
      {/* Mobile header */}
      <div className="md:hidden sticky top-0 z-30 border-b border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  <span className="text-xl">☰</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 bg-black/90 border-white/10">
                <SheetHeader>
                  <SheetTitle className="text-white">MediaFetcher</SheetTitle>
                </SheetHeader>
                <div className="mt-4 space-y-1">
                  {nav
                    .concat([{ label: "Settings", icon: Settings, href: "/settings" }])
                    .map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        className={
                          "flex items-center gap-3 rounded-xl px-3 py-2.5 text-white/80 hover:text-white hover:bg-white/10 transition " +
                          (item.href === "/feed" ? "bg-white/10 text-white" : "")
                        }
                      >
                        <item.icon className="h-5 w-5" />
                        <span className="text-sm">{item.label}</span>
                      </a>
                    ))}
                </div>
              </SheetContent>
            </Sheet>
            <div className="text-white font-semibold">Feed</div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="bg-violet-600 hover:bg-violet-600/90"
                size="icon"
                title="Platforms"
              >
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 bg-black/95 border-white/10 text-white" align="end">
              <DropdownMenuLabel className="text-white/80">
                Platforms
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/10" />
              {(Object.keys(platforms) as PlatformKey[]).map((k) => (
                <DropdownMenuCheckboxItem
                  key={k}
                  checked={platforms[k]}
                  onCheckedChange={(v) => setPlatform(k, Boolean(v))}
                >
                  {platformLabel(k)}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="px-4 pb-3">
          <div className="relative">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search across selected platforms..."
              className="bg-black/30 border-white/10 text-white placeholder:text-white/35 rounded-xl pl-10"
            />
            <Search className="h-4 w-4 text-white/35 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <div className="mt-2 flex flex-wrap gap-2">
            {selectedPlatforms.map((k) => (
              <Badge
                key={k}
                className="bg-white/10 text-white/80 border border-white/10"
              >
                {platformLabel(k)}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="flex">
        <Sidebar collapsed={sidebarCollapsed} />

        <main className="flex-1">
          {/* Desktop header */}
          <div className="hidden md:block sticky top-0 z-20 border-b border-white/10 bg-black/30 backdrop-blur-xl">
            <div className="px-8 py-6 flex items-start justify-between gap-6">
              <div>
                <div className="text-4xl font-semibold tracking-tight text-violet-300">
                  Feed
                </div>
                <div className="text-white/55 mt-1">
                  Live aggregated feed — download directly from the web
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  className="text-white/80 hover:text-white hover:bg-white/10"
                  onClick={() => setSidebarCollapsed((v) => !v)}
                  title="Toggle sidebar"
                >
                  <FolderOpen className="h-4 w-4 mr-2" />
                  Sidebar
                </Button>
              </div>
            </div>

            {/* Controls row */}
            <div className="px-8 pb-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                <div className="relative lg:col-span-2">
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search across selected platforms..."
                    className="bg-black/30 border-white/10 text-white placeholder:text-white/35 rounded-xl pl-10"
                  />
                  <Search className="h-4 w-4 text-white/35 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="secondary"
                      className="bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl justify-between"
                    >
                      <span className="inline-flex items-center gap-2">
                        <SlidersHorizontal className="h-4 w-4" />
                        Platforms
                      </span>
                      <Badge className="bg-violet-500/20 text-violet-200 border border-violet-500/30">
                        {selectedPlatforms.length}
                      </Badge>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-72 bg-black/95 border-white/10 text-white" align="end">
                    <DropdownMenuLabel className="text-white/80">
                      Select platforms
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-white/10" />
                    {(Object.keys(platforms) as PlatformKey[]).map((k) => (
                      <DropdownMenuCheckboxItem
                        key={k}
                        checked={platforms[k]}
                        onCheckedChange={(v) => setPlatform(k, Boolean(v))}
                      >
                        {platformLabel(k)}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="mt-3 flex items-center justify-between gap-3 flex-wrap">
                <div className="flex flex-wrap gap-2">
                  {selectedPlatforms.map((k) => (
                    <Badge
                      key={k}
                      className="bg-white/10 text-white/80 border border-white/10"
                    >
                      {platformLabel(k)}
                    </Badge>
                  ))}
                </div>
                <div className="inline-flex items-center gap-2 text-xs text-white/45">
                  <Sparkles className="h-4 w-4" />
                  Mixed feed across selected platforms
                </div>
              </div>
            </div>
          </div>

          {/* Feed vertical stream */}
          <div className="px-4 md:px-8 py-6 md:py-8">
            <div
              className="mx-auto w-full max-w-md lg:max-w-lg xl:max-w-xl space-y-6 overflow-y-auto"
              style={{
                height: "calc(100vh - 220px)",
                scrollSnapType: "y mandatory",
                scrollBehavior: "smooth",
              }}
            >
              {filtered.map((item) => (
                <div
                  key={item.id}
                  className="scroll-mt-4"
                  style={{ scrollSnapAlign: "start" }}
                >
                  <FeedCard
                    item={item}
                    onOpen={() => openViewer(item.id)}
                    onDownload={() => openDownload(item.id)}
                  />
                </div>
              ))}
            </div>

            {/* Infinite scroll placeholder (mock) */}
            <div className="mt-8 flex items-center justify-center">
              <Button
                variant="secondary"
                className="bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl"
                onClick={() => alert("Infinite scroll would auto-load next page")}
              >
                Load more (mock)
              </Button>
            </div>
          </div>
        </main>
      </div>

      {/* Viewer */}
      <Dialog open={viewerOpen} onOpenChange={setViewerOpen}>
        <DialogContent className="max-w-5xl w-[95vw] bg-black/80 border-white/10 text-white rounded-2xl p-5 md:p-6">
          <DialogHeader className="sr-only">
            <DialogTitle>Viewer</DialogTitle>
          </DialogHeader>

          {viewerItem && (
            <ViewerContent
              item={viewerItem}
              onClose={closeViewer}
              onPrev={prev}
              onNext={next}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Download -> choose library/folder (v1: Auto best) */}
      <Dialog open={downloadOpen} onOpenChange={setDownloadOpen}>
        <DialogContent className="max-w-xl w-[92vw] bg-black/80 border-white/10 text-white rounded-2xl p-5 md:p-6">
          <DialogHeader>
            <DialogTitle className="text-white">Download</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-white/90 font-semibold">
                {downloadTarget?.title ?? "—"}
              </div>
              <div className="text-xs text-white/50 mt-1">
                {downloadTarget?.platformLabel ?? ""} {downloadTarget?.author ? `• ${downloadTarget.author}` : ""}
              </div>
            </div>

            <div className="grid gap-2">
              <div className="text-sm text-white/80">Add to library</div>
              <div className="text-xs text-white/45">
                In v1, we use <span className="text-white/70">Auto best</span> by default. You can choose a destination here.
              </div>
              <div className="mt-2">
                <select
                  value={destLibrary}
                  onChange={(e) => setDestLibrary(e.target.value)}
                  className="w-full rounded-xl bg-black/30 border border-white/10 text-white px-3 py-2"
                >
                  <option value="auto">Auto (best)</option>
                  <option value="inbox">Inbox</option>
                  <option value="shorts">Shorts</option>
                  <option value="music">Music</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button
                variant="secondary"
                className="bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl"
                onClick={() => setDownloadOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-violet-600 hover:bg-violet-600/90 rounded-xl"
                onClick={() => {
                  alert(`Enqueue download (mock) — dest: ${destLibrary}`);
                  setDownloadOpen(false);
                }}
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

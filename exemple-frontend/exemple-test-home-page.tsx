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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
} from "lucide-react";

const nav = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Home", icon: Home, href: "/home" },
  { label: "Feed", icon: Rss, href: "/feed" },
  { label: "Library", icon: Library, href: "/library" },
];

type MediaType = "video" | "image" | "audio";

type MediaItem = {
  id: string;
  type: MediaType;
  title: string;
  platform: "YouTube" | "Instagram" | "TikTok" | "Reddit" | "Twitter/X";
  createdAtLabel: string; // e.g. "2d ago"
  viewsLabel?: string; // optional
  thumb: string; // image URL
  src?: string; // for video/audio, optional in mock
  tags?: string[];
  inaccessible?: boolean;
};

const mockMedia: MediaItem[] = [
  {
    id: "m1",
    type: "video",
    title: "Epic Mountain Biking Adventure",
    platform: "YouTube",
    createdAtLabel: "709d ago",
    viewsLabel: "1.2k views",
    thumb:
      "https://images.unsplash.com/photo-1520975958225-9b37b1a7a5fd?auto=format&fit=crop&w=900&q=70",
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    tags: ["Adventure", "Sports"],
  },
  {
    id: "m2",
    type: "image",
    title: "Sunset over the Ocean",
    platform: "Instagram",
    createdAtLabel: "709d ago",
    viewsLabel: "856 views",
    thumb:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=70",
    tags: ["Nature Photography"],
  },
  {
    id: "m3",
    type: "video",
    title: "Cooking Masterclass: Perfect Pasta",
    platform: "TikTok",
    createdAtLabel: "709d ago",
    viewsLabel: "2.1k views",
    thumb:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=70",
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    tags: ["Cooking"],
  },
  {
    id: "m4",
    type: "image",
    title: "Abstract Art Collection",
    platform: "Reddit",
    createdAtLabel: "709d ago",
    viewsLabel: "445 views",
    thumb:
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=900&q=70",
    tags: ["Art & Design"],
  },
  {
    id: "m5",
    type: "video",
    title: "Late Night Jazz Session",
    platform: "YouTube",
    createdAtLabel: "709d ago",
    viewsLabel: "678 views",
    thumb:
      "https://images.unsplash.com/photo-1526816222984-6c9a7ee0a5b1?auto=format&fit=crop&w=900&q=70",
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    tags: ["Music"],
  },
  {
    id: "m6",
    type: "audio",
    title: "Focus Beats — 45min",
    platform: "Twitter/X",
    createdAtLabel: "12h ago",
    viewsLabel: "—",
    thumb:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=900&q=70",
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3",
    tags: ["Audio"],
  },
  {
    id: "m7",
    type: "image",
    title: "Deleted Post Preview",
    platform: "Reddit",
    createdAtLabel: "3d ago",
    viewsLabel: "—",
    thumb:
      "https://images.unsplash.com/photo-1520975958225-9b37b1a7a5fd?auto=format&fit=crop&w=900&q=70",
    inaccessible: true,
    tags: ["Error"],
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
                <div className="text-xs text-white/50">Browse your local media</div>
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
                (item.href === "/home" ? "bg-white/5 text-white" : "")
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

function PlatformBadge({ platform }: { platform: MediaItem["platform"] }) {
  return (
    <Badge className="bg-violet-500/20 text-violet-200 border border-violet-500/30">
      {platform}
    </Badge>
  );
}

function MediaCard({
  item,
  onClick,
}: {
  item: MediaItem;
  onClick: () => void;
}) {
  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-sm hover:bg-white/7 transition cursor-pointer"
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <div className="relative">
        <img
          src={item.thumb}
          alt=""
          className="h-60 w-full object-cover"
          loading="lazy"
        />

        {/* Top badges */}
        <div className="absolute left-3 top-3 flex items-center gap-2">
          <PlatformBadge platform={item.platform} />
          <TypePill type={item.type} />
          {item.inaccessible && (
            <Badge className="bg-red-500/15 text-red-200 border border-red-500/25">
              unavailable
            </Badge>
          )}
        </div>

        {/* Side actions */}
        <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition">
          <Button
            size="icon"
            variant="secondary"
            className="bg-black/40 hover:bg-black/55 border border-white/10 text-white rounded-xl"
            title="Add to folders"
            onClick={(e) => {
              e.stopPropagation();
              // mock
              alert("Add to folders (mock)");
            }}
          >
            <FolderPlus className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="bg-black/40 hover:bg-black/55 border border-white/10 text-white rounded-xl"
            title="Delete"
            onClick={(e) => {
              e.stopPropagation();
              // mock
              alert("Delete (mock) — confirmation modal in real app");
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="p-4">
        <div className="text-white/95 font-semibold leading-snug">
          {item.title}
        </div>
        <div className="mt-2 text-xs text-white/45 flex items-center gap-2 flex-wrap">
          <span>{item.createdAtLabel}</span>
          <span className="text-white/25">•</span>
          <span>{item.viewsLabel ?? "—"}</span>
        </div>

        {item.tags && item.tags.length > 0 && (
          <div className="mt-3 flex items-center gap-2 flex-wrap">
            {item.tags.slice(0, 2).map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-black/30 px-2.5 py-1 text-[11px] text-white/80"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ViewerContent({
  item,
  onClose,
  onPrev,
  onNext,
}: {
  item: MediaItem;
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
        {item.inaccessible ? (
          <div className="h-full w-full flex items-center justify-center p-8">
            <div className="max-w-md text-center">
              <div className="text-xl font-semibold text-white">
                This media is unavailable
              </div>
              <div className="text-white/55 mt-2">
                The file or source is missing. You can remove it from your library or try
                to refresh metadata.
              </div>
              <div className="mt-5 flex items-center justify-center gap-2">
                <Button
                  variant="secondary"
                  className="bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl"
                  onClick={() => alert("Remove from library (mock)")}
                >
                  Remove
                </Button>
                <Button
                  className="bg-violet-600 hover:bg-violet-600/90 rounded-xl"
                  onClick={() => alert("Retry metadata fetch (mock)")}
                >
                  Retry
                </Button>
              </div>
            </div>
          </div>
        ) : item.type === "image" ? (
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
            <PlatformBadge platform={item.platform} />
            <TypePill type={item.type} />
          </div>
          <div className="text-xs text-white/45 mt-2">
            {item.createdAtLabel} {item.viewsLabel ? `• ${item.viewsLabel}` : ""}
          </div>
        </div>

        <div className="flex items-center gap-2 justify-end">
          <Button
            variant="secondary"
            className="bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl"
            onClick={() => alert("Add to folders (modal) — mock")}
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
          {/* Download is optional in Home; kept hidden here by default */}
        </div>
      </div>
    </div>
  );
}

export default function HomeMockPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

  const [typeFilter, setTypeFilter] = React.useState<"all" | MediaType>("all");
  const [platformFilter, setPlatformFilter] = React.useState<
    "all" | MediaItem["platform"]
  >("all");
  const [query, setQuery] = React.useState("");

  const [viewerOpen, setViewerOpen] = React.useState(false);
  const [viewerIndex, setViewerIndex] = React.useState(0);

  const filtered = React.useMemo(() => {
    return mockMedia
      .filter((m) => (typeFilter === "all" ? true : m.type === typeFilter))
      .filter((m) => (platformFilter === "all" ? true : m.platform === platformFilter))
      .filter((m) =>
        query.trim().length === 0
          ? true
          : m.title.toLowerCase().includes(query.trim().toLowerCase())
      );
  }, [typeFilter, platformFilter, query]);

  const openViewer = (id: string) => {
    const idx = filtered.findIndex((m) => m.id === id);
    setViewerIndex(Math.max(0, idx));
    setViewerOpen(true);
  };

  const closeViewer = () => setViewerOpen(false);

  const prev = () => setViewerIndex((i) => (i - 1 + filtered.length) % filtered.length);
  const next = () => setViewerIndex((i) => (i + 1) % filtered.length);

  // Keyboard nav (arrows + ESC)
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
                          (item.href === "/home" ? "bg-white/10 text-white" : "")
                        }
                      >
                        <item.icon className="h-5 w-5" />
                        <span className="text-sm">{item.label}</span>
                      </a>
                    ))}
                </div>
              </SheetContent>
            </Sheet>
            <div className="text-white font-semibold">Home</div>
          </div>

          <Button className="bg-violet-600 hover:bg-violet-600/90" size="icon" title="Search">
            <Search className="h-4 w-4" />
          </Button>
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
                  Home
                </div>
                <div className="text-white/55 mt-1">
                  All downloaded media in one place
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

            {/* Filters row */}
            <div className="px-8 pb-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                <div className="relative">
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search in your media..."
                    className="bg-black/30 border-white/10 text-white placeholder:text-white/35 rounded-xl pl-10"
                  />
                  <Search className="h-4 w-4 text-white/35 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>

                <Select
                  value={typeFilter}
                  onValueChange={(v) => setTypeFilter(v as any)}
                >
                  <SelectTrigger className="bg-black/30 border-white/10 text-white rounded-xl">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-black/95 border-white/10 text-white">
                    <SelectItem value="all">All types</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="image">Image</SelectItem>
                    <SelectItem value="audio">Audio</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={platformFilter}
                  onValueChange={(v) => setPlatformFilter(v as any)}
                >
                  <SelectTrigger className="bg-black/30 border-white/10 text-white rounded-xl">
                    <SelectValue placeholder="Platform" />
                  </SelectTrigger>
                  <SelectContent className="bg-black/95 border-white/10 text-white">
                    <SelectItem value="all">All platforms</SelectItem>
                    <SelectItem value="YouTube">YouTube</SelectItem>
                    <SelectItem value="Instagram">Instagram</SelectItem>
                    <SelectItem value="TikTok">TikTok</SelectItem>
                    <SelectItem value="Reddit">Reddit</SelectItem>
                    <SelectItem value="Twitter/X">Twitter/X</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Mobile filters */}
          <div className="md:hidden px-4 py-4">
            <Card className="bg-white/5 border-white/10 rounded-2xl">
              <CardContent className="p-4 space-y-3">
                <div className="relative">
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search in your media..."
                    className="bg-black/30 border-white/10 text-white placeholder:text-white/35 rounded-xl pl-10"
                  />
                  <Search className="h-4 w-4 text-white/35 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Select
                    value={typeFilter}
                    onValueChange={(v) => setTypeFilter(v as any)}
                  >
                    <SelectTrigger className="bg-black/30 border-white/10 text-white rounded-xl">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent className="bg-black/95 border-white/10 text-white">
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="image">Image</SelectItem>
                      <SelectItem value="audio">Audio</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    value={platformFilter}
                    onValueChange={(v) => setPlatformFilter(v as any)}
                  >
                    <SelectTrigger className="bg-black/30 border-white/10 text-white rounded-xl">
                      <SelectValue placeholder="Platform" />
                    </SelectTrigger>
                    <SelectContent className="bg-black/95 border-white/10 text-white">
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="YouTube">YouTube</SelectItem>
                      <SelectItem value="Instagram">Instagram</SelectItem>
                      <SelectItem value="TikTok">TikTok</SelectItem>
                      <SelectItem value="Reddit">Reddit</SelectItem>
                      <SelectItem value="Twitter/X">Twitter/X</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Grid */}
          <div className="px-4 md:px-8 pb-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((item) => (
                <MediaCard key={item.id} item={item} onClick={() => openViewer(item.id)} />
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
        <DialogContent
          className="max-w-5xl w-[95vw] bg-black/80 border-white/10 text-white rounded-2xl p-5 md:p-6"
          // Clicking outside closes (handled by Dialog overlay)
        >
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
    </div>
  );
}

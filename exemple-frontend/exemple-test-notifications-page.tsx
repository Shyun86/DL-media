import React from "react";
import {
  Bell,
  Check,
  X,
  RefreshCw,
  Filter,
  Search,
  Download,
  AlertTriangle,
  Shield,
  FolderPlus,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// ------------------------
// Mock data (v1)
// ------------------------

type NotificationType =
  | "download_started"
  | "download_completed"
  | "download_failed"
  | "library_created"
  | "system";

type NotificationItem = {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  timeLabel: string;
  read: boolean;
  persistent: boolean; // user said: persistantes
  action?: { label: string; href?: string; kind?: "retry" | "open" };
};

const MOCK_NOTIFS: NotificationItem[] = [
  {
    id: "n1",
    type: "download_started",
    title: "Download started",
    message: "YouTube Shorts • Street Drift — Quick Clip",
    timeLabel: "Just now",
    read: false,
    persistent: true,
    action: { label: "View", href: "/dashboard", kind: "open" },
  },
  {
    id: "n2",
    type: "download_failed",
    title: "Download failed",
    message: "Reddit • Access denied (auth required)",
    timeLabel: "2m ago",
    read: false,
    persistent: true,
    action: { label: "Retry", kind: "retry" },
  },
  {
    id: "n3",
    type: "download_completed",
    title: "Download completed",
    message: "Instagram • Minimal Desk Setup",
    timeLabel: "10m ago",
    read: true,
    persistent: true,
    action: { label: "Open media", href: "/media/m2", kind: "open" },
  },
  {
    id: "n4",
    type: "library_created",
    title: "Folder created",
    message: "Library • Shorts/Anime",
    timeLabel: "Yesterday",
    read: true,
    persistent: true,
    action: { label: "Open folder", href: "/library/shorts", kind: "open" },
  },
  {
    id: "n5",
    type: "system",
    title: "Security",
    message: "Cookies storage is encrypted (v1).",
    timeLabel: "2d ago",
    read: true,
    persistent: true,
  },
];

function iconFor(t: NotificationType) {
  switch (t) {
    case "download_started":
      return <Download className="h-4 w-4 text-violet-200/90" />;
    case "download_completed":
      return <Check className="h-4 w-4 text-emerald-200/90" />;
    case "download_failed":
      return <AlertTriangle className="h-4 w-4 text-amber-200/90" />;
    case "library_created":
      return <FolderPlus className="h-4 w-4 text-sky-200/90" />;
    case "system":
    default:
      return <Shield className="h-4 w-4 text-white/70" />;
  }
}

function badgeFor(t: NotificationType) {
  switch (t) {
    case "download_started":
      return (
        <Badge className="bg-violet-500/20 text-violet-200 border border-violet-500/30">
          Download
        </Badge>
      );
    case "download_completed":
      return (
        <Badge className="bg-emerald-500/15 text-emerald-200 border border-emerald-500/30">
          Completed
        </Badge>
      );
    case "download_failed":
      return (
        <Badge className="bg-amber-500/15 text-amber-200 border border-amber-500/30">
          Failed
        </Badge>
      );
    case "library_created":
      return (
        <Badge className="bg-sky-500/15 text-sky-200 border border-sky-500/30">
          Library
        </Badge>
      );
    case "system":
    default:
      return (
        <Badge className="bg-white/10 text-white/80 border border-white/10">
          System
        </Badge>
      );
  }
}

// ------------------------
// Single-file page
// ------------------------
export default function NotificationsPage() {
  const [items, setItems] = React.useState<NotificationItem[]>(MOCK_NOTIFS);
  const [q, setQ] = React.useState("");
  const [filter, setFilter] = React.useState<"all" | "unread" | "download" | "failed">(
    "all"
  );

  // Confirmation modal (user said: modal confirmation systématique)
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [confirmLabel, setConfirmLabel] = React.useState<string>("");
  const [confirmAction, setConfirmAction] = React.useState<(() => void) | null>(null);

  const unreadCount = React.useMemo(
    () => items.filter((i) => !i.read).length,
    [items]
  );

  const filtered = React.useMemo(() => {
    const s = q.trim().toLowerCase();
    return items
      .filter((i) => {
        if (filter === "unread") return !i.read;
        if (filter === "download")
          return i.type === "download_started" || i.type === "download_completed";
        if (filter === "failed") return i.type === "download_failed";
        return true;
      })
      .filter((i) => {
        if (!s) return true;
        return (
          i.title.toLowerCase().includes(s) ||
          (i.message ?? "").toLowerCase().includes(s)
        );
      });
  }, [items, q, filter]);

  const askConfirm = (label: string, fn: () => void) => {
    setConfirmLabel(label);
    setConfirmAction(() => fn);
    setConfirmOpen(true);
  };

  const markAllRead = () =>
    setItems((prev) => prev.map((p) => ({ ...p, read: true })));

  const markOneRead = (id: string) =>
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, read: true } : p)));

  const retry = (id: string) => {
    // v1: toast + retry (mock). In real app: enqueue retry, show toast.
    alert(`Retry download (mock): ${id}`);
    setItems((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, read: true, title: "Retry queued", message: p.message, type: "download_started" }
          : p
      )
    );
  };

  const openHref = (href?: string) => {
    if (!href) return;
    alert(`Navigate (route): ${href}`);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(1200px_600px_at_15%_0%,rgba(168,85,247,0.18),transparent_55%),radial-gradient(900px_500px_at_85%_10%,rgba(236,72,153,0.10),transparent_55%),linear-gradient(to_bottom,rgba(0,0,0,0.92),rgba(0,0,0,0.96))]">
      {/* Header */}
      <div className="px-4 md:px-8 pt-6 md:pt-8 pb-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-4xl font-semibold tracking-tight text-violet-300">
              Notifications
            </div>
            <div className="text-white/55 mt-1">
              Persistent alerts for downloads, library and system events
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge className="bg-white/10 text-white/80 border border-white/10">
              <Bell className="h-3.5 w-3.5 mr-1" />
              {unreadCount} unread
            </Badge>
            <Button
              variant="secondary"
              className="bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl"
              onClick={() =>
                askConfirm("Mark all as read?", () => {
                  markAllRead();
                })
              }
              disabled={unreadCount === 0}
            >
              <Check className="h-4 w-4 mr-2" />
              Mark all read
            </Button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="px-4 md:px-8 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <div className="lg:col-span-2 relative">
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search notifications…"
              className="bg-black/30 border-white/10 text-white placeholder:text-white/35 rounded-xl pl-10"
            />
            <Search className="h-4 w-4 text-white/35 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 flex items-center justify-between">
            <div>
              <div className="text-sm text-white/80 font-semibold">Filter</div>
              <div className="mt-2 flex items-center gap-2 flex-wrap">
                {(
                  [
                    { k: "all", label: "All" },
                    { k: "unread", label: "Unread" },
                    { k: "download", label: "Downloads" },
                    { k: "failed", label: "Failed" },
                  ] as const
                ).map((b) => (
                  <button
                    key={b.k}
                    onClick={() => setFilter(b.k)}
                    className={
                      "text-xs rounded-full px-3 py-1 border transition " +
                      (filter === b.k
                        ? "bg-violet-500/15 border-violet-500/40 text-violet-200"
                        : "bg-black/20 border-white/10 text-white/65 hover:text-white hover:border-white/20")
                    }
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>
            <Filter className="h-5 w-5 text-violet-200/70" />
          </div>
        </div>
      </div>

      {/* List */}
      <div className="px-4 md:px-8 pb-10">
        <div className="mx-auto w-full max-w-4xl space-y-3">
          {filtered.map((n) => (
            <div
              key={n.id}
              className={
                "rounded-2xl border bg-white/5 transition px-4 py-4 flex items-start justify-between gap-4 " +
                (n.read
                  ? "border-white/10"
                  : "border-violet-500/25 bg-violet-500/5")
              }
            >
              <div className="flex items-start gap-3 min-w-0">
                <div className="mt-0.5 h-10 w-10 rounded-2xl border border-white/10 bg-black/30 flex items-center justify-center">
                  {iconFor(n.type)}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="text-white font-semibold truncate">{n.title}</div>
                    {badgeFor(n.type)}
                    {!n.read && (
                      <Badge className="bg-violet-500/20 text-violet-200 border border-violet-500/30">
                        New
                      </Badge>
                    )}
                    {n.persistent && (
                      <Badge className="bg-white/10 text-white/80 border border-white/10">
                        Persistent
                      </Badge>
                    )}
                  </div>
                  {n.message && (
                    <div className="text-sm text-white/65 mt-1 truncate">
                      {n.message}
                    </div>
                  )}
                  <div className="text-xs text-white/40 mt-2">{n.timeLabel}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {!n.read && (
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl"
                    onClick={() => markOneRead(n.id)}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Read
                  </Button>
                )}

                {n.action?.kind === "retry" && (
                  <Button
                    size="sm"
                    className="bg-violet-600 hover:bg-violet-600/90 rounded-xl"
                    onClick={() =>
                      askConfirm("Retry this download?", () => {
                        retry(n.id);
                      })
                    }
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Retry
                  </Button>
                )}

                {n.action?.kind === "open" && (
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl"
                    onClick={() => {
                      markOneRead(n.id);
                      openHref(n.action?.href);
                    }}
                  >
                    {n.action.label}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                )}

                {/* Example: inaccessible media click shows error */}
                {n.type === "download_failed" && (
                  <Button
                    size="icon"
                    variant="secondary"
                    className="bg-black/30 hover:bg-black/50 border border-white/10 text-white rounded-xl"
                    title="Why?"
                    onClick={() => alert("Error details (mock): auth required / cookies missing")}
                  >
                    <AlertTriangle className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
              <div className="text-white/80 font-semibold">No notifications</div>
              <div className="text-white/45 text-sm mt-1">
                Try changing the filter or search query.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation modal (systematic) */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="max-w-md w-[92vw] bg-black/80 border-white/10 text-white rounded-2xl p-5 md:p-6">
          <DialogHeader>
            <DialogTitle className="text-white">Confirm</DialogTitle>
          </DialogHeader>

          <div className="text-sm text-white/75">{confirmLabel}</div>

          <div className="mt-5 flex items-center justify-end gap-2">
            <Button
              variant="secondary"
              className="bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl"
              onClick={() => setConfirmOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-violet-600 hover:bg-violet-600/90 rounded-xl"
              onClick={() => {
                setConfirmOpen(false);
                confirmAction?.();
              }}
            >
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Tiny floating hint */}
      <div className="fixed bottom-4 right-4 hidden md:block">
        <div className="rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl p-3 text-xs text-white/70 flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-violet-400" />
          Notifications are persistent in v1
          <button
            className="ml-2 text-white/60 hover:text-white"
            onClick={() => alert("Hint dismissed (mock)")}
            title="Close"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { Bell, Check, X } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import { FolderPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { NotificationFilters } from "./components/NotificationFilters";
import { NotificationItem, NotificationItemType, NotificationType } from "./components/NotificationItem";
import { cn } from "@/lib/utils";

// ------------------------
// Mock data (v1) - Adapted from example
// ------------------------

const MOCK_NOTIFS: NotificationItemType[] = [
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
  {
    id: "n6",
    type: "download_completed",
    title: "Another Download completed",
    message: "Twitter • Cool Art Compilation",
    timeLabel: "3d ago",
    read: false,
    persistent: true,
    action: { label: "Open media", href: "/media/m3", kind: "open" },
  },
];

export function NotificationsPage() {
  const [items, setItems] = React.useState<NotificationItemType[]>(MOCK_NOTIFS);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filter, setFilter] = React.useState<"all" | "unread" | "download" | "failed">(
    "all"
  );

  // Confirmation modal
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [confirmLabel, setConfirmLabel] = React.useState<string>("");
  const [confirmAction, setConfirmAction] = React.useState<(() => void) | null>(null);

  const unreadCount = React.useMemo(
    () => items.filter((i) => !i.read).length,
    [items]
  );

  const filtered = React.useMemo(() => {
    const s = searchQuery.trim().toLowerCase();
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
  }, [items, searchQuery, filter]);

  const askConfirm = (label: string, fn: () => void) => {
    setConfirmLabel(label);
    setConfirmAction(() => fn);
    setConfirmOpen(true);
  };

  const { setSidebarCollapsed } = useOutletContext<{ setSidebarCollapsed: (fn: (isCollapsed: boolean) => boolean) => void; }>();

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
            <Button
              variant="ghost"
              className="text-white/80 hover:text-white hover:bg-white/10"
              onClick={() => setSidebarCollapsed(v => !v)}
              title="toggle sidebar"
            >
              <FolderPlus className="h-4 w-4 mr-2" />
              Sidebar
            </Button>

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
        <NotificationFilters
          onSearchChange={setSearchQuery}
          onFilterChange={setFilter}
          currentFilter={filter}
        />
        {/* Placeholder from example for v1 rules hint - removed for now */}
        {/* <div className="rounded-2xl border border-white/10 bg-white/5 p-4 flex items-center justify-between mt-3">
            <div>
              <div className="text-sm text-white/80 font-semibold">Filter</div>
              <div className="mt-2 flex items-center gap-2 flex-wrap">
              </div>
            </div>
            <Filter className="h-5 w-5 text-violet-200/70" />
          </div> */}
      </div>

      {/* List */}
      <div className="px-4 md:px-8 pb-10">
        <div className="mx-auto w-full max-w-4xl space-y-3">
          {filtered.map((n) => (
            <NotificationItem
              key={n.id}
              notification={n}
              onMarkRead={markOneRead}
              onRetry={retry}
              onOpenHref={openHref}
              onAskConfirm={askConfirm}
            />
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
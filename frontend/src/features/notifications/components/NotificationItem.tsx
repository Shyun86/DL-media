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
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// ------------------------
// Types - adapted from example's NotificationsPage
// ------------------------

export type NotificationType =
  | "download_started"
  | "download_completed"
  | "download_failed"
  | "library_created"
  | "system";

export type NotificationItemType = {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  timeLabel: string;
  read: boolean;
  persistent: boolean;
  action?: { label: string; href?: string; kind?: "retry" | "open" };
};

// ------------------------
// Helper Functions - adapted from example's NotificationsPage
// ------------------------

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

interface NotificationItemProps {
  notification: NotificationItemType;
  onMarkRead: (id: string) => void;
  onRetry: (id: string) => void;
  onOpenHref: (href?: string) => void;
  onAskConfirm: (label: string, action: () => void) => void;
}

export function NotificationItem({
  notification,
  onMarkRead,
  onRetry,
  onOpenHref,
  onAskConfirm,
}: NotificationItemProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border bg-white/5 transition px-4 py-4 flex items-start justify-between gap-4",
        notification.read
          ? "border-white/10"
          : "border-violet-500/25 bg-violet-500/5"
      )}
    >
      <div className="flex items-start gap-3 min-w-0">
        <div className="mt-0.5 h-10 w-10 rounded-2xl border border-white/10 bg-black/30 flex items-center justify-center">
          {iconFor(notification.type)}
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="text-white font-semibold truncate">
              {notification.title}
            </div>
            {badgeFor(notification.type)}
            {!notification.read && (
              <Badge className="bg-violet-500/20 text-violet-200 border border-violet-500/30">
                New
              </Badge>
            )}
            {notification.persistent && (
              <Badge className="bg-white/10 text-white/80 border border-white/10">
                Persistent
              </Badge>
            )}
          </div>
          {notification.message && (
            <div className="text-sm text-white/65 mt-1 truncate">
              {notification.message}
            </div>
          )}
          <div className="text-xs text-white/40 mt-2">
            {notification.timeLabel}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {!notification.read && (
          <Button
            size="sm"
            variant="secondary"
            className="bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl"
            onClick={() => onMarkRead(notification.id)}
          >
            <Check className="h-4 w-4 mr-2" />
            Read
          </Button>
        )}

        {notification.action?.kind === "retry" && (
          <Button
            size="sm"
            className="bg-violet-600 hover:bg-violet-600/90 rounded-xl"
            onClick={() =>
              onAskConfirm("Retry this download?", () => {
                onRetry(notification.id);
              })
            }
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        )}

        {notification.action?.kind === "open" && (
          <Button
            size="sm"
            variant="secondary"
            className="bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl"
            onClick={() => {
              onMarkRead(notification.id);
              onOpenHref(notification.action?.href);
            }}
          >
            {notification.action.label}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        )}

        {/* Example: inaccessible media click shows error */}
        {notification.type === "download_failed" && (
          <Button
            size="icon"
            variant="secondary"
            className="bg-black/30 hover:bg-black/50 border border-white/10 text-white rounded-xl"
            title="Why?"
            onClick={() =>
              alert("Error details (mock): auth required / cookies missing")
            }
          >
            <AlertTriangle className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
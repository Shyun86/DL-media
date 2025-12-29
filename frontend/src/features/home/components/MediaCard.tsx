import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FolderPlus, Trash2 } from "lucide-react";
import { MediaItem } from "@/api/types";
import { PlatformBadge } from "@/components/shared/PlatformBadge";
import { TypePill } from "@/components/shared/TypePill";

interface MediaCardProps {
  item: MediaItem;
  onClick: () => void;
}

export function MediaCard({ item, onClick }: MediaCardProps) {
  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-sm hover:bg-white/10 transition cursor-pointer"
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <div className="relative">
        <img
          src={item.thumbUrl}
          alt={item.title}
          className="h-60 w-full object-cover"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition" />

        {/* Top badges */}
        <div className="absolute left-3 top-3 flex items-center gap-2">
          <PlatformBadge platform={item.platform} />
          <TypePill type={item.type} />
          {item.isInaccessible && (
            <Badge className="bg-red-500/15 text-red-200 border-red-500/25">
              Unavailable
            </Badge>
          )}
        </div>

        {/* Side actions */}
        <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="icon"
            variant="secondary"
            className="bg-black/40 hover:bg-black/55 border border-white/10 text-white rounded-xl h-9 w-9"
            title="Add to folders"
            onClick={(e) => {
              e.stopPropagation();
              alert("Add to folders (mock)");
            }}
          >
            <FolderPlus className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="bg-black/40 hover:bg-black/55 border border-white/10 text-white rounded-xl h-9 w-9"
            title="Delete"
            onClick={(e) => {
              e.stopPropagation();
              alert("Delete (mock) — confirmation modal in real app");
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-white/95 font-semibold leading-snug truncate">
          {item.title}
        </h3>
        <div className="mt-2 text-xs text-white/45 flex items-center gap-2 flex-wrap">
          <span>{new Date(item.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MediaItem } from "@/api/types";
import {
  X,
  ChevronLeft,
  ChevronRight,
  FolderPlus,
  Trash2,
  Download,
  ExternalLink,
} from "lucide-react";
import { PlatformBadge } from "./PlatformBadge";
import { TypePill } from "./TypePill";

interface ViewerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: MediaItem | null;
  onPrev?: () => void;
  onNext?: () => void;
}

export function ViewerModal({ open, onOpenChange, item, onPrev, onNext }: ViewerModalProps) {
  if (!item) {
    return null;
  }

  const handleClose = () => onOpenChange(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl w-[95vw] bg-black/80 border-white/10 text-white rounded-2xl p-5 md:p-6">
        <DialogHeader className="sr-only">
          <DialogTitle>Viewer</DialogTitle>
        </DialogHeader>

        <div className="relative w-full h-[80vh] md:h-[82vh] flex flex-col">
          {/* Close button */}
          <Button
            size="icon"
            variant="secondary"
            className="absolute right-4 top-4 z-20 bg-black/50 hover:bg-black/70 border border-white/10 text-white rounded-xl"
            onClick={handleClose}
            title="Close"
          >
            <X className="h-4 w-4" />
          </Button>

          {/* Prev/Next */}
          {onPrev && (
            <Button
              size="icon"
              variant="secondary"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 border border-white/10 text-white rounded-xl"
              onClick={onPrev}
              title="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          )}
          {onNext && (
            <Button
              size="icon"
              variant="secondary"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 border border-white/10 text-white rounded-xl"
              onClick={onNext}
              title="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          )}

          {/* Media */}
          <div className="flex-1 overflow-hidden rounded-2xl border border-white/10 bg-black/40">
            {item.isInaccessible ? (
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
                    >
                      Remove
                    </Button>
                    <Button className="bg-violet-600 hover:bg-violet-600/90 rounded-xl">
                      Retry
                    </Button>
                  </div>
                </div>
              </div>
            ) : item.type === "image" ? (
              <img
                src={item.sourceUrl || item.thumbUrl}
                alt={item.title}
                className="h-full w-full object-contain"
              />
            ) : item.type === "video" ? (
              <video
                src={item.sourceUrl}
                className="h-full w-full object-contain"
                controls
                autoPlay
              />
            ) : (
              <div className="h-full w-full flex flex-col items-center justify-center gap-4 p-8">
                <div className="text-white/85 font-semibold">Audio</div>
                <audio src={item.sourceUrl} controls autoPlay />
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
                {item.author ? `${item.author} • ` : ""}
                {new Date(item.createdAt).toLocaleDateString()}
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
              {!item.isStored && (
                <Button className="bg-violet-600 hover:bg-violet-600/90 rounded-xl">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              )}
              <Button
                variant="secondary"
                className="bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl"
              >
                <FolderPlus className="h-4 w-4 mr-2" />
                Add to library
              </Button>
              <Button
                variant="secondary"
                className="bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

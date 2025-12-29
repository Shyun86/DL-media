import React from "react";
import { Button } from "@/components/ui/button";
import { Download, Music2 } from "lucide-react";
import { FeedItem } from "@/api/types";
import { PlatformBadge } from "@/components/shared/PlatformBadge";
import { TypePill } from "@/components/shared/TypePill";

interface FeedCardProps {
  item: FeedItem;
  onOpen: () => void;
  onDownload: () => void;
}

export function FeedCard({ item, onOpen, onDownload }: FeedCardProps) {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  React.useEffect(() => {
    if (item.type !== "video") return;
    const el = videoRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (videoRef.current) {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.75) {
              videoRef.current.play().catch(() => {
                if (videoRef.current) {
                    videoRef.current.muted = true;
                    videoRef.current.play().catch(() => {});
                }
              });
            } else {
              videoRef.current.pause();
            }
          }
        }
      },
      { threshold: [0.75] }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [item.type]);

  return (
    <div className="w-full h-full relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-sm aspect-[9/16]">
        {item.type === "video" ? (
            <video
            ref={videoRef}
            src={item.sourceUrl}
            poster={item.thumbUrl}
            className="absolute inset-0 h-full w-full object-cover"
            playsInline
            loop
            muted // Start muted to allow autoplay on all browsers
            onClick={onOpen}
            />
        ) : item.type === "image" ? (
            <img
            src={item.thumbUrl}
            alt={item.title}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            onClick={onOpen}
            role="button"
            />
        ) : (
            <div
            className="absolute inset-0 h-full w-full flex items-center justify-center bg-black"
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

        <div className="absolute left-3 top-3 flex items-center gap-2">
            <PlatformBadge platform={item.platform} />
            <TypePill type={item.type} />
        </div>

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
                <span>{new Date(item.createdAt).toLocaleDateString()}</span>
            </div>
            </div>
        </div>
    </div>
  );
}

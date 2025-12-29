import { Play, Music2, Image as ImageIcon } from "lucide-react";
import { MediaType } from "@/api/types";

interface TypePillProps {
  type: MediaType;
}

export function TypePill({ type }: TypePillProps) {
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

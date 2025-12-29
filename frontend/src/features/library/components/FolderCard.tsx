import React from "react";
import { Folder, Image as ImageIcon, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface FolderData {
  id: string;
  name: string;
  coverThumb?: string;
  itemsCount: number;
  sizeLabel: string;
  subfoldersCount: number;
}

export interface SubfolderData {
  id: string;
  name: string;
  itemsCount: number;
  sizeLabel: string;
}

interface FolderCardProps {
  folder: FolderData;
  subfolders: SubfolderData[];
  viewMode: "grid" | "list";
  onOpen: (id: string) => void;
  onChangeCover: (folder: FolderData) => void;
}

export function FolderCard({ folder, subfolders, viewMode, onOpen, onChangeCover }: FolderCardProps) {
  if (viewMode === "list") {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 hover:bg-white/7 transition px-4 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-10 w-10 rounded-xl bg-black/30 border border-white/10 overflow-hidden shrink-0">
            {folder.coverThumb ? (
              <img src={folder.coverThumb} alt="" className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-white/35">
                <ImageIcon className="h-4 w-4" />
              </div>
            )}
          </div>
          <div className="min-w-0">
            <div className="text-white font-semibold truncate">{folder.name}</div>
            <div className="text-xs text-white/50 mt-1">
              {folder.itemsCount} items • {folder.sizeLabel} • {folder.subfoldersCount} subfolders
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="secondary"
            className="bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl"
            title="Change cover"
            onClick={() => onChangeCover(folder)}
          >
            <ImageIcon className="h-4 w-4" />
          </Button>

          <Button
            variant="secondary"
            className="bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl"
            onClick={() => onOpen(folder.id)}
          >
            Open <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  // Grid View
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/5 hover:bg-white/7 transition overflow-hidden flex flex-col">
      {/* Cover */}
      <div className="relative h-36 bg-black/30 shrink-0">
        {folder.coverThumb ? (
          <img src={folder.coverThumb} alt="" className="absolute inset-0 h-full w-full object-cover opacity-90" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-white/35">
            <ImageIcon className="h-6 w-6" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <Button
          size="icon"
          variant="secondary"
          className="absolute right-3 top-3 bg-black/40 hover:bg-black/60 border border-white/10 text-white rounded-xl opacity-0 group-hover:opacity-100 transition"
          title="Change cover"
          onClick={() => onChangeCover(folder)}
        >
          <ImageIcon className="h-4 w-4" />
        </Button>

        <div className="absolute left-3 bottom-3 flex items-center gap-2">
          <Badge className="bg-violet-500/20 text-violet-200 border border-violet-500/30">Folder</Badge>
          <Badge className="bg-white/10 text-white/80 border border-white/10">{folder.subfoldersCount} subfolders</Badge>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-white font-semibold truncate">{folder.name}</div>
            <div className="text-xs text-white/50 mt-1">
              {folder.itemsCount} items • {folder.sizeLabel}
            </div>
          </div>
          <Button variant="secondary" className="bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl shrink-0" onClick={() => onOpen(folder.id)}>
            Open
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>

        {/* Subfolders preview */}
        <div className="mt-4 space-y-2 flex-1">
          {subfolders.slice(0, 2).map((s) => (
            <div key={s.id} className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <Folder className="h-4 w-4 text-white/50 shrink-0" />
                <div className="text-sm text-white/80 truncate">{s.name}</div>
              </div>
              <div className="text-xs text-white/45 shrink-0">{s.itemsCount} • {s.sizeLabel}</div>
            </div>
          ))}
          {subfolders.length > 2 && <div className="text-xs text-white/45 pl-1">+ {subfolders.length - 2} more subfolders</div>}
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { useOutletContext } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FolderOpen } from "lucide-react";
import { MediaItem, MediaType, PLATFORMS, PlatformKey } from "@/api/types";
import { ViewerModal } from "@/components/shared/ViewerModal";
import { MediaCard } from "./components/MediaCard";
import { HomeFilters } from "./components/HomeFilters";

type PlatformFilter = "all" | PlatformKey;
type TypeFilter = "all" | MediaType;

// Mock data adapted from the example file
const mockMedia: MediaItem[] = [
  {
    id: "m1",
    type: "video",
    title: "Epic Mountain Biking Adventure",
    platform: "YouTube",
    createdAt: "2023-10-26T10:00:00Z",
    thumbUrl: "https://images.unsplash.com/photo-1520975958225-9b37b1a7a5fd?auto=format&fit=crop&w=900&q=70",
    sourceUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    tags: ["Adventure", "Sports"],
    isStored: true,
  },
  {
    id: "m2",
    type: "image",
    title: "Sunset over the Ocean",
    platform: "Instagram",
    createdAt: "2023-10-25T18:30:00Z",
    thumbUrl: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=70",
    tags: ["Nature Photography"],
    isStored: true,
  },
  {
    id: "m6",
    type: "audio",
    title: "Focus Beats — 45min",
    platform: "Twitter/X",
    createdAt: "2023-10-24T12:00:00Z",
    thumbUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=900&q=70",
    sourceUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3",
    tags: ["Audio"],
    isStored: true,
  },
  {
    id: "m7",
    type: "image",
    title: "Deleted Post Preview",
    platform: "Reddit",
    createdAt: "2023-10-23T09:00:00Z",
    thumbUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=900&q=70",
    isInaccessible: true,
    isStored: true,
    tags: ["Error"],
  },
];


export function HomePage() {
  const { setSidebarCollapsed } = useOutletContext<{ setSidebarCollapsed: (fn: (isCollapsed: boolean) => boolean) => void; }>();

  const [typeFilter, setTypeFilter] = React.useState<TypeFilter>("all");
  const [platformFilter, setPlatformFilter] = React.useState<PlatformFilter>("all");
  const [query, setQuery] = React.useState("");

  const [viewerOpen, setViewerOpen] = React.useState(false);
  const [viewerIndex, setViewerIndex] = React.useState(0);

  const filteredMedia = React.useMemo(() => {
    return mockMedia
      .filter((m) => (typeFilter === "all" ? true : m.type === typeFilter))
      .filter((m) => (platformFilter === "all" ? true : PLATFORMS[platformFilter as PlatformKey] === m.platform))
      .filter((m) =>
        query.trim().length === 0
          ? true
          : m.title.toLowerCase().includes(query.trim().toLowerCase())
      );
  }, [typeFilter, platformFilter, query]);

  const openViewer = (id: string) => {
    const idx = filteredMedia.findIndex((m) => m.id === id);
    if (idx > -1) {
      setViewerIndex(idx);
      setViewerOpen(true);
    }
  };

  const closeViewer = () => setViewerOpen(false);
  const prevItem = () => setViewerIndex((i) => (i - 1 + filteredMedia.length) % filteredMedia.length);
  const nextItem = () => setViewerIndex((i) => (i + 1) % filteredMedia.length);
  const viewerItem = filteredMedia[viewerIndex];
  
  return (
    <div>
        <div className="hidden md:block sticky top-0 z-20 border-b border-white/10 bg-black/30 backdrop-blur-xl">
            <div className="px-8 py-6 flex items-start justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-semibold tracking-tight text-violet-300">Home</h1>
                    <p className="text-white/55 mt-1">All your downloaded media in one place</p>
                </div>
                <Button
                  variant="ghost"
                  className="text-white/80 hover:text-white hover:bg-white/10"
                  onClick={() => setSidebarCollapsed(v => !v)}
                  title="Toggle sidebar"
                >
                  <FolderOpen className="h-4 w-4 mr-2" />
                  Sidebar
                </Button>
            </div>
            <div className="px-8 pb-6">
                <HomeFilters 
                    query={query}
                    onQueryChange={setQuery}
                    typeFilter={typeFilter}
                    onTypeFilterChange={setTypeFilter}
                    platformFilter={platformFilter}
                    onPlatformFilterChange={setPlatformFilter}
                />
            </div>
        </div>

        {/* Mobile filters would go here, for now use desktop */}
        <div className="md:hidden px-4 py-4"><HomeFilters 
            query={query}
            onQueryChange={setQuery}
            typeFilter={typeFilter}
            onTypeFilterChange={setTypeFilter}
            platformFilter={platformFilter}
            onPlatformFilterChange={setPlatformFilter}
        /></div>

        <div className="px-4 md:px-8 py-6 md:py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredMedia.map((item) => (
                <MediaCard key={item.id} item={item} onClick={() => openViewer(item.id)} />
              ))}
            </div>

            {filteredMedia.length === 0 && (
                <div className="text-center text-white/50 py-20">No media found.</div>
            )}
        </div>
        
        <ViewerModal 
            open={viewerOpen}
            onOpenChange={setViewerOpen}
            item={viewerItem}
            onPrev={prevItem}
            onNext={nextItem}
        />
    </div>
  );
}
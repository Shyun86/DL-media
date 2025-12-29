import React from "react";
import { useOutletContext } from "react-router-dom";
import { FeedItem, PLATFORMS, Platform, PlatformKey } from "@/api/types";
import { ViewerModal } from "@/components/shared/ViewerModal";
import { FeedCard } from "./components/FeedCard";
import { FeedFilters } from "./components/FeedFilters";
import { FolderPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data adapted for the new types
const mockFeed: FeedItem[] = [
    {
      id: "f1",
      type: "video",
      title: "Street Drift — Quick Clip",
      platform: "YouTube Shorts",
      author: "@TurboDaily",
      createdAt: "2025-12-28T13:30:00Z",
      thumbUrl: "https://images.unsplash.com/photo-1517949908119-720d3d8f5cce?auto=format&fit=crop&w=900&q=70",
      sourceUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      originUrl: "https://youtube.com/shorts/abc",
      isStored: false,
    },
    {
      id: "f2",
      type: "image",
      title: "Minimal Desk Setup",
      platform: "Instagram",
      author: "@studio.vibes",
      createdAt: "2025-12-28T13:28:00Z",
      thumbUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=70",
      originUrl: "https://instagram.com/p/xyz",
      isStored: false,
    },
    {
        id: "f3",
        type: "video",
        title: "AI Prompt Trick (fast)",
        platform: "TikTok",
        author: "@promptlab",
        createdAt: "2025-12-28T13:24:00Z",
        thumbUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=900&q=70",
        sourceUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        originUrl: "https://tiktok.com/@promptlab/video/123",
        isStored: false,
    },
];

const platformKeyReverseMap = Object.fromEntries(
  (Object.entries(PLATFORMS) as [PlatformKey, Platform][]).map(([key, value]) => [value, key])
) as Record<Platform, PlatformKey>;


export function FeedPage() {
  const { setSidebarCollapsed } = useOutletContext<{ setSidebarCollapsed: (fn: (isCollapsed: boolean) => boolean) => void; }>();

  const [query, setQuery] = React.useState("");
  const [selectedPlatforms, setSelectedPlatforms] = React.useState<PlatformKey[]>(
    (Object.keys(PLATFORMS) as PlatformKey[]).filter(p => p !== 'youtube')
  );

  const handlePlatformChange = (key: PlatformKey, selected: boolean) => {
    setSelectedPlatforms(prev => 
        selected ? [...prev, key] : prev.filter(p => p !== key)
    );
  };
  
  const filteredFeed = React.useMemo(() => {
    const selectedPlatformKeys = new Set(selectedPlatforms);
    return mockFeed
      .filter((f) => selectedPlatformKeys.has(platformKeyReverseMap[f.platform]))
      .filter((f) =>
        query.trim().length === 0
          ? true
          : f.title.toLowerCase().includes(query.trim().toLowerCase()) ||
            (f.author ?? "").toLowerCase().includes(query.trim().toLowerCase())
      );
  }, [query, selectedPlatforms]);

  const [viewerOpen, setViewerOpen] = React.useState(false);
  const [viewerIndex, setViewerIndex] = React.useState(0);

  const openViewer = (id: string) => {
    const idx = filteredFeed.findIndex((m) => m.id === id);
    if (idx !== -1) {
        setViewerIndex(idx);
        setViewerOpen(true);
    }
  };
  
  const closeViewer = () => setViewerOpen(false);
  const viewerItem = filteredFeed[viewerIndex];

  const prevItem = () => setViewerIndex((i) => (i - 1 + filteredFeed.length) % filteredFeed.length);
  const nextItem = () => setViewerIndex((i) => (i + 1) % filteredFeed.length);

  return (
    <div>
        <div className="sticky top-0 z-20 border-b border-white/10 bg-black/30 backdrop-blur-xl">
            <div className="px-8 py-6 flex items-start justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-semibold tracking-tight text-violet-300">
                    Feed
                    </h1>
                    <p className="text-white/55 mt-1">
                    Live aggregated feed — download directly from the web
                    </p>
                </div>
                <Button
                  variant="ghost"
                  className="text-white/80 hover:text-white hover:bg-white/10"
                  onClick={() => setSidebarCollapsed(v => !v)}
                  title="toggle sidebar"
                >
                  <FolderPlus className="h-4 w-4 mr-2" />
                  Sidebar
                </Button>
            </div>
            
            <div className="px-4 md:px-8 pb-6">
                <FeedFilters 
                    query={query}
                    onQueryChange={setQuery}
                    selectedPlatforms={selectedPlatforms}
                    onPlatformChange={handlePlatformChange}
                />
            </div>
        </div>

        <div className="px-4 md:px-8 py-6 md:py-8">
            <div
              className="mx-auto w-full max-w-md lg:max-w-lg xl:max-w-xl space-y-6 overflow-y-auto"
              style={{
                height: "calc(100vh - 280px)", // Adjust height based on header
                scrollSnapType: "y mandatory",
              }}
            >
              {filteredFeed.map((item) => (
                <div
                  key={item.id}
                  className="scroll-mt-4 h-[80vh]" // Give a fixed height to children for snapping
                  style={{ scrollSnapAlign: "start" }}
                >
                  <FeedCard
                    item={item}
                    onOpen={() => openViewer(item.id)}
                    onDownload={() => alert(`Download ${item.title}`)}
                  />
                </div>
              ))}
            </div>
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

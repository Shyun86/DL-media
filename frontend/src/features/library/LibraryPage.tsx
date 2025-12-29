import React from "react";
import { FolderPlus, LayoutGrid, List, Plus, PanelLeft } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { FolderCard, FolderData, SubfolderData } from "./components/FolderCard";
import { LibraryFilters } from "./components/LibraryFilters";

// ------------------------
// Mock data (v1)
// ------------------------

const MOCK_FOLDERS: FolderData[] = [
  {
    id: "inbox",
    name: "Inbox",
    coverThumb: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=1200&q=70",
    itemsCount: 128,
    sizeLabel: "18.4 GB",
    subfoldersCount: 6,
  },
  {
    id: "shorts",
    name: "Shorts",
    coverThumb: "https://images.unsplash.com/photo-1520975958221-26d5f21e92f1?auto=format&fit=crop&w=1200&q=70",
    itemsCount: 342,
    sizeLabel: "52.7 GB",
    subfoldersCount: 12,
  },
  {
    id: "music",
    name: "Music",
    coverThumb: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=70",
    itemsCount: 89,
    sizeLabel: "9.2 GB",
    subfoldersCount: 2,
  },
  {
    id: "screenshots",
    name: "Screenshots",
    coverThumb: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=70",
    itemsCount: 54,
    sizeLabel: "3.7 GB",
    subfoldersCount: 3,
  },
];

const MOCK_SUBFOLDERS: Record<string, SubfolderData[]> = {
  inbox: [
    { id: "inbox-1", name: "To sort", itemsCount: 44, sizeLabel: "6.1 GB" },
    { id: "inbox-2", name: "Favorites", itemsCount: 12, sizeLabel: "1.2 GB" },
  ],
  shorts: [
    { id: "shorts-1", name: "Cars", itemsCount: 57, sizeLabel: "8.7 GB" },
    { id: "shorts-2", name: "Anime", itemsCount: 91, sizeLabel: "13.4 GB" },
    { id: "shorts-3", name: "Memes", itemsCount: 38, sizeLabel: "4.5 GB" },
  ],
  music: [{ id: "music-1", name: "Playlists", itemsCount: 23, sizeLabel: "2.1 GB" }],
  screenshots: [
    { id: "ss-1", name: "2025", itemsCount: 18, sizeLabel: "1.1 GB" },
    { id: "ss-2", name: "UI refs", itemsCount: 22, sizeLabel: "1.4 GB" },
  ],
};

export function LibraryPage() {
  const [q, setQ] = React.useState("");
  const [view, setView] = React.useState<"grid" | "list">("grid");
  const { setSidebarCollapsed } = useOutletContext<{ setSidebarCollapsed: (fn: (isCollapsed: boolean) => boolean) => void; }>();
  
  // Create folder modal
  const [createOpen, setCreateOpen] = React.useState(false);
  const [newName, setNewName] = React.useState("");
  const [newParent, setNewParent] = React.useState<string>("root");

  // Cover picker modal (v1 mock)
  const [coverOpen, setCoverOpen] = React.useState(false);
  const [coverTarget, setCoverTarget] = React.useState<FolderData | null>(null);
  const [coverChoice, setCoverChoice] = React.useState<string>("");

  const filtered = React.useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return MOCK_FOLDERS;
    return MOCK_FOLDERS.filter((f) => f.name.toLowerCase().includes(s));
  }, [q]);

  const openFolder = (id: string) => {
    // In real app: navigate(`/library/${id}`)
    alert(`Open folder (route): /library/${id}`);
  };

  const coverOptions = [
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=70",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=70",
    "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=70",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=70",
  ];

  return (
    <div className="min-h-full w-full bg-[radial-gradient(1200px_600px_at_15%_0%,rgba(168,85,247,0.18),transparent_55%),radial-gradient(900px_500px_at_85%_10%,rgba(236,72,153,0.10),transparent_55%),linear-gradient(to_bottom,rgba(0,0,0,0.92),rgba(0,0,0,0.96))]">
      {/* Page header */}
      <div className="px-4 md:px-8 pt-6 md:pt-8 pb-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Sidebar Toggle Button 
            <Button
              variant="ghost"
              size="icon"
              className="text-white/60 hover:text-white hover:bg-white/10 hidden md:flex"
              onClick={() => console.log("Toggle sidebar")}
              title="Toggle Sidebar"
            >
              <PanelLeft className="h-6 w-6" />
            </Button>
            */}
            <div>
              <div className="text-4xl font-semibold tracking-tight text-violet-300">Library</div>
              <div className="text-white/55 mt-1">Organize downloads into folders and subfolders</div>
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

            <Button
              className="bg-violet-600 hover:bg-violet-600/90 rounded-xl"
              onClick={() => {
                setNewName("");
                setNewParent("root");
                setCreateOpen(true);
              }}
            >
              <FolderPlus className="h-4 w-4 mr-2" />
              New Folder
            </Button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="px-4 md:px-8 pb-6">
        <LibraryFilters 
          onSearchChange={setQ}
          onViewChange={setView}
          currentView={view}
        />  
      </div>

      {/* Content */}
      <div className="px-4 md:px-8 pb-10">
        <div className={view === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4" : "space-y-3"}>
          {filtered.map((f) => (
            <FolderCard
              key={f.id}
              folder={f}
              subfolders={MOCK_SUBFOLDERS[f.id] ?? []}
              viewMode={view}
              onOpen={openFolder}
              onChangeCover={(folder) => {
                setCoverTarget(folder);
                setCoverChoice("");
                setCoverOpen(true);
              }}
            />
          ))}
        </div>
      </div>

      {/* Create Folder Modal */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="max-w-xl w-[92vw] bg-black/80 border-white/10 text-white rounded-2xl p-5 md:p-6">
          <DialogHeader>
            <DialogTitle className="text-white">Create Folder</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <div className="text-sm text-white/80 mb-2">Folder name</div>
              <Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="e.g. my-videos" className="bg-black/30 border-white/10 text-white placeholder:text-white/35 rounded-xl" />
            </div>
            <div>
              <div className="text-sm text-white/80 mb-2">Parent folder</div>
              <select value={newParent} onChange={(e) => setNewParent(e.target.value)} className="w-full rounded-xl bg-black/30 border border-white/10 text-white px-3 py-2">
                <option value="root">Root</option>
                {MOCK_FOLDERS.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <Button variant="secondary" className="bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl" onClick={() => setCreateOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-violet-600 hover:bg-violet-600/90 rounded-xl" onClick={() => setCreateOpen(false)}>
                <Plus className="h-4 w-4 mr-2" /> Create
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Cover Picker Modal */}
      <Dialog open={coverOpen} onOpenChange={setCoverOpen}>
        <DialogContent className="max-w-2xl w-[92vw] bg-black/80 border-white/10 text-white rounded-2xl p-5 md:p-6">
          <DialogHeader>
            <DialogTitle className="text-white">Choose Cover Image</DialogTitle>
          </DialogHeader>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
            {coverOptions.map((url) => (
              <button key={url} onClick={() => setCoverChoice(url)} className={"relative overflow-hidden rounded-2xl border transition " + (coverChoice === url ? "border-violet-500/60 ring-2 ring-violet-500/30" : "border-white/10 hover:border-white/20")}>
                <img src={url} alt="" className="h-24 w-full object-cover" />
              </button>
            ))}
          </div>
          <div className="mt-5 flex justify-end">
            <Button className="bg-violet-600 hover:bg-violet-600/90 rounded-xl" onClick={() => setCoverOpen(false)}>Set cover</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
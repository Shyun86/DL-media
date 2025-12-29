import React from "react";
import {
  Folder,
  FolderPlus,
  Image as ImageIcon,
  ChevronRight,
  Search,
  Plus,
  Sparkles,
  LayoutGrid,
  List,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

// ------------------------
// Mock data (v1)
// ------------------------

type FolderCard = {
  id: string;
  name: string;
  coverThumb?: string; // customizable cover image
  itemsCount: number;
  sizeLabel: string;
  subfoldersCount: number;
};

type SubfolderRow = {
  id: string;
  name: string;
  itemsCount: number;
  sizeLabel: string;
};

const MOCK_FOLDERS: FolderCard[] = [
  {
    id: "inbox",
    name: "Inbox",
    coverThumb:
      "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=1200&q=70",
    itemsCount: 128,
    sizeLabel: "18.4 GB",
    subfoldersCount: 6,
  },
  {
    id: "shorts",
    name: "Shorts",
    coverThumb:
      "https://images.unsplash.com/photo-1520975958221-26d5f21e92f1?auto=format&fit=crop&w=1200&q=70",
    itemsCount: 342,
    sizeLabel: "52.7 GB",
    subfoldersCount: 12,
  },
  {
    id: "music",
    name: "Music",
    coverThumb:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=70",
    itemsCount: 89,
    sizeLabel: "9.2 GB",
    subfoldersCount: 2,
  },
  {
    id: "screenshots",
    name: "Screenshots",
    coverThumb:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=70",
    itemsCount: 54,
    sizeLabel: "3.7 GB",
    subfoldersCount: 3,
  },
];

const MOCK_SUBFOLDERS: Record<string, SubfolderRow[]> = {
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

// ------------------------
// Single-file page
// ------------------------
export default function LibraryPage() {
  const [q, setQ] = React.useState("");
  const [view, setView] = React.useState<"grid" | "list">("grid");

  // Create folder modal
  const [createOpen, setCreateOpen] = React.useState(false);
  const [newName, setNewName] = React.useState("");
  const [newParent, setNewParent] = React.useState<string>("root");

  // Cover picker modal (v1 mock)
  const [coverOpen, setCoverOpen] = React.useState(false);
  const [coverTarget, setCoverTarget] = React.useState<FolderCard | null>(null);
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
    <div className="min-h-screen bg-[radial-gradient(1200px_600px_at_15%_0%,rgba(168,85,247,0.18),transparent_55%),radial-gradient(900px_500px_at_85%_10%,rgba(236,72,153,0.10),transparent_55%),linear-gradient(to_bottom,rgba(0,0,0,0.92),rgba(0,0,0,0.96))]">
      {/* Page header */}
      <div className="px-4 md:px-8 pt-6 md:pt-8 pb-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-4xl font-semibold tracking-tight text-violet-300">
              Library
            </div>
            <div className="text-white/55 mt-1">
              Organize downloads into folders and subfolders
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              className="bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl"
              onClick={() => setView((v) => (v === "grid" ? "list" : "grid"))}
              title="Toggle view"
            >
              {view === "grid" ? (
                <>
                  <List className="h-4 w-4 mr-2" /> List
                </>
              ) : (
                <>
                  <LayoutGrid className="h-4 w-4 mr-2" /> Grid
                </>
              )}
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <div className="lg:col-span-2 relative">
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search folders…"
              className="bg-black/30 border-white/10 text-white placeholder:text-white/35 rounded-xl pl-10"
            />
            <Search className="h-4 w-4 text-white/35 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 flex items-center justify-between">
            <div>
              <div className="text-sm text-white/80 font-semibold">v1 rules</div>
              <div className="text-xs text-white/45 mt-1">
                Folder cards have a cover + stats. Subfolders are compact rows (name + stats only).
              </div>
            </div>
            <Sparkles className="h-5 w-5 text-violet-200/70" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 md:px-8 pb-10">
        {view === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((f) => (
              <div
                key={f.id}
                className="group rounded-2xl border border-white/10 bg-white/5 hover:bg-white/7 transition overflow-hidden"
              >
                {/* Cover */}
                <div className="relative h-36 bg-black/30">
                  {f.coverThumb ? (
                    <img
                      src={f.coverThumb}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover opacity-90"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-white/35">
                      <ImageIcon className="h-6 w-6" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Cover edit */}
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute right-3 top-3 bg-black/40 hover:bg-black/60 border border-white/10 text-white rounded-xl opacity-0 group-hover:opacity-100 transition"
                    title="Change cover"
                    onClick={() => {
                      setCoverTarget(f);
                      setCoverChoice("");
                      setCoverOpen(true);
                    }}
                  >
                    <ImageIcon className="h-4 w-4" />
                  </Button>

                  <div className="absolute left-3 bottom-3 flex items-center gap-2">
                    <Badge className="bg-violet-500/20 text-violet-200 border border-violet-500/30">
                      Folder
                    </Badge>
                    <Badge className="bg-white/10 text-white/80 border border-white/10">
                      {f.subfoldersCount} subfolders
                    </Badge>
                  </div>
                </div>

                {/* Body */}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-white font-semibold truncate">{f.name}</div>
                      <div className="text-xs text-white/50 mt-1">
                        {f.itemsCount} items • {f.sizeLabel}
                      </div>
                    </div>

                    <Button
                      variant="secondary"
                      className="bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl"
                      onClick={() => openFolder(f.id)}
                    >
                      Open
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>

                  {/* Subfolders preview */}
                  <div className="mt-4 space-y-2">
                    {(MOCK_SUBFOLDERS[f.id] ?? []).slice(0, 2).map((s) => (
                      <div
                        key={s.id}
                        className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <Folder className="h-4 w-4 text-white/50" />
                          <div className="text-sm text-white/80 truncate">{s.name}</div>
                        </div>
                        <div className="text-xs text-white/45">
                          {s.itemsCount} • {s.sizeLabel}
                        </div>
                      </div>
                    ))}

                    {(MOCK_SUBFOLDERS[f.id] ?? []).length > 2 && (
                      <div className="text-xs text-white/45 pl-1">
                        + {(MOCK_SUBFOLDERS[f.id].length - 2)} more subfolders
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((f) => (
              <div
                key={f.id}
                className="rounded-2xl border border-white/10 bg-white/5 hover:bg-white/7 transition px-4 py-4 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-10 w-10 rounded-xl bg-black/30 border border-white/10 overflow-hidden">
                    {f.coverThumb ? (
                      <img src={f.coverThumb} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-white/35">
                        <ImageIcon className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="text-white font-semibold truncate">{f.name}</div>
                    <div className="text-xs text-white/50 mt-1">
                      {f.itemsCount} items • {f.sizeLabel} • {f.subfoldersCount} subfolders
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl"
                    title="Change cover"
                    onClick={() => {
                      setCoverTarget(f);
                      setCoverChoice("");
                      setCoverOpen(true);
                    }}
                  >
                    <ImageIcon className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="secondary"
                    className="bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl"
                    onClick={() => openFolder(f.id)}
                  >
                    Open <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
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
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. my-videos"
                className="bg-black/30 border-white/10 text-white placeholder:text-white/35 rounded-xl"
              />
            </div>

            <div>
              <div className="text-sm text-white/80 mb-2">Parent folder</div>
              <select
                value={newParent}
                onChange={(e) => setNewParent(e.target.value)}
                className="w-full rounded-xl bg-black/30 border border-white/10 text-white px-3 py-2"
              >
                <option value="root">Root</option>
                {MOCK_FOLDERS.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name}
                  </option>
                ))}
              </select>
              <div className="text-xs text-white/45 mt-2">
                v1: nested folders supported. Subfolders show name + stats only.
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button
                variant="secondary"
                className="bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl"
                onClick={() => setCreateOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-violet-600 hover:bg-violet-600/90 rounded-xl"
                onClick={() => {
                  if (!newName.trim()) return alert("Folder name required (mock)");
                  alert(`Create folder (mock): ${newName} (parent: ${newParent})`);
                  setCreateOpen(false);
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create
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

          <div className="text-xs text-white/45">
            v1 mock: later this will let you pick a cover from media inside the folder.
          </div>

          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
            {coverOptions.map((url) => (
              <button
                key={url}
                onClick={() => setCoverChoice(url)}
                className={
                  "relative overflow-hidden rounded-2xl border transition " +
                  (coverChoice === url
                    ? "border-violet-500/60 ring-2 ring-violet-500/30"
                    : "border-white/10 hover:border-white/20")
                }
              >
                <img src={url} alt="" className="h-24 w-full object-cover" />
                {coverChoice === url && (
                  <div className="absolute inset-0 bg-violet-500/10" />
                )}
              </button>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between gap-2">
            <div className="text-xs text-white/50 truncate">
              Target: <span className="text-white/75">{coverTarget?.name ?? "—"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                className="bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl"
                onClick={() => setCoverOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-violet-600 hover:bg-violet-600/90 rounded-xl"
                onClick={() => {
                  if (!coverChoice) return alert("Pick an image first (mock)");
                  alert(`Set cover (mock): ${coverTarget?.id} -> ${coverChoice}`);
                  setCoverOpen(false);
                }}
              >
                Set cover
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Tiny floating help (optional) */}
      <div className="fixed bottom-4 right-4 hidden md:block">
        <div className="rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl p-3 text-xs text-white/70 flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-violet-400" />
          Covers can be edited per folder
          <button
            className="ml-2 text-white/60 hover:text-white"
            onClick={() => alert("Help (mock)")}
            title="Close"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

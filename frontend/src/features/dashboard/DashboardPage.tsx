import { useOutletContext } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FolderOpen, Download } from "lucide-react";
import { Job } from "@/api/types";
import { StatCard } from "./components/StatCard";
import { ActivityList } from "./components/ActivityList";

// Mock data, to be replaced by API calls in Phase 3
const jobs: Job[] = [
  {
    id: "j1",
    title: "Epic Gaming Compilation 2024",
    platform: "YouTube",
    createdAt: "2025-12-28T11:30:00Z",
    status: "completed",
    size: "1.3 GB",
    mediaId: "m1",
  },
  {
    id: "j2",
    title: "Nature Photography Collection",
    platform: "Instagram",
    createdAt: "2025-12-28T12:15:00Z",
    status: "downloading",
    progress: 67,
    size: "740 MB",
  },
  {
    id: "j3",
    title: "Coding Tutorial Series — React Advanced",
    platform: "YouTube",
    createdAt: "2025-12-28T12:45:00Z",
    status: "queued",
  },
  {
    id: "j4",
    title: "Funny Cat Memes Compilation",
    platform: "Reddit",
    createdAt: "2025-12-28T13:00:00Z",
    status: "failed",
    error: "Access denied — requires authentication",
  },
];


export function DashboardPage() {
  const { setSidebarCollapsed } = useOutletContext<{ setSidebarCollapsed: (fn: (isCollapsed: boolean) => boolean) => void; }>();

  const total = jobs.length;
  const completed = jobs.filter((j) => j.status === "completed").length;
  const inProgress = jobs.filter((j) => j.status === "downloading").length;
  const failed = jobs.filter((j) => j.status === "failed").length;

  return (
    <div>
      {/* Desktop header */}
      <div className="hidden md:block sticky top-0 z-20 border-b border-white/10 bg-black/30 backdrop-blur-xl">
        <div className="px-8 py-6 flex items-start justify-between gap-6">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-violet-300">
              Dashboard
            </h1>
            <p className="text-white/55 mt-1">
              Monitor your download activity and manage your media
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              className="text-white/80 hover:text-white hover:bg-white/10"
              onClick={() => setSidebarCollapsed(v => !v)}
              title="Toggle sidebar"
            >
              <FolderOpen className="h-4 w-4 mr-2" />
              Sidebar
            </Button>

            <div className="hidden lg:block">
              <div className="relative">
                <Input
                  placeholder="Search downloads..."
                  className="w-[340px] bg-black/30 border-white/10 text-white placeholder:text-white/35 rounded-xl"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-white/35 text-xs">
                  ⌘K
                </div>
              </div>
            </div>

            <Button className="bg-violet-600 hover:bg-violet-600/90">
              <Download className="h-4 w-4 mr-2" />
              New Download
            </Button>
          </div>
        </div>
      </div>
      
      <div className="px-4 md:px-8 py-6 md:py-8">
        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard title="Total Downloads" description="All time" value={total} />
          <StatCard title="Completed" description="Successfully downloaded" value={completed} valueClassName="text-emerald-300" />
          <StatCard title="In Progress" description="Currently downloading" value={inProgress} valueClassName="text-violet-300" />
          <StatCard title="Failed" description="Requires attention" value={failed} valueClassName="text-red-300" />
        </div>

        {/* Recent Activity */}
        <div className="mt-6">
            <ActivityList jobs={jobs} />
        </div>
      </div>
    </div>
  );
}

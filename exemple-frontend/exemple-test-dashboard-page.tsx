import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  LayoutDashboard,
  Home,
  Rss,
  Library,
  Settings,
  Bell,
  FolderOpen,
  Download,
  CheckCircle2,
  Loader2,
  XCircle,
  PauseCircle,
  RefreshCw,
  Ban,
  FileText,
  ExternalLink,
  Play,
  Square,
} from "lucide-react";

const nav = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Home", icon: Home, href: "/home" },
  { label: "Feed", icon: Rss, href: "/feed" },
  { label: "Library", icon: Library, href: "/library" },
];

type JobStatus = "completed" | "downloading" | "failed" | "queued";

type Job = {
  id: string;
  title: string;
  platform: "YouTube" | "Instagram" | "TikTok" | "Reddit" | "Twitter/X";
  category?: string;
  time: string; // HH:MM:SS
  status: JobStatus;
  progress?: number; // 0-100
  size?: string;
  error?: string;
};

const jobs: Job[] = [
  {
    id: "j1",
    title: "Epic Gaming Compilation 2024",
    platform: "YouTube",
    category: "Gaming Videos",
    time: "11:30:00",
    status: "completed",
    size: "1.3 GB",
  },
  {
    id: "j2",
    title: "Nature Photography Collection",
    platform: "Instagram",
    category: "Photography",
    time: "12:15:00",
    status: "downloading",
    progress: 67,
    size: "740 MB",
  },
  {
    id: "j3",
    title: "Coding Tutorial Series — React Advanced",
    platform: "YouTube",
    category: "Tutorials",
    time: "12:45:00",
    status: "queued",
    size: "—",
  },
  {
    id: "j4",
    title: "Funny Cat Memes Compilation",
    platform: "Reddit",
    category: "Memes",
    time: "13:00:00",
    status: "failed",
    size: "—",
    error: "Access denied — requires authentication",
  },
];

function Sidebar({ collapsed = false }: { collapsed?: boolean }) {
  return (
    <aside
      className={
        "hidden md:flex h-screen sticky top-0 border-r border-white/10 bg-black/30 backdrop-blur-xl " +
        (collapsed ? "w-20" : "w-72")
      }
    >
      <div className="flex flex-col w-full">
        <div className="px-5 py-5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-fuchsia-500/60 to-violet-500/40 ring-1 ring-white/10" />
            {!collapsed && (
              <div className="leading-tight">
                <div className="text-white font-semibold">MediaFetcher</div>
                <div className="text-xs text-white/50">Monitor downloads & media</div>
              </div>
            )}
          </div>
        </div>

        <nav className="px-3 space-y-1">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-white/80 hover:text-white hover:bg-white/5 transition " +
                (item.href === "/dashboard" ? "bg-white/5 text-white" : "")
              }
            >
              <item.icon className="h-5 w-5" />
              {!collapsed && <span className="text-sm">{item.label}</span>}
            </a>
          ))}
        </nav>

        <div className="mt-auto px-3 pb-4">
          <div className="h-px bg-white/10 my-3" />
          <a
            href="/settings"
            className={
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-white/80 hover:text-white hover:bg-white/5 transition"
            }
          >
            <Settings className="h-5 w-5" />
            {!collapsed && <span className="text-sm">Settings</span>}
          </a>
          <a
            href="#notifications"
            className="mt-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-white/80 hover:text-white hover:bg-white/5 transition"
          >
            <Bell className="h-5 w-5" />
            {!collapsed && <span className="text-sm">Notifications</span>}
          </a>
        </div>
      </div>
    </aside>
  );
}

function StatusBadge({ status }: { status: JobStatus }) {
  if (status === "completed")
    return (
      <Badge className="bg-violet-500/20 text-violet-200 border border-violet-500/30">
        completed
      </Badge>
    );
  if (status === "downloading")
    return (
      <Badge className="bg-violet-500/20 text-violet-200 border border-violet-500/30">
        downloading
      </Badge>
    );
  if (status === "queued")
    return (
      <Badge className="bg-white/10 text-white/70 border border-white/10">
        queued
      </Badge>
    );
  return (
    <Badge className="bg-red-500/15 text-red-200 border border-red-500/25">
      failed
    </Badge>
  );
}

function StatusIcon({ status }: { status: JobStatus }) {
  if (status === "completed")
    return <CheckCircle2 className="h-5 w-5 text-emerald-300" />;
  if (status === "downloading")
    return <Download className="h-5 w-5 text-violet-300" />;
  if (status === "queued")
    return <PauseCircle className="h-5 w-5 text-white/60" />;
  return <XCircle className="h-5 w-5 text-red-300" />;
}

export default function DashboardMockPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

  // Mock stats (derived from mock jobs)
  const total = jobs.length;
  const completed = jobs.filter((j) => j.status === "completed").length;
  const inProgress = jobs.filter((j) => j.status === "downloading").length;
  const failed = jobs.filter((j) => j.status === "failed").length;

  return (
    <div className="min-h-screen bg-[radial-gradient(1200px_600px_at_15%_0%,rgba(168,85,247,0.18),transparent_55%),radial-gradient(900px_500px_at_85%_10%,rgba(236,72,153,0.10),transparent_55%),linear-gradient(to_bottom,rgba(0,0,0,0.92),rgba(0,0,0,0.96))]">
      {/* Mobile header */}
      <div className="md:hidden sticky top-0 z-30 border-b border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  <span className="text-xl">☰</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 bg-black/90 border-white/10">
                <SheetHeader>
                  <SheetTitle className="text-white">MediaFetcher</SheetTitle>
                </SheetHeader>
                <div className="mt-4 space-y-1">
                  {nav
                    .concat([{ label: "Settings", icon: Settings, href: "/settings" }])
                    .map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        className={
                          "flex items-center gap-3 rounded-xl px-3 py-2.5 text-white/80 hover:text-white hover:bg-white/10 transition " +
                          (item.href === "/dashboard" ? "bg-white/10 text-white" : "")
                        }
                      >
                        <item.icon className="h-5 w-5" />
                        <span className="text-sm">{item.label}</span>
                      </a>
                    ))}
                </div>
              </SheetContent>
            </Sheet>
            <div className="text-white font-semibold">Dashboard</div>
          </div>

          <Button className="bg-violet-600 hover:bg-violet-600/90">
            <Download className="h-4 w-4 mr-2" />
            New Download
          </Button>
        </div>
      </div>

      <div className="flex">
        <Sidebar collapsed={sidebarCollapsed} />

        <main className="flex-1">
          {/* Desktop header */}
          <div className="hidden md:block sticky top-0 z-20 border-b border-white/10 bg-black/30 backdrop-blur-xl">
            <div className="px-8 py-6 flex items-start justify-between gap-6">
              <div>
                <div className="text-4xl font-semibold tracking-tight text-violet-300">
                  Dashboard
                </div>
                <div className="text-white/55 mt-1">
                  Monitor your download activity and manage your media
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  className="text-white/80 hover:text-white hover:bg-white/10"
                  onClick={() => setSidebarCollapsed((v) => !v)}
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
              <Card className="bg-white/5 border-white/10 rounded-2xl">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-sm font-medium">
                    Total Downloads
                  </CardTitle>
                  <CardDescription className="text-white/45">All time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-semibold text-white">{total}</div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 rounded-2xl">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-sm font-medium">
                    Completed
                  </CardTitle>
                  <CardDescription className="text-white/45">
                    Successfully downloaded
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-semibold text-emerald-300">
                    {completed}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 rounded-2xl">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-sm font-medium">
                    In Progress
                  </CardTitle>
                  <CardDescription className="text-white/45">
                    Currently downloading
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-semibold text-violet-300">
                    {inProgress}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 rounded-2xl">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-sm font-medium">
                    Failed
                  </CardTitle>
                  <CardDescription className="text-white/45">
                    Requires attention
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-semibold text-red-300">
                    {failed}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="mt-6">
              <Card className="bg-white/5 border-white/10 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-white">Recent Activity</CardTitle>
                  <CardDescription className="text-white/55">
                    Latest download activities and their status
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {jobs.map((job) => (
                    <div
                      key={job.id}
                      className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 min-w-0">
                          <div className="mt-0.5">
                            <StatusIcon status={job.status} />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <div className="text-white/95 font-medium truncate">
                                {job.title}
                              </div>
                              <StatusBadge status={job.status} />
                            </div>

                            <div className="text-xs text-white/45 mt-1 flex items-center gap-2 flex-wrap">
                              <span>{job.platform}</span>
                              <span className="text-white/25">→</span>
                              <span>{job.category ?? "—"}</span>
                              <span className="text-white/25">·</span>
                              <span>{job.time}</span>
                              <span className="text-white/25">·</span>
                              <span>{job.size ?? "—"}</span>
                            </div>

                            {job.status === "downloading" && (
                              <div className="mt-3 space-y-2">
                                <Progress value={job.progress ?? 0} />
                                <div className="text-xs text-white/45">
                                  {job.progress ?? 0}% complete
                                </div>
                              </div>
                            )}

                            {job.status === "failed" && job.error && (
                              <div className="mt-2 text-sm text-red-200/90">
                                {job.error}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          {job.status === "downloading" && (
                            <Button
                              variant="secondary"
                              className="bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl"
                              title="Cancel"
                            >
                              <Ban className="h-4 w-4" />
                            </Button>
                          )}

                          {job.status === "failed" && (
                            <Button
                              variant="secondary"
                              className="bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl"
                              title="Retry"
                            >
                              <RefreshCw className="h-4 w-4" />
                            </Button>
                          )}

                          <Button
                            variant="secondary"
                            className="bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl"
                            title="View logs"
                          >
                            <FileText className="h-4 w-4" />
                          </Button>

                          <Button
                            variant="secondary"
                            className="bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl hidden sm:inline-flex"
                            title="Open"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="h-10" />
          </div>
        </main>
      </div>
    </div>
  );
}

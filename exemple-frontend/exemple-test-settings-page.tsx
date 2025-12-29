import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
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
  Plug,
  Save,
  Link2,
  CheckCircle2,
  ExternalLink,
  RefreshCw,
} from "lucide-react";

const nav = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Home", icon: Home, href: "/home" },
  { label: "Feed", icon: Rss, href: "/feed" },
  { label: "Library", icon: Library, href: "/library" },
];

const sites = [
  { name: "YouTube (Shorts)", downloads: 1234, active: true },
  { name: "Instagram", downloads: 567, active: true },
  { name: "TikTok", downloads: 890, active: true },
  { name: "Twitter / X", downloads: 345, active: true },
  { name: "Reddit", downloads: 678, active: true },
  { name: "Imgur", downloads: 234, active: true },
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
                <div className="text-xs text-white/50">Self-hosted media hub</div>
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
                (item.href === "/settings" ? "bg-white/5 text-white" : "")
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
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-white hover:bg-white/5 transition bg-white/5"
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

export default function SettingsMockPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

  const [autoUpdateCookies, setAutoUpdateCookies] = React.useState(true);
  const [enableNotifications, setEnableNotifications] = React.useState(true);
  const [notifStarted, setNotifStarted] = React.useState(true);
  const [notifCompleted, setNotifCompleted] = React.useState(true);
  const [notifFailed, setNotifFailed] = React.useState(true);
  const [notifNewFolder, setNotifNewFolder] = React.useState(false);

  const [downloadThumbs, setDownloadThumbs] = React.useState(true);
  const [keepOriginal, setKeepOriginal] = React.useState(true);
  const [autoExtractAudio, setAutoExtractAudio] = React.useState(false);

  return (
    <div className="min-h-screen bg-[radial-gradient(1200px_600px_at_15%_0%,rgba(168,85,247,0.18),transparent_55%),radial-gradient(900px_500px_at_85%_10%,rgba(236,72,153,0.10),transparent_55%),linear-gradient(to_bottom,rgba(0,0,0,0.92),rgba(0,0,0,0.96))]">
      {/* Mobile nav */}
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
                          (item.href === "/settings" ? "bg-white/10 text-white" : "")
                        }
                      >
                        <item.icon className="h-5 w-5" />
                        <span className="text-sm">{item.label}</span>
                      </a>
                    ))}
                </div>
              </SheetContent>
            </Sheet>
            <div className="text-white font-semibold">Settings</div>
          </div>
          <Button className="bg-violet-600 hover:bg-violet-600/90">
            <Save className="h-4 w-4 mr-2" />
            Save
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
                  Settings
                </div>
                <div className="text-white/55 mt-1">
                  Configure MediaFetcher to suit your needs
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
                <Button className="bg-violet-600 hover:bg-violet-600/90">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          </div>

          <div className="px-4 md:px-8 py-6 md:py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Storage & Paths */}
              <Card className="bg-white/5 border-white/10 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <FolderOpen className="h-5 w-5 text-violet-300" />
                    Storage & Paths
                  </CardTitle>
                  <CardDescription className="text-white/55">
                    Configure where your media files are stored
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="space-y-2">
                    <Label className="text-white/80">Media Root Directory</Label>
                    <div className="flex gap-2">
                      <Input
                        defaultValue="/mnt/truenas/App-DL/media"
                        className="bg-black/30 border-white/10 text-white placeholder:text-white/30 rounded-xl"
                      />
                      <Button
                        variant="secondary"
                        className="bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl"
                        title="Pick folder"
                      >
                        <FolderOpen className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white/80">File Naming Pattern</Label>
                    <Input
                      defaultValue="{sha256}.{ext}"
                      className="bg-black/30 border-white/10 text-white placeholder:text-white/30 rounded-xl"
                    />
                    <div className="text-xs text-white/45">
                      V1 uses hashed filenames for dedup and compatibility.
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                    <div>
                      <div className="text-white/85 font-medium">Organize by Date</div>
                      <div className="text-xs text-white/45">
                        Create folders by download date
                      </div>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>

              {/* Download Settings */}
              <Card className="bg-white/5 border-white/10 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <LayoutDashboard className="h-5 w-5 text-violet-300" />
                    Download Settings
                  </CardTitle>
                  <CardDescription className="text-white/55">
                    Control how downloads are handled
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="space-y-2">
                    <Label className="text-white/80">Default Video Quality</Label>
                    <Select defaultValue="auto">
                      <SelectTrigger className="bg-black/30 border-white/10 text-white rounded-xl">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent className="bg-black/95 border-white/10 text-white">
                        <SelectItem value="auto">Auto (best)</SelectItem>
                        <SelectItem value="1080">1080p</SelectItem>
                        <SelectItem value="720">720p</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="text-xs text-white/45">
                      V1 uses Auto (best). Quality picker is forward-compatible.
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white/80">Max Concurrent Downloads</Label>
                    <Input
                      defaultValue="3"
                      className="bg-black/30 border-white/10 text-white rounded-xl"
                    />
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                    <div>
                      <div className="text-white/85 font-medium">Auto-extract Audio</div>
                      <div className="text-xs text-white/45">
                        Save audio track separately
                      </div>
                    </div>
                    <Switch
                      checked={autoExtractAudio}
                      onCheckedChange={setAutoExtractAudio}
                    />
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                    <div>
                      <div className="text-white/85 font-medium">Download Thumbnails</div>
                      <div className="text-xs text-white/45">Save thumbnails</div>
                    </div>
                    <Switch
                      checked={downloadThumbs}
                      onCheckedChange={setDownloadThumbs}
                    />
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                    <div>
                      <div className="text-white/85 font-medium">Keep Original Files</div>
                      <div className="text-xs text-white/45">
                        Preserve original file format
                      </div>
                    </div>
                    <Switch checked={keepOriginal} onCheckedChange={setKeepOriginal} />
                  </div>
                </CardContent>
              </Card>

              {/* Browser Integration */}
              <Card className="bg-white/5 border-white/10 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Plug className="h-5 w-5 text-violet-300" />
                    Browser Integration
                  </CardTitle>
                  <CardDescription className="text-white/55">
                    Manage browser extension settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                    <div>
                      <div className="text-white/85 font-medium">Auto-update Cookies</div>
                      <div className="text-xs text-white/45">
                        Automatically extract browser cookies
                      </div>
                    </div>
                    <Switch
                      checked={autoUpdateCookies}
                      onCheckedChange={setAutoUpdateCookies}
                    />
                  </div>

                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                      <div>
                        <div className="text-white/90 font-medium">Extension Connected</div>
                        <div className="text-xs text-white/55">Status: Active</div>
                      </div>
                    </div>
                    <Badge className="bg-emerald-500/15 text-emerald-200 border border-emerald-500/30">
                      Active
                    </Badge>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      className="bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open Extension
                    </Button>
                    <Button
                      variant="secondary"
                      className="bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh Status
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card id="notifications" className="bg-white/5 border-white/10 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Bell className="h-5 w-5 text-violet-300" />
                    Notifications
                  </CardTitle>
                  <CardDescription className="text-white/55">
                    Control notification preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                    <div>
                      <div className="text-white/85 font-medium">Enable Notifications</div>
                      <div className="text-xs text-white/45">
                        Show download completion alerts
                      </div>
                    </div>
                    <Switch
                      checked={enableNotifications}
                      onCheckedChange={setEnableNotifications}
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="text-white/80 font-medium">Notification Types</div>

                    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                      <div>
                        <div className="text-white/85">Download Started</div>
                      </div>
                      <Switch
                        checked={notifStarted}
                        onCheckedChange={setNotifStarted}
                        disabled={!enableNotifications}
                      />
                    </div>

                    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                      <div>
                        <div className="text-white/85">Download Completed</div>
                      </div>
                      <Switch
                        checked={notifCompleted}
                        onCheckedChange={setNotifCompleted}
                        disabled={!enableNotifications}
                      />
                    </div>

                    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                      <div>
                        <div className="text-white/85">Download Failed</div>
                      </div>
                      <Switch
                        checked={notifFailed}
                        onCheckedChange={setNotifFailed}
                        disabled={!enableNotifications}
                      />
                    </div>

                    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                      <div>
                        <div className="text-white/85">New Library Created</div>
                      </div>
                      <Switch
                        checked={notifNewFolder}
                        onCheckedChange={setNotifNewFolder}
                        disabled={!enableNotifications}
                      />
                    </div>
                  </div>

                  <div className="text-xs text-white/45">
                    Notifications are persistent and will also appear in the notification center.
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Supported Sites */}
            <div className="mt-6">
              <Card className="bg-white/5 border-white/10 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Link2 className="h-5 w-5 text-violet-300" />
                    Supported Sites
                  </CardTitle>
                  <CardDescription className="text-white/55">
                    Status and configuration for supported platforms
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sites.map((s) => (
                      <div
                        key={s.name}
                        className="rounded-2xl border border-white/10 bg-black/20 p-4 flex items-center justify-between"
                      >
                        <div>
                          <div className="text-white/90 font-medium">{s.name}</div>
                          <div className="text-xs text-white/45">
                            {s.downloads} downloads
                          </div>
                        </div>
                        <Badge className="bg-emerald-500/15 text-emerald-200 border border-emerald-500/30">
                          Active
                        </Badge>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 text-xs text-white/45">
                    YouTube is restricted to Shorts in V1.
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Footer spacing */}
            <div className="h-10" />
          </div>
        </main>
      </div>
    </div>
  );
}

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  FolderOpen,
  Plug,
  Save,
  Link2,
  CheckCircle2,
  ExternalLink,
  RefreshCw,
  Bell,
  LayoutDashboard,
} from "lucide-react";
import { useOutletContext } from "react-router-dom";

// Local component for a consistent section look
function SettingsSection({
    icon,
    title,
    description,
    children,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
    children: React.ReactNode;
}) {
    return (
        <Card className="bg-white/5 border-white/10 rounded-2xl">
            <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                    {icon}
                    {title}
                </CardTitle>
                <CardDescription className="text-white/55">
                    {description}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    );
}


export function SettingsPage() {
    const { setSidebarCollapsed } = useOutletContext<{ setSidebarCollapsed: (fn: (isCollapsed: boolean) => boolean) => void; }>();

    // Mock states from the example file
    const [autoUpdateCookies, setAutoUpdateCookies] = React.useState(true);
    const [enableNotifications, setEnableNotifications] = React.useState(true);

    return (
        <div>
            {/* Header */}
            <div className="sticky top-0 z-20 border-b border-white/10 bg-black/30 backdrop-blur-xl">
                <div className="px-8 py-6 flex items-start justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-semibold tracking-tight text-violet-300">
                            Settings
                        </h1>
                        <p className="text-white/55 mt-1">
                            Configure MediaFetcher to suit your needs
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            className="text-white/80 hover:text-white hover:bg-white/10 hidden md:flex"
                            onClick={() => setSidebarCollapsed(v => !v)}
                            title="Toggle sidebar"
                        >
                            <FolderOpen className="h-4 w-4 mr-2" />
                            Sidebar
                        </Button>
                        <Button 
                            className="bg-violet-600 hover:bg-violet-700"
                            onClick={() => alert("Settings saved! (mock)")}
                        >
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                        </Button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="px-4 md:px-8 py-6 md:py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    <SettingsSection
                        icon={<FolderOpen className="h-5 w-5 text-violet-300" />}
                        title="Storage & Paths"
                        description="Configure where your media files are stored"
                    >
                        <div className="space-y-5">
                            <div className="space-y-2">
                                <Label className="text-white/80">Media Root Directory</Label>
                                <div className="flex gap-2">
                                <Input
                                    defaultValue="/mnt/truenas/App-DL/media"
                                    className="bg-black/30 border-white/10 text-white rounded-xl"
                                />
                                <Button
                                    variant="secondary"
                                    className="bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl"
                                >
                                    <FolderOpen className="h-4 w-4" />
                                </Button>
                                </div>
                            </div>
                            <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                                <div>
                                    <h4 className="text-white/85 font-medium">Organize by Date</h4>
                                    <p className="text-xs text-white/45">Create folders by download date</p>
                                </div>
                                <Switch />
                            </div>
                        </div>
                    </SettingsSection>

                    <SettingsSection
                        icon={<LayoutDashboard className="h-5 w-5 text-violet-300" />}
                        title="Download Settings"
                        description="Control how downloads are handled"
                    >
                        <div className="space-y-5">
                            <div className="space-y-2">
                                <Label className="text-white/80">Default Video Quality</Label>
                                <Select defaultValue="auto">
                                <SelectTrigger className="bg-black/30 border-white/10 text-white rounded-xl">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-black/95 border-white/10 text-white">
                                    <SelectItem value="auto">Auto (best)</SelectItem>
                                    <SelectItem value="1080">1080p</SelectItem>
                                    <SelectItem value="720">720p</SelectItem>
                                </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-white/80">Max Concurrent Downloads</Label>
                                <Input defaultValue="3" type="number" className="bg-black/30 border-white/10 text-white rounded-xl" />
                            </div>
                        </div>
                    </SettingsSection>

                    <SettingsSection
                        icon={<Plug className="h-5 w-5 text-violet-300" />}
                        title="Browser Integration"
                        description="Manage browser extension settings"
                    >
                        <div className="space-y-5">
                            <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                                <div>
                                    <h4 className="text-white/85 font-medium">Auto-update Cookies</h4>
                                    <p className="text-xs text-white/45">Automatically extract browser cookies</p>
                                </div>
                                <Switch checked={autoUpdateCookies} onCheckedChange={setAutoUpdateCookies} />
                            </div>
                            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                                    <div>
                                        <div className="text-white/90 font-medium">Extension Connected</div>
                                    </div>
                                </div>
                                <Badge className="bg-emerald-500/15 text-emerald-200 border border-emerald-500/30">Active</Badge>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="secondary" className="bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl">
                                    <ExternalLink className="h-4 w-4 mr-2" /> Open Extension
                                </Button>
                                <Button variant="secondary" className="bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl">
                                    <RefreshCw className="h-4 w-4 mr-2" /> Refresh
                                </Button>
                            </div>
                        </div>
                    </SettingsSection>

                    <SettingsSection
                        icon={<Bell className="h-5 w-5 text-violet-300" />}
                        title="Notifications"
                        description="Control notification preferences"
                    >
                        <div className="space-y-4">
                            <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                                <div>
                                    <h4 className="text-white/85 font-medium">Enable Notifications</h4>
                                    <p className="text-xs text-white/45">Show system-wide alerts</p>
                                </div>
                                <Switch checked={enableNotifications} onCheckedChange={setEnableNotifications} />
                            </div>
                             <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                                <div><h4 className="text-white/85">On Download Completed</h4></div>
                                <Switch defaultChecked disabled={!enableNotifications} />
                            </div>
                             <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                                <div><h4 className="text-white/85">On Download Failed</h4></div>
                                <Switch defaultChecked disabled={!enableNotifications} />
                            </div>
                        </div>
                    </SettingsSection>

                    <div className="lg:col-span-2">
                        <SettingsSection
                            icon={<Link2 className="h-5 w-5 text-violet-300" />}
                            title="Supported Sites"
                            description="Status and configuration for supported platforms"
                        >
                             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {['YouTube (Shorts)', 'Instagram', 'TikTok', 'Twitter / X', 'Reddit', 'Imgur'].map((s) => (
                                <div key={s} className="rounded-2xl border border-white/10 bg-black/20 p-4 flex items-center justify-between">
                                    <div>
                                        <div className="text-white/90 font-medium">{s}</div>
                                    </div>
                                    <Badge className="bg-emerald-500/15 text-emerald-200 border border-emerald-500/30">Active</Badge>
                                </div>
                                ))}
                            </div>
                        </SettingsSection>
                    </div>

                </div>
            </div>
        </div>
    );
}
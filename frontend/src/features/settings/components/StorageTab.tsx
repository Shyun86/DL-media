import { SettingsCard } from "./SettingsCard";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

export function StorageTab() {
    return (
        <div className="space-y-6">
            <SettingsCard
                title="Storage"
                description="Manage where your media is saved and how it's organized."
            >
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="download-path" className="text-white/80">Download Folder</Label>
                        <Input id="download-path" defaultValue="/downloads" className="bg-black/30 border-white/10 text-white" />
                    </div>
                     <div className="flex items-center justify-between pt-4">
                        <Label htmlFor="auto-delete" className="space-y-1">
                            <span className="text-white/80">Auto-delete after watch</span>
                            <p className="text-xs text-white/50 font-normal">Automatically delete files after they have been watched completely.</p>
                        </Label>
                        <Switch id="auto-delete" />
                    </div>
                </div>
            </SettingsCard>
        </div>
    )
}

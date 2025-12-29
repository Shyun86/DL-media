import { SettingsCard } from "./SettingsCard";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function NotificationsTab() {
    return (
        <div className="space-y-6">
            <SettingsCard
                title="Notifications"
                description="Configure when you want to receive notifications."
            >
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="notify-complete" className="text-white/80">
                            Notify on download complete
                        </Label>
                        <Switch id="notify-complete" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                        <Label htmlFor="notify-failed" className="text-white/80">
                            Notify on download failed
                        </Label>
                        <Switch id="notify-failed" defaultChecked />
                    </div>
                </div>
            </SettingsCard>
        </div>
    )
}

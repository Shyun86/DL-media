import { SettingsCard } from "./SettingsCard";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function GeneralTab() {
    return (
        <div className="space-y-6">
            <SettingsCard
                title="Appearance"
                description="Customize the look and feel of the application."
            >
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="theme" className="text-white/80">Theme</Label>
                        <Select defaultValue="dark">
                            <SelectTrigger id="theme" className="w-48 bg-black/30 border-white/10 text-white">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-black/95 border-white/10 text-white">
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="light" disabled>Light</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center justify-between">
                        <Label htmlFor="language" className="text-white/80">Language</Label>
                        <Select defaultValue="en">
                            <SelectTrigger id="language" className="w-48 bg-black/30 border-white/10 text-white">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-black/95 border-white/10 text-white">
                                <SelectItem value="en">English</SelectItem>
                                <SelectItem value="fr" disabled>Français</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </SettingsCard>
        </div>
    )
}

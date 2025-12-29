import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface SettingsCardProps {
    title: string;
    description: string;
    children: React.ReactNode;
}

export function SettingsCard({ title, description, children }: SettingsCardProps) {
    return (
        <Card className="bg-white/5 border-white/10 rounded-2xl">
            <CardHeader>
                <CardTitle className="text-white">{title}</CardTitle>
                <CardDescription className="text-white/55">{description}</CardDescription>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    );
}

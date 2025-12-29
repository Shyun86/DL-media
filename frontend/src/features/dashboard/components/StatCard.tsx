import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  description: string;
  value: string | number;
  valueClassName?: string;
}

export function StatCard({ title, description, value, valueClassName }: StatCardProps) {
  return (
    <Card className="bg-white/5 border-white/10 rounded-2xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-white text-sm font-medium">
          {title}
        </CardTitle>
        <CardDescription className="text-white/45">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className={cn("text-3xl font-semibold text-white", valueClassName)}>{value}</div>
      </CardContent>
    </Card>
  );
}

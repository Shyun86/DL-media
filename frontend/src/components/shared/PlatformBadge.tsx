import { Badge } from "@/components/ui/badge";
import { Platform } from "@/api/types";

interface PlatformBadgeProps {
  platform: Platform;
}

export function PlatformBadge({ platform }: PlatformBadgeProps) {
  return (
    <Badge className="bg-violet-500/20 text-violet-200 border border-violet-500/30">
      {platform}
    </Badge>
  );
}

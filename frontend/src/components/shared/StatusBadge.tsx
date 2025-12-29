import { Badge } from "@/components/ui/badge";
import { JobStatus } from "@/api/types";
import { CheckCircle2, Download, PauseCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatusBadge({ status, className }: { status: JobStatus, className?: string }) {
  const statusStyles: Record<JobStatus, string> = {
    completed: "bg-emerald-500/20 text-emerald-200 border-emerald-500/30",
    downloading: "bg-violet-500/20 text-violet-200 border-violet-500/30",
    queued: "bg-white/10 text-white/70 border-white/10",
    failed: "bg-red-500/15 text-red-200 border-red-500/25",
    paused: "bg-amber-500/20 text-amber-200 border-amber-500/30",
  };

  return (
    <Badge className={cn(statusStyles[status], className)}>
      {status}
    </Badge>
  );
}

export function StatusIcon({ status, className }: { status: JobStatus, className?: string }) {
  const statusIcons: Record<JobStatus, React.ReactNode> = {
      completed: <CheckCircle2 className="h-5 w-5 text-emerald-300" />,
      downloading: <Download className="h-5 w-5 text-violet-300" />,
      queued: <PauseCircle className="h-5 w-5 text-white/60" />,
      failed: <XCircle className="h-5 w-5 text-red-300" />,
      paused: <PauseCircle className="h-5 w-5 text-amber-300" />,
  }
  const IconWrapper = ({ children }: { children: React.ReactNode }) => <div className={className}>{children}</div>;
  
  return <IconWrapper>{statusIcons[status]}</IconWrapper>;
}

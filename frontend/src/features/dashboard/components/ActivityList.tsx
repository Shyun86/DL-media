import { Job } from "@/api/types";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  RefreshCw,
  Ban,
  FileText,
  ExternalLink,
} from "lucide-react";
import { StatusBadge, StatusIcon } from "@/components/shared/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface ActivityListProps {
    jobs: Job[];
}

export function ActivityList({ jobs }: ActivityListProps) {
    return (
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
                                        <span className="text-white/25">·</span>
                                        <span>{new Date(job.createdAt).toLocaleTimeString()}</span>
                                        <span className="text-white/25">·</span>
                                        <span>{job.size ?? "—"}</span>
                                    </div>

                                    {job.status === "downloading" && (
                                        <div className="mt-3 space-y-2">
                                            <Progress value={job.progress ?? 0} className="[&>*]:bg-violet-400" />
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

                            <div className="flex items-center gap-2">
                                {job.status === "downloading" && (
                                    <Button
                                        variant="secondary"
                                        size="icon"
                                        className="bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl"
                                        title="Cancel"
                                    >
                                        <Ban className="h-4 w-4" />
                                    </Button>
                                )}
                                {job.status === "failed" && (
                                    <Button
                                        variant="secondary"
                                        size="icon"
                                        className="bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl"
                                        title="Retry"
                                    >
                                        <RefreshCw className="h-4 w-4" />
                                    </Button>
                                )}
                                <Button
                                    variant="secondary"
                                    size="icon"
                                    className="bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl"
                                    title="View logs"
                                >
                                    <FileText className="h-4 w-4" />
                                </Button>
                                {job.mediaId && (
                                    <Button
                                        variant="secondary"
                                        size="icon"
                                        className="bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl hidden sm:inline-flex"
                                        title="Open"
                                    >
                                        <ExternalLink className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}

import React from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface NotificationFiltersProps {
  onSearchChange: (query: string) => void;
  onFilterChange: (filter: "all" | "unread" | "download" | "failed") => void;
  currentFilter: "all" | "unread" | "download" | "failed";
}

export function NotificationFilters({
  onSearchChange,
  onFilterChange,
  currentFilter,
}: NotificationFiltersProps) {
  const [searchQuery, setSearchQuery] = React.useState("");

  // Debounce search input for better performance
  React.useEffect(() => {
    const handler = setTimeout(() => {
      onSearchChange(searchQuery);
    }, 300); // 300ms debounce

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery, onSearchChange]);

  const filterButtons = [
    { k: "all", label: "All" },
    { k: "unread", label: "Unread" },
    { k: "download", label: "Downloads" },
    { k: "failed", label: "Failed" },
  ] as const;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
      <div className="lg:col-span-2 relative">
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search notifications…"
          className="bg-black/30 border-white/10 text-white placeholder:text-white/35 rounded-xl pl-10"
        />
        <Search className="h-4 w-4 text-white/35 absolute left-3 top-1/4 -translate-y-1/2" />
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 flex items-center justify-between">
        <div>
          <div className="text-sm text-white/80 font-semibold">Filter</div>
          <div className="mt-2 flex items-center gap-2 flex-wrap">
            {filterButtons.map((b) => (
              <button
                key={b.k}
                onClick={() => onFilterChange(b.k)}
                className={cn(
                  "text-xs rounded-full px-3 py-1 border transition",
                  currentFilter === b.k
                    ? "bg-violet-500/15 border-violet-500/40 text-violet-200"
                    : "bg-black/20 border-white/10 text-white/65 hover:text-white hover:border-white/20"
                )}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>
        <Filter className="h-5 w-5 text-violet-200/70" />
      </div>
    </div>
  );
}

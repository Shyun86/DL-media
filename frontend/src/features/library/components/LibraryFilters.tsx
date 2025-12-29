import React from "react";
import { Search, List, LayoutGrid } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LibraryFiltersProps {
  onSearchChange: (query: string) => void;
  onViewChange: (view: "grid" | "list") => void;
  currentView: "grid" | "list";
}

export function LibraryFilters({
  onSearchChange,
  onViewChange,
  currentView,
}: LibraryFiltersProps) {
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
      <div className="lg:col-span-2 relative">
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search folders…"
          className="bg-black/30 border-white/10 text-white placeholder:text-white/35 rounded-xl pl-10"
        />
        <Search className="h-4 w-4 text-white/35 absolute left-3 top-1/2 -translate-y-1/2" />
      </div>

      <div className="flex items-center justify-end gap-2">
        <Button
          variant="secondary"
          className="bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl"
          onClick={() => onViewChange(currentView === "grid" ? "list" : "grid")}
        >
          {currentView === "grid" ? (
            <>
              <List className="h-4 w-4 mr-2" /> List
            </>
          ) : (
            <>
              <LayoutGrid className="h-4 w-4 mr-2" /> Grid
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

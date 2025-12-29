import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, List, LayoutGrid } from "lucide-react";

export function LibraryToolbar() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="relative w-full max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={20} />
        <Input
          type="search"
          placeholder="Search in library..."
          className="pl-10 bg-white/5 border-white/10 focus:border-white/30 rounded-md"
        />
      </div>

      <div className="flex items-center gap-2">
        <Button className="bg-indigo-600 hover:bg-indigo-500 text-white">
          New Folder
        </Button>
        
        <div className="flex items-center rounded-md border border-white/10 p-0.5">
           <Button variant="ghost" size="icon" className="h-8 w-8 text-white/50 hover:bg-white/10 hover:text-white">
                <List size={18} />
           </Button>
           <Button variant="ghost" size="icon" className="h-8 w-8 bg-white/10 text-white hover:bg-white/20">
                <LayoutGrid size={18} />
           </Button>
        </div>
      </div>
    </div>
  );
}

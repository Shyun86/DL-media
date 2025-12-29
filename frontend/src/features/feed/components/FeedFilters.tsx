import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { PlatformKey, PLATFORMS } from "@/api/types";
import { Search, SlidersHorizontal } from "lucide-react";

interface FeedFiltersProps {
  query: string;
  onQueryChange: (query: string) => void;
  selectedPlatforms: PlatformKey[];
  onPlatformChange: (platform: PlatformKey, selected: boolean) => void;
}

const platformOptions = (Object.keys(PLATFORMS) as PlatformKey[]).filter(p => p !== 'youtube');


export function FeedFilters({
  query,
  onQueryChange,
  selectedPlatforms,
  onPlatformChange,
}: FeedFiltersProps) {

  const platformLabel = (k: PlatformKey) => PLATFORMS[k];

  return (
    <>
      {/* Desktop filters */}
      <div className="hidden md:block">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <div className="relative lg:col-span-2">
            <Input
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Search across selected platforms..."
              className="bg-black/30 border-white/10 text-white placeholder:text-white/35 rounded-xl pl-10"
            />
            <Search className="h-4 w-4 text-white/35 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                className="bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl justify-between"
              >
                <span className="inline-flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Platforms
                </span>
                <Badge className="bg-violet-500/20 text-violet-200 border border-violet-500/30">
                  {selectedPlatforms.length}
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-72 bg-black/95 border-white/10 text-white" align="end">
              <DropdownMenuLabel className="text-white/80">
                Select platforms
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/10" />
              {platformOptions.map((k) => (
                <DropdownMenuCheckboxItem
                  key={k}
                  checked={selectedPlatforms.includes(k)}
                  onCheckedChange={(v) => onPlatformChange(k, Boolean(v))}
                >
                  {platformLabel(k)}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="mt-3 flex items-center justify-start gap-3 flex-wrap">
            {selectedPlatforms.map(k => <Badge key={k} className="bg-white/10 text-white/80 border border-white/10">{platformLabel(k)}</Badge>)}
        </div>
      </div>

      {/* Mobile filters */}
      <div className="md:hidden space-y-3">
        <div className="relative">
            <Input
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Search feed..."
              className="bg-black/30 border-white/10 text-white placeholder:text-white/35 rounded-xl pl-10"
            />
            <Search className="h-4 w-4 text-white/35 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
        <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
                {selectedPlatforms.map(k => <Badge key={k} className="bg-white/10 text-white/80 border border-white/10">{platformLabel(k)}</Badge>)}
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        className="bg-violet-600 hover:bg-violet-600/90"
                        size="icon"
                        title="Platforms"
                    >
                        <SlidersHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 bg-black/95 border-white/10 text-white" align="end">
                <DropdownMenuLabel className="text-white/80">
                    Platforms
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                {platformOptions.map((k) => (
                    <DropdownMenuCheckboxItem
                    key={k}
                    checked={selectedPlatforms.includes(k)}
                    onCheckedChange={(v) => onPlatformChange(k, Boolean(v))}
                    >
                    {platformLabel(k)}
                    </DropdownMenuCheckboxItem>
                ))}
                </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
}

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { MediaType, PLATFORMS, PlatformKey } from "@/api/types";

type PlatformFilter = "all" | PlatformKey;
type TypeFilter = "all" | MediaType;

interface HomeFiltersProps {
    query: string;
    onQueryChange: (q: string) => void;
    typeFilter: TypeFilter;
    onTypeFilterChange: (t: TypeFilter) => void;
    platformFilter: PlatformFilter;
    onPlatformFilterChange: (p: PlatformFilter) => void;
}

export function HomeFilters({
    query,
    onQueryChange,
    typeFilter,
    onTypeFilterChange,
    platformFilter,
    onPlatformFilterChange
}: HomeFiltersProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="relative md:col-span-1">
                <Input
                    value={query}
                    onChange={(e) => onQueryChange(e.target.value)}
                    placeholder="Search in your media..."
                    className="bg-black/30 border-white/10 text-white placeholder:text-white/35 rounded-xl pl-10"
                />
                <Search className="h-4 w-4 text-white/35 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
            <Select value={typeFilter} onValueChange={onTypeFilterChange as any}>
                <SelectTrigger className="bg-black/30 border-white/10 text-white rounded-xl">
                    <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent className="bg-black/95 border-white/10 text-white">
                    <SelectItem value="all">All types</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="image">Image</SelectItem>
                    <SelectItem value="audio">Audio</SelectItem>
                </SelectContent>
            </Select>
            <Select value={platformFilter} onValueChange={onPlatformFilterChange as any}>
                <SelectTrigger className="bg-black/30 border-white/10 text-white rounded-xl">
                    <SelectValue placeholder="Platform" />
                </SelectTrigger>
                <SelectContent className="bg-black/95 border-white/10 text-white">
                    <SelectItem value="all">All platforms</SelectItem>
                    {Object.entries(PLATFORMS).map(([key, label]) => (
                        <SelectItem key={key} value={key}>{label}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}

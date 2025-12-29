import {
  Bell,
  Home,
  Library,
  LayoutDashboard,
  Rss,
  Settings,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const mainNavLinks = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    label: "Home",
    icon: Home,
    href: "/home",
  },
  {
    label: "Feed",
    icon: Rss,
    href: "/feed",
  },
  {
    label: "Library",
    icon: Library,
    href: "/library",
  },
];

const secondaryNavLinks = [
    {
        label: "Settings",
        icon: Settings,
        href: "/settings",
    },
    {
        label: "Notifications",
        icon: Bell,
        href: "/notifications",
    }
]

interface SidebarProps {
  isCollapsed: boolean;
  className?: string;
}

export function Sidebar({ isCollapsed, className }: SidebarProps) {
  return (
    <aside
      className={cn(
        "hidden md:flex h-screen flex-col sticky top-0 border-r border-white/10 bg-black/30 backdrop-blur-xl transition-all duration-300 ease-in-out",
        isCollapsed ? "w-20" : "w-72",
        className
      )}
    >
      <div className="flex flex-col w-full h-full">
        <div className="px-5 py-5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-fuchsia-500/60 to-violet-500/40 ring-1 ring-white/10" />
            {!isCollapsed && (
              <div className="leading-tight">
                <div className="text-white font-semibold">MediaFetcher</div>
                <div className="text-xs text-white/50">
                  Monitor downloads & media
                </div>
              </div>
            )}
          </div>
        </div>

        <nav className="px-3 space-y-1">
          {mainNavLinks.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === "/"}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-white/80 hover:text-white hover:bg-white/5 transition",
                  isActive && "bg-white/5 text-white"
                )
              }
            >
              <item.icon className="h-5 w-5" />
              {!isCollapsed && <span className="text-sm">{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto px-3 pb-4">
          <div className="h-px bg-white/10 my-3" />
          {secondaryNavLinks.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-white/80 hover:text-white hover:bg-white/5 transition",
                  isActive && "bg-white/5 text-white"
                )
              }
            >
              <item.icon className="h-5 w-5" />
              {!isCollapsed && <span className="text-sm">{item.label}</span>}
            </NavLink>
          ))}
        </div>
      </div>
    </aside>
  );
}

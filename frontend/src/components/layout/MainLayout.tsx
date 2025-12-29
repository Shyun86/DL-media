import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Home, Rss, Library, Settings, Bell, Menu } from "lucide-react";

// This should be shared, but for now it's duplicated from Sidebar.tsx and extended.
const allNavLinks = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Home", icon: Home, href: "/home" },
  { label: "Feed", icon: Rss, href: "/feed" },
  { label: "Library", icon: Library, href: "/library" },
  { label: "Settings", icon: Settings, href: "/settings" },
  { label: "Notifications", icon: Bell, href: "/notifications" }
];

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="md:hidden text-white hover:bg-white/10" size="icon">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 bg-black/90 border-white/10 text-white">
        <SheetHeader>
          <SheetTitle className="text-white">MediaFetcher</SheetTitle>
        </SheetHeader>
        <div className="mt-4 space-y-1">
          {allNavLinks.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end
              className={({ isActive }) => cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-white/80 hover:text-white hover:bg-white/10 transition",
                isActive && "bg-white/10 text-white"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function MainLayout() {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const outletContext = {
    isSidebarCollapsed,
    setSidebarCollapsed,
  };

  return (
    <div className="min-h-screen flex bg-[radial-gradient(1200px_600px_at_15%_0%,rgba(168,85,247,0.18),transparent_55%),radial-gradient(900px_500px_at_85%_10%,rgba(236,72,153,0.10),transparent_55%),linear-gradient(to_bottom,rgba(0,0,0,0.92),rgba(0,0,0,0.96))] text-white">
      <Sidebar isCollapsed={isSidebarCollapsed} />
      <div className="flex flex-col flex-1 min-w-0">
        <header className="sticky top-0 z-10 h-14 items-center gap-4 border-b border-white/10 bg-black/40 px-4 backdrop-blur-xl md:hidden flex">
          <MobileNav />
          <div className="text-white font-semibold">MediaFetcher</div>
        </header>
        <main className="flex-1 overflow-auto">
          <Outlet context={outletContext} />
        </main>
      </div>
    </div>
  );
}

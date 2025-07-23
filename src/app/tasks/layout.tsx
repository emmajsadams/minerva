"use client";

import { useConvexAuth } from "convex/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import {
  SidebarProvider,
  SidebarInset,
  useSidebar,
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { SoulBubblesIcon } from "@/components/ui/soul-bubbles-icon";

// Responsive header component for mobile navigation
function ResponsiveHeader() {
  const { toggleSidebar } = useSidebar();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Dispatch a custom event with the search term
    window.dispatchEvent(
      new CustomEvent("search-tasks", {
        detail: { searchTerm: e.target.value },
      })
    );
  };

  return (
    <header className="flex md:hidden items-center gap-3 p-4 bg-card/50 backdrop-blur-xl border-b border-border/20">
      {/* Custom Soul Bubbles Icon for Sidebar Trigger */}
      <button
        onClick={toggleSidebar}
        className="flex-shrink-0 p-3 rounded-lg hover:bg-primary/10 transition-all duration-300 group"
        aria-label="Toggle Sidebar"
      >
        <SoulBubblesIcon
          size={28}
          className="group-hover:scale-110 transition-transform duration-300"
        />
      </button>

      {/* Mobile Search Bar */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search tasks..."
          onChange={handleSearchChange}
          className="pl-10 pr-4 py-2 bg-input border border-transparent text-foreground font-medium rounded-lg hover:border-primary/30 focus:border-primary focus:shadow-lg focus:shadow-primary/20 transition-all duration-300"
        />
      </div>
    </header>
  );
}

export default function TasksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Redirecting to login...</div>
      </div>
    );
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen w-full bg-background text-foreground flex">
        <AppSidebar />
        <div className="flex-1 w-full flex flex-col md:hidden">
          <ResponsiveHeader />
          <main className="flex-1 w-full px-0">{children}</main>
        </div>
        <SidebarInset className="hidden md:flex flex-1 w-full flex-col">
          <main className="flex-1 w-full px-4">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

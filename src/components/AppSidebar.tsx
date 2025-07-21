"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LogOut, CheckSquare, Calendar, Settings, Search } from "lucide-react";
import { PlusIcon } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";

const navigation = [
  {
    title: "Tasks",
    url: "/tasks",
    icon: CheckSquare,
    color: "text-blue-400",
    rotation: "-rotate-1",
    shadow: "shadow-blue-400/20",
  },
  {
    title: "Calendar",
    url: "/calendar",
    icon: Calendar,
    color: "text-blue-500",
    rotation: "-rotate-6",
    shadow: "shadow-blue-500/20",
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    color: "text-blue-200",
    rotation: "-rotate-2",
    shadow: "shadow-blue-200/20",
  },
  {
    title: "Sign Out",
    url: "#",
    icon: LogOut,
    color: "text-destructive",
    rotation: "-rotate-3",
    shadow: "shadow-destructive/20",
    onClick: true,
  },
];

export function AppSidebar() {
  const { signOut } = useAuthActions();

  const handleCreateTask = () => {
    // Dispatch a custom event that the tasks page can listen to
    window.dispatchEvent(new CustomEvent("create-task"));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Dispatch a custom event with the search term
    window.dispatchEvent(
      new CustomEvent("search-tasks", {
        detail: { searchTerm: e.target.value },
      })
    );
  };

  return (
    <Sidebar collapsible="none" className="bg-card/50 backdrop-blur-xl">
      <SidebarContent className="bg-transparent">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="mt-8 flex flex-col items-center gap-8">
              {/* Logo as first menu item */}
              <SidebarMenuItem
                className="relative w-full flex justify-center"
                style={{ marginBottom: "2em", marginTop: "2em" }}
              >
                <div className="relative">
                  {/* Main logo container with glass morphism */}
                  <div className="glass-panel px-6 py-4 rounded-xl relative overflow-hidden soul-dive">
                    {/* Background gradient effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-soul-glow/20 rounded-xl"></div>

                    {/* Logo text */}
                    <div className="relative z-10 text-center">
                      <div className="text-2xl font-bold tracking-wider text-shimmer">
                        MINERVA
                      </div>
                    </div>

                    {/* Floating geometric elements */}
                    <div className="absolute top-2 left-2 w-1 h-1 bg-glass-shimmer rounded-full"></div>
                    <div className="absolute bottom-2 right-2 w-1 h-1 bg-soul-glow rounded-full"></div>
                  </div>

                  {/* Shadow element */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl blur-sm opacity-60 transform rotate-1 translate-x-1 translate-y-1 -z-10"></div>
                </div>
              </SidebarMenuItem>

              {/* Search Input */}
              <SidebarMenuItem
                className="relative w-full flex justify-start"
                style={{
                  marginBottom: "2em",
                  paddingLeft: "2rem",
                  paddingRight: "2rem",
                }}
              >
                <div className="relative w-full max-w-xs">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search tasks..."
                    onChange={handleSearchChange}
                    className="!pl-12 pr-4 py-3 bg-input border border-transparent text-foreground font-medium rounded-lg hover:border-primary/30 focus:border-primary focus:shadow-lg focus:shadow-primary/20 transition-all duration-300"
                    style={{ paddingLeft: "2.5rem" }}
                  />
                </div>
              </SidebarMenuItem>

              {/* Create Task Button */}
              <SidebarMenuItem
                className="relative w-full flex justify-center"
                style={{ marginBottom: "2em" }}
              >
                <SidebarMenuButton asChild>
                  <button
                    onClick={handleCreateTask}
                    className="
                      flex items-center gap-6 px-6 py-6 
                      hover:bg-primary/10 rounded-lg 
                      transition-all duration-300 text-lg font-bold
                      transform hover:scale-105 -rotate-2
                      relative z-10 justify-center w-full max-w-xs
                      bg-primary/20
                    "
                  >
                    <PlusIcon className="w-7 h-7 text-primary" />
                    <span
                      className="
                        font-bold tracking-wide text-primary
                        drop-shadow-lg
                      "
                      style={{
                        textShadow: `
                          2px 2px 4px rgba(0, 0, 0, 0.5),
                          0 0 8px var(--primary),
                          0 0 12px var(--secondary)
                        `,
                      }}
                    >
                      NEW TASK
                    </span>
                  </button>
                </SidebarMenuButton>
                {/* Background shadow element */}
                <div
                  className="
                    absolute inset-0 
                    -rotate-2 transform
                    bg-gradient-to-r from-primary/20 to-primary/30
                    rounded-lg blur-sm opacity-60
                    shadow-primary/30
                  "
                  style={{
                    zIndex: -1,
                  }}
                />
              </SidebarMenuItem>

              {/* Navigation menu items */}
              {navigation.map((item, index) => (
                <SidebarMenuItem
                  key={item.title}
                  className="relative w-full flex justify-center"
                  style={{ marginBottom: "2em" }}
                >
                  <SidebarMenuButton asChild={!item.onClick}>
                    {item.onClick ? (
                      <button
                        onClick={() => signOut()}
                        className={`
                          flex items-center gap-6 px-6 py-6 
                          hover:bg-primary/5 rounded-lg 
                          transition-all duration-300 text-lg font-bold
                          ${item.rotation} transform hover:scale-105
                          relative z-10 justify-center w-full max-w-xs
                        `}
                      >
                        <item.icon
                          className={`w-7 h-7 ${item.color}`}
                          style={{
                            transform: `rotate(${-2 - index * 1.5}deg)`,
                          }}
                        />
                        <span
                          className={`
                            font-bold tracking-wide ${item.color}
                            drop-shadow-lg
                          `}
                          style={{
                            textShadow: `
                              2px 2px 4px rgba(0, 0, 0, 0.5),
                              0 0 8px var(--primary),
                              0 0 12px var(--secondary)
                            `,
                          }}
                        >
                          {item.title.toUpperCase()}
                        </span>
                      </button>
                    ) : (
                      <a
                        href={item.url}
                        className={`
                          flex items-center gap-6 px-6 py-6 
                          hover:bg-primary/5 rounded-lg 
                          transition-all duration-300 text-lg font-bold
                          ${item.rotation} transform hover:scale-105
                          relative z-10 justify-center w-full max-w-xs
                        `}
                      >
                        <item.icon
                          className={`w-7 h-7 ${item.color}`}
                          style={{
                            transform: `rotate(${-2 - index * 1.5}deg)`,
                          }}
                        />
                        <span
                          className={`
                            font-bold tracking-wide ${item.color}
                            drop-shadow-lg
                          `}
                          style={{
                            textShadow: `
                              2px 2px 4px rgba(0, 0, 0, 0.5),
                              0 0 8px var(--primary),
                              0 0 12px var(--secondary)
                            `,
                          }}
                        >
                          {item.title.toUpperCase()}
                        </span>
                      </a>
                    )}
                  </SidebarMenuButton>
                  {/* Background shadow element */}
                  <div
                    className={`
                      absolute inset-0 
                      ${item.rotation} transform
                      bg-gradient-to-r from-blue-400/10 to-blue-500/10
                      rounded-lg blur-sm opacity-60
                      ${item.shadow}
                    `}
                    style={{
                      zIndex: -1,
                    }}
                  />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

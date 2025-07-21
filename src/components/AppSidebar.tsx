"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronUp,
  User2,
  LogOut,
  Home,
  CheckSquare,
  Calendar,
  Settings,
} from "lucide-react";

const navigation = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
    color: "text-blue-300",
    rotation: "-rotate-3",
    shadow: "shadow-blue-300/20",
  },
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
];

export function AppSidebar() {
  const { signOut } = useAuthActions();

  return (
    <Sidebar
      collapsible="none"
      className="border-r border-primary/40 bg-card/50 backdrop-blur-xl"
    >
      <SidebarContent className="bg-transparent">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="mt-8 flex flex-col items-center gap-8">
              {/* Logo as first menu item */}
              <SidebarMenuItem
                className="relative w-full flex justify-center"
                style={{ marginBottom: "2em" }}
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

              {/* Navigation menu items */}
              {navigation.map((item, index) => (
                <SidebarMenuItem
                  key={item.title}
                  className="relative w-full flex justify-center"
                  style={{ marginBottom: "2em" }}
                >
                  <SidebarMenuButton asChild>
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

      <SidebarFooter className="border-t border-primary/40 bg-card/30 backdrop-blur-sm">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="w-full justify-between hover:bg-primary/10">
                  <div className="flex items-center gap-2">
                    <User2 className="w-4 h-4" />
                    <span className="font-medium">Account</span>
                  </div>
                  <ChevronUp className="w-4 h-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width] bg-card/90 backdrop-blur-xl border border-primary/40"
              >
                <DropdownMenuItem
                  onClick={() => signOut()}
                  className="flex items-center gap-2 text-foreground/80 hover:text-destructive focus:text-destructive"
                >
                  <LogOut className="w-4 h-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

// src/components/dashboard/sidebar/sidebar.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useThemeStore } from "@/store/theme-store";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  LayoutDashboard,
  BarChart3,
  Users,
  ShoppingBag,
  FileText,
  Settings,
  LogOut,
  LucideIcon,
  Inbox,
  Calendar,
  Palette,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavItemProps {
  icon: LucideIcon;
  title: string;
  href: string;
  isActive?: boolean;
  isCollapsed?: boolean;
  badge?: number;
  onClick?: () => void;
}

// Data navigasi
interface NavItemData {
  title: string;
  href: string;
  icon: LucideIcon;
  badge?: number;
}

const mainNavItems: NavItemData[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Customers",
    href: "/customers",
    icon: Users,
    badge: 8,
  },
  {
    title: "Products",
    href: "/products",
    icon: ShoppingBag,
  },
  {
    title: "Orders",
    href: "/orders",
    icon: FileText,
    badge: 12,
  },
  {
    title: "Messages",
    href: "/messages",
    icon: Inbox,
    badge: 3,
  },
  {
    title: "Calendar",
    href: "/calendar",
    icon: Calendar,
  },
];

const secondaryNavItems: NavItemData[] = [
  {
    title: "Appearance",
    href: "/appearance",
    icon: Palette,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

// Komponen item navigasi
const NavItem = ({
  icon: Icon,
  title,
  href,
  isActive,
  isCollapsed,
  badge,
  onClick,
}: NavItemProps) => {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={href}
            onClick={onClick}
            className={cn(
              "flex items-center gap-x-2 py-2 px-3 rounded-lg text-sm font-medium transition-colors",
              isActive
                ? "bg-primary/10 text-primary hover:bg-primary/15"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
            )}
          >
            <Icon
              className={cn(
                "h-5 w-5 flex-shrink-0",
                isActive ? "text-primary" : "text-slate-500"
              )}
            />
            {!isCollapsed && (
              <>
                <span className="flex-1">{title}</span>
                {badge !== undefined && (
                  <span
                    className={cn(
                      "ml-auto rounded-full px-2 py-0.5 text-xs font-medium",
                      isActive
                        ? "bg-primary/20 text-primary"
                        : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                    )}
                  >
                    {badge}
                  </span>
                )}
              </>
            )}
          </Link>
        </TooltipTrigger>
        {isCollapsed && <TooltipContent side="right">{title}</TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  );
};

// Komponen utama Sidebar
export function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar } = useThemeStore();
  const [isMounted, setIsMounted] = useState(false);

  // Menangani hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex flex-col border-r bg-white transition-all duration-300 dark:bg-slate-950 dark:border-slate-800",
        sidebarCollapsed ? "w-[72px]" : "w-[240px]"
      )}
    >
      <div className="flex h-14 items-center border-b px-3 py-4">
        {!sidebarCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-x-2"
          >
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-primary/80" />
              <span className="text-lg font-bold text-slate-900 dark:text-white">
                Admin
              </span>
            </div>
          </motion.div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className={cn("ml-auto h-8 w-8", sidebarCollapsed && "rotate-180")}
          onClick={toggleSidebar}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </div>

      <ScrollArea className="flex-1 py-4">
        <div className="flex flex-col gap-6 px-3">
          <div className="flex flex-col gap-1">
            {mainNavItems.map((item) => (
              <NavItem
                key={item.href}
                icon={item.icon}
                title={item.title}
                href={item.href}
                isActive={pathname === item.href}
                isCollapsed={sidebarCollapsed}
                badge={item.badge}
              />
            ))}
          </div>

          <div className="px-4">
            <div
              className={cn("h-[1px] w-full bg-slate-200 dark:bg-slate-800")}
            />
          </div>

          <div className="flex flex-col gap-1">
            {secondaryNavItems.map((item) => (
              <NavItem
                key={item.href}
                icon={item.icon}
                title={item.title}
                href={item.href}
                isActive={pathname === item.href}
                isCollapsed={sidebarCollapsed}
              />
            ))}
          </div>
        </div>
      </ScrollArea>

      <div className="mt-auto border-t p-3">
        <div
          className={cn(
            "flex items-center gap-2 py-2 px-3 rounded-lg",
            !sidebarCollapsed && "justify-between"
          )}
        >
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder-avatar.jpg" alt="Avatar" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>

            {!sidebarCollapsed && (
              <div className="flex flex-col truncate">
                <span className="truncate text-sm font-medium">John Doe</span>
                <span className="truncate text-xs text-slate-500">
                  john@example.com
                </span>
              </div>
            )}
          </div>

          {!sidebarCollapsed && (
            <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
              <Link href="/api/auth/signout">
                <LogOut className="h-4 w-4" />
                <span className="sr-only">Log out</span>
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

// src/components/dashboard/header/header.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  Bell,
  Moon,
  Search,
  Sun,
  Menu,
  X,
  User,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { useThemeStore } from "@/store/theme-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Sidebar } from "@/components/dashboard/sidebar/sidebar";
import { cn } from "@/lib/utils";

export function Header() {
  const { theme, setTheme } = useTheme();
  const { toggleSidebar } = useThemeStore();
  const [isMounted, setIsMounted] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Menangani hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Mobile search handler
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center border-b bg-white px-4 dark:bg-slate-950 dark:border-slate-800">
      {/* Mobile sidebar trigger */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <SheetHeader className="p-4 text-left">
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <Sidebar />
        </SheetContent>
      </Sheet>

      {/* Desktop hamburger menu */}
      <Button
        variant="ghost"
        size="icon"
        className="mr-2 hidden md:flex"
        onClick={toggleSidebar}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle Sidebar</span>
      </Button>

      {/* Regular search bar (hidden on mobile) */}
      <div className="hidden md:flex md:w-80 lg:w-96">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full bg-slate-50 pl-9 dark:bg-slate-900"
          />
        </div>
      </div>

      {/* Mobile search button */}
      <Button
        variant="ghost"
        size="icon"
        className="ml-auto md:hidden"
        onClick={toggleSearch}
      >
        {isSearchOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Search className="h-5 w-5" />
        )}
        <span className="sr-only">Toggle Search</span>
      </Button>

      {/* Mobile search bar (expandable) */}
      {isSearchOpen && (
        <div className="absolute inset-x-0 top-14 z-50 border-b bg-white p-4 dark:bg-slate-950 dark:border-slate-800 md:hidden">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full bg-slate-50 pl-9 dark:bg-slate-900"
              autoFocus
            />
          </div>
        </div>
      )}

      <div className="ml-auto flex items-center gap-2">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge
                className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full p-0"
                variant="destructive"
              >
                3
              </Badge>
              <span className="sr-only">Notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className="cursor-pointer p-0"
              >
                <Link href="#" className="flex flex-1 items-start gap-4 p-3">
                  <Avatar className="mt-1 h-9 w-9 flex-shrink-0">
                    <AvatarImage
                      src={notification.avatar || undefined}
                      alt={notification.title}
                    />
                    <AvatarFallback>{notification.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{notification.title}</p>
                    <p className="text-xs text-slate-500">
                      {notification.description}
                    </p>
                    <p className="text-xs text-slate-400">
                      {notification.time}
                    </p>
                  </div>
                </Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              asChild
              className="cursor-pointer justify-center rounded-sm font-medium"
            >
              <Link
                href="/notifications"
                className="w-full text-center"
              >
                View all notifications
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
          <span className="sr-only">Toggle Theme</span>
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative h-8 w-8 rounded-full"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-slate-500">john@example.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <Link href="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Help</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/api/auth/signout" className="w-full cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

// Data notifikasi dummy
const notifications = [
  {
    id: "1",
    title: "New Order",
    description: "You have a new order #12345 for $199.99",
    time: "10 minutes ago",
    avatar: "/avatars/01.png",
    initials: "NO",
  },
  {
    id: "2",
    title: "Account Update",
    description: "Your account has been updated successfully",
    time: "1 hour ago",
    avatar: "/avatars/02.png",
    initials: "AU",
  },
  {
    id: "3",
    title: "New Message",
    description: "Jane Smith sent you a message",
    time: "3 hours ago",
    avatar: "/avatars/03.png",
    initials: "JS",
  },
];

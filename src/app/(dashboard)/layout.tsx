// src/app/(dashboard)/layout.tsx
"use client";

import { useState, useEffect } from "react";
import { useThemeStore } from "@/store/theme-store";
import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/dashboard/sidebar/sidebar";
import { Header } from "@/components/dashboard/header/header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { sidebarCollapsed } = useThemeStore();
  const [isMounted, setIsMounted] = useState(false);

  // Menangani hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Render placeholder untuk menghindari hydration mismatch
    return <div className="min-h-screen bg-slate-50 dark:bg-slate-950"></div>;
  }

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Sidebar - tersembunyi pada mobile, terlihat pada desktop */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <div className="flex w-full flex-col">
        <Header />
        <main
          className={cn(
            "flex-1 px-4 py-6 md:px-6 md:py-8 lg:px-8",
            sidebarCollapsed ? "md:ml-[24px]" : "md:ml-[48px]"
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

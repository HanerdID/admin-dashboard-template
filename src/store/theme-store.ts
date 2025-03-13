// src/store/theme-store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

type ThemeMode = "light" | "dark" | "system";

interface ThemeState {
  mode: ThemeMode;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
  setMode: (mode: ThemeMode) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: "system",
      sidebarCollapsed: false,
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setMode: (mode) => set({ mode }),
    }),
    {
      name: "theme-store",
    }
  )
);

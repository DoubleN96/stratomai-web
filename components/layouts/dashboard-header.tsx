"use client";

import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileSidebar } from "./mobile-sidebar";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/95 dark:bg-zinc-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-zinc-900/60">
      <div className="flex h-16 items-center gap-4 px-4 md:px-6">
        {/* Mobile Menu */}
        <MobileSidebar />

        {/* Search */}
        <div className="flex-1 flex items-center gap-2 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500 dark:text-zinc-400" />
            <input
              type="search"
              placeholder="Buscar..."
              className="w-full h-9 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-transparent pl-9 pr-3 text-sm outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
              aria-label="Buscar"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            aria-label="Notificaciones"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-600" />
          </Button>
        </div>
      </div>
    </header>
  );
}

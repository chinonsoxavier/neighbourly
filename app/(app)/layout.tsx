"use client";

import { Sidebar } from "@/components/shared/sidebar";
import { Header } from "@/components/shared/header";
import { MobileNav } from "@/components/shared/mobile-nav";
import { RightPanel } from "@/components/shared/right-panel";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />

        <div className="flex flex-1 overflow-hidden">
          {/* Page content */}
          <div className="flex-1 overflow-y-auto pb-20 lg:pb-6">
            <div className="mx-auto max-w-4xl px-4 lg:px-8 py-6">
              {children}
            </div>
          </div>

          {/* Right panel (desktop) */}
          <RightPanel className="border-l border-border bg-card/50 px-4 py-6 overflow-y-auto hidden xl:block" />
        </div>
      </div>

      {/* Mobile bottom nav */}
      <MobileNav />
    </div>
  );
}

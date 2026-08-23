"use client";

import { Sidebar } from "@/components/shared/sidebar";
import { Header } from "@/components/shared/header";
import { MobileNav } from "@/components/shared/mobile-nav";
import { RightPanel } from "@/components/shared/right-panel";
import { AppModals } from "@/components/modals";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
     <html lang="en" className={`${jakarta.variable} h-full antialiased scroll-smooth`}>
      <body className="min-h-full flex flex-col font-sans bg-[#FBF8F2] text-[#1F1F24]">
       
    <div className="flex h-screen overflow-hidden bg-[radial-gradient(circle_at_20%_0%,#fbf2ff_0,transparent_30%),#faf6fd] dark:bg-[#1a1220]">
      {/* Global Application Modals */}
      <AppModals />

      {/* Persistent Left Sidebar */}
      <Sidebar />

      {/* Main Content Shell */}
      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        <Header />

        <div className="flex flex-1 overflow-hidden">
          {/* Scrollable Center Page Content */}
          <main className="flex-1 overflow-y-auto pb-24 lg:pb-8 min-w-0">
            <div className="mx-aut w-full ax-w-4xl px-4 py-5 lg:px-6 lg:py-6">
              {children}
            </div>
          </main>

          {/* Persistent Right Panel on Wide Desktops */}
          <RightPanel className="border-l border-border/80 bg-card/40 px-4 py-5 overflow-y-auto hidden xl:block" />
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav />
    </div>
    </body>
    </html>
  );
}

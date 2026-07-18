import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import { QueryProvider } from "@/providers/query-provider";
import { OfflineBanner } from "@/components/shared/offline-banner";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Neighborly — Your Neighborhood, Stronger Together",
    template: "%s | Neighborly",
  },
  description:
    "Report incidents, connect with neighbors, and build the community you deserve. The civic platform that turns passive residents into active community builders.",
  keywords: [
    "community",
    "neighborhood",
    "civic",
    "incidents",
    "safety",
    "local",
    "reports",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Neighborly",
    title: "Neighborly — Your Neighborhood, Stronger Together",
    description:
      "Report incidents, connect with neighbors, and build the community you deserve.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Neighborly — Your Neighborhood, Stronger Together",
    description:
      "Report incidents, connect with neighbors, and build the community you deserve.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans">
        <ThemeProvider>
          <QueryProvider>
            <OfflineBanner />
            <main className="flex-1 flex flex-col">{children}</main>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

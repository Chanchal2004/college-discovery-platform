import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { CompareProvider } from "@/lib/compare-context";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "CollegeFinder — Discover Your Perfect College",
  description: "Compare colleges, explore courses, check placements, and make informed decisions about your education.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen">
        <AuthProvider>
          <CompareProvider>
            <Navbar />
            <main className="pt-16">
              {children}
            </main>
          </CompareProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

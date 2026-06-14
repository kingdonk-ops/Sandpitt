import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { SideNav } from "@/components/SideNav";

export const metadata: Metadata = {
  title: {
    default: "Sandpitt Admin",
    template: "%s | Sandpitt Admin",
  },
  description: "Sandpitt Inspection Management System — Admin Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="flex h-screen overflow-hidden">
            <SideNav />
            <main className="flex-1 overflow-y-auto bg-gray-50">
              <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {children}
              </div>
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}

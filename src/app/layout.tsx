import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Dualr - Enhance your algorithmic skills",
  description: "Dualr is a place to enchance your algorithmic skills.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en" className="h-full">
      <body
        className={
          "font-satoshi relative h-full bg-dark-3 text-white antialiased"
        }
      >
        <main className="min-h-scren relative flex flex-col">
          <SessionProvider session={session}>
            <Provider>
              <div className="flex-1 flex-grow">
                {children}
                <Toaster richColors />
              </div>
            </Provider>
          </SessionProvider>
        </main>
      </body>
    </html>
  );
}

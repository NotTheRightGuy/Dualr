import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dualr - Enhance your algorithmic skills",
  description: "Dualr is a place to enchance your algorithmic skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider>
      <html lang="en">
        <body className={inter.className + " bg-dark-3 text-light-1"}>
          {children}
          <Toaster richColors />
        </body>
      </html>
    </Provider>
  );
}

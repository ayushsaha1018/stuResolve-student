import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/providers";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { ToasterProvider } from "@/providers/toast-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StuResolve",
  description: "StuResolve",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Providers>
          <ToasterProvider />
          <EdgeStoreProvider>{children}</EdgeStoreProvider>
        </Providers>
      </body>
    </html>
  );
}

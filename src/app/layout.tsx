import type { Metadata } from "next";
import { Roboto, Nunito } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/providers";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { ToasterProvider } from "@/providers/toast-provider";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

const nunito = Nunito({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-nunito",
});

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
      <body className={`${nunito.className}`}>
        <Providers>
          <ToasterProvider />
          <EdgeStoreProvider>{children}</EdgeStoreProvider>
        </Providers>
      </body>
    </html>
  );
}

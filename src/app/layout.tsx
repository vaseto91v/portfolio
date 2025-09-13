import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Vasil Vasilev — CV",
  description: "Senior Web Developer CV",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen">
        <a
          href="#projects"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 kbd"
        >
          Skip to projects
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

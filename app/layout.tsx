import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ember Northwest",
  description: "A Washington-rooted cannabis brand family focused on clean shelves, clear support, and dependable retail execution.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

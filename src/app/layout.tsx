import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Saffron Match Demo",
  description: "A clickable cross-cultural dating app concept.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

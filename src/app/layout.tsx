import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CYBERFORGE — Кастомные игровые и рабочие ПК",
  description: "Профессиональная сборка игровых и рабочих компьютеров на заказ. Индивидуальный подход, премиальные комплектующие, гарантия до 5 лет.",
  keywords: ["игровой ПК", "компьютер на заказ", "сборка ПК", "геймерский ПК", "рабочая станция", "RTX", "NVIDIA", "AMD"],
  authors: [{ name: "CYBERFORGE" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "CYBERFORGE — Кастомные ПК",
    description: "Создай машину своей мечты. Профессиональная сборка ПК.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0a] text-white min-h-screen`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

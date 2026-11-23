import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ClientLayoutShell } from "@/components/layout/ClientLayoutShell";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Everest Steel Furniture Udyog (Est. 2039 BS, Birgunj) — Nepal's Premier Steel Manufacturer",
  description:
    "Direct factory ordering for Nepal's benchmark steel wardrobes (Sansaar, Janki, Radha Krishna, Ladies Gents), heavy filing cabinets, executive office desks, and high-security tijori safes. 40+ years heritage, 7-tank hot phosphate anti-rust treatment, and 5-year warranty.",
  keywords: [
    "Everest Steel Furniture Udyog",
    "Birgunj steel almirah",
    "Sansaar Model almirah",
    "Nepal steel furniture",
    "Tijori safe Nepal",
    "Office filing cabinet Birgunj",
    "Janki bridal almirah",
    "Tata steel CRCA almirah"
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${inter.variable} ${jetbrainsMono.variable} dark antialiased`}
    >
      <body className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-amber-600 selection:text-white">
        <ClientLayoutShell>{children}</ClientLayoutShell>
      </body>
    </html>
  );
}

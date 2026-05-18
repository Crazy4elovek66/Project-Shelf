import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Inter, Space_Grotesk } from "next/font/google";
import { BackgroundPortrait } from "@/components/BackgroundPortrait";
import { Toast } from "@/components/Toast";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://project-shelf-beta.vercel.app"),
  title: "Project Shelf | Портфолио",
  description: "Личный хаб практических IT-проектов: боты, веб-сервисы, автоматизации.",
  keywords: [
    "портфолио разработчика",
    "IT-проекты",
    "пет-проекты",
    "Telegram-боты",
    "веб-сервисы",
    "автоматизация",
    "Next.js",
    "React",
    "TypeScript",
    "AI-инструменты",
  ],
  openGraph: {
    title: "Project Shelf | Портфолио",
    description: "Личный хаб практических IT-проектов: боты, веб-сервисы, автоматизации.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <BackgroundPortrait />
        <div className="relative z-[2]">{children}</div>
        <Toast />
        <Analytics />
      </body>
    </html>
  );
}

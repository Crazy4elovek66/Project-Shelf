import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Toast } from "@/components/Toast";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#050507",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://project-shelf-beta.vercel.app"),
  title: "idleON | Full-Stack AI Developer & Systems Engineer",
  description:
    "Портфолио Full-Stack AI разработчика (idleON / Илья): мультиагентные системы, отказоустойчивые LLM-роутеры, Telegram Mini Apps, компьютерное зрение и высоконагруженные веб-сервисы.",
  keywords: [
    "Full-Stack AI Developer",
    "AI Systems Engineer",
    "LLM Routing",
    "Multi-Agent Systems",
    "Telegram Mini Apps",
    "Telegram Bot",
    "Computer Vision",
    "OpenCV",
    "Next.js 15",
    "React 19",
    "TypeScript",
    "Python",
    "FastAPI",
    "Supabase",
    "Портфолио AI разработчика",
    "idleON",
  ],
  authors: [{ name: "idleON (Илья)", url: "https://github.com/Crazy4elovek66" }],
  creator: "idleON",
  openGraph: {
    title: "idleON | Full-Stack AI Developer & Systems Engineer",
    description:
      "Флагманские решения на стыке LLM-оркестрации, Computer Vision, Telegram Mini Apps и кинетического веб-интерфейса.",
    type: "website",
    locale: "ru_RU",
    url: "https://project-shelf-beta.vercel.app",
    siteName: "idleON // Project Shelf",
  },
  twitter: {
    card: "summary_large_image",
    title: "idleON | Full-Stack AI Developer",
    description:
      "Мультиагентные системы, Telegram Mini Apps, Computer Vision и Next.js веб-сервисы.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable} bg-[#050507] text-[#eef3ff] font-sans antialiased selection:bg-[#38bdf8]/30 selection:text-white`}
      >
        <div className="relative min-h-screen overflow-x-hidden">
          {children}
        </div>
        <Toast />
        <Analytics />
      </body>
    </html>
  );
}

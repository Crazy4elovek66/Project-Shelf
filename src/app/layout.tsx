import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { JetBrains_Mono, Space_Grotesk, Silkscreen } from "next/font/google";
import { Toast } from "@/components/Toast";
import { LanguageModeProvider } from "@/context/LanguageModeContext";
import "./globals.css";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-mono",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const silkscreen = Silkscreen({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pixel",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://project-shelf-beta.vercel.app"),
  title: "idleON // Full-Stack AI Developer & Systems Engineer",
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
    title: "idleON // Full-Stack AI Developer & Systems Engineer",
    description:
      "Флагманские решения на стыке LLM-оркестрации, Computer Vision, Telegram Mini Apps и веб-интерфейсов.",
    type: "website",
    locale: "ru_RU",
    url: "https://project-shelf-beta.vercel.app",
    siteName: "idleON // Project Shelf",
  },
  twitter: {
    card: "summary_large_image",
    title: "idleON // Full-Stack AI Developer",
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
    <html lang="ru" className="scroll-smooth dark">
      <body
        className={`${jetBrainsMono.variable} ${spaceGrotesk.variable} ${silkscreen.variable} bg-[#050505] text-[#FAFAFA] font-mono antialiased selection:bg-white selection:text-black`}
      >
        <LanguageModeProvider>
          <div className="relative min-h-screen overflow-x-hidden">
            {children}
          </div>
          <Toast />
          <Analytics />
        </LanguageModeProvider>
      </body>
    </html>
  );
}

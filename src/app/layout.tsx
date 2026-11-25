import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { JetBrains_Mono, Space_Grotesk, Silkscreen } from "next/font/google";
import { Toast } from "@/components/Toast";
import { MotionProvider } from "@/components/MotionProvider";
import { LanguageModeProvider } from "@/context/LanguageModeContext";
import { KworkModeProvider } from "@/context/KworkModeContext";
import "./globals.css";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
  adjustFontFallback: true,
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
  adjustFontFallback: true,
});

const silkscreen = Silkscreen({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pixel",
  display: "swap",
  preload: false,
  adjustFontFallback: true,
});

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://idleon.pro"),
  alternates: {
    canonical: "https://idleon.pro",
  },
  title: "idleON // Full-Stack AI Developer - Боты, сайты и AI-автоматизация",
  description:
    "Портфолио Full-Stack AI разработчика (idleON / Илья): умные Telegram-боты, Mini Apps, AI-ассистенты и современные веб-приложения под ключ для автоматизации бизнеса.",
  keywords: [
    "Full-Stack AI Developer",
    "AI разработчик",
    "Telegram бот под ключ",
    "Telegram Mini Apps",
    "Автоматизация бизнеса",
    "AI ассистент",
    "Next.js",
    "React",
    "TypeScript",
    "Python",
    "Supabase",
    "idleON",
  ],
  authors: [{ name: "idleON (Илья)", url: "https://github.com/Crazy4elovek66" }],
  creator: "idleON",
  openGraph: {
    title: "idleON // Full-Stack AI Developer - Боты, сайты и AI-автоматизация",
    description:
      "Создаю умных ботов, сайты и веб-приложения с нейросетью, которые автоматизируют рутину, экономят время и помогают бизнесу расти.",
    type: "website",
    locale: "ru_RU",
    url: "https://idleon.pro",
    siteName: "idleON // idleon.pro",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "idleON // Full-Stack AI Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "idleON // Full-Stack AI Developer",
    description:
      "Умные Telegram-боты, Mini Apps, AI-ассистенты и веб-приложения под ключ для бизнеса.",
    images: ["/twitter-image"],
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
        <KworkModeProvider>
          <LanguageModeProvider>
            <MotionProvider>
              <div className="relative min-h-[100dvh] overflow-x-clip">
                {children}
              </div>
              <Toast />
            </MotionProvider>
            <Analytics />
          </LanguageModeProvider>
        </KworkModeProvider>
      </body>
    </html>
  );
}

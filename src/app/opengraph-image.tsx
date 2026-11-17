import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "idleON // Full-Stack AI Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#050505",
          padding: "56px 64px",
          fontFamily: "monospace",
          border: "1px solid rgba(255, 255, 255, 0.16)",
          boxSizing: "border-box",
        }}
      >
        {/* Top HUD Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
            paddingBottom: "22px",
            color: "#A1A1AA",
            fontSize: 20,
            letterSpacing: "0.06em",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <span style={{ color: "#FAFAFA", fontWeight: 700 }}>[SYS // IDLEON.PRO]</span>
            <span style={{ color: "rgba(255, 255, 255, 0.3)" }}>/</span>
            <span>VOLGOGRAD -&gt; REMOTE</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              borderRadius: "6px",
              border: "1px solid rgba(255, 255, 255, 0.22)",
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              color: "#FAFAFA",
              fontSize: 15,
              fontWeight: 700,
            }}
          >
            _ ДОСТУПЕН ДЛЯ ПРОЕКТОВ
          </div>
        </div>

        {/* Center: Hero Typography */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span
              style={{
                fontSize: 24,
                color: "#71717A",
                fontWeight: 700,
                letterSpacing: "0.1em",
              }}
            >
              idleON //
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              color: "#FAFAFA",
              fontSize: 72,
              fontWeight: 900,
              letterSpacing: "-0.03em",
              lineHeight: 1.04,
              textTransform: "uppercase",
            }}
          >
            <span>FULL-STACK</span>
            <span>AI DEVELOPER</span>
          </div>
          <div
            style={{
              color: "#A1A1AA",
              fontSize: 24,
              lineHeight: 1.45,
              maxWidth: "1000px",
            }}
          >
            Умные Telegram-боты, Mini Apps, AI-ассистенты и веб-приложения под ключ
          </div>
        </div>

        {/* Bottom Bar: Stack & Projects Count */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255, 255, 255, 0.12)",
            paddingTop: "22px",
            color: "#71717A",
            fontSize: 18,
            letterSpacing: "0.04em",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px", color: "#FAFAFA", fontWeight: 700 }}>
            <span>8 ПРОЕКТОВ</span>
            <span style={{ color: "rgba(255, 255, 255, 0.3)" }}>{"//"}</span>
            <span style={{ color: "#D4D4D8", fontWeight: 400 }}>NEXT.JS / PYTHON / TELEGRAM / AI</span>
          </div>
          <div style={{ color: "#A1A1AA" }}>
            https://idleon.pro
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

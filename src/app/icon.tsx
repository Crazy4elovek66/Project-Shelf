import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#050507",
          borderRadius: "16px",
          border: "2px solid rgba(255, 255, 255, 0.4)",
          padding: "8px",
        }}
      >
        <svg
          width="44"
          height="44"
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Greater-than symbol > on top left */}
          <path
            d="M8 13L16 19L8 25"
            stroke="#FAFAFA"
            strokeWidth="3.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Diagonal Slash / across center */}
          <path
            d="M30 8L16 36"
            stroke="#FAFAFA"
            strokeWidth="3.6"
            strokeLinecap="round"
          />
          {/* Terminal Underscore _ on bottom right */}
          <path
            d="M26 36H36"
            stroke="#FAFAFA"
            strokeWidth="3.6"
            strokeLinecap="round"
          />
        </svg>
      </div>
    ),
    size,
  );
}

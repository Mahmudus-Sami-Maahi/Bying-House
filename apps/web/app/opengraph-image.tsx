import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — Garments Buying House in Bangladesh`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "radial-gradient(circle at 85% 15%, #3a2e1c 0%, #0c1015 55%)",
          color: "white",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <svg width="84" height="84" viewBox="0 0 100 100">
            <g fill="none" stroke="#d2b07a" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="50" cy="50" r="44" />
              <path d="M23 54V29l9.5 14L42 29v25M58 54V29l9.5 14L77 29v25M43 80V60h15M43 70h11" />
            </g>
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 40, fontWeight: 700, fontFamily: "sans-serif" }}>MetaMax</span>
            <span style={{ fontSize: 18, letterSpacing: 10, color: "#d2b07a", fontFamily: "sans-serif" }}>FASHIONS</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 78, lineHeight: 1.02, maxWidth: 980 }}>Crafting apparel for the world&apos;s leading brands.</div>
          <div style={{ fontSize: 26, color: "#d2b07a", fontFamily: "sans-serif" }}>
            Apparel sourcing · Product development · Quality assurance · Dhaka, Bangladesh
          </div>
        </div>
      </div>
    ),
    size,
  );
}

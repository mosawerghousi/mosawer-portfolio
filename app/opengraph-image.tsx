import { ImageResponse } from "next/og";
import { profile, projects } from "@/lib/data";

export const alt = "Mosawer Ghousi — Creative Full-Stack Developer";
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
          background: "#06080a",
          backgroundImage:
            "radial-gradient(70% 60% at 78% 8%, #1b4468 0%, transparent 60%), radial-gradient(60% 55% at 8% 92%, #0e3535 0%, transparent 62%)",
          padding: "64px 72px",
          color: "#f4f4ef",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 8, height: 8, borderRadius: 9999, background: "#2fe6c3" }} />
          <div style={{ fontSize: 20, letterSpacing: 4, color: "rgba(244,244,239,0.6)" }}>
            {profile.shortName}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, fontWeight: 600, letterSpacing: -3, lineHeight: 1 }}>
            Creative
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 28 }}>
            <div style={{ fontSize: 96, fontWeight: 600, letterSpacing: -3, lineHeight: 1.05 }}>
              developer
            </div>
            <div style={{ fontSize: 46, color: "#f2a312", fontStyle: "italic" }}>full-stack</div>
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 25,
              color: "rgba(244,244,239,0.62)",
              maxWidth: 900,
              lineHeight: 1.4,
            }}
          >
            {profile.pitch}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 56,
            fontSize: 17,
            letterSpacing: 2,
            color: "rgba(244,244,239,0.5)",
          }}
        >
          <div style={{ display: "flex" }}>{projects.length} BUILDS SHIPPED</div>
          <div style={{ display: "flex" }}>ERP · SAAS · MOBILE</div>
          <div style={{ display: "flex" }}>KABUL, AFGHANISTAN</div>
        </div>
      </div>
    ),
    size
  );
}

import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#183247",
          color: "#F7F5EF",
          padding: "72px",
        }}
      >
        <div style={{ fontSize: 28, color: "#D6A23D", letterSpacing: "0.16em" }}>
          LAND DEVELOPMENT
        </div>
        <div style={{ fontSize: 64, fontWeight: 700, marginTop: 18, lineHeight: 1.1 }}>
          {site.name}
        </div>
        <div style={{ fontSize: 28, marginTop: 24, maxWidth: 820, color: "#F7F5EF" }}>
          Acquisition, approvals, permitting, and construction management
        </div>
      </div>
    ),
    size,
  );
}

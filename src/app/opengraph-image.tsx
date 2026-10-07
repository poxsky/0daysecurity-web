import { ImageResponse } from "next/og";
import { services } from "@/lib/services";
import { siteConfig } from "@/lib/site-config";

export const alt = `${siteConfig.name} — ${siteConfig.slogan}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  const [first, second] = siteConfig.heroTitle;
  const split = second.lastIndexOf(" ");
  const headline = { display: "flex", fontSize: 96, fontWeight: 800, lineHeight: 1, letterSpacing: -4 } as const;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          color: "#fff",
          backgroundColor: "#000",
          backgroundImage:
            "radial-gradient(circle at 78% 30%, rgba(192, 0, 240, 0.55) 0%, rgba(80, 10, 100, 0.25) 30%, rgba(0, 0, 0, 0) 62%)",
        }}
      >
        <div style={{ display: "flex", fontSize: 38, fontWeight: 700, letterSpacing: -1 }}>{siteConfig.name}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={headline}>{first.toUpperCase()}</div>
          <div style={{ ...headline, marginTop: 8 }}>
            <span>{second.slice(0, split).toUpperCase()}</span>
            <span style={{ marginLeft: 26, color: "#de5cff" }}>{second.slice(split + 1).toUpperCase()}</span>
          </div>
          <div style={{ display: "flex", marginTop: 30, fontSize: 38, color: "#a8a8a8" }}>
            {`> ${siteConfig.heroPhrases[0]}`}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#de5cff" }}>
          {services.map((service) => service.tag).join(" · ")}
        </div>
      </div>
    ),
    size,
  );
}

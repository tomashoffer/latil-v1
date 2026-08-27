import type { Metadata } from "next";
import "../latil.css";

export const metadata: Metadata = {
  title: "Latil.io",
  description: "Latil.io — AI technology and integration partner",
  icons: [{ rel: "icon", url: "/favicon.svg", type: "image/svg+xml" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body style={{ margin: 0, background: "#0A0B10" }}>{children}</body>
    </html>
  );
}

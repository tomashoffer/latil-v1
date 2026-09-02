import type { CSSProperties } from "react";

export const C = {
  bg: "#0A0B10",
  bgAlt: "#0E1017",
  panel: "#101219",
  frame: "#14161F",
  line: "rgba(237,238,242,0.10)",
  lineStrong: "rgba(237,238,242,0.14)",
  text: "#EDEEF2",
  text2: "#C3C7D4",
  text3: "#AFB4C4",
  muted: "#7B8092",
  mono: "#6C7284",
  faint: "#7B8092",
  accent: "#7C3AED",
  accentLight: "#A78BFA",
  wait: "#8B90A2",
} as const;

export const MONO = "'JetBrains Mono', ui-monospace, monospace";
export const SANS = "Archivo, Helvetica, sans-serif";

export const monoLabel = (size = 13, color: string = C.mono): CSSProperties => ({
  fontFamily: MONO,
  fontSize: size,
  letterSpacing: "0.14em",
  color,
  textTransform: "uppercase",
});

export const CONTACT_EMAIL = "contact@latil.com";
export const LINKEDIN_COMPANY = "https://www.linkedin.com/company/latil-io/";

/** Google Calendar appointment schedule. In the repo this already lives in lib/config.ts
    as CALENDLY_URL — import from there instead of duplicating it. */
export const CALENDAR_URL = "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0s9z6VgNcPx-59RLidlOEClTWPqUsAuM_C4lzFuYdZBcoXtn9s_j8eztzTEW1NCArVUwfxZGNl";


/** Logo boxes sized per aspect ratio so every mark reads at the same optical weight.
    /public/partners must hold the TRIMMED files shipped in this package. */
export const PARTNERS = [
  { name: "AWS Partner Network", logo: "/partners/aws.png", w: 108, h: 30 },
  { name: "Malbec Ventures", logo: "/partners/malbec.png", w: 32, h: 46 },
  { name: "Mejía.co", logo: "/partners/mejia.png", w: 66, h: 43 },
  { name: "Newcrux", logo: "/partners/newcrux.png", w: 148, h: 17 },
  { name: "DirMOD", logo: "/partners/dirmod.png", w: 128, h: 25 },
];

/** Names, photos and contacts are language-independent; roles and bios live in copy.ts. */
export const TEAM_PROFILES = [
  { name: "Alejandro Stivelman", photo: "/team/ale.jpeg", email: "alejandro@latil.io", linkedin: "https://www.linkedin.com/in/alejandro-stivelman/" },
  { name: "Tomas Hoffer", photo: "/team/tomas.jpg", email: "tomas@latil.io", linkedin: "https://www.linkedin.com/in/tomashoffer/" },
  { name: "Nicolas Surijón", photo: "/team/nico.jpeg", email: "nicolas@latil.io", linkedin: "https://www.linkedin.com/in/nsurijon/" },
  { name: "Betzalel Kenigsztein", photo: "/team/betzalel.png", email: "contact@latil.io", linkedin: "https://www.linkedin.com/in/betzalel-kenigsztein/" },
  { name: "Karen Schlaien", photo: "/team/karen.jpg", email: "karen@latil.io", linkedin: "https://www.linkedin.com/in/karenschlaien/" },
];

/** [lon, lat] of the delivery hubs drawn on the hero map. */
export const HUBS: Record<string, [number, number]> = {
  ba: [-58.4, -34.6],
  sp: [-46.6, -23.5],
  mx: [-99.1, 19.4],
  mad: [-3.7, 40.4],
  fra: [8.7, 50.1],
  dxb: [55.3, 25.2],
};

export const LINKS: Array<[string, string]> = [
  ["ba", "mad"],
  ["sp", "fra"],
  ["mx", "mad"],
  ["ba", "sp"],
  ["mad", "dxb"],
];

export type NavTarget = { kind: "flag" | "rest"; i: number };

/** Same order as COPY[lang].menu: which row each mega-menu entry points at. */
export const MENU_TARGETS: NavTarget[][] = [
  [{ kind: "flag", i: 0 }, { kind: "rest", i: 0 }],
  [{ kind: "flag", i: 1 }, { kind: "flag", i: 2 }, { kind: "rest", i: 3 }],
  [{ kind: "flag", i: 3 }, { kind: "rest", i: 1 }, { kind: "rest", i: 2 }, { kind: "rest", i: 4 }],
];

/** Scrolls a row clear of the floating header. */
export function scrollToId(id: string) {
  window.setTimeout(() => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 110, behavior: "smooth" });
  }, 60);
}

export const FLAGSHIP_NUMS = ["01", "02", "03", "04"];
export const REST_NUMS = ["05", "06", "07", "08", "09"];

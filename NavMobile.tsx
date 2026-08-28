"use client";

import { useState } from "react";
import { C, CALENDAR_URL, MENU_TARGETS, MONO, NavTarget, scrollToId } from "./data";
import type { Copy, Lang } from "./copy";

export default function NavMobile({
  t,
  lang,
  setLang,
  onNavigate,
  ctaHref = CALENDAR_URL,
}: {
  t: Copy;
  lang: Lang;
  setLang: (l: Lang) => void;
  onNavigate: (target: NavTarget) => void;
  ctaHref?: string;
}) {
  const [open, setOpen] = useState(false);

  const groups = t.menu.map((g, gi) => ({ ...g, targets: MENU_TARGETS[gi] }));

  const select = (target: NavTarget) => {
    setOpen(false);
    onNavigate(target);
  };

  const jump = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <div data-nav-mobile style={{ display: "none" }}>
      <div
        style={{
          position: "fixed",
          top: 12,
          left: 12,
          right: 12,
          zIndex: 60,
          display: "grid",
          gridTemplateColumns: "auto 1fr auto",
          alignItems: "center",
          gap: 10,
          padding: "10px 12px",
          borderRadius: 18,
          background: "rgba(14,16,23,0.9)",
          border: `1px solid ${C.line}`,
          backdropFilter: "blur(18px)",
        }}
      >
        <a href="#top" aria-label="Ir arriba" style={{ display: "flex", alignItems: "center" }}>
          <img src="/logos/latil-wordmark-gradient.png" alt="Latil.io" style={{ height: 25, width: "auto", display: "block" }} />
        </a>

        <a
          href={ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className="lt-btn-primary"
          style={{
            justifySelf: "center",
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px 18px",
            borderRadius: 10,
            background: C.accent,
            color: "#FFFFFF",
            fontSize: 13,
            fontWeight: 600,
            lineHeight: 1.2,
            whiteSpace: "nowrap",
          }}
        >
          {t.nav.cta}
        </a>

        <button
          type="button"
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            border: `1px solid ${C.lineStrong}`,
            background: "rgba(255,255,255,0.02)",
            cursor: "pointer",
            display: "grid",
            placeItems: "center",
            padding: 0,
          }}
        >
          <span aria-hidden="true" style={{ position: "relative", width: 16, height: 14, display: "block" }}>
            <span
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: open ? 6 : 0,
                height: 2,
                borderRadius: 999,
                background: C.text,
                transform: open ? "rotate(45deg)" : "none",
                transition: "all 180ms ease",
              }}
            />
            <span
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 6,
                height: 2,
                borderRadius: 999,
                background: C.text,
                opacity: open ? 0 : 1,
                transition: "opacity 180ms ease",
              }}
            />
            <span
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: open ? 6 : 12,
                height: 2,
                borderRadius: 999,
                background: C.text,
                transform: open ? "rotate(-45deg)" : "none",
                transition: "all 180ms ease",
              }}
            />
          </span>
        </button>
      </div>

      {open && (
        <div
          style={{
            position: "fixed",
            top: 78,
            left: 12,
            right: 12,
            zIndex: 55,
            background: "rgba(14,16,23,0.96)",
            border: `1px solid ${C.line}`,
            borderRadius: 18,
            backdropFilter: "blur(18px)",
            padding: "14px 12px 12px",
            boxShadow: "0 18px 42px rgba(0,0,0,0.2)",
          }}
        >
          <div style={{ display: "grid", gap: 12 }}>
            {groups.map((g) => (
              <div key={g.label} style={{ display: "grid", gap: 8 }}>
                <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.12em", color: C.muted, textTransform: "uppercase" }}>
                  {g.label}
                </span>

                <div style={{ display: "grid", gap: 6 }}>
                  {g.items.map((s, si) => (
                    <a
                      key={s.name}
                      onClick={() => select(g.targets[si])}
                      style={{ padding: "8px 0", color: C.text, cursor: "pointer", fontSize: 15, lineHeight: 1.3 }}
                    >
                      {s.name}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gap: 8, paddingTop: 14, marginTop: 12, borderTop: `1px solid ${C.line}` }}>
            <a onClick={() => jump("team")} style={{ padding: "8px 0", color: C.text, cursor: "pointer", fontSize: 15 }}>
              {t.nav.about}
            </a>
            <a onClick={() => jump("contact")} style={{ padding: "8px 0", color: C.text, cursor: "pointer", fontSize: 15 }}>
              {t.nav.contact}
            </a>
            <div style={{ display: "flex", alignItems: "center", gap: 8, paddingTop: 8 }}>
              {(["es", "en"] as Lang[]).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l)}
                  style={{
                    cursor: "pointer",
                    background: "none",
                    border: `1px solid ${lang === l ? C.accentLight : C.lineStrong}`,
                    color: lang === l ? C.text : C.mono,
                    borderRadius: 8,
                    padding: "8px 10px",
                    fontFamily: MONO,
                    fontSize: 11,
                    letterSpacing: "0.08em",
                  }}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

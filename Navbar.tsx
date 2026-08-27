"use client";

import { useEffect, useRef, useState } from "react";
import { C, CALENDAR_URL, MENU_TARGETS, MONO, NavTarget, scrollToId } from "./data";
import type { Copy, Lang } from "./copy";

const CLOSE_DELAY = 220;

export default function Navbar({
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
  const [burger, setBurger] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const blockRetract = useRef(false);
  blockRetract.current = open || burger;

  /** Grace period so the pointer can travel from the trigger to the panel. */
  const openMenu = () => {
    window.clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const closeMenu = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(false), CLOSE_DELAY);
  };

  const select = (target: NavTarget) => {
    setOpen(false);
    setBurger(false);
    onNavigate(target);
  };

  const jump = (id: string) => {
    setBurger(false);
    scrollToId(id);
  };

  /** Header retracts on the way down, returns on the way up. */
  useEffect(() => {
    let last = window.scrollY;
    let hidden = false;
    const onScroll = () => {
      const el = headerRef.current;
      if (!el || blockRetract.current) return;
      const y = window.scrollY;
      const down = y > last;
      last = y;
      if (down && y > 160 && !hidden) {
        hidden = true;
        el.style.transform = "translateY(-160%)";
        el.style.opacity = "0";
        el.style.pointerEvents = "none";
      } else if ((!down || y <= 160) && hidden) {
        hidden = false;
        el.style.transform = "none";
        el.style.opacity = "1";
        el.style.pointerEvents = "auto";
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(closeTimer.current);
    };
  }, []);

  const langStyle = (active: boolean): React.CSSProperties => ({
    cursor: "pointer",
    color: active ? C.text : C.mono,
    background: "none",
    border: "none",
    padding: 0,
    fontFamily: MONO,
    fontSize: 11,
    letterSpacing: "0.08em",
  });

  const bar: React.CSSProperties = { width: 16, height: 1.5, background: C.text, display: "block" };

  const groups = t.menu.map((g, gi) => ({ ...g, targets: MENU_TARGETS[gi] }));

  return (
    <header
      ref={headerRef}
      data-mobile-header
      style={{
        transition: "transform 320ms cubic-bezier(.2,.7,.2,1), opacity 240ms linear",
        position: "fixed",
        top: 12,
        left: 12,
        right: 12,
        zIndex: 50,
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center",
        gap: 24,
        padding: "10px 12px 10px 22px",
        borderRadius: 20,
        background: "rgba(14,16,23,0.74)",
        backdropFilter: "blur(18px)",
        border: `1px solid ${C.line}`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <a href="#top">
          <img src="/logos/latil-wordmark-gradient.png" alt="Latil.io" style={{ height: 28, width: "auto", display: "block" }} />
        </a>
      </div>

      <nav data-nav-center style={{ display: "flex", alignItems: "center", justifySelf: "center", gap: 28, fontSize: 14, color: C.text3 }}>
        <span className="lt-nav-link" onMouseEnter={openMenu} onMouseLeave={closeMenu} style={{ display: "flex", alignItems: "center", cursor: "default", padding: "10px 0" }}>
          {t.nav.solutions}
          <span
            aria-hidden="true"
            style={{
              display: "inline-block",
              width: 0,
              height: 0,
              marginLeft: 7,
              borderLeft: "3.5px solid transparent",
              borderRight: "3.5px solid transparent",
              borderTop: "4px solid currentColor",
              opacity: 0.65,
            }}
          />
          {open && (
            <div
              onMouseEnter={openMenu}
              onMouseLeave={closeMenu}
              style={{
                position: "absolute",
                top: "calc(100% + 10px)",
                left: 0,
                right: 0,
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "30px 40px",
                padding: "30px 32px 34px",
                borderRadius: 20,
                background: "rgba(14,16,23,0.94)",
                backdropFilter: "blur(18px)",
                border: `1px solid ${C.line}`,
              }}
            >
              {groups.map((g) => (
                <div key={g.label} style={{ display: "grid", gap: 4, alignContent: "start" }}>
                  <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.14em", color: "#585E70", textTransform: "uppercase", marginBottom: 8 }}>
                    {g.label}
                  </span>
                  {g.items.map((s, si) => (
                    <a
                      key={s.name}
                      onClick={() => select(g.targets[si])}
                      className="lt-menu-item"
                      style={{ display: "grid", gap: 2, padding: "8px 10px", marginLeft: -10, color: C.text, cursor: "pointer" }}
                    >
                      <span style={{ fontSize: 14, color: C.text }}>{s.name}</span>
                      <span style={{ fontSize: 12.5, lineHeight: 1.4, color: C.muted }}>{s.micro}</span>
                    </a>
                  ))}
                </div>
              ))}
            </div>
          )}
        </span>

        <a onClick={() => jump("team")} className="lt-nav-link" style={{ color: C.text3, cursor: "pointer" }}>{t.nav.about}</a>
        <a onClick={() => jump("contact")} className="lt-nav-link" style={{ color: C.text3, cursor: "pointer" }}>{t.nav.contact}</a>
      </nav>

      <div style={{ display: "flex", alignItems: "center", justifySelf: "end", gap: 18 }}>
        <span data-lang style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <button type="button" onClick={() => setLang("es")} className="lt-nav-link" style={langStyle(lang === "es")}>ES</button>
          <span style={{ color: "#3E4453", fontFamily: MONO, fontSize: 11 }}>/</span>
          <button type="button" onClick={() => setLang("en")} className="lt-nav-link" style={langStyle(lang === "en")}>EN</button>
        </span>

        <a
          href={ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className="lt-btn-primary"
          style={{
            padding: "11px 20px",
            borderRadius: 10,
            background: C.accent,
            color: "#FFFFFF",
            fontSize: 13.5,
            fontWeight: 600,
            lineHeight: 1.2,
            whiteSpace: "nowrap",
          }}
        >
          {t.nav.cta}
        </a>

        <button
          type="button"
          data-burger
          aria-label="Menu"
          aria-expanded={burger}
          onClick={() => setBurger((b) => !b)}
          style={{
            display: "none",
            placeItems: "center",
            width: 42,
            height: 42,
            borderRadius: 12,
            border: `1px solid rgba(237,238,242,0.12)`,
            background: "rgba(255,255,255,0.02)",
            cursor: "pointer",
            padding: 0,
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.02)",
          }}
        >
          <span
            aria-hidden="true"
            style={{
              position: "relative",
              width: 18,
              height: 14,
              display: "inline-block",
            }}
          >
            <span
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: burger ? 6 : 0,
                height: 2,
                borderRadius: 999,
                background: C.text,
                transform: burger ? "rotate(45deg)" : "none",
                transition: "transform 220ms ease, top 220ms ease, opacity 160ms ease",
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
                opacity: burger ? 0 : 1,
                transition: "opacity 160ms ease",
              }}
            />
            <span
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: burger ? 6 : 12,
                height: 2,
                borderRadius: 999,
                background: C.text,
                transform: burger ? "rotate(-45deg)" : "none",
                transition: "transform 220ms ease, top 220ms ease, opacity 160ms ease",
              }}
            />
          </span>
        </button>
      </div>

      {burger && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 10px)",
            left: 0,
            right: 0,
            maxHeight: "calc(100vh - 110px)",
            overflowY: "auto",
            display: "grid",
            gap: 26,
            padding: "26px 24px 30px",
            borderRadius: 20,
            background: "rgba(14,16,23,0.97)",
            backdropFilter: "blur(18px)",
            border: `1px solid ${C.line}`,
          }}
        >
          {groups.map((g) => (
            <div key={g.label} style={{ display: "grid", gap: 2, alignContent: "start" }}>
              <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.14em", color: "#585E70", textTransform: "uppercase", marginBottom: 8 }}>
                {g.label}
              </span>
              {g.items.map((s, si) => (
                <a
                  key={s.name}
                  onClick={() => select(g.targets[si])}
                  className="lt-menu-item"
                  style={{ display: "grid", gap: 2, padding: "11px 10px", marginLeft: -10, borderRadius: 10, color: C.text, cursor: "pointer" }}
                >
                  <span style={{ fontSize: 15, color: C.text }}>{s.name}</span>
                  <span style={{ fontSize: 12.5, lineHeight: 1.4, color: C.muted }}>{s.micro}</span>
                </a>
              ))}
            </div>
          ))}

          <div style={{ display: "grid", gap: 4, paddingTop: 22, borderTop: `1px solid ${C.line}` }}>
            <a onClick={() => jump("team")} className="lt-menu-item" style={{ padding: "11px 10px", marginLeft: -10, borderRadius: 10, fontSize: 15, color: C.text, cursor: "pointer" }}>
              {t.nav.about}
            </a>
            <a onClick={() => jump("contact")} className="lt-menu-item" style={{ padding: "11px 10px", marginLeft: -10, borderRadius: 10, fontSize: 15, color: C.text, cursor: "pointer" }}>
              {t.nav.contact}
            </a>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: 22, borderTop: `1px solid ${C.line}` }}>
            {(["es", "en"] as Lang[]).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                style={{
                  cursor: "pointer",
                  padding: "10px 16px",
                  borderRadius: 8,
                  background: "none",
                  border: `1px solid ${lang === l ? C.accentLight : C.lineStrong}`,
                  color: lang === l ? C.text : C.mono,
                  fontFamily: MONO,
                  fontSize: 12,
                  letterSpacing: "0.1em",
                }}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

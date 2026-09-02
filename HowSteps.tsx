"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { C, MONO, monoLabel } from "./data";
import type { Copy } from "./copy";

/** Extra scroll distance per step (vh) while the row stays pinned. */
const STEP_VH = 45;

type StepState = "done" | "current" | "pending";
type Phase = { mode: "before" | "pinned" | "after"; active: number };

function Check() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3.5 8.4L6.6 11.5L12.5 4.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Pins the row in place and advances the active step as the user scrolls
 * through the extra track height, instead of just fading cards in.
 *
 * Uses a manually driven fixed/absolute swap rather than `position: sticky`:
 * the page root has `overflow-x: hidden` (needed for the hero marquee), and
 * any ancestor overflow other than visible turns itself into the sticky
 * containing block, which breaks stickiness against the viewport.
 *
 * Skips the scroll-jack entirely under prefers-reduced-motion.
 */
export default function HowSteps({ t }: { t: Copy }) {
  const items = t.how.items;
  const trackRef = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(true);
  const [phase, setPhase] = useState<Phase>({ mode: "before", active: 0 });

  // The pin/scroll-jack only makes sense on a wide viewport without reduced motion:
  // on a touch screen it fights the user's own scroll, and a 4-up row has no room to pin.
  useEffect(() => {
    const reduceMql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileMql = window.matchMedia("(max-width: 900px)");
    const evaluate = () => setPinned(!reduceMql.matches && !mobileMql.matches);
    evaluate();
    reduceMql.addEventListener("change", evaluate);
    mobileMql.addEventListener("change", evaluate);
    return () => {
      reduceMql.removeEventListener("change", evaluate);
      mobileMql.removeEventListener("change", evaluate);
    };
  }, []);

  useEffect(() => {
    if (!pinned) {
      setPhase({ mode: "before", active: 0 });
      return;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const el = trackRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const mode: Phase["mode"] = rect.top > 0 ? "before" : rect.bottom < vh ? "after" : "pinned";
      const total = rect.height - vh;
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 0));
      const progress = total > 0 ? scrolled / total : 0;
      const active = Math.min(items.length - 1, Math.floor(progress * items.length));
      setPhase((p) => (p.mode === mode && p.active === active ? p : { mode, active }));
    };
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [pinned, items.length]);

  // Unpinned (mobile / reduced motion): a flat, neutral grid — no step is "active" without scroll-driven progress.
  const stateOf = (i: number): StepState => (!pinned ? "pending" : i < phase.active ? "done" : i === phase.active ? "current" : "pending");

  const circleStyle = (state: StepState): CSSProperties => ({
    width: state === "current" ? 30 : 24,
    height: state === "current" ? 30 : 24,
    borderRadius: "50%",
    display: "grid",
    placeItems: "center",
    flexShrink: 0,
    transition: "all 320ms cubic-bezier(.2,.7,.2,1)",
    background: state === "done" ? C.accent : state === "current" ? C.bgAlt : C.panel,
    border: state === "current" ? `2px solid ${C.accentLight}` : state === "pending" ? `1px solid ${C.lineStrong}` : "none",
  });

  const cardStyle = (state: StepState): CSSProperties => ({
    padding: "30px 26px 34px",
    borderRadius: 16,
    display: "grid",
    gap: 12,
    alignContent: "start",
    transition: "background 360ms ease, border-color 360ms ease, transform 360ms cubic-bezier(.2,.7,.2,1)",
    transform: state === "current" ? "translateY(-6px)" : "none",
    background: state === "current" ? C.accent : state === "done" ? "rgba(124,58,237,0.08)" : C.panel,
    border: `1px solid ${state === "current" ? C.accent : state === "done" ? "rgba(124,58,237,0.22)" : C.lineStrong}`,
  });

  const paneStyle: CSSProperties = !pinned
    ? { position: "static" }
    : phase.mode === "pinned"
    ? { position: "fixed", top: 0, left: 0, right: 0 }
    : phase.mode === "after"
    ? { position: "absolute", left: 0, right: 0, bottom: 0 }
    : { position: "relative" };

  return (
    <section id="how" data-sec style={{ borderBottom: `1px solid ${C.line}`, background: C.bgAlt }}>
      <div ref={trackRef} style={{ position: "relative", height: pinned ? `calc(100vh + ${(items.length - 1) * STEP_VH}vh)` : "auto" }}>
        <div style={paneStyle}>
          <div style={{ height: pinned ? "100vh" : "auto", display: "flex", alignItems: "center" }}>
            <div style={{ maxWidth: 1240, margin: "0 auto", width: "100%", padding: pinned ? "40px 40px" : "140px 40px 100px", display: "grid", gap: 44 }}>
              <div data-reveal style={{ display: "grid", gap: 20, maxWidth: 780 }}>
                <span style={monoLabel(13)}>{t.how.label}</span>
                <h2 style={{ margin: 0, fontSize: "clamp(30px, 3.6vw, 50px)", lineHeight: 1.05, letterSpacing: "-0.03em", fontWeight: 500 }}>{t.how.title}</h2>
              </div>

              {pinned && (
                <div style={{ display: "flex", alignItems: "center" }}>
                  {items.map((it, i) => {
                    const state = stateOf(i);
                    return (
                      <Fragment key={it.num}>
                        <div style={circleStyle(state)}>
                          {state === "done" && <Check />}
                          {state === "current" && <span style={{ width: 8, height: 8, borderRadius: "50%", background: C.accentLight }} />}
                        </div>
                        {i < items.length - 1 && (
                          <div style={{ flex: 1, height: 2, margin: "0 4px", background: i < phase.active ? C.accent : C.lineStrong, transition: "background 360ms ease" }} />
                        )}
                      </Fragment>
                    );
                  })}
                </div>
              )}

              <div style={{ display: "grid", gridTemplateColumns: pinned ? `repeat(${items.length}, 1fr)` : "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
                {items.map((it, i) => {
                  const state = stateOf(i);
                  return (
                    <div key={it.num} style={cardStyle(state)}>
                      <span style={{ fontFamily: MONO, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: state === "current" ? "rgba(255,255,255,0.75)" : C.accentLight }}>
                        {t.how.step} {it.num}
                      </span>
                      <span style={{ fontSize: 19, letterSpacing: "-0.015em", color: state === "current" ? "#fff" : C.text }}>{it.title}</span>
                      <span style={{ fontSize: 14.5, lineHeight: 1.55, color: state === "current" ? "rgba(255,255,255,0.82)" : C.muted }}>{it.body}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


"use client";

import { C, MONO, REST_NUMS } from "./data";
import type { Copy } from "./copy";

/**
 * Click a row to expand its detail. One open at a time.
 * Controlled from LatilHome so a mega-menu entry can open a row directly.
 */
export default function PortfolioList({ t, open, setOpen }: { t: Copy; open: number; setOpen: (i: number) => void }) {

  return (
    <div data-reveal style={{ display: "grid" }}>
      {t.restNames.map((name, i) => {
        const isOpen = open === i;
        const detail = t.restDetails[i];
        return (
          <div key={name} id={`rest-${i}`} style={{ borderTop: `1px solid ${C.line}`, scrollMarginTop: 110 }}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="lt-row"
              data-rest-row
              style={{
                display: "grid",
                gridTemplateColumns: "60px 300px 1fr 24px",
                gap: 24,
                alignItems: "center",
                width: "100%",
                padding: "24px 0",
                background: "none",
                border: "none",
                textAlign: "left",
                cursor: "pointer",
                color: C.text,
                font: "inherit",
              }}
            >
              <span style={{ fontFamily: MONO, fontSize: 12, color: C.mono }}>{REST_NUMS[i]}</span>
              <span style={{ fontSize: 18, letterSpacing: "-0.015em", color: C.text }}>{name}</span>
              <span data-rest-micro style={{ fontSize: 15, lineHeight: 1.45, color: C.muted }}>{t.restItems[i]}</span>
              <span style={{ fontFamily: MONO, fontSize: 17, lineHeight: 1, color: C.accentLight, textAlign: "right" }}>
                {isOpen ? "−" : "+"}
              </span>
            </button>

            {isOpen && (
              <div data-rest-detail style={{ display: "grid", gridTemplateColumns: "60px 1fr", gap: 24, padding: "20px 0 44px" }}>
                <span />
                <div style={{ display: "grid", gap: 26, maxWidth: 900 }}>
                  <p style={{ margin: 0, fontSize: 17, lineHeight: 1.5, color: C.text2, maxWidth: 680 }}>{detail.lead}</p>
                  <div style={{ display: "grid" }}>
                    {detail.bullets.map((b) => (
                      <div
                        key={b}
                        style={{ display: "flex", gap: 12, padding: "13px 0", borderTop: "1px solid rgba(237,238,242,0.09)", fontSize: 15, lineHeight: 1.5, color: C.text3 }}
                      >
                        <span style={{ color: C.accentLight }}>·</span>
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                  <div data-metrics style={{ display: "flex", alignItems: "end", gap: 46, flexWrap: "wrap" }}>
                    {detail.metrics.map((m) => (
                      <div key={m.label} style={{ display: "grid", gap: 5 }}>
                        <span style={{ fontFamily: MONO, fontSize: 26, letterSpacing: "-0.02em", color: C.text }}>{m.value}</span>
                        <span style={{ fontSize: 12.5, color: C.mono, maxWidth: 180, lineHeight: 1.4 }}>{m.label}</span>
                      </div>
                    ))}
                    <a href="#contact" style={{ fontSize: 15, borderBottom: "1px solid rgba(167,139,250,0.4)", paddingBottom: 3 }}>
                      {t.restCta}
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

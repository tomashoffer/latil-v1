"use client";

import HeroMap from "./HeroMap";
import Navbar from "./Navbar";
import NavMobile from "./NavMobile";
import PortfolioList from "./PortfolioList";
import ContactForm from "./ContactForm";
import TeamContact from "./TeamContact";
import { useState } from "react";
import { useLang } from "./useLang";
import { useReveal } from "./useReveal";
import {
  C,
  CONTACT_EMAIL,
  FLAGSHIP_NUMS,
  NavTarget,
  scrollToId,
  LINKEDIN_COMPANY,
  MONO,
  PARTNERS,
  SANS,
  TEAM_PROFILES,
} from "./data";
import { SOLUTION_NAMES } from "./copy";
import "./latil.css";

const monoLabel = (size = 13, color: string = C.mono): React.CSSProperties => ({
  fontFamily: MONO,
  fontSize: size,
  letterSpacing: "0.14em",
  color,
  textTransform: "uppercase",
});

export default function LatilHome() {
  const { lang, setLang, t } = useLang("es");
  const [openRest, setOpenRest] = useState(-1);
  useReveal();

  /** A mega-menu entry scrolls to its row; a portfolio entry also opens its detail. */
  const navigate = (target: NavTarget) => {
    if (target.kind === "rest") setOpenRest(target.i);
    scrollToId(`${target.kind === "flag" ? "sol" : "rest"}-${target.i}`);
  };

  // Four copies so the strip never runs out of logos on a wide viewport.
  // Spacing must be margin-right, not gap: gap breaks the -50% loop period.
  const marquee = [...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS];
  const allSolutionNames = [...SOLUTION_NAMES, t.restNames[4]];

  return (
    <div id="top" style={{ background: C.bg, color: C.text, fontFamily: SANS, overflowX: "hidden" }}>
      <Navbar t={t} lang={lang} setLang={setLang} onNavigate={navigate} />
      <NavMobile t={t} lang={lang} setLang={setLang} onNavigate={navigate} />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        data-hero
        style={{
          position: "relative",
          minHeight: "78vh",
          display: "grid",
          alignItems: "center",
          padding: "110px 40px 30px",
          borderBottom: `1px solid ${C.line}`,
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0, background: C.bg }} />
        <HeroMap />
        <div
          data-hero-overlay
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(90deg, rgba(10,11,16,0.94) 0%, rgba(10,11,16,0.74) 46%, rgba(10,11,16,0.18) 100%)",
          }}
        />

        <div style={{ position: "relative", maxWidth: 1000 }}>
          <div data-reveal style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 34 }}>
            <span style={{ width: 6, height: 6, background: C.accentLight }} />
            <span style={{ ...monoLabel(13.5, C.accentLight), letterSpacing: "0.16em" }}>{t.hero.eyebrow}</span>
          </div>

          <h1
            data-reveal
            style={{
              margin: 0,
              fontSize: "clamp(44px, 6.2vw, 92px)",
              lineHeight: 0.98,
              letterSpacing: "-0.035em",
              fontWeight: 600,
              textWrap: "balance" as never,
            }}
          >
            {t.hero.titleA}
            <br />
            <span style={{ color: C.muted }}>{t.hero.titleB}</span>
          </h1>

          <div data-reveal style={{ display: "grid", gap: 6, marginTop: 34, maxWidth: 620, fontSize: 19, lineHeight: 1.45, color: C.text2 }}>
            <span>{t.hero.sub1}</span>
            <span style={{ color: C.muted }}>{t.hero.sub2}</span>
          </div>

          <div data-reveal data-hero-cta style={{ display: "flex", gap: 12, marginTop: 44, flexWrap: "wrap" }}>
            <a href="#contact" className="lt-btn-primary" style={{ padding: "15px 28px", borderRadius: 11, background: C.accent, color: "#FFFFFF", fontSize: 15, fontWeight: 600 }}>
              {t.hero.cta1}
            </a>
            <a href="#solutions" className="lt-btn-ghost" style={{ padding: "15px 28px", borderRadius: 11, border: "1px solid rgba(237,238,242,0.22)", color: C.text, fontSize: 15 }}>
              {t.hero.cta2}
            </a>
          </div>
        </div>
      </section>

      {/* ── Partner marquee ──────────────────────────────────── */}
      <section style={{ padding: "46px 40px 52px", borderBottom: `1px solid ${C.line}` }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div data-reveal style={{ display: "grid", gap: 22 }}>
            <span style={{ ...monoLabel(13.5), letterSpacing: "0.16em" }}>{t.partners}</span>
            <div className="lt-marquee" style={{ position: "relative", overflow: "hidden", padding: "26px 0" }}>
              <div className="lt-marquee-track" style={{ display: "flex", alignItems: "center", width: "max-content" }}>
                {marquee.map((p, i) => (
                  <div
                    key={`${p.name}-${i}`}
                    role="img"
                    aria-label={p.name}
                    title={p.name}
                    style={{
                      flex: "none",
                      marginRight: 74,
                      height: p.h,
                      width: p.w,
                      backgroundImage: `url("${p.logo}")`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      filter: "brightness(0) invert(1)",
                      opacity: 0.7,
                    }}
                  />
                ))}
              </div>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  background: `linear-gradient(90deg, ${C.bg} 0%, rgba(0,0,0,0) 12%, rgba(0,0,0,0) 88%, ${C.bg} 100%)`,
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Frictions ────────────────────────────────────────── */}
      <section data-sec style={{ padding: "140px 40px", borderBottom: `1px solid ${C.line}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gap: 90 }}>
          <h2
            data-reveal
            style={{ margin: 0, fontSize: "clamp(32px, 4.4vw, 64px)", lineHeight: 1.04, letterSpacing: "-0.03em", fontWeight: 500, maxWidth: 900, textWrap: "pretty" as never }}
          >
            {t.frictions.titleA}
            <br />
            {t.frictions.titleB}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 56 }}>
            {t.frictions.items.map((f) => (
              <div key={f.num} data-reveal style={{ display: "grid", gap: 14, paddingTop: 22, borderTop: `1px solid ${C.lineStrong}` }}>
                <span style={{ fontFamily: MONO, fontSize: 14, color: C.accentLight, letterSpacing: "0.14em" }}>{f.num}</span>
                <span style={{ fontSize: 22, lineHeight: 1.25, letterSpacing: "-0.015em" }}>{f.title}</span>
                <span style={{ fontSize: 15, lineHeight: 1.55, color: C.muted }}>{f.body}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Flagship solutions ───────────────────────────────── */}
      <section id="solutions" data-sec style={{ padding: "130px 40px 0" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div data-reveal style={{ display: "flex", alignItems: "end", justifyContent: "space-between", gap: 40, flexWrap: "wrap", marginBottom: 70 }}>
            <h2 style={{ margin: 0, fontSize: "clamp(30px, 3.6vw, 50px)", lineHeight: 1.05, letterSpacing: "-0.03em", fontWeight: 500, maxWidth: 640 }}>
              {t.solutions.title}
            </h2>
            <span style={{ ...monoLabel(12), maxWidth: 260, lineHeight: 1.7 }}>{t.solutions.audience}</span>
          </div>

          <div style={{ display: "grid" }}>
            {t.flagships.map((f, i) => (
              <div
                key={SOLUTION_NAMES[i]}
                id={`sol-${i}`}
                data-reveal
                data-split
                style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center", padding: "56px 0", borderTop: "1px solid rgba(237,238,242,0.12)", scrollMarginTop: 110 }}
              >
                <div style={{ display: "grid", gap: 18, alignContent: "start" }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
                    <span style={{ fontFamily: MONO, fontSize: 14, color: C.accentLight, letterSpacing: "0.14em" }}>{FLAGSHIP_NUMS[i]}</span>
                    <span style={monoLabel(13)}>{f.tag}</span>
                  </div>
                  <h3 style={{ margin: 0, fontSize: "clamp(26px, 2.6vw, 36px)", lineHeight: 1.1, letterSpacing: "-0.025em", fontWeight: 500 }}>
                    {SOLUTION_NAMES[i]}
                  </h3>
                  <p style={{ margin: 0, fontSize: 17.5, lineHeight: 1.5, color: C.text2, maxWidth: 480 }}>{f.lead}</p>
                  <div style={{ display: "grid", marginTop: 6 }}>
                    {f.bullets.map((b) => (
                      <div key={b} style={{ display: "flex", gap: 12, padding: "13px 0", borderTop: "1px solid rgba(237,238,242,0.09)", fontSize: 15, lineHeight: 1.45, color: C.text3 }}>
                        <span style={{ color: C.accentLight }}>·</span>
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                  <a href="#contact" style={{ marginTop: 10, fontSize: 15, borderBottom: "1px solid rgba(167,139,250,0.4)", paddingBottom: 3, justifySelf: "start" }}>
                    {t.solutions.learn}
                  </a>
                </div>

                {/* Illustrative product panel: typography, not an image. Swap for a real capture. */}
                <div style={{ display: "grid", gap: 10, alignContent: "start" }}>
                  <div style={{ background: C.bgAlt, border: `1px solid ${C.line}`, display: "grid", alignContent: "start" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "18px 22px", borderBottom: `1px solid ${C.line}` }}>
                      <span style={{ ...monoLabel(12, C.text), letterSpacing: "0.12em" }}>{f.panelTitle}</span>
                      <span style={{ ...monoLabel(11), letterSpacing: "0.1em" }}>{f.panelMeta}</span>
                    </div>
                    {f.rows.map((r) => (
                      <div key={r.label} data-panel-row style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "8px 20px", padding: "18px 22px", borderBottom: "1px solid rgba(237,238,242,0.07)" }}>
                        <span style={{ fontSize: 15, color: C.text }}>{r.label}</span>
                        <span style={{ fontFamily: MONO, fontSize: 14, color: C.text, textAlign: "right" }}>{r.value}</span>
                        <span style={{ fontSize: 12.5, color: C.mono }}>{r.meta}</span>
                        <span style={{ ...monoLabel(10, r.color), letterSpacing: "0.1em", textAlign: "right" }}>{r.state}</span>
                      </div>
                    ))}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "18px 22px" }}>
                      <span style={{ ...monoLabel(11.5, C.accentLight), letterSpacing: "0.1em" }}>{f.footL}</span>
                      <span style={{ ...monoLabel(11), letterSpacing: "0.1em" }}>{f.footR}</span>
                    </div>
                  </div>
                  <span style={{ ...monoLabel(11, C.faint), letterSpacing: "0.1em" }}>{t.solutions.illustrative}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Rest of the portfolio ────────────────────────────── */}
      <section data-sec style={{ padding: "110px 40px 130px", borderBottom: `1px solid ${C.line}` }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div data-reveal style={{ display: "flex", alignItems: "end", justifyContent: "space-between", gap: 30, flexWrap: "wrap", marginBottom: 12 }}>
            <h2 style={{ margin: 0, fontSize: "clamp(22px, 2vw, 28px)", lineHeight: 1.2, letterSpacing: "-0.02em", fontWeight: 500 }}>{t.solutions.restTitle}</h2>
            <span style={monoLabel(12)}>{t.solutions.restMeta}</span>
          </div>
          <PortfolioList t={t} open={openRest} setOpen={setOpenRest} />
        </div>
      </section>

      {/* ── How we work ──────────────────────────────────────── */}
      <section data-sec style={{ padding: "140px 40px", borderBottom: `1px solid ${C.line}`, background: C.bgAlt }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", display: "grid", gap: 80 }}>
          <div data-reveal style={{ display: "grid", gap: 20, maxWidth: 780 }}>
            <span style={monoLabel(13)}>{t.how.label}</span>
            <h2 style={{ margin: 0, fontSize: "clamp(30px, 3.6vw, 50px)", lineHeight: 1.05, letterSpacing: "-0.03em", fontWeight: 500 }}>{t.how.title}</h2>
          </div>
          {/* hairlines drawn per card: a tinted container with 1px gaps leaves grey
              blocks wherever the row is not full */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
            {t.how.items.map((d) => (
              <div
                key={d.num}
                data-reveal
                style={{
                  background: C.bgAlt,
                  padding: "34px 30px 40px",
                  borderTop: "1px solid rgba(237,238,242,0.12)",
                  borderLeft: "1px solid rgba(237,238,242,0.12)",
                  display: "grid",
                  gap: 12,
                  alignContent: "start",
                }}
              >
                <span style={{ fontFamily: MONO, fontSize: 12, color: C.accentLight }}>{d.num}</span>
                <span style={{ fontSize: 19, letterSpacing: "-0.015em" }}>{d.title}</span>
                <span style={{ fontSize: 14.5, lineHeight: 1.55, color: C.muted }}>{d.body}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ─────────────────────────────────────────────── */}
      <section id="team" data-sec style={{ padding: "140px 40px", borderBottom: `1px solid ${C.line}` }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", display: "grid", gap: 64 }}>
          <div data-reveal style={{ display: "grid", gap: 20, maxWidth: 820 }}>
            <span style={monoLabel(13)}>{t.team.label}</span>
            <h2 style={{ margin: 0, fontSize: "clamp(30px, 3.6vw, 50px)", lineHeight: 1.05, letterSpacing: "-0.03em", fontWeight: 500 }}>{t.team.title}</h2>
            <p style={{ margin: 0, fontSize: 18, lineHeight: 1.5, color: C.text2, maxWidth: 640 }}>{t.team.lead}</p>
          </div>
          <div data-reveal data-team style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 28, justifyItems: "center" }}>
            {TEAM_PROFILES.map((m, i) => (
              <div
                key={m.name}
                style={{
                  display: "grid",
                  gridTemplateRows: "auto 1fr",
                  gap: 16,
                  height: "100%",
                  width: "100%",
                  maxWidth: 360,
                  justifySelf: "center",
                }}
              >
                <div style={{ aspectRatio: "4 / 5", background: C.frame, border: "1px solid rgba(237,238,242,0.08)", overflow: "hidden", width: "100%" }}>
                  <div
                    role="img"
                    aria-label={m.name}
                    style={{ width: "100%", height: "100%", backgroundImage: `url("${m.photo}")`, backgroundSize: "cover", backgroundPosition: "50% 15%" }}
                  />
                </div>
                <div style={{ display: "grid", gridTemplateRows: "auto auto 1fr auto", gap: 5, width: "100%" }}>
                  <span style={{ fontSize: 16.5, letterSpacing: "-0.01em" }}>{m.name}</span>
                  <span style={{ ...monoLabel(10, C.accentLight), letterSpacing: "0.1em" }}>{t.team.roles[i]}</span>
                  <span style={{ fontSize: 13.5, lineHeight: 1.5, color: C.muted, marginTop: 4 }}>{t.team.bios[i]}</span>
                  <TeamContact email={m.email} linkedin={m.linkedin} name={m.name} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ──────────────────────────────────────────── */}
      <section id="contact" data-sec style={{ padding: "150px 40px 130px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 80, alignItems: "start" }}>
          <div data-reveal style={{ display: "grid", gap: 26 }}>
            <h2 style={{ margin: 0, fontSize: "clamp(34px, 4.4vw, 62px)", lineHeight: 1.02, letterSpacing: "-0.032em", fontWeight: 600 }}>{t.contact.title}</h2>
            <div style={{ display: "grid", gap: 4, fontSize: 18, lineHeight: 1.5, color: C.text2 }}>
              <span>{t.contact.line1}</span>
              <span style={{ color: C.muted }}>{t.contact.line2}</span>
            </div>
            <div style={{ display: "grid", gap: 10, marginTop: 10, fontSize: 14, color: C.muted }}>
              <span>✓ &nbsp;{t.contact.b1}</span>
              <span>✓ &nbsp;{t.contact.b2}</span>
              <span>✓ &nbsp;{t.contact.b3}</span>
            </div>
          </div>

          <ContactForm t={t} solutions={allSolutionNames} />
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer style={{ padding: "60px 40px 40px", borderTop: `1px solid ${C.line}` }}>
        <div data-footer style={{ maxWidth: 1240, margin: "0 auto", display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: 50 }}>
          <div style={{ display: "grid", gap: 14, alignContent: "start" }}>
            <img src="/logos/latil-wordmark-gradient.png" alt="Latil.io" style={{ height: 22, width: "auto", display: "block" }} />
            <span style={{ fontSize: 14, lineHeight: 1.5, color: C.mono, maxWidth: 280 }}>{t.footer.tagline}</span>
          </div>
          <div style={{ display: "grid", gap: 10, alignContent: "start" }}>
            <span style={{ ...monoLabel(13, C.faint), marginBottom: 4 }}>{t.nav.solutions}</span>
            {allSolutionNames.map((n) => (
              <a key={n} href="#solutions" style={{ color: C.muted, fontSize: 13.5 }}>{n}</a>
            ))}
          </div>
          <div style={{ display: "grid", gap: 10, alignContent: "start", fontSize: 13.5, color: C.muted }}>
            <span style={{ ...monoLabel(13, C.faint), marginBottom: 4 }}>{t.nav.contact}</span>
            <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: C.muted, fontSize: 13.5 }}>{CONTACT_EMAIL}</a>
            <a href={LINKEDIN_COMPANY} target="_blank" rel="noopener noreferrer" style={{ color: C.muted, fontSize: 13.5 }}>LinkedIn</a>
            <span>{t.footer.coverage}</span>
          </div>
        </div>
        <div
          style={{
            maxWidth: 1240,
            margin: "50px auto 0",
            paddingTop: 22,
            borderTop: "1px solid rgba(237,238,242,0.07)",
            display: "flex",
            justifyContent: "space-between",
            gap: 20,
            ...monoLabel(12, C.faint),
            letterSpacing: "0.1em",
          }}
        >
          <span>© 2026 Latil.io</span>
          <span>{t.footer.legal}</span>
        </div>
      </footer>
    </div>
  );
}

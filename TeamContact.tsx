"use client";

import { C, MONO } from "./data";

const box: React.CSSProperties = {
  display: "grid",
  placeItems: "center",
  width: 30,
  height: 30,
  borderRadius: 8,
  border: "1px solid rgba(237,238,242,0.14)",
  color: C.text3,
};

/** Email + LinkedIn for a team member. */
export default function TeamContact({ email, linkedin, name }: { email: string; linkedin: string; name: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 16, alignSelf: "end" }}>
      <a href={`mailto:${email}`} title={email} aria-label={`Email ${name}`} data-contact-icon className="lt-icon" style={box}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="1.5" y="3" width="13" height="10" rx="1.5" />
          <path d="M2 4.2 8 8.8l6-4.6" />
        </svg>
      </a>
      <a
        href={linkedin}
        target="_blank"
        rel="noopener noreferrer"
        title="LinkedIn"
        aria-label={`LinkedIn de ${name}`}
        data-contact-icon
        className="lt-icon"
        style={{ ...box, fontFamily: MONO, fontSize: 11, fontWeight: 500 }}
      >
        in
      </a>
    </div>
  );
}

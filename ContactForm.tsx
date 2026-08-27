"use client";

import { useState } from "react";
import { C, SANS } from "./data";
import type { Copy } from "./copy";

type Status = "idle" | "sending" | "ok" | "error";

const field: React.CSSProperties = {
  padding: "14px 18px",
  borderRadius: 12,
  background: C.bg,
  border: "1px solid rgba(237,238,242,0.14)",
  color: C.text,
  fontFamily: SANS,
  fontSize: 15,
  outline: "none",
};

/** Posts to /api/contact, which sends the email through Resend server-side. */
export default function ContactForm({ t, solutions }: { t: Copy; solutions: string[] }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    if (!data.name || !data.email || !data.company) {
      setStatus("error");
      setError(t.contact.fRequired);
      return;
    }

    setStatus("sending");
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("error");
      setError(t.contact.fError);
    }
  };

  if (status === "ok") {
    return (
      <div
        data-reveal
        style={{
          display: "grid",
          gap: 12,
          alignContent: "center",
          minHeight: 320,
          padding: 34,
          borderRadius: 20,
          border: `1px solid ${C.accentLight}`,
          background: C.panel,
        }}
      >
        <span style={{ fontSize: 20, lineHeight: 1.35, color: C.text }}>{t.contact.fOk}</span>
        <span style={{ fontSize: 14.5, color: C.muted }}>{t.contact.b1}</span>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form
      data-reveal
      onSubmit={onSubmit}
      style={{ display: "grid", gap: 14, padding: 34, borderRadius: 20, border: "1px solid rgba(237,238,242,0.12)", background: C.panel }}
    >
      <input className="lt-field" name="name" placeholder={t.contact.fName} style={field} />
      <input className="lt-field" name="email" type="email" placeholder={t.contact.fEmail} style={field} />
      <input className="lt-field" name="company" placeholder={t.contact.fCompany} style={field} />
      <select className="lt-field" name="challenge" defaultValue="" style={{ ...field, color: "#979CAE" }}>
        <option value="">{t.contact.fChallenge}</option>
        {solutions.map((n) => (
          <option key={n} value={n}>{n}</option>
        ))}
        <option value="other">{t.contact.fOther}</option>
      </select>
      <textarea className="lt-field" name="message" rows={3} placeholder={t.contact.fMessage} style={{ ...field, resize: "vertical" }} />

      {error && <span style={{ fontSize: 13.5, color: "#F0A0A0" }}>{error}</span>}

      <button
        type="submit"
        disabled={sending}
        className="lt-btn-primary"
        style={{
          padding: "15px 20px",
          borderRadius: 11,
          background: C.accent,
          color: "#FFFFFF",
          border: "none",
          fontFamily: SANS,
          fontSize: 15,
          fontWeight: 600,
          cursor: sending ? "default" : "pointer",
          opacity: sending ? 0.65 : 1,
        }}
      >
        {sending ? t.contact.fSending : t.contact.fSend}
      </button>
    </form>
  );
}

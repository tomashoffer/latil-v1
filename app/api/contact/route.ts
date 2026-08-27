import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "../../../lib/validations";

const FROM = process.env.RESEND_FROM || "contact@latil.io";
const TO = process.env.RESEND_TEST_EMAIL || "contact@latil.io";

const esc = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;");

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload", issues: parsed.error.flatten() }, { status: 422 });
  }

  const { name, email, company, challenge, message } = parsed.data;

  if (!process.env.RESEND_API_KEY) {
    console.warn("[contact] RESEND_API_KEY missing — logging instead of sending", parsed.data);
    return NextResponse.json({ ok: true, delivered: false });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const rows: Array<[string, string]> = [
    ["Name", name],
    ["Email", email],
    ["Company", company],
    ["Challenge", challenge || "n/a"],
  ];

  const html = `
    <div style="font-family:Helvetica,Arial,sans-serif;font-size:15px;color:#111827">
      <h2 style="margin:0 0 16px;font-size:18px">New contact from latil.io</h2>
      <table cellpadding="6" style="border-collapse:collapse">
        ${rows.map(([key, value]) => `<tr><td style="color:#6b7280">${key}</td><td><strong>${esc(value)}</strong></td></tr>`).join("")}
      </table>
      ${message ? `<p style="margin-top:18px;white-space:pre-wrap">${esc(message)}</p>` : ""}
    </div>`;

  const text = [...rows.map(([key, value]) => `${key}: ${value}`), "", message].join("\n");

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `Contact · ${company} · ${name}`,
      html,
      text,
    });

    if (error) {
      throw error;
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[contact] Resend failed", err);
    return NextResponse.json({ error: "Send failed" }, { status: 502 });
  }
}

import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = "onboarding@resend.dev";
const TO   = "info@dream-parade.website";

export async function POST(request: Request) {
  try {
    const { company, name, email, talent, message } = await request.json();

    if (!company || !name || !email || !message) {
      return NextResponse.json({ error: "必須項目が未入力です" }, { status: 400 });
    }

    const talentLabel = talent || "未定";

    const { error } = await resend.emails.send({
      from: FROM,
      to:   TO,
      replyTo: email,
      subject: `【出演依頼】${talentLabel} - ${company}`,
      html: `
        <div style="font-family:sans-serif;color:#111;max-width:600px;margin:0 auto;padding:24px">
          <h2 style="color:#CC0000;border-bottom:2px solid #CC0000;padding-bottom:8px;margin-bottom:20px">
            出演依頼 — DreamParade
          </h2>
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            <tr><td style="padding:8px 0;color:#666;width:150px">会社名</td><td style="padding:8px 0">${company}</td></tr>
            <tr><td style="padding:8px 0;color:#666">担当者名</td><td style="padding:8px 0">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#666">メールアドレス</td><td style="padding:8px 0"><a href="mailto:${email}" style="color:#CC0000">${email}</a></td></tr>
            <tr><td style="padding:8px 0;color:#666">希望タレント</td><td style="padding:8px 0">${talentLabel}</td></tr>
          </table>
          <h3 style="color:#CC0000;margin-top:24px;margin-bottom:8px">依頼内容</h3>
          <p style="white-space:pre-wrap;background:#f5f5f5;padding:16px;border-radius:4px;font-size:14px;line-height:1.7">${message}</p>
        </div>
      `,
      text: [
        `会社名：${company}`,
        `担当者名：${name}`,
        `メールアドレス：${email}`,
        `希望タレント：${talentLabel}`,
        "",
        "依頼内容：",
        message,
      ].join("\n"),
    });

    if (error) {
      console.error("[api/contact] Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[api/contact] exception:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

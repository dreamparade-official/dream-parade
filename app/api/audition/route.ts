import { NextResponse } from "next/server";
import { Resend } from "resend";

const FROM = "DreamParade <info@dream-parade.website>";
const TO   = "info@dream-parade.website";

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  console.log("[api/audition] RESEND_API_KEY set:", !!apiKey);

  if (!apiKey) {
    console.error("[api/audition] RESEND_API_KEY is not set");
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }

  try {
    const body = await request.json();
    console.log("[api/audition] received body:", body);
    const { name, age, email, phone, genre, pr } = body;

    if (!name || !age || !email || !genre || !pr) {
      return NextResponse.json({ error: "必須項目が未入力です" }, { status: 400 });
    }

    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: FROM,
      to:   TO,
      replyTo: email,
      subject: `【オーディション応募】${genre} - ${name}`,
      html: `
        <div style="font-family:sans-serif;color:#111;max-width:600px;margin:0 auto;padding:24px">
          <h2 style="color:#CC0000;border-bottom:2px solid #CC0000;padding-bottom:8px;margin-bottom:20px">
            オーディション応募 — DreamParade
          </h2>
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            <tr><td style="padding:8px 0;color:#666;width:150px">お名前</td><td style="padding:8px 0">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#666">年齢</td><td style="padding:8px 0">${age}歳</td></tr>
            <tr><td style="padding:8px 0;color:#666">メールアドレス</td><td style="padding:8px 0"><a href="mailto:${email}" style="color:#CC0000">${email}</a></td></tr>
            <tr><td style="padding:8px 0;color:#666">電話番号</td><td style="padding:8px 0">${phone || "未記入"}</td></tr>
            <tr><td style="padding:8px 0;color:#666">希望ジャンル</td><td style="padding:8px 0">${genre}</td></tr>
          </table>
          <h3 style="color:#CC0000;margin-top:24px;margin-bottom:8px">自己PR</h3>
          <p style="white-space:pre-wrap;background:#f5f5f5;padding:16px;border-radius:4px;font-size:14px;line-height:1.7">${pr}</p>
        </div>
      `,
      text: [
        `お名前：${name}`,
        `年齢：${age}歳`,
        `メールアドレス：${email}`,
        `電話番号：${phone || "未記入"}`,
        `希望ジャンル：${genre}`,
        "",
        "自己PR：",
        pr,
      ].join("\n"),
    });

    if (error) {
      console.error("[api/audition] Resend error:", JSON.stringify(error));
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("[api/audition] email sent successfully");
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[api/audition] exception:", err instanceof Error ? err.message : err);
    console.error("[api/audition] stack:", err instanceof Error ? err.stack : "");
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

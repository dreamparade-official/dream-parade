"use client";

import { useState, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SITE, TALENTS } from "@/lib/constants";

function ContactForm() {
  const searchParams  = useSearchParams();
  const defaultTalent = searchParams.get("talent") ?? "";

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(SITE.formspree.contact, {
        method: "POST",
        body: new FormData(e.currentTarget),
        headers: { Accept: "application/json" },
      });
      setStatus(res.ok ? "success" : "error");
      if (res.ok) formRef.current?.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-zinc-700 p-10 text-center">
        <div className="w-10 h-10 border border-red-500 flex items-center justify-center mx-auto mb-6">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-red-500" aria-hidden="true">
            <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="font-heading font-black text-xl text-white mb-3">送信が完了しました</h3>
        <p className="text-zinc-500 text-sm leading-relaxed">
          お問い合わせありがとうございます。<br />担当者より折り返しご連絡いたします。
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-8 text-xs text-red-500 hover:text-red-400 tracking-widest uppercase font-heading"
        >
          新しいお問い合わせ →
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="company" className="form-label">
            会社名 <span className="text-red-500">*</span>
          </label>
          <input id="company" name="company" type="text" required placeholder="株式会社〇〇" className="form-input" />
        </div>
        <div>
          <label htmlFor="name" className="form-label">
            担当者名 <span className="text-red-500">*</span>
          </label>
          <input id="name" name="name" type="text" required placeholder="山田 太郎" className="form-input" />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="form-label">
          メールアドレス <span className="text-red-500">*</span>
        </label>
        <input id="email" name="email" type="email" required placeholder="example@company.co.jp" className="form-input" />
      </div>

      <div>
        <label htmlFor="talent" className="form-label">希望タレント</label>
        <select id="talent" name="talent" defaultValue={defaultTalent} className="form-input bg-zinc-900">
          <option value="">選択してください（任意）</option>
          {TALENTS.map((t) => (
            <option key={t.id} value={t.name}>{t.name}（{t.categoryLabel}）</option>
          ))}
          <option value="未定">まだ決まっていない</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="form-label">
          依頼内容 <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message" name="message" required rows={6}
          placeholder="出演希望のイベント・番組概要、収録・開催日程、その他ご要望などをご記入ください。"
          className="form-input resize-none"
        />
      </div>

      {status === "error" && (
        <p className="text-xs text-red-400 border border-red-800/50 bg-red-950/30 px-4 py-3">
          送信に失敗しました。時間をおいて再度お試しください。
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? (
          <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" /><path d="M12 2a10 10 0 0110 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>送信中...</>
        ) : "送信する"}
      </button>
    </form>
  );
}

export default function ContactPage() {
  return (
    <>
      {/* ページヘッダー */}
      <div className="pt-36 pb-16 bg-zinc-950 border-b border-zinc-900">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <p className="section-label mb-4">Booking &amp; Contact</p>
          <h1 className="section-heading">出演依頼</h1>
          <p className="text-zinc-500 text-sm mt-4 max-w-sm leading-relaxed">
            タレントへの出演依頼・各種お問い合わせはこちらのフォームよりお送りください。
            担当者より折り返しご連絡いたします。
          </p>
        </div>
      </div>

      {/* フォームエリア */}
      <div className="bg-zinc-950 min-h-screen">
        <div className="max-w-2xl mx-auto px-6 lg:px-8 py-16 md:py-20">

          {/* 注意書き */}
          <div className="border-l-2 border-red-500 pl-5 mb-10 space-y-2">
            {[
              "回答は通常3〜5営業日以内を目安にご連絡いたします。",
              "出演の可否はスケジュール・条件等により検討させていただきます。",
              "いただいた個人情報はお問い合わせ対応のみに使用します。",
            ].map((text, i) => (
              <p key={i} className="text-xs text-zinc-500 leading-relaxed">{text}</p>
            ))}
          </div>

          <Suspense fallback={<div className="animate-pulse bg-zinc-900 h-96" />}>
            <ContactForm />
          </Suspense>
        </div>
      </div>
    </>
  );
}

"use client";

import { useState, useRef } from "react";
import { SITE, AUDITION, CATEGORY_LABELS } from "@/lib/constants";
import type { TalentCategory } from "@/lib/constants";

// ────────────────────────────────
// 選考フロー（ジャンルタブ）
// ────────────────────────────────
function FlowSection() {
  const [selected, setSelected] = useState<number>(0);
  const genre = AUDITION.genres[selected];
  const colClass =
    genre.flow.length === 3
      ? "grid sm:grid-cols-3 gap-px bg-zinc-800 max-w-3xl mx-auto"
      : "grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-800 max-w-4xl mx-auto";

  return (
    <section className="mb-20">
      <p className="section-label mb-4">Flow</p>
      <h2 className="section-heading mb-10">選考フロー</h2>

      {/* タブ */}
      <div className="flex gap-0 mb-10 border-b border-zinc-800">
        {AUDITION.genres.map((g, i) => (
          <button
            key={g.category}
            onClick={() => setSelected(i)}
            className={`px-6 py-3 text-xs font-bold tracking-widest uppercase font-heading transition-all duration-150 border-b-2 -mb-px ${
              selected === i
                ? "border-red-500 text-white"
                : "border-transparent text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {g.label}
          </button>
        ))}
      </div>

      {/* フロー */}
      <div className={colClass}>
        {genre.flow.map((step, i) => (
          <div key={i} className="bg-zinc-900 p-8 text-center">
            <p className="font-heading font-black text-4xl text-red-500/30 mb-4 leading-none">{step.step}</p>
            <h3 className="font-heading font-black text-lg text-white mb-3 tracking-tight">{step.label}</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ────────────────────────────────
// 応募フォーム
// ────────────────────────────────
function AuditionForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(SITE.formspree.audition, {
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
        <h3 className="font-heading font-black text-xl text-white mb-3">応募が完了しました！</h3>
        <p className="text-zinc-500 text-sm leading-relaxed">
          ご応募ありがとうございます。<br />書類選考後、結果をメールにてお知らせします。
        </p>
        <button onClick={() => setStatus("idle")} className="mt-8 text-xs text-red-500 hover:text-red-400 tracking-widest uppercase font-heading">
          新しい応募 →
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="applicant-name" className="form-label">お名前 <span className="text-red-500">*</span></label>
          <input id="applicant-name" name="name" type="text" required placeholder="山田 花子" className="form-input" />
        </div>
        <div>
          <label htmlFor="age" className="form-label">年齢 <span className="text-red-500">*</span></label>
          <input id="age" name="age" type="number" required min={10} max={60} placeholder="20" className="form-input" />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="form-label">メールアドレス <span className="text-red-500">*</span></label>
        <input id="email" name="email" type="email" required placeholder="example@email.com" className="form-input" />
      </div>

      <div>
        <label htmlFor="phone" className="form-label">電話番号</label>
        <input id="phone" name="phone" type="tel" placeholder="090-0000-0000" className="form-input" />
      </div>

      {/* 希望ジャンル */}
      <div>
        <label className="form-label">希望ジャンル <span className="text-red-500">*</span></label>
        <div className="grid grid-cols-3 gap-px bg-zinc-700">
          {(Object.entries(CATEGORY_LABELS) as [TalentCategory, string][]).map(([key, label]) => (
            <label key={key} className="relative flex cursor-pointer">
              <input type="radio" name="genre" value={label} required className="sr-only peer" />
              <span className="w-full text-center py-4 text-xs font-bold tracking-widest uppercase font-heading text-zinc-500 bg-zinc-900 transition-all duration-150 peer-checked:bg-red-600 peer-checked:text-white hover:bg-zinc-800 hover:text-zinc-300">
                {label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="pr" className="form-label">自己PR <span className="text-red-500">*</span></label>
        <textarea
          id="pr" name="pr" required rows={6}
          placeholder="志望動機・得意なことや特技、これまでの経験など、自由にご記入ください。"
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
        ) : "応募する"}
      </button>

      <p className="text-[11px] text-zinc-600 text-center leading-relaxed">
        ご応募いただいた個人情報は選考目的以外に使用しません。<br />
        未成年の方は保護者の同意を得た上でご応募ください。
      </p>
    </form>
  );
}

// ────────────────────────────────
// ページ
// ────────────────────────────────
export default function AuditionPage() {
  return (
    <>
      {/* ページヘッダー */}
      <div className="pt-36 pb-16 bg-zinc-950 border-b border-zinc-900">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <p className="section-label mb-4">Audition</p>
          <h1 className="section-heading">{AUDITION.title}</h1>
          <div className="w-8 h-px bg-red-500 mt-6 mb-6" />
          <p className="text-zinc-400 text-base font-light max-w-sm">{AUDITION.subtitle}</p>
          <p className="text-zinc-500 text-sm mt-3 max-w-md leading-relaxed">{AUDITION.description}</p>
        </div>
      </div>

      <div className="bg-zinc-950 min-h-screen">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-16 md:py-20">

          {/* 募集ジャンル */}
          <section className="mb-20">
            <p className="section-label mb-4">Genres</p>
            <h2 className="section-heading mb-10">募集ジャンル</h2>
            <div className="grid sm:grid-cols-3 gap-px bg-zinc-800">
              {AUDITION.genres.map((genre, i) => (
                <div key={genre.category} className="bg-zinc-900 p-8">
                  <p className="font-heading font-black text-5xl text-zinc-800 mb-4 leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="font-heading font-black text-2xl text-white mb-3 tracking-tight">
                    {genre.label}
                  </h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">{genre.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 応募資格 */}
          <section className="mb-20">
            <p className="section-label mb-4">Requirements</p>
            <h2 className="section-heading mb-10">応募資格</h2>
            <div className="border-l border-zinc-800 pl-8 space-y-5 max-w-xl">
              {AUDITION.requirements.map((req, i) => (
                <div key={i} className="flex items-start gap-4">
                  <span className="text-red-500 text-xs font-heading font-bold mt-0.5 shrink-0">—</span>
                  <p className="text-sm text-zinc-300 leading-relaxed">{req}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 選考フロー（タブ切り替え） */}
          <FlowSection />

          {/* 応募フォーム */}
          <section>
            <p className="section-label mb-4">Apply</p>
            <h2 className="section-heading mb-4">応募フォーム</h2>
            <p className="text-zinc-500 text-sm mb-10">下記フォームにご入力の上、ご応募ください。</p>
            <div className="max-w-2xl border border-zinc-800 p-8 md:p-10">
              <AuditionForm />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

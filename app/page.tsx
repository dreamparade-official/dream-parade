import Link from "next/link";
import { SITE, TALENTS, NEWS } from "@/lib/constants";
import TalentCard from "@/components/TalentCard";
import DpSymbolBackground from "@/components/DpSymbolBackground";

// ──────────────────────────────────────────────
// ヒーロー
// ──────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center bg-zinc-950 overflow-hidden">
      {/* 左端の縦ライン装飾 */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-red-500/30" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-20">
        {/* ラベル */}
        <p className="section-label mb-10 md:mb-14">
          TALENT AGENCY — {SITE.company}
        </p>

        {/* メイン見出し */}
        <h1 className="font-heading font-black text-[clamp(4rem,10vw,10rem)] text-white leading-none tracking-tighter">
          DREAM
          <br />
          <span className="text-red-500">PARADE</span>
        </h1>

        {/* 赤アクセントライン */}
        <div className="w-16 h-0.5 bg-red-500 mt-8 mb-8" />

        {/* サブコピー */}
        <p className="text-zinc-400 text-base md:text-lg max-w-sm leading-relaxed mb-12">
          {SITE.tagline}
          <br />
          {SITE.subTagline}
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/talents" className="btn-primary">
            タレントを見る
          </Link>
          <Link href="/contact" className="btn-outline">
            出演依頼をする
          </Link>
        </div>
      </div>

      {/* 右下のスクロール表示 */}
      <div className="absolute bottom-10 right-6 lg:right-8 flex flex-col items-center gap-2">
        <span className="text-[9px] tracking-widest3 uppercase text-zinc-600 font-heading writing-vertical">
          SCROLL
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-zinc-600 to-transparent" />
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────
// 事務所紹介
// ──────────────────────────────────────────────
function AboutSection() {
  const genres = [
    { num: "01", label: "お笑い", desc: "しゃべくり漫才・コント・ピン芸。笑いで場を盛り上げるエンターテイナー。" },
    { num: "02", label: "俳優",   desc: "ドラマ・映画・舞台。演技で感動を届けるパフォーマー。" },
    { num: "03", label: "アイドル", desc: "歌・ダンス・パフォーマンス。輝きでファンを魅了するアーティスト。" },
  ];

  return (
    <section className="py-24 md:py-36 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">

          {/* 左カラム */}
          <div>
            <p className="text-red-500 text-xs font-bold tracking-widest2 uppercase font-heading mb-6">
              About
            </p>
            <h2 className="section-heading-dark mb-8">
              DREAMPARADE
              <br />
              <span className="text-red-500">とは</span>
            </h2>
            <p className="text-zinc-600 text-sm leading-relaxed max-w-md">
              {SITE.description}
            </p>
            <Link href="/talents" className="btn-outline-dark mt-10 inline-flex">
              所属タレント一覧
            </Link>
          </div>

          {/* 右カラム：ジャンル */}
          <div className="space-y-0 divide-y divide-zinc-200">
            {genres.map(({ num, label, desc }) => (
              <div key={num} className="flex items-start gap-6 py-7 group">
                <span className="font-heading font-black text-3xl text-red-500/30 group-hover:text-red-500 transition-colors duration-200 leading-none shrink-0 mt-1">
                  {num}
                </span>
                <div>
                  <h3 className="font-heading font-black text-xl text-zinc-950 mb-1 leading-tight">
                    {label}
                  </h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────
// タレント（抜粋）
// ──────────────────────────────────────────────
function TalentsSection() {
  const featured = TALENTS.slice(0, 3);

  return (
    <section className="relative py-24 md:py-36 bg-zinc-950 overflow-hidden">
      <DpSymbolBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-end justify-between mb-14">
          <div>
            <p className="section-label mb-4">Talents</p>
            <h2 className="section-heading">所属タレント</h2>
          </div>
          <Link
            href="/talents"
            className="hidden sm:flex items-center gap-2 text-xs text-zinc-500 hover:text-white transition-colors duration-150 tracking-widest font-heading uppercase"
          >
            All Talents <span className="text-red-500">→</span>
          </Link>
        </div>

        {featured.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800">
            {featured.map((talent) => (
              <TalentCard key={talent.id} talent={talent} />
            ))}
          </div>
        ) : (
          <p className="text-zinc-600 text-sm py-20 text-center">タレント情報を準備中です</p>
        )}

        <div className="mt-8 sm:hidden">
          <Link href="/talents" className="btn-outline w-full justify-center">
            タレント一覧をすべて見る
          </Link>
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────
// お知らせ
// ──────────────────────────────────────────────
function NewsSection() {
  return (
    <section className="py-24 md:py-36 bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <p className="text-red-500 text-xs font-bold tracking-widest2 uppercase font-heading mb-4">News</p>
        <h2 className="section-heading-dark mb-14">お知らせ</h2>

        <ul className="divide-y divide-zinc-100">
          {NEWS.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8 py-5 group"
              >
                <time className="text-[11px] text-zinc-400 shrink-0 font-heading tracking-wider w-24">
                  {item.date}
                </time>
                <span className="text-[10px] font-bold text-red-500 tracking-widest shrink-0 font-heading uppercase">
                  {item.category}
                </span>
                <span className="text-sm text-zinc-700 group-hover:text-zinc-950 transition-colors duration-150 leading-relaxed">
                  {item.title}
                </span>
                <span className="hidden sm:block ml-auto text-[10px] text-zinc-300 group-hover:text-red-500 transition-colors duration-150 font-heading tracking-widest shrink-0">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────
// オーディション告知
// ──────────────────────────────────────────────
function AuditionBanner() {
  return (
    <section className="py-24 md:py-36 bg-zinc-950 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          <div>
            <p className="section-label mb-4">Audition</p>
            <h2 className="section-heading">
              タレント
              <br />
              オーディション<span className="text-red-500">募集中</span>
            </h2>
            <p className="text-zinc-500 text-sm mt-6 max-w-sm leading-relaxed">
              お笑い・俳優・アイドルを目指す方を随時募集しています。経験・未経験は問いません。
            </p>
          </div>
          <div className="shrink-0">
            <Link href="/audition" className="btn-primary text-sm px-10 py-5">
              オーディション詳細を見る
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────
// ページ
// ──────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <TalentsSection />
      <NewsSection />
      <AuditionBanner />
    </>
  );
}

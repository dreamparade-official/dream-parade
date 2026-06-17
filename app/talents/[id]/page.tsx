import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { TALENTS } from "@/lib/constants";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return TALENTS.map((t) => ({ id: t.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const talent = TALENTS.find((t) => t.id === id);
  if (!talent) return {};
  return { title: `${talent.name} | タレント`, description: talent.bio };
}

// SNS リンクボタン
function SnsLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex items-center gap-3 px-4 py-3 bg-zinc-900 border border-zinc-800 hover:border-red-500 text-zinc-400 hover:text-white text-xs font-bold tracking-wide font-heading uppercase transition-all duration-150"
    >
      {children}
    </a>
  );
}

const TwitterIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const InstagramIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);
const TikTokIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.52V6.75a4.85 4.85 0 01-1.02-.06z" />
  </svg>
);

export default async function TalentDetailPage({ params }: Props) {
  const { id } = await params;
  const talent = TALENTS.find((t) => t.id === id);
  if (!talent) notFound();

  return (
    <>
      {/* ページヘッダー */}
      <div className="pt-32 pb-16 bg-zinc-950 border-b border-zinc-900">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">

          {/* パンくず */}
          <nav className="flex items-center gap-2 text-[11px] text-zinc-600 mb-8 font-heading tracking-wide uppercase">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-zinc-800">/</span>
            <Link href="/talents" className="hover:text-white transition-colors">Talents</Link>
            <span className="text-zinc-800">/</span>
            <span className="text-zinc-400">{talent.name}</span>
          </nav>

          <div className="flex flex-col sm:flex-row items-start gap-8">
            {/* アバター */}
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-zinc-800 border border-zinc-700 flex items-center justify-center shrink-0">
              {talent.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={talent.imageUrl} alt={talent.name} className="w-full h-full object-cover" />
              ) : (
                <span className="font-heading font-black text-4xl text-zinc-600">{talent.name.charAt(0)}</span>
              )}
            </div>

            <div>
              {/* カテゴリ */}
              <p className="section-label mb-3">{talent.categoryLabel}</p>

              {/* 名前 */}
              <h1 className="font-heading font-black text-4xl md:text-5xl text-white tracking-tight leading-none">
                {talent.name}
              </h1>
              {talent.nameReading && (
                <p className="text-zinc-600 text-xs mt-2 tracking-widest">{talent.nameReading}</p>
              )}

              {/* メンバー（左右ラベル付き） */}
              {talent.members && (
                <div className="mt-5">
                  <p className="text-[10px] text-zinc-600 font-heading tracking-widest uppercase mb-2.5">
                    Members
                  </p>
                  <div className="flex gap-px">
                    {talent.members.map((m, i) => (
                      <div
                        key={i}
                        className="flex-1 border border-zinc-800 bg-zinc-900 px-4 py-3"
                      >
                        <p className="text-[9px] text-zinc-600 font-heading tracking-widest uppercase mb-1.5">
                          {i === 0 ? "左" : "右"}
                        </p>
                        <p className="text-sm text-white font-heading font-bold leading-tight">
                          {m}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="bg-zinc-950 min-h-screen">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-14 md:py-20">
          <div className="grid md:grid-cols-3 gap-12 md:gap-16">

            {/* 左：プロフィール＋YouTube */}
            <div className="md:col-span-2 space-y-12">

              {/* プロフィール */}
              <section>
                <p className="section-label mb-5">Profile</p>
                <div className="w-8 h-px bg-red-500 mb-6" />
                <p className="text-zinc-300 text-sm leading-relaxed">{talent.bio}</p>
              </section>

              {/* YouTube */}
              {talent.sns.youtubeEmbedUrl && (
                <section>
                  <p className="section-label mb-5">Video</p>
                  <div className="w-8 h-px bg-red-500 mb-6" />
                  <div className="aspect-video bg-zinc-900 border border-zinc-800">
                    <iframe
                      src={talent.sns.youtubeEmbedUrl}
                      title={`${talent.name} - YouTube`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                </section>
              )}
            </div>

            {/* 右：SNS・CTA */}
            <div className="space-y-8">

              {/* コンビ公式SNS */}
              {(talent.sns.instagramUrl || talent.sns.tiktokUrl || talent.sns.twitterUrl) && (
                <section>
                  <p className="section-label mb-4">{talent.members ? "Official SNS" : "SNS"}</p>
                  <div className="flex flex-col gap-1">
                    {talent.sns.twitterUrl   && <SnsLink href={talent.sns.twitterUrl}   label="Twitter"><TwitterIcon />X / Twitter</SnsLink>}
                    {talent.sns.instagramUrl && <SnsLink href={talent.sns.instagramUrl} label="Instagram"><InstagramIcon />Instagram</SnsLink>}
                    {talent.sns.tiktokUrl    && <SnsLink href={talent.sns.tiktokUrl}    label="TikTok"><TikTokIcon />TikTok</SnsLink>}
                  </div>
                </section>
              )}

              {/* メンバー個人SNS */}
              {talent.memberSns && talent.memberSns.length > 0 && (
                <section>
                  <p className="section-label mb-4">Member SNS</p>
                  <div className="space-y-4">
                    {talent.memberSns.map((member, i) => (
                      <div key={i}>
                        <p className="text-[10px] font-bold text-zinc-600 tracking-widest uppercase font-heading mb-1.5">
                          {member.name}
                        </p>
                        <div className="flex flex-col gap-1">
                          {member.twitterUrl   && <SnsLink href={member.twitterUrl}   label={`${member.name} Twitter`}><TwitterIcon />X / Twitter</SnsLink>}
                          {member.instagramUrl && <SnsLink href={member.instagramUrl} label={`${member.name} Instagram`}><InstagramIcon />Instagram</SnsLink>}
                          {member.tiktokUrl    && <SnsLink href={member.tiktokUrl}    label={`${member.name} TikTok`}><TikTokIcon />TikTok</SnsLink>}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* 出演依頼 */}
              <section className="border border-zinc-800 p-6">
                <p className="section-label mb-3">Booking</p>
                <p className="text-zinc-500 text-xs leading-relaxed mb-5">
                  {talent.name}への出演依頼は<br />フォームよりお問い合わせください
                </p>
                <Link
                  href={`/contact?talent=${encodeURIComponent(talent.name)}`}
                  className="btn-primary w-full justify-center"
                >
                  出演依頼をする
                </Link>
              </section>

              {/* 戻る */}
              <Link
                href="/talents"
                className="flex items-center gap-2 text-[11px] text-zinc-600 hover:text-white transition-colors duration-150 font-heading tracking-widest uppercase"
              >
                ← Back to Talents
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

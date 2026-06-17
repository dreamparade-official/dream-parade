import Link from "next/link";
import { type Talent } from "@/lib/constants";

interface TalentCardProps {
  talent: Talent;
}

const TwitterDot  = () => <span className="text-[9px] text-zinc-600 font-heading">X</span>;
const InstaDot    = () => <span className="text-[9px] text-zinc-600 font-heading">IG</span>;
const TikTokDot   = () => <span className="text-[9px] text-zinc-600 font-heading">TT</span>;
const YoutubeDot  = () => <span className="text-[9px] text-zinc-600 font-heading">YT</span>;

export default function TalentCard({ talent }: TalentCardProps) {
  return (
    <Link
      href={`/talents/${talent.id}`}
      className="group block bg-zinc-900 border border-zinc-800 hover:border-red-500 transition-colors duration-200"
    >
      {/* ── 縦長ポートレート写真エリア ── */}
      <div className="relative aspect-[3/4] bg-zinc-800 overflow-hidden">
        {talent.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={talent.imageUrl}
            alt={talent.name}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <span className="font-heading font-black text-[clamp(4rem,10vw,7rem)] text-zinc-700 leading-none tracking-tight">
              {talent.name.charAt(0)}
            </span>
            {talent.members && (
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 px-4">
                {talent.members.map((m, i) => (
                  <span key={i} className="text-[10px] tracking-widest text-zinc-600 font-heading uppercase">
                    {m}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* カテゴリバッジ */}
        <div className="absolute top-0 left-0 px-3 py-2 bg-zinc-950/80">
          <span className="text-[9px] font-black tracking-widest text-red-500 uppercase font-heading">
            {talent.categoryLabel}
          </span>
        </div>

        {/* ホバーオーバーレイ */}
        <div className="absolute inset-0 bg-red-950/0 group-hover:bg-red-950/15 transition-colors duration-300" />
      </div>

      {/* ── テキストエリア ── */}
      <div className="p-5 border-t border-zinc-800 group-hover:border-red-500/30 transition-colors duration-200">
        {/* 名前 */}
        <h3 className="font-heading font-black text-xl text-white tracking-tight leading-tight group-hover:text-red-400 transition-colors duration-200">
          {talent.name}
        </h3>
        {talent.nameReading && (
          <p className="text-[10px] text-zinc-600 mt-1 tracking-wider">{talent.nameReading}</p>
        )}

        {/* プロフィール */}
        <p className="text-xs text-zinc-500 mt-3 leading-relaxed line-clamp-3">
          {talent.bio}
        </p>

        {/* フッター：SNS + Profile → */}
        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {talent.sns.twitterUrl      && <TwitterDot />}
            {talent.sns.instagramUrl    && <InstaDot />}
            {talent.sns.tiktokUrl       && <TikTokDot />}
            {talent.sns.youtubeEmbedUrl && <YoutubeDot />}
          </div>
          <span className="text-[10px] text-zinc-600 tracking-widest font-heading group-hover:text-red-500 transition-colors duration-200">
            PROFILE →
          </span>
        </div>
      </div>
    </Link>
  );
}

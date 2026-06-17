"use client";

import { useState } from "react";
import { TALENTS, CATEGORY_LABELS, type TalentCategory } from "@/lib/constants";
import TalentCard from "@/components/TalentCard";

const ALL = "all" as const;
type FilterType = TalentCategory | typeof ALL;

export default function TalentsPage() {
  const [filter, setFilter] = useState<FilterType>(ALL);

  const filtered =
    filter === ALL ? TALENTS : TALENTS.filter((t) => t.category === filter);

  const filters: { key: FilterType; label: string; count: number }[] = [
    { key: ALL,      label: "ALL",                          count: TALENTS.length },
    { key: "comedy", label: CATEGORY_LABELS.comedy,         count: TALENTS.filter((t) => t.category === "comedy").length },
    { key: "actor",  label: CATEGORY_LABELS.actor,          count: TALENTS.filter((t) => t.category === "actor").length },
    { key: "idol",   label: CATEGORY_LABELS.idol,           count: TALENTS.filter((t) => t.category === "idol").length },
  ];

  return (
    <>
      {/* ページヘッダー */}
      <div className="pt-36 pb-16 bg-zinc-950 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="section-label mb-4">Talents</p>
          <h1 className="section-heading">所属タレント</h1>
          <p className="text-zinc-500 text-sm mt-4 max-w-sm leading-relaxed">
            DreamParadeに所属するタレントをご紹介します。
            出演依頼はお気軽にお問い合わせください。
          </p>
        </div>
      </div>

      {/* フィルタータブ */}
      <div className="bg-zinc-950 border-b border-zinc-800 sticky top-20 md:top-24 z-30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-0 overflow-x-auto">
            {filters.map(({ key, label, count }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`shrink-0 px-5 py-4 text-xs font-bold tracking-widest uppercase font-heading transition-all duration-150 border-b-2 ${
                  filter === key
                    ? "border-red-500 text-white"
                    : "border-transparent text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {label}
                <span className={`ml-2 text-[10px] ${filter === key ? "text-red-500" : "text-zinc-700"}`}>
                  {count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* グリッド */}
      <div className="bg-zinc-950 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 md:py-16">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800">
              {filtered.map((talent) => (
                <TalentCard key={talent.id} talent={talent} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <span className="font-heading font-black text-6xl text-zinc-800 mb-4">—</span>
              <p className="text-zinc-600 text-sm tracking-wide">該当するタレントが見つかりませんでした</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

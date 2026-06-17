import Link from "next/link";
import { SITE, NAV_LINKS } from "@/lib/constants";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-zinc-950">
      {/* 上部赤ライン */}
      <div className="h-px bg-red-500" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">

          {/* ロゴ＋説明 */}
          <div className="md:col-span-1">
            <Logo variant="white" size="sm" />
            <p className="mt-6 text-xs text-zinc-500 leading-relaxed max-w-xs">
              {SITE.description}
            </p>
          </div>

          {/* ナビ */}
          <div>
            <p className="text-[10px] font-bold tracking-widest3 uppercase text-zinc-600 mb-5 font-heading">
              Navigation
            </p>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-zinc-400 hover:text-white transition-colors duration-150 tracking-wide"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 会社情報 */}
          <div>
            <p className="text-[10px] font-bold tracking-widest3 uppercase text-zinc-600 mb-5 font-heading">
              Company
            </p>
            <p className="text-xs text-zinc-400">{SITE.company}</p>
            <p className="mt-2 text-[11px] text-zinc-600">Talent Agency</p>

            {/* 出演依頼ボタン */}
            <Link href="/contact" className="btn-primary mt-8 text-[11px] px-6 py-3 inline-flex">
              出演依頼・お問い合わせ
            </Link>
          </div>
        </div>

        {/* コピーライト */}
        <div className="mt-16 pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-zinc-700">
            &copy; {new Date().getFullYear()} {SITE.company}. All rights reserved.
          </p>
          <p className="text-[11px] text-zinc-700">{SITE.name}</p>
        </div>
      </div>
    </footer>
  );
}

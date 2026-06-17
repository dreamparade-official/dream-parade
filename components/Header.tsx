"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";
import Logo from "./Logo";

export default function Header() {
  const [isOpen, setIsOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-zinc-950 border-b border-zinc-800" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">

          {/* ロゴ */}
          <Logo variant="white" size="sm" />

          {/* デスクトップナビ */}
          <nav className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-bold tracking-widest uppercase text-zinc-400 hover:text-white transition-colors duration-150 font-heading"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="btn-primary text-[11px] px-6 py-3"
            >
              出演依頼
            </Link>
          </nav>

          {/* ハンバーガー（モバイル） */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-white"
            aria-label="メニューを開く"
          >
            <div className="w-5 flex flex-col gap-[5px]">
              <span className={`block h-px bg-current transition-all duration-300 ${isOpen ? "rotate-45 translate-y-[6px]" : ""}`} />
              <span className={`block h-px bg-current transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
              <span className={`block h-px bg-current transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* モバイルメニュー */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* オーバーレイ */}
        <div className="absolute inset-0 bg-zinc-950/90 backdrop-blur-sm" onClick={() => setIsOpen(false)} />

        {/* パネル */}
        <div className={`absolute top-0 right-0 h-full w-64 bg-zinc-950 border-l border-zinc-800 transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="p-8 pt-24 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-3 text-xs font-bold tracking-widest uppercase text-zinc-400 hover:text-white border-b border-zinc-800 transition-colors duration-150 font-heading"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-6">
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="btn-primary w-full justify-center"
              >
                出演依頼
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

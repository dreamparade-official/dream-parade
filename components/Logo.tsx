import Link from "next/link";

interface LogoProps {
  variant?: "default" | "white";
  size?: "sm" | "md" | "lg";
}

// シンボル SVG の基準 viewBox
const VW = 52;
const VH = 60;

// サイズ別設定
const SIZES = {
  sm: { symbolW: 36, dream: "text-[14px]", parade: "text-[18px]", gap: "gap-3"   },
  md: { symbolW: 33, dream: "text-[12px]", parade: "text-[16px]", gap: "gap-3"   },
  lg: { symbolW: 44, dream: "text-[16px]", parade: "text-[21px]", gap: "gap-4"   },
} as const;

// DP 組み合わせシンボルパス（fill-rule="evenodd"）
//   D の外形 ＋ P 形の穴（透過）を一つのパスで定義
//
//   D outer : M 1,1 L 13,1 C 56,1 56,59 13,59 L 1,59 Z
//     → 縦バー左端(x=1〜13) + 右側の大きな半円弧
//
//   P inner : M 13,8 C 38,8 38,32 13,32 Z
//     → 上半分に P 字形の穴（evenodd で背景が透けて見える）
const DP_PATH =
  "M 1,1 L 13,1 C 56,1 56,59 13,59 L 1,59 Z " +
  "M 13,8 C 38,8 38,32 13,32 Z";

export default function Logo({ variant = "default", size = "md" }: LogoProps) {
  const isWhite    = variant === "white";
  const { symbolW, dream, parade, gap } = SIZES[size];
  const symbolH    = Math.round((symbolW * VH) / VW);

  // ダーク背景 → DREAM:白 / PARADE:赤
  // ライト背景 → DREAM:ダークグレー / PARADE:赤
  const dreamColor  = isWhite ? "text-white"   : "text-zinc-700";
  const paradeColor = isWhite ? "text-red-500" : "text-red-600";

  return (
    <Link
      href="/"
      className={`group inline-flex items-center ${gap}`}
      aria-label="DreamParade ホームへ"
    >
      {/* ── DP シンボルマーク ── */}
      <svg
        width={symbolW}
        height={symbolH}
        viewBox={`0 0 ${VW} ${VH}`}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0 transition-opacity duration-200 group-hover:opacity-70"
      >
        <path
          fillRule="evenodd"
          d={DP_PATH}
          fill="#CC0000"
        />
      </svg>

      {/* ── ワードマーク（DREAM / PARADE 2段） ── */}
      <div className="flex flex-col leading-none gap-[3px]">
        <span
          className={`font-heading font-black ${dream} ${dreamColor} transition-opacity duration-200 group-hover:opacity-70`}
          style={{ letterSpacing: "0.18em" }}
        >
          DREAM
        </span>
        <span
          className={`font-heading font-black ${parade} ${paradeColor} transition-opacity duration-200 group-hover:opacity-70`}
          style={{ letterSpacing: "0.18em" }}
        >
          PARADE
        </span>
      </div>
    </Link>
  );
}

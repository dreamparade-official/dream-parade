import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-6">
      <div className="text-center">
        <p className="font-heading font-black text-[10rem] text-zinc-900 leading-none mb-0">
          404
        </p>
        <div className="w-8 h-px bg-red-500 mx-auto mb-6" />
        <h1 className="font-heading font-black text-xl text-white mb-3 tracking-tight">
          PAGE NOT FOUND
        </h1>
        <p className="text-zinc-500 text-sm mb-10 leading-relaxed">
          お探しのページは移動または削除された可能性があります。
        </p>
        <Link href="/" className="btn-primary inline-flex">
          トップページへ戻る
        </Link>
      </div>
    </div>
  );
}

import Link from "next/link";

export function PublicFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#05070a] px-6 py-8 text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 text-sm text-zinc-500 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-black uppercase tracking-[0.18em] text-zinc-300">
            Gradeline Supply Co.
          </p>
          <p className="mt-2">Built To Be Different.</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/shop"
            className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 font-bold text-zinc-300 transition hover:border-blue-300/40 hover:bg-blue-400/10 hover:text-white"
          >
            Shop
          </Link>
          <Link
            href="/custom-order"
            className="rounded-xl bg-blue-400 px-4 py-2 font-bold text-black transition hover:bg-blue-300"
          >
            Start Order
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default PublicFooter;

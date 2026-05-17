import Link from "next/link";
import Image from "next/image";

const publicLinks = [
  { label: "Home", href: "/" },
  { label: "Collections", href: "/collections" },
  { label: "Gallery", href: "/gallery" },
  { label: "Custom Order", href: "/custom-order" },
  { label: "Contact", href: "/contact" },
];

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#05070a]/95 px-4 py-3 text-white shadow-[0_18px_45px_rgba(0,0,0,0.26)] backdrop-blur-xl sm:px-6">
      <nav className="mx-auto flex max-w-7xl flex-col gap-4 rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.07),rgba(96,165,250,0.04))] px-4 py-4 md:flex-row md:items-center md:justify-between md:gap-6 md:px-5">
        <Link
          href="/"
          className="group flex w-fit items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300/70"
          aria-label="Gradeline Supply Co. home"
        >
          <Image
            src="/gradeline-logo.png"
            alt="Gradeline Supply Co. logo"
            width={1730}
            height={1870}
            className="h-10 w-auto object-contain transition group-hover:drop-shadow-[0_0_14px_rgba(96,165,250,0.35)] sm:h-11 md:h-12"
          />
          <div>
            <div className="text-lg font-black tracking-[0.18em] sm:text-xl">
              GRADELINE
            </div>
            <div className="text-xs tracking-[0.35em] text-blue-300">
              SUPPLY CO.
            </div>
          </div>
        </Link>

        <div className="grid gap-3 md:flex md:items-center md:justify-end">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-5 md:flex md:items-center md:gap-1">
            {publicLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-center text-sm font-bold text-zinc-300 transition hover:border-blue-300/40 hover:bg-blue-400/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300/70 md:border-transparent md:bg-transparent md:px-3"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden h-8 w-px bg-white/10 md:block" />

          <div className="grid gap-2 sm:grid-cols-[1fr_auto] md:flex md:items-center">
            <Link
              href="/shop"
              className="rounded-xl border border-blue-300/25 bg-blue-400/10 px-4 py-2 text-center text-sm font-bold text-blue-100 transition hover:border-blue-300/50 hover:bg-blue-400/15 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300/70"
            >
              Shop
            </Link>
            <Link
              href="/custom-order"
              className="rounded-xl bg-blue-400 px-5 py-2 text-center text-sm font-black text-black shadow-[0_0_24px_rgba(96,165,250,0.2)] transition hover:bg-blue-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-200"
            >
              Start Custom Order
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default PublicHeader;

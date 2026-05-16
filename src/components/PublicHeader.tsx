import Link from "next/link";

const publicLinks = [
  { label: "Home", href: "/" },
  { label: "Collections", href: "/collections" },
  { label: "Shop", href: "/shop" },
  { label: "Custom Orders", href: "/custom-order" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
  { label: "Admin", href: "/admin" },
];

export function PublicHeader() {
  return (
    <header className="bg-[#05070a] px-6 py-6 text-white">
      <nav className="mx-auto flex max-w-7xl flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 shadow-[0_18px_45px_rgba(0,0,0,0.28)] backdrop-blur md:flex-row md:items-center md:justify-between">
        <Link href="/" className="w-fit">
          <div className="text-xl font-black tracking-[0.18em]">GRADELINE</div>
          <div className="text-xs tracking-[0.35em] text-blue-300">
            SUPPLY CO.
          </div>
        </Link>

        <div className="flex gap-2 overflow-x-auto md:gap-5">
          {publicLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="min-w-max rounded-xl border border-transparent px-3 py-2 text-sm font-semibold text-zinc-300 transition hover:border-blue-300/40 hover:bg-blue-400/10 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}

export default PublicHeader;

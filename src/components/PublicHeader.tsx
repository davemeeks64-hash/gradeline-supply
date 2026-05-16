import Link from "next/link";
import Image from "next/image";

const publicLinks = [
  { label: "Home", href: "/" },
  { label: "Collections", href: "/collections" },
  { label: "Shop", href: "/shop" },
  { label: "Custom Orders", href: "/custom-order" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Admin", href: "/admin" },
];

export function PublicHeader() {
  return (
    <header className="bg-[#05070a] px-4 py-4 text-white sm:px-6 sm:py-5">
      <nav className="mx-auto flex max-w-7xl flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 shadow-[0_18px_45px_rgba(0,0,0,0.28)] backdrop-blur md:flex-row md:items-center md:justify-between md:px-5">
        <Link href="/" className="flex w-fit items-center gap-3">
          <Image
            src="/gradeline-logo.png"
            alt="Gradeline Supply Co. logo"
            width={1730}
            height={1870}
            className="h-10 w-auto object-contain sm:h-11 md:h-12"
          />
          <div>
            <div className="text-xl font-black tracking-[0.18em]">
              GRADELINE
            </div>
            <div className="text-xs tracking-[0.35em] text-blue-300">
              SUPPLY CO.
            </div>
          </div>
        </Link>

        <div className="flex gap-2 overflow-x-auto pb-1 md:gap-4 md:pb-0">
          {publicLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="min-w-max rounded-xl border border-transparent px-3 py-2 text-sm font-semibold text-zinc-300 transition hover:border-blue-300/40 hover:bg-blue-400/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300/70"
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

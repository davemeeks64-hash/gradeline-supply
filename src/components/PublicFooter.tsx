import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  { label: "Collections", href: "/collections" },
  { label: "Shop", href: "/shop" },
  { label: "Custom Orders", href: "/custom-order" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function PublicFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#05070a] px-4 py-8 text-white sm:px-6">
      <Image
        src="/images/backgrounds/gradeline-footer-workshop-texture-bg.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center opacity-[0.16]"
      />
      <div className="absolute inset-0 bg-[#05070a]/80" />
      <div className="relative mx-auto grid max-w-7xl gap-6 text-sm text-zinc-500 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="font-black uppercase tracking-[0.18em] text-zinc-300">
            Gradeline Supply Co.
          </p>
          <p className="mt-2">Built To Be Different.</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 font-bold text-zinc-300 transition hover:border-blue-300/40 hover:bg-blue-400/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300/70"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default PublicFooter;

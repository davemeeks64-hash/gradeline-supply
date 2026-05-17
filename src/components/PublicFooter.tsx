import Image from "next/image";
import Link from "next/link";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const collectionLinks = [
  { label: "Tumblers", href: "/shop?collection=tumblers" },
  { label: "Leather Goods", href: "/shop?collection=leather-goods" },
  { label: "Cutting Boards", href: "/shop?collection=cutting-boards" },
  { label: "Custom Signs", href: "/shop?collection=custom-signs" },
  { label: "Blue Collar Series", href: "/shop?collection=blue-collar-series" },
];

const socialLinks = ["Instagram", "Facebook", "TikTok"];

const linkClassName =
  "block rounded-lg px-1 py-1.5 text-sm font-semibold text-zinc-400 transition hover:text-blue-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300/70";

export function PublicFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#05070a] text-white">
      <Image
        src="/images/backgrounds/gradeline-footer-workshop-texture-bg.png"
        alt="Gradeline industrial workshop footer background"
        fill
        sizes="100vw"
        className="object-cover object-center opacity-[0.2]"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(96,165,250,0.18),transparent_32%),linear-gradient(to_bottom,rgba(5,7,10,0.86),rgba(5,7,10,0.97))]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/60 to-transparent" />
      <div className="absolute -left-20 top-10 h-56 w-56 rounded-full bg-blue-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-[1.25fr_0.8fr_0.9fr_1.1fr]">
          <section>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-blue-200">
              Gradeline Supply Co.
            </p>
            <h2 className="mt-4 text-2xl font-black text-white">
              Built To Be Different.
            </h2>
            <p className="mt-4 max-w-sm leading-7 text-zinc-400">
              Custom laser engraving, ready-made shop goods, business branding,
              and industrial-inspired products built with a clean, work-ready
              finish.
            </p>
            <div className="mt-5 h-2 w-20 bg-blue-400 shadow-[0_0_24px_rgba(96,165,250,0.75)]" />
          </section>

          <nav aria-label="Footer quick links">
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-200">
              Quick Links
            </h3>
            <div className="mt-4 grid gap-1">
              {quickLinks.map((link) => (
                <Link key={link.href} href={link.href} className={linkClassName}>
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          <nav aria-label="Footer collections">
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-200">
              Collections
            </h3>
            <div className="mt-4 grid gap-1">
              {collectionLinks.map((link) => (
                <Link key={link.href} href={link.href} className={linkClassName}>
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          <section className="rounded-3xl border border-blue-300/20 bg-blue-400/10 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
            <h3 className="text-sm font-bold uppercase tracking-widest text-blue-200">
              Custom Orders
            </h3>
            <p className="mt-3 leading-7 text-zinc-300">
              Have a logo, gift idea, sign concept, or one-off build in mind?
              Send the details and Gradeline will review the project.
            </p>
            <Link
              href="/custom-order"
              className="mt-5 inline-flex w-full justify-center rounded-xl bg-blue-400 px-5 py-3 text-center font-bold text-black transition hover:bg-blue-300 sm:w-auto"
            >
              Start Custom Order
            </Link>
          </section>
        </div>

        <div className="mt-8 flex flex-col gap-5 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-zinc-300">
              Social
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {socialLinks.map((social) => (
                <span
                  key={social}
                  className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-bold text-zinc-300"
                >
                  {social}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-zinc-500">
            <p>
              &copy; {new Date().getFullYear()} Gradeline Supply Co. All rights
              reserved.
            </p>
            <p className="mt-1 text-zinc-600">
              Custom engraving / shop-built goods / industrial roots
            </p>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10 bg-black/35 px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-xs font-bold uppercase tracking-widest text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
          <span>Premium laser engraving and small-batch products</span>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/collections"
              className="transition hover:text-blue-200"
            >
              Collections
            </Link>
            <Link href="/shop" className="transition hover:text-blue-200">
              Shop
            </Link>
            <Link href="/contact" className="transition hover:text-blue-200">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default PublicFooter;

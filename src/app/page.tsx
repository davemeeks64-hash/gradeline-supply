import Link from "next/link";
import Image from "next/image";
import PublicFooter from "@/components/PublicFooter";
import PublicHeader from "@/components/PublicHeader";

const collections = [
  {
    title: "Industrial & Blue Collar",
    text: "Blue Collar Bling, Union Pride, Blackout Series, shop tags, patches, tumblers, and trade-inspired gear.",
  },
  {
    title: "Home & Kitchen",
    text: "Cutting boards, charcuterie boards, serving boards, recipe boards, and custom kitchen gifts.",
  },
  {
    title: "Custom Gifts",
    text: "Family gifts, wedding pieces, holiday items, name signs, and memorial work.",
  },
  {
    title: "Business & Commercial",
    text: "Business logos, shop signs, equipment tags, industrial labels, and promotional products.",
  },
  {
    title: "Custom Works",
    text: "One-off projects, customer uploads, prototypes, and special requests.",
  },
];

export default function Home() {
  return (
    <>
      <PublicHeader />
      <main className="min-h-screen bg-[#05070a] text-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,139,196,0.28),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(80,80,80,0.28),_transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-6">
          <div className="grid gap-10 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <Image
                src="/gradeline-logo.png"
                alt="Gradeline Supply Co. logo"
                width={1730}
                height={1870}
                priority
                className="mb-6 h-24 w-auto object-contain md:h-32"
              />
              <p className="mb-4 inline-flex rounded-full border border-blue-300/30 bg-blue-400/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-blue-200">
                Custom Laser Engraving • Shop Built Goods
              </p>

              <h1 className="max-w-4xl text-5xl font-black leading-tight md:text-7xl">
                Built To Be Different.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
                Custom laser engraving, leatherwork, slate, acrylic,
                industrial-inspired products, cutting boards, business branding,
                and one-off custom fabrication.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/shop"
                  className="rounded-xl bg-blue-400 px-6 py-3 font-bold text-black"
                >
                  Shop Collections
                </Link>
                <button className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-bold text-white">
                  Start Custom Order
                </button>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 to-black p-6 shadow-2xl">
              <div className="rounded-2xl border border-blue-300/20 bg-blue-400/10 p-5">
                <p className="text-sm font-bold uppercase tracking-widest text-blue-200">
                  Gradeline Operating System
                </p>
                <h2 className="mt-3 text-3xl font-black">
                  Public site + shop backend.
                </h2>
                <p className="mt-4 text-zinc-300">
                  Orders, production, inventory, laser settings, pricing, and
                  customer records all in one place.
                </p>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                {["Orders", "Production", "Inventory", "Laser Settings"].map(
                  (item) => (
                    <div
                      key={item}
                      className="rounded-xl border border-white/10 bg-black/40 p-4 font-bold text-zinc-200"
                    >
                      {item}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
            Collections
          </p>
          <h2 className="mt-2 text-4xl font-black">
            Built for more than one lane.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection) => (
            <div
              key={collection.title}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-blue-300/40 hover:bg-white/[0.07]"
            >
              <h3 className="text-xl font-black">{collection.title}</h3>
              <p className="mt-3 leading-7 text-zinc-400">
                {collection.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-zinc-950 via-zinc-900 to-blue-950/40 p-8 md:p-10">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
            Custom Orders
          </p>

          <h2 className="mt-3 text-4xl font-black">Have an idea?</h2>

          <p className="mt-4 max-w-2xl text-zinc-300">
            Send the idea, photo, logo, name, phrase, or rough sketch.
            Gradeline can turn it into a real product, gift, sign, tag, or
            shop-built piece.
          </p>

          <button className="mt-7 rounded-xl bg-blue-400 px-6 py-3 font-bold text-black">
            Start Your Custom Order
          </button>
        </div>
      </section>

      </main>
      <PublicFooter />
    </>
  );
}

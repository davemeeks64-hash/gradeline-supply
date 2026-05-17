import Image from "next/image";
import Link from "next/link";
import PublicFooter from "@/components/PublicFooter";
import PublicHeader from "@/components/PublicHeader";

const collections = [
  {
    title: "Industrial & Blue Collar",
    href: "/shop?collection=industrial-blue-collar",
    description:
      "Rugged shop-built goods for trades, unions, crews, garages, and hard-working brands.",
    examples: [
      "Blue Collar Bling",
      "Union pride pieces",
      "Shop tags",
      "Leather patches",
    ],
    image: "/images/categories/gradeline-category-blue-collar-series.png",
  },
  {
    title: "Home & Kitchen",
    href: "/shop?collection=home-kitchen",
    description:
      "Warm, functional pieces built for kitchens, gifting, hosting, and daily use.",
    examples: [
      "Cutting boards",
      "Charcuterie boards",
      "Recipe boards",
      "Serving trays",
    ],
    image: "/images/categories/gradeline-category-cutting-boards.png",
  },
  {
    title: "Custom Gifts",
    href: "/shop?collection=custom-gifts",
    description:
      "Personalized keepsakes for milestones, families, holidays, weddings, and memorials.",
    examples: [
      "Name signs",
      "Wedding gifts",
      "Holiday items",
      "Memorial pieces",
    ],
    image: "/images/categories/gradeline-category-custom-orders.png",
  },
  {
    title: "Business & Commercial",
    href: "/shop?collection=business-commercial",
    description:
      "Branded products and signage for shops, crews, small businesses, and events.",
    examples: [
      "Logo signs",
      "Equipment tags",
      "Industrial labels",
      "Promotional products",
    ],
    image: "/images/categories/gradeline-category-custom-signs.png",
  },
  {
    title: "Custom Works",
    href: "/shop?collection=custom-works",
    description:
      "One-off requests, prototypes, uploaded designs, and special builds that need a custom path.",
    examples: [
      "Customer uploads",
      "Prototype pieces",
      "Special requests",
      "One-off fabrication",
    ],
    image: "/images/categories/gradeline-category-leather-goods.png",
  },
];

export default function CollectionsPage() {
  return (
    <>
      <PublicHeader />
      <main className="min-h-screen overflow-hidden bg-[#05070a] text-white">
      <section className="relative overflow-hidden px-4 py-12 sm:px-6 md:py-16">
        <Image
          src="/images/backgrounds/gradeline-about-workshop-background.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-25"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,139,196,0.28),_transparent_35%),linear-gradient(to_bottom,rgba(5,7,10,0.68),rgba(5,7,10,0.96))]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-blue-950/40 p-6 shadow-2xl md:p-10">
            <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
              Gradeline Supply Co.
            </p>
            <h1 className="mt-4 text-4xl font-black md:text-6xl">
              Collections
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-300">
              Shop-ready categories for custom engraving, business branding,
              home goods, gifts, and one-off builds.
            </p>
            <Link
              href="/"
              className="mt-8 inline-flex rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-bold text-white transition hover:border-blue-300/40 hover:bg-blue-400/10"
            >
              Back to Home
            </Link>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {collections.map((collection) => (
              <article
                key={collection.title}
                className="flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(145deg,rgba(24,31,38,0.72),rgba(7,9,12,0.96))] shadow-[0_18px_45px_rgba(0,0,0,0.28)] transition hover:border-blue-300/40 hover:bg-white/[0.07]"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-white/10 bg-black">
                  <Image
                    src={collection.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover object-center transition duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,7,10,0.34),transparent)]" />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="h-2 w-14 bg-blue-400 shadow-[0_0_18px_rgba(96,165,250,0.65)]" />
                  <h2 className="mt-5 text-2xl font-black">
                    {collection.title}
                  </h2>
                  <p className="mt-3 leading-7 text-zinc-400">
                    {collection.description}
                  </p>

                  <div className="mt-5 rounded-2xl border border-white/10 bg-black/30 p-4">
                    <p className="text-xs font-bold uppercase tracking-widest text-blue-300">
                      Example Products
                    </p>
                    <ul className="mt-3 grid gap-2 text-sm text-zinc-300">
                      {collection.examples.map((example) => (
                        <li key={example} className="flex items-center gap-3">
                          <span className="h-2 w-2 border border-blue-300 bg-blue-400" />
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={collection.href}
                    className="mt-auto rounded-xl bg-blue-400 px-5 py-3 text-center font-bold text-black transition hover:bg-blue-300"
                  >
                    View Products
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      </main>
      <PublicFooter />
    </>
  );
}

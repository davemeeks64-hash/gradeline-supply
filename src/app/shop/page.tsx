import Link from "next/link";
import PublicFooter from "@/components/PublicFooter";
import PublicHeader from "@/components/PublicHeader";

const collections = [
  "Industrial & Blue Collar",
  "Home & Kitchen",
  "Custom Gifts",
  "Business & Commercial",
  "Custom Works",
];

const products = [
  {
    productName: "Cow Tags - Blackout Set",
    collection: "Industrial & Blue Collar",
    material: "Brushed aluminum",
    startingPrice: "$12",
    description:
      "Ready-made industrial tags with a rugged blacked-out finish and engraved detail.",
  },
  {
    productName: "Blue Collar Keychains",
    collection: "Industrial & Blue Collar",
    material: "Leatherette",
    startingPrice: "$10",
    description:
      "Shop-ready keychains for trades, crews, unions, and hard-working brands.",
  },
  {
    productName: "Walnut Recipe Board",
    collection: "Home & Kitchen",
    material: "Walnut",
    startingPrice: "$64",
    description:
      "Warm kitchen display board ready for names, recipes, dates, or family details.",
  },
  {
    productName: "Slate Coaster Set",
    collection: "Custom Gifts",
    material: "Black slate",
    startingPrice: "$28",
    description:
      "Gift-ready slate set with a premium engraved look for homes, events, or keepsakes.",
  },
  {
    productName: "Shop Logo Display Sign",
    collection: "Business & Commercial",
    material: "Acrylic",
    startingPrice: "$85",
    description:
      "Counter or desk sign placeholder for business logos and branded displays.",
  },
  {
    productName: "Trade Motto Wall Plate",
    collection: "Custom Works",
    material: "Walnut plywood",
    startingPrice: "$38",
    description:
      "Ready-made wall piece that can be adapted for shop slogans or custom sayings.",
  },
];

export default function ShopPage() {
  return (
    <>
      <PublicHeader />
      <main className="min-h-screen bg-[#05070a] text-white">
      <section className="relative overflow-hidden px-6 py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,139,196,0.28),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(80,80,80,0.28),_transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-blue-950/40 p-8 shadow-2xl md:p-12">
            <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
              Gradeline Supply Co.
            </p>
            <h1 className="mt-4 text-4xl font-black md:text-6xl">
              Shop Gradeline
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-300">
              Browse demo ready-made products, collection ideas, and shop-built
              goods that can be requested, customized, or used as a starting
              point.
            </p>
            <Link
              href="/"
              className="mt-8 inline-flex rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-bold text-white transition hover:border-blue-300/40 hover:bg-blue-400/10"
            >
              Back to Home
            </Link>
          </div>

          <div className="mt-8 flex gap-2 overflow-x-auto rounded-3xl border border-white/10 bg-white/[0.04] p-3">
            {collections.map((collection, index) => (
              <button
                key={collection}
                className={[
                  "min-w-max rounded-xl border px-4 py-3 text-xs font-bold uppercase tracking-widest transition",
                  index === 0
                    ? "border-blue-300/50 bg-blue-400/10 text-blue-200"
                    : "border-white/10 bg-black/30 text-zinc-300 hover:border-blue-300/40 hover:bg-blue-400/10",
                ].join(" ")}
              >
                {collection}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <article
                key={product.productName}
                className="flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-[0_18px_45px_rgba(0,0,0,0.28)] transition hover:border-blue-300/40 hover:bg-white/[0.07]"
              >
                <div className="grid aspect-[4/3] place-items-center border-b border-white/10 bg-[linear-gradient(145deg,rgba(17,24,31,0.96),rgba(8,10,12,1)_58%,rgba(15,23,30,0.98))]">
                  <div className="grid h-20 w-20 place-items-center border border-blue-300/50 bg-blue-400/10 shadow-[0_0_28px_rgba(96,165,250,0.24)]">
                    <span className="h-8 w-8 border border-blue-300/70 bg-black/40" />
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-blue-300">
                    {product.collection}
                  </p>
                  <div className="mt-3 flex items-start justify-between gap-4">
                    <h2 className="text-2xl font-black">
                      {product.productName}
                    </h2>
                    <p className="shrink-0 text-xl font-black text-blue-200">
                      {product.startingPrice}
                    </p>
                  </div>
                  <p className="mt-2 text-sm font-bold uppercase tracking-widest text-zinc-500">
                    {product.material}
                  </p>
                  <p className="mt-4 leading-7 text-zinc-400">
                    {product.description}
                  </p>
                  <Link
                    href="/custom-order"
                    className="mt-auto rounded-xl bg-blue-400 px-5 py-3 text-center font-bold text-black transition hover:bg-blue-300"
                  >
                    Request This
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

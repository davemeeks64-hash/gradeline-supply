import Image from "next/image";
import Link from "next/link";
import PublicFooter from "@/components/PublicFooter";
import PublicHeader from "@/components/PublicHeader";

const collections = [
  {
    title: "Industrial & Blue Collar",
    href: "/shop?collection=industrial-blue-collar",
    text: "Trade-inspired goods, shop tags, patches, tumblers, cow tags, and rugged everyday pieces.",
    examples: "Cow tags / leather patches / blackout gear",
    image: "/images/categories/gradeline-category-blue-collar-series.png",
  },
  {
    title: "Home & Kitchen",
    href: "/shop?collection=home-kitchen",
    text: "Cutting boards, charcuterie boards, serving boards, recipe boards, and kitchen gifts.",
    examples: "Boards / trays / engraved keepsakes",
    image: "/images/categories/gradeline-category-cutting-boards.png",
  },
  {
    title: "Custom Gifts",
    href: "/shop?collection=custom-gifts",
    text: "Personal pieces for weddings, holidays, families, memorials, birthdays, and one-off ideas.",
    examples: "Name signs / photo gifts / keepsakes",
    image: "/images/categories/gradeline-category-custom-orders.png",
  },
  {
    title: "Business & Commercial",
    href: "/shop?collection=business-commercial",
    text: "Logo engraving, shop signage, equipment tags, promotional products, and branded goods.",
    examples: "Logo signs / tags / client gifts",
    image: "/images/categories/gradeline-category-custom-signs.png",
  },
  {
    title: "Custom Works",
    href: "/shop?collection=custom-works",
    text: "Customer uploads, special requests, prototypes, and pieces built around a specific idea.",
    examples: "Uploads / prototypes / special builds",
    image: "/images/categories/gradeline-category-leather-goods.png",
  },
];

const featuredProducts = [
  {
    name: "Cow Tags - Blackout Set",
    collection: "Industrial & Blue Collar",
    price: "From $12",
    material: "Brushed aluminum",
    text: "Ready-made rugged tag sets with a sharp engraved look for crews, shops, and blue-collar gifts.",
    image: "/images/products/gradeline-product-placeholder-leather-patch.png",
  },
  {
    name: "Walnut Recipe Board",
    collection: "Home & Kitchen",
    price: "From $64",
    material: "Walnut",
    text: "A warm display board for recipes, family names, dates, kitchen gifts, and personalized keepsakes.",
    image: "/images/products/gradeline-product-placeholder-cutting-board.png",
  },
  {
    name: "Shop Logo Display Sign",
    collection: "Business & Commercial",
    price: "From $85",
    material: "Acrylic",
    text: "A clean counter or wall display piece for logos, brands, offices, shops, and event tables.",
    image: "/images/products/gradeline-product-placeholder-layered-sign.png",
  },
];

const workflowSteps = [
  {
    title: "Send The Idea",
    text: "Share the product type, logo, photo, name, phrase, material direction, or rough sketch.",
  },
  {
    title: "Review & Mockup",
    text: "Gradeline checks the material, design path, pricing, and production fit before the work begins.",
  },
  {
    title: "Build & Finish",
    text: "The piece moves through engraving, cutting, finishing, packing, and pickup or shipping.",
  },
];

const galleryPreview = [
  {
    name: "Union Pride Patch Set",
    category: "Industrial & Blue Collar",
    material: "Leather",
    image: "/images/products/gradeline-product-placeholder-leather-patch.png",
  },
  {
    name: "Engraved Serving Board",
    category: "Home & Kitchen",
    material: "Walnut",
    image: "/images/products/gradeline-product-placeholder-cutting-board.png",
  },
  {
    name: "Business Counter Sign",
    category: "Business & Commercial",
    material: "Acrylic",
    image: "/images/products/gradeline-product-placeholder-layered-sign.png",
  },
  {
    name: "Custom Memorial Keepsake",
    category: "Custom Gifts",
    material: "Slate",
    image: "/images/categories/gradeline-category-custom-orders.png",
  },
];

export default function Home() {
  return (
    <>
      <PublicHeader />
      <main className="min-h-screen overflow-hidden bg-[#05070a] text-white">
        <section
          aria-label="Hero Banner"
          className="relative overflow-hidden border-b border-white/10"
        >
          <Image
            src="/images/hero/gradeline-homepage-hero-banner-v2.png"
            alt=""
            fill
            preload
            sizes="100vw"
            className="hidden object-cover object-[58%_center] md:block md:object-center"
          />
          <Image
            src="/images/hero/gradeline-mobile-homepage-banner.png"
            alt=""
            fill
            preload
            sizes="100vw"
            className="object-cover object-center md:hidden"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,7,10,0.82)_0%,rgba(5,7,10,0.54)_44%,rgba(5,7,10,0.14)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,7,10,0.2),rgba(5,7,10,0.03)_42%,rgba(5,7,10,0.66)_100%)]" />
          <div className="absolute inset-x-0 top-0 h-28 bg-[linear-gradient(to_bottom,rgba(96,165,250,0.2),transparent)]" />
          <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-blue-300/25 to-transparent" />

          <div className="relative mx-auto flex min-h-[460px] max-w-7xl items-center px-6 py-10 sm:min-h-[500px] md:min-h-[680px] md:py-16 lg:min-h-[720px] lg:py-20">
            <div className="max-w-2xl rounded-3xl border border-white/10 bg-black/25 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.26)] backdrop-blur-[2px] md:p-6 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none lg:backdrop-blur-none">
              <p className="mb-4 inline-flex rounded-full border border-blue-300/30 bg-blue-400/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-blue-200">
                Custom Laser Engraving / Shop Built Goods
              </p>

              <h1 className="max-w-xl text-4xl font-black leading-tight sm:text-5xl md:text-6xl">
                Built To Be Different.
              </h1>

              <p className="mt-5 max-w-xl text-base leading-8 text-zinc-200 md:text-lg">
                Premium laser engraving and small-batch shop-built products
                with industrial roots, clean finishes, and work-ready
                character.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/shop"
                  className="rounded-xl bg-blue-400 px-6 py-3 text-center font-bold text-black shadow-[0_0_28px_rgba(96,165,250,0.22)] transition hover:bg-blue-300"
                >
                  Shop Collections
                </Link>
                <Link
                  href="/custom-order"
                  className="rounded-xl border border-white/15 bg-white/10 px-6 py-3 text-center font-bold text-white transition hover:border-blue-300/40 hover:bg-blue-400/10"
                >
                  Start Custom Order
                </Link>
                <Link
                  href="/gallery"
                  className="rounded-xl border border-blue-300/30 bg-black/30 px-6 py-3 text-center font-bold text-blue-100 transition hover:border-blue-300/60 hover:bg-blue-400/10"
                >
                  View Gallery
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="relative mx-auto max-w-7xl px-6 pt-10 pb-10 md:pt-14 md:pb-14">
          <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/35 to-transparent" />
          <div className="absolute left-1/2 top-0 h-32 w-2/3 -translate-x-1/2 bg-blue-400/5 blur-3xl" />

          <div className="relative mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
                Featured Categories
              </p>
              <h2 className="mt-2 max-w-2xl text-3xl font-black md:text-4xl">
                Made for work, home, gifts, and brands.
              </h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap md:justify-end">
              <Link
                href="/shop"
                className="rounded-xl bg-blue-400 px-5 py-3 text-center font-bold text-black transition hover:bg-blue-300"
              >
                Shop Collections
              </Link>
              <Link
                href="/custom-order"
                className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-center font-bold text-white transition hover:border-blue-300/40 hover:bg-blue-400/10"
              >
                Start Custom Order
              </Link>
              <Link
                href="/gallery"
                className="rounded-xl border border-blue-300/30 bg-blue-400/10 px-5 py-3 text-center font-bold text-blue-100 transition hover:bg-blue-400/20"
              >
                View Gallery
              </Link>
            </div>
          </div>

          <div className="relative grid items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3">
            {collections.map((collection) => (
              <Link
                key={collection.title}
                href={collection.href}
                className="group relative flex h-full min-h-[360px] overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(145deg,rgba(27,36,45,0.78),rgba(6,8,11,0.98))] p-6 shadow-[0_18px_45px_rgba(0,0,0,0.24)] transition hover:-translate-y-1 hover:border-blue-300/40 hover:shadow-[0_24px_60px_rgba(0,0,0,0.36)] md:min-h-[380px]"
              >
                <Image
                  src={collection.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover object-center opacity-[0.48] transition duration-500 group-hover:scale-105 group-hover:opacity-[0.62]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,7,10,0.96),rgba(5,7,10,0.62)_52%,rgba(5,7,10,0.18))]" />
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/50 to-transparent opacity-0 transition group-hover:opacity-100" />
                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-400/10 blur-3xl transition group-hover:bg-blue-400/15" />
                <div className="relative mt-auto flex min-h-full flex-col justify-end">
                  <div className="h-2 w-14 bg-blue-400 shadow-[0_0_18px_rgba(96,165,250,0.65)]" />
                  <h3 className="mt-5 text-xl font-black">
                    {collection.title}
                  </h3>
                  <p className="mt-3 leading-7 text-zinc-300">
                    {collection.text}
                  </p>
                  <p className="mt-6 border-t border-white/10 pt-4 text-xs font-bold uppercase tracking-widest text-blue-200">
                    {collection.examples}
                  </p>
                  <span className="mt-5 inline-flex w-fit rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-white transition group-hover:border-blue-300/50 group-hover:bg-blue-400/15">
                    View Products
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-10 md:py-14">
          <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
                Featured Products
              </p>
              <h2 className="mt-2 text-3xl font-black md:text-4xl">
                Ready-made pieces with a custom-shop feel.
              </h2>
            </div>
            <Link
              href="/shop"
              className="w-fit rounded-xl bg-blue-400 px-5 py-3 font-bold text-black transition hover:bg-blue-300"
            >
              Shop Collections
            </Link>
          </div>

          <div className="grid items-stretch gap-5 md:grid-cols-3">
            {featuredProducts.map((product) => (
              <article
                key={product.name}
                className="flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-[0_18px_45px_rgba(0,0,0,0.28)] transition hover:border-blue-300/40 hover:bg-white/[0.07]"
              >
                <div className="relative aspect-[16/11] w-full overflow-hidden border-b border-white/10 bg-black">
                  <Image
                    src={product.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover object-center transition duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,7,10,0.22),transparent)]" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-blue-300">
                    {product.collection}
                  </p>
                  <h3 className="mt-3 text-2xl font-black">{product.name}</h3>
                  <p className="mt-2 text-sm font-bold uppercase tracking-widest text-zinc-500">
                    {product.material}
                  </p>
                  <p className="mt-4 flex-1 leading-7 text-zinc-400">
                    {product.text}
                  </p>
                  <p className="mt-4 text-xl font-black text-blue-200">
                    {product.price}
                  </p>
                  <Link
                    href="/shop"
                    className="mt-auto rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-center font-bold text-white transition hover:border-blue-300/40 hover:bg-blue-400/10"
                  >
                    Request This
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-10 md:py-14">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(120deg,rgba(7,10,13,1),rgba(18,27,35,0.96),rgba(8,17,27,0.92))] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.36)] md:p-8">
            <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
                  How It Works
                </p>
                <h2 className="mt-3 text-3xl font-black md:text-4xl">
                  A clear path from rough idea to finished piece.
                </h2>
                <p className="mt-4 leading-8 text-zinc-300">
                  Custom work stays simple and practical. Send the idea,
                  approve the direction, and Gradeline handles the build with a
                  clean shop-ready process.
                </p>
              </div>

              <div className="grid gap-5">
                <div className="relative min-h-[220px] overflow-hidden rounded-2xl border border-white/10 md:min-h-[280px]">
                  <Image
                    src="/images/workflow/gradeline-custom-order-workflow.png"
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,7,10,0.72),rgba(5,7,10,0.1))]" />
                </div>
                <div className="grid items-stretch gap-5 md:grid-cols-3">
                  {workflowSteps.map((step, index) => (
                    <article
                      key={step.title}
                      className="h-full rounded-2xl border border-white/10 bg-black/30 p-5"
                    >
                      <p className="text-sm font-black text-blue-300">
                        Step {index + 1}
                      </p>
                      <h3 className="mt-3 text-xl font-black">{step.title}</h3>
                      <p className="mt-3 leading-7 text-zinc-400">{step.text}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-10 md:py-14">
          <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
                Gallery Preview
              </p>
              <h2 className="mt-2 text-3xl font-black md:text-4xl">
                A look at the kind of work Gradeline builds.
              </h2>
            </div>
            <Link
              href="/gallery"
              className="w-fit rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-bold text-white transition hover:border-blue-300/40 hover:bg-blue-400/10"
            >
              View Gallery
            </Link>
          </div>

          <div className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {galleryPreview.map((item) => (
              <article
                key={item.name}
                className="h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] transition hover:border-blue-300/40 hover:bg-white/[0.07]"
              >
                <div className="relative aspect-square w-full overflow-hidden border-b border-white/10 bg-black">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover object-center transition duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,7,10,0.3),transparent)]" />
                </div>
                <div className="p-5">
                  <p className="text-xs font-bold uppercase tracking-widest text-blue-300">
                    {item.category}
                  </p>
                  <h3 className="mt-3 text-lg font-black">{item.name}</h3>
                  <p className="mt-2 text-sm font-bold uppercase tracking-widest text-zinc-500">
                    {item.material}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-10 pb-16 md:py-14 md:pb-20">
          <div className="relative overflow-hidden rounded-3xl border border-blue-300/20 bg-[linear-gradient(135deg,rgba(12,19,26,1),rgba(7,9,12,1)_58%,rgba(20,43,61,0.72))] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.4)] md:p-10">
            <Image
              src="/images/workflow/gradeline-footer-cta-banner.png"
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-center opacity-[0.34]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,7,10,0.92),rgba(5,7,10,0.72),rgba(5,7,10,0.36))]" />
            <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/70 to-transparent" />
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-400/10 blur-3xl" />
            <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
                  Custom Orders
                </p>
                <h2 className="mt-3 max-w-3xl text-3xl font-black md:text-5xl">
                  Have an idea that does not fit a shelf?
                </h2>
                <p className="mt-4 max-w-2xl leading-8 text-zinc-300">
                  Send the idea, photo, logo, name, phrase, or rough sketch.
                  Gradeline can turn it into a product, gift, sign, tag, or
                  shop-built piece.
                </p>
              </div>

              <Link
                href="/custom-order"
                className="inline-flex w-fit rounded-xl bg-blue-400 px-6 py-3 font-bold text-black transition hover:bg-blue-300"
              >
                Start Custom Order
              </Link>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </>
  );
}

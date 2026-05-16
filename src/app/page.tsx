import Image from "next/image";
import Link from "next/link";
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

const featuredProducts = [
  {
    name: "Cow Tags - Blackout Set",
    collection: "Industrial & Blue Collar",
    price: "From $12",
    material: "Brushed aluminum",
  },
  {
    name: "Walnut Recipe Board",
    collection: "Home & Kitchen",
    price: "From $64",
    material: "Walnut",
  },
  {
    name: "Shop Logo Display Sign",
    collection: "Business & Commercial",
    price: "From $85",
    material: "Acrylic",
  },
];

const workflowSteps = [
  {
    title: "Send The Idea",
    text: "Share the product type, logo, photo, name, phrase, or rough sketch.",
  },
  {
    title: "Review & Mockup",
    text: "Gradeline checks the material, design path, pricing, and production fit.",
  },
  {
    title: "Build & Finish",
    text: "The piece moves through engraving, cutting, finishing, packing, and pickup or shipping.",
  },
];

const systemLinks = [
  { label: "Shop", href: "/shop" },
  { label: "Custom Orders", href: "/custom-order" },
  { label: "Gallery", href: "/gallery" },
  { label: "Admin", href: "/admin" },
];

const quickStats = [
  { label: "Active Orders", value: "24", detail: "In the shop queue" },
  { label: "Projects This Week", value: "18", detail: "Custom and stock runs" },
  { label: "Inventory Items", value: "128", detail: "Materials tracked" },
  { label: "Completed Orders", value: "31", detail: "Finished this month" },
  { label: "Ready-Made Stock", value: "72", detail: "Available to request" },
  { label: "Estimated Revenue", value: "$12.8K", detail: "Demo monthly view" },
];

export default function Home() {
  return (
    <>
      <PublicHeader />
      <main className="min-h-screen bg-[#05070a] text-white">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,139,196,0.28),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(80,80,80,0.28),_transparent_35%)]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-[linear-gradient(to_top,rgba(5,7,10,1),transparent)]" />

          <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-20">
            <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
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
                  Custom Laser Engraving / Shop Built Goods
                </p>

                <h1 className="max-w-4xl text-5xl font-black leading-tight md:text-7xl">
                  Built To Be Different.
                </h1>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
                  Custom laser engraving, leatherwork, slate, acrylic,
                  industrial-inspired products, cutting boards, business
                  branding, and one-off custom fabrication.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/shop"
                    className="rounded-xl bg-blue-400 px-6 py-3 font-bold text-black transition hover:bg-blue-300"
                  >
                    Shop Collections
                  </Link>
                  <Link
                    href="/custom-order"
                    className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-bold text-white transition hover:border-blue-300/40 hover:bg-blue-400/10"
                  >
                    Start Custom Order
                  </Link>
                </div>

                <div className="mt-8 grid gap-3 text-sm sm:grid-cols-3">
                  {["Custom work", "Ready-made goods", "Business branding"].map(
                    (item) => (
                      <div
                        key={item}
                        className="border border-white/10 bg-black/30 px-4 py-3 font-bold uppercase tracking-widest text-zinc-300"
                      >
                        {item}
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 to-black p-6 shadow-2xl">
                <div className="rounded-2xl border border-blue-300/20 bg-blue-400/10 p-5">
                  <p className="text-sm font-bold uppercase tracking-widest text-blue-200">
                    Gradeline Operating System
                  </p>
                  <h2 className="mt-3 text-3xl font-black">
                    Public shop + custom order workflow.
                  </h2>
                  <p className="mt-4 text-zinc-300">
                    Browse ready-made products, request custom work, and keep
                    orders moving from idea to finished piece.
                  </p>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  {systemLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-xl border border-white/10 bg-black/40 p-4 font-bold text-zinc-200"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-10">
          <div className="mb-6">
            <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
              Quick Stats
            </p>
            <h2 className="mt-2 text-3xl font-black md:text-4xl">
              Shop momentum at a glance.
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {quickStats.map((stat) => (
              <article
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-[linear-gradient(145deg,rgba(24,31,38,0.82),rgba(8,10,12,0.96))] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.28)] transition hover:border-blue-300/40 hover:shadow-[0_0_34px_rgba(96,165,250,0.12)]"
              >
                <div className="h-2 w-10 bg-blue-400 shadow-[0_0_18px_rgba(96,165,250,0.65)]" />
                <p className="mt-4 text-xs font-bold uppercase tracking-widest text-blue-300">
                  {stat.label}
                </p>
                <p className="mt-3 text-3xl font-black text-white">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  {stat.detail}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-14">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
                Featured Collections
              </p>
              <h2 className="mt-2 text-4xl font-black">
                Built for more than one lane.
              </h2>
            </div>
            <Link
              href="/collections"
              className="w-fit rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-bold text-white transition hover:border-blue-300/40 hover:bg-blue-400/10"
            >
              View Collections
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {collections.map((collection) => (
              <article
                key={collection.title}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-blue-300/40 hover:bg-white/[0.07]"
              >
                <div className="h-2 w-14 bg-blue-400 shadow-[0_0_18px_rgba(96,165,250,0.65)]" />
                <h3 className="mt-5 text-xl font-black">
                  {collection.title}
                </h3>
                <p className="mt-3 leading-7 text-zinc-400">
                  {collection.text}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-14">
          <div className="mb-8">
            <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
              Featured Products
            </p>
            <h2 className="mt-2 text-4xl font-black">
              Ready-made products, built ahead.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {featuredProducts.map((product) => (
              <article
                key={product.name}
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
                  <h3 className="mt-3 text-2xl font-black">{product.name}</h3>
                  <p className="mt-2 text-sm font-bold uppercase tracking-widest text-zinc-500">
                    {product.material}
                  </p>
                  <p className="mt-4 text-xl font-black text-blue-200">
                    {product.price}
                  </p>
                  <Link
                    href="/shop"
                    className="mt-6 rounded-xl bg-blue-400 px-5 py-3 text-center font-bold text-black transition hover:bg-blue-300"
                  >
                    View Product
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-14">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-zinc-950 via-zinc-900 to-blue-950/40 p-8 md:p-10">
            <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
              How It Works
            </p>
            <h2 className="mt-3 text-4xl font-black">
              A clear path from idea to finished piece.
            </h2>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {workflowSteps.map((step, index) => (
                <article
                  key={step.title}
                  className="rounded-2xl border border-white/10 bg-black/30 p-5"
                >
                  <p className="text-sm font-black text-blue-300">
                    Step {index + 1}
                  </p>
                  <h3 className="mt-3 text-2xl font-black">{step.title}</h3>
                  <p className="mt-3 leading-7 text-zinc-400">{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-14">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-[0_18px_45px_rgba(0,0,0,0.28)]">
              <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
                Customer Workflow
              </p>
              <h2 className="mt-3 text-4xl font-black">
                Custom orders stay practical.
              </h2>
              <p className="mt-4 leading-8 text-zinc-300">
                Gradeline keeps the process simple: send the request, review the
                mockup, approve the direction, and get a finished piece built
                for the job.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/gallery"
                  className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-bold text-white transition hover:border-blue-300/40 hover:bg-blue-400/10"
                >
                  View Gallery
                </Link>
                <Link
                  href="/contact"
                  className="rounded-xl bg-blue-400 px-5 py-3 font-bold text-black transition hover:bg-blue-300"
                >
                  Contact Gradeline
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/30 p-8">
              <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
                Review Placeholder
              </p>
              <blockquote className="mt-4 text-2xl font-black leading-10 text-white">
                &ldquo;The finished piece looked professional, rugged, and exactly
                like the idea we had in mind.&rdquo;
              </blockquote>
              <p className="mt-5 text-sm font-bold uppercase tracking-widest text-zinc-500">
                Future customer review
              </p>
            </div>
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

            <Link
              href="/custom-order"
              className="mt-7 inline-flex rounded-xl bg-blue-400 px-6 py-3 font-bold text-black transition hover:bg-blue-300"
            >
              Start Your Custom Order
            </Link>
          </div>
        </section>
      </main>
      <PublicFooter />
    </>
  );
}

import Image from "next/image";
import Link from "next/link";
import PublicFooter from "@/components/PublicFooter";
import PublicHeader from "@/components/PublicHeader";
import GradelineImageCard from "@/components/public/GradelineImageCard";

const categories = [
  "Tumblers",
  "Leather",
  "Cutting Boards",
  "Signs",
  "Custom Work",
];

const galleryProjects = [
  {
    projectName: "Shop Tumbler Batch",
    category: "Tumblers",
    material: "Powder-coated drinkware",
    description:
      "Ready-made drinkware direction for crews, business gifts, events, and everyday carry.",
    image: "/images/products/gradeline-product-placeholder-tumbler.png",
  },
  {
    projectName: "Branded Leather Patch Run",
    category: "Leather",
    material: "Leatherette",
    description:
      "Clean engraved patches for hats, jackets, shop gear, and blue-collar branded pieces.",
    image: "/images/products/gradeline-product-placeholder-leather-patch.png",
  },
  {
    projectName: "Walnut Recipe Board",
    category: "Cutting Boards",
    material: "Walnut",
    description:
      "Warm kitchen display piece for handwritten recipes, family names, dates, and gifts.",
    image: "/images/products/gradeline-product-placeholder-cutting-board.png",
  },
  {
    projectName: "Shop Counter Logo",
    category: "Signs",
    material: "Layered acrylic",
    description:
      "Layered business signage for front desks, shops, booths, offices, and branded displays.",
    image: "/images/products/gradeline-product-placeholder-layered-sign.png",
  },
  {
    projectName: "Blue Collar Series Tags",
    category: "Custom Work",
    material: "Industrial-inspired blanks",
    description:
      "Trade-inspired tags, serialized pieces, and rugged keepsakes built around a specific idea.",
    image: "/images/categories/gradeline-category-blue-collar-series.png",
  },
  {
    projectName: "Custom Order Concept",
    category: "Custom Work",
    material: "Mixed material",
    description:
      "Upload-driven requests, prototypes, memorial gifts, special signage, and one-off builds.",
    image: "/images/categories/gradeline-category-custom-orders.png",
  },
];

export default function GalleryPage() {
  return (
    <>
      <PublicHeader />
      <main className="min-h-[100svh] overflow-hidden bg-[#05070a] text-white">
      <section className="relative overflow-hidden px-4 py-10 sm:px-6 md:py-16">
        <Image
          src="/images/workflow/gradeline-gallery-section-banner.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-[0.35]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,139,196,0.24),_transparent_35%),linear-gradient(to_bottom,rgba(5,7,10,0.66),rgba(5,7,10,0.96))]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-blue-950/40 p-6 shadow-2xl md:p-10">
            <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
              Gradeline Supply Co.
            </p>
            <h1 className="mt-4 text-3xl font-black sm:text-4xl md:text-6xl">
              Gallery
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-300">
              A visual preview of Gradeline product directions, category
              styles, and custom engraving possibilities.
            </p>
            <Link
              href="/"
              className="mt-8 inline-flex w-full justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-bold text-white transition hover:border-blue-300/40 hover:bg-blue-400/10 sm:w-auto"
            >
              Back to Home
            </Link>
          </div>

          <div className="mt-8 flex gap-2 overflow-x-auto rounded-3xl border border-white/10 bg-white/[0.04] p-3">
            {categories.map((category, index) => (
              <button
                key={category}
                className={[
                  "min-w-max rounded-xl border px-4 py-3 text-xs font-bold uppercase tracking-widest transition",
                  index === 0
                    ? "border-blue-300/50 bg-blue-400/10 text-blue-200"
                    : "border-white/10 bg-black/30 text-zinc-300 hover:border-blue-300/40 hover:bg-blue-400/10",
                ].join(" ")}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="mt-8 grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3">
            {galleryProjects.map((project) => (
              <GradelineImageCard
                key={project.projectName}
                imageSrc={project.image}
                aspect="product"
                sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                overlayClassName="bg-[linear-gradient(to_top,rgba(5,7,10,0.28),transparent)]"
              >
                <p className="text-xs font-bold uppercase tracking-widest text-blue-300">
                  {project.category}
                </p>
                <h2 className="mt-3 text-2xl font-black">
                  {project.projectName}
                </h2>
                <p className="mt-2 text-sm font-bold uppercase tracking-widest text-zinc-500">
                  {project.material}
                </p>
                <p className="mt-4 flex-1 leading-7 text-zinc-400">
                  {project.description}
                </p>
                <Link
                  href="/custom-order"
                  className="mt-auto inline-flex w-full justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-center font-bold text-white transition hover:border-blue-300/40 hover:bg-blue-400/10"
                >
                  Request Similar
                </Link>
              </GradelineImageCard>
            ))}
          </div>

          <section className="relative mt-8 overflow-hidden rounded-3xl border border-blue-300/20 bg-[linear-gradient(135deg,rgba(12,19,26,1),rgba(7,9,12,1)_58%,rgba(20,43,61,0.72))] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.4)] md:p-10">
            <Image
              src="/images/workflow/gradeline-gallery-section-banner.png"
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-center opacity-[0.22]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,7,10,0.92),rgba(5,7,10,0.72),rgba(5,7,10,0.36))]" />
            <div className="relative grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
                  Custom Work
                </p>
                <h2 className="mt-3 text-2xl font-black sm:text-3xl md:text-5xl">
                  Want something custom?
                </h2>
                <p className="mt-4 max-w-2xl leading-8 text-zinc-300">
                  Send the idea, logo, sketch, product direction, or inspiration
                  and Gradeline can help shape it into a finished piece.
                </p>
              </div>
              <Link
                href="/custom-order"
                className="inline-flex w-full justify-center rounded-xl bg-blue-400 px-6 py-3 font-bold text-black transition hover:bg-blue-300 sm:w-fit"
              >
                Start Custom Order
              </Link>
            </div>
          </section>
        </div>
      </section>
      </main>
      <PublicFooter />
    </>
  );
}

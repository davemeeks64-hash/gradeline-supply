import Image from "next/image";
import Link from "next/link";
import PublicFooter from "@/components/PublicFooter";
import PublicHeader from "@/components/PublicHeader";

const categories = [
  "Industrial & Blue Collar",
  "Home & Kitchen",
  "Custom Gifts",
  "Business & Commercial",
  "Custom Works",
];

const galleryProjects = [
  {
    projectName: "Union Pride Slate Awards",
    category: "Industrial & Blue Collar",
    material: "Black slate",
    description:
      "Steel-blue engraved award set with trade-inspired badge details.",
    image: "/images/categories/gradeline-category-blue-collar-series.png",
  },
  {
    projectName: "Walnut Recipe Board",
    category: "Home & Kitchen",
    material: "Walnut",
    description:
      "Handwritten family recipe engraved into a warm kitchen display piece.",
    image: "/images/products/gradeline-product-placeholder-cutting-board.png",
  },
  {
    projectName: "Wedding Keepsake Sign",
    category: "Custom Gifts",
    material: "Birch plywood",
    description:
      "Personalized name and date sign with clean, gift-ready finishing.",
    image: "/images/categories/gradeline-category-custom-orders.png",
  },
  {
    projectName: "Shop Counter Logo",
    category: "Business & Commercial",
    material: "Acrylic",
    description:
      "Layered acrylic counter sign built for a small business front desk.",
    image: "/images/products/gradeline-product-placeholder-layered-sign.png",
  },
  {
    projectName: "Prototype Equipment Tags",
    category: "Custom Works",
    material: "Brushed aluminum",
    description:
      "One-off serialized tags for a field-test equipment labeling run.",
    image: "/images/categories/gradeline-category-custom-signs.png",
  },
  {
    projectName: "Leather Patch Batch",
    category: "Industrial & Blue Collar",
    material: "Leatherette",
    description:
      "Branded patches prepared for hats, jackets, and crew gear.",
    image: "/images/products/gradeline-product-placeholder-leather-patch.png",
  },
];

export default function GalleryPage() {
  return (
    <>
      <PublicHeader />
      <main className="min-h-screen overflow-hidden bg-[#05070a] text-white">
      <section className="relative overflow-hidden px-4 py-12 sm:px-6 md:py-16">
        <Image
          src="/images/workflow/gradeline-gallery-section-banner.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,139,196,0.24),_transparent_35%),linear-gradient(to_bottom,rgba(5,7,10,0.66),rgba(5,7,10,0.96))]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-blue-950/40 p-6 shadow-2xl md:p-10">
            <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
              Gradeline Supply Co.
            </p>
            <h1 className="mt-4 text-4xl font-black md:text-6xl">Gallery</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-300">
              Demo showcase for finished engravings, shop-built goods,
              leatherwork, slate, acrylic, and custom production runs.
            </p>
            <Link
              href="/"
              className="mt-8 inline-flex rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-bold text-white transition hover:border-blue-300/40 hover:bg-blue-400/10"
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

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {galleryProjects.map((project) => (
              <article
                key={project.projectName}
                className="h-full overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(145deg,rgba(24,31,38,0.72),rgba(7,9,12,0.96))] shadow-[0_18px_45px_rgba(0,0,0,0.28)] transition hover:border-blue-300/40 hover:bg-white/[0.07]"
              >
                <div className="relative aspect-[4/3] overflow-hidden border-b border-white/10 bg-black">
                  <Image
                    src={project.image}
                    alt=""
                    fill
                    sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,7,10,0.28),transparent)]" />
                </div>
                <div className="p-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-blue-300">
                    {project.category}
                  </p>
                  <h2 className="mt-3 text-2xl font-black">
                    {project.projectName}
                  </h2>
                  <p className="mt-2 text-sm font-bold uppercase tracking-widest text-zinc-500">
                    {project.material}
                  </p>
                  <p className="mt-4 leading-7 text-zinc-400">
                    {project.description}
                  </p>
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

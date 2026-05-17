import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PublicFooter from "@/components/PublicFooter";
import PublicHeader from "@/components/PublicHeader";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Gradeline Supply Co., a custom laser engraving and small-batch shop-built products brand with industrial and blue-collar roots.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About | Gradeline Supply Co.",
    description:
      "Learn about Gradeline Supply Co., a custom laser engraving and small-batch shop-built products brand with industrial and blue-collar roots.",
    url: "/about",
    images: [
      {
        url: "/images/backgrounds/gradeline-about-workshop-background.png",
        alt: "About Gradeline Supply Co.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Gradeline Supply Co.",
    description:
      "Learn about Gradeline Supply Co., a custom laser engraving and small-batch shop-built products brand with industrial and blue-collar roots.",
    images: ["/images/backgrounds/gradeline-about-workshop-background.png"],
  },
};

const aboutHighlights = [
  "Custom laser engraving",
  "Small-batch shop-built products",
  "Industrial and blue-collar roots",
  "Custom gifts, home/kitchen goods, and business branding",
];

export default function AboutPage() {
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
            className="object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,139,196,0.28),_transparent_35%),linear-gradient(to_bottom,rgba(5,7,10,0.62),rgba(5,7,10,0.96))]" />

          <div className="relative mx-auto max-w-7xl">
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-blue-950/40 p-6 shadow-2xl md:p-10">
              <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
                Gradeline Supply Co.
              </p>
              <h1 className="mt-4 text-4xl font-black md:text-6xl">
                Built To Be Different.
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-300">
                Gradeline Supply Co. is built around custom laser engraving,
                small-batch shop-built products, and practical pieces with an
                industrial edge.
              </p>
              <Link
                href="/custom-order"
                className="mt-8 inline-flex rounded-xl bg-blue-400 px-6 py-3 font-bold text-black transition hover:bg-blue-300"
              >
                Start a Custom Order
              </Link>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(145deg,rgba(24,31,38,0.72),rgba(7,9,12,0.96))] p-6 shadow-[0_18px_45px_rgba(0,0,0,0.28)] md:p-8">
                <Image
                  src="/images/hero/gradeline-blue-collar-series-banner.png"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover object-center opacity-20"
                />
                <div className="absolute inset-0 bg-black/55" />
                <div className="relative">
                <div className="h-2 w-14 bg-blue-400 shadow-[0_0_18px_rgba(96,165,250,0.65)]" />
                <h2 className="mt-5 text-3xl font-black">
                  Industrial Roots, Custom Reach.
                </h2>
                <p className="mt-4 leading-8 text-zinc-300">
                  The shop has a blue-collar backbone: tags, patches, tumblers,
                  signs, branded gear, and rugged pieces that feel at home in
                  garages, jobsites, union halls, kitchens, offices, and family
                  spaces.
                </p>
                <p className="mt-4 leading-8 text-zinc-300">
                  From general custom gifts and home/kitchen pieces to business
                  branding and one-off ideas, the goal is simple: make useful,
                  memorable work that looks sharp and lasts.
                </p>
                </div>
              </section>

              <section className="grid gap-4 sm:grid-cols-2">
                {aboutHighlights.map((highlight) => (
                  <article
                    key={highlight}
                    className="rounded-3xl border border-white/10 bg-black/30 p-6 shadow-[0_18px_45px_rgba(0,0,0,0.22)] transition hover:border-blue-300/40 hover:bg-white/[0.05]"
                  >
                    <div className="h-2 w-10 bg-blue-400 shadow-[0_0_18px_rgba(96,165,250,0.65)]" />
                    <h3 className="mt-5 text-xl font-black">{highlight}</h3>
                  </article>
                ))}
              </section>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </>
  );
}

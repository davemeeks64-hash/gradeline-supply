import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative grid min-h-[100svh] place-items-center overflow-hidden bg-[#05070a] px-4 py-16 text-white sm:px-6">
      <Image
        src="/images/backgrounds/gradeline-404-page-background.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-[0.4]"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(96,165,250,0.25),_transparent_34%),linear-gradient(to_bottom,rgba(5,7,10,0.66),rgba(5,7,10,0.96))]" />

      <section className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-black/45 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.42)] backdrop-blur-sm md:p-10">
        <div className="h-2 w-20 bg-blue-400 shadow-[0_0_24px_rgba(96,165,250,0.75)]" />
        <p className="mt-6 text-sm font-bold uppercase tracking-widest text-blue-300">
          404 / Off The Workbench
        </p>
        <h1 className="mt-4 text-4xl font-black md:text-6xl">
          This page missed the cut.
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-zinc-300">
          The link you followed does not point to a live Gradeline page. Head
          back home or browse the collections to find the right build.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href="/"
            className="rounded-xl bg-blue-400 px-6 py-3 text-center font-bold text-black transition hover:bg-blue-300"
          >
            Back to Homepage
          </Link>
          <Link
            href="/collections"
            className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-center font-bold text-white transition hover:border-blue-300/40 hover:bg-blue-400/10"
          >
            View Collections
          </Link>
        </div>
      </section>
    </main>
  );
}

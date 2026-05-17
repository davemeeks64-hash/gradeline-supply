import Image from "next/image";

export default function Loading() {
  return (
    <main className="relative grid min-h-[100svh] place-items-center overflow-hidden bg-[#05070a] px-4 py-16 text-white sm:px-6">
      <Image
        src="/images/backgrounds/gradeline-loading-screen-background.png"
        alt="Gradeline loading screen industrial workshop background"
        fill
        sizes="100vw"
        className="object-cover object-center opacity-[0.35]"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(96,165,250,0.24),_transparent_34%),linear-gradient(to_bottom,rgba(5,7,10,0.68),rgba(5,7,10,0.96))]" />

      <section className="relative w-full max-w-xl rounded-3xl border border-white/10 bg-black/45 p-6 text-center shadow-[0_24px_70px_rgba(0,0,0,0.42)] backdrop-blur-sm md:p-8">
        <div className="mx-auto h-2 w-20 bg-blue-400 shadow-[0_0_24px_rgba(96,165,250,0.75)]" />
        <p className="mt-6 text-sm font-bold uppercase tracking-widest text-blue-300">
          Gradeline Supply Co.
        </p>
        <h1 className="mt-4 text-3xl font-black md:text-5xl">
          Firing up the laser...
        </h1>
        <p className="mt-4 leading-8 text-zinc-300">
          Loading the shop, lining up the workbench, and getting the next
          Gradeline page ready.
        </p>
      </section>
    </main>
  );
}

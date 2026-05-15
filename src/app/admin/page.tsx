import Link from "next/link";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[#05070a] px-6 py-16 text-white">
      <section className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-blue-950/40 p-8 shadow-2xl md:p-12">
        <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
          Gradeline Supply Co.
        </p>
        <h1 className="mt-4 text-4xl font-black md:text-6xl">Admin</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-300">
          The admin system for orders, production, inventory, laser settings,
          and customer records will be built out here.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-bold text-white transition hover:border-blue-300/40 hover:bg-blue-400/10"
        >
          Back to Home
        </Link>
      </section>
    </main>
  );
}

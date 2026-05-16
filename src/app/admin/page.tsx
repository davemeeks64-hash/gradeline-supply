import Link from "next/link";
import AdminPageShell from "@/components/AdminPageShell";

const dashboardCards = [
  { label: "Active Orders", value: "24", detail: "Open shop tickets" },
  { label: "Pending Design", value: "7", detail: "Awaiting artwork review" },
  { label: "In Production", value: "12", detail: "Running or queued" },
  { label: "Low Inventory", value: "5", detail: "Materials need attention" },
  { label: "Finished Orders", value: "31", detail: "Ready for pickup or ship" },
  { label: "Saved Laser Settings", value: "18", detail: "Material presets stored" },
];

const cardClassName =
  "rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.28)] transition hover:border-blue-300/40 hover:bg-white/[0.07]";

export default function AdminPage() {
  return (
    <AdminPageShell activeHref="/admin">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-blue-950/40 p-6 shadow-2xl md:p-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
                  Gradeline Supply Co.
                </p>
                <h1 className="mt-3 text-4xl font-black md:text-6xl">
                  Admin Dashboard
                </h1>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-300">
                  Demo overview for orders, production, inventory, and saved
                  laser settings.
                </p>
              </div>

              <Link
                href="/"
                className="inline-flex w-fit rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-bold text-white transition hover:border-blue-300/40 hover:bg-blue-400/10"
              >
                Back to Home
              </Link>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dashboardCards.map((card) => (
              <article key={card.label} className={cardClassName}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
                      {card.label}
                    </p>
                    <p className="mt-4 text-4xl font-black text-white">
                      {card.value}
                    </p>
                  </div>
                  <span className="mt-1 h-3 w-3 border border-blue-300 bg-blue-400 shadow-[0_0_18px_rgba(96,165,250,0.65)]" />
                </div>
                <p className="mt-4 text-sm leading-6 text-zinc-400">
                  {card.detail}
                </p>
              </article>
            ))}
          </div>
    </AdminPageShell>
  );
}


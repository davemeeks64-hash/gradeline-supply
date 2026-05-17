import Link from "next/link";
import AdminLayout from "@/components/AdminLayout";

const dashboardLinks = [
  {
    title: "Customers",
    href: "/admin/customers",
    description: "Manage customer records, contact details, companies, and notes.",
  },
  {
    title: "Orders",
    href: "/admin/orders",
    description: "Review the active order queue and track order details.",
  },
  {
    title: "New Order",
    href: "/admin/new-order",
    description: "Create a new custom order intake record for the shop.",
  },
  {
    title: "Production",
    href: "/admin/production",
    description: "Follow design approval, material pull, laser setup, and finishing.",
  },
  {
    title: "Stock Products",
    href: "/admin/stock-products",
    description: "Track ready-made products, stock quantities, files, and profit.",
  },
  {
    title: "Laser Settings",
    href: "/admin/laser-settings",
    description: "Reference saved material settings for machines and engraving runs.",
  },
  {
    title: "Reports",
    href: "/admin/reports",
    description: "View demo summaries for sales, inventory, production, and profit.",
  },
  {
    title: "Settings",
    href: "/admin/settings",
    description: "Manage business defaults, pricing defaults, and system placeholders.",
  },
];

export default function AdminPage() {
  return (
    <AdminLayout activeHref="/admin">
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-blue-950/40 p-6 shadow-2xl md:p-8">
        <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-blue-400/10 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/70 to-transparent" />
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="relative">
            <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
              Gradeline Admin
            </p>
            <h1 className="mt-3 max-w-4xl text-4xl font-black tracking-tight text-white drop-shadow-[0_0_18px_rgba(96,165,250,0.18)] md:text-6xl">
              Gradeline Operations Terminal
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-300">
              A clean operations hub for customers, orders, production,
              inventory, laser settings, reports, and shop defaults.
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex w-fit rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-bold text-white transition hover:border-blue-300/40 hover:bg-blue-400/10"
          >
            Public Site
          </Link>
        </div>
      </section>

      <section className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardLinks.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group relative flex min-h-52 flex-col overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(145deg,rgba(24,31,38,0.78),rgba(7,9,12,0.96))] p-6 shadow-[0_18px_45px_rgba(0,0,0,0.28)] transition hover:-translate-y-1 hover:border-blue-300/40 hover:shadow-[0_0_34px_rgba(96,165,250,0.12)]"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/60 to-transparent opacity-0 transition group-hover:opacity-100" />
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-400/10 blur-3xl transition group-hover:bg-blue-400/15" />

            <div className="relative flex h-full flex-col">
              <div className="h-2 w-12 bg-blue-400 shadow-[0_0_18px_rgba(96,165,250,0.65)]" />
              <h2 className="mt-5 text-2xl font-black text-white">
                {item.title}
              </h2>
              <p className="mt-3 flex-1 leading-7 text-zinc-400">
                {item.description}
              </p>
              <p className="mt-6 border-t border-white/10 pt-4 text-xs font-bold uppercase tracking-widest text-blue-200">
                Open Module
              </p>
            </div>
          </Link>
        ))}
      </section>
    </AdminLayout>
  );
}

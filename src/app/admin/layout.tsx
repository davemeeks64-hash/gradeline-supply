import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

const adminLinks = [
  { label: "Dashboard", href: "/admin" },
  { label: "Customers", href: "/admin/customers" },
  { label: "Orders", href: "/admin/orders" },
  { label: "New Order", href: "/admin/new-order" },
  { label: "Production", href: "/admin/production" },
  { label: "Products", href: "/admin/stock-products" },
  { label: "Laser Settings", href: "/admin/laser-settings" },
  { label: "Reports", href: "/admin/reports" },
  { label: "Settings", href: "/admin/settings" },
];

export default function AdminRouteLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#05070a] text-white lg:flex">
      <aside className="relative overflow-hidden border-b border-white/10 bg-[#080b0f] shadow-[0_18px_55px_rgba(0,0,0,0.38)] lg:sticky lg:top-0 lg:h-screen lg:w-72 lg:shrink-0 lg:border-b-0 lg:border-r lg:border-white/10">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/70 to-transparent" />
        <div className="pointer-events-none absolute -left-24 top-20 h-64 w-64 rounded-full bg-blue-400/10 blur-3xl" />
        <div className="flex h-full flex-col bg-[linear-gradient(145deg,rgba(18,25,31,0.98),rgba(8,10,12,1)_58%,rgba(14,21,27,0.98))]">
          <Link
            href="/admin"
            className="flex items-center gap-3 border-b border-white/10 px-5 py-5 lg:px-6 lg:py-7"
          >
            <div className="grid size-12 place-items-center border border-blue-300/50 bg-[#101820] p-1 shadow-[inset_0_0_18px_rgba(143,193,223,0.08)]">
              <Image
                src="/gradeline-logo.png"
                alt="Gradeline Supply Co. logo"
                width={1730}
                height={1870}
                className="h-full w-auto object-contain"
              />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold uppercase tracking-[0.24em] text-slate-100">
                Gradeline
              </p>
              <p className="truncate text-xs font-medium uppercase tracking-[0.18em] text-blue-300">
                Admin System
              </p>
            </div>
          </Link>

          <nav
            aria-label="Gradeline admin navigation"
            className="flex gap-2 overflow-x-auto px-4 py-3 lg:min-h-0 lg:flex-1 lg:flex-col lg:gap-1.5 lg:overflow-y-auto lg:py-5"
          >
            {adminLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex min-w-max items-center gap-3 border border-transparent px-4 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-slate-400 transition hover:border-slate-700 hover:bg-[#111820] hover:text-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300 lg:min-w-0"
              >
                <span
                  aria-hidden="true"
                  className="h-2.5 w-2.5 shrink-0 border border-slate-600 bg-[#0b1014] transition group-hover:border-blue-300"
                />
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>

          <div className="hidden border-t border-white/10 px-6 py-5 lg:block">
            <div className="h-px bg-gradient-to-r from-transparent via-blue-300/70 to-transparent" />
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Industrial Operations
            </p>
          </div>
        </div>
      </aside>

      <section className="relative flex-1 overflow-hidden px-4 py-5 sm:px-6 lg:px-10 lg:py-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,139,196,0.24),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(80,80,80,0.22),_transparent_36%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/40 to-transparent" />
        <div className="relative mx-auto w-full max-w-7xl">{children}</div>
      </section>
    </main>
  );
}

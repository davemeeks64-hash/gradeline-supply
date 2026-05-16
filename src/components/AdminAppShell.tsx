"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";

const ADMIN_AUTH_KEY = "gradeline-admin-auth";

const routeLabels: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/orders": "Orders",
  "/admin/new-order": "New Order",
  "/admin/production": "Production",
  "/admin/inventory": "Inventory",
  "/admin/inventory-receiving": "Inventory Receiving",
  "/admin/stock-products": "Stock Products",
  "/admin/sales": "Sales",
  "/admin/laser-settings": "Laser Settings",
  "/admin/customers": "Customers",
  "/admin/designs": "Designs & Files",
  "/admin/reports": "Reports",
  "/admin/settings": "Settings",
};

type AdminAppShellProps = {
  children: ReactNode;
};

export function AdminAppShell({ children }: AdminAppShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const pageLabel = routeLabels[pathname] ?? "Admin";

  function handleLogout() {
    localStorage.removeItem(ADMIN_AUTH_KEY);
    router.replace("/admin-login");
  }

  return (
    <main className="min-h-screen bg-[#05070a] text-white md:flex">
      <AdminSidebar activeHref={pathname} />

      <section className="relative flex-1 overflow-hidden px-4 py-5 sm:px-6 md:px-8 md:py-8 lg:px-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,139,196,0.24),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(80,80,80,0.22),_transparent_36%)]" />

        <div className="relative mx-auto w-full max-w-7xl">
          <header className="sticky top-0 z-20 mb-6 rounded-3xl border border-white/10 bg-[#080b0f]/95 p-4 shadow-[0_18px_45px_rgba(0,0,0,0.3)] backdrop-blur md:p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <Image
                  src="/gradeline-logo.png"
                  alt="Gradeline Supply Co. logo"
                  width={1730}
                  height={1870}
                  className="h-11 w-auto shrink-0 object-contain"
                />
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-blue-300">
                    Gradeline Admin
                  </p>
                  <h1 className="text-2xl font-black">{pageLabel}</h1>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Link
                  href="/admin/new-order"
                  className="rounded-xl bg-blue-400 px-4 py-2 text-sm font-bold text-black transition hover:bg-blue-300"
                >
                  New Order
                </Link>
                <Link
                  href="/"
                  className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-bold text-white transition hover:border-blue-300/40 hover:bg-blue-400/10"
                >
                  Public Site
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-xl border border-white/15 bg-black/30 px-4 py-2 text-sm font-bold text-zinc-300 transition hover:border-blue-300/40 hover:bg-blue-400/10 hover:text-white"
                >
                  Logout
                </button>
              </div>
            </div>
          </header>

          {children}
        </div>
      </section>
    </main>
  );
}

export default AdminAppShell;

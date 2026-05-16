import Link from "next/link";
import Image from "next/image";

type AdminSidebarLink = {
  label: string;
  href: string;
};

type AdminSidebarProps = {
  activeHref?: string;
  className?: string;
  links?: AdminSidebarLink[];
};

const adminLinks: AdminSidebarLink[] = [
  { label: "Dashboard", href: "/admin" },
  { label: "Orders", href: "/admin/orders" },
  { label: "New Order", href: "/admin/new-order" },
  { label: "Production", href: "/admin/production" },
  { label: "Inventory", href: "/admin/inventory" },
  { label: "Inventory Receiving", href: "/admin/inventory-receiving" },
  { label: "Stock Products", href: "/admin/stock-products" },
  { label: "Sales", href: "/admin/sales" },
  { label: "Laser Settings", href: "/admin/laser-settings" },
  { label: "Customers", href: "/admin/customers" },
  { label: "Designs", href: "/admin/designs" },
  { label: "Reports", href: "/admin/reports" },
  { label: "Settings", href: "/admin/settings" },
];

export function AdminSidebar({
  activeHref = "/admin",
  className = "",
  links = adminLinks,
}: AdminSidebarProps) {
  return (
    <aside
      aria-label="Gradeline admin sidebar"
      className={[
        "w-full shrink-0 border-b border-slate-700/70 bg-[#090b0d] text-slate-100 shadow-[0_18px_55px_rgba(0,0,0,0.38)]",
        "md:sticky md:top-0 md:h-screen md:w-72 md:self-start md:overflow-hidden md:border-b-0 md:border-r md:border-slate-700/70",
        className,
      ].join(" ")}
    >
      <div className="flex h-full flex-col bg-[linear-gradient(145deg,rgba(18,25,31,0.98),rgba(8,10,12,1)_58%,rgba(14,21,27,0.98))]">
        <div className="border-b border-slate-700/60 px-4 py-4 sm:px-5 md:px-6 md:py-7">
          <div className="flex items-center gap-3">
            <div className="grid size-12 place-items-center border border-[#5f8eaa]/70 bg-[#101820] p-1 shadow-[inset_0_0_18px_rgba(143,193,223,0.08)]">
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
              <p className="truncate text-xs font-medium uppercase tracking-[0.18em] text-[#7fa7bd]">
                Admin System
              </p>
            </div>
          </div>
        </div>

        <nav className="flex snap-x gap-2 overflow-x-auto px-3 py-3 sm:px-4 md:min-h-0 md:flex-1 md:flex-col md:gap-1.5 md:overflow-y-auto md:px-4 md:py-5">
          {links.map((link) => {
            const isActive = link.href === activeHref;

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={[
                  "group relative flex min-w-max snap-start items-center gap-3 border px-4 py-3 text-sm font-semibold uppercase tracking-[0.12em] transition md:min-w-0",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8fc1df]",
                  isActive
                    ? "border-[#5f8eaa] bg-[#13202a] text-[#d7edf8] shadow-[inset_3px_0_0_#8fc1df,0_12px_26px_rgba(6,14,18,0.32)]"
                    : "border-transparent bg-transparent text-slate-400 hover:border-slate-700 hover:bg-[#111820] hover:text-slate-100",
                ].join(" ")}
              >
                <span
                  aria-hidden="true"
                  className={[
                    "h-2.5 w-2.5 shrink-0 border transition",
                    isActive
                      ? "border-[#8fc1df] bg-[#8fc1df] shadow-[0_0_16px_rgba(143,193,223,0.65)]"
                      : "border-slate-600 bg-[#0b1014] group-hover:border-[#6f9db6]",
                  ].join(" ")}
                />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="hidden border-t border-slate-700/60 px-6 py-5 md:block">
          <div className="h-px bg-gradient-to-r from-transparent via-[#6f9db6]/70 to-transparent" />
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Industrial Operations
          </p>
        </div>
      </div>
    </aside>
  );
}

export default AdminSidebar;

import Link from "next/link";

type SidebarLink = {
  label: string;
  href: string;
};

type GradelineAdminSidebarProps = {
  activeHref?: string;
  className?: string;
  links?: SidebarLink[];
};

const defaultLinks: SidebarLink[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Orders", href: "/orders" },
  { label: "Production", href: "/production" },
  { label: "Inventory", href: "/inventory" },
  { label: "Laser Settings", href: "/laser-settings" },
  { label: "Customers", href: "/customers" },
];

export function GradelineAdminSidebar({
  activeHref = "/dashboard",
  className = "",
  links = defaultLinks,
}: GradelineAdminSidebarProps) {
  return (
    <aside
      className={[
        "w-full border-b border-slate-700/70 bg-[#090b0d] text-slate-100 shadow-[0_18px_55px_rgba(0,0,0,0.38)]",
        "md:min-h-screen md:w-72 md:border-b-0 md:border-r md:border-slate-700/70",
        className,
      ].join(" ")}
      aria-label="Gradeline admin navigation"
    >
      <div className="flex h-full flex-col bg-[linear-gradient(145deg,rgba(17,24,31,0.96),rgba(8,10,12,1)_58%,rgba(15,23,30,0.98))]">
        <div className="border-b border-slate-700/60 px-5 py-5 md:px-6 md:py-7">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center border border-[#5f8eaa]/70 bg-[#101820] text-sm font-black tracking-[0.16em] text-[#8fc1df] shadow-[inset_0_0_18px_rgba(143,193,223,0.08)]">
              GS
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold uppercase tracking-[0.24em] text-slate-100">
                Gradeline
              </p>
              <p className="truncate text-xs font-medium uppercase tracking-[0.18em] text-[#7fa7bd]">
                Supply Co
              </p>
            </div>
          </div>
        </div>

        <nav className="flex gap-2 overflow-x-auto px-3 py-3 md:flex-1 md:flex-col md:gap-1.5 md:overflow-visible md:px-4 md:py-6">
          {links.map((link) => {
            const isActive = link.href === activeHref;

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={[
                  "group relative flex min-w-max items-center gap-3 border px-4 py-3 text-sm font-semibold uppercase tracking-[0.12em] transition",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8fc1df]",
                  isActive
                    ? "border-[#5f8eaa] bg-[#13202a] text-[#d7edf8] shadow-[inset_3px_0_0_#8fc1df,0_12px_26px_rgba(6,14,18,0.32)]"
                    : "border-transparent bg-transparent text-slate-400 hover:border-slate-700 hover:bg-[#111820] hover:text-slate-100",
                ].join(" ")}
              >
                <span
                  className={[
                    "h-2.5 w-2.5 shrink-0 border transition",
                    isActive
                      ? "border-[#8fc1df] bg-[#8fc1df] shadow-[0_0_16px_rgba(143,193,223,0.65)]"
                      : "border-slate-600 bg-[#0b1014] group-hover:border-[#6f9db6]",
                  ].join(" ")}
                  aria-hidden="true"
                />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="hidden border-t border-slate-700/60 px-6 py-5 md:block">
          <div className="h-px bg-gradient-to-r from-transparent via-[#6f9db6]/70 to-transparent" />
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Industrial Ops
          </p>
        </div>
      </div>
    </aside>
  );
}

export default GradelineAdminSidebar;

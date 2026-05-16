import type { ReactNode } from "react";
import AdminSidebar from "@/components/AdminSidebar";

type AdminLayoutProps = {
  activeHref?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  description?: string;
  eyebrow?: string;
  title?: string;
};

export function AdminLayout({
  activeHref = "/admin",
  actions,
  children,
  className = "",
  contentClassName = "",
  description,
  eyebrow = "Gradeline Admin",
  title,
}: AdminLayoutProps) {
  return (
    <main
      className={[
        "min-h-screen bg-[#05070a] text-white md:flex",
        className,
      ].join(" ")}
    >
      <AdminSidebar activeHref={activeHref} />

      <section className="relative flex-1 overflow-hidden px-4 py-6 sm:px-6 md:px-8 md:py-10 lg:px-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,139,196,0.24),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(80,80,80,0.22),_transparent_36%)]" />

        <div
          className={[
            "relative mx-auto w-full max-w-7xl",
            contentClassName,
          ].join(" ")}
        >
          {(title || description || actions) && (
            <header className="mb-6 rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-blue-950/40 p-6 shadow-2xl md:p-8">
              <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
                    {eyebrow}
                  </p>
                  {title && (
                    <h1 className="mt-3 text-4xl font-black md:text-6xl">
                      {title}
                    </h1>
                  )}
                  {description && (
                    <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-300">
                      {description}
                    </p>
                  )}
                </div>

                {actions && <div className="flex shrink-0 gap-3">{actions}</div>}
              </div>
            </header>
          )}

          {children}
        </div>
      </section>
    </main>
  );
}

export default AdminLayout;

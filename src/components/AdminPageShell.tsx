import type { ReactNode } from "react";
import AdminSidebar from "@/components/AdminSidebar";

type AdminPageShellProps = {
  activeHref: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

export function AdminPageShell({
  activeHref,
  children,
  className = "",
  contentClassName = "",
}: AdminPageShellProps) {
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
          {children}
        </div>
      </section>
    </main>
  );
}

export default AdminPageShell;

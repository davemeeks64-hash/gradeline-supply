import type { ReactNode } from "react";
import Image from "next/image";

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
  actions,
  children,
  className = "",
  contentClassName = "",
  description,
  eyebrow = "Gradeline Admin",
  title,
}: AdminLayoutProps) {
  return (
    <div className={[className, contentClassName].join(" ")}>
      {(title || description || actions) && (
        <header className="mb-6 rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-blue-950/40 p-6 shadow-2xl md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="flex items-start gap-4">
              <Image
                src="/gradeline-logo.png"
                alt="Gradeline Supply Co. logo"
                width={1730}
                height={1870}
                className="mt-1 h-14 w-auto shrink-0 object-contain md:h-16"
              />
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
            </div>

            {actions && <div className="flex shrink-0 gap-3">{actions}</div>}
          </div>
        </header>
      )}

      {children}
    </div>
  );
}

export default AdminLayout;

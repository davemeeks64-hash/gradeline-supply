import type { ReactNode } from "react";
import AdminAuthGate from "@/components/AdminAuthGate";
import AdminAppShell from "@/components/AdminAppShell";

export default function AdminRouteLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <AdminAuthGate>
      <AdminAppShell>{children}</AdminAppShell>
    </AdminAuthGate>
  );
}

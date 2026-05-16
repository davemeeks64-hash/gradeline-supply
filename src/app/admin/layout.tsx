import type { ReactNode } from "react";
import AdminAuthGate from "@/components/AdminAuthGate";

export default function AdminRouteLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <AdminAuthGate>{children}</AdminAuthGate>;
}

import type { ReactNode } from "react";
import AdminProtectedLayout from "@/components/AdminProtectedLayout";

export default function AdminRouteLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <AdminProtectedLayout>{children}</AdminProtectedLayout>;
}

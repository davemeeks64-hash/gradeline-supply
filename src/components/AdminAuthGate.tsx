"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ADMIN_AUTH_KEY = "gradeline-admin-auth";

type AdminAuthGateProps = {
  children: ReactNode;
};

export function AdminAuthGate({ children }: AdminAuthGateProps) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem(ADMIN_AUTH_KEY) === "true";

    if (!isLoggedIn) {
      router.replace("/admin-login");
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setIsAuthorized(true);
      setIsChecking(false);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [router]);

  if (isChecking || !isAuthorized) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#05070a] px-6 text-white">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center shadow-[0_18px_45px_rgba(0,0,0,0.28)]">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
            Gradeline Admin
          </p>
          <p className="mt-3 text-zinc-400">Checking access...</p>
        </div>
      </main>
    );
  }

  return children;
}

export default AdminAuthGate;

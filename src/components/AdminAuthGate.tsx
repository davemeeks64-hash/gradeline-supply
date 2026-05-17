"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type AdminAuthGateProps = {
  children: ReactNode;
};

export function AdminAuthGate({ children }: AdminAuthGateProps) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function checkSession() {
      const { data, error } = await supabase.auth.getSession();

      if (!isMounted) {
        return;
      }

      if (error || !data.session) {
        router.replace("/login");
        setIsChecking(false);
        return;
      }

      setIsAuthorized(true);
      setIsChecking(false);
    }

    void checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isMounted) {
        return;
      }

      if (!session) {
        setIsAuthorized(false);
        router.replace("/login");
        return;
      }

      setIsAuthorized(true);
      setIsChecking(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
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

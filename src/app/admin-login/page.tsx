"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ADMIN_AUTH_KEY = "gradeline-admin-auth";
const DEMO_PASSWORD = "gradeline123";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(ADMIN_AUTH_KEY) === "true") {
      router.replace("/admin");
    }
  }, [router]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (password !== DEMO_PASSWORD) {
      setError("Incorrect demo password.");
      return;
    }

    localStorage.setItem(ADMIN_AUTH_KEY, "true");
    router.replace("/admin");
  }

  return (
    <main className="min-h-screen bg-[#05070a] text-white">
      <section className="relative grid min-h-screen place-items-center overflow-hidden px-6 py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,139,196,0.28),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(80,80,80,0.28),_transparent_35%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/50 to-transparent" />

        <div className="relative w-full max-w-md">
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-blue-950/40 p-6 shadow-2xl sm:p-8"
          >
            <div className="flex items-center gap-4">
              <Image
                src="/gradeline-logo.png"
                alt="Gradeline Supply Co. logo"
                width={1730}
                height={1870}
                priority
                className="h-16 w-auto object-contain"
              />
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
                  Gradeline Supply Co.
                </p>
                <h1 className="mt-1 text-3xl font-black">Admin System</h1>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-blue-300/20 bg-blue-400/10 p-4">
              <p className="text-sm font-bold uppercase tracking-widest text-blue-200">
                Secure Access
              </p>
              <p className="mt-3 leading-7 text-zinc-300">
                Enter the demo admin password to access orders, production,
                inventory, sales, and shop operations.
              </p>
            </div>

            <label className="mt-6 block">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-300">
                Password
              </span>
              <div className="mt-2 flex overflow-hidden rounded-xl border border-white/10 bg-black/30 focus-within:border-blue-300/60">
                <input
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setError("");
                  }}
                  type={showPassword ? "text" : "password"}
                  className="min-w-0 flex-1 bg-transparent px-4 py-3 text-white outline-none placeholder:text-zinc-600"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="border-l border-white/10 px-4 text-sm font-bold text-blue-200 transition hover:bg-blue-400/10"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </label>

            {error && (
              <p className="mt-3 rounded-xl border border-red-300/30 bg-red-400/10 px-4 py-3 text-sm font-bold text-red-200">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="mt-6 w-full rounded-xl bg-blue-400 px-6 py-3 font-bold text-black transition hover:bg-blue-300"
            >
              Enter Admin
            </button>

            <Link
              href="/"
              className="mt-4 inline-flex w-full justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-bold text-white transition hover:border-blue-300/40 hover:bg-blue-400/10"
            >
              Back to Home
            </Link>
          </form>

          <p className="mt-4 text-center text-xs font-bold uppercase tracking-widest text-zinc-600">
            Temporary frontend-only access gate
          </p>
        </div>
      </section>
    </main>
  );
}

"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ADMIN_AUTH_KEY = "gradeline-admin-auth";
const DEMO_PASSWORD = "gradeline123";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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

        <form
          onSubmit={handleSubmit}
          className="relative w-full max-w-md rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-blue-950/40 p-8 shadow-2xl"
        >
          <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
            Gradeline Supply Co.
          </p>
          <h1 className="mt-4 text-4xl font-black">Admin Login</h1>
          <p className="mt-4 leading-7 text-zinc-300">
            Enter the demo admin password to access the Gradeline admin system.
          </p>

          <label className="mt-6 block">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-300">
              Password
            </span>
            <input
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setError("");
              }}
              type="password"
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-blue-300/60 focus:bg-black/45"
              placeholder="Enter password"
            />
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
      </section>
    </main>
  );
}

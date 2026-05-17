"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import AdminLayout from "@/components/AdminLayout";
import { supabase } from "@/lib/supabase";

type Customer = {
  id?: string | number;
};

type Order = {
  id?: string | number;
  product_type: string | null;
  qty: number | null;
  total_price: number | null;
  status: string | null;
};

const productionStatuses = new Set([
  "approved",
  "engraving",
  "assembly",
  "in production",
  "file ready",
]);

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function isCompletedStatus(status: string | null | undefined) {
  const normalized = (status ?? "").trim().toLowerCase();
  return (
    normalized === "completed" ||
    normalized === "complete" ||
    normalized === "finished" ||
    normalized === "delivered"
  );
}

function isActiveProductionStatus(status: string | null | undefined) {
  return productionStatuses.has((status ?? "").trim().toLowerCase());
}

export default function AdminReportsPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const metrics = useMemo(() => {
    const totalOrders = orders.length;
    const completedOrders = orders.filter((order) =>
      isCompletedStatus(order.status)
    ).length;
    const activeProductionJobs = orders.filter((order) =>
      isActiveProductionStatus(order.status)
    ).length;
    const estimatedSales = orders.reduce(
      (sum, order) => sum + (Number(order.total_price) || 0),
      0
    );

    return [
      {
        label: "Total Orders",
        value: String(totalOrders),
        detail: "Live order records",
      },
      {
        label: "Completed Orders",
        value: String(completedOrders),
        detail: "Finished, completed, or delivered",
      },
      {
        label: "Active Production Jobs",
        value: String(activeProductionJobs),
        detail: "Approved, engraving, assembly, or in production",
      },
      {
        label: "Total Customers",
        value: String(customers.length),
        detail: "Live customer records",
      },
      {
        label: "Estimated Sales",
        value: formatCurrency(estimatedSales),
        detail: "Sum of order total_price",
      },
    ];
  }, [customers.length, orders]);

  const topProducts = useMemo(() => {
    const productTotals = orders.reduce<Record<string, number>>((totals, order) => {
      const productName = order.product_type || "Uncategorized";
      totals[productName] = (totals[productName] ?? 0) + (Number(order.qty) || 0);
      return totals;
    }, {});

    return Object.entries(productTotals)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);
  }, [orders]);

  async function readReportData() {
    const [ordersResponse, customersResponse] = await Promise.all([
      supabase.from("orders").select("id,product_type,qty,total_price,status"),
      supabase.from("customers").select("id"),
    ]);

    return {
      orders: (ordersResponse.data ?? []) as Order[],
      ordersError: ordersResponse.error,
      customers: (customersResponse.data ?? []) as Customer[],
      customersError: customersResponse.error,
    };
  }

  async function loadReports() {
    setIsLoading(true);
    setErrorMessage("");

    const {
      orders: nextOrders,
      ordersError,
      customers: nextCustomers,
      customersError,
    } = await readReportData();

    if (ordersError || customersError) {
      setErrorMessage(
        ordersError?.message ||
          customersError?.message ||
          "Unable to load report data."
      );
      setOrders([]);
      setCustomers([]);
    } else {
      setOrders(nextOrders);
      setCustomers(nextCustomers);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    let isMounted = true;

    readReportData().then(
      ({
        orders: nextOrders,
        ordersError,
        customers: nextCustomers,
        customersError,
      }) => {
        if (!isMounted) {
          return;
        }

        if (ordersError || customersError) {
          setErrorMessage(
            ordersError?.message ||
              customersError?.message ||
              "Unable to load report data."
          );
          setOrders([]);
          setCustomers([]);
        } else {
          setOrders(nextOrders);
          setCustomers(nextCustomers);
        }

        setIsLoading(false);
      }
    );

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <AdminLayout activeHref="/admin/reports">
      <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-blue-950/40 p-6 shadow-2xl md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
              Gradeline Admin
            </p>
            <h1 className="mt-3 text-4xl font-black md:text-6xl">
              Reports
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-300">
              Executive dashboard for live order counts, customer records,
              production workload, and estimated sales.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={loadReports}
              className="rounded-xl bg-blue-400 px-5 py-3 font-bold text-black transition hover:bg-blue-300"
            >
              Refresh Reports
            </button>
            <Link
              href="/admin"
              className="inline-flex w-fit rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-bold text-white transition hover:border-blue-300/40 hover:bg-blue-400/10"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </section>

      {errorMessage && (
        <p
          role="alert"
          className="mt-6 rounded-2xl border border-red-400/40 bg-red-500/10 px-5 py-4 font-bold text-red-100"
        >
          {errorMessage}
        </p>
      )}

      <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {metrics.map((metric) => (
          <article
            key={metric.label}
            className="rounded-3xl border border-white/10 bg-[linear-gradient(145deg,rgba(24,31,38,0.78),rgba(7,9,12,0.96))] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.28)] transition hover:border-blue-300/40 hover:bg-white/[0.06]"
          >
            <div className="h-2 w-12 bg-blue-400 shadow-[0_0_18px_rgba(96,165,250,0.65)]" />
            <p className="mt-4 text-xs font-bold uppercase tracking-widest text-blue-300">
              {metric.label}
            </p>
            <p className="mt-3 text-4xl font-black text-white">
              {isLoading ? "..." : metric.value}
            </p>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              {metric.detail}
            </p>
          </article>
        ))}
      </section>

      <section className="mt-6 grid gap-5 xl:grid-cols-3">
        <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.28)] md:p-6">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
            Sales Trends
          </p>
          <h2 className="mt-3 text-2xl font-black">Revenue Timeline</h2>
          <div className="mt-6 grid h-56 place-items-center rounded-2xl border border-dashed border-blue-300/30 bg-black/30">
            <p className="max-w-xs text-center text-sm leading-6 text-zinc-400">
              Placeholder chart for monthly and weekly sales trends.
            </p>
          </div>
        </article>

        <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.28)] md:p-6">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
            Production Trends
          </p>
          <h2 className="mt-3 text-2xl font-black">Shop Load</h2>
          <div className="mt-6 grid h-56 place-items-center rounded-2xl border border-dashed border-blue-300/30 bg-black/30">
            <p className="max-w-xs text-center text-sm leading-6 text-zinc-400">
              Placeholder chart for production volume and completion rate.
            </p>
          </div>
        </article>

        <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.28)] md:p-6">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
            Top Products
          </p>
          <h2 className="mt-3 text-2xl font-black">Best Sellers</h2>
          <div className="mt-6 divide-y divide-white/10 rounded-2xl border border-white/10 bg-black/30">
            {topProducts.length === 0 ? (
              <p className="p-4 text-sm text-zinc-400">
                No product data available yet.
              </p>
            ) : (
              topProducts.map(([product, qty]) => (
                <div
                  key={product}
                  className="flex items-center justify-between gap-4 px-4 py-3"
                >
                  <span className="text-sm text-zinc-300">{product}</span>
                  <span className="text-sm font-black text-white">
                    {qty} sold
                  </span>
                </div>
              ))
            )}
          </div>
        </article>
      </section>
    </AdminLayout>
  );
}

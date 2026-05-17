"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import AdminLayout from "@/components/AdminLayout";
import { supabase } from "@/lib/supabase";

type Customer = {
  id: string | number;
  name: string | null;
  email: string | null;
  company: string | null;
};

type Order = {
  id?: string | number;
  order_number: string | null;
  customer_id: string | number | null;
  product_type: string | null;
  description: string | null;
  qty: number | null;
  total_price: number | null;
  status: string | null;
  due_date: string | null;
  created_at?: string | null;
};

type Product = {
  id?: string | number;
  sku: string | null;
  name: string | null;
  category: string | null;
  material: string | null;
  base_price: number | null;
  active: boolean | null;
};

type ChartItem = {
  label: string;
  value: number;
};

const productionStatuses = new Set([
  "new",
  "pending design",
  "approved",
  "file ready",
  "in production",
  "engraving",
  "assembly",
]);

const panelClassName =
  "rounded-3xl border border-white/10 bg-[linear-gradient(145deg,rgba(24,31,38,0.78),rgba(7,9,12,0.96))] shadow-[0_18px_45px_rgba(0,0,0,0.28)]";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(value: string | null | undefined) {
  if (!value) {
    return "-";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function displayValue(value: string | number | null | undefined) {
  return value === null || value === undefined || value === "" ? "-" : value;
}

function getOrderDate(order: Order) {
  return order.created_at || order.due_date || "";
}

function isCurrentMonth(value: string | null | undefined) {
  if (!value) {
    return false;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return false;
  }

  const now = new Date();
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth()
  );
}

function isActiveCustomerOrder(status: string | null | undefined) {
  return productionStatuses.has((status ?? "").trim().toLowerCase());
}

function StatusBadge({ status }: { status: string | null | undefined }) {
  const normalized = (status ?? "").trim().toLowerCase();
  const className =
    normalized === "delivered" ||
    normalized === "finished" ||
    normalized === "completed"
      ? "border-emerald-300/50 bg-emerald-400/10 text-emerald-200"
      : normalized === "in production" ||
          normalized === "engraving" ||
          normalized === "assembly"
        ? "border-amber-300/50 bg-amber-400/10 text-amber-200"
        : "border-blue-300/50 bg-blue-400/10 text-blue-200";

  return (
    <span
      className={`inline-flex w-fit rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-widest ${className}`}
    >
      {displayValue(status)}
    </span>
  );
}

function MetricCard({
  detail,
  label,
  loading,
  value,
}: {
  detail: string;
  label: string;
  loading: boolean;
  value: string;
}) {
  return (
    <article className="relative overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(145deg,rgba(24,31,38,0.78),rgba(7,9,12,0.96))] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.28)] transition hover:border-blue-300/40 hover:bg-white/[0.06]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/60 to-transparent" />
      <div className="absolute -right-14 -top-14 h-36 w-36 rounded-full bg-blue-400/10 blur-3xl" />
      <div className="relative">
        <div className="h-2 w-12 bg-blue-400 shadow-[0_0_18px_rgba(96,165,250,0.65)]" />
        <p className="mt-4 text-xs font-bold uppercase tracking-widest text-blue-300">
          {label}
        </p>
        <p className="mt-3 text-4xl font-black text-white">
          {loading ? "..." : value}
        </p>
        <p className="mt-3 text-sm leading-6 text-zinc-400">{detail}</p>
      </div>
    </article>
  );
}

function ChartPanel({
  children,
  description,
  title,
}: {
  children: ReactNode;
  description: string;
  title: string;
}) {
  return (
    <article className={`${panelClassName} p-5 md:p-6`}>
      <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
        {title}
      </p>
      <p className="mt-3 leading-7 text-zinc-400">{description}</p>
      <div className="mt-6">{children}</div>
    </article>
  );
}

function BarList({
  emptyMessage,
  items,
  valueFormatter = (value) => String(value),
}: {
  emptyMessage: string;
  items: ChartItem[];
  valueFormatter?: (value: number) => string;
}) {
  const maxValue = Math.max(...items.map((item) => item.value), 0);

  if (items.length === 0) {
    return (
      <div className="grid h-52 place-items-center rounded-2xl border border-dashed border-blue-300/30 bg-black/30 px-5 text-center text-sm leading-6 text-zinc-400">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => {
        const width = maxValue > 0 ? Math.max((item.value / maxValue) * 100, 8) : 8;

        return (
          <div key={item.label}>
            <div className="flex items-center justify-between gap-4 text-sm">
              <span className="font-bold text-zinc-200">{item.label}</span>
              <span className="text-blue-200">{valueFormatter(item.value)}</span>
            </div>
            <div className="mt-2 h-3 overflow-hidden rounded-full bg-black/45">
              <div
                className="h-full rounded-full bg-blue-400 shadow-[0_0_18px_rgba(96,165,250,0.55)]"
                style={{ width: `${width}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function AdminSalesPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [productWarning, setProductWarning] = useState("");

  const customerNameById = useMemo(() => {
    return customers.reduce<Record<string, string>>((lookup, customer) => {
      lookup[String(customer.id)] =
        customer.name || customer.company || customer.email || "Unnamed Customer";
      return lookup;
    }, {});
  }, [customers]);

  const metrics = useMemo(() => {
    const totalSales = orders.reduce(
      (sum, order) => sum + (Number(order.total_price) || 0),
      0
    );
    const monthlySales = orders
      .filter((order) => isCurrentMonth(getOrderDate(order)))
      .reduce((sum, order) => sum + (Number(order.total_price) || 0), 0);
    const averageOrderValue = orders.length > 0 ? totalSales / orders.length : 0;
    const activeCustomerIds = new Set(
      orders
        .filter((order) => order.customer_id && isActiveCustomerOrder(order.status))
        .map((order) => String(order.customer_id))
    );

    return [
      {
        label: "Total Sales",
        value: formatCurrency(totalSales),
        detail: "Sum of live order total_price values",
      },
      {
        label: "Monthly Sales",
        value: formatCurrency(monthlySales),
        detail: "Orders dated in the current month",
      },
      {
        label: "Average Order Value",
        value: formatCurrency(averageOrderValue),
        detail: "Total sales divided by order count",
      },
      {
        label: "Active Customers",
        value: String(activeCustomerIds.size || customers.length),
        detail: "Customers tied to active work or records",
      },
    ];
  }, [customers.length, orders]);

  const monthlyRevenue = useMemo(() => {
    const totals = orders.reduce<Record<string, number>>((lookup, order) => {
      const dateValue = getOrderDate(order);
      const date = new Date(dateValue);

      if (Number.isNaN(date.getTime())) {
        return lookup;
      }

      const label = new Intl.DateTimeFormat("en-US", {
        month: "short",
        year: "2-digit",
      }).format(date);

      lookup[label] = (lookup[label] ?? 0) + (Number(order.total_price) || 0);
      return lookup;
    }, {});

    return Object.entries(totals)
      .map(([label, value]) => ({ label, value }))
      .slice(-6);
  }, [orders]);

  const categorySales = useMemo(() => {
    const productCategoryByName = products.reduce<Record<string, string>>(
      (lookup, product) => {
        if (product.name && product.category) {
          lookup[product.name.toLowerCase()] = product.category;
        }

        return lookup;
      },
      {}
    );

    const totals = orders.reduce<Record<string, number>>((lookup, order) => {
      const productName = order.product_type || "Uncategorized";
      const category =
        productCategoryByName[productName.toLowerCase()] || productName;

      lookup[category] = (lookup[category] ?? 0) + (Number(order.total_price) || 0);
      return lookup;
    }, {});

    return Object.entries(totals)
      .map(([label, value]) => ({ label, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, [orders, products]);

  const repeatCustomers = useMemo(() => {
    const totals = orders.reduce<Record<string, number>>((lookup, order) => {
      if (!order.customer_id) {
        return lookup;
      }

      const customerName =
        customerNameById[String(order.customer_id)] ||
        `Customer ${order.customer_id}`;

      lookup[customerName] = (lookup[customerName] ?? 0) + 1;
      return lookup;
    }, {});

    return Object.entries(totals)
      .filter(([, value]) => value > 1)
      .map(([label, value]) => ({ label, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, [customerNameById, orders]);

  const recentOrders = useMemo(() => {
    return [...orders]
      .sort((a, b) => {
        const aTime = new Date(getOrderDate(a)).getTime();
        const bTime = new Date(getOrderDate(b)).getTime();
        return (Number.isNaN(bTime) ? 0 : bTime) - (Number.isNaN(aTime) ? 0 : aTime);
      })
      .slice(0, 8);
  }, [orders]);

  async function readSalesData() {
    const [ordersResponse, customersResponse, productsResponse] =
      await Promise.all([
        supabase.from("orders").select("*"),
        supabase.from("customers").select("id,name,email,company"),
        supabase.from("products").select("*"),
      ]);

    return {
      orders: (ordersResponse.data ?? []) as Order[],
      ordersError: ordersResponse.error,
      customers: (customersResponse.data ?? []) as Customer[],
      customersError: customersResponse.error,
      products: (productsResponse.data ?? []) as Product[],
      productsError: productsResponse.error,
    };
  }

  async function loadSalesData() {
    setIsLoading(true);
    setErrorMessage("");
    setProductWarning("");

    const {
      orders: nextOrders,
      ordersError,
      customers: nextCustomers,
      customersError,
      products: nextProducts,
      productsError,
    } = await readSalesData();

    if (ordersError || customersError) {
      setErrorMessage(
        ordersError?.message ||
          customersError?.message ||
          "Unable to load sales dashboard data."
      );
      setOrders([]);
      setCustomers([]);
    } else {
      setOrders(nextOrders);
      setCustomers(nextCustomers);
    }

    if (productsError) {
      setProductWarning(
        `Product data unavailable for category matching: ${productsError.message}`
      );
      setProducts([]);
    } else {
      setProducts(nextProducts);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    let isMounted = true;

    readSalesData().then(
      ({
        orders: nextOrders,
        ordersError,
        customers: nextCustomers,
        customersError,
        products: nextProducts,
        productsError,
      }) => {
        if (!isMounted) {
          return;
        }

        if (ordersError || customersError) {
          setErrorMessage(
            ordersError?.message ||
              customersError?.message ||
              "Unable to load sales dashboard data."
          );
          setOrders([]);
          setCustomers([]);
        } else {
          setOrders(nextOrders);
          setCustomers(nextCustomers);
        }

        if (productsError) {
          setProductWarning(
            `Product data unavailable for category matching: ${productsError.message}`
          );
          setProducts([]);
        } else {
          setProducts(nextProducts);
        }

        setIsLoading(false);
      }
    );

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <AdminLayout activeHref="/admin/sales">
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-blue-950/40 p-6 shadow-2xl md:p-8">
        <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-blue-400/10 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/70 to-transparent" />
        <div className="relative flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
              Gradeline Admin
            </p>
            <h1 className="mt-3 max-w-4xl text-4xl font-black tracking-tight text-white drop-shadow-[0_0_18px_rgba(96,165,250,0.18)] md:text-6xl">
              Sales Dashboard
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-300">
              Live sales visibility for custom orders, ready-made products,
              customer activity, and category performance.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={loadSalesData}
              className="rounded-xl bg-blue-400 px-5 py-3 font-bold text-black transition hover:bg-blue-300"
            >
              Refresh Sales
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

      {productWarning && !errorMessage && (
        <p className="mt-6 rounded-2xl border border-amber-300/40 bg-amber-400/10 px-5 py-4 text-sm font-bold text-amber-100">
          {productWarning}
        </p>
      )}

      <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.label}
            detail={metric.detail}
            label={metric.label}
            loading={isLoading}
            value={metric.value}
          />
        ))}
      </section>

      <section className="mt-6 grid gap-5 xl:grid-cols-3">
        <ChartPanel
          title="Monthly Revenue"
          description="Placeholder revenue trend using available order dates and total_price values."
        >
          <BarList
            emptyMessage="Revenue trend placeholder will populate as orders receive dates and totals."
            items={monthlyRevenue}
            valueFormatter={formatCurrency}
          />
        </ChartPanel>

        <ChartPanel
          title="Product Category Sales"
          description="Category view using product records where possible, with order product types as fallback."
        >
          <BarList
            emptyMessage="Product category placeholder will populate as orders and products are added."
            items={categorySales}
            valueFormatter={formatCurrency}
          />
        </ChartPanel>

        <ChartPanel
          title="Repeat Customers"
          description="Placeholder repeat-customer view based on customers with multiple order records."
        >
          <BarList
            emptyMessage="Repeat customer placeholder will populate when customers have multiple orders."
            items={repeatCustomers}
            valueFormatter={(value) => `${value} orders`}
          />
        </ChartPanel>
      </section>

      <section className={`${panelClassName} mt-6 overflow-hidden`}>
        <div className="flex flex-col gap-2 border-b border-white/10 px-5 py-5 md:px-6">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
            Recent Orders
          </p>
          <h2 className="text-2xl font-black text-white">
            Sales Activity Feed
          </h2>
        </div>

        <div className="hidden overflow-x-auto xl:block">
          <table className="w-full border-collapse text-left">
            <thead className="border-b border-white/10 bg-black/30 text-xs font-bold uppercase tracking-widest text-blue-300">
              <tr>
                <th className="px-5 py-4">Order</th>
                <th className="px-5 py-4">Customer</th>
                <th className="px-5 py-4">Product</th>
                <th className="px-5 py-4">Qty</th>
                <th className="px-5 py-4">Total</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {isLoading && (
                <tr>
                  <td className="px-5 py-6 text-zinc-400" colSpan={7}>
                    Loading recent sales activity...
                  </td>
                </tr>
              )}

              {!isLoading &&
                recentOrders.map((order) => (
                  <tr
                    key={order.id ?? order.order_number}
                    className="bg-white/[0.02] transition hover:bg-white/[0.06]"
                  >
                    <td className="px-5 py-4 font-black text-white">
                      {displayValue(order.order_number)}
                    </td>
                    <td className="px-5 py-4 text-zinc-300">
                      {order.customer_id
                        ? customerNameById[String(order.customer_id)] ||
                          `Customer ${order.customer_id}`
                        : "-"}
                    </td>
                    <td className="px-5 py-4 text-zinc-200">
                      {displayValue(order.product_type)}
                    </td>
                    <td className="px-5 py-4 text-zinc-300">
                      {displayValue(order.qty)}
                    </td>
                    <td className="px-5 py-4 font-black text-white">
                      {formatCurrency(Number(order.total_price) || 0)}
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-5 py-4 text-zinc-300">
                      {formatDate(getOrderDate(order))}
                    </td>
                  </tr>
                ))}

              {!isLoading && recentOrders.length === 0 && (
                <tr>
                  <td className="px-5 py-6 text-zinc-400" colSpan={7}>
                    No recent orders found yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="grid gap-4 p-4 xl:hidden">
          {isLoading && (
            <p className="rounded-2xl border border-white/10 bg-black/30 p-5 text-zinc-400">
              Loading recent sales activity...
            </p>
          )}

          {!isLoading &&
            recentOrders.map((order) => (
              <article
                key={order.id ?? order.order_number}
                className="rounded-2xl border border-white/10 bg-black/30 p-5"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-blue-300">
                      {displayValue(order.order_number)}
                    </p>
                    <h3 className="mt-2 text-xl font-black text-white">
                      {displayValue(order.product_type)}
                    </h3>
                    <p className="mt-2 text-zinc-300">
                      {order.customer_id
                        ? customerNameById[String(order.customer_id)] ||
                          `Customer ${order.customer_id}`
                        : "Unassigned Customer"}
                    </p>
                  </div>
                  <StatusBadge status={order.status} />
                </div>

                <div className="mt-5 grid gap-3 text-sm text-zinc-300 sm:grid-cols-2">
                  <p>
                    <span className="font-bold text-zinc-500">Qty: </span>
                    {displayValue(order.qty)}
                  </p>
                  <p>
                    <span className="font-bold text-zinc-500">Total: </span>
                    {formatCurrency(Number(order.total_price) || 0)}
                  </p>
                  <p>
                    <span className="font-bold text-zinc-500">Date: </span>
                    {formatDate(getOrderDate(order))}
                  </p>
                  <p>
                    <span className="font-bold text-zinc-500">Notes: </span>
                    {displayValue(order.description)}
                  </p>
                </div>
              </article>
            ))}

          {!isLoading && recentOrders.length === 0 && (
            <p className="rounded-2xl border border-white/10 bg-black/30 p-5 text-zinc-400">
              No recent orders found yet.
            </p>
          )}
        </div>
      </section>
    </AdminLayout>
  );
}

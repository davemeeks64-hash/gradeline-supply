"use client";

import { type FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import AdminLayout from "@/components/AdminLayout";
import { supabase } from "@/lib/supabase";

type OrderStatus =
  | "New"
  | "Pending Design"
  | "Approved"
  | "File Ready"
  | "In Production"
  | "Finished"
  | "Delivered";

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
  status: OrderStatus | string | null;
  due_date: string | null;
  created_at?: string | null;
};

type OrderFormState = {
  order_number: string;
  customer_id: string;
  product_type: string;
  description: string;
  qty: string;
  total_price: string;
  status: OrderStatus;
  due_date: string;
};

const initialFormState: OrderFormState = {
  order_number: "",
  customer_id: "",
  product_type: "",
  description: "",
  qty: "1",
  total_price: "",
  status: "New",
  due_date: "",
};

const orderStatuses: OrderStatus[] = [
  "New",
  "Pending Design",
  "Approved",
  "File Ready",
  "In Production",
  "Finished",
  "Delivered",
];

const inputClassName =
  "mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-blue-300/60 focus:bg-black/45";

const labelClassName =
  "text-xs font-bold uppercase tracking-widest text-blue-300";

const statusClassNames: Record<OrderStatus, string> = {
  New: "border-blue-300/50 bg-blue-400/10 text-blue-200",
  "Pending Design": "border-sky-300/50 bg-sky-400/10 text-sky-200",
  Approved: "border-emerald-300/50 bg-emerald-400/10 text-emerald-200",
  "File Ready": "border-cyan-300/50 bg-cyan-400/10 text-cyan-200",
  "In Production": "border-amber-300/50 bg-amber-400/10 text-amber-200",
  Finished: "border-zinc-300/50 bg-zinc-300/10 text-zinc-200",
  Delivered: "border-green-300/50 bg-green-400/10 text-green-200",
};

function normalizeId(value: string) {
  const numericValue = Number(value);
  return Number.isNaN(numericValue) ? value : numericValue;
}

function displayValue(value: string | number | null | undefined) {
  return value === null || value === undefined || value === "" ? "-" : value;
}

function formatCurrency(value: number | null | undefined) {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "-";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function formatDate(value: string | null | undefined) {
  if (!value) {
    return "-";
  }

  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function getStatusClassName(status: string | null | undefined) {
  return status && status in statusClassNames
    ? statusClassNames[status as OrderStatus]
    : "border-white/20 bg-white/10 text-zinc-200";
}

function StatusBadge({ status }: { status: string | null | undefined }) {
  return (
    <span
      className={[
        "inline-flex w-fit rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-widest",
        getStatusClassName(status),
      ].join(" ")}
    >
      {displayValue(status)}
    </span>
  );
}

function OrderField({
  label,
  name,
  onChange,
  placeholder,
  required = false,
  step,
  type = "text",
  value,
}: {
  label: string;
  name: keyof OrderFormState;
  onChange: (name: keyof OrderFormState, value: string) => void;
  placeholder: string;
  required?: boolean;
  step?: string;
  type?: string;
  value: string;
}) {
  return (
    <label className="block">
      <span className={labelClassName}>{label}</span>
      <input
        className={inputClassName}
        name={name}
        onChange={(event) => onChange(name, event.target.value)}
        placeholder={placeholder}
        required={required}
        step={step}
        type={type}
        value={value}
      />
    </label>
  );
}

export default function AdminOrdersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [formState, setFormState] = useState<OrderFormState>(initialFormState);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const customerNameById = useMemo(() => {
    return customers.reduce<Record<string, string>>((lookup, customer) => {
      lookup[String(customer.id)] =
        customer.name || customer.company || customer.email || "Unnamed Customer";
      return lookup;
    }, {});
  }, [customers]);

  async function readPageData() {
    const [customersResponse, ordersResponse] = await Promise.all([
      supabase.from("customers").select("id,name,email,company"),
      supabase.from("orders").select("*"),
    ]);

    return {
      customers: (customersResponse.data ?? []) as Customer[],
      customersError: customersResponse.error,
      orders: (ordersResponse.data ?? []) as Order[],
      ordersError: ordersResponse.error,
    };
  }

  async function loadPageData() {
    setIsLoading(true);
    setErrorMessage("");

    const { customers: nextCustomers, customersError, orders: nextOrders, ordersError } =
      await readPageData();

    if (customersError || ordersError) {
      setErrorMessage(
        customersError?.message || ordersError?.message || "Unable to load orders."
      );
      setCustomers([]);
      setOrders([]);
    } else {
      setCustomers(nextCustomers);
      setOrders(nextOrders);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    let isMounted = true;

    readPageData().then(
      ({ customers: nextCustomers, customersError, orders: nextOrders, ordersError }) => {
        if (!isMounted) {
          return;
        }

        if (customersError || ordersError) {
          setErrorMessage(
            customersError?.message ||
              ordersError?.message ||
              "Unable to load orders."
          );
          setCustomers([]);
          setOrders([]);
        } else {
          setCustomers(nextCustomers);
          setOrders(nextOrders);
        }

        setIsLoading(false);
      }
    );

    return () => {
      isMounted = false;
    };
  }, []);

  function updateFormField(name: keyof OrderFormState, value: string) {
    setFormState((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setErrorMessage("");
    setSuccessMessage("");

    const payload = {
      order_number: formState.order_number.trim(),
      customer_id: normalizeId(formState.customer_id),
      product_type: formState.product_type.trim(),
      description: formState.description.trim(),
      qty: Number(formState.qty),
      total_price: Number(formState.total_price),
      status: formState.status,
      due_date: formState.due_date || null,
    };

    const { error } = await supabase.from("orders").insert(payload);

    if (error) {
      setErrorMessage(error.message);
      setIsSaving(false);
      return;
    }

    setSuccessMessage("Order saved successfully.");
    setFormState(initialFormState);
    await loadPageData();
    setIsSaving(false);
  }

  return (
    <AdminLayout activeHref="/admin/orders">
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-blue-950/40 p-6 shadow-2xl md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
              Gradeline Admin
            </p>
            <h1 className="mt-3 text-4xl font-black md:text-6xl">Orders</h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-300">
              Create orders in Supabase, attach them to customers, and review
              the live order queue.
            </p>
          </div>

          <Link
            href="/admin"
            className="inline-flex w-fit rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-bold text-white transition hover:border-blue-300/40 hover:bg-blue-400/10"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>

      <section className="mt-6 rounded-3xl border border-white/10 bg-[linear-gradient(145deg,rgba(24,31,38,0.78),rgba(7,9,12,0.96))] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.28)] md:p-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className={labelClassName}>New Order</p>
            <h2 className="mt-2 text-3xl font-black">Order Details</h2>
          </div>
          <p className="text-sm text-zinc-400">
            Select a customer before saving an order.
          </p>
        </div>

        <form className="mt-6 grid gap-5" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <OrderField
              label="Order Number"
              name="order_number"
              onChange={updateFormField}
              placeholder="GL-1001"
              required
              value={formState.order_number}
            />

            <label className="block">
              <span className={labelClassName}>Customer</span>
              <select
                className={inputClassName}
                name="customer_id"
                onChange={(event) =>
                  updateFormField("customer_id", event.target.value)
                }
                required
                value={formState.customer_id}
              >
                <option value="" disabled>
                  Select customer
                </option>
                {customers.map((customer) => (
                  <option key={customer.id} value={String(customer.id)}>
                    {customer.name ||
                      customer.company ||
                      customer.email ||
                      `Customer ${customer.id}`}
                  </option>
                ))}
              </select>
            </label>

            <OrderField
              label="Product Type"
              name="product_type"
              onChange={updateFormField}
              placeholder="Cutting board, patch, sign"
              required
              value={formState.product_type}
            />

            <OrderField
              label="Quantity"
              name="qty"
              onChange={updateFormField}
              placeholder="1"
              required
              type="number"
              value={formState.qty}
            />

            <OrderField
              label="Total Price"
              name="total_price"
              onChange={updateFormField}
              placeholder="125.00"
              required
              step="0.01"
              type="number"
              value={formState.total_price}
            />

            <label className="block">
              <span className={labelClassName}>Status</span>
              <select
                className={inputClassName}
                name="status"
                onChange={(event) =>
                  updateFormField("status", event.target.value)
                }
                value={formState.status}
              >
                {orderStatuses.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
            </label>

            <OrderField
              label="Due Date"
              name="due_date"
              onChange={updateFormField}
              placeholder="Select due date"
              type="date"
              value={formState.due_date}
            />
          </div>

          <label className="block">
            <span className={labelClassName}>Description</span>
            <textarea
              className={`${inputClassName} min-h-32 resize-y`}
              name="description"
              onChange={(event) =>
                updateFormField("description", event.target.value)
              }
              placeholder="Order details, product notes, design direction, material, finish, or customer requests"
              value={formState.description}
            />
          </label>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="submit"
              className="rounded-xl bg-blue-400 px-6 py-3 font-bold text-black transition hover:bg-blue-300 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isSaving || customers.length === 0}
            >
              {isSaving ? "Saving..." : "Save Order"}
            </button>
            <button
              type="button"
              className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-bold text-white transition hover:border-blue-300/40 hover:bg-blue-400/10"
              onClick={() => setFormState(initialFormState)}
            >
              Clear Form
            </button>
          </div>

          {successMessage && (
            <p
              role="status"
              className="rounded-2xl border border-blue-300/40 bg-blue-400/10 px-5 py-4 font-bold text-blue-100"
            >
              {successMessage}
            </p>
          )}

          {errorMessage && (
            <p
              role="alert"
              className="rounded-2xl border border-red-400/40 bg-red-500/10 px-5 py-4 font-bold text-red-100"
            >
              {errorMessage}
            </p>
          )}
        </form>
      </section>

      <section className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-[0_18px_45px_rgba(0,0,0,0.28)]">
        <div className="flex flex-col gap-3 border-b border-white/10 bg-black/30 p-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className={labelClassName}>Supabase Orders</p>
            <h2 className="mt-2 text-2xl font-black">
              Order List ({orders.length})
            </h2>
          </div>
          <button
            type="button"
            onClick={loadPageData}
            className="w-fit rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-bold text-white transition hover:border-blue-300/40 hover:bg-blue-400/10"
          >
            Refresh List
          </button>
        </div>

        {isLoading && <div className="p-5 text-zinc-300">Loading orders...</div>}

        {!isLoading && orders.length === 0 && (
          <div className="p-5 text-zinc-300">No orders found yet.</div>
        )}

        {!isLoading && orders.length > 0 && (
          <>
            <div className="hidden overflow-x-auto xl:block">
              <table className="w-full border-collapse text-left">
                <thead className="border-b border-white/10 bg-black/30 text-xs font-bold uppercase tracking-widest text-blue-300">
                  <tr>
                    <th className="px-5 py-4">Order</th>
                    <th className="px-5 py-4">Customer</th>
                    <th className="px-5 py-4">Product</th>
                    <th className="px-5 py-4">Qty</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4">Due</th>
                    <th className="px-5 py-4 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {orders.map((order, index) => (
                    <tr
                      key={order.id ?? `${order.order_number}-${index}`}
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
                        <p className="font-bold">
                          {displayValue(order.product_type)}
                        </p>
                        <p className="mt-1 max-w-md text-sm leading-6 text-zinc-500">
                          {displayValue(order.description)}
                        </p>
                      </td>
                      <td className="px-5 py-4 font-black text-white">
                        {displayValue(order.qty)}
                      </td>
                      <td className="px-5 py-4">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="px-5 py-4 text-zinc-300">
                        {formatDate(order.due_date)}
                      </td>
                      <td className="px-5 py-4 text-right font-black text-white">
                        {formatCurrency(order.total_price)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid gap-4 p-4 xl:hidden">
              {orders.map((order, index) => (
                <article
                  key={order.id ?? `${order.order_number}-${index}`}
                  className="rounded-2xl border border-white/10 bg-black/30 p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-blue-300">
                        {displayValue(order.order_number)}
                      </p>
                      <h3 className="mt-2 text-xl font-black text-white">
                        {order.customer_id
                          ? customerNameById[String(order.customer_id)] ||
                            `Customer ${order.customer_id}`
                          : "Unassigned Customer"}
                      </h3>
                    </div>
                    <p className="shrink-0 text-lg font-black text-white">
                      {formatCurrency(order.total_price)}
                    </p>
                  </div>

                  <div className="mt-4 grid gap-3 text-sm text-zinc-300">
                    <p>
                      <span className="font-bold text-zinc-500">Product: </span>
                      {displayValue(order.product_type)}
                    </p>
                    <p>
                      <span className="font-bold text-zinc-500">Qty: </span>
                      {displayValue(order.qty)}
                    </p>
                    <p>
                      <span className="font-bold text-zinc-500">Due: </span>
                      {formatDate(order.due_date)}
                    </p>
                    <p>
                      <span className="font-bold text-zinc-500">
                        Description:{" "}
                      </span>
                      {displayValue(order.description)}
                    </p>
                  </div>

                  <div className="mt-4">
                    <StatusBadge status={order.status} />
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </section>
    </AdminLayout>
  );
}

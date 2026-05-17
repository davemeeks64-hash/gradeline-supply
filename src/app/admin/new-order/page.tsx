"use client";

import { type FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import AdminLayout from "@/components/AdminLayout";
import { supabase } from "@/lib/supabase";

type OrderStatus =
  | "new"
  | "pending design"
  | "approved"
  | "file ready"
  | "in production"
  | "finished"
  | "delivered";

type Customer = {
  id: string | number;
  name: string | null;
  email: string | null;
  company: string | null;
};

type InventoryItem = {
  id: string | number;
  sku: string | null;
  item_name: string | null;
  quantity_on_hand: number | null;
};

type OrderFormState = {
  customer_id: string;
  inventory_item_id: string;
  order_number: string;
  product_type: string;
  description: string;
  qty: string;
  total_price: string;
  due_date: string;
  status: OrderStatus;
};

const initialFormState: OrderFormState = {
  customer_id: "",
  inventory_item_id: "",
  order_number: "",
  product_type: "",
  description: "",
  qty: "1",
  total_price: "",
  due_date: "",
  status: "new",
};

const orderStatuses: OrderStatus[] = [
  "new",
  "pending design",
  "approved",
  "file ready",
  "in production",
  "finished",
  "delivered",
];

const inputClassName =
  "mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-blue-300/60 focus:bg-black/45";

const labelClassName =
  "text-xs font-bold uppercase tracking-widest text-blue-300";

function normalizeId(value: string) {
  const numericValue = Number(value);
  return Number.isNaN(numericValue) ? value : numericValue;
}

function formatStatusLabel(status: string) {
  return status.replace(/\b\w/g, (letter) => letter.toUpperCase());
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

export default function AdminNewOrderPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [formState, setFormState] = useState<OrderFormState>(initialFormState);
  const [isLoadingCustomers, setIsLoadingCustomers] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function readFormData() {
    const [customersResponse, inventoryResponse] = await Promise.all([
      supabase.from("customers").select("id,name,email,company"),
      supabase
        .from("inventory_items")
        .select("id,sku,item_name,quantity_on_hand"),
    ]);

    return {
      customers: (customersResponse.data ?? []) as Customer[],
      customersError: customersResponse.error,
      inventoryItems: (inventoryResponse.data ?? []) as InventoryItem[],
      inventoryError: inventoryResponse.error,
    };
  }

  async function loadCustomers() {
    setIsLoadingCustomers(true);
    setErrorMessage("");

    const {
      customers: nextCustomers,
      customersError,
      inventoryItems: nextInventoryItems,
      inventoryError,
    } = await readFormData();

    if (customersError || inventoryError) {
      setErrorMessage(
        customersError?.message ||
          inventoryError?.message ||
          "Unable to load form data."
      );
      setCustomers([]);
      setInventoryItems([]);
    } else {
      setCustomers(nextCustomers);
      setInventoryItems(nextInventoryItems);
    }

    setIsLoadingCustomers(false);
  }

  useEffect(() => {
    let isMounted = true;

    readFormData().then(
      ({
        customers: nextCustomers,
        customersError,
        inventoryItems: nextInventoryItems,
        inventoryError,
      }) => {
        if (!isMounted) {
          return;
        }

        if (customersError || inventoryError) {
          setErrorMessage(
            customersError?.message ||
              inventoryError?.message ||
              "Unable to load form data."
          );
          setCustomers([]);
          setInventoryItems([]);
        } else {
          setCustomers(nextCustomers);
          setInventoryItems(nextInventoryItems);
        }

        setIsLoadingCustomers(false);
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
      customer_id: normalizeId(formState.customer_id),
      order_number: formState.order_number.trim(),
      product_type: formState.product_type.trim(),
      description: formState.description.trim(),
      qty: Number(formState.qty),
      total_price: Number(formState.total_price),
      due_date: formState.due_date || null,
      status: formState.status,
      ...(formState.inventory_item_id
        ? { inventory_item_id: normalizeId(formState.inventory_item_id) }
        : {}),
    };

    const { error } = await supabase.from("orders").insert(payload);

    if (error) {
      setErrorMessage(error.message);
      setIsSaving(false);
      return;
    }

    setSuccessMessage("Order created successfully.");
    setFormState(initialFormState);
    setIsSaving(false);
  }

  return (
    <AdminLayout activeHref="/admin/new-order">
      <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-blue-950/40 p-6 shadow-2xl md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
              Gradeline Admin
            </p>
            <h1 className="mt-3 text-4xl font-black md:text-6xl">
              New Order
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-300">
              Create a live Supabase order, assign it to a customer, and send
              it into the shop queue.
            </p>
          </div>

          <Link
            href="/admin/orders"
            className="inline-flex w-fit rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-bold text-white transition hover:border-blue-300/40 hover:bg-blue-400/10"
          >
            Back to Orders
          </Link>
        </div>
      </section>

      <section className="mt-6 rounded-3xl border border-white/10 bg-[linear-gradient(145deg,rgba(24,31,38,0.78),rgba(7,9,12,0.96))] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.28)] md:p-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className={labelClassName}>Order Intake</p>
            <h2 className="mt-2 text-3xl font-black">Order Details</h2>
          </div>
          <button
            type="button"
            onClick={loadCustomers}
            className="w-fit rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-bold text-white transition hover:border-blue-300/40 hover:bg-blue-400/10"
          >
            Refresh Customers
          </button>
        </div>

        <form className="mt-6 grid gap-5" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <label className="block">
              <span className={labelClassName}>Customer</span>
              <select
                className={inputClassName}
                disabled={isLoadingCustomers || customers.length === 0}
                name="customer_id"
                onChange={(event) =>
                  updateFormField("customer_id", event.target.value)
                }
                required
                value={formState.customer_id}
              >
                <option value="" disabled>
                  {isLoadingCustomers
                    ? "Loading customers"
                    : "Select customer"}
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
              label="Order Number"
              name="order_number"
              onChange={updateFormField}
              placeholder="GL-1001"
              required
              value={formState.order_number}
            />

            <OrderField
              label="Product Type"
              name="product_type"
              onChange={updateFormField}
              placeholder="Cutting board, patch, sign"
              required
              value={formState.product_type}
            />

            <label className="block">
              <span className={labelClassName}>Linked Inventory Item</span>
              <select
                className={inputClassName}
                disabled={isLoadingCustomers}
                name="inventory_item_id"
                onChange={(event) =>
                  updateFormField("inventory_item_id", event.target.value)
                }
                value={formState.inventory_item_id}
              >
                <option value="">No linked blank yet</option>
                {inventoryItems.map((item) => (
                  <option key={item.id} value={String(item.id)}>
                    {item.sku || `Inventory ${item.id}`} /{" "}
                    {item.item_name || "Unnamed blank"} /{" "}
                    {item.quantity_on_hand ?? 0} on hand
                  </option>
                ))}
              </select>
            </label>

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

            <OrderField
              label="Due Date"
              name="due_date"
              onChange={updateFormField}
              placeholder="Select due date"
              type="date"
              value={formState.due_date}
            />

            <label className="block">
              <span className={labelClassName}>Status</span>
              <select
                className={inputClassName}
                name="status"
                onChange={(event) => updateFormField("status", event.target.value)}
                value={formState.status}
              >
                {orderStatuses.map((status) => (
                  <option key={status} value={status}>
                    {formatStatusLabel(status)}
                  </option>
                ))}
              </select>
            </label>
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
              disabled={isSaving || isLoadingCustomers || customers.length === 0}
            >
              {isSaving ? "Saving..." : "Create Order"}
            </button>
            <button
              type="button"
              className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-bold text-white transition hover:border-blue-300/40 hover:bg-blue-400/10"
              onClick={() => {
                setFormState(initialFormState);
                setSuccessMessage("");
                setErrorMessage("");
              }}
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
    </AdminLayout>
  );
}

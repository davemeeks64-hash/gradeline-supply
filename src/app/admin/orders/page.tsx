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

type DesignStatus =
  | "Not Started"
  | "In Design"
  | "Proof Sent"
  | "Approved"
  | "Revision Needed";

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
  reorder_level: number | null;
};

type Order = {
  id?: string | number;
  order_number: string | null;
  customer_id: string | number | null;
  inventory_item_id?: string | number | null;
  product_type: string | null;
  description: string | null;
  qty: number | null;
  total_price: number | null;
  status: OrderStatus | string | null;
  design_status?: DesignStatus | string | null;
  proof_sent_date?: string | null;
  approval_date?: string | null;
  design_notes?: string | null;
  proof_file_url?: string | null;
  customer_artwork_url?: string | null;
  final_design_file_url?: string | null;
  lightburn_file_url?: string | null;
  due_date: string | null;
  created_at?: string | null;
};

type OrderFormState = {
  order_number: string;
  customer_id: string;
  inventory_item_id: string;
  product_type: string;
  description: string;
  qty: string;
  total_price: string;
  status: OrderStatus;
  design_status: DesignStatus;
  proof_sent_date: string;
  approval_date: string;
  design_notes: string;
  proof_file_url: string;
  customer_artwork_url: string;
  final_design_file_url: string;
  lightburn_file_url: string;
  due_date: string;
};

type FileLinkField =
  | "proof_file_url"
  | "customer_artwork_url"
  | "final_design_file_url"
  | "lightburn_file_url";

type FileLinkDraft = Record<FileLinkField, string>;

const initialFormState: OrderFormState = {
  order_number: "",
  customer_id: "",
  inventory_item_id: "",
  product_type: "",
  description: "",
  qty: "1",
  total_price: "",
  status: "New",
  design_status: "Not Started",
  proof_sent_date: "",
  approval_date: "",
  design_notes: "",
  proof_file_url: "",
  customer_artwork_url: "",
  final_design_file_url: "",
  lightburn_file_url: "",
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

const designStatuses: DesignStatus[] = [
  "Not Started",
  "In Design",
  "Proof Sent",
  "Approved",
  "Revision Needed",
];

const fileLinkFields: { key: FileLinkField; label: string }[] = [
  { key: "proof_file_url", label: "Proof" },
  { key: "customer_artwork_url", label: "Customer Art" },
  { key: "final_design_file_url", label: "Final Design" },
  { key: "lightburn_file_url", label: "LightBurn" },
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

const designStatusClassNames: Record<DesignStatus, string> = {
  "Not Started": "border-zinc-300/50 bg-zinc-300/10 text-zinc-200",
  "In Design": "border-blue-300/50 bg-blue-400/10 text-blue-200",
  "Proof Sent": "border-cyan-300/50 bg-cyan-400/10 text-cyan-200",
  Approved: "border-emerald-300/50 bg-emerald-400/10 text-emerald-200",
  "Revision Needed": "border-amber-300/50 bg-amber-400/10 text-amber-200",
};

function normalizeId(value: string) {
  const numericValue = Number(value);
  return Number.isNaN(numericValue) ? value : numericValue;
}

function displayValue(value: string | number | null | undefined) {
  return value === null || value === undefined || value === "" ? "-" : value;
}

function getOrderKey(order: Order) {
  return String(order.id ?? order.order_number ?? "");
}

function getFileLinkDraftFromOrder(order: Order): FileLinkDraft {
  return {
    proof_file_url: order.proof_file_url ?? "",
    customer_artwork_url: order.customer_artwork_url ?? "",
    final_design_file_url: order.final_design_file_url ?? "",
    lightburn_file_url: order.lightburn_file_url ?? "",
  };
}

function buildFileLinkDrafts(orders: Order[]) {
  return orders.reduce<Record<string, FileLinkDraft>>((drafts, order) => {
    drafts[getOrderKey(order)] = getFileLinkDraftFromOrder(order);
    return drafts;
  }, {});
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

function getDesignStatusClassName(status: string | null | undefined) {
  return status && status in designStatusClassNames
    ? designStatusClassNames[status as DesignStatus]
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

function DesignStatusBadge({ status }: { status: string | null | undefined }) {
  return (
    <span
      className={[
        "inline-flex w-fit rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-widest",
        getDesignStatusClassName(status),
      ].join(" ")}
    >
      {displayValue(status)}
    </span>
  );
}

function FileLinkButtons({ order }: { order: Order }) {
  const fileLinks = [
    { label: "Proof", url: order.proof_file_url },
    { label: "Customer Art", url: order.customer_artwork_url },
    { label: "Final Design", url: order.final_design_file_url },
    { label: "LightBurn", url: order.lightburn_file_url },
  ].filter((fileLink): fileLink is { label: string; url: string } =>
    Boolean(fileLink.url)
  );

  if (fileLinks.length === 0) {
    return <span className="text-xs text-zinc-500">No file links yet</span>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {fileLinks.map((fileLink) => (
        <a
          key={fileLink.label}
          href={fileLink.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex rounded-lg border border-blue-300/30 bg-blue-400/10 px-3 py-2 text-xs font-bold uppercase tracking-widest text-blue-100 transition hover:bg-blue-400/20"
        >
          {fileLink.label}
        </a>
      ))}
    </div>
  );
}

function FileLinkEditor({
  draft,
  isSaving,
  onChange,
  onSave,
}: {
  draft: FileLinkDraft;
  isSaving: boolean;
  onChange: (field: FileLinkField, value: string) => void;
  onSave: () => void;
}) {
  return (
    <div className="grid gap-3">
      <div className="grid gap-2">
        {fileLinkFields.map((field) => (
          <label key={field.key} className="block">
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
              {field.label}
            </span>
            <input
              className={`${inputClassName} py-2 text-xs`}
              onChange={(event) => onChange(field.key, event.target.value)}
              placeholder="https://..."
              type="url"
              value={draft[field.key]}
            />
          </label>
        ))}
      </div>
      <button
        type="button"
        onClick={onSave}
        disabled={isSaving}
        className="w-fit rounded-lg border border-blue-300/30 bg-blue-400/10 px-3 py-2 text-xs font-bold uppercase tracking-widest text-blue-100 transition hover:bg-blue-400/20 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSaving ? "Saving..." : "Save Links"}
      </button>
    </div>
  );
}

function InventoryLinkSummary({
  item,
  quantity,
}: {
  item: InventoryItem | undefined;
  quantity: number | null | undefined;
}) {
  if (!item) {
    return <span className="text-zinc-500">No linked blank</span>;
  }

  const onHand = Number(item.quantity_on_hand) || 0;
  const orderQty = Number(quantity) || 0;
  const willNeedReview = orderQty > onHand;

  return (
    <span
      className={willNeedReview ? "font-bold text-amber-200" : "text-zinc-300"}
    >
      {displayValue(item.sku)} / {displayValue(item.item_name)} / {onHand} on
      hand
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
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [formState, setFormState] = useState<OrderFormState>(initialFormState);
  const [fileLinkDrafts, setFileLinkDrafts] = useState<
    Record<string, FileLinkDraft>
  >({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [savingFileLinksOrderId, setSavingFileLinksOrderId] = useState<
    string | number | null
  >(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const customerNameById = useMemo(() => {
    return customers.reduce<Record<string, string>>((lookup, customer) => {
      lookup[String(customer.id)] =
        customer.name || customer.company || customer.email || "Unnamed Customer";
      return lookup;
    }, {});
  }, [customers]);

  const inventoryItemById = useMemo(() => {
    return inventoryItems.reduce<Record<string, InventoryItem>>((lookup, item) => {
      lookup[String(item.id)] = item;
      return lookup;
    }, {});
  }, [inventoryItems]);

  async function readPageData() {
    const [customersResponse, ordersResponse, inventoryResponse] = await Promise.all([
      supabase.from("customers").select("id,name,email,company"),
      supabase.from("orders").select("*"),
      supabase
        .from("inventory_items")
        .select("id,sku,item_name,quantity_on_hand,reorder_level"),
    ]);

    return {
      customers: (customersResponse.data ?? []) as Customer[],
      customersError: customersResponse.error,
      inventoryItems: (inventoryResponse.data ?? []) as InventoryItem[],
      inventoryError: inventoryResponse.error,
      orders: (ordersResponse.data ?? []) as Order[],
      ordersError: ordersResponse.error,
    };
  }

  async function loadPageData() {
    setIsLoading(true);
    setErrorMessage("");

    const {
      customers: nextCustomers,
      customersError,
      inventoryItems: nextInventoryItems,
      inventoryError,
      orders: nextOrders,
      ordersError,
    } = await readPageData();

    if (customersError || ordersError || inventoryError) {
      setErrorMessage(
        customersError?.message ||
          ordersError?.message ||
          inventoryError?.message ||
          "Unable to load orders."
      );
      setCustomers([]);
      setInventoryItems([]);
      setOrders([]);
      setFileLinkDrafts({});
    } else {
      setCustomers(nextCustomers);
      setInventoryItems(nextInventoryItems);
      setOrders(nextOrders);
      setFileLinkDrafts(buildFileLinkDrafts(nextOrders));
    }

    setIsLoading(false);
  }

  useEffect(() => {
    let isMounted = true;

    readPageData().then(
      ({
        customers: nextCustomers,
        customersError,
        inventoryItems: nextInventoryItems,
        inventoryError,
        orders: nextOrders,
        ordersError,
      }) => {
        if (!isMounted) {
          return;
        }

        if (customersError || ordersError || inventoryError) {
          setErrorMessage(
            customersError?.message ||
              ordersError?.message ||
              inventoryError?.message ||
              "Unable to load orders."
          );
          setCustomers([]);
          setInventoryItems([]);
          setOrders([]);
          setFileLinkDrafts({});
        } else {
          setCustomers(nextCustomers);
          setInventoryItems(nextInventoryItems);
          setOrders(nextOrders);
          setFileLinkDrafts(buildFileLinkDrafts(nextOrders));
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

  function updateFileLinkDraft(
    order: Order,
    field: FileLinkField,
    value: string
  ) {
    const orderKey = getOrderKey(order);

    setFileLinkDrafts((currentDrafts) => ({
      ...currentDrafts,
      [orderKey]: {
        ...(currentDrafts[orderKey] ?? getFileLinkDraftFromOrder(order)),
        [field]: value,
      },
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
      design_status: formState.design_status,
      proof_sent_date: formState.proof_sent_date || null,
      approval_date: formState.approval_date || null,
      design_notes: formState.design_notes.trim(),
      proof_file_url: formState.proof_file_url.trim() || null,
      customer_artwork_url: formState.customer_artwork_url.trim() || null,
      final_design_file_url: formState.final_design_file_url.trim() || null,
      lightburn_file_url: formState.lightburn_file_url.trim() || null,
      due_date: formState.due_date || null,
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

    setSuccessMessage("Order saved successfully.");
    setFormState(initialFormState);
    await loadPageData();
    setIsSaving(false);
  }

  async function updateOrderDesignStatus(
    order: Order,
    nextDesignStatus: DesignStatus
  ) {
    if (!order.id) {
      setErrorMessage("Cannot update design status without an order id.");
      return;
    }

    setErrorMessage("");
    setSuccessMessage("");

    const { error } = await supabase
      .from("orders")
      .update({ design_status: nextDesignStatus })
      .eq("id", order.id);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    setOrders((currentOrders) =>
      currentOrders.map((currentOrder) =>
        currentOrder.id === order.id
          ? { ...currentOrder, design_status: nextDesignStatus }
          : currentOrder
      )
    );
    setSuccessMessage(
      `${displayValue(order.order_number)} design status updated.`
    );
  }

  async function saveOrderFileLinks(order: Order) {
    if (!order.id) {
      setErrorMessage("Cannot save file links without an order id.");
      return;
    }

    const orderKey = getOrderKey(order);
    const draft = fileLinkDrafts[orderKey] ?? getFileLinkDraftFromOrder(order);
    const payload = {
      proof_file_url: draft.proof_file_url.trim() || null,
      customer_artwork_url: draft.customer_artwork_url.trim() || null,
      final_design_file_url: draft.final_design_file_url.trim() || null,
      lightburn_file_url: draft.lightburn_file_url.trim() || null,
    };

    setSavingFileLinksOrderId(order.id);
    setErrorMessage("");
    setSuccessMessage("");

    const { error } = await supabase
      .from("orders")
      .update(payload)
      .eq("id", order.id);

    if (error) {
      setErrorMessage(error.message);
      setSavingFileLinksOrderId(null);
      return;
    }

    setOrders((currentOrders) =>
      currentOrders.map((currentOrder) =>
        currentOrder.id === order.id ? { ...currentOrder, ...payload } : currentOrder
      )
    );
    setFileLinkDrafts((currentDrafts) => ({
      ...currentDrafts,
      [orderKey]: {
        proof_file_url: payload.proof_file_url ?? "",
        customer_artwork_url: payload.customer_artwork_url ?? "",
        final_design_file_url: payload.final_design_file_url ?? "",
        lightburn_file_url: payload.lightburn_file_url ?? "",
      },
    }));
    setSuccessMessage(`${displayValue(order.order_number)} file links saved.`);
    setSavingFileLinksOrderId(null);
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

            <label className="block">
              <span className={labelClassName}>Linked Inventory Item</span>
              <select
                className={inputClassName}
                name="inventory_item_id"
                onChange={(event) =>
                  updateFormField("inventory_item_id", event.target.value)
                }
                value={formState.inventory_item_id}
              >
                <option value="">No linked blank yet</option>
                {inventoryItems.map((item) => (
                  <option key={item.id} value={String(item.id)}>
                    {displayValue(item.sku)} / {displayValue(item.item_name)} /{" "}
                    {displayValue(item.quantity_on_hand)} on hand
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

            <label className="block">
              <span className={labelClassName}>Design Status</span>
              <select
                className={inputClassName}
                name="design_status"
                onChange={(event) =>
                  updateFormField("design_status", event.target.value)
                }
                value={formState.design_status}
              >
                {designStatuses.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
            </label>

            <OrderField
              label="Proof Sent Date"
              name="proof_sent_date"
              onChange={updateFormField}
              placeholder="Select proof sent date"
              type="date"
              value={formState.proof_sent_date}
            />

            <OrderField
              label="Approval Date"
              name="approval_date"
              onChange={updateFormField}
              placeholder="Select approval date"
              type="date"
              value={formState.approval_date}
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

          <label className="block">
            <span className={labelClassName}>Design Notes</span>
            <textarea
              className={`${inputClassName} min-h-28 resize-y`}
              name="design_notes"
              onChange={(event) =>
                updateFormField("design_notes", event.target.value)
              }
              placeholder="Artwork notes, proof feedback, revision requests, approval context"
              value={formState.design_notes}
            />
          </label>

          <section className="rounded-2xl border border-white/10 bg-black/25 p-4">
            <div>
              <p className={labelClassName}>Proof & File Tracking</p>
              <h3 className="mt-2 text-xl font-black text-white">
                File Links
              </h3>
              <p className="mt-2 text-sm leading-6 text-zinc-400">
                Paste shared links for now. Upload/storage automation can come
                later.
              </p>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <OrderField
                label="Proof File URL"
                name="proof_file_url"
                onChange={updateFormField}
                placeholder="https://..."
                type="url"
                value={formState.proof_file_url}
              />

              <OrderField
                label="Customer Artwork URL"
                name="customer_artwork_url"
                onChange={updateFormField}
                placeholder="https://..."
                type="url"
                value={formState.customer_artwork_url}
              />

              <OrderField
                label="Final Design File URL"
                name="final_design_file_url"
                onChange={updateFormField}
                placeholder="https://..."
                type="url"
                value={formState.final_design_file_url}
              />

              <OrderField
                label="LightBurn File URL"
                name="lightburn_file_url"
                onChange={updateFormField}
                placeholder="https://..."
                type="url"
                value={formState.lightburn_file_url}
              />
            </div>
          </section>

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
                    <th className="px-5 py-4">Inventory Link</th>
                    <th className="px-5 py-4">Qty</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4">Design</th>
                    <th className="px-5 py-4">Files</th>
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
                      <td className="px-5 py-4 text-sm">
                        <InventoryLinkSummary
                          item={
                            order.inventory_item_id
                              ? inventoryItemById[String(order.inventory_item_id)]
                              : undefined
                          }
                          quantity={order.qty}
                        />
                      </td>
                      <td className="px-5 py-4 font-black text-white">
                        {displayValue(order.qty)}
                      </td>
                      <td className="px-5 py-4">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="px-5 py-4">
                        <div className="grid gap-3">
                          <DesignStatusBadge
                            status={order.design_status || "Not Started"}
                          />
                          <select
                            className={`${inputClassName} min-w-48 text-sm`}
                            onChange={(event) =>
                              updateOrderDesignStatus(
                                order,
                                event.target.value as DesignStatus
                              )
                            }
                            value={order.design_status || "Not Started"}
                          >
                            {designStatuses.map((status) => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                          </select>
                          <p className="text-xs leading-5 text-zinc-500">
                            Proof: {formatDate(order.proof_sent_date)} /
                            Approved: {formatDate(order.approval_date)}
                          </p>
                          {order.design_notes && (
                            <p className="max-w-xs text-xs leading-5 text-zinc-400">
                              {order.design_notes}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="grid min-w-64 gap-3">
                          <FileLinkButtons order={order} />
                          <FileLinkEditor
                            draft={
                              fileLinkDrafts[getOrderKey(order)] ??
                              getFileLinkDraftFromOrder(order)
                            }
                            isSaving={savingFileLinksOrderId === order.id}
                            onChange={(field, value) =>
                              updateFileLinkDraft(order, field, value)
                            }
                            onSave={() => saveOrderFileLinks(order)}
                          />
                        </div>
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
                      <span className="font-bold text-zinc-500">
                        Inventory:{" "}
                      </span>
                      <InventoryLinkSummary
                        item={
                          order.inventory_item_id
                            ? inventoryItemById[String(order.inventory_item_id)]
                            : undefined
                        }
                        quantity={order.qty}
                      />
                    </p>
                    <p>
                      <span className="font-bold text-zinc-500">Due: </span>
                      {formatDate(order.due_date)}
                    </p>
                    <div>
                      <p className="font-bold text-zinc-500">Design:</p>
                      <div className="mt-2 grid gap-2">
                        <DesignStatusBadge
                          status={order.design_status || "Not Started"}
                        />
                        <select
                          className={`${inputClassName} text-sm`}
                          onChange={(event) =>
                            updateOrderDesignStatus(
                              order,
                              event.target.value as DesignStatus
                            )
                          }
                          value={order.design_status || "Not Started"}
                        >
                          {designStatuses.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                        <p className="text-xs leading-5 text-zinc-500">
                          Proof: {formatDate(order.proof_sent_date)} /
                          Approved: {formatDate(order.approval_date)}
                        </p>
                        {order.design_notes && (
                          <p className="text-xs leading-5 text-zinc-400">
                            {order.design_notes}
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="font-bold text-zinc-500">Files:</p>
                      <div className="mt-2 grid gap-3">
                        <FileLinkButtons order={order} />
                        <FileLinkEditor
                          draft={
                            fileLinkDrafts[getOrderKey(order)] ??
                            getFileLinkDraftFromOrder(order)
                          }
                          isSaving={savingFileLinksOrderId === order.id}
                          onChange={(field, value) =>
                            updateFileLinkDraft(order, field, value)
                          }
                          onSave={() => saveOrderFileLinks(order)}
                        />
                      </div>
                    </div>
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

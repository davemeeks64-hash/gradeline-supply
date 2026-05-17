"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import AdminLayout from "@/components/AdminLayout";
import { supabase } from "@/lib/supabase";

type WorkflowStatus = "New" | "Approved" | "Engraving" | "Assembly" | "Completed";

type DesignStatus =
  | "Not Started"
  | "In Design"
  | "Proof Sent"
  | "Approved"
  | "Revision Needed";

type FulfillmentMethod = "Pickup" | "Local Delivery" | "Shipped";

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
  qty?: number | null;
  due_date: string | null;
  status: string | null;
  design_status?: DesignStatus | string | null;
  proof_sent_date?: string | null;
  approval_date?: string | null;
  design_notes?: string | null;
  proof_file_url?: string | null;
  customer_artwork_url?: string | null;
  final_design_file_url?: string | null;
  lightburn_file_url?: string | null;
  fulfillment_method?: FulfillmentMethod | string | null;
  pickup_date?: string | null;
  delivery_date?: string | null;
  shipping_carrier?: string | null;
  tracking_number?: string | null;
  delivery_notes?: string | null;
};

const workflowColumns: WorkflowStatus[] = [
  "New",
  "Approved",
  "Engraving",
  "Assembly",
  "Completed",
];

const inputClassName =
  "mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-blue-300/60 focus:bg-black/45";

const labelClassName =
  "text-xs font-bold uppercase tracking-widest text-blue-300";

const statusClassNames: Record<WorkflowStatus, string> = {
  New: "border-blue-300/50 bg-blue-400/10 text-blue-200",
  Approved: "border-emerald-300/50 bg-emerald-400/10 text-emerald-200",
  Engraving: "border-amber-300/50 bg-amber-400/10 text-amber-200",
  Assembly: "border-cyan-300/50 bg-cyan-400/10 text-cyan-200",
  Completed: "border-green-300/50 bg-green-400/10 text-green-200",
};

const designStatusClassNames: Record<DesignStatus, string> = {
  "Not Started": "border-zinc-300/50 bg-zinc-300/10 text-zinc-200",
  "In Design": "border-blue-300/50 bg-blue-400/10 text-blue-200",
  "Proof Sent": "border-cyan-300/50 bg-cyan-400/10 text-cyan-200",
  Approved: "border-emerald-300/50 bg-emerald-400/10 text-emerald-200",
  "Revision Needed": "border-amber-300/50 bg-amber-400/10 text-amber-200",
};

const fulfillmentMethodClassNames: Record<FulfillmentMethod, string> = {
  Pickup: "border-blue-300/50 bg-blue-400/10 text-blue-200",
  "Local Delivery": "border-cyan-300/50 bg-cyan-400/10 text-cyan-200",
  Shipped: "border-emerald-300/50 bg-emerald-400/10 text-emerald-200",
};

function normalizeStatus(status: string | null | undefined): WorkflowStatus {
  const normalized = (status ?? "New").trim().toLowerCase();

  if (normalized === "approved") {
    return "Approved";
  }

  if (normalized === "engraving" || normalized === "in production") {
    return "Engraving";
  }

  if (normalized === "assembly" || normalized === "file ready") {
    return "Assembly";
  }

  if (
    normalized === "completed" ||
    normalized === "complete" ||
    normalized === "finished" ||
    normalized === "delivered"
  ) {
    return "Completed";
  }

  return "New";
}

function displayValue(value: string | number | null | undefined) {
  return value === null || value === undefined || value === "" ? "-" : value;
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

function StatusBadge({ status }: { status: WorkflowStatus }) {
  return (
    <span
      className={[
        "inline-flex w-fit rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-widest",
        statusClassNames[status],
      ].join(" ")}
    >
      {status}
    </span>
  );
}

function DesignStatusBadge({ status }: { status: string | null | undefined }) {
  const statusLabel = status || "Not Started";
  const className =
    statusLabel in designStatusClassNames
      ? designStatusClassNames[statusLabel as DesignStatus]
      : "border-white/20 bg-white/10 text-zinc-200";

  return (
    <span
      className={[
        "inline-flex w-fit rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-widest",
        className,
      ].join(" ")}
    >
      {statusLabel}
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
    return (
      <span className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-xs text-zinc-500">
        No file links yet.
      </span>
    );
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

function InventoryProductionSummary({
  item,
  quantity,
}: {
  item: InventoryItem | undefined;
  quantity: number | null | undefined;
}) {
  if (!item) {
    return (
      <div className="rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-xs text-zinc-500">
        No linked inventory item. Deduction preparation pending.
      </div>
    );
  }

  const onHand = Number(item.quantity_on_hand) || 0;
  const orderQty = Number(quantity) || 0;
  const reorderLevel = Number(item.reorder_level) || 0;
  const warning = orderQty > onHand || onHand <= reorderLevel;

  return (
    <div
      className={[
        "rounded-xl border px-3 py-2 text-xs",
        warning
          ? "border-amber-300/40 bg-amber-400/10 text-amber-100"
          : "border-blue-300/30 bg-blue-400/10 text-blue-100",
      ].join(" ")}
    >
      <p className="font-bold uppercase tracking-widest">
        Linked Blank / Deduction Pending
      </p>
      <p className="mt-1 leading-5">
        {displayValue(item.sku)} / {displayValue(item.item_name)} / {onHand} on
        hand
      </p>
    </div>
  );
}

export default function AdminProductionPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingOrderId, setUpdatingOrderId] = useState<string | number | null>(
    null
  );
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

  const ordersByStatus = useMemo(() => {
    return workflowColumns.reduce<Record<WorkflowStatus, Order[]>>(
      (groupedOrders, status) => {
        groupedOrders[status] = orders.filter(
          (order) => normalizeStatus(order.status) === status
        );
        return groupedOrders;
      },
      {
        New: [],
        Approved: [],
        Engraving: [],
        Assembly: [],
        Completed: [],
      }
    );
  }, [orders]);

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
          "Unable to load production orders."
      );
      setCustomers([]);
      setInventoryItems([]);
      setOrders([]);
    } else {
      setCustomers(nextCustomers);
      setInventoryItems(nextInventoryItems);
      setOrders(nextOrders);
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
              "Unable to load production orders."
          );
          setCustomers([]);
          setInventoryItems([]);
          setOrders([]);
        } else {
          setCustomers(nextCustomers);
          setInventoryItems(nextInventoryItems);
          setOrders(nextOrders);
        }

        setIsLoading(false);
      }
    );

    return () => {
      isMounted = false;
    };
  }, []);

  async function updateOrderStatus(order: Order, nextStatus: WorkflowStatus) {
    if (!order.id) {
      setErrorMessage("Cannot update an order without an id.");
      return;
    }

    setUpdatingOrderId(order.id);
    setErrorMessage("");
    setSuccessMessage("");

    const { error } = await supabase
      .from("orders")
      .update({ status: nextStatus })
      .eq("id", order.id);

    if (error) {
      setErrorMessage(error.message);
    } else {
      setOrders((currentOrders) =>
        currentOrders.map((currentOrder) =>
          currentOrder.id === order.id
            ? { ...currentOrder, status: nextStatus }
            : currentOrder
        )
      );
      setSuccessMessage(
        nextStatus === "Completed"
          ? `${displayValue(
              order.order_number
            )} moved to Completed. Inventory deduction is prepared but not automated yet.`
          : `${displayValue(order.order_number)} moved to ${nextStatus}.`
      );
    }

    setUpdatingOrderId(null);
  }

  return (
    <AdminLayout activeHref="/admin/production">
      <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-blue-950/40 p-6 shadow-2xl md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
              Gradeline Admin
            </p>
            <h1 className="mt-3 text-4xl font-black md:text-6xl">
              Production
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-300">
              Manage live Supabase orders through the Gradeline production
              workflow from new intake to completed work.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={loadPageData}
              className="rounded-xl bg-blue-400 px-5 py-3 font-bold text-black transition hover:bg-blue-300"
            >
              Refresh Board
            </button>
            <Link
              href="/admin/orders"
              className="inline-flex w-fit rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-bold text-white transition hover:border-blue-300/40 hover:bg-blue-400/10"
            >
              View Orders
            </Link>
          </div>
        </div>
      </section>

      {(successMessage || errorMessage) && (
        <div className="mt-6 grid gap-3">
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
        </div>
      )}

      {isLoading ? (
        <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-zinc-300 shadow-[0_18px_45px_rgba(0,0,0,0.28)]">
          Loading production board...
        </section>
      ) : (
        <section className="mt-6 grid gap-5 xl:grid-cols-5">
          {workflowColumns.map((status) => (
            <div
              key={status}
              className="min-h-64 rounded-3xl border border-white/10 bg-[linear-gradient(145deg,rgba(24,31,38,0.78),rgba(7,9,12,0.96))] p-4 shadow-[0_18px_45px_rgba(0,0,0,0.28)]"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <StatusBadge status={status} />
                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs font-bold text-zinc-400">
                  {ordersByStatus[status].length}
                </span>
              </div>

              <div className="grid gap-4">
                {ordersByStatus[status].length === 0 && (
                  <div className="rounded-2xl border border-dashed border-white/10 bg-black/20 p-4 text-sm text-zinc-500">
                    No orders in this stage.
                  </div>
                )}

                {ordersByStatus[status].map((order, index) => {
                  const orderKey = order.id ?? `${order.order_number}-${index}`;
                  const customerName = order.customer_id
                    ? customerNameById[String(order.customer_id)] ||
                      `Customer ${order.customer_id}`
                    : "Unassigned Customer";

                  return (
                    <article
                      key={orderKey}
                      className="rounded-2xl border border-white/10 bg-black/30 p-4 transition hover:border-blue-300/40 hover:bg-white/[0.05]"
                    >
                      <p className={labelClassName}>
                        {displayValue(order.order_number)}
                      </p>
                      <h2 className="mt-2 text-lg font-black text-white">
                        {customerName}
                      </h2>
                      <div className="mt-4 grid gap-2 text-sm text-zinc-300">
                        <p>
                          <span className="font-bold text-zinc-500">
                            Product:{" "}
                          </span>
                          {displayValue(order.product_type)}
                        </p>
                        <p>
                          <span className="font-bold text-zinc-500">
                            Due:{" "}
                          </span>
                          {formatDate(order.due_date)}
                        </p>
                        <div>
                          <span className="font-bold text-zinc-500">
                            Design:{" "}
                          </span>
                          <div className="mt-2 grid gap-2">
                            <DesignStatusBadge
                              status={order.design_status || "Not Started"}
                            />
                            <p className="text-xs leading-5 text-zinc-500">
                              Proof: {formatDate(order.proof_sent_date)} /
                              Approved: {formatDate(order.approval_date)}
                            </p>
                            {order.design_notes && (
                              <p className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-xs leading-5 text-zinc-400">
                                {order.design_notes}
                              </p>
                            )}
                            <div className="grid gap-2">
                              <p className="text-xs font-bold uppercase tracking-widest text-blue-300">
                                Files
                              </p>
                              <FileLinkButtons order={order} />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <InventoryProductionSummary
                          item={
                            order.inventory_item_id
                              ? inventoryItemById[String(order.inventory_item_id)]
                              : undefined
                          }
                          quantity={order.qty}
                        />
                      </div>

                      <label className="mt-4 block">
                        <span className={labelClassName}>Move To</span>
                        <select
                          className={inputClassName}
                          disabled={updatingOrderId === order.id}
                          onChange={(event) =>
                            updateOrderStatus(
                              order,
                              event.target.value as WorkflowStatus
                            )
                          }
                          value={normalizeStatus(order.status)}
                        >
                          {workflowColumns.map((workflowStatus) => (
                            <option key={workflowStatus} value={workflowStatus}>
                              {workflowStatus}
                            </option>
                          ))}
                        </select>
                      </label>
                    </article>
                  );
                })}
              </div>
            </div>
          ))}
        </section>
      )}
    </AdminLayout>
  );
}

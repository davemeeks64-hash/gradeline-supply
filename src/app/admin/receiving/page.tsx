"use client";

import { type FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import AdminLayout from "@/components/AdminLayout";
import { supabase } from "@/lib/supabase";

type ReceivingStatus =
  | "Ordered"
  | "Partially Received"
  | "Received"
  | "Backordered";

type ReceivingRecord = {
  id: string | number;
  vendor: string | null;
  purchase_order_number: string | null;
  item_name: string;
  sku: string;
  quantity_ordered: number;
  quantity_received: number;
  unit_cost: number;
  order_date: string | null;
  expected_delivery_date: string | null;
  received_date: string | null;
  status: ReceivingStatus | string;
  notes: string | null;
  created_at?: string | null;
};

type InventoryItem = {
  id: string | number;
  sku: string;
  item_name: string;
  vendor: string | null;
  quantity_on_hand: number;
  unit_cost: number;
};

type Vendor = {
  id: string | number;
  vendor_name: string;
};

type ReceivingFormState = {
  vendor: string;
  purchase_order_number: string;
  item_name: string;
  sku: string;
  quantity_ordered: string;
  quantity_received: string;
  unit_cost: string;
  order_date: string;
  expected_delivery_date: string;
  received_date: string;
  status: ReceivingStatus;
  notes: string;
};

const initialFormState: ReceivingFormState = {
  vendor: "",
  purchase_order_number: "",
  item_name: "",
  sku: "",
  quantity_ordered: "1",
  quantity_received: "0",
  unit_cost: "",
  order_date: "",
  expected_delivery_date: "",
  received_date: "",
  status: "Ordered",
  notes: "",
};

const statuses: ReceivingStatus[] = [
  "Ordered",
  "Partially Received",
  "Received",
  "Backordered",
];

const inputClassName =
  "mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-blue-300/60 focus:bg-black/45";

const labelClassName =
  "text-xs font-bold uppercase tracking-widest text-blue-300";

const panelClassName =
  "rounded-3xl border border-white/10 bg-[linear-gradient(145deg,rgba(24,31,38,0.78),rgba(7,9,12,0.96))] shadow-[0_18px_45px_rgba(0,0,0,0.28)]";

const statusClassNames: Record<ReceivingStatus, string> = {
  Ordered: "border-blue-300/50 bg-blue-400/10 text-blue-200",
  "Partially Received": "border-amber-300/50 bg-amber-400/10 text-amber-200",
  Received: "border-emerald-300/50 bg-emerald-400/10 text-emerald-200",
  Backordered: "border-red-300/50 bg-red-400/10 text-red-200",
};

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

function todayValue() {
  return new Date().toISOString().slice(0, 10);
}

function normalizeSku(value: string) {
  return value.trim().toUpperCase();
}

function getStatusClassName(status: string | null | undefined) {
  return status && status in statusClassNames
    ? statusClassNames[status as ReceivingStatus]
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

function ReceivingField({
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
  name: keyof ReceivingFormState;
  onChange: (name: keyof ReceivingFormState, value: string) => void;
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

export default function AdminReceivingPage() {
  const [records, setRecords] = useState<ReceivingRecord[]>([]);
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [formState, setFormState] =
    useState<ReceivingFormState>(initialFormState);
  const [editingRecordId, setEditingRecordId] = useState<
    string | number | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [updatingRecordId, setUpdatingRecordId] = useState<
    string | number | null
  >(null);
  const [deletingRecordId, setDeletingRecordId] = useState<
    string | number | null
  >(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<ReceivingStatus | "all">(
    "all"
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const filteredRecords = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return records.filter((record) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        [
          record.vendor,
          record.purchase_order_number,
          record.item_name,
          record.sku,
          record.status,
          record.notes,
        ].some((value) =>
          String(value ?? "").toLowerCase().includes(normalizedSearch)
        );

      const matchesStatus =
        statusFilter === "all" || record.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [records, searchTerm, statusFilter]);

  const inventoryItemBySku = useMemo(() => {
    return inventoryItems.reduce<Record<string, InventoryItem>>((lookup, item) => {
      lookup[item.sku] = item;
      return lookup;
    }, {});
  }, [inventoryItems]);

  const summaryCards = useMemo(() => {
    const orderedCount = records.filter(
      (record) => record.status === "Ordered"
    ).length;
    const receivedCount = records.filter(
      (record) => record.status === "Received"
    ).length;
    const openUnits = records
      .filter((record) => record.status !== "Received")
      .reduce(
        (sum, record) =>
          sum +
          Math.max(
            0,
            Number(record.quantity_ordered) - Number(record.quantity_received)
          ),
        0
      );
    const receivedValue = records.reduce(
      (sum, record) =>
        sum + Number(record.quantity_received) * Number(record.unit_cost),
      0
    );

    return [
      { label: "Open POs", value: String(orderedCount), detail: "Ordered status" },
      {
        label: "Received POs",
        value: String(receivedCount),
        detail: "Fully received records",
      },
      {
        label: "Open Units",
        value: String(openUnits),
        detail: "Ordered but not received",
      },
      {
        label: "Received Value",
        value: formatCurrency(receivedValue),
        detail: "Quantity received x unit cost",
      },
    ];
  }, [records]);

  async function readPageData() {
    const [receivingResponse, inventoryResponse, vendorsResponse] =
      await Promise.all([
        supabase
          .from("receiving_orders")
          .select("*")
          .order("created_at", { ascending: false }),
        supabase
          .from("inventory_items")
          .select("id,sku,item_name,vendor,quantity_on_hand,unit_cost"),
        supabase.from("vendors").select("id,vendor_name"),
      ]);

    return {
      records: (receivingResponse.data ?? []) as ReceivingRecord[],
      recordsError: receivingResponse.error,
      inventoryItems: (inventoryResponse.data ?? []) as InventoryItem[],
      inventoryError: inventoryResponse.error,
      vendors: (vendorsResponse.data ?? []) as Vendor[],
      vendorsError: vendorsResponse.error,
    };
  }

  async function loadPageData() {
    setIsLoading(true);
    setErrorMessage("");

    const {
      records: nextRecords,
      recordsError,
      inventoryItems: nextInventoryItems,
      inventoryError,
      vendors: nextVendors,
      vendorsError,
    } = await readPageData();

    if (recordsError || inventoryError) {
      setErrorMessage(
        recordsError?.message ||
          inventoryError?.message ||
          "Unable to load receiving data."
      );
      setRecords([]);
      setInventoryItems([]);
    } else {
      setRecords(nextRecords);
      setInventoryItems(nextInventoryItems);
    }

    setVendors(vendorsError ? [] : nextVendors);
    setIsLoading(false);
  }

  useEffect(() => {
    let isMounted = true;

    readPageData().then(
      ({
        records: nextRecords,
        recordsError,
        inventoryItems: nextInventoryItems,
        inventoryError,
        vendors: nextVendors,
        vendorsError,
      }) => {
        if (!isMounted) {
          return;
        }

        if (recordsError || inventoryError) {
          setErrorMessage(
            recordsError?.message ||
              inventoryError?.message ||
              "Unable to load receiving data."
          );
          setRecords([]);
          setInventoryItems([]);
        } else {
          setRecords(nextRecords);
          setInventoryItems(nextInventoryItems);
        }

        setVendors(vendorsError ? [] : nextVendors);
        setIsLoading(false);
      }
    );

    return () => {
      isMounted = false;
    };
  }, []);

  function updateFormField(name: keyof ReceivingFormState, value: string) {
    setSuccessMessage("");
    setErrorMessage("");
    setFormState((current) => ({
      ...current,
      [name]: name === "sku" ? normalizeSku(value) : value,
    }));
  }

  function fillFromInventory(sku: string) {
    const item = inventoryItemBySku[sku];

    if (!item) {
      updateFormField("sku", sku);
      return;
    }

    setFormState((current) => ({
      ...current,
      sku: item.sku,
      item_name: item.item_name,
      vendor: item.vendor ?? current.vendor,
      unit_cost: String(item.unit_cost ?? current.unit_cost),
    }));
  }

  async function applyReceivedInventory(record: ReceivingRecord) {
    const sku = normalizeSku(record.sku);
    const quantityReceived = Number(record.quantity_received) || 0;

    if (!sku || quantityReceived <= 0) {
      return;
    }

    const existingItem = inventoryItemBySku[sku];

    if (existingItem) {
      const nextQuantity =
        (Number(existingItem.quantity_on_hand) || 0) + quantityReceived;

      const { data, error } = await supabase
        .from("inventory_items")
        .update({
          quantity_on_hand: nextQuantity,
          unit_cost: Number(record.unit_cost) || existingItem.unit_cost || 0,
          vendor: record.vendor || existingItem.vendor,
        })
        .eq("id", existingItem.id)
        .select("id,sku,item_name,vendor,quantity_on_hand,unit_cost")
        .single();

      if (error) {
        throw error;
      }

      setInventoryItems((current) =>
        current.map((item) =>
          item.id === existingItem.id ? ((data as InventoryItem) ?? item) : item
        )
      );
      return;
    }

    const { data, error } = await supabase
      .from("inventory_items")
      .insert({
        sku,
        item_name: record.item_name,
        vendor: record.vendor,
        quantity_on_hand: quantityReceived,
        reorder_level: 0,
        unit_cost: Number(record.unit_cost) || 0,
      })
      .select("id,sku,item_name,vendor,quantity_on_hand,unit_cost")
      .single();

    if (error) {
      throw error;
    }

    setInventoryItems((current) => [(data as InventoryItem), ...current]);
  }

  function buildPayload(state: ReceivingFormState) {
    return {
      vendor: state.vendor.trim() || null,
      purchase_order_number: state.purchase_order_number.trim() || null,
      item_name: state.item_name.trim(),
      sku: normalizeSku(state.sku),
      quantity_ordered: Number(state.quantity_ordered) || 0,
      quantity_received: Number(state.quantity_received) || 0,
      unit_cost: Number(state.unit_cost) || 0,
      order_date: state.order_date || null,
      expected_delivery_date: state.expected_delivery_date || null,
      received_date: state.received_date || null,
      status: state.status,
      notes: state.notes.trim() || null,
    };
  }

  function toFormState(record: ReceivingRecord): ReceivingFormState {
    return {
      vendor: record.vendor ?? "",
      purchase_order_number: record.purchase_order_number ?? "",
      item_name: record.item_name,
      sku: record.sku,
      quantity_ordered: String(record.quantity_ordered ?? 0),
      quantity_received: String(record.quantity_received ?? 0),
      unit_cost: String(record.unit_cost ?? 0),
      order_date: record.order_date ?? "",
      expected_delivery_date: record.expected_delivery_date ?? "",
      received_date: record.received_date ?? "",
      status:
        record.status && statuses.includes(record.status as ReceivingStatus)
          ? (record.status as ReceivingStatus)
          : "Ordered",
      notes: record.notes ?? "",
    };
  }

  function resetForm() {
    setFormState(initialFormState);
    setEditingRecordId(null);
  }

  function startEditing(record: ReceivingRecord) {
    setEditingRecordId(record.id);
    setFormState(toFormState(record));
    setSuccessMessage("");
    setErrorMessage("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setSuccessMessage("");
    setErrorMessage("");

    const payload = buildPayload({
      ...formState,
      received_date:
        formState.status === "Received" && !formState.received_date
          ? todayValue()
          : formState.received_date,
    });

    const existingRecord = editingRecordId
      ? records.find((record) => record.id === editingRecordId)
      : undefined;

    const response = editingRecordId
      ? await supabase
          .from("receiving_orders")
          .update(payload)
          .eq("id", editingRecordId)
          .select()
          .single()
      : await supabase
          .from("receiving_orders")
          .insert(payload)
          .select()
          .single();

    if (response.error) {
      setErrorMessage(response.error.message);
      setIsSaving(false);
      return;
    }

    const savedRecord = response.data as ReceivingRecord;
    const shouldApplyInventory =
      savedRecord.status === "Received" && existingRecord?.status !== "Received";

    try {
      if (shouldApplyInventory) {
        await applyReceivedInventory(savedRecord);
      }

      setRecords((current) =>
        editingRecordId
          ? current.map((record) =>
              record.id === editingRecordId ? savedRecord : record
            )
          : [savedRecord, ...current]
      );
      setSuccessMessage(
        shouldApplyInventory
          ? "Receiving order saved and inventory quantity updated."
          : editingRecordId
            ? "Receiving order updated."
            : "Receiving order saved."
      );
      resetForm();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? `Receiving order saved, but inventory quantity could not be updated: ${error.message}`
          : "Receiving order saved, but inventory quantity could not be updated."
      );
    }

    setIsSaving(false);
  }

  async function markRecordReceived(record: ReceivingRecord) {
    setUpdatingRecordId(record.id);
    setSuccessMessage("");
    setErrorMessage("");

    const nextRecord = {
      ...record,
      status: "Received" as ReceivingStatus,
      received_date: record.received_date || todayValue(),
      quantity_received:
        Number(record.quantity_received) || Number(record.quantity_ordered) || 0,
    };

    const { data, error } = await supabase
      .from("receiving_orders")
      .update({
        status: nextRecord.status,
        received_date: nextRecord.received_date,
        quantity_received: nextRecord.quantity_received,
      })
      .eq("id", record.id)
      .select()
      .single();

    if (error) {
      setErrorMessage(error.message);
      setUpdatingRecordId(null);
      return;
    }

    try {
      await applyReceivedInventory(nextRecord);
      setRecords((current) =>
        current.map((currentRecord) =>
          currentRecord.id === record.id
            ? ((data as ReceivingRecord) ?? nextRecord)
            : currentRecord
        )
      );
      setSuccessMessage("Purchase marked received and inventory updated.");
    } catch (quantityError) {
      setErrorMessage(
        quantityError instanceof Error
          ? quantityError.message
          : "Status updated, but inventory quantity could not be updated."
      );
    }

    setUpdatingRecordId(null);
  }

  async function deleteReceivingOrder(record: ReceivingRecord) {
    const confirmed = window.confirm(
      `Delete/archive ${record.purchase_order_number || record.sku}? This removes the receiving order record from Supabase.`
    );

    if (!confirmed) {
      return;
    }

    setDeletingRecordId(record.id);
    setSuccessMessage("");
    setErrorMessage("");

    const { error } = await supabase
      .from("receiving_orders")
      .delete()
      .eq("id", record.id);

    if (error) {
      setErrorMessage(error.message);
    } else {
      setRecords((current) =>
        current.filter((currentRecord) => currentRecord.id !== record.id)
      );

      if (editingRecordId === record.id) {
        resetForm();
      }

      setSuccessMessage("Receiving order deleted from Supabase.");
    }

    setDeletingRecordId(null);
  }

  return (
    <AdminLayout activeHref="/admin/receiving">
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-blue-950/40 p-6 shadow-2xl md:p-8">
        <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-blue-400/10 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/70 to-transparent" />
        <div className="relative flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
              Gradeline Admin
            </p>
            <h1 className="mt-3 max-w-4xl text-4xl font-black tracking-tight text-white drop-shadow-[0_0_18px_rgba(96,165,250,0.18)] md:text-6xl">
              Receiving
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-300">
              Track incoming blank inventory purchases, purchase orders,
              deliveries, and received quantities before they hit production.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={loadPageData}
              className="rounded-xl bg-blue-400 px-5 py-3 font-bold text-black transition hover:bg-blue-300"
            >
              Refresh Receiving
            </button>
            <Link
              href="/admin/inventory"
              className="inline-flex w-fit rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-bold text-white transition hover:border-blue-300/40 hover:bg-blue-400/10"
            >
              Inventory
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <article
            key={card.label}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(145deg,rgba(24,31,38,0.78),rgba(7,9,12,0.96))] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.28)]"
          >
            <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-blue-400/10 blur-3xl" />
            <div className="relative h-2 w-12 bg-blue-400 shadow-[0_0_18px_rgba(96,165,250,0.65)]" />
            <p className="relative mt-4 text-xs font-bold uppercase tracking-widest text-blue-300">
              {card.label}
            </p>
            <p className="relative mt-3 text-4xl font-black text-white">
              {isLoading ? "..." : card.value}
            </p>
            <p className="relative mt-3 text-sm leading-6 text-zinc-400">
              {card.detail}
            </p>
          </article>
        ))}
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

      <section className="mt-6 grid gap-6 xl:grid-cols-[430px_1fr]">
        <form
          onSubmit={handleSubmit}
          className={`${panelClassName} h-fit p-5 md:p-6`}
        >
          <div>
            <p className={labelClassName}>Purchase Intake</p>
            <h2 className="mt-2 text-2xl font-black text-white">
              {editingRecordId ? "Edit Receiving Order" : "Incoming Inventory"}
            </h2>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Saving as Received updates the matching inventory SKU quantity.
            </p>
          </div>

          <div className="mt-5 grid gap-4">
            <label className="block">
              <span className={labelClassName}>Vendor</span>
              <input
                className={inputClassName}
                list="vendor-options"
                name="vendor"
                onChange={(event) => updateFormField("vendor", event.target.value)}
                placeholder="Vendor name"
                value={formState.vendor}
              />
              <datalist id="vendor-options">
                {vendors.map((vendor) => (
                  <option key={vendor.id} value={vendor.vendor_name} />
                ))}
              </datalist>
            </label>

            <ReceivingField
              label="Purchase Order Number"
              name="purchase_order_number"
              onChange={updateFormField}
              placeholder="PO-1001"
              value={formState.purchase_order_number}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className={labelClassName}>SKU</span>
                <input
                  className={inputClassName}
                  list="inventory-sku-options"
                  name="sku"
                  onChange={(event) => fillFromInventory(event.target.value)}
                  placeholder="BLK-TMB-BLK-20OZ-001"
                  required
                  value={formState.sku}
                />
                <datalist id="inventory-sku-options">
                  {inventoryItems.map((item) => (
                    <option key={item.id} value={item.sku}>
                      {item.item_name}
                    </option>
                  ))}
                </datalist>
              </label>
              <ReceivingField
                label="Item Name"
                name="item_name"
                onChange={updateFormField}
                placeholder="Matte black tumbler blank"
                required
                value={formState.item_name}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <ReceivingField
                label="Quantity Ordered"
                name="quantity_ordered"
                onChange={updateFormField}
                placeholder="24"
                required
                type="number"
                value={formState.quantity_ordered}
              />
              <ReceivingField
                label="Quantity Received"
                name="quantity_received"
                onChange={updateFormField}
                placeholder="24"
                required
                type="number"
                value={formState.quantity_received}
              />
              <ReceivingField
                label="Unit Cost"
                name="unit_cost"
                onChange={updateFormField}
                placeholder="7.40"
                required
                step="0.01"
                type="number"
                value={formState.unit_cost}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <ReceivingField
                label="Order Date"
                name="order_date"
                onChange={updateFormField}
                placeholder="Order date"
                type="date"
                value={formState.order_date}
              />
              <ReceivingField
                label="Expected Delivery"
                name="expected_delivery_date"
                onChange={updateFormField}
                placeholder="Expected delivery"
                type="date"
                value={formState.expected_delivery_date}
              />
              <ReceivingField
                label="Received Date"
                name="received_date"
                onChange={updateFormField}
                placeholder="Received date"
                type="date"
                value={formState.received_date}
              />
            </div>

            <label className="block">
              <span className={labelClassName}>Status</span>
              <select
                className={inputClassName}
                name="status"
                onChange={(event) =>
                  updateFormField(
                    "status",
                    event.target.value as ReceivingStatus
                  )
                }
                value={formState.status}
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className={labelClassName}>Notes</span>
              <textarea
                className={`${inputClassName} min-h-28 resize-y`}
                name="notes"
                onChange={(event) => updateFormField("notes", event.target.value)}
                placeholder="Backorder details, damaged blanks, shipping notes, or receiving notes"
                value={formState.notes}
              />
            </label>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              disabled={isSaving}
              className="rounded-xl bg-blue-400 px-5 py-3 font-bold text-black transition hover:bg-blue-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving
                ? "Saving..."
                : editingRecordId
                  ? "Update Receiving"
                  : "Save Receiving"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-bold text-white transition hover:border-blue-300/40 hover:bg-blue-400/10"
            >
              {editingRecordId ? "Cancel Edit" : "Clear"}
            </button>
          </div>
        </form>

        <div className="space-y-5">
          <section className={`${panelClassName} p-5 md:p-6`}>
            <div className="grid gap-4 md:grid-cols-[1fr_220px]">
              <label className="block">
                <span className={labelClassName}>Search Receiving</span>
                <input
                  className={inputClassName}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search PO, SKU, item, vendor, notes"
                  value={searchTerm}
                />
              </label>
              <label className="block">
                <span className={labelClassName}>Status Filter</span>
                <select
                  className={inputClassName}
                  onChange={(event) =>
                    setStatusFilter(event.target.value as ReceivingStatus | "all")
                  }
                  value={statusFilter}
                >
                  <option value="all">All statuses</option>
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <p className="mt-4 text-sm text-zinc-500">
              Showing {filteredRecords.length} of {records.length} receiving
              records.
            </p>
          </section>

          <section className={`${panelClassName} overflow-hidden`}>
            <div className="flex flex-col gap-2 border-b border-white/10 px-5 py-5 md:px-6">
              <p className={labelClassName}>Receiving History</p>
              <h2 className="text-2xl font-black text-white">
                Purchase Orders
              </h2>
            </div>

            <div className="hidden overflow-x-auto xl:block">
              <table className="w-full border-collapse text-left">
                <thead className="border-b border-white/10 bg-black/30 text-xs font-bold uppercase tracking-widest text-blue-300">
                  <tr>
                    <th className="px-5 py-4">PO</th>
                    <th className="px-5 py-4">Vendor</th>
                    <th className="px-5 py-4">Item</th>
                    <th className="px-5 py-4">Ordered</th>
                    <th className="px-5 py-4">Received</th>
                    <th className="px-5 py-4">Cost</th>
                    <th className="px-5 py-4">Dates</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {isLoading && (
                    <tr>
                      <td className="px-5 py-6 text-zinc-400" colSpan={9}>
                        Loading receiving records from Supabase...
                      </td>
                    </tr>
                  )}

                  {!isLoading &&
                    filteredRecords.map((record) => (
                      <tr
                        key={record.id}
                        className="bg-white/[0.02] transition hover:bg-white/[0.06]"
                      >
                        <td className="px-5 py-4 font-black text-white">
                          {displayValue(record.purchase_order_number)}
                        </td>
                        <td className="px-5 py-4 text-zinc-300">
                          {displayValue(record.vendor)}
                        </td>
                        <td className="px-5 py-4">
                          <p className="font-bold text-zinc-100">
                            {record.item_name}
                          </p>
                          <p className="mt-1 text-xs text-blue-200">
                            {record.sku}
                          </p>
                        </td>
                        <td className="px-5 py-4 text-zinc-300">
                          {record.quantity_ordered}
                        </td>
                        <td className="px-5 py-4 font-black text-white">
                          {record.quantity_received}
                        </td>
                        <td className="px-5 py-4 text-zinc-300">
                          {formatCurrency(record.unit_cost)}
                        </td>
                        <td className="px-5 py-4 text-sm text-zinc-400">
                          <p>Order: {formatDate(record.order_date)}</p>
                          <p>
                            Expected: {formatDate(record.expected_delivery_date)}
                          </p>
                          <p>Received: {formatDate(record.received_date)}</p>
                        </td>
                        <td className="px-5 py-4">
                          <StatusBadge status={record.status} />
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => startEditing(record)}
                              className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-bold text-white transition hover:border-blue-300/40 hover:bg-blue-400/10"
                            >
                              Edit
                            </button>
                            {record.status !== "Received" ? (
                              <button
                                type="button"
                                disabled={updatingRecordId === record.id}
                                onClick={() => markRecordReceived(record)}
                                className="rounded-lg border border-blue-300/40 bg-blue-400/10 px-4 py-2 text-sm font-bold text-blue-100 transition hover:bg-blue-400/20 disabled:cursor-not-allowed disabled:opacity-60"
                              >
                                {updatingRecordId === record.id
                                  ? "Updating"
                                  : "Mark Received"}
                              </button>
                            ) : (
                              <span className="rounded-lg border border-white/10 bg-black/25 px-4 py-2 text-sm font-bold text-zinc-500">
                                Inventory updated
                              </span>
                            )}
                            <button
                              type="button"
                              disabled={deletingRecordId === record.id}
                              onClick={() => deleteReceivingOrder(record)}
                              className="rounded-lg border border-red-300/30 bg-red-500/10 px-4 py-2 text-sm font-bold text-red-100 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              {deletingRecordId === record.id
                                ? "Deleting"
                                : "Delete"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}

                  {!isLoading && filteredRecords.length === 0 && (
                    <tr>
                      <td className="px-5 py-6 text-zinc-400" colSpan={9}>
                        No receiving records match the current filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="grid gap-4 p-4 xl:hidden">
              {isLoading && (
                <p className="rounded-2xl border border-white/10 bg-black/30 p-5 text-zinc-400">
                  Loading receiving records from Supabase...
                </p>
              )}

              {!isLoading &&
                filteredRecords.map((record) => (
                  <article
                    key={record.id}
                    className="rounded-2xl border border-white/10 bg-black/30 p-5"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className={labelClassName}>
                          {displayValue(record.purchase_order_number)}
                        </p>
                        <h3 className="mt-2 text-xl font-black text-white">
                          {record.item_name}
                        </h3>
                        <p className="mt-2 text-blue-200">{record.sku}</p>
                      </div>
                      <StatusBadge status={record.status} />
                    </div>

                    <div className="mt-5 grid gap-3 text-sm text-zinc-300 sm:grid-cols-2">
                      <p>
                        <span className="font-bold text-zinc-500">
                          Vendor:{" "}
                        </span>
                        {displayValue(record.vendor)}
                      </p>
                      <p>
                        <span className="font-bold text-zinc-500">
                          Ordered:{" "}
                        </span>
                        {record.quantity_ordered}
                      </p>
                      <p>
                        <span className="font-bold text-zinc-500">
                          Received:{" "}
                        </span>
                        {record.quantity_received}
                      </p>
                      <p>
                        <span className="font-bold text-zinc-500">Cost: </span>
                        {formatCurrency(record.unit_cost)}
                      </p>
                      <p>
                        <span className="font-bold text-zinc-500">
                          Expected:{" "}
                        </span>
                        {formatDate(record.expected_delivery_date)}
                      </p>
                      <p>
                        <span className="font-bold text-zinc-500">
                          Notes:{" "}
                        </span>
                        {displayValue(record.notes)}
                      </p>
                    </div>

                    <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                      <button
                        type="button"
                        onClick={() => startEditing(record)}
                        className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-bold text-white transition hover:border-blue-300/40 hover:bg-blue-400/10"
                      >
                        Edit Order
                      </button>

                    {record.status !== "Received" ? (
                      <button
                        type="button"
                        disabled={updatingRecordId === record.id}
                        onClick={() => markRecordReceived(record)}
                        className="rounded-lg border border-blue-300/40 bg-blue-400/10 px-4 py-2 text-sm font-bold text-blue-100 transition hover:bg-blue-400/20 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {updatingRecordId === record.id
                          ? "Updating"
                          : "Mark Received"}
                      </button>
                    ) : (
                      <p className="rounded-lg border border-white/10 bg-black/25 px-4 py-2 text-sm font-bold text-zinc-500">
                        Inventory updated
                      </p>
                    )}

                      <button
                        type="button"
                        disabled={deletingRecordId === record.id}
                        onClick={() => deleteReceivingOrder(record)}
                        className="rounded-lg border border-red-300/30 bg-red-500/10 px-4 py-2 text-sm font-bold text-red-100 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {deletingRecordId === record.id
                          ? "Deleting"
                          : "Delete Order"}
                      </button>
                    </div>
                  </article>
                ))}

              {!isLoading && filteredRecords.length === 0 && (
                <p className="rounded-2xl border border-white/10 bg-black/30 p-5 text-zinc-400">
                  No receiving records match the current filters.
                </p>
              )}
            </div>
          </section>
        </div>
      </section>
    </AdminLayout>
  );
}

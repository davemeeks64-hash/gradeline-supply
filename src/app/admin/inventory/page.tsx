"use client";

import { type FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import AdminLayout from "@/components/AdminLayout";

type InventoryItem = {
  id: number;
  sku: string;
  item_name: string;
  category: string;
  vendor: string;
  material: string;
  color: string;
  size: string;
  quantity_on_hand: number;
  reorder_level: number;
  unit_cost: number;
  storage_location: string;
  notes: string;
};

type InventoryFormState = Omit<InventoryItem, "id">;

const initialInventoryItems: InventoryItem[] = [
  {
    id: 1,
    sku: "BLK-SLT-004",
    item_name: "Round slate coaster blanks",
    category: "Slate",
    vendor: "StoneCraft Supply",
    material: "Slate",
    color: "Black",
    size: "4 in round",
    quantity_on_hand: 18,
    reorder_level: 24,
    unit_cost: 2.85,
    storage_location: "Rack A2",
    notes: "Good for logo coaster sets and realtor gifts.",
  },
  {
    id: 2,
    sku: "BLK-WAL-CB12",
    item_name: "Walnut cutting board blanks",
    category: "Wood",
    vendor: "North Mill Goods",
    material: "Walnut",
    color: "Natural",
    size: "12 x 16 in",
    quantity_on_hand: 12,
    reorder_level: 8,
    unit_cost: 18.5,
    storage_location: "Rack B1",
    notes: "Oil before final photos. Check knots before engraving.",
  },
  {
    id: 3,
    sku: "BLK-TUM-20-BLK",
    item_name: "Powder coated tumbler blanks",
    category: "Drinkware",
    vendor: "SteelCup Wholesale",
    material: "Stainless steel",
    color: "Matte black",
    size: "20 oz",
    quantity_on_hand: 34,
    reorder_level: 18,
    unit_cost: 7.4,
    storage_location: "Shelf D2",
    notes: "Use rotary jig. Mask logos with high contrast proof.",
  },
  {
    id: 4,
    sku: "BLK-ACR-CLR-12",
    item_name: "Clear acrylic sheet blanks",
    category: "Acrylic",
    vendor: "Acrylic Depot",
    material: "Cast acrylic",
    color: "Clear",
    size: "12 x 12 in",
    quantity_on_hand: 6,
    reorder_level: 10,
    unit_cost: 9.25,
    storage_location: "Flat Bin 3",
    notes: "Keep protective film on until final pass.",
  },
];

const emptyFormState: InventoryFormState = {
  sku: "",
  item_name: "",
  category: "",
  vendor: "",
  material: "",
  color: "",
  size: "",
  quantity_on_hand: 0,
  reorder_level: 0,
  unit_cost: 0,
  storage_location: "",
  notes: "",
};

const inputClassName =
  "mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-blue-300/60 focus:bg-black/45";

const labelClassName =
  "text-xs font-bold uppercase tracking-widest text-blue-300";

const panelClassName =
  "rounded-3xl border border-white/10 bg-[linear-gradient(145deg,rgba(24,31,38,0.78),rgba(7,9,12,0.96))] shadow-[0_18px_45px_rgba(0,0,0,0.28)]";

const categories = [
  "Acrylic",
  "Drinkware",
  "Hardware",
  "Leather",
  "Packaging",
  "Slate",
  "Supplies",
  "Wood",
];

const textFieldNames: Array<keyof Omit<
  InventoryFormState,
  "quantity_on_hand" | "reorder_level" | "unit_cost" | "notes"
>> = [
  "sku",
  "item_name",
  "category",
  "vendor",
  "material",
  "color",
  "size",
  "storage_location",
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function displayValue(value: string | number | null | undefined) {
  return value === null || value === undefined || value === "" ? "-" : value;
}

function isLowStock(item: InventoryItem) {
  return item.quantity_on_hand <= item.reorder_level;
}

function fieldLabel(field: string) {
  return field
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function StockBadge({ item }: { item: InventoryItem }) {
  const lowStock = isLowStock(item);

  return (
    <span
      className={[
        "inline-flex w-fit rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-widest",
        lowStock
          ? "border-amber-300/50 bg-amber-400/10 text-amber-200"
          : "border-blue-300/50 bg-blue-400/10 text-blue-200",
      ].join(" ")}
    >
      {lowStock ? "Low Stock" : "In Stock"}
    </span>
  );
}

function InventoryField({
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
  name: keyof InventoryFormState;
  onChange: (name: keyof InventoryFormState, value: string) => void;
  placeholder: string;
  required?: boolean;
  step?: string;
  type?: string;
  value: string | number;
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

export default function AdminInventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>(initialInventoryItems);
  const [formState, setFormState] =
    useState<InventoryFormState>(emptyFormState);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState<"all" | "low" | "healthy">(
    "all"
  );
  const [successMessage, setSuccessMessage] = useState("");

  const filteredItems = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return items.filter((item) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        [
          item.sku,
          item.item_name,
          item.category,
          item.vendor,
          item.material,
          item.color,
          item.size,
          item.storage_location,
          item.notes,
        ].some((value) => value.toLowerCase().includes(normalizedSearch));

      const matchesCategory =
        categoryFilter === "all" || item.category === categoryFilter;

      const lowStock = isLowStock(item);
      const matchesStock =
        stockFilter === "all" ||
        (stockFilter === "low" && lowStock) ||
        (stockFilter === "healthy" && !lowStock);

      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [categoryFilter, items, searchTerm, stockFilter]);

  const summaryCards = useMemo(() => {
    const totalUnits = items.reduce(
      (sum, item) => sum + item.quantity_on_hand,
      0
    );
    const lowStockCount = items.filter(isLowStock).length;
    const inventoryValue = items.reduce(
      (sum, item) => sum + item.quantity_on_hand * item.unit_cost,
      0
    );
    const vendorCount = new Set(items.map((item) => item.vendor)).size;

    return [
      {
        label: "Blank SKUs",
        value: String(items.length),
        detail: "Raw products tracked locally",
      },
      {
        label: "Units On Hand",
        value: String(totalUnits),
        detail: "Total blank inventory count",
      },
      {
        label: "Low Stock",
        value: String(lowStockCount),
        detail: "At or below reorder level",
      },
      {
        label: "Inventory Value",
        value: formatCurrency(inventoryValue),
        detail: `${vendorCount} active vendor sources`,
      },
    ];
  }, [items]);

  function updateFormField(name: keyof InventoryFormState, value: string) {
    setSuccessMessage("");

    if (
      name === "quantity_on_hand" ||
      name === "reorder_level" ||
      name === "unit_cost"
    ) {
      setFormState((current) => ({
        ...current,
        [name]: Number(value),
      }));
      return;
    }

    setFormState((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function resetForm() {
    setFormState(emptyFormState);
    setEditingItemId(null);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (editingItemId) {
      setItems((current) =>
        current.map((item) =>
          item.id === editingItemId ? { ...item, ...formState } : item
        )
      );
      setSuccessMessage("Inventory item updated locally.");
      resetForm();
      return;
    }

    setItems((current) => [
      {
        ...formState,
        id: Date.now(),
      },
      ...current,
    ]);
    setSuccessMessage("Inventory item added locally.");
    resetForm();
  }

  function startEditing(item: InventoryItem) {
    const { id, ...nextFormState } = item;
    setEditingItemId(id);
    setFormState(nextFormState);
    setSuccessMessage("");
  }

  return (
    <AdminLayout activeHref="/admin/inventory">
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-blue-950/40 p-6 shadow-2xl md:p-8">
        <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-blue-400/10 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/70 to-transparent" />
        <div className="relative flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
              Gradeline Admin
            </p>
            <h1 className="mt-3 max-w-4xl text-4xl font-black tracking-tight text-white drop-shadow-[0_0_18px_rgba(96,165,250,0.18)] md:text-6xl">
              Blank Inventory
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-300">
              Manage raw blanks before engraving, including quantities,
              vendors, material specs, costs, storage, and reorder levels.
            </p>
          </div>

          <Link
            href="/admin"
            className="inline-flex w-fit rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-bold text-white transition hover:border-blue-300/40 hover:bg-blue-400/10"
          >
            Back to Dashboard
          </Link>
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
              {card.value}
            </p>
            <p className="relative mt-3 text-sm leading-6 text-zinc-400">
              {card.detail}
            </p>
          </article>
        ))}
      </section>

      {successMessage && (
        <p className="mt-6 rounded-2xl border border-blue-300/40 bg-blue-400/10 px-5 py-4 font-bold text-blue-100">
          {successMessage}
        </p>
      )}

      <section className="mt-6 grid gap-6 xl:grid-cols-[420px_1fr]">
        <form
          onSubmit={handleSubmit}
          className={`${panelClassName} h-fit p-5 md:p-6`}
        >
          <div className="flex flex-col gap-2">
            <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
              Raw Blank Intake
            </p>
            <h2 className="text-2xl font-black text-white">
              {editingItemId ? "Edit Inventory Item" : "Add Inventory Item"}
            </h2>
            <p className="text-sm leading-6 text-zinc-400">
              Local-only form structure ready for a future Supabase inventory
              table.
            </p>
          </div>

          <div className="mt-5 grid gap-4">
            {textFieldNames.map((field) => (
              <InventoryField
                key={field}
                label={fieldLabel(field)}
                name={field}
                onChange={updateFormField}
                placeholder={fieldLabel(field)}
                required={field === "sku" || field === "item_name"}
                value={formState[field]}
              />
            ))}

            <div className="grid gap-4 sm:grid-cols-3">
              <InventoryField
                label="Quantity On Hand"
                name="quantity_on_hand"
                onChange={updateFormField}
                placeholder="0"
                required
                type="number"
                value={formState.quantity_on_hand}
              />
              <InventoryField
                label="Reorder Level"
                name="reorder_level"
                onChange={updateFormField}
                placeholder="0"
                required
                type="number"
                value={formState.reorder_level}
              />
              <InventoryField
                label="Unit Cost"
                name="unit_cost"
                onChange={updateFormField}
                placeholder="0.00"
                required
                step="0.01"
                type="number"
                value={formState.unit_cost}
              />
            </div>

            <label className="block">
              <span className={labelClassName}>Notes</span>
              <textarea
                className={`${inputClassName} min-h-28 resize-y`}
                name="notes"
                onChange={(event) => updateFormField("notes", event.target.value)}
                placeholder="Vendor notes, machine setup reminders, defects, or reorder details"
                value={formState.notes}
              />
            </label>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              className="rounded-xl bg-blue-400 px-5 py-3 font-bold text-black transition hover:bg-blue-300"
            >
              {editingItemId ? "Save Changes" : "Add Inventory Item"}
            </button>
            {editingItemId && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-bold text-white transition hover:border-blue-300/40 hover:bg-blue-400/10"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>

        <div className="space-y-5">
          <section className={`${panelClassName} p-5 md:p-6`}>
            <div className="grid gap-4 lg:grid-cols-[1fr_220px_180px]">
              <label className="block">
                <span className={labelClassName}>Search Inventory</span>
                <input
                  className={inputClassName}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search SKU, item, vendor, material, location"
                  value={searchTerm}
                />
              </label>
              <label className="block">
                <span className={labelClassName}>Category</span>
                <select
                  className={inputClassName}
                  onChange={(event) => setCategoryFilter(event.target.value)}
                  value={categoryFilter}
                >
                  <option value="all">All categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className={labelClassName}>Stock</span>
                <select
                  className={inputClassName}
                  onChange={(event) =>
                    setStockFilter(event.target.value as typeof stockFilter)
                  }
                  value={stockFilter}
                >
                  <option value="all">All stock</option>
                  <option value="low">Low stock</option>
                  <option value="healthy">Healthy stock</option>
                </select>
              </label>
            </div>
          </section>

          <section className={`${panelClassName} overflow-hidden`}>
            <div className="flex flex-col gap-2 border-b border-white/10 px-5 py-5 md:px-6">
              <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
                Inventory Items
              </p>
              <h2 className="text-2xl font-black text-white">
                Raw Product List
              </h2>
            </div>

            <div className="hidden overflow-x-auto xl:block">
              <table className="w-full border-collapse text-left">
                <thead className="border-b border-white/10 bg-black/30 text-xs font-bold uppercase tracking-widest text-blue-300">
                  <tr>
                    <th className="px-5 py-4">SKU</th>
                    <th className="px-5 py-4">Item</th>
                    <th className="px-5 py-4">Category</th>
                    <th className="px-5 py-4">Material</th>
                    <th className="px-5 py-4">Qty</th>
                    <th className="px-5 py-4">Reorder</th>
                    <th className="px-5 py-4">Cost</th>
                    <th className="px-5 py-4">Location</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {filteredItems.map((item) => (
                    <tr
                      key={item.id}
                      className="bg-white/[0.02] transition hover:bg-white/[0.06]"
                    >
                      <td className="px-5 py-4 font-black text-white">
                        {item.sku}
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-bold text-zinc-100">
                          {item.item_name}
                        </p>
                        <p className="mt-1 text-xs text-zinc-500">
                          {displayValue(item.vendor)}
                        </p>
                      </td>
                      <td className="px-5 py-4 text-zinc-300">
                        {item.category}
                      </td>
                      <td className="px-5 py-4 text-zinc-300">
                        {item.material} / {item.color} / {item.size}
                      </td>
                      <td className="px-5 py-4 font-black text-white">
                        {item.quantity_on_hand}
                      </td>
                      <td className="px-5 py-4 text-zinc-300">
                        {item.reorder_level}
                      </td>
                      <td className="px-5 py-4 text-zinc-300">
                        {formatCurrency(item.unit_cost)}
                      </td>
                      <td className="px-5 py-4 text-zinc-300">
                        {item.storage_location}
                      </td>
                      <td className="px-5 py-4">
                        <StockBadge item={item} />
                      </td>
                      <td className="px-5 py-4">
                        <button
                          type="button"
                          onClick={() => startEditing(item)}
                          className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-bold text-white transition hover:border-blue-300/40 hover:bg-blue-400/10"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}

                  {filteredItems.length === 0 && (
                    <tr>
                      <td className="px-5 py-6 text-zinc-400" colSpan={10}>
                        No inventory items match the current filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="grid gap-4 p-4 xl:hidden">
              {filteredItems.map((item) => (
                <article
                  key={item.id}
                  className="rounded-2xl border border-white/10 bg-black/30 p-5"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-blue-300">
                        {item.sku} / {item.category}
                      </p>
                      <h3 className="mt-2 text-xl font-black text-white">
                        {item.item_name}
                      </h3>
                      <p className="mt-2 text-zinc-400">{item.vendor}</p>
                    </div>
                    <StockBadge item={item} />
                  </div>

                  <div className="mt-5 grid gap-3 text-sm text-zinc-300 sm:grid-cols-2">
                    <p>
                      <span className="font-bold text-zinc-500">
                        Material:{" "}
                      </span>
                      {item.material}
                    </p>
                    <p>
                      <span className="font-bold text-zinc-500">Color: </span>
                      {item.color}
                    </p>
                    <p>
                      <span className="font-bold text-zinc-500">Size: </span>
                      {item.size}
                    </p>
                    <p>
                      <span className="font-bold text-zinc-500">Qty: </span>
                      {item.quantity_on_hand}
                    </p>
                    <p>
                      <span className="font-bold text-zinc-500">
                        Reorder:{" "}
                      </span>
                      {item.reorder_level}
                    </p>
                    <p>
                      <span className="font-bold text-zinc-500">Cost: </span>
                      {formatCurrency(item.unit_cost)}
                    </p>
                    <p>
                      <span className="font-bold text-zinc-500">
                        Location:{" "}
                      </span>
                      {item.storage_location}
                    </p>
                    <p>
                      <span className="font-bold text-zinc-500">Notes: </span>
                      {displayValue(item.notes)}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => startEditing(item)}
                    className="mt-5 rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-bold text-white transition hover:border-blue-300/40 hover:bg-blue-400/10"
                  >
                    Edit Item
                  </button>
                </article>
              ))}

              {filteredItems.length === 0 && (
                <p className="rounded-2xl border border-white/10 bg-black/30 p-5 text-zinc-400">
                  No inventory items match the current filters.
                </p>
              )}
            </div>
          </section>
        </div>
      </section>
    </AdminLayout>
  );
}

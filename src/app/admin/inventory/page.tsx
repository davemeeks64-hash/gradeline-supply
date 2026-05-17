"use client";

import { type FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import AdminLayout from "@/components/AdminLayout";
import { supabase } from "@/lib/supabase";

type InventoryItem = {
  id: string | number;
  sku: string;
  item_name: string;
  category: string | null;
  vendor: string | null;
  material: string | null;
  color: string | null;
  size: string | null;
  quantity_on_hand: number;
  reorder_level: number;
  unit_cost: number;
  storage_location: string | null;
  notes: string | null;
  created_at?: string | null;
};

type InventoryPayload = Omit<InventoryItem, "created_at" | "id">;

type InventoryFormState = {
  sku: string;
  item_name: string;
  category: string;
  vendor: string;
  material: string;
  primary_color: string;
  secondary_color: string;
  size: string;
  quantity_on_hand: number;
  reorder_level: number;
  unit_cost: number;
  storage_location: string;
  notes: string;
};

type QuickFilter = "all" | "low" | "Tumblers" | "Leather" | "Wood" | "Acrylic";

type SortKey =
  | "sku"
  | "item_name"
  | "category"
  | "material"
  | "quantity_on_hand"
  | "reorder_level"
  | "unit_cost"
  | "storage_location"
  | "status";

type SortDirection = "asc" | "desc";

const emptyFormState: InventoryFormState = {
  sku: "",
  item_name: "",
  category: "",
  vendor: "",
  material: "",
  primary_color: "",
  secondary_color: "",
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
  "Cutting Boards",
  "Hats",
  "Hardware",
  "Leather",
  "Packaging",
  "Slate",
  "Supplies",
  "Tumblers",
  "Wood",
];

const materials = [
  "Acrylic",
  "Cast acrylic",
  "Leather",
  "Leatherette",
  "Slate",
  "Stainless steel",
  "Walnut",
  "Wood",
];

const colors = [
  "Black",
  "Blue",
  "Brown",
  "Charcoal",
  "Clear",
  "Cream",
  "Gray",
  "Green",
  "Heather Gray",
  "Loden",
  "Matte black",
  "Natural",
  "Navy",
  "Neon Orange",
  "Orange",
  "Raw",
  "Red",
  "Tan",
  "Walnut",
  "White",
  "Yellow",
];

const sizes = [
  "4 in round",
  "10 oz",
  "12 oz",
  "12 x 12 in",
  "12 x 16 in",
  "12 x 18 in",
  "16 oz",
  "20 oz",
  "24 oz",
  "Other",
  "R112",
  "Snapback",
  "Trucker",
];

const textFieldNames: Array<keyof Omit<
  InventoryFormState,
  | "category"
  | "material"
  | "notes"
  | "primary_color"
  | "quantity_on_hand"
  | "reorder_level"
  | "secondary_color"
  | "size"
  | "sku"
  | "unit_cost"
>> = [
  "item_name",
  "vendor",
  "storage_location",
];

const categorySkuCodes: Record<string, string> = {
  Acrylic: "ACR",
  "Cutting Boards": "CB",
  Hat: "HAT",
  Hats: "HAT",
  Hardware: "HDW",
  Leather: "LTH",
  Packaging: "PKG",
  Slate: "SLT",
  Supplies: "SUP",
  Tumblers: "TMB",
  Wood: "WD",
};

const colorSkuCodes: Record<string, string> = {
  Black: "BLK",
  Blue: "BLU",
  Brown: "BRN",
  Charcoal: "CHC",
  Clear: "CLR",
  Cream: "CRM",
  Gray: "GRY",
  Green: "GRN",
  "Heather Gray": "HGRY",
  Loden: "LDN",
  "Matte black": "BLK",
  Natural: "NAT",
  Navy: "NVY",
  "Neon Orange": "NORG",
  Orange: "ORG",
  Raw: "RAW",
  Red: "RED",
  Tan: "TAN",
  Walnut: "WAL",
  White: "WHT",
  Yellow: "YLW",
};

const quickFilters: Array<{ label: string; value: QuickFilter }> = [
  { label: "All", value: "all" },
  { label: "Low Stock", value: "low" },
  { label: "Tumblers", value: "Tumblers" },
  { label: "Leather", value: "Leather" },
  { label: "Wood", value: "Wood" },
  { label: "Acrylic", value: "Acrylic" },
];

const sortableColumns: Array<{ label: string; value: SortKey }> = [
  { label: "SKU", value: "sku" },
  { label: "Item", value: "item_name" },
  { label: "Category", value: "category" },
  { label: "Material", value: "material" },
  { label: "Qty", value: "quantity_on_hand" },
  { label: "Reorder", value: "reorder_level" },
  { label: "Cost", value: "unit_cost" },
  { label: "Location", value: "storage_location" },
  { label: "Status", value: "status" },
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

function matchesQuickFilter(item: InventoryItem, quickFilter: QuickFilter) {
  if (quickFilter === "all") {
    return true;
  }

  if (quickFilter === "low") {
    return isLowStock(item);
  }

  return item.category === quickFilter || item.material === quickFilter;
}

function getSortValue(item: InventoryItem, sortKey: SortKey) {
  if (sortKey === "status") {
    return isLowStock(item) ? 0 : 1;
  }

  const value = item[sortKey];

  if (typeof value === "number") {
    return value;
  }

  return String(value ?? "").toLowerCase();
}

function fieldLabel(field: string) {
  return field
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function toSkuSegment(value: string) {
  return value
    .replace(/\bin\b/gi, "")
    .replace(/[^a-z0-9]+/gi, "")
    .toUpperCase();
}

function getCategoryCode(category: string) {
  return categorySkuCodes[category] || toSkuSegment(category).slice(0, 3) || "CAT";
}

function getColorCode(color: string) {
  const matchingColorKey = Object.keys(colorSkuCodes).find(
    (colorName) => colorName.toLowerCase() === color.trim().toLowerCase()
  );

  return (
    (matchingColorKey ? colorSkuCodes[matchingColorKey] : undefined) ||
    toSkuSegment(color).slice(0, 3) ||
    "CLR"
  );
}

function getColorSkuSegment(primaryColor: string, secondaryColor: string) {
  const primaryCode = primaryColor ? getColorCode(primaryColor) : "CLR";
  const secondaryCode = secondaryColor ? getColorCode(secondaryColor) : "";

  return `${primaryCode}${secondaryCode}`;
}

function getSizeCode(size: string) {
  return toSkuSegment(size) || "SIZE";
}

function combineColorLabel(primaryColor: string, secondaryColor: string) {
  return [primaryColor, secondaryColor].filter(Boolean).join(" / ");
}

function splitStoredColor(color: string | null) {
  const [primaryColor = "", secondaryColor = ""] = (color ?? "")
    .split("/")
    .map((part) => part.trim());

  return { primaryColor, secondaryColor };
}

function nextSkuNumber(
  items: InventoryItem[],
  prefix: string,
  editingItemId: string | number | null
) {
  const matchingNumbers = items
    .filter((item) => item.id !== editingItemId && item.sku.startsWith(prefix))
    .map((item) => Number(item.sku.replace(`${prefix}-`, "")))
    .filter((value) => !Number.isNaN(value));

  const nextNumber = Math.max(0, ...matchingNumbers) + 1;
  return String(nextNumber).padStart(3, "0");
}

function generateSkuPreview(
  formState: InventoryFormState,
  items: InventoryItem[],
  editingItemId: string | number | null
) {
  const prefix = [
    "BLK",
    getCategoryCode(formState.category),
    getColorSkuSegment(formState.primary_color, formState.secondary_color),
    getSizeCode(formState.size),
  ].join("-");

  return `${prefix}-${nextSkuNumber(items, prefix, editingItemId)}`;
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

function SortButton({
  active,
  direction,
  label,
  onClick,
}: {
  active: boolean;
  direction: SortDirection;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 text-left text-xs font-bold uppercase tracking-widest text-blue-300 transition hover:text-blue-100"
    >
      <span>{label}</span>
      <span className={active ? "text-blue-100" : "text-zinc-600"}>
        {active ? (direction === "asc" ? "Up" : "Down") : "Sort"}
      </span>
    </button>
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

function InventorySelectField({
  label,
  name,
  onChange,
  options,
  value,
}: {
  label: string;
  name: keyof InventoryFormState;
  onChange: (name: keyof InventoryFormState, value: string) => void;
  options: string[];
  value: string;
}) {
  return (
    <label className="block">
      <span className={labelClassName}>{label}</span>
      <select
        className={inputClassName}
        name={name}
        onChange={(event) => onChange(name, event.target.value)}
        value={value}
      >
        <option value="">Select {label.toLowerCase()}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function InventoryComboField({
  listId,
  label,
  name,
  onChange,
  options,
  placeholder,
  value,
}: {
  listId: string;
  label: string;
  name: keyof InventoryFormState;
  onChange: (name: keyof InventoryFormState, value: string) => void;
  options: string[];
  placeholder: string;
  value: string;
}) {
  return (
    <label className="block">
      <span className={labelClassName}>{label}</span>
      <input
        className={inputClassName}
        list={listId}
        name={name}
        onChange={(event) => onChange(name, event.target.value)}
        placeholder={placeholder}
        value={value}
      />
      <datalist id={listId}>
        {options.map((option) => (
          <option key={option} value={option} />
        ))}
      </datalist>
      <p className="mt-2 text-xs leading-5 text-zinc-500">
        Start typing to search saved colors or enter a custom color.
      </p>
    </label>
  );
}

export default function AdminInventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [formState, setFormState] =
    useState<InventoryFormState>(emptyFormState);
  const [editingItemId, setEditingItemId] = useState<string | number | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState<"all" | "low" | "healthy">(
    "all"
  );
  const [quickFilter, setQuickFilter] = useState<QuickFilter>("all");
  const [sortKey, setSortKey] = useState<SortKey>("item_name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [skuManuallyEdited, setSkuManuallyEdited] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingItemId, setDeletingItemId] = useState<string | number | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const colorOptions = useMemo(() => {
    const savedColors = items.flatMap((item) => {
      const { primaryColor, secondaryColor } = splitStoredColor(item.color);
      return [primaryColor, secondaryColor];
    });

    return Array.from(
      new Set([...colors, ...savedColors].filter(Boolean))
    ).sort((a, b) => a.localeCompare(b));
  }, [items]);

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
        ].some((value) =>
          String(value ?? "").toLowerCase().includes(normalizedSearch)
        );

      const matchesCategory =
        categoryFilter === "all" || item.category === categoryFilter;

      const lowStock = isLowStock(item);
      const matchesStock =
        stockFilter === "all" ||
        (stockFilter === "low" && lowStock) ||
        (stockFilter === "healthy" && !lowStock);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStock &&
        matchesQuickFilter(item, quickFilter)
      );
    });
  }, [categoryFilter, items, quickFilter, searchTerm, stockFilter]);

  const sortedItems = useMemo(() => {
    return [...filteredItems].sort((a, b) => {
      const aValue = getSortValue(a, sortKey);
      const bValue = getSortValue(b, sortKey);

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }

      const comparison = String(aValue).localeCompare(String(bValue), undefined, {
        numeric: true,
        sensitivity: "base",
      });

      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [filteredItems, sortDirection, sortKey]);

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
    const vendorCount = new Set(
      items
        .map((item) => item.vendor)
        .filter((vendor): vendor is string => Boolean(vendor))
    ).size;

    return [
      {
        label: "Total Inventory Items",
        value: String(items.length),
        detail: "Raw products from Supabase",
      },
      {
        label: "Low Stock Items",
        value: String(lowStockCount),
        detail: "At or below reorder level",
      },
      {
        label: "Total Estimated Inventory Value",
        value: formatCurrency(inventoryValue),
        detail: `${totalUnits} units on hand`,
      },
      {
        label: "Active Vendors",
        value: String(vendorCount),
        detail: "Unique vendor names",
      },
    ];
  }, [items]);

  const generatedSkuPreview = useMemo(() => {
    return generateSkuPreview(formState, items, editingItemId);
  }, [editingItemId, formState, items]);

  async function readInventoryItems() {
    const { data, error } = await supabase
      .from("inventory_items")
      .select("*")
      .order("created_at", { ascending: false });

    return {
      data: (data ?? []) as InventoryItem[],
      error,
    };
  }

  async function loadInventoryItems() {
    setIsLoading(true);
    setErrorMessage("");

    const { data, error } = await readInventoryItems();

    if (error) {
      setItems([]);
      setErrorMessage(error.message);
    } else {
      setItems(data);
    }

    setIsLoading(false);
  }

  function toInventoryPayload(state: InventoryFormState): InventoryPayload {
    return {
      sku: state.sku || generatedSkuPreview,
      item_name: state.item_name,
      category: state.category || null,
      vendor: state.vendor || null,
      material: state.material || null,
      color:
        combineColorLabel(state.primary_color, state.secondary_color) || null,
      size: state.size || null,
      quantity_on_hand: Number(state.quantity_on_hand) || 0,
      reorder_level: Number(state.reorder_level) || 0,
      unit_cost: Number(state.unit_cost) || 0,
      storage_location: state.storage_location || null,
      notes: state.notes || null,
    };
  }

  function toFormState(item: InventoryItem): InventoryFormState {
    const { primaryColor, secondaryColor } = splitStoredColor(item.color);

    return {
      sku: item.sku,
      item_name: item.item_name,
      category: item.category ?? "",
      vendor: item.vendor ?? "",
      material: item.material ?? "",
      primary_color: primaryColor,
      secondary_color: secondaryColor,
      size: item.size ?? "",
      quantity_on_hand: Number(item.quantity_on_hand) || 0,
      reorder_level: Number(item.reorder_level) || 0,
      unit_cost: Number(item.unit_cost) || 0,
      storage_location: item.storage_location ?? "",
      notes: item.notes ?? "",
    };
  }

  useEffect(() => {
    let isMounted = true;

    readInventoryItems().then(({ data, error }) => {
      if (!isMounted) {
        return;
      }

      if (error) {
        setItems([]);
        setErrorMessage(error.message);
      } else {
        setItems(data);
      }

      setIsLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  function updateFormField(name: keyof InventoryFormState, value: string) {
    setSuccessMessage("");
    setErrorMessage("");

    if (name === "sku") {
      setSkuManuallyEdited(true);
      setFormState((current) => ({
        ...current,
        sku: value.toUpperCase(),
      }));
      return;
    }

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
      sku:
        !skuManuallyEdited &&
        (name === "category" ||
          name === "primary_color" ||
          name === "secondary_color" ||
          name === "size")
          ? generateSkuPreview(
              {
                ...current,
                [name]: value,
              },
              items,
              editingItemId
            )
          : current.sku,
    }));
  }

  function updateSort(nextSortKey: SortKey) {
    if (nextSortKey === sortKey) {
      setSortDirection((current) => (current === "asc" ? "desc" : "asc"));
      return;
    }

    setSortKey(nextSortKey);
    setSortDirection("asc");
  }

  function adjustQuantity(delta: number) {
    setSuccessMessage("");
    setErrorMessage("");
    setFormState((current) => ({
      ...current,
      quantity_on_hand: Math.max(
        0,
        (Number(current.quantity_on_hand) || 0) + delta
      ),
    }));
  }

  function resetForm() {
    setFormState(emptyFormState);
    setEditingItemId(null);
    setSkuManuallyEdited(false);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setErrorMessage("");
    setSuccessMessage("");
    const nextItemState = toInventoryPayload(formState);

    if (editingItemId) {
      const { data, error } = await supabase
        .from("inventory_items")
        .update(nextItemState)
        .eq("id", editingItemId)
        .select()
        .single();

      if (error) {
        setErrorMessage(error.message);
      } else {
        setItems((current) =>
          current.map((item) =>
            item.id === editingItemId ? ((data as InventoryItem) ?? item) : item
          )
        );
        setSuccessMessage("Inventory item updated in Supabase.");
        resetForm();
      }

      setIsSaving(false);
      return;
    }

    const { data, error } = await supabase
      .from("inventory_items")
      .insert(nextItemState)
      .select()
      .single();

    if (error) {
      setErrorMessage(error.message);
    } else {
      setItems((current) => [(data as InventoryItem), ...current]);
      setSuccessMessage("Inventory item added to Supabase.");
      resetForm();
    }

    setIsSaving(false);
  }

  function startEditing(item: InventoryItem) {
    setEditingItemId(item.id);
    setFormState(toFormState(item));
    setSkuManuallyEdited(false);
    setSuccessMessage("");
    setErrorMessage("");
  }

  async function deleteInventoryItem(item: InventoryItem) {
    const confirmed = window.confirm(
      `Delete ${item.sku} / ${item.item_name}? This cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    setDeletingItemId(item.id);
    setSuccessMessage("");
    setErrorMessage("");

    const { error } = await supabase
      .from("inventory_items")
      .delete()
      .eq("id", item.id);

    if (error) {
      setErrorMessage(error.message);
    } else {
      setItems((current) =>
        current.filter((currentItem) => currentItem.id !== item.id)
      );

      if (editingItemId === item.id) {
        resetForm();
      }

      setSuccessMessage("Inventory item deleted from Supabase.");
    }

    setDeletingItemId(null);
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

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={loadInventoryItems}
              className="rounded-xl bg-blue-400 px-5 py-3 font-bold text-black transition hover:bg-blue-300"
            >
              Refresh Inventory
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

      <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <article
            key={card.label}
            className={[
              "relative overflow-hidden rounded-3xl border p-5 shadow-[0_18px_45px_rgba(0,0,0,0.28)]",
              card.label === "Low Stock Items" && card.value !== "0"
                ? "border-amber-300/30 bg-[linear-gradient(145deg,rgba(72,52,18,0.36),rgba(7,9,12,0.96))]"
                : "border-white/10 bg-[linear-gradient(145deg,rgba(24,31,38,0.78),rgba(7,9,12,0.96))]",
            ].join(" ")}
          >
            <div
              className={[
                "absolute -right-12 -top-12 h-32 w-32 rounded-full blur-3xl",
                card.label === "Low Stock Items" && card.value !== "0"
                  ? "bg-amber-400/15"
                  : "bg-blue-400/10",
              ].join(" ")}
            />
            <div
              className={[
                "relative h-2 w-12 shadow-[0_0_18px_rgba(96,165,250,0.65)]",
                card.label === "Low Stock Items" && card.value !== "0"
                  ? "bg-amber-300"
                  : "bg-blue-400",
              ].join(" ")}
            />
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

      {errorMessage && (
        <p
          role="alert"
          className="mt-6 rounded-2xl border border-red-400/40 bg-red-500/10 px-5 py-4 font-bold text-red-100"
        >
          {errorMessage}
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
              Add or edit raw blanks in the Supabase inventory_items table.
            </p>
          </div>

          <div className="mt-5 grid gap-4">
            <div className="rounded-2xl border border-blue-300/25 bg-blue-400/10 p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-blue-200">
                SKU Preview
              </p>
              <p className="mt-2 break-all font-mono text-2xl font-black text-white">
                {generatedSkuPreview}
              </p>
              <p className="mt-2 text-sm leading-6 text-zinc-400">
                Format: BLK-[CATEGORY]-[PRIMARY+SECONDARY]-[SIZE]-[NUMBER].
                Example: BLK-HAT-BLKGRY-R112-001. The SKU field auto-updates
                until you manually edit it.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <InventorySelectField
                label="Category"
                name="category"
                onChange={updateFormField}
                options={categories}
                value={formState.category}
              />
              <InventorySelectField
                label="Material"
                name="material"
                onChange={updateFormField}
                options={materials}
                value={formState.material}
              />
              <InventoryComboField
                listId="inventory-primary-color-options"
                label="Primary Color"
                name="primary_color"
                onChange={updateFormField}
                options={colorOptions}
                placeholder="Black, Heather Gray, Loden"
                value={formState.primary_color}
              />
              <InventoryComboField
                listId="inventory-secondary-color-options"
                label="Secondary Color"
                name="secondary_color"
                onChange={updateFormField}
                options={colorOptions}
                placeholder="Gray, Black, Neon Orange"
                value={formState.secondary_color}
              />
              <InventorySelectField
                label="Size"
                name="size"
                onChange={updateFormField}
                options={sizes}
                value={formState.size}
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
              <InventoryField
                label="SKU"
                name="sku"
                onChange={updateFormField}
                placeholder={generatedSkuPreview}
                value={formState.sku}
              />
              <button
                type="button"
                onClick={() => {
                  setFormState((current) => ({
                    ...current,
                    sku: generatedSkuPreview,
                  }));
                  setSkuManuallyEdited(false);
                  setSuccessMessage("");
                }}
                className="rounded-xl border border-blue-300/40 bg-blue-400/10 px-5 py-3 font-bold text-blue-100 transition hover:bg-blue-400/20"
              >
                Use Generated
              </button>
            </div>

            {textFieldNames.map((field) => (
              <InventoryField
                key={field}
                label={fieldLabel(field)}
                name={field}
                onChange={updateFormField}
                placeholder={fieldLabel(field)}
                required={field === "item_name"}
                value={formState[field]}
              />
            ))}

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <InventoryField
                  label="Quantity On Hand"
                  name="quantity_on_hand"
                  onChange={updateFormField}
                  placeholder="0"
                  required
                  type="number"
                  value={formState.quantity_on_hand}
                />
                <div className="mt-2 grid grid-cols-4 gap-2">
                  {[1, 5, -1, -5].map((delta) => (
                    <button
                      key={delta}
                      type="button"
                      onClick={() => adjustQuantity(delta)}
                      className={[
                        "rounded-lg border px-2 py-2 text-sm font-black transition",
                        delta > 0
                          ? "border-blue-300/35 bg-blue-400/10 text-blue-100 hover:bg-blue-400/20"
                          : "border-amber-300/35 bg-amber-400/10 text-amber-100 hover:bg-amber-400/20",
                      ].join(" ")}
                    >
                      {delta > 0 ? `+${delta}` : delta}
                    </button>
                  ))}
                </div>
              </div>
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
              disabled={isSaving}
              className="rounded-xl bg-blue-400 px-5 py-3 font-bold text-black transition hover:bg-blue-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving
                ? "Saving..."
                : editingItemId
                  ? "Save Changes"
                  : "Add Inventory Item"}
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
            <div className="mb-5 flex flex-wrap gap-2">
              {quickFilters.map((filter) => {
                const isActive = quickFilter === filter.value;

                return (
                  <button
                    key={filter.value}
                    type="button"
                    onClick={() => {
                      setQuickFilter(filter.value);
                      setCategoryFilter("all");
                      setStockFilter("all");
                    }}
                    className={[
                      "rounded-xl border px-4 py-2 text-sm font-bold uppercase tracking-widest transition",
                      isActive
                        ? "border-blue-300/60 bg-blue-400/20 text-blue-100 shadow-[0_0_18px_rgba(96,165,250,0.16)]"
                        : "border-white/10 bg-black/25 text-zinc-400 hover:border-blue-300/40 hover:bg-blue-400/10 hover:text-white",
                    ].join(" ")}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>

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
                  onChange={(event) => {
                    setCategoryFilter(event.target.value);
                    setQuickFilter("all");
                  }}
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
                  onChange={(event) => {
                    setStockFilter(event.target.value as typeof stockFilter);
                    setQuickFilter("all");
                  }}
                  value={stockFilter}
                >
                  <option value="all">All stock</option>
                  <option value="low">Low stock</option>
                  <option value="healthy">Healthy stock</option>
                </select>
              </label>
            </div>
            <p className="mt-4 text-sm text-zinc-500">
              Showing {sortedItems.length} of {items.length} inventory records.
            </p>
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
                    {sortableColumns.map((column) => (
                      <th key={column.value} className="px-5 py-4">
                        <SortButton
                          active={sortKey === column.value}
                          direction={sortDirection}
                          label={column.label}
                          onClick={() => updateSort(column.value)}
                        />
                      </th>
                    ))}
                    <th className="px-5 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {isLoading && (
                    <tr>
                      <td className="px-5 py-6 text-zinc-400" colSpan={10}>
                        Loading inventory items from Supabase...
                      </td>
                    </tr>
                  )}

                  {!isLoading &&
                    sortedItems.map((item) => {
                      const lowStock = isLowStock(item);

                      return (
                      <tr
                        key={item.id}
                        className={[
                          "transition hover:bg-white/[0.06]",
                          lowStock ? "bg-amber-400/[0.06]" : "bg-white/[0.02]",
                        ].join(" ")}
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
                          {displayValue(item.category)}
                        </td>
                        <td className="px-5 py-4 text-zinc-300">
                          {displayValue(item.material)} /{" "}
                          {displayValue(item.color)} / {displayValue(item.size)}
                        </td>
                        <td className="px-5 py-4 font-black text-white">
                          {item.quantity_on_hand}
                          {lowStock && (
                            <p className="mt-1 text-xs font-bold uppercase tracking-widest text-amber-200">
                              Reorder
                            </p>
                          )}
                        </td>
                        <td className="px-5 py-4 text-zinc-300">
                          {item.reorder_level}
                        </td>
                        <td className="px-5 py-4 text-zinc-300">
                          {formatCurrency(item.unit_cost)}
                        </td>
                        <td className="px-5 py-4 text-zinc-300">
                          {displayValue(item.storage_location)}
                        </td>
                        <td className="px-5 py-4">
                          <StockBadge item={item} />
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => startEditing(item)}
                              className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-bold text-white transition hover:border-blue-300/40 hover:bg-blue-400/10"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              disabled={deletingItemId === item.id}
                              onClick={() => deleteInventoryItem(item)}
                              className="rounded-lg border border-red-300/30 bg-red-500/10 px-4 py-2 text-sm font-bold text-red-100 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              {deletingItemId === item.id
                                ? "Deleting"
                                : "Delete"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                    })}

                  {!isLoading && sortedItems.length === 0 && (
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
              {isLoading && (
                <p className="rounded-2xl border border-white/10 bg-black/30 p-5 text-zinc-400">
                  Loading inventory items from Supabase...
                </p>
              )}

              {!isLoading &&
                sortedItems.map((item) => {
                  const lowStock = isLowStock(item);

                  return (
                    <article
                      key={item.id}
                      className={[
                        "rounded-2xl border p-5",
                        lowStock
                          ? "border-amber-300/35 bg-amber-400/[0.06]"
                          : "border-white/10 bg-black/30",
                      ].join(" ")}
                    >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-blue-300">
                          {item.sku} / {displayValue(item.category)}
                        </p>
                        <h3 className="mt-2 text-xl font-black text-white">
                          {item.item_name}
                        </h3>
                        <p className="mt-2 text-zinc-400">
                          {displayValue(item.vendor)}
                        </p>
                      </div>
                      <StockBadge item={item} />
                    </div>

                    <div className="mt-5 grid gap-3 text-sm text-zinc-300 sm:grid-cols-2">
                      <p>
                        <span className="font-bold text-zinc-500">
                          Material:{" "}
                        </span>
                        {displayValue(item.material)}
                      </p>
                      <p>
                        <span className="font-bold text-zinc-500">
                          Colors:{" "}
                        </span>
                        {displayValue(item.color)}
                      </p>
                      <p>
                        <span className="font-bold text-zinc-500">Size: </span>
                        {displayValue(item.size)}
                      </p>
                      <p>
                      <span className="font-bold text-zinc-500">Qty: </span>
                      {item.quantity_on_hand}
                      {lowStock && (
                        <span className="ml-2 font-bold uppercase tracking-widest text-amber-200">
                          Reorder
                        </span>
                      )}
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
                        {displayValue(item.storage_location)}
                      </p>
                      <p>
                        <span className="font-bold text-zinc-500">
                          Notes:{" "}
                        </span>
                        {displayValue(item.notes)}
                      </p>
                    </div>

                    <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                      <button
                        type="button"
                        onClick={() => startEditing(item)}
                        className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-bold text-white transition hover:border-blue-300/40 hover:bg-blue-400/10"
                      >
                        Edit Item
                      </button>
                      <button
                        type="button"
                        disabled={deletingItemId === item.id}
                        onClick={() => deleteInventoryItem(item)}
                        className="rounded-lg border border-red-300/30 bg-red-500/10 px-4 py-2 text-sm font-bold text-red-100 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {deletingItemId === item.id
                          ? "Deleting"
                          : "Delete Item"}
                      </button>
                    </div>
                </article>
                  );
                })}

              {!isLoading && sortedItems.length === 0 && (
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

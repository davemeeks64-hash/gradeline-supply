"use client";

import { type FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import AdminLayout from "@/components/AdminLayout";
import { supabase } from "@/lib/supabase";

type Product = {
  id?: string | number;
  sku: string | null;
  name: string | null;
  inventory_item_id?: string | number | null;
  materials_used?: ProductMaterial[];
  category: string | null;
  material: string | null;
  base_price: number | null;
  active: boolean | null;
  created_at?: string | null;
};

type InventoryItem = {
  id: string | number;
  sku: string | null;
  item_name: string | null;
  quantity_on_hand: number | null;
};

type ProductMaterial = {
  inventory_item_id: string;
  quantity_used: number;
};

type ProductFormState = {
  sku: string;
  name: string;
  inventory_item_id: string;
  category: string;
  material: string;
  base_price: string;
  active: boolean;
};

type ActiveFilter = "all" | "active" | "inactive";

const initialFormState: ProductFormState = {
  sku: "",
  name: "",
  inventory_item_id: "",
  category: "",
  material: "",
  base_price: "",
  active: true,
};

const inputClassName =
  "mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-blue-300/60 focus:bg-black/45";

const labelClassName =
  "text-xs font-bold uppercase tracking-widest text-blue-300";

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

function normalizeId(value: string) {
  const numericValue = Number(value);
  return Number.isNaN(numericValue) ? value : numericValue;
}

function getProductKey(product: Product) {
  return String(product.id ?? product.sku ?? product.name ?? "");
}

function formatInventoryItemLabel(item: InventoryItem | undefined) {
  if (!item) {
    return "Unknown inventory item";
  }

  return `${displayValue(item.sku)} / ${displayValue(item.item_name)}`;
}

function ProductField({
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
  name: keyof Omit<ProductFormState, "active">;
  onChange: (name: keyof Omit<ProductFormState, "active">, value: string) => void;
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

function ActiveBadge({ active }: { active: boolean | null }) {
  const isActive = active !== false;

  return (
    <span
      className={[
        "inline-flex w-fit rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-widest",
        isActive
          ? "border-green-300/50 bg-green-400/10 text-green-200"
          : "border-zinc-400/50 bg-zinc-400/10 text-zinc-300",
      ].join(" ")}
    >
      {isActive ? "Active" : "Inactive"}
    </span>
  );
}

export default function AdminStockProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [formState, setFormState] =
    useState<ProductFormState>(initialFormState);
  const [materialsUsed, setMaterialsUsed] = useState<ProductMaterial[]>([]);
  const [selectedMaterialItemId, setSelectedMaterialItemId] = useState("");
  const [selectedMaterialQuantity, setSelectedMaterialQuantity] = useState("1");
  const [editingProductId, setEditingProductId] = useState<
    string | number | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [updatingProductId, setUpdatingProductId] = useState<
    string | number | null
  >(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const categories = useMemo(() => {
    return Array.from(
      new Set(
        products
          .map((product) => product.category)
          .filter((category): category is string => Boolean(category))
      )
    ).sort();
  }, [products]);

  const inventoryItemById = useMemo(() => {
    return inventoryItems.reduce<Record<string, InventoryItem>>((lookup, item) => {
      lookup[String(item.id)] = item;
      return lookup;
    }, {});
  }, [inventoryItems]);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        [product.sku, product.name, product.category, product.material]
          .filter(Boolean)
          .some((value) =>
            String(value).toLowerCase().includes(normalizedSearch)
          );

      const matchesActive =
        activeFilter === "all" ||
        (activeFilter === "active" && product.active !== false) ||
        (activeFilter === "inactive" && product.active === false);

      const matchesCategory =
        categoryFilter === "all" || product.category === categoryFilter;

      return matchesSearch && matchesActive && matchesCategory;
    });
  }, [activeFilter, categoryFilter, products, searchTerm]);

  async function readProducts() {
    const [productsResponse, inventoryResponse] = await Promise.all([
      supabase.from("products").select("*"),
      supabase
        .from("inventory_items")
        .select("id,sku,item_name,quantity_on_hand"),
    ]);

    return {
      data: (productsResponse.data ?? []) as Product[],
      error: productsResponse.error || inventoryResponse.error,
      inventoryItems: (inventoryResponse.data ?? []) as InventoryItem[],
    };
  }

  async function loadProducts() {
    setIsLoading(true);
    setErrorMessage("");

    const { data, error, inventoryItems: nextInventoryItems } = await readProducts();

    if (error) {
      setErrorMessage(error.message);
      setProducts([]);
      setInventoryItems([]);
    } else {
      setProducts((currentProducts) => {
        const materialsByProductKey = currentProducts.reduce<
          Record<string, ProductMaterial[]>
        >((lookup, product) => {
          lookup[getProductKey(product)] = product.materials_used ?? [];
          return lookup;
        }, {});

        return data.map((product) => ({
          ...product,
          materials_used: materialsByProductKey[getProductKey(product)] ?? [],
        }));
      });
      setInventoryItems(nextInventoryItems);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    let isMounted = true;

    readProducts().then(({ data, error, inventoryItems: nextInventoryItems }) => {
      if (!isMounted) {
        return;
      }

      if (error) {
        setErrorMessage(error.message);
        setProducts([]);
        setInventoryItems([]);
      } else {
        setProducts(data);
        setInventoryItems(nextInventoryItems);
      }

      setIsLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  function updateFormField(
    name: keyof Omit<ProductFormState, "active">,
    value: string
  ) {
    setFormState((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function resetForm() {
    setFormState(initialFormState);
    setMaterialsUsed([]);
    setSelectedMaterialItemId("");
    setSelectedMaterialQuantity("1");
    setEditingProductId(null);
    setSuccessMessage("");
    setErrorMessage("");
  }

  function editProduct(product: Product) {
    setEditingProductId(product.id ?? null);
    setFormState({
      sku: product.sku ?? "",
      name: product.name ?? "",
      inventory_item_id: product.inventory_item_id
        ? String(product.inventory_item_id)
        : "",
      category: product.category ?? "",
      material: product.material ?? "",
      base_price:
        product.base_price === null || product.base_price === undefined
          ? ""
          : String(product.base_price),
      active: product.active !== false,
    });
    setMaterialsUsed(product.materials_used ?? []);
    setSelectedMaterialItemId("");
    setSelectedMaterialQuantity("1");
    setSuccessMessage("");
    setErrorMessage("");
  }

  function addMaterialUsed() {
    const quantity = Number(selectedMaterialQuantity);

    if (!selectedMaterialItemId || quantity <= 0) {
      setErrorMessage("Select an inventory item and quantity used.");
      return;
    }

    setMaterialsUsed((current) => {
      const existingMaterial = current.find(
        (material) => material.inventory_item_id === selectedMaterialItemId
      );

      if (existingMaterial) {
        return current.map((material) =>
          material.inventory_item_id === selectedMaterialItemId
            ? {
                ...material,
                quantity_used: material.quantity_used + quantity,
              }
            : material
        );
      }

      return [
        ...current,
        {
          inventory_item_id: selectedMaterialItemId,
          quantity_used: quantity,
        },
      ];
    });

    setSelectedMaterialItemId("");
    setSelectedMaterialQuantity("1");
    setSuccessMessage("");
    setErrorMessage("");
  }

  function removeMaterialUsed(inventoryItemId: string) {
    setMaterialsUsed((current) =>
      current.filter((material) => material.inventory_item_id !== inventoryItemId)
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setErrorMessage("");
    setSuccessMessage("");

    const payload = {
      sku: formState.sku.trim(),
      name: formState.name.trim(),
      ...(formState.inventory_item_id
        ? { inventory_item_id: normalizeId(formState.inventory_item_id) }
        : {}),
      category: formState.category.trim(),
      material: formState.material.trim(),
      base_price: Number(formState.base_price),
      active: formState.active,
    };

    const response = editingProductId
      ? await supabase
          .from("products")
          .update(payload)
          .eq("id", editingProductId)
          .select()
          .single()
      : await supabase.from("products").insert(payload).select().single();

    if (response.error) {
      setErrorMessage(response.error.message);
      setIsSaving(false);
      return;
    }

    const savedProduct = {
      ...((response.data ?? {}) as Product),
      materials_used: materialsUsed,
    };

    setProducts((currentProducts) =>
      editingProductId
        ? currentProducts.map((product) =>
            product.id === editingProductId ? savedProduct : product
          )
        : [savedProduct, ...currentProducts]
    );

    setSuccessMessage(
      editingProductId
        ? "Product updated successfully."
        : "Product added successfully."
    );
    setFormState(initialFormState);
    setMaterialsUsed([]);
    setSelectedMaterialItemId("");
    setSelectedMaterialQuantity("1");
    setEditingProductId(null);
    setIsSaving(false);
  }

  async function toggleProductActive(product: Product) {
    if (!product.id) {
      setErrorMessage("Cannot update a product without an id.");
      return;
    }

    const nextActive = product.active === false;

    setUpdatingProductId(product.id);
    setErrorMessage("");
    setSuccessMessage("");

    const { error } = await supabase
      .from("products")
      .update({ active: nextActive })
      .eq("id", product.id);

    if (error) {
      setErrorMessage(error.message);
    } else {
      setProducts((currentProducts) =>
        currentProducts.map((currentProduct) =>
          currentProduct.id === product.id
            ? { ...currentProduct, active: nextActive }
            : currentProduct
        )
      );
      setSuccessMessage(
        `${displayValue(product.name)} marked ${
          nextActive ? "active" : "inactive"
        }.`
      );
    }

    setUpdatingProductId(null);
  }

  return (
    <AdminLayout activeHref="/admin/stock-products">
      <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-blue-950/40 p-6 shadow-2xl md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
              Gradeline Admin
            </p>
            <h1 className="mt-3 text-4xl font-black md:text-6xl">
              Stock Products
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-300">
              Manage ready-made product SKUs, materials, pricing, and active
              status from the live Supabase products table.
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

      <section className="mt-6 rounded-3xl border border-white/10 bg-[linear-gradient(145deg,rgba(24,31,38,0.78),rgba(7,9,12,0.96))] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.28)] md:p-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className={labelClassName}>
              {editingProductId ? "Edit Product" : "New Product"}
            </p>
            <h2 className="mt-2 text-3xl font-black">Product Details</h2>
          </div>
          <p className="text-sm text-zinc-400">
            SKU, name, and base price are required.
          </p>
        </div>

        <form className="mt-6 grid gap-5" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <ProductField
              label="SKU"
              name="sku"
              onChange={updateFormField}
              placeholder="GL-STOCK-001"
              required
              value={formState.sku}
            />
            <ProductField
              label="Name"
              name="name"
              onChange={updateFormField}
              placeholder="Cow Tags - Blackout Set"
              required
              value={formState.name}
            />
            <label className="block">
              <span className={labelClassName}>Linked Inventory Item</span>
              <select
                className={inputClassName}
                name="inventory_item_id"
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    inventory_item_id: event.target.value,
                  }))
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
            <ProductField
              label="Category"
              name="category"
              onChange={updateFormField}
              placeholder="Industrial & Blue Collar"
              value={formState.category}
            />
            <ProductField
              label="Material"
              name="material"
              onChange={updateFormField}
              placeholder="Brushed aluminum"
              value={formState.material}
            />
            <ProductField
              label="Base Price"
              name="base_price"
              onChange={updateFormField}
              placeholder="12.00"
              required
              step="0.01"
              type="number"
              value={formState.base_price}
            />
            <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm font-bold text-zinc-200 xl:self-end">
              <input
                checked={formState.active}
                className="size-4 accent-blue-400"
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    active: event.target.checked,
                  }))
                }
                type="checkbox"
              />
              Active product
            </label>
          </div>

          <section className="rounded-2xl border border-white/10 bg-black/25 p-4">
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <p className={labelClassName}>Materials / Blanks Used</p>
                <h3 className="mt-2 text-xl font-black text-white">
                  Product Bill of Materials
                </h3>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  Local product structure only for now. These lines prepare
                  future automatic inventory deduction.
                </p>
              </div>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-[1fr_140px_auto] md:items-end">
              <label className="block">
                <span className={labelClassName}>Inventory Item</span>
                <select
                  className={inputClassName}
                  onChange={(event) =>
                    setSelectedMaterialItemId(event.target.value)
                  }
                  value={selectedMaterialItemId}
                >
                  <option value="">Select blank/material</option>
                  {inventoryItems.map((item) => (
                    <option key={item.id} value={String(item.id)}>
                      {formatInventoryItemLabel(item)} /{" "}
                      {displayValue(item.quantity_on_hand)} on hand
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className={labelClassName}>Qty Used</span>
                <input
                  className={inputClassName}
                  min="0.01"
                  onChange={(event) =>
                    setSelectedMaterialQuantity(event.target.value)
                  }
                  step="0.01"
                  type="number"
                  value={selectedMaterialQuantity}
                />
              </label>

              <button
                type="button"
                onClick={addMaterialUsed}
                className="rounded-xl border border-blue-300/40 bg-blue-400/10 px-5 py-3 font-bold text-blue-100 transition hover:bg-blue-400/20"
              >
                Add Material
              </button>
            </div>

            <div className="mt-4 grid gap-3">
              {materialsUsed.length === 0 && (
                <p className="rounded-xl border border-dashed border-white/10 bg-black/20 p-4 text-sm text-zinc-500">
                  No materials linked yet. Example lines: 1 blank tumbler, 1
                  leather patch, 1 box.
                </p>
              )}

              {materialsUsed.map((material) => {
                const inventoryItem =
                  inventoryItemById[material.inventory_item_id];

                return (
                  <div
                    key={material.inventory_item_id}
                    className="flex flex-col gap-3 rounded-xl border border-white/10 bg-black/30 p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="font-bold text-white">
                        {formatInventoryItemLabel(inventoryItem)}
                      </p>
                      <p className="mt-1 text-sm text-zinc-500">
                        Quantity used per product: {material.quantity_used}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        removeMaterialUsed(material.inventory_item_id)
                      }
                      className="rounded-lg border border-red-300/30 bg-red-500/10 px-4 py-2 text-sm font-bold text-red-100 transition hover:bg-red-500/20"
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>
          </section>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="submit"
              className="rounded-xl bg-blue-400 px-6 py-3 font-bold text-black transition hover:bg-blue-300 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isSaving}
            >
              {isSaving
                ? "Saving..."
                : editingProductId
                  ? "Update Product"
                  : "Add Product"}
            </button>
            <button
              type="button"
              className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-bold text-white transition hover:border-blue-300/40 hover:bg-blue-400/10"
              onClick={resetForm}
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
        <div className="border-b border-white/10 bg-black/30 p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className={labelClassName}>Products Table</p>
              <h2 className="mt-2 text-2xl font-black">
                Products ({filteredProducts.length})
              </h2>
            </div>
            <button
              type="button"
              onClick={loadProducts}
              className="w-fit rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-bold text-white transition hover:border-blue-300/40 hover:bg-blue-400/10"
            >
              Refresh Products
            </button>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-[minmax(0,1fr)_220px_220px]">
            <label className="block">
              <span className={labelClassName}>Search</span>
              <input
                className={inputClassName}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by SKU, name, category, or material"
                value={searchTerm}
              />
            </label>

            <label className="block">
              <span className={labelClassName}>Status Filter</span>
              <select
                className={inputClassName}
                onChange={(event) =>
                  setActiveFilter(event.target.value as ActiveFilter)
                }
                value={activeFilter}
              >
                <option value="all">All Products</option>
                <option value="active">Active Only</option>
                <option value="inactive">Inactive Only</option>
              </select>
            </label>

            <label className="block">
              <span className={labelClassName}>Category Filter</span>
              <select
                className={inputClassName}
                onChange={(event) => setCategoryFilter(event.target.value)}
                value={categoryFilter}
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {isLoading && (
          <div className="p-5 text-zinc-300">Loading products...</div>
        )}

        {!isLoading && filteredProducts.length === 0 && (
          <div className="p-5 text-zinc-300">No products found.</div>
        )}

        {!isLoading && filteredProducts.length > 0 && (
          <>
            <div className="hidden overflow-x-auto xl:block">
              <table className="w-full border-collapse text-left">
                <thead className="border-b border-white/10 bg-black/30 text-xs font-bold uppercase tracking-widest text-blue-300">
                  <tr>
                    <th className="px-5 py-4">SKU</th>
                    <th className="px-5 py-4">Product</th>
                    <th className="px-5 py-4">Inventory Link</th>
                    <th className="px-5 py-4">Materials / Blanks</th>
                    <th className="px-5 py-4">Category</th>
                    <th className="px-5 py-4">Material</th>
                    <th className="px-5 py-4 text-right">Base Price</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {filteredProducts.map((product, index) => (
                    <tr
                      key={product.id ?? `${product.sku}-${index}`}
                      className="bg-white/[0.02] transition hover:bg-white/[0.06]"
                    >
                      <td className="px-5 py-4 font-black text-white">
                        {displayValue(product.sku)}
                      </td>
                      <td className="px-5 py-4 text-zinc-200">
                        {displayValue(product.name)}
                      </td>
                      <td className="px-5 py-4 text-sm text-zinc-300">
                        {product.inventory_item_id &&
                        inventoryItemById[String(product.inventory_item_id)]
                          ? `${displayValue(
                              inventoryItemById[
                                String(product.inventory_item_id)
                              ].sku
                            )} / ${displayValue(
                              inventoryItemById[
                                String(product.inventory_item_id)
                              ].quantity_on_hand
                            )} on hand`
                          : "No linked blank"}
                      </td>
                      <td className="px-5 py-4 text-sm text-zinc-300">
                        {product.materials_used &&
                        product.materials_used.length > 0 ? (
                          <div className="grid gap-1">
                            {product.materials_used.map((material) => (
                              <p key={material.inventory_item_id}>
                                {material.quantity_used} x{" "}
                                {formatInventoryItemLabel(
                                  inventoryItemById[
                                    material.inventory_item_id
                                  ]
                                )}
                              </p>
                            ))}
                          </div>
                        ) : (
                          "No BOM lines"
                        )}
                      </td>
                      <td className="px-5 py-4 text-zinc-300">
                        {displayValue(product.category)}
                      </td>
                      <td className="px-5 py-4 text-zinc-300">
                        {displayValue(product.material)}
                      </td>
                      <td className="px-5 py-4 text-right font-black text-white">
                        {formatCurrency(product.base_price)}
                      </td>
                      <td className="px-5 py-4">
                        <ActiveBadge active={product.active} />
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-bold text-white transition hover:border-blue-300/40 hover:bg-blue-400/10"
                            onClick={() => editProduct(product)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="rounded-xl border border-white/15 bg-black/30 px-4 py-2 text-sm font-bold text-zinc-300 transition hover:border-blue-300/40 hover:bg-blue-400/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                            disabled={updatingProductId === product.id}
                            onClick={() => toggleProductActive(product)}
                          >
                            {product.active === false ? "Activate" : "Disable"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid gap-4 p-4 xl:hidden">
              {filteredProducts.map((product, index) => (
                <article
                  key={product.id ?? `${product.sku}-${index}`}
                  className="rounded-2xl border border-white/10 bg-black/30 p-5"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className={labelClassName}>
                        {displayValue(product.sku)}
                      </p>
                      <h3 className="mt-2 text-xl font-black text-white">
                        {displayValue(product.name)}
                      </h3>
                    </div>
                    <ActiveBadge active={product.active} />
                  </div>

                  <div className="mt-5 grid gap-3 text-sm text-zinc-300 sm:grid-cols-2">
                    <p>
                      <span className="font-bold text-zinc-500">
                        Category:{" "}
                      </span>
                      {displayValue(product.category)}
                    </p>
                    <p>
                      <span className="font-bold text-zinc-500">
                        Inventory:{" "}
                      </span>
                      {product.inventory_item_id &&
                      inventoryItemById[String(product.inventory_item_id)]
                        ? `${displayValue(
                            inventoryItemById[String(product.inventory_item_id)]
                              .sku
                          )} / ${displayValue(
                            inventoryItemById[String(product.inventory_item_id)]
                              .quantity_on_hand
                          )} on hand`
                        : "No linked blank"}
                    </p>
                    <p>
                      <span className="font-bold text-zinc-500">
                        Material:{" "}
                      </span>
                      {displayValue(product.material)}
                    </p>
                    <p>
                      <span className="font-bold text-zinc-500">
                        Base Price:{" "}
                      </span>
                      {formatCurrency(product.base_price)}
                    </p>
                  </div>

                  <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                    <button
                      type="button"
                      className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-bold text-white transition hover:border-blue-300/40 hover:bg-blue-400/10"
                      onClick={() => editProduct(product)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="rounded-xl border border-white/15 bg-black/30 px-4 py-2 text-sm font-bold text-zinc-300 transition hover:border-blue-300/40 hover:bg-blue-400/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                      disabled={updatingProductId === product.id}
                      onClick={() => toggleProductActive(product)}
                    >
                      {product.active === false ? "Activate" : "Disable"}
                    </button>
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

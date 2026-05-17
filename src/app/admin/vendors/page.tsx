"use client";

import { type FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import AdminLayout from "@/components/AdminLayout";
import { supabase } from "@/lib/supabase";

type Vendor = {
  id: string | number;
  vendor_name: string;
  website: string | null;
  contact_name: string | null;
  email: string | null;
  phone: string | null;
  product_categories: string | null;
  notes: string | null;
  preferred_vendor: boolean;
  created_at?: string | null;
};

type VendorPayload = Omit<Vendor, "created_at" | "id">;

type VendorFormState = {
  vendor_name: string;
  website: string;
  contact_name: string;
  email: string;
  phone: string;
  product_categories: string;
  notes: string;
  preferred_vendor: boolean;
};

type VendorFieldName = keyof Omit<VendorFormState, "preferred_vendor" | "notes">;
type VendorFilter = "all" | "preferred" | "standard";

const emptyFormState: VendorFormState = {
  vendor_name: "",
  website: "",
  contact_name: "",
  email: "",
  phone: "",
  product_categories: "",
  notes: "",
  preferred_vendor: false,
};

const vendorFieldNames: Array<{
  label: string;
  name: VendorFieldName;
  placeholder: string;
  required?: boolean;
  type?: string;
}> = [
  {
    label: "Vendor Name",
    name: "vendor_name",
    placeholder: "SteelCup Wholesale",
    required: true,
  },
  {
    label: "Website",
    name: "website",
    placeholder: "https://vendor.example",
    type: "url",
  },
  {
    label: "Contact Name",
    name: "contact_name",
    placeholder: "Account rep or sales desk",
  },
  {
    label: "Email",
    name: "email",
    placeholder: "orders@vendor.example",
    type: "email",
  },
  {
    label: "Phone",
    name: "phone",
    placeholder: "(555) 000-0000",
  },
  {
    label: "Product Categories",
    name: "product_categories",
    placeholder: "Tumblers, Leather, Acrylic",
    required: true,
  },
];

const inputClassName =
  "mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-blue-300/60 focus:bg-black/45";

const labelClassName =
  "text-xs font-bold uppercase tracking-widest text-blue-300";

const panelClassName =
  "rounded-3xl border border-white/10 bg-[linear-gradient(145deg,rgba(24,31,38,0.78),rgba(7,9,12,0.96))] shadow-[0_18px_45px_rgba(0,0,0,0.28)]";

function displayValue(value: string | number | null | undefined) {
  return value === null || value === undefined || value === "" ? "-" : value;
}

function PreferredBadge({ preferred }: { preferred: boolean }) {
  return (
    <span
      className={[
        "inline-flex w-fit rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-widest",
        preferred
          ? "border-blue-300/50 bg-blue-400/10 text-blue-200 shadow-[0_0_18px_rgba(96,165,250,0.12)]"
          : "border-zinc-400/40 bg-zinc-400/10 text-zinc-300",
      ].join(" ")}
    >
      {preferred ? "Preferred" : "Standard"}
    </span>
  );
}

function VendorField({
  label,
  name,
  onChange,
  placeholder,
  required = false,
  type = "text",
  value,
}: {
  label: string;
  name: VendorFieldName;
  onChange: (name: VendorFieldName, value: string) => void;
  placeholder: string;
  required?: boolean;
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
        type={type}
        value={value}
      />
    </label>
  );
}

export default function AdminVendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [formState, setFormState] = useState<VendorFormState>(emptyFormState);
  const [editingVendorId, setEditingVendorId] = useState<
    string | number | null
  >(null);
  const [deletingVendorId, setDeletingVendorId] = useState<
    string | number | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [vendorFilter, setVendorFilter] = useState<VendorFilter>("all");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const filteredVendors = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return vendors.filter((vendor) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        [
          vendor.vendor_name,
          vendor.website,
          vendor.contact_name,
          vendor.email,
          vendor.phone,
          vendor.product_categories,
          vendor.notes,
        ].some((value) =>
          String(value ?? "").toLowerCase().includes(normalizedSearch)
        );

      const matchesFilter =
        vendorFilter === "all" ||
        (vendorFilter === "preferred" && vendor.preferred_vendor) ||
        (vendorFilter === "standard" && !vendor.preferred_vendor);

      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, vendorFilter, vendors]);

  const summaryCards = useMemo(() => {
    const preferredCount = vendors.filter(
      (vendor) => vendor.preferred_vendor
    ).length;
    const categoryCount = new Set(
      vendors
        .flatMap((vendor) => String(vendor.product_categories ?? "").split(","))
        .map((category) => category.trim())
        .filter(Boolean)
    ).size;

    return [
      {
        label: "Tracked Vendors",
        value: String(vendors.length),
        detail: "Supabase vendor records",
      },
      {
        label: "Preferred Vendors",
        value: String(preferredCount),
        detail: "Priority sources for blanks",
      },
      {
        label: "Product Categories",
        value: String(categoryCount),
        detail: "Categories covered by suppliers",
      },
    ];
  }, [vendors]);

  async function readVendors() {
    const { data, error } = await supabase
      .from("vendors")
      .select("*")
      .order("created_at", { ascending: false });

    return {
      data: (data ?? []) as Vendor[],
      error,
    };
  }

  async function loadVendors() {
    setIsLoading(true);
    setErrorMessage("");

    const { data, error } = await readVendors();

    if (error) {
      setVendors([]);
      setErrorMessage(error.message);
    } else {
      setVendors(data);
    }

    setIsLoading(false);
  }

  function toVendorPayload(state: VendorFormState): VendorPayload {
    return {
      vendor_name: state.vendor_name.trim(),
      website: state.website.trim() || null,
      contact_name: state.contact_name.trim() || null,
      email: state.email.trim() || null,
      phone: state.phone.trim() || null,
      product_categories: state.product_categories.trim() || null,
      notes: state.notes.trim() || null,
      preferred_vendor: state.preferred_vendor,
    };
  }

  function toFormState(vendor: Vendor): VendorFormState {
    return {
      vendor_name: vendor.vendor_name,
      website: vendor.website ?? "",
      contact_name: vendor.contact_name ?? "",
      email: vendor.email ?? "",
      phone: vendor.phone ?? "",
      product_categories: vendor.product_categories ?? "",
      notes: vendor.notes ?? "",
      preferred_vendor: vendor.preferred_vendor,
    };
  }

  useEffect(() => {
    let isMounted = true;

    readVendors().then(({ data, error }) => {
      if (!isMounted) {
        return;
      }

      if (error) {
        setVendors([]);
        setErrorMessage(error.message);
      } else {
        setVendors(data);
      }

      setIsLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  function updateFormField(name: VendorFieldName, value: string) {
    setFormState((current) => ({
      ...current,
      [name]: value,
    }));
    setSuccessMessage("");
    setErrorMessage("");
  }

  function resetForm() {
    setFormState(emptyFormState);
    setEditingVendorId(null);
  }

  function startEditing(vendor: Vendor) {
    setEditingVendorId(vendor.id);
    setFormState(toFormState(vendor));
    setSuccessMessage("");
    setErrorMessage("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setSuccessMessage("");
    setErrorMessage("");

    const payload = toVendorPayload(formState);

    if (editingVendorId) {
      const { data, error } = await supabase
        .from("vendors")
        .update(payload)
        .eq("id", editingVendorId)
        .select()
        .single();

      if (error) {
        setErrorMessage(error.message);
      } else {
        setVendors((current) =>
          current.map((vendor) =>
            vendor.id === editingVendorId ? ((data as Vendor) ?? vendor) : vendor
          )
        );
        setSuccessMessage("Vendor updated in Supabase.");
        resetForm();
      }

      setIsSaving(false);
      return;
    }

    const { data, error } = await supabase
      .from("vendors")
      .insert(payload)
      .select()
      .single();

    if (error) {
      setErrorMessage(error.message);
    } else {
      setVendors((current) => [(data as Vendor), ...current]);
      setSuccessMessage("Vendor added to Supabase.");
      resetForm();
    }

    setIsSaving(false);
  }

  async function deleteVendor(vendor: Vendor) {
    const confirmed = window.confirm(
      `Delete ${vendor.vendor_name}? This removes the vendor record from Supabase.`
    );

    if (!confirmed) {
      return;
    }

    setDeletingVendorId(vendor.id);
    setSuccessMessage("");
    setErrorMessage("");

    const { error } = await supabase.from("vendors").delete().eq("id", vendor.id);

    if (error) {
      setErrorMessage(error.message);
    } else {
      setVendors((current) =>
        current.filter((currentVendor) => currentVendor.id !== vendor.id)
      );

      if (editingVendorId === vendor.id) {
        resetForm();
      }

      setSuccessMessage("Vendor deleted from Supabase.");
    }

    setDeletingVendorId(null);
  }

  return (
    <AdminLayout activeHref="/admin/vendors">
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-blue-950/40 p-6 shadow-2xl md:p-8">
        <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-blue-400/10 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/70 to-transparent" />
        <div className="relative flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
              Gradeline Admin
            </p>
            <h1 className="mt-3 max-w-4xl text-4xl font-black tracking-tight text-white drop-shadow-[0_0_18px_rgba(96,165,250,0.18)] md:text-6xl">
              Vendors
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-300">
              Track suppliers for blank inventory, preferred sources,
              category coverage, contact details, and ordering notes.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={loadVendors}
              className="rounded-xl bg-blue-400 px-5 py-3 font-bold text-black transition hover:bg-blue-300"
            >
              Refresh Vendors
            </button>
            <Link
              href="/admin/inventory"
              className="inline-flex w-fit rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-bold text-white transition hover:border-blue-300/40 hover:bg-blue-400/10"
            >
              Back to Inventory
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
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

      <section className="mt-6 grid gap-6 xl:grid-cols-[420px_1fr]">
        <form
          onSubmit={handleSubmit}
          className={`${panelClassName} h-fit p-5 md:p-6`}
        >
          <div>
            <p className={labelClassName}>
              {editingVendorId ? "Edit Vendor" : "New Vendor"}
            </p>
            <h2 className="mt-2 text-2xl font-black text-white">
              Vendor Details
            </h2>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Add and update live records in the Supabase vendors table.
            </p>
          </div>

          <div className="mt-5 grid gap-4">
            {vendorFieldNames.map((field) => (
              <VendorField
                key={field.name}
                label={field.label}
                name={field.name}
                onChange={updateFormField}
                placeholder={field.placeholder}
                required={field.required}
                type={field.type}
                value={formState[field.name]}
              />
            ))}

            <label className="block">
              <span className={labelClassName}>Notes</span>
              <textarea
                className={`${inputClassName} min-h-28 resize-y`}
                name="notes"
                onChange={(event) => {
                  setFormState((current) => ({
                    ...current,
                    notes: event.target.value,
                  }));
                  setSuccessMessage("");
                  setErrorMessage("");
                }}
                placeholder="Ordering notes, lead times, minimum quantities, quality notes, or shipping details"
                value={formState.notes}
              />
            </label>

            <label className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-black/30 px-4 py-3">
              <span className="text-sm font-bold text-zinc-200">
                Preferred vendor
              </span>
              <input
                checked={formState.preferred_vendor}
                className="size-4 accent-blue-400"
                onChange={(event) => {
                  setFormState((current) => ({
                    ...current,
                    preferred_vendor: event.target.checked,
                  }));
                  setSuccessMessage("");
                  setErrorMessage("");
                }}
                type="checkbox"
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
                : editingVendorId
                  ? "Save Vendor"
                  : "Add Vendor"}
            </button>
            {editingVendorId && (
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
            <div className="grid gap-4 md:grid-cols-[1fr_220px]">
              <label className="block">
                <span className={labelClassName}>Search Vendors</span>
                <input
                  className={inputClassName}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search vendor, contact, categories, notes"
                  value={searchTerm}
                />
              </label>
              <label className="block">
                <span className={labelClassName}>Vendor Filter</span>
                <select
                  className={inputClassName}
                  onChange={(event) =>
                    setVendorFilter(event.target.value as VendorFilter)
                  }
                  value={vendorFilter}
                >
                  <option value="all">All vendors</option>
                  <option value="preferred">Preferred only</option>
                  <option value="standard">Standard only</option>
                </select>
              </label>
            </div>
            <p className="mt-4 text-sm text-zinc-500">
              Showing {filteredVendors.length} of {vendors.length} vendor
              records.
            </p>
          </section>

          <section className={`${panelClassName} overflow-hidden`}>
            <div className="flex flex-col gap-2 border-b border-white/10 px-5 py-5 md:px-6">
              <p className={labelClassName}>Vendor List</p>
              <h2 className="text-2xl font-black text-white">
                Supplier Directory
              </h2>
            </div>

            <div className="hidden overflow-x-auto xl:block">
              <table className="w-full border-collapse text-left">
                <thead className="border-b border-white/10 bg-black/30 text-xs font-bold uppercase tracking-widest text-blue-300">
                  <tr>
                    <th className="px-5 py-4">Vendor</th>
                    <th className="px-5 py-4">Contact</th>
                    <th className="px-5 py-4">Categories</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4">Notes</th>
                    <th className="px-5 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {isLoading && (
                    <tr>
                      <td className="px-5 py-6 text-zinc-400" colSpan={6}>
                        Loading vendors from Supabase...
                      </td>
                    </tr>
                  )}

                  {!isLoading &&
                    filteredVendors.map((vendor) => (
                      <tr
                        key={vendor.id}
                        className="bg-white/[0.02] transition hover:bg-white/[0.06]"
                      >
                        <td className="px-5 py-4">
                          <p className="font-black text-white">
                            {vendor.vendor_name}
                          </p>
                          <p className="mt-1 text-sm text-blue-200">
                            {displayValue(vendor.website)}
                          </p>
                        </td>
                        <td className="px-5 py-4 text-zinc-300">
                          <p>{displayValue(vendor.contact_name)}</p>
                          <p className="mt-1 text-sm text-zinc-500">
                            {displayValue(vendor.email)}
                          </p>
                          <p className="mt-1 text-sm text-zinc-500">
                            {displayValue(vendor.phone)}
                          </p>
                        </td>
                        <td className="px-5 py-4 text-zinc-300">
                          {displayValue(vendor.product_categories)}
                        </td>
                        <td className="px-5 py-4">
                          <PreferredBadge preferred={vendor.preferred_vendor} />
                        </td>
                        <td className="max-w-sm px-5 py-4 text-sm leading-6 text-zinc-400">
                          {displayValue(vendor.notes)}
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => startEditing(vendor)}
                              className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-bold text-white transition hover:border-blue-300/40 hover:bg-blue-400/10"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              disabled={deletingVendorId === vendor.id}
                              onClick={() => deleteVendor(vendor)}
                              className="rounded-lg border border-red-300/30 bg-red-500/10 px-4 py-2 text-sm font-bold text-red-100 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              {deletingVendorId === vendor.id
                                ? "Deleting"
                                : "Delete"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}

                  {!isLoading && filteredVendors.length === 0 && (
                    <tr>
                      <td className="px-5 py-6 text-zinc-400" colSpan={6}>
                        No vendors match the current filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="grid gap-4 p-4 xl:hidden">
              {isLoading && (
                <p className="rounded-2xl border border-white/10 bg-black/30 p-5 text-zinc-400">
                  Loading vendors from Supabase...
                </p>
              )}

              {!isLoading &&
                filteredVendors.map((vendor) => (
                  <article
                    key={vendor.id}
                    className="rounded-2xl border border-white/10 bg-black/30 p-5"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className={labelClassName}>
                          {displayValue(vendor.product_categories)}
                        </p>
                        <h3 className="mt-2 text-xl font-black text-white">
                          {vendor.vendor_name}
                        </h3>
                        <p className="mt-2 text-blue-200">
                          {displayValue(vendor.website)}
                        </p>
                      </div>
                      <PreferredBadge preferred={vendor.preferred_vendor} />
                    </div>

                    <div className="mt-5 grid gap-3 text-sm text-zinc-300 sm:grid-cols-2">
                      <p>
                        <span className="font-bold text-zinc-500">
                          Contact:{" "}
                        </span>
                        {displayValue(vendor.contact_name)}
                      </p>
                      <p>
                        <span className="font-bold text-zinc-500">
                          Email:{" "}
                        </span>
                        {displayValue(vendor.email)}
                      </p>
                      <p>
                        <span className="font-bold text-zinc-500">
                          Phone:{" "}
                        </span>
                        {displayValue(vendor.phone)}
                      </p>
                      <p>
                        <span className="font-bold text-zinc-500">
                          Notes:{" "}
                        </span>
                        {displayValue(vendor.notes)}
                      </p>
                    </div>

                    <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                      <button
                        type="button"
                        onClick={() => startEditing(vendor)}
                        className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-bold text-white transition hover:border-blue-300/40 hover:bg-blue-400/10"
                      >
                        Edit Vendor
                      </button>
                      <button
                        type="button"
                        disabled={deletingVendorId === vendor.id}
                        onClick={() => deleteVendor(vendor)}
                        className="rounded-lg border border-red-300/30 bg-red-500/10 px-4 py-2 text-sm font-bold text-red-100 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {deletingVendorId === vendor.id
                          ? "Deleting"
                          : "Delete Vendor"}
                      </button>
                    </div>
                  </article>
                ))}

              {!isLoading && filteredVendors.length === 0 && (
                <p className="rounded-2xl border border-white/10 bg-black/30 p-5 text-zinc-400">
                  No vendors match the current filters.
                </p>
              )}
            </div>
          </section>
        </div>
      </section>
    </AdminLayout>
  );
}

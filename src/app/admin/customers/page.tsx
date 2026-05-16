"use client";

import { type FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import AdminLayout from "@/components/AdminLayout";
import { supabase } from "@/lib/supabase";

type Customer = {
  id?: string | number;
  name: string | null;
  email: string | null;
  phone: string | null;
  company: string | null;
  notes: string | null;
  created_at?: string | null;
};

type CustomerFormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  notes: string;
};

const initialFormState: CustomerFormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  notes: "",
};

const inputClassName =
  "mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-blue-300/60 focus:bg-black/45";

const labelClassName =
  "text-xs font-bold uppercase tracking-widest text-blue-300";

function CustomerField({
  label,
  name,
  onChange,
  placeholder,
  required = false,
  type = "text",
  value,
}: {
  label: string;
  name: keyof CustomerFormState;
  onChange: (name: keyof CustomerFormState, value: string) => void;
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

function displayValue(value: string | number | null | undefined) {
  return value === null || value === undefined || value === "" ? "-" : value;
}

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [formState, setFormState] =
    useState<CustomerFormState>(initialFormState);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function readCustomers() {
    const { data, error } = await supabase.from("customers").select("*");
    return { data: (data ?? []) as Customer[], error };
  }

  async function loadCustomers() {
    setIsLoading(true);
    setErrorMessage("");

    const { data, error } = await readCustomers();

    if (error) {
      setErrorMessage(error.message);
      setCustomers([]);
    } else {
      setCustomers(data);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    let isMounted = true;

    readCustomers().then(({ data, error }) => {
      if (!isMounted) {
        return;
      }

      if (error) {
        setErrorMessage(error.message);
        setCustomers([]);
      } else {
        setCustomers(data);
      }

      setIsLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  function updateFormField(name: keyof CustomerFormState, value: string) {
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
      name: formState.name.trim(),
      email: formState.email.trim(),
      phone: formState.phone.trim(),
      company: formState.company.trim(),
      notes: formState.notes.trim(),
    };

    const { error } = await supabase.from("customers").insert(payload);

    if (error) {
      setErrorMessage(error.message);
      setIsSaving(false);
      return;
    }

    setSuccessMessage("Customer saved successfully.");
    setFormState(initialFormState);
    await loadCustomers();
    setIsSaving(false);
  }

  return (
    <AdminLayout activeHref="/admin/customers">
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-blue-950/40 p-6 shadow-2xl md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
              Gradeline Admin
            </p>
            <h1 className="mt-3 text-4xl font-black md:text-6xl">
              Customers
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-300">
              Add customer records to Supabase and review the current customer
              list from the live table.
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
            <p className={labelClassName}>New Customer</p>
            <h2 className="mt-2 text-3xl font-black">Customer Details</h2>
          </div>
          <p className="text-sm text-zinc-400">
            Required fields: name and email.
          </p>
        </div>

        <form className="mt-6 grid gap-5" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <CustomerField
              label="Name"
              name="name"
              onChange={updateFormField}
              placeholder="Customer name"
              required
              value={formState.name}
            />
            <CustomerField
              label="Email"
              name="email"
              onChange={updateFormField}
              placeholder="customer@example.com"
              required
              type="email"
              value={formState.email}
            />
            <CustomerField
              label="Phone"
              name="phone"
              onChange={updateFormField}
              placeholder="(555) 000-0000"
              value={formState.phone}
            />
            <CustomerField
              label="Company"
              name="company"
              onChange={updateFormField}
              placeholder="Business, shop, crew, or organization"
              value={formState.company}
            />
          </div>

          <label className="block">
            <span className={labelClassName}>Notes</span>
            <textarea
              className={`${inputClassName} min-h-32 resize-y`}
              name="notes"
              onChange={(event) => updateFormField("notes", event.target.value)}
              placeholder="Project notes, preferences, customer details, or follow-up reminders"
              value={formState.notes}
            />
          </label>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="submit"
              className="rounded-xl bg-blue-400 px-6 py-3 font-bold text-black transition hover:bg-blue-300 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save Customer"}
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
            <p className={labelClassName}>Supabase Customers</p>
            <h2 className="mt-2 text-2xl font-black">
              Customer List ({customers.length})
            </h2>
          </div>
          <button
            type="button"
            onClick={loadCustomers}
            className="w-fit rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-bold text-white transition hover:border-blue-300/40 hover:bg-blue-400/10"
          >
            Refresh List
          </button>
        </div>

        {isLoading && (
          <div className="p-5 text-zinc-300">Loading customers...</div>
        )}

        {!isLoading && customers.length === 0 && (
          <div className="p-5 text-zinc-300">No customers found yet.</div>
        )}

        {!isLoading && customers.length > 0 && (
          <>
            <div className="hidden overflow-x-auto xl:block">
              <table className="w-full border-collapse text-left">
                <thead className="border-b border-white/10 bg-black/30 text-xs font-bold uppercase tracking-widest text-blue-300">
                  <tr>
                    <th className="px-5 py-4">Name</th>
                    <th className="px-5 py-4">Email</th>
                    <th className="px-5 py-4">Phone</th>
                    <th className="px-5 py-4">Company</th>
                    <th className="px-5 py-4">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {customers.map((customer, index) => (
                    <tr
                      key={customer.id ?? `${customer.email}-${index}`}
                      className="bg-white/[0.02] transition hover:bg-white/[0.06]"
                    >
                      <td className="px-5 py-4 font-black text-white">
                        {displayValue(customer.name)}
                      </td>
                      <td className="px-5 py-4 text-zinc-300">
                        {displayValue(customer.email)}
                      </td>
                      <td className="px-5 py-4 text-zinc-300">
                        {displayValue(customer.phone)}
                      </td>
                      <td className="px-5 py-4 text-zinc-300">
                        {displayValue(customer.company)}
                      </td>
                      <td className="max-w-md px-5 py-4 text-zinc-400">
                        {displayValue(customer.notes)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid gap-4 p-4 xl:hidden">
              {customers.map((customer, index) => (
                <article
                  key={customer.id ?? `${customer.email}-${index}`}
                  className="rounded-2xl border border-white/10 bg-black/30 p-5"
                >
                  <h3 className="text-xl font-black text-white">
                    {displayValue(customer.name)}
                  </h3>
                  <div className="mt-4 grid gap-3 text-sm text-zinc-300">
                    <p>
                      <span className="font-bold text-zinc-500">Email: </span>
                      {displayValue(customer.email)}
                    </p>
                    <p>
                      <span className="font-bold text-zinc-500">Phone: </span>
                      {displayValue(customer.phone)}
                    </p>
                    <p>
                      <span className="font-bold text-zinc-500">
                        Company:{" "}
                      </span>
                      {displayValue(customer.company)}
                    </p>
                    <p>
                      <span className="font-bold text-zinc-500">Notes: </span>
                      {displayValue(customer.notes)}
                    </p>
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

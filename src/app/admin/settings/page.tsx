"use client";

import { useState } from "react";
import Link from "next/link";
import AdminLayout from "@/components/AdminLayout";

type Status = "Connected" | "Active" | "Pending";

type SettingsState = {
  businessName: string;
  businessEmail: string;
  businessPhone: string;
  website: string;
  serviceArea: string;
  taxRate: string;
  taxRegion: string;
  taxId: string;
  collectTax: boolean;
  defaultOrderStatus: string;
  defaultPriority: string;
  defaultDueDays: string;
  requireDeposit: boolean;
  defaultProductionStep: string;
  leadTimeDays: string;
  requireQualityCheck: boolean;
  productionNotes: string;
  primaryMachine: string;
  defaultOperation: string;
  defaultAirAssist: string;
  focusNotes: string;
  brandName: string;
  tagline: string;
  accentColor: string;
  logoStatus: string;
};

type TextSettingKey = {
  [Key in keyof SettingsState]: SettingsState[Key] extends string ? Key : never;
}[keyof SettingsState];

type BooleanSettingKey = {
  [Key in keyof SettingsState]: SettingsState[Key] extends boolean
    ? Key
    : never;
}[keyof SettingsState];

const initialSettings: SettingsState = {
  businessName: "Gradeline Supply Co.",
  businessEmail: "orders@gradelinesupply.com",
  businessPhone: "(555) 000-0000",
  website: "gradelinesupply.com",
  serviceArea: "Local shop pickup, regional delivery, and shipped custom work",
  taxRate: "6.25",
  taxRegion: "Default local sales tax",
  taxId: "Pending",
  collectTax: true,
  defaultOrderStatus: "New",
  defaultPriority: "Standard",
  defaultDueDays: "14",
  requireDeposit: false,
  defaultProductionStep: "Design Approval",
  leadTimeDays: "10",
  requireQualityCheck: true,
  productionNotes: "Confirm material, file readiness, and packaging before completion.",
  primaryMachine: "CO2 Laser",
  defaultOperation: "Engrave",
  defaultAirAssist: "Medium",
  focusNotes: "Verify material thickness and jig position before each run.",
  brandName: "Gradeline Supply Co.",
  tagline: "Built To Be Different.",
  accentColor: "Steel Blue",
  logoStatus: "Temporary logo connected",
};

const statusClassNames: Record<Status, string> = {
  Connected:
    "border-blue-300/40 bg-blue-400/10 text-blue-100 shadow-[0_0_18px_rgba(96,165,250,0.16)]",
  Active: "border-emerald-300/40 bg-emerald-400/10 text-emerald-100",
  Pending: "border-amber-300/40 bg-amber-400/10 text-amber-100",
};

const cardClassName =
  "relative overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(145deg,rgba(24,31,38,0.82),rgba(7,9,12,0.97))] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.3)] md:p-6";

const labelClassName =
  "text-xs font-bold uppercase tracking-widest text-blue-300";

const inputClassName =
  "mt-2 w-full rounded-xl border border-white/10 bg-black/35 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-blue-300/60 focus:bg-black/50";

function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-widest ${statusClassNames[status]}`}
    >
      {status}
    </span>
  );
}

function TextField({
  label,
  name,
  onChange,
  type = "text",
  value,
}: {
  label: string;
  name: TextSettingKey;
  onChange: (name: TextSettingKey, value: string) => void;
  type?: string;
  value: string;
}) {
  return (
    <label className="block" suppressHydrationWarning>
      <span className={labelClassName}>{label}</span>
      <input
        className={inputClassName}
        name={name}
        suppressHydrationWarning
        type={type}
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  onChange,
  options,
  value,
}: {
  label: string;
  name: TextSettingKey;
  onChange: (name: TextSettingKey, value: string) => void;
  options: string[];
  value: string;
}) {
  return (
    <label className="block" suppressHydrationWarning>
      <span className={labelClassName}>{label}</span>
      <select
        className={inputClassName}
        name={name}
        suppressHydrationWarning
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextAreaField({
  label,
  name,
  onChange,
  value,
}: {
  label: string;
  name: TextSettingKey;
  onChange: (name: TextSettingKey, value: string) => void;
  value: string;
}) {
  return (
    <label className="block" suppressHydrationWarning>
      <span className={labelClassName}>{label}</span>
      <textarea
        className={`${inputClassName} min-h-28 resize-y`}
        name={name}
        suppressHydrationWarning
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
      />
    </label>
  );
}

function ToggleField({
  checked,
  label,
  name,
  onChange,
}: {
  checked: boolean;
  label: string;
  name: BooleanSettingKey;
  onChange: (name: BooleanSettingKey, value: boolean) => void;
}) {
  return (
    <label
      className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-black/30 px-4 py-3"
      suppressHydrationWarning
    >
      <span className="text-sm font-bold text-zinc-200">{label}</span>
      <input
        className="h-5 w-5 accent-blue-300"
        name={name}
        suppressHydrationWarning
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(name, event.target.checked)}
      />
    </label>
  );
}

function SettingsCard({
  children,
  description,
  isSaved,
  onSave,
  status,
  title,
}: {
  children: React.ReactNode;
  description: string;
  isSaved: boolean;
  onSave: () => void;
  status: Status;
  title: string;
}) {
  return (
    <section className={cardClassName} suppressHydrationWarning>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/60 to-transparent" />
      <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-blue-400/10 blur-3xl" />

      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-2xl font-black text-white">{title}</h2>
          <p className="mt-2 max-w-2xl leading-7 text-zinc-400">
            {description}
          </p>
        </div>
        <StatusBadge status={status} />
      </div>

      <div className="relative mt-5 grid gap-4" suppressHydrationWarning>
        {children}
      </div>

      <div className="relative mt-6 flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-zinc-500">
          Future Supabase persistence hook ready for this settings group.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {isSaved && (
            <span className="text-sm font-semibold text-blue-200">
              Settings saved locally.
            </span>
          )}
          <button
            type="button"
            suppressHydrationWarning
            onClick={onSave}
            className="rounded-xl bg-blue-400 px-5 py-3 text-sm font-black uppercase tracking-widest text-black transition hover:bg-blue-300"
          >
            Save Section
          </button>
        </div>
      </div>
    </section>
  );
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState(initialSettings);
  const [savedSection, setSavedSection] = useState("");

  function updateTextSetting(name: TextSettingKey, value: string) {
    setSettings((current) => ({ ...current, [name]: value }));
    setSavedSection("");
  }

  function updateBooleanSetting(name: BooleanSettingKey, value: boolean) {
    setSettings((current) => ({ ...current, [name]: value }));
    setSavedSection("");
  }

  function saveSection(section: string) {
    setSavedSection(section);
  }

  return (
    <AdminLayout activeHref="/admin/settings">
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-blue-950/40 p-6 shadow-2xl md:p-8">
        <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-blue-400/10 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/70 to-transparent" />
        <div className="relative flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
              Gradeline Admin
            </p>
            <h1 className="mt-3 max-w-4xl text-4xl font-black tracking-tight text-white drop-shadow-[0_0_18px_rgba(96,165,250,0.18)] md:text-6xl">
              Settings
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-300">
              Configure shop identity, tax rules, order defaults, production
              behavior, laser defaults, and brand settings for future
              persistence.
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

      <div className="mt-6 grid gap-5 xl:grid-cols-2">
        <SettingsCard
          title="Business Information"
          description="Primary public-facing details for quotes, invoices, and customer communication."
          status="Connected"
          isSaved={savedSection === "Business Information"}
          onSave={() => saveSection("Business Information")}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <TextField
              label="Business Name"
              name="businessName"
              value={settings.businessName}
              onChange={updateTextSetting}
            />
            <TextField
              label="Business Email"
              name="businessEmail"
              type="email"
              value={settings.businessEmail}
              onChange={updateTextSetting}
            />
            <TextField
              label="Business Phone"
              name="businessPhone"
              value={settings.businessPhone}
              onChange={updateTextSetting}
            />
            <TextField
              label="Website"
              name="website"
              value={settings.website}
              onChange={updateTextSetting}
            />
          </div>
          <TextAreaField
            label="Service Area"
            name="serviceArea"
            value={settings.serviceArea}
            onChange={updateTextSetting}
          />
        </SettingsCard>

        <SettingsCard
          title="Tax Settings"
          description="Demo tax defaults that can later connect to order totals and invoice calculations."
          status="Pending"
          isSaved={savedSection === "Tax Settings"}
          onSave={() => saveSection("Tax Settings")}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <TextField
              label="Default Tax Rate %"
              name="taxRate"
              type="number"
              value={settings.taxRate}
              onChange={updateTextSetting}
            />
            <TextField
              label="Tax Region"
              name="taxRegion"
              value={settings.taxRegion}
              onChange={updateTextSetting}
            />
            <TextField
              label="Tax ID"
              name="taxId"
              value={settings.taxId}
              onChange={updateTextSetting}
            />
            <ToggleField
              label="Collect tax on eligible orders"
              name="collectTax"
              checked={settings.collectTax}
              onChange={updateBooleanSetting}
            />
          </div>
        </SettingsCard>

        <SettingsCard
          title="Order Defaults"
          description="Standard intake behavior for custom orders, stock sales, deposits, and due dates."
          status="Active"
          isSaved={savedSection === "Order Defaults"}
          onSave={() => saveSection("Order Defaults")}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <SelectField
              label="Default Order Status"
              name="defaultOrderStatus"
              value={settings.defaultOrderStatus}
              onChange={updateTextSetting}
              options={["New", "Pending Design", "Approved", "In Production"]}
            />
            <SelectField
              label="Default Priority"
              name="defaultPriority"
              value={settings.defaultPriority}
              onChange={updateTextSetting}
              options={["Standard", "Rush", "Event Deadline", "Hold"]}
            />
            <TextField
              label="Default Due Days"
              name="defaultDueDays"
              type="number"
              value={settings.defaultDueDays}
              onChange={updateTextSetting}
            />
            <ToggleField
              label="Require deposit before production"
              name="requireDeposit"
              checked={settings.requireDeposit}
              onChange={updateBooleanSetting}
            />
          </div>
        </SettingsCard>

        <SettingsCard
          title="Production Defaults"
          description="Baseline workflow and quality-control defaults for the shop floor."
          status="Active"
          isSaved={savedSection === "Production Defaults"}
          onSave={() => saveSection("Production Defaults")}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <SelectField
              label="Default Production Step"
              name="defaultProductionStep"
              value={settings.defaultProductionStep}
              onChange={updateTextSetting}
              options={[
                "Design Approval",
                "File Ready",
                "Material Pulled",
                "Laser Setup",
                "In Production",
                "Finish / Pack",
              ]}
            />
            <TextField
              label="Lead Time Days"
              name="leadTimeDays"
              type="number"
              value={settings.leadTimeDays}
              onChange={updateTextSetting}
            />
            <ToggleField
              label="Require final quality check"
              name="requireQualityCheck"
              checked={settings.requireQualityCheck}
              onChange={updateBooleanSetting}
            />
          </div>
          <TextAreaField
            label="Production Notes"
            name="productionNotes"
            value={settings.productionNotes}
            onChange={updateTextSetting}
          />
        </SettingsCard>

        <SettingsCard
          title="Laser Defaults"
          description="Reusable defaults for machine setup, air assist, focus checks, and common operations."
          status="Active"
          isSaved={savedSection === "Laser Defaults"}
          onSave={() => saveSection("Laser Defaults")}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <SelectField
              label="Primary Machine"
              name="primaryMachine"
              value={settings.primaryMachine}
              onChange={updateTextSetting}
              options={["CO2 Laser", "Fiber Laser", "Diode Laser", "Rotary Station"]}
            />
            <SelectField
              label="Default Operation"
              name="defaultOperation"
              value={settings.defaultOperation}
              onChange={updateTextSetting}
              options={["Engrave", "Cut", "Score", "Mark"]}
            />
            <SelectField
              label="Default Air Assist"
              name="defaultAirAssist"
              value={settings.defaultAirAssist}
              onChange={updateTextSetting}
              options={["Off", "Low", "Medium", "High"]}
            />
          </div>
          <TextAreaField
            label="Default Focus Notes"
            name="focusNotes"
            value={settings.focusNotes}
            onChange={updateTextSetting}
          />
        </SettingsCard>

        <SettingsCard
          title="Branding"
          description="Temporary brand controls for public presentation, admin labels, and future upload settings."
          status="Connected"
          isSaved={savedSection === "Branding"}
          onSave={() => saveSection("Branding")}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <TextField
              label="Brand Name"
              name="brandName"
              value={settings.brandName}
              onChange={updateTextSetting}
            />
            <TextField
              label="Tagline"
              name="tagline"
              value={settings.tagline}
              onChange={updateTextSetting}
            />
            <SelectField
              label="Accent Color"
              name="accentColor"
              value={settings.accentColor}
              onChange={updateTextSetting}
              options={["Steel Blue", "Graphite", "Cool White", "Shop Amber"]}
            />
            <TextField
              label="Logo Status"
              name="logoStatus"
              value={settings.logoStatus}
              onChange={updateTextSetting}
            />
          </div>
        </SettingsCard>
      </div>
    </AdminLayout>
  );
}

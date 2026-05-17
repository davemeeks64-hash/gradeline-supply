"use client";

import { type FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import AdminLayout from "@/components/AdminLayout";

type LaserSetting = {
  id: string;
  material: string;
  machine: string;
  operationType: string;
  power: string;
  speed: string;
  passes: string;
  airAssist: string;
  notes: string;
};

type LaserSettingFormState = Omit<LaserSetting, "id">;

const initialSettings: LaserSetting[] = [
  {
    id: "veg-tan-leather-engrave",
    material: "Veg tan leather",
    machine: "CO2 100W",
    operationType: "Engrave",
    power: "18%",
    speed: "420 mm/s",
    passes: "1",
    airAssist: "Low",
    notes: "Mask light leather and test edge darkening before batch runs.",
  },
  {
    id: "slate-engrave",
    material: "Slate",
    machine: "CO2 100W",
    operationType: "Engrave",
    power: "42%",
    speed: "320 mm/s",
    passes: "1",
    airAssist: "Off",
    notes: "Defocus slightly for smoother mark and wipe dust after engraving.",
  },
  {
    id: "acrylic-cut",
    material: "Acrylic",
    machine: "CO2 100W",
    operationType: "Cut",
    power: "72%",
    speed: "18 mm/s",
    passes: "1",
    airAssist: "Medium",
    notes: "Use masking on face and confirm flame polish on test corner.",
  },
  {
    id: "walnut-plywood-engrave",
    material: "Walnut plywood",
    machine: "Diode 20W",
    operationType: "Engrave",
    power: "78%",
    speed: "2600 mm/min",
    passes: "1",
    airAssist: "High",
    notes: "Run grain direction test; seal after engraving for richer contrast.",
  },
];

const initialFormState: LaserSettingFormState = {
  material: "",
  machine: "",
  operationType: "Engrave",
  power: "",
  speed: "",
  passes: "1",
  airAssist: "Medium",
  notes: "",
};

const operationTypes = ["Engrave", "Cut", "Score", "Mark", "Rotary"];
const airAssistOptions = ["Off", "Low", "Medium", "High"];

const inputClassName =
  "mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-blue-300/60 focus:bg-black/45";

const labelClassName =
  "text-xs font-bold uppercase tracking-widest text-blue-300";

function createSettingId(setting: LaserSettingFormState) {
  return `${setting.material}-${setting.machine}-${setting.operationType}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function SettingBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex w-fit rounded-full border border-blue-300/50 bg-blue-400/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-blue-200">
      {label}
    </span>
  );
}

function SettingField({
  label,
  name,
  onChange,
  placeholder,
  required = false,
  value,
}: {
  label: string;
  name: keyof LaserSettingFormState;
  onChange: (name: keyof LaserSettingFormState, value: string) => void;
  placeholder: string;
  required?: boolean;
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
        suppressHydrationWarning
        value={value}
      />
    </label>
  );
}

export default function AdminLaserSettingsPage() {
  const [settings, setSettings] = useState<LaserSetting[]>(initialSettings);
  const [formState, setFormState] =
    useState<LaserSettingFormState>(initialFormState);
  const [editingSettingId, setEditingSettingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [machineFilter, setMachineFilter] = useState("all");
  const [operationFilter, setOperationFilter] = useState("all");
  const [successMessage, setSuccessMessage] = useState("");

  const machines = useMemo(() => {
    return Array.from(new Set(settings.map((setting) => setting.machine))).sort();
  }, [settings]);

  const filteredSettings = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return settings.filter((setting) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        [
          setting.material,
          setting.machine,
          setting.operationType,
          setting.power,
          setting.speed,
          setting.airAssist,
          setting.notes,
        ].some((value) => value.toLowerCase().includes(normalizedSearch));

      const matchesMachine =
        machineFilter === "all" || setting.machine === machineFilter;
      const matchesOperation =
        operationFilter === "all" ||
        setting.operationType === operationFilter;

      return matchesSearch && matchesMachine && matchesOperation;
    });
  }, [machineFilter, operationFilter, searchTerm, settings]);

  function updateFormField(name: keyof LaserSettingFormState, value: string) {
    setFormState((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function resetForm() {
    setFormState(initialFormState);
    setEditingSettingId(null);
    setSuccessMessage("");
  }

  function editSetting(setting: LaserSetting) {
    setEditingSettingId(setting.id);
    setFormState({
      material: setting.material,
      machine: setting.machine,
      operationType: setting.operationType,
      power: setting.power,
      speed: setting.speed,
      passes: setting.passes,
      airAssist: setting.airAssist,
      notes: setting.notes,
    });
    setSuccessMessage("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextSetting: LaserSetting = {
      id: editingSettingId ?? createSettingId(formState),
      ...formState,
    };

    setSettings((currentSettings) => {
      if (editingSettingId) {
        return currentSettings.map((setting) =>
          setting.id === editingSettingId ? nextSetting : setting
        );
      }

      return [nextSetting, ...currentSettings];
    });

    setSuccessMessage(
      editingSettingId
        ? "Laser setting updated locally."
        : "Laser setting added locally."
    );
    setFormState(initialFormState);
    setEditingSettingId(null);
  }

  return (
    <AdminLayout activeHref="/admin/laser-settings">
      <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-blue-950/40 p-6 shadow-2xl md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
              Gradeline Admin
            </p>
            <h1 className="mt-3 text-4xl font-black md:text-6xl">
              Laser Settings
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-300">
              Manage reusable laser settings for materials, machines, and
              operation types. This local interface is structured for future
              Supabase persistence.
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
              {editingSettingId ? "Edit Setting" : "New Setting"}
            </p>
            <h2 className="mt-2 text-3xl font-black">Setting Details</h2>
          </div>
          <p className="text-sm text-zinc-400">
            Local state now. Supabase table-ready shape later.
          </p>
        </div>

        <form
          className="mt-6 grid gap-5"
          onSubmit={handleSubmit}
          suppressHydrationWarning
        >
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <SettingField
              label="Material"
              name="material"
              onChange={updateFormField}
              placeholder="Slate, walnut, acrylic"
              required
              value={formState.material}
            />
            <SettingField
              label="Machine"
              name="machine"
              onChange={updateFormField}
              placeholder="CO2 100W"
              required
              value={formState.machine}
            />
            <label className="block">
              <span className={labelClassName}>Operation Type</span>
              <select
                className={inputClassName}
                onChange={(event) =>
                  updateFormField("operationType", event.target.value)
                }
                suppressHydrationWarning
                value={formState.operationType}
              >
                {operationTypes.map((operation) => (
                  <option key={operation}>{operation}</option>
                ))}
              </select>
            </label>
            <SettingField
              label="Power"
              name="power"
              onChange={updateFormField}
              placeholder="42%"
              required
              value={formState.power}
            />
            <SettingField
              label="Speed"
              name="speed"
              onChange={updateFormField}
              placeholder="320 mm/s"
              required
              value={formState.speed}
            />
            <SettingField
              label="Passes"
              name="passes"
              onChange={updateFormField}
              placeholder="1"
              required
              value={formState.passes}
            />
            <label className="block">
              <span className={labelClassName}>Air Assist</span>
              <select
                className={inputClassName}
                onChange={(event) =>
                  updateFormField("airAssist", event.target.value)
                }
                suppressHydrationWarning
                value={formState.airAssist}
              >
                {airAssistOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
          </div>

          <label className="block">
            <span className={labelClassName}>Notes</span>
            <textarea
              className={`${inputClassName} min-h-32 resize-y`}
              onChange={(event) => updateFormField("notes", event.target.value)}
              placeholder="Material prep, masking, focus, cleanup, testing notes, or best-use guidance"
              suppressHydrationWarning
              value={formState.notes}
            />
          </label>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="submit"
              className="rounded-xl bg-blue-400 px-6 py-3 font-bold text-black transition hover:bg-blue-300"
            >
              {editingSettingId ? "Update Setting" : "Add Setting"}
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
        </form>
      </section>

      <section className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-[0_18px_45px_rgba(0,0,0,0.28)]">
        <div className="border-b border-white/10 bg-black/30 p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className={labelClassName}>Settings Library</p>
              <h2 className="mt-2 text-2xl font-black">
                Saved Settings ({filteredSettings.length})
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {operationTypes.slice(0, 4).map((operation) => (
                <SettingBadge key={operation} label={operation} />
              ))}
            </div>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-[minmax(0,1fr)_220px_220px]">
            <label className="block">
              <span className={labelClassName}>Search</span>
              <input
                className={inputClassName}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search material, machine, operation, notes"
                suppressHydrationWarning
                value={searchTerm}
              />
            </label>

            <label className="block">
              <span className={labelClassName}>Machine Filter</span>
              <select
                className={inputClassName}
                onChange={(event) => setMachineFilter(event.target.value)}
                suppressHydrationWarning
                value={machineFilter}
              >
                <option value="all">All Machines</option>
                {machines.map((machine) => (
                  <option key={machine} value={machine}>
                    {machine}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className={labelClassName}>Operation Filter</span>
              <select
                className={inputClassName}
                onChange={(event) => setOperationFilter(event.target.value)}
                suppressHydrationWarning
                value={operationFilter}
              >
                <option value="all">All Operations</option>
                {operationTypes.map((operation) => (
                  <option key={operation} value={operation}>
                    {operation}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {filteredSettings.length === 0 ? (
          <div className="p-5 text-zinc-300">No laser settings found.</div>
        ) : (
          <>
            <div className="hidden overflow-x-auto xl:block">
              <table className="w-full border-collapse text-left">
                <thead className="border-b border-white/10 bg-black/30 text-xs font-bold uppercase tracking-widest text-blue-300">
                  <tr>
                    <th className="px-5 py-4">Material</th>
                    <th className="px-5 py-4">Machine</th>
                    <th className="px-5 py-4">Operation</th>
                    <th className="px-5 py-4">Power</th>
                    <th className="px-5 py-4">Speed</th>
                    <th className="px-5 py-4">Passes</th>
                    <th className="px-5 py-4">Air</th>
                    <th className="px-5 py-4">Notes</th>
                    <th className="px-5 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {filteredSettings.map((setting) => (
                    <tr
                      key={setting.id}
                      className="bg-white/[0.02] transition hover:bg-white/[0.06]"
                    >
                      <td className="px-5 py-4 font-black text-white">
                        {setting.material}
                      </td>
                      <td className="px-5 py-4 text-zinc-300">
                        {setting.machine}
                      </td>
                      <td className="px-5 py-4">
                        <SettingBadge label={setting.operationType} />
                      </td>
                      <td className="px-5 py-4 font-black text-white">
                        {setting.power}
                      </td>
                      <td className="px-5 py-4 text-zinc-300">
                        {setting.speed}
                      </td>
                      <td className="px-5 py-4 text-zinc-300">
                        {setting.passes}
                      </td>
                      <td className="px-5 py-4 text-zinc-300">
                        {setting.airAssist}
                      </td>
                      <td className="max-w-md px-5 py-4 text-zinc-400">
                        {setting.notes}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button
                          type="button"
                          className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-bold text-white transition hover:border-blue-300/40 hover:bg-blue-400/10"
                          onClick={() => editSetting(setting)}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid gap-4 p-4 xl:hidden">
              {filteredSettings.map((setting) => (
                <article
                  key={setting.id}
                  className="rounded-2xl border border-white/10 bg-black/30 p-5"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <SettingBadge label={setting.operationType} />
                      <h3 className="mt-3 text-2xl font-black text-white">
                        {setting.material}
                      </h3>
                      <p className="mt-2 text-zinc-300">{setting.machine}</p>
                    </div>
                    <button
                      type="button"
                      className="w-fit rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-bold text-white transition hover:border-blue-300/40 hover:bg-blue-400/10"
                      onClick={() => editSetting(setting)}
                    >
                      Edit
                    </button>
                  </div>

                  <div className="mt-5 grid gap-3 text-sm text-zinc-300 sm:grid-cols-2">
                    <p>
                      <span className="font-bold text-zinc-500">Power: </span>
                      {setting.power}
                    </p>
                    <p>
                      <span className="font-bold text-zinc-500">Speed: </span>
                      {setting.speed}
                    </p>
                    <p>
                      <span className="font-bold text-zinc-500">Passes: </span>
                      {setting.passes}
                    </p>
                    <p>
                      <span className="font-bold text-zinc-500">
                        Air Assist:{" "}
                      </span>
                      {setting.airAssist}
                    </p>
                    <p className="sm:col-span-2">
                      <span className="font-bold text-zinc-500">Notes: </span>
                      {setting.notes}
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

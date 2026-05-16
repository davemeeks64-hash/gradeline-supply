import Link from "next/link";
import AdminPageShell from "@/components/AdminPageShell";

const sectionClassName =
  "rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.28)] md:p-6";

const labelClassName =
  "text-xs font-bold uppercase tracking-widest text-blue-300";

const inputClassName =
  "mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-blue-300/60 focus:bg-black/45";

function TextField({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className={labelClassName}>{label}</span>
      <input className={inputClassName} type={type} placeholder={placeholder} />
    </label>
  );
}

function SelectField({
  label,
  options,
}: {
  label: string;
  options: string[];
}) {
  return (
    <label className="block">
      <span className={labelClassName}>{label}</span>
      <select className={inputClassName} defaultValue="">
        <option value="" disabled>
          Select {label.toLowerCase()}
        </option>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function TextAreaField({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  return (
    <label className="block">
      <span className={labelClassName}>{label}</span>
      <textarea
        className={`${inputClassName} min-h-28 resize-y`}
        placeholder={placeholder}
      />
    </label>
  );
}

function TogglePlaceholder({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-black/30 px-4 py-3">
      <span className="text-sm font-bold text-zinc-200">{label}</span>
      <span className="rounded-full border border-blue-300/40 bg-blue-400/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-blue-200">
        Demo
      </span>
    </div>
  );
}

export default function AdminSettingsPage() {
  return (
    <AdminPageShell activeHref="/admin/settings">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-blue-950/40 p-6 shadow-2xl md:p-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
                  Gradeline Admin
                </p>
                <h1 className="mt-3 text-4xl font-black md:text-6xl">
                  Settings
                </h1>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-300">
                  Static demo controls for business details, pricing defaults,
                  order flow, inventory rules, machines, and user access.
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

          <form className="mt-6 grid gap-6">
            <section className={sectionClassName}>
              <h2 className="text-2xl font-black">Business Profile</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <TextField
                  label="Business Name"
                  placeholder="Gradeline Supply Co."
                />
                <TextField
                  label="Email"
                  placeholder="orders@gradelinesupply.com"
                  type="email"
                />
                <TextField label="Phone" placeholder="(555) 000-0000" />
                <TextField
                  label="Website"
                  placeholder="https://gradelinesupply.com"
                  type="url"
                />
              </div>
            </section>

            <section className={sectionClassName}>
              <h2 className="text-2xl font-black">Pricing Defaults</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <TextField label="Default Markup %" placeholder="40" />
                <TextField label="Default Labor Rate" placeholder="$65/hr" />
                <TextField label="Default Design Fee" placeholder="$25.00" />
                <TextField label="Default Packaging Fee" placeholder="$4.00" />
              </div>
            </section>

            <section className={sectionClassName}>
              <h2 className="text-2xl font-black">Order Status Defaults</h2>
              <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {[
                  "New order starts in Pending Design",
                  "Approved files move to File Ready",
                  "Finished orders require final export",
                  "Delivered orders archive automatically",
                  "Rush orders flag production queue",
                  "Mockup approval required before laser setup",
                ].map((setting) => (
                  <TogglePlaceholder key={setting} label={setting} />
                ))}
              </div>
            </section>

            <section className={sectionClassName}>
              <h2 className="text-2xl font-black">Inventory Defaults</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <TextField label="Default Reorder Level" placeholder="10" />
                <SelectField
                  label="Default Stock Location"
                  options={["Rack A", "Rack B", "Flat Bin", "Cabinet", "Shelf"]}
                />
                <SelectField
                  label="Low Stock Alert"
                  options={["Enabled", "Disabled"]}
                />
              </div>
            </section>

            <section className={sectionClassName}>
              <h2 className="text-2xl font-black">Laser Machine Defaults</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <SelectField
                  label="Primary Machine"
                  options={[
                    "CO2 100W",
                    "Fiber 40W",
                    "Diode 20W",
                    "Rotary Station",
                  ]}
                />
                <SelectField
                  label="Default Air Assist"
                  options={["Off", "Low", "Medium", "High"]}
                />
                <div className="md:col-span-2">
                  <TextAreaField
                    label="Default Focus Notes"
                    placeholder="Record common focus setup, jig notes, rotary checks, or material-specific reminders"
                  />
                </div>
              </div>
            </section>

            <section className={sectionClassName}>
              <h2 className="text-2xl font-black">User Access Placeholder</h2>
              <div className="mt-5 grid gap-3 md:grid-cols-3">
                <TogglePlaceholder label="Owner access" />
                <TogglePlaceholder label="Production access" />
                <TogglePlaceholder label="Design access" />
              </div>
            </section>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                className="rounded-xl bg-blue-400 px-6 py-3 font-bold text-black transition hover:bg-blue-300"
              >
                Save Demo Settings
              </button>
              <button
                type="button"
                className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-bold text-white transition hover:border-blue-300/40 hover:bg-blue-400/10"
              >
                Reset Defaults
              </button>
            </div>
          </form>
    </AdminPageShell>
  );
}


import Link from "next/link";
import AdminSidebar from "@/components/AdminSidebar";

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
        className={`${inputClassName} min-h-32 resize-y`}
        placeholder={placeholder}
      />
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

function CheckboxField({ label }: { label: string }) {
  return (
    <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm font-bold text-zinc-200">
      <input
        type="checkbox"
        className="size-4 accent-blue-400"
      />
      {label}
    </label>
  );
}

export default function AdminNewOrderPage() {
  return (
    <main className="min-h-screen bg-[#05070a] text-white md:flex">
      <AdminSidebar activeHref="/admin/new-order" />

      <section className="relative flex-1 overflow-hidden px-6 py-8 md:py-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,139,196,0.24),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(80,80,80,0.22),_transparent_36%)]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-blue-950/40 p-6 shadow-2xl md:p-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
                  Gradeline Admin
                </p>
                <h1 className="mt-3 text-4xl font-black md:text-6xl">
                  New Order
                </h1>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-300">
                  Static demo order intake form for customer details, design
                  notes, pricing inputs, and production setup.
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
              <h2 className="text-2xl font-black">Customer Info</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <TextField label="Name" placeholder="Customer name" />
                <TextField label="Phone" placeholder="(555) 000-0000" />
                <TextField
                  label="Email"
                  placeholder="customer@example.com"
                  type="email"
                />
                <TextField label="Company" placeholder="Company or shop name" />
              </div>
            </section>

            <div className="grid gap-6 lg:grid-cols-2">
              <section className={sectionClassName}>
                <h2 className="text-2xl font-black">Billing Address</h2>
                <div className="mt-5 grid gap-4">
                  <TextField label="Address" placeholder="Street address" />
                  <div className="grid gap-4 sm:grid-cols-3">
                    <TextField label="City" placeholder="City" />
                    <TextField label="State" placeholder="State" />
                    <TextField label="Zip" placeholder="Zip code" />
                  </div>
                </div>
              </section>

              <section className={sectionClassName}>
                <h2 className="text-2xl font-black">Shipping Address</h2>
                <div className="mt-5 grid gap-4">
                  <CheckboxField label="Same as billing" />
                  <TextField label="Address" placeholder="Street address" />
                  <div className="grid gap-4 sm:grid-cols-3">
                    <TextField label="City" placeholder="City" />
                    <TextField label="State" placeholder="State" />
                    <TextField label="Zip" placeholder="Zip code" />
                  </div>
                </div>
              </section>
            </div>

            <section className={sectionClassName}>
              <h2 className="text-2xl font-black">Product Info</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <SelectField
                  label="Product Type"
                  options={[
                    "Cutting board",
                    "Slate award",
                    "Leather patch",
                    "Tumbler",
                    "Acrylic sign",
                    "Shop tag",
                  ]}
                />
                <SelectField
                  label="Collection"
                  options={[
                    "Industrial & Blue Collar",
                    "Home & Kitchen",
                    "Custom Gifts",
                    "Business & Commercial",
                    "Custom Works",
                  ]}
                />
                <TextField label="Material" placeholder="Walnut, slate, acrylic" />
                <TextField label="Quantity" placeholder="1" type="number" />
                <TextField label="Size/Color" placeholder="12 x 18, black" />
              </div>
            </section>

            <section className={sectionClassName}>
              <h2 className="text-2xl font-black">Design Info</h2>
              <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_340px]">
                <TextAreaField
                  label="Design Notes"
                  placeholder="Logo placement, names, dates, engraving text, finish details"
                />
                <div className="grid gap-4">
                  <div className="rounded-2xl border border-dashed border-blue-300/40 bg-black/30 p-6 text-center">
                    <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
                      Upload File/Photo
                    </p>
                    <p className="mt-3 text-sm leading-6 text-zinc-400">
                      Static placeholder for artwork, mockups, sketches, or
                      customer reference photos.
                    </p>
                  </div>
                  <CheckboxField label="Mockup approved" />
                </div>
              </div>
            </section>

            <section className={sectionClassName}>
              <h2 className="text-2xl font-black">Pricing Info</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <TextField label="Material Cost" placeholder="$0.00" />
                <TextField label="Hardware Cost" placeholder="$0.00" />
                <TextField label="Packaging Cost" placeholder="$0.00" />
                <TextField label="Labor Charge" placeholder="$0.00" />
                <TextField label="Markup %" placeholder="40" type="number" />
                <TextField label="Suggested Price" placeholder="$0.00" />
              </div>
            </section>

            <section className={sectionClassName}>
              <h2 className="text-2xl font-black">Production Info</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <TextField label="Due Date" placeholder="Select date" type="date" />
                <SelectField
                  label="Priority"
                  options={["Standard", "Rush", "Hold", "Event Deadline"]}
                />
                <TextField
                  label="Laser Settings"
                  placeholder="CO2 100W / 320 speed / 42 power"
                />
                <TextAreaField
                  label="Production Notes"
                  placeholder="Material prep, jig notes, finishing steps, packaging instructions"
                />
              </div>
            </section>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                className="rounded-xl bg-blue-400 px-6 py-3 font-bold text-black transition hover:bg-blue-300"
              >
                Save Demo Order
              </button>
              <button
                type="button"
                className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-bold text-white transition hover:border-blue-300/40 hover:bg-blue-400/10"
              >
                Clear Form
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

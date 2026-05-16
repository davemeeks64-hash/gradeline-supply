import Link from "next/link";

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
        className={`${inputClassName} min-h-36 resize-y`}
        placeholder={placeholder}
      />
    </label>
  );
}

export default function CustomOrderPage() {
  return (
    <main className="min-h-screen bg-[#05070a] text-white">
      <section className="relative overflow-hidden px-6 py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,139,196,0.28),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(80,80,80,0.28),_transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-blue-950/40 p-8 shadow-2xl md:p-12">
            <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
              Gradeline Supply Co.
            </p>
            <h1 className="mt-4 text-4xl font-black md:text-6xl">
              Custom Order
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-300">
              Tell us what you want built, engraved, cut, marked, or mocked up.
              This static form is a preview for future custom order intake.
            </p>
            <Link
              href="/"
              className="mt-8 inline-flex rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-bold text-white transition hover:border-blue-300/40 hover:bg-blue-400/10"
            >
              Back to Home
            </Link>
          </div>

          <form className="mt-8 grid gap-6">
            <section className={sectionClassName}>
              <h2 className="text-2xl font-black">Customer Info</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-400">
                Basic contact details so Gradeline can follow up with questions,
                mockups, or a quote.
              </p>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <TextField label="Name" placeholder="Your name" />
                <TextField label="Phone" placeholder="(555) 000-0000" />
                <TextField
                  label="Email"
                  placeholder="you@example.com"
                  type="email"
                />
                <TextField
                  label="Company"
                  placeholder="Company, shop, crew, or organization"
                />
              </div>
            </section>

            <section className={sectionClassName}>
              <h2 className="text-2xl font-black">Project Type</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
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
                <SelectField
                  label="Product Type"
                  options={[
                    "Cutting board",
                    "Slate piece",
                    "Leather patch",
                    "Tumbler",
                    "Acrylic sign",
                    "Shop tag",
                    "One-off custom build",
                  ]}
                />
              </div>
            </section>

            <section className={sectionClassName}>
              <h2 className="text-2xl font-black">Product Details</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <TextField
                  label="Material"
                  placeholder="Walnut, slate, acrylic, leather"
                />
                <TextField label="Quantity" placeholder="1" type="number" />
                <TextField
                  label="Size/Color"
                  placeholder="12 x 18, black, natural"
                />
                <SelectField
                  label="Budget Range"
                  options={[
                    "Under $50",
                    "$50 - $150",
                    "$150 - $300",
                    "$300 - $750",
                    "$750+",
                  ]}
                />
              </div>
            </section>

            <section className={sectionClassName}>
              <h2 className="text-2xl font-black">Design Notes</h2>
              <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_340px]">
                <TextAreaField
                  label="Design Notes"
                  placeholder="Names, dates, phrases, logo placement, inspiration, finish preferences, or anything else that matters"
                />
                <div className="rounded-2xl border border-dashed border-blue-300/40 bg-black/30 p-6 text-center">
                  <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
                    Upload Placeholder
                  </p>
                  <p className="mt-3 text-sm leading-6 text-zinc-400">
                    Future spot for logos, photos, sketches, reference images,
                    or artwork files.
                  </p>
                </div>
              </div>
            </section>

            <div className="grid gap-6 lg:grid-cols-2">
              <section className={sectionClassName}>
                <h2 className="text-2xl font-black">Timeline / Due Date</h2>
                <div className="mt-5 grid gap-4">
                  <TextField label="Due Date" placeholder="Select date" type="date" />
                  <SelectField
                    label="Timeline"
                    options={[
                      "No rush",
                      "Within 2 weeks",
                      "Within 1 week",
                      "Event deadline",
                      "Rush request",
                    ]}
                  />
                </div>
              </section>

              <section className={sectionClassName}>
                <h2 className="text-2xl font-black">Contact Preference</h2>
                <div className="mt-5 grid gap-4">
                  <SelectField
                    label="Preferred Contact"
                    options={["Email", "Text", "Phone call"]}
                  />
                  <TextAreaField
                    label="Best Time / Extra Notes"
                    placeholder="Best time to reach you, approval needs, pickup/shipping notes"
                  />
                </div>
              </section>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                className="rounded-xl bg-blue-400 px-6 py-3 font-bold text-black transition hover:bg-blue-300"
              >
                Submit Demo Request
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

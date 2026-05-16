import Link from "next/link";

const infoBlocks = [
  {
    title: "Contact Info",
    lines: [
      "Email: orders@gradelinesupply.example",
      "Phone: (555) 000-0000",
      "Hours: By appointment / project queue",
    ],
  },
  {
    title: "Social Media",
    lines: ["Instagram placeholder", "Facebook placeholder", "TikTok placeholder"],
  },
  {
    title: "Service Area",
    lines: [
      "Local pickup placeholder",
      "Regional shipping placeholder",
      "Custom work for shops, crews, families, and businesses",
    ],
  },
];

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

export default function ContactPage() {
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
              Contact Gradeline
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-300">
              Start a quote request, ask about a custom build, or send details
              for laser engraving, signs, gifts, branding, and shop-built work.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/custom-order"
                className="rounded-xl bg-blue-400 px-6 py-3 text-center font-bold text-black transition hover:bg-blue-300"
              >
                Request a Quote
              </Link>
              <Link
                href="/"
                className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-center font-bold text-white transition hover:border-blue-300/40 hover:bg-blue-400/10"
              >
                Back to Home
              </Link>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="grid gap-5">
              {infoBlocks.map((block) => (
                <article
                  key={block.title}
                  className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_18px_45px_rgba(0,0,0,0.28)]"
                >
                  <div className="h-2 w-14 bg-blue-400 shadow-[0_0_18px_rgba(96,165,250,0.65)]" />
                  <h2 className="mt-5 text-2xl font-black">{block.title}</h2>
                  <div className="mt-4 grid gap-3 text-zinc-300">
                    {block.lines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            <form className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_18px_45px_rgba(0,0,0,0.28)] md:p-8">
              <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
                Simple Contact Form
              </p>
              <h2 className="mt-3 text-3xl font-black">Tell us what you need.</h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <TextField label="Name" placeholder="Your name" />
                <TextField label="Phone" placeholder="(555) 000-0000" />
                <TextField
                  label="Email"
                  placeholder="you@example.com"
                  type="email"
                />
                <label className="block">
                  <span className={labelClassName}>Project Type</span>
                  <select className={inputClassName} defaultValue="">
                    <option value="" disabled>
                      Select project type
                    </option>
                    <option>Custom engraving</option>
                    <option>Business branding</option>
                    <option>Gift / keepsake</option>
                    <option>Shop tags / patches</option>
                    <option>Other custom work</option>
                  </select>
                </label>
                <label className="block md:col-span-2">
                  <span className={labelClassName}>Message</span>
                  <textarea
                    className={`${inputClassName} min-h-40 resize-y`}
                    placeholder="Project details, timeline, material ideas, names, logos, or questions"
                  />
                </label>
              </div>
              <button
                type="button"
                className="mt-6 rounded-xl bg-blue-400 px-6 py-3 font-bold text-black transition hover:bg-blue-300"
              >
                Send Demo Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

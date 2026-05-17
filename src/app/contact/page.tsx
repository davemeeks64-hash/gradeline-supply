import Image from "next/image";
import Link from "next/link";
import PublicFooter from "@/components/PublicFooter";
import PublicHeader from "@/components/PublicHeader";

const infoBlocks = [
  {
    title: "Shop Contact",
    lines: [
      "Email: orders@gradelinesupply.example",
      "Phone: (555) 000-0000",
      "Hours: By appointment / project queue",
    ],
  },
  {
    title: "Pickup / Service Area",
    lines: [
      "Local pickup placeholder",
      "Regional shipping placeholder",
      "Custom work for shops, crews, families, and businesses",
    ],
  },
  {
    title: "Project Fit",
    lines: [
      "Custom engraving",
      "Business branding",
      "Gifts, signs, leather patches, tumblers, and shop-built pieces",
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
    <>
      <PublicHeader />
      <main className="min-h-[100svh] overflow-hidden bg-[#05070a] text-white">
      <section className="relative overflow-hidden px-4 py-12 sm:px-6 md:py-16">
        <Image
          src="/images/hero/gradeline-contact-page-hero-banner.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-[0.35]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,139,196,0.24),_transparent_35%),linear-gradient(to_bottom,rgba(5,7,10,0.64),rgba(5,7,10,0.96))]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-blue-950/40 shadow-2xl">
            <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
              <div className="p-6 md:p-10">
                <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
                  Gradeline Supply Co.
                </p>
                <h1 className="mt-4 text-4xl font-black md:text-6xl">
                  Contact Gradeline
                </h1>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-300">
                  Start a quote request, ask about a custom build, or send
                  details for laser engraving, signs, gifts, branding, and
                  shop-built work.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link
                    href="/custom-order"
                    className="rounded-xl bg-blue-400 px-6 py-3 text-center font-bold text-black transition hover:bg-blue-300"
                  >
                    Request a Quote
                  </Link>
                  <a
                    href="#business-inquiry"
                    className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-center font-bold text-white transition hover:border-blue-300/40 hover:bg-blue-400/10"
                  >
                    Send Message
                  </a>
                  <Link
                    href="/"
                    className="rounded-xl border border-blue-300/30 bg-blue-400/10 px-6 py-3 text-center font-bold text-blue-100 transition hover:bg-blue-400/20"
                  >
                    Back to Home
                  </Link>
                </div>
              </div>
              <div className="relative min-h-[260px] border-t border-white/10 lg:border-l lg:border-t-0">
                <Image
                  src="/images/hero/gradeline-contact-page-hero-banner.png"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,7,10,0.5),transparent)]" />
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="grid gap-5">
              {infoBlocks.map((block) => (
                <article
                  key={block.title}
                  className="relative overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(145deg,rgba(24,31,38,0.72),rgba(7,9,12,0.96))] p-6 shadow-[0_18px_45px_rgba(0,0,0,0.28)]"
                >
                  <div className="relative">
                  <div className="h-2 w-14 bg-blue-400 shadow-[0_0_18px_rgba(96,165,250,0.65)]" />
                  <h2 className="mt-5 text-2xl font-black">{block.title}</h2>
                  <div className="mt-4 grid gap-3 text-zinc-300">
                    {block.lines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                  </div>
                </article>
              ))}
            </div>

            <form
              id="business-inquiry"
              className="scroll-mt-24 rounded-3xl border border-white/10 bg-[linear-gradient(145deg,rgba(24,31,38,0.72),rgba(7,9,12,0.96))] p-6 shadow-[0_18px_45px_rgba(0,0,0,0.28)] md:p-8"
            >
              <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
                Business Inquiry Form
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
                <TextField label="Company" placeholder="Shop, crew, business, or organization" />
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

          <section className="relative mt-8 overflow-hidden rounded-3xl border border-blue-300/20 bg-[linear-gradient(135deg,rgba(12,19,26,1),rgba(7,9,12,1)_58%,rgba(20,43,61,0.72))] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.4)] md:p-10">
            <Image
              src="/images/workflow/gradeline-footer-cta-banner.png"
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-center opacity-[0.28]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,7,10,0.92),rgba(5,7,10,0.72),rgba(5,7,10,0.34))]" />
            <div className="relative grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className={labelClassName}>Custom Order CTA</p>
                <h2 className="mt-3 text-3xl font-black md:text-5xl">
                  Have the details ready?
                </h2>
                <p className="mt-4 max-w-2xl leading-8 text-zinc-300">
                  Use the custom order page when you have a product direction,
                  notes, timeline, and reference material ready to send.
                </p>
              </div>
              <Link
                href="/custom-order"
                className="inline-flex w-fit rounded-xl bg-blue-400 px-6 py-3 font-bold text-black transition hover:bg-blue-300"
              >
                Start Custom Order
              </Link>
            </div>
          </section>

          <section className="relative mt-8 overflow-hidden rounded-3xl border border-white/10 bg-black/35 p-6 shadow-[0_18px_45px_rgba(0,0,0,0.28)] md:p-8">
            <Image
              src="/images/social/gradeline-facebook-cover-banner.png"
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-center opacity-[0.22]"
            />
            <div className="absolute inset-0 bg-black/[0.62]" />
            <div className="relative grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className={labelClassName}>Social Media</p>
                <h2 className="mt-3 text-3xl font-black">
                  Follow the shop buildouts and new drops.
                </h2>
                <p className="mt-4 max-w-2xl leading-8 text-zinc-300">
                  Social links are placeholders for now, ready for Instagram,
                  Facebook, TikTok, project photos, and product releases.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {["Instagram", "Facebook", "TikTok"].map((social) => (
                  <button
                    key={social}
                    type="button"
                    className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-bold text-white transition hover:border-blue-300/40 hover:bg-blue-400/10"
                  >
                    {social}
                  </button>
                ))}
              </div>
            </div>
          </section>
        </div>
      </section>
      </main>
      <PublicFooter />
    </>
  );
}

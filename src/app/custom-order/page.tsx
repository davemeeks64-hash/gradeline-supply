"use client";

import { type FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PublicFooter from "@/components/PublicFooter";
import PublicHeader from "@/components/PublicHeader";

const sectionClassName =
  "rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.28)] md:p-6";

const labelClassName =
  "text-xs font-bold uppercase tracking-widest text-blue-300";

const inputClassName =
  "mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-blue-300/60 focus:bg-black/45";

const workflowSteps = [
  {
    title: "Send The Idea",
    text: "Share the product type, material, name, logo, phrase, sketch, or rough inspiration.",
  },
  {
    title: "Proof & Approval",
    text: "Gradeline reviews the request, prepares direction, and confirms design details before production.",
  },
  {
    title: "Build & Handoff",
    text: "Your piece moves through engraving, finishing, packing, and pickup, delivery, or shipping.",
  },
];

const productOptions = [
  {
    title: "Tumblers",
    text: "Drinkware for crews, gifts, events, and branded everyday carry.",
    image: "/images/products/gradeline-product-placeholder-tumbler.png",
  },
  {
    title: "Leather Patches",
    text: "Patches, tags, and rugged branded pieces for hats, gear, and workwear.",
    image: "/images/products/gradeline-product-placeholder-leather-patch.png",
  },
  {
    title: "Cutting Boards",
    text: "Warm home and kitchen pieces for recipes, names, dates, and gift moments.",
    image: "/images/products/gradeline-product-placeholder-cutting-board.png",
  },
  {
    title: "Signs",
    text: "Layered acrylic, shop displays, logo signs, wall pieces, and business branding.",
    image: "/images/products/gradeline-product-placeholder-layered-sign.png",
  },
];

const timelineNotes = [
  {
    title: "Standard Queue",
    text: "Most custom work starts with review, pricing, proofing, approval, then production.",
  },
  {
    title: "Event Deadlines",
    text: "Include the date up front so timing, materials, and approval windows can be planned.",
  },
  {
    title: "Rush Requests",
    text: "Rush work depends on material availability, design readiness, and current production load.",
  },
];

function TextField({
  label,
  placeholder,
  required = false,
  type = "text",
}: {
  label: string;
  placeholder: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <label className="block">
      <span className={labelClassName}>{label}</span>
      <input
        className={inputClassName}
        required={required}
        type={type}
        placeholder={placeholder}
      />
    </label>
  );
}

function SelectField({
  label,
  options,
  required = false,
}: {
  label: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className={labelClassName}>{label}</span>
      <select className={inputClassName} defaultValue="" required={required}>
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
  required = false,
}: {
  label: string;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className={labelClassName}>{label}</span>
      <textarea
        className={`${inputClassName} min-h-36 resize-y`}
        placeholder={placeholder}
        required={required}
      />
    </label>
  );
}

export default function CustomOrderPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitted(true);
    event.currentTarget.reset();
  }

  return (
    <>
      <PublicHeader />
      <main className="min-h-[100svh] overflow-hidden bg-[#05070a] text-white">
      <section className="relative overflow-hidden px-4 py-12 sm:px-6 md:py-16">
        <Image
          src="/images/backgrounds/gradeline-order-form-section-bg.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,139,196,0.26),_transparent_35%),linear-gradient(to_bottom,rgba(5,7,10,0.72),rgba(5,7,10,0.96))]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-blue-950/40 shadow-2xl">
            <div className="grid gap-0 lg:grid-cols-[1.02fr_0.98fr]">
              <div className="p-6 md:p-10">
                <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
                  Gradeline Supply Co.
                </p>
                <h1 className="mt-4 text-4xl font-black md:text-6xl">
                  Custom Order
                </h1>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-300">
                  Tell us what you want built, engraved, cut, marked, mocked
                  up, or turned into a finished shop-built piece.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <a
                    href="#custom-order-form"
                    className="rounded-xl bg-blue-400 px-6 py-3 text-center font-bold text-black transition hover:bg-blue-300"
                  >
                    Start Order Form
                  </a>
                  <Link
                    href="/contact"
                    className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-center font-bold text-white transition hover:border-blue-300/40 hover:bg-blue-400/10"
                  >
                    Contact Gradeline
                  </Link>
                  <Link
                    href="/"
                    className="rounded-xl border border-blue-300/30 bg-blue-400/10 px-6 py-3 text-center font-bold text-blue-100 transition hover:bg-blue-400/20"
                  >
                    Back to Home
                  </Link>
                </div>
              </div>
              <div className="relative min-h-[260px] overflow-hidden border-t border-white/10 sm:min-h-[320px] lg:min-h-full lg:border-l lg:border-t-0">
                <Image
                  src="/images/workflow/gradeline-custom-order-workflow.png"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,7,10,0.45),transparent)]" />
              </div>
            </div>
          </div>

          <section className="mt-8 grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-stretch">
            <div className={sectionClassName}>
              <p className={labelClassName}>How It Works</p>
              <h2 className="mt-3 text-3xl font-black">
                From rough idea to finished work.
              </h2>
              <p className="mt-4 leading-8 text-zinc-300">
                Custom orders stay practical: share the idea, approve the
                direction, then Gradeline builds the finished piece with a clean
                shop workflow.
              </p>
              <Link
                href="/gallery"
                className="mt-6 inline-flex rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-bold text-white transition hover:border-blue-300/40 hover:bg-blue-400/10"
              >
                View Gallery
              </Link>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {workflowSteps.map((step, index) => (
                <article
                  key={step.title}
                  className="rounded-3xl border border-white/10 bg-black/35 p-5 shadow-[0_18px_45px_rgba(0,0,0,0.22)]"
                >
                  <p className="text-sm font-black text-blue-300">
                    Step {index + 1}
                  </p>
                  <h3 className="mt-3 text-xl font-black">{step.title}</h3>
                  <p className="mt-3 leading-7 text-zinc-400">{step.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(120deg,rgba(7,10,13,1),rgba(18,27,35,0.96),rgba(8,17,27,0.92))] shadow-[0_24px_70px_rgba(0,0,0,0.36)]">
            <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
              <div className="p-6 md:p-8">
                <p className={labelClassName}>Upload / Design Approval</p>
                <h2 className="mt-3 text-3xl font-black">
                  Send files now. Final production waits for approval.
                </h2>
                <p className="mt-4 leading-8 text-zinc-300">
                  Logos, artwork, sketches, photos, and reference images can
                  guide the quote and mockup. Before work moves to production,
                  the design direction, material fit, and proof details get
                  reviewed.
                </p>
                <div className="mt-6 grid gap-3 text-sm text-zinc-300 sm:grid-cols-2">
                  <p className="rounded-2xl border border-white/10 bg-black/30 p-4">
                    SVG, PNG, JPG, sketches, logo references, and phone photos
                    can all help start the conversation.
                  </p>
                  <p className="rounded-2xl border border-white/10 bg-black/30 p-4">
                    Mockup approval helps prevent surprises before engraving,
                    cutting, finishing, and packing.
                  </p>
                </div>
              </div>
              <div className="relative min-h-[280px] overflow-hidden border-t border-white/10 lg:border-l lg:border-t-0">
                <Image
                  src="/images/workflow/gradeline-reviews-trust-banner.png"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,7,10,0.58),transparent)]" />
              </div>
            </div>
          </section>

          <section className="mt-8">
            <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className={labelClassName}>Product Options</p>
                <h2 className="mt-2 text-3xl font-black">
                  Start with a product direction.
                </h2>
              </div>
              <Link
                href="/collections"
                className="w-fit rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-bold text-white transition hover:border-blue-300/40 hover:bg-blue-400/10"
              >
                Browse Collections
              </Link>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {productOptions.map((option) => (
                <article
                  key={option.title}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-[0_18px_45px_rgba(0,0,0,0.28)]"
                >
                  <div className="relative aspect-[16/11] w-full overflow-hidden border-b border-white/10 bg-black">
                    <Image
                      src={option.image}
                      alt=""
                      fill
                      sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover object-center transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,7,10,0.32),transparent)]" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-xl font-black">{option.title}</h3>
                    <p className="mt-3 flex-1 leading-7 text-zinc-400">
                      {option.text}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-8 grid gap-5 lg:grid-cols-[1fr_0.9fr] lg:items-stretch">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/35 p-6 shadow-[0_18px_45px_rgba(0,0,0,0.28)] md:p-8">
              <Image
                src="/images/workflow/gradeline-shipping-delivery-banner.png"
                alt=""
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover object-center opacity-25"
              />
              <div className="absolute inset-0 bg-black/[0.55]" />
              <div className="relative">
                <p className={labelClassName}>Timeline Expectations</p>
                <h2 className="mt-3 text-3xl font-black">
                  Timing depends on proofing, materials, and deadline needs.
                </h2>
                <p className="mt-4 leading-8 text-zinc-300">
                  The more complete the starting info is, the easier it is to
                  quote, proof, and schedule the work.
                </p>
              </div>
            </div>

            <div className="grid gap-4">
              {timelineNotes.map((note) => (
                <article
                  key={note.title}
                  className="rounded-3xl border border-white/10 bg-white/[0.04] p-5"
                >
                  <h3 className="text-xl font-black">{note.title}</h3>
                  <p className="mt-3 leading-7 text-zinc-400">{note.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="relative mt-8 overflow-hidden rounded-3xl border border-blue-300/20 bg-[linear-gradient(135deg,rgba(12,19,26,1),rgba(7,9,12,1)_58%,rgba(20,43,61,0.72))] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.4)] md:p-10">
            <Image
              src="/images/workflow/gradeline-footer-cta-banner.png"
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-center opacity-[0.28]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,7,10,0.9),rgba(5,7,10,0.72),rgba(5,7,10,0.36))]" />
            <div className="relative grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className={labelClassName}>Ready To Start?</p>
                <h2 className="mt-3 text-3xl font-black md:text-5xl">
                  Send the details and Gradeline will review the project.
                </h2>
                <p className="mt-4 max-w-2xl leading-8 text-zinc-300">
                  Use the form below for project intake, or contact Gradeline if
                  you need to ask a question before submitting.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <a
                  href="#custom-order-form"
                  className="rounded-xl bg-blue-400 px-6 py-3 text-center font-bold text-black transition hover:bg-blue-300"
                >
                  Start Order
                </a>
                <Link
                  href="/contact"
                  className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-center font-bold text-white transition hover:border-blue-300/40 hover:bg-blue-400/10"
                >
                  Contact
                </Link>
              </div>
            </div>
          </section>

          <form
            id="custom-order-form"
            className="mt-8 grid scroll-mt-24 gap-6"
            onSubmit={handleSubmit}
          >
            <section className={sectionClassName}>
              <h2 className="text-2xl font-black">Customer Info</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-400">
                Basic contact details so Gradeline can follow up with questions,
                mockups, or a quote.
              </p>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <TextField label="Name" placeholder="Your name" required />
                <TextField label="Phone" placeholder="(555) 000-0000" />
                <TextField
                  label="Email"
                  placeholder="you@example.com"
                  required
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
                  required
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
                  required
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
                <TextField
                  label="Quantity"
                  placeholder="1"
                  required
                  type="number"
                />
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
                  required
                />
                <div className="relative overflow-hidden rounded-2xl border border-dashed border-blue-300/40 bg-black/30 p-6 text-center">
                  <Image
                    src="/images/workflow/gradeline-newsletter-signup-banner.png"
                    alt=""
                    fill
                    sizes="340px"
                    className="object-cover object-center opacity-25"
                  />
                  <div className="absolute inset-0 bg-black/45" />
                  <div className="relative">
                    <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
                      Upload Placeholder
                    </p>
                    <p className="mt-3 text-sm leading-6 text-zinc-300">
                      Future spot for logos, photos, sketches, reference
                      images, or artwork files.
                    </p>
                  </div>
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
                    required
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
                type="submit"
                className="rounded-xl bg-blue-400 px-6 py-3 font-bold text-black transition hover:bg-blue-300"
              >
                Submit Demo Request
              </button>
              <button
                type="reset"
                onClick={() => setIsSubmitted(false)}
                className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-bold text-white transition hover:border-blue-300/40 hover:bg-blue-400/10"
              >
                Clear Form
              </button>
            </div>

            {isSubmitted && (
              <p
                role="status"
                className="rounded-2xl border border-blue-300/40 bg-blue-400/10 px-5 py-4 font-bold text-blue-100"
              >
                Request received. Gradeline will review your project and follow
                up.
              </p>
            )}
          </form>
        </div>
      </section>
      </main>
      <PublicFooter />
    </>
  );
}

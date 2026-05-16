import Link from "next/link";
import AdminPageShell from "@/components/AdminPageShell";

const reportSections = [
  {
    title: "Sales Summary",
    value: "$12,840",
    detail: "Demo month-to-date gross sales",
    rows: [
      ["Open invoices", "$3,250"],
      ["Collected", "$9,590"],
      ["Average order", "$214"],
    ],
  },
  {
    title: "Inventory Value",
    value: "$8,460",
    detail: "Estimated material value on hand",
    rows: [
      ["Wood blanks", "$2,180"],
      ["Slate and acrylic", "$1,940"],
      ["Drinkware and hardware", "$4,340"],
    ],
  },
  {
    title: "Production Status",
    value: "43",
    detail: "Demo jobs tracked in the shop",
    rows: [
      ["Pending design", "7"],
      ["In production", "12"],
      ["Ready to deliver", "9"],
    ],
  },
  {
    title: "Best Selling Categories",
    value: "Home & Kitchen",
    detail: "Top demo category by order volume",
    rows: [
      ["Home & Kitchen", "18 orders"],
      ["Business & Commercial", "14 orders"],
      ["Custom Gifts", "11 orders"],
    ],
  },
  {
    title: "Estimated Profit",
    value: "$4,920",
    detail: "Demo estimate after materials and labor",
    rows: [
      ["Material cost", "$3,180"],
      ["Labor charges", "$4,740"],
      ["Profit margin", "38%"],
    ],
  },
  {
    title: "Low Inventory Alerts",
    value: "5",
    detail: "Items at or below reorder level",
    rows: [
      ["Clear acrylic sheets", "8 on hand"],
      ["Leatherette patch rolls", "5 on hand"],
      ["Walnut boards", "14 on hand"],
    ],
  },
];

const cardClassName =
  "rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.28)] transition hover:border-blue-300/40 hover:bg-white/[0.07] md:p-6";

export default function AdminReportsPage() {
  return (
    <AdminPageShell activeHref="/admin/reports">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-blue-950/40 p-6 shadow-2xl md:p-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
                  Gradeline Admin
                </p>
                <h1 className="mt-3 text-4xl font-black md:text-6xl">
                  Reports
                </h1>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-300">
                  Demo reporting overview for sales, inventory, production,
                  category performance, profit, and low-stock alerts.
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

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {reportSections.map((section) => (
              <article key={section.title} className={cardClassName}>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
                      {section.title}
                    </p>
                    <p className="mt-4 text-4xl font-black text-white">
                      {section.value}
                    </p>
                  </div>
                  <span className="h-3 w-3 border border-blue-300 bg-blue-400 shadow-[0_0_18px_rgba(96,165,250,0.65)]" />
                </div>

                <p className="mt-4 leading-7 text-zinc-400">
                  {section.detail}
                </p>

                <div className="mt-5 divide-y divide-white/10 rounded-2xl border border-white/10 bg-black/30">
                  {section.rows.map(([label, value]) => (
                    <div
                      key={label}
                      className="flex items-center justify-between gap-4 px-4 py-3"
                    >
                      <span className="text-sm text-zinc-400">{label}</span>
                      <span className="text-sm font-black text-white">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
    </AdminPageShell>
  );
}


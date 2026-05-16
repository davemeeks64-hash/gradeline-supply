import Link from "next/link";
import AdminLayout from "@/components/AdminLayout";

type InventoryItem = {
  item: string;
  category: string;
  quantityOnHand: number;
  costPerUnit: string;
  reorderLevel: number;
  supplier: string;
  location: string;
};

const inventoryItems: InventoryItem[] = [
  {
    item: "Black slate blanks",
    category: "Slate",
    quantityOnHand: 42,
    costPerUnit: "$3.80",
    reorderLevel: 20,
    supplier: "StoneCraft Supply",
    location: "Rack A2",
  },
  {
    item: "Walnut cutting boards",
    category: "Wood",
    quantityOnHand: 14,
    costPerUnit: "$18.50",
    reorderLevel: 10,
    supplier: "North Mill Goods",
    location: "Rack B1",
  },
  {
    item: "Clear acrylic sheets",
    category: "Acrylic",
    quantityOnHand: 8,
    costPerUnit: "$11.25",
    reorderLevel: 12,
    supplier: "Acrylic Depot",
    location: "Flat Bin 3",
  },
  {
    item: "Leatherette patch rolls",
    category: "Leather",
    quantityOnHand: 5,
    costPerUnit: "$22.00",
    reorderLevel: 6,
    supplier: "PatchWorks Co.",
    location: "Cabinet C4",
  },
  {
    item: "Tumbler blanks",
    category: "Drinkware",
    quantityOnHand: 36,
    costPerUnit: "$7.40",
    reorderLevel: 18,
    supplier: "SteelCup Wholesale",
    location: "Shelf D2",
  },
];

const summaryCards = [
  { label: "Tracked Items", value: "128", detail: "Demo material records" },
  { label: "Low Stock", value: "2", detail: "Below reorder level" },
  { label: "Suppliers", value: "14", detail: "Active vendor sources" },
  { label: "Shop Locations", value: "9", detail: "Racks, bins, cabinets" },
];

const pricingPreview = [
  { label: "Material Cost", value: "$18.50" },
  { label: "Hardware Cost", value: "$3.25" },
  { label: "Packaging Cost", value: "$2.10" },
  { label: "Labor Charge", value: "$28.00" },
  { label: "Markup %", value: "42%" },
  { label: "Suggested Price", value: "$72.00" },
  { label: "Estimated Profit", value: "$20.15" },
];

const panelClassName =
  "rounded-3xl border border-white/10 bg-white/[0.04] shadow-[0_18px_45px_rgba(0,0,0,0.28)]";

const cardClassName =
  "rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.24)]";

function StockBadge({
  quantityOnHand,
  reorderLevel,
}: {
  quantityOnHand: number;
  reorderLevel: number;
}) {
  const isLow = quantityOnHand <= reorderLevel;

  return (
    <span
      className={[
        "inline-flex w-fit rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-widest",
        isLow
          ? "border-amber-300/50 bg-amber-400/10 text-amber-200"
          : "border-blue-300/50 bg-blue-400/10 text-blue-200",
      ].join(" ")}
    >
      {quantityOnHand} on hand
    </span>
  );
}

export default function AdminInventoryPage() {
  return (
    <AdminLayout activeHref="/admin/inventory">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-blue-950/40 p-6 shadow-2xl md:p-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
                  Gradeline Admin
                </p>
                <h1 className="mt-3 text-4xl font-black md:text-6xl">
                  Inventory
                </h1>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-300">
                  Demo material tracking for stock levels, supplier details,
                  storage locations, and pricing inputs.
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

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {summaryCards.map((card) => (
              <article key={card.label} className={cardClassName}>
                <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
                  {card.label}
                </p>
                <p className="mt-4 text-4xl font-black text-white">
                  {card.value}
                </p>
                <p className="mt-3 text-sm leading-6 text-zinc-400">
                  {card.detail}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_360px]">
            <div className={`${panelClassName} overflow-hidden`}>
              <div className="hidden overflow-x-auto lg:block">
                <table className="w-full border-collapse text-left">
                  <thead className="border-b border-white/10 bg-black/30 text-xs font-bold uppercase tracking-widest text-blue-300">
                    <tr>
                      <th className="px-5 py-4">Item</th>
                      <th className="px-5 py-4">Category</th>
                      <th className="px-5 py-4">Quantity</th>
                      <th className="px-5 py-4">Cost</th>
                      <th className="px-5 py-4">Reorder</th>
                      <th className="px-5 py-4">Supplier</th>
                      <th className="px-5 py-4">Location</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {inventoryItems.map((item) => (
                      <tr
                        key={item.item}
                        className="bg-white/[0.02] transition hover:bg-white/[0.06]"
                      >
                        <td className="px-5 py-4 font-black text-white">
                          {item.item}
                        </td>
                        <td className="px-5 py-4 text-zinc-300">
                          {item.category}
                        </td>
                        <td className="px-5 py-4">
                          <StockBadge
                            quantityOnHand={item.quantityOnHand}
                            reorderLevel={item.reorderLevel}
                          />
                        </td>
                        <td className="px-5 py-4 text-zinc-300">
                          {item.costPerUnit}
                        </td>
                        <td className="px-5 py-4 text-zinc-300">
                          {item.reorderLevel}
                        </td>
                        <td className="px-5 py-4 text-zinc-400">
                          {item.supplier}
                        </td>
                        <td className="px-5 py-4 text-zinc-300">
                          {item.location}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="grid gap-4 p-4 lg:hidden">
                {inventoryItems.map((item) => (
                  <article
                    key={item.item}
                    className="rounded-2xl border border-white/10 bg-black/30 p-5"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-blue-300">
                          {item.category}
                        </p>
                        <h2 className="mt-2 text-xl font-black text-white">
                          {item.item}
                        </h2>
                      </div>
                      <StockBadge
                        quantityOnHand={item.quantityOnHand}
                        reorderLevel={item.reorderLevel}
                      />
                    </div>

                    <div className="mt-4 grid gap-3 text-sm text-zinc-300">
                      <p>
                        <span className="font-bold text-zinc-500">
                          Cost per Unit:{" "}
                        </span>
                        {item.costPerUnit}
                      </p>
                      <p>
                        <span className="font-bold text-zinc-500">
                          Reorder Level:{" "}
                        </span>
                        {item.reorderLevel}
                      </p>
                      <p>
                        <span className="font-bold text-zinc-500">
                          Supplier:{" "}
                        </span>
                        {item.supplier}
                      </p>
                      <p>
                        <span className="font-bold text-zinc-500">
                          Location:{" "}
                        </span>
                        {item.location}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <aside className={`${panelClassName} p-5`}>
              <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
                Pricing Engine Preview
              </p>
              <h2 className="mt-3 text-2xl font-black text-white">
                Walnut Board Estimate
              </h2>
              <div className="mt-5 divide-y divide-white/10">
                {pricingPreview.map((line) => (
                  <div
                    key={line.label}
                    className="flex items-center justify-between gap-4 py-3"
                  >
                    <span className="text-sm text-zinc-400">{line.label}</span>
                    <span className="font-black text-white">{line.value}</span>
                  </div>
                ))}
              </div>
            </aside>
          </div>
    </AdminLayout>
  );
}



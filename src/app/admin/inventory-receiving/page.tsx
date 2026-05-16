import Link from "next/link";
import AdminPageShell from "@/components/AdminPageShell";

type InventoryCategory =
  | "Leather"
  | "Acrylic"
  | "Wood"
  | "Slate"
  | "Tumblers"
  | "Hardware"
  | "Packaging"
  | "Supplies";

type ReceivingRecord = {
  receiveDate: string;
  supplier: string;
  itemName: string;
  category: InventoryCategory;
  quantityReceived: number;
  unitCost: string;
  totalCost: string;
  storageLocation: string;
  notes: string;
};

const receivingHistory: ReceivingRecord[] = [
  {
    receiveDate: "May 16",
    supplier: "North Mill Goods",
    itemName: "Walnut cutting board blanks",
    category: "Wood",
    quantityReceived: 18,
    unitCost: "$18.50",
    totalCost: "$333.00",
    storageLocation: "Rack B1",
    notes: "Inspected for flatness; two reserved for custom orders.",
  },
  {
    receiveDate: "May 15",
    supplier: "Acrylic Depot",
    itemName: "Clear acrylic sheets",
    category: "Acrylic",
    quantityReceived: 12,
    unitCost: "$11.25",
    totalCost: "$135.00",
    storageLocation: "Flat Bin 3",
    notes: "Keep masking on until production cut.",
  },
  {
    receiveDate: "May 14",
    supplier: "PatchWorks Co.",
    itemName: "Black leatherette rolls",
    category: "Leather",
    quantityReceived: 6,
    unitCost: "$22.00",
    totalCost: "$132.00",
    storageLocation: "Cabinet C4",
    notes: "Good for patch batches and keychains.",
  },
  {
    receiveDate: "May 13",
    supplier: "SteelCup Wholesale",
    itemName: "Powder-coated tumblers",
    category: "Tumblers",
    quantityReceived: 36,
    unitCost: "$7.40",
    totalCost: "$266.40",
    storageLocation: "Shelf D2",
    notes: "Mixed black, navy, and white finish.",
  },
  {
    receiveDate: "May 12",
    supplier: "ShipRight Supply",
    itemName: "Mailer boxes",
    category: "Packaging",
    quantityReceived: 100,
    unitCost: "$0.82",
    totalCost: "$82.00",
    storageLocation: "Packaging Wall",
    notes: "Restocked medium shipping boxes.",
  },
];

const categories: InventoryCategory[] = [
  "Leather",
  "Acrylic",
  "Wood",
  "Slate",
  "Tumblers",
  "Hardware",
  "Packaging",
  "Supplies",
];

const summaryCards = [
  { label: "Received Units", value: "172", detail: "Demo items received" },
  { label: "Receiving Cost", value: "$948", detail: "Demo material spend" },
  { label: "Suppliers", value: "5", detail: "Recent receiving sources" },
  { label: "Storage Spots", value: "5", detail: "Updated shop locations" },
];

const panelClassName =
  "rounded-3xl border border-white/10 bg-white/[0.04] shadow-[0_18px_45px_rgba(0,0,0,0.28)]";

const cardClassName =
  "rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.24)]";

const inputClassName =
  "mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-blue-300/60 focus:bg-black/45";

const labelClassName =
  "text-xs font-bold uppercase tracking-widest text-blue-300";

function CategoryBadge({ category }: { category: InventoryCategory }) {
  return (
    <span className="inline-flex w-fit rounded-full border border-blue-300/50 bg-blue-400/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-blue-200">
      {category}
    </span>
  );
}

export default function AdminInventoryReceivingPage() {
  return (
    <AdminPageShell activeHref="/admin/inventory-receiving">
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-blue-950/40 p-6 shadow-2xl md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
              Gradeline Admin
            </p>
            <h1 className="mt-3 text-4xl font-black md:text-6xl">
              Inventory Receiving
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-300">
              Static receiving log for incoming materials, supplies, packaging,
              hardware, and ready-to-stock shop inventory.
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

      <section className={`${panelClassName} mt-6 p-5 md:p-6`}>
        <h2 className="text-2xl font-black">Receive Inventory</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <label className="block">
            <span className={labelClassName}>Receive Date</span>
            <input className={inputClassName} type="date" />
          </label>
          <label className="block">
            <span className={labelClassName}>Supplier</span>
            <input
              className={inputClassName}
              placeholder="Supplier or vendor"
            />
          </label>
          <label className="block">
            <span className={labelClassName}>Item Name</span>
            <input className={inputClassName} placeholder="Material or supply" />
          </label>
          <label className="block">
            <span className={labelClassName}>Category</span>
            <select className={inputClassName} defaultValue="">
              <option value="" disabled>
                Select category
              </option>
              {categories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className={labelClassName}>Quantity Received</span>
            <input className={inputClassName} placeholder="0" type="number" />
          </label>
          <label className="block">
            <span className={labelClassName}>Unit Cost</span>
            <input className={inputClassName} placeholder="$0.00" />
          </label>
          <label className="block">
            <span className={labelClassName}>Total Cost</span>
            <input className={inputClassName} placeholder="$0.00" />
          </label>
          <label className="block">
            <span className={labelClassName}>Storage Location</span>
            <input className={inputClassName} placeholder="Rack, shelf, bin" />
          </label>
          <label className="block md:col-span-2 lg:col-span-4">
            <span className={labelClassName}>Notes</span>
            <textarea
              className={`${inputClassName} min-h-28 resize-y`}
              placeholder="Receiving notes, quality check, batch details, or storage reminders"
            />
          </label>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            className="rounded-xl bg-blue-400 px-6 py-3 font-bold text-black transition hover:bg-blue-300"
          >
            Save Demo Receiving
          </button>
          <button
            type="button"
            className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-bold text-white transition hover:border-blue-300/40 hover:bg-blue-400/10"
          >
            Update Inventory Placeholder
          </button>
        </div>
      </section>

      <div className={`${panelClassName} mt-6 overflow-hidden`}>
        <div className="hidden overflow-x-auto xl:block">
          <table className="w-full border-collapse text-left">
            <thead className="border-b border-white/10 bg-black/30 text-xs font-bold uppercase tracking-widest text-blue-300">
              <tr>
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4">Supplier</th>
                <th className="px-5 py-4">Item</th>
                <th className="px-5 py-4">Category</th>
                <th className="px-5 py-4">Qty</th>
                <th className="px-5 py-4">Unit Cost</th>
                <th className="px-5 py-4">Total</th>
                <th className="px-5 py-4">Location</th>
                <th className="px-5 py-4">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {receivingHistory.map((record) => (
                <tr
                  key={`${record.receiveDate}-${record.itemName}`}
                  className="bg-white/[0.02] transition hover:bg-white/[0.06]"
                >
                  <td className="px-5 py-4 font-black text-white">
                    {record.receiveDate}
                  </td>
                  <td className="px-5 py-4 text-zinc-300">
                    {record.supplier}
                  </td>
                  <td className="px-5 py-4 text-zinc-200">
                    {record.itemName}
                  </td>
                  <td className="px-5 py-4">
                    <CategoryBadge category={record.category} />
                  </td>
                  <td className="px-5 py-4 text-zinc-300">
                    {record.quantityReceived}
                  </td>
                  <td className="px-5 py-4 text-zinc-300">
                    {record.unitCost}
                  </td>
                  <td className="px-5 py-4 font-black text-white">
                    {record.totalCost}
                  </td>
                  <td className="px-5 py-4 text-zinc-300">
                    {record.storageLocation}
                  </td>
                  <td className="px-5 py-4 text-zinc-500">{record.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid gap-4 p-4 xl:hidden">
          {receivingHistory.map((record) => (
            <article
              key={`${record.receiveDate}-${record.itemName}`}
              className="rounded-2xl border border-white/10 bg-black/30 p-5"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-blue-300">
                    {record.receiveDate} / {record.supplier}
                  </p>
                  <h2 className="mt-2 text-xl font-black text-white">
                    {record.itemName}
                  </h2>
                  <p className="mt-2 text-zinc-300">
                    Stored at {record.storageLocation}
                  </p>
                </div>
                <CategoryBadge category={record.category} />
              </div>

              <div className="mt-5 grid gap-3 text-sm text-zinc-300 sm:grid-cols-2">
                <p>
                  <span className="font-bold text-zinc-500">Quantity: </span>
                  {record.quantityReceived}
                </p>
                <p>
                  <span className="font-bold text-zinc-500">Unit Cost: </span>
                  {record.unitCost}
                </p>
                <p>
                  <span className="font-bold text-zinc-500">Total Cost: </span>
                  {record.totalCost}
                </p>
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-xs font-bold uppercase tracking-widest text-blue-300">
                  Notes
                </p>
                <p className="mt-2 leading-7 text-zinc-300">{record.notes}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </AdminPageShell>
  );
}

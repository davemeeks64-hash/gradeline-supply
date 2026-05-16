import Link from "next/link";
import AdminPageShell from "@/components/AdminPageShell";

type OrderType =
  | "Custom Order"
  | "Stock Product"
  | "Event Sale"
  | "Online Sale"
  | "Local Sale";

type SaleRecord = {
  saleNumber: string;
  date: string;
  customer: string;
  itemProduct: string;
  collection: string;
  quantitySold: number;
  salePrice: string;
  materialCost: string;
  profit: string;
  paymentMethod: string;
  orderType: OrderType;
};

const sales: SaleRecord[] = [
  {
    saleNumber: "SALE-2026-018",
    date: "May 16",
    customer: "Iron Ridge Welding",
    itemProduct: "Cow Tags - Blackout Set",
    collection: "Industrial & Blue Collar",
    quantitySold: 12,
    salePrice: "$144.00",
    materialCost: "$39.00",
    profit: "$105.00",
    paymentMethod: "Card",
    orderType: "Stock Product",
  },
  {
    saleNumber: "SALE-2026-017",
    date: "May 15",
    customer: "Morgan Hayes",
    itemProduct: "Walnut Recipe Board",
    collection: "Home & Kitchen",
    quantitySold: 1,
    salePrice: "$95.00",
    materialCost: "$18.50",
    profit: "$76.50",
    paymentMethod: "Cash",
    orderType: "Custom Order",
  },
  {
    saleNumber: "SALE-2026-016",
    date: "May 14",
    customer: "Walk-up Customer",
    itemProduct: "Blue Collar Keychains",
    collection: "Industrial & Blue Collar",
    quantitySold: 8,
    salePrice: "$80.00",
    materialCost: "$16.80",
    profit: "$63.20",
    paymentMethod: "Card",
    orderType: "Event Sale",
  },
  {
    saleNumber: "SALE-2026-015",
    date: "May 13",
    customer: "Northline Auto",
    itemProduct: "Shop Logo Display Sign",
    collection: "Business & Commercial",
    quantitySold: 1,
    salePrice: "$160.00",
    materialCost: "$42.00",
    profit: "$118.00",
    paymentMethod: "Invoice",
    orderType: "Custom Order",
  },
  {
    saleNumber: "SALE-2026-014",
    date: "May 12",
    customer: "Sarah Bennett",
    itemProduct: "Personalized Tumbler",
    collection: "Custom Gifts",
    quantitySold: 2,
    salePrice: "$56.00",
    materialCost: "$14.80",
    profit: "$41.20",
    paymentMethod: "Online Checkout",
    orderType: "Online Sale",
  },
  {
    saleNumber: "SALE-2026-013",
    date: "May 11",
    customer: "Jensen Family",
    itemProduct: "Memorial Keepsake Box",
    collection: "Custom Works",
    quantitySold: 1,
    salePrice: "$240.00",
    materialCost: "$68.00",
    profit: "$172.00",
    paymentMethod: "Cash",
    orderType: "Local Sale",
  },
];

const summaryCards = [
  { label: "Total Sales", value: "$775", detail: "Demo recent sales value" },
  { label: "Units Sold", value: "25", detail: "Ready-made and custom units" },
  { label: "Demo Profit", value: "$576", detail: "Estimated gross profit" },
  { label: "Custom Orders", value: "3", detail: "Sales tied to custom work" },
];

const panelClassName =
  "rounded-3xl border border-white/10 bg-white/[0.04] shadow-[0_18px_45px_rgba(0,0,0,0.28)]";

const cardClassName =
  "rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.24)]";

const typeClassNames: Record<OrderType, string> = {
  "Custom Order": "border-blue-300/50 bg-blue-400/10 text-blue-200",
  "Stock Product": "border-cyan-300/50 bg-cyan-400/10 text-cyan-200",
  "Event Sale": "border-amber-300/50 bg-amber-400/10 text-amber-200",
  "Online Sale": "border-emerald-300/50 bg-emerald-400/10 text-emerald-200",
  "Local Sale": "border-zinc-300/50 bg-zinc-300/10 text-zinc-200",
};

function OrderTypeBadge({ orderType }: { orderType: OrderType }) {
  return (
    <span
      className={[
        "inline-flex w-fit rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-widest",
        typeClassNames[orderType],
      ].join(" ")}
    >
      {orderType}
    </span>
  );
}

export default function AdminSalesPage() {
  return (
    <AdminPageShell activeHref="/admin/sales">
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-blue-950/40 p-6 shadow-2xl md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
              Gradeline Admin
            </p>
            <h1 className="mt-3 text-4xl font-black md:text-6xl">Sales</h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-300">
              Demo sales tracking for ready-made stock products, custom orders,
              event sales, online sales, and local shop purchases.
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

      <div className={`${panelClassName} mt-6 overflow-hidden`}>
        <div className="hidden overflow-x-auto xl:block">
          <table className="w-full border-collapse text-left">
            <thead className="border-b border-white/10 bg-black/30 text-xs font-bold uppercase tracking-widest text-blue-300">
              <tr>
                <th className="px-5 py-4">Sale</th>
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4">Customer</th>
                <th className="px-5 py-4">Item/Product</th>
                <th className="px-5 py-4">Collection</th>
                <th className="px-5 py-4">Qty</th>
                <th className="px-5 py-4">Sale Price</th>
                <th className="px-5 py-4">Material Cost</th>
                <th className="px-5 py-4">Profit</th>
                <th className="px-5 py-4">Payment</th>
                <th className="px-5 py-4">Type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {sales.map((sale) => (
                <tr
                  key={sale.saleNumber}
                  className="bg-white/[0.02] transition hover:bg-white/[0.06]"
                >
                  <td className="px-5 py-4 font-black text-white">
                    {sale.saleNumber}
                  </td>
                  <td className="px-5 py-4 text-zinc-300">{sale.date}</td>
                  <td className="px-5 py-4 text-zinc-300">{sale.customer}</td>
                  <td className="px-5 py-4 text-zinc-200">
                    {sale.itemProduct}
                  </td>
                  <td className="px-5 py-4 text-zinc-400">
                    {sale.collection}
                  </td>
                  <td className="px-5 py-4 text-zinc-300">
                    {sale.quantitySold}
                  </td>
                  <td className="px-5 py-4 font-black text-white">
                    {sale.salePrice}
                  </td>
                  <td className="px-5 py-4 text-zinc-300">
                    {sale.materialCost}
                  </td>
                  <td className="px-5 py-4 font-black text-blue-200">
                    {sale.profit}
                  </td>
                  <td className="px-5 py-4 text-zinc-300">
                    {sale.paymentMethod}
                  </td>
                  <td className="px-5 py-4">
                    <OrderTypeBadge orderType={sale.orderType} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid gap-4 p-4 xl:hidden">
          {sales.map((sale) => (
            <article
              key={sale.saleNumber}
              className="rounded-2xl border border-white/10 bg-black/30 p-5"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-blue-300">
                    {sale.saleNumber} / {sale.date}
                  </p>
                  <h2 className="mt-2 text-xl font-black text-white">
                    {sale.itemProduct}
                  </h2>
                  <p className="mt-2 text-zinc-300">{sale.customer}</p>
                </div>
                <OrderTypeBadge orderType={sale.orderType} />
              </div>

              <div className="mt-5 grid gap-3 text-sm text-zinc-300 sm:grid-cols-2">
                <p>
                  <span className="font-bold text-zinc-500">Collection: </span>
                  {sale.collection}
                </p>
                <p>
                  <span className="font-bold text-zinc-500">Quantity: </span>
                  {sale.quantitySold}
                </p>
                <p>
                  <span className="font-bold text-zinc-500">Sale Price: </span>
                  {sale.salePrice}
                </p>
                <p>
                  <span className="font-bold text-zinc-500">
                    Material Cost:{" "}
                  </span>
                  {sale.materialCost}
                </p>
                <p>
                  <span className="font-bold text-zinc-500">Profit: </span>
                  {sale.profit}
                </p>
                <p>
                  <span className="font-bold text-zinc-500">Payment: </span>
                  {sale.paymentMethod}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </AdminPageShell>
  );
}

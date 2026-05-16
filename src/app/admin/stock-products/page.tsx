import Link from "next/link";
import AdminPageShell from "@/components/AdminPageShell";

type StockProduct = {
  productName: string;
  collection: string;
  material: string;
  quantityMade: number;
  quantitySold: number;
  quantityOnHand: number;
  cost: string;
  salePrice: string;
  profit: string;
  fileLocation: string;
};

const stockProducts: StockProduct[] = [
  {
    productName: "Blue Collar Bling Key Tags",
    collection: "Industrial & Blue Collar",
    material: "Brushed aluminum",
    quantityMade: 40,
    quantitySold: 24,
    quantityOnHand: 16,
    cost: "$3.25",
    salePrice: "$12.00",
    profit: "$210.00",
    fileLocation: "/stock/blue-collar-bling/key-tags.svg",
  },
  {
    productName: "Walnut Recipe Board Blank",
    collection: "Home & Kitchen",
    material: "Walnut",
    quantityMade: 12,
    quantitySold: 7,
    quantityOnHand: 5,
    cost: "$18.50",
    salePrice: "$64.00",
    profit: "$318.50",
    fileLocation: "/stock/home-kitchen/recipe-board.lbrn2",
  },
  {
    productName: "Slate Coaster Set",
    collection: "Custom Gifts",
    material: "Black slate",
    quantityMade: 30,
    quantitySold: 18,
    quantityOnHand: 12,
    cost: "$7.60",
    salePrice: "$28.00",
    profit: "$367.20",
    fileLocation: "/stock/custom-gifts/slate-coasters.svg",
  },
  {
    productName: "Shop Logo Display Sign",
    collection: "Business & Commercial",
    material: "Clear acrylic",
    quantityMade: 8,
    quantitySold: 3,
    quantityOnHand: 5,
    cost: "$22.00",
    salePrice: "$85.00",
    profit: "$189.00",
    fileLocation: "/stock/business-commercial/logo-display.lbrn2",
  },
  {
    productName: "Trade Motto Wall Plate",
    collection: "Custom Works",
    material: "Walnut plywood",
    quantityMade: 15,
    quantitySold: 9,
    quantityOnHand: 6,
    cost: "$9.75",
    salePrice: "$38.00",
    profit: "$254.25",
    fileLocation: "/stock/custom-works/trade-motto.svg",
  },
];

const summaryCards = [
  { label: "Stock SKUs", value: "42", detail: "Ready-made product designs" },
  { label: "Made Ahead", value: "105", detail: "Demo finished units" },
  { label: "On Hand", value: "44", detail: "Available stock products" },
  { label: "Demo Profit", value: "$1,338", detail: "Estimated sold profit" },
];

const panelClassName =
  "rounded-3xl border border-white/10 bg-white/[0.04] shadow-[0_18px_45px_rgba(0,0,0,0.28)]";

const cardClassName =
  "rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.24)]";

function StockLevelBadge({ quantityOnHand }: { quantityOnHand: number }) {
  const isLow = quantityOnHand <= 5;

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

export default function AdminStockProductsPage() {
  return (
    <AdminPageShell activeHref="/admin/stock-products">
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-blue-950/40 p-6 shadow-2xl md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
              Gradeline Admin
            </p>
            <h1 className="mt-3 text-4xl font-black md:text-6xl">
              Stock Products
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-300">
              Demo tracking for ready-made designs and products built ahead for
              quick sale, repeat batches, and shop inventory.
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
                <th className="px-5 py-4">Product</th>
                <th className="px-5 py-4">Collection</th>
                <th className="px-5 py-4">Material</th>
                <th className="px-5 py-4">Made</th>
                <th className="px-5 py-4">Sold</th>
                <th className="px-5 py-4">On Hand</th>
                <th className="px-5 py-4">Cost</th>
                <th className="px-5 py-4">Sale</th>
                <th className="px-5 py-4">Profit</th>
                <th className="px-5 py-4">File</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {stockProducts.map((product) => (
                <tr
                  key={product.productName}
                  className="bg-white/[0.02] transition hover:bg-white/[0.06]"
                >
                  <td className="px-5 py-4 font-black text-white">
                    {product.productName}
                  </td>
                  <td className="px-5 py-4 text-zinc-300">
                    {product.collection}
                  </td>
                  <td className="px-5 py-4 text-zinc-300">
                    {product.material}
                  </td>
                  <td className="px-5 py-4 text-zinc-300">
                    {product.quantityMade}
                  </td>
                  <td className="px-5 py-4 text-zinc-300">
                    {product.quantitySold}
                  </td>
                  <td className="px-5 py-4">
                    <StockLevelBadge quantityOnHand={product.quantityOnHand} />
                  </td>
                  <td className="px-5 py-4 text-zinc-300">{product.cost}</td>
                  <td className="px-5 py-4 font-black text-white">
                    {product.salePrice}
                  </td>
                  <td className="px-5 py-4 font-black text-blue-200">
                    {product.profit}
                  </td>
                  <td className="px-5 py-4 text-zinc-500">
                    {product.fileLocation}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid gap-4 p-4 xl:hidden">
          {stockProducts.map((product) => (
            <article
              key={product.productName}
              className="rounded-2xl border border-white/10 bg-black/30 p-5"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-blue-300">
                    {product.collection}
                  </p>
                  <h2 className="mt-2 text-xl font-black text-white">
                    {product.productName}
                  </h2>
                  <p className="mt-2 text-zinc-300">{product.material}</p>
                </div>
                <StockLevelBadge quantityOnHand={product.quantityOnHand} />
              </div>

              <div className="mt-5 grid gap-3 text-sm text-zinc-300 sm:grid-cols-2">
                <p>
                  <span className="font-bold text-zinc-500">Made: </span>
                  {product.quantityMade}
                </p>
                <p>
                  <span className="font-bold text-zinc-500">Sold: </span>
                  {product.quantitySold}
                </p>
                <p>
                  <span className="font-bold text-zinc-500">Cost: </span>
                  {product.cost}
                </p>
                <p>
                  <span className="font-bold text-zinc-500">Sale Price: </span>
                  {product.salePrice}
                </p>
                <p>
                  <span className="font-bold text-zinc-500">Profit: </span>
                  {product.profit}
                </p>
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-xs font-bold uppercase tracking-widest text-blue-300">
                  File Location
                </p>
                <p className="mt-2 break-all text-sm leading-6 text-zinc-300">
                  {product.fileLocation}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </AdminPageShell>
  );
}

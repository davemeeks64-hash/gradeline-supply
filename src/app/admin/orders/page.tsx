import Link from "next/link";
import AdminSidebar from "@/components/AdminSidebar";

type OrderStatus =
  | "New"
  | "Pending Design"
  | "Approved"
  | "File Ready"
  | "In Production"
  | "Finished"
  | "Delivered";

type DemoOrder = {
  orderNumber: string;
  customer: string;
  product: string;
  collection: string;
  dueDate: string;
  status: OrderStatus;
  estimatedPrice: string;
};

const demoOrders: DemoOrder[] = [
  {
    orderNumber: "GL-1048",
    customer: "Iron Ridge Welding",
    product: "Engraved shop tags",
    collection: "Business & Commercial",
    dueDate: "May 22",
    status: "New",
    estimatedPrice: "$185",
  },
  {
    orderNumber: "GL-1047",
    customer: "Morgan Hayes",
    product: "Walnut recipe board",
    collection: "Home & Kitchen",
    dueDate: "May 24",
    status: "Pending Design",
    estimatedPrice: "$95",
  },
  {
    orderNumber: "GL-1046",
    customer: "Union Local 218",
    product: "Blue collar slate awards",
    collection: "Industrial & Blue Collar",
    dueDate: "May 27",
    status: "Approved",
    estimatedPrice: "$420",
  },
  {
    orderNumber: "GL-1045",
    customer: "Northline Auto",
    product: "Acrylic counter sign",
    collection: "Business & Commercial",
    dueDate: "May 28",
    status: "File Ready",
    estimatedPrice: "$160",
  },
  {
    orderNumber: "GL-1044",
    customer: "Jensen Family",
    product: "Memorial keepsake box",
    collection: "Custom Gifts",
    dueDate: "May 29",
    status: "In Production",
    estimatedPrice: "$240",
  },
  {
    orderNumber: "GL-1043",
    customer: "Peakline Builders",
    product: "Branded leather patches",
    collection: "Custom Works",
    dueDate: "May 30",
    status: "Finished",
    estimatedPrice: "$310",
  },
  {
    orderNumber: "GL-1042",
    customer: "Sarah Bennett",
    product: "Personalized tumbler set",
    collection: "Custom Gifts",
    dueDate: "Delivered",
    status: "Delivered",
    estimatedPrice: "$75",
  },
];

const statusClassNames: Record<OrderStatus, string> = {
  New: "border-blue-300/50 bg-blue-400/10 text-blue-200",
  "Pending Design": "border-sky-300/50 bg-sky-400/10 text-sky-200",
  Approved: "border-emerald-300/50 bg-emerald-400/10 text-emerald-200",
  "File Ready": "border-cyan-300/50 bg-cyan-400/10 text-cyan-200",
  "In Production": "border-amber-300/50 bg-amber-400/10 text-amber-200",
  Finished: "border-zinc-300/50 bg-zinc-300/10 text-zinc-200",
  Delivered: "border-green-300/50 bg-green-400/10 text-green-200",
};

const panelClassName =
  "rounded-3xl border border-white/10 bg-white/[0.04] shadow-[0_18px_45px_rgba(0,0,0,0.28)]";

function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span
      className={[
        "inline-flex w-fit rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-widest",
        statusClassNames[status],
      ].join(" ")}
    >
      {status}
    </span>
  );
}

export default function AdminOrdersPage() {
  return (
    <main className="min-h-screen bg-[#05070a] text-white md:flex">
      <AdminSidebar activeHref="/admin/orders" />

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
                  Orders
                </h1>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-300">
                  Demo order queue for design review, file prep, production,
                  finishing, and delivery.
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

          <div className={`${panelClassName} mt-6 overflow-hidden`}>
            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full border-collapse text-left">
                <thead className="border-b border-white/10 bg-black/30 text-xs font-bold uppercase tracking-widest text-blue-300">
                  <tr>
                    <th className="px-5 py-4">Order</th>
                    <th className="px-5 py-4">Customer</th>
                    <th className="px-5 py-4">Product</th>
                    <th className="px-5 py-4">Collection</th>
                    <th className="px-5 py-4">Due</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4 text-right">Estimate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {demoOrders.map((order) => (
                    <tr
                      key={order.orderNumber}
                      className="bg-white/[0.02] transition hover:bg-white/[0.06]"
                    >
                      <td className="px-5 py-4 font-black text-white">
                        {order.orderNumber}
                      </td>
                      <td className="px-5 py-4 text-zinc-300">
                        {order.customer}
                      </td>
                      <td className="px-5 py-4 text-zinc-200">
                        {order.product}
                      </td>
                      <td className="px-5 py-4 text-zinc-400">
                        {order.collection}
                      </td>
                      <td className="px-5 py-4 text-zinc-300">
                        {order.dueDate}
                      </td>
                      <td className="px-5 py-4">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="px-5 py-4 text-right font-black text-white">
                        {order.estimatedPrice}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid gap-4 p-4 lg:hidden">
              {demoOrders.map((order) => (
                <article
                  key={order.orderNumber}
                  className="rounded-2xl border border-white/10 bg-black/30 p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-blue-300">
                        {order.orderNumber}
                      </p>
                      <h2 className="mt-2 text-xl font-black text-white">
                        {order.customer}
                      </h2>
                    </div>
                    <p className="text-lg font-black text-white">
                      {order.estimatedPrice}
                    </p>
                  </div>

                  <div className="mt-4 grid gap-3 text-sm text-zinc-300">
                    <p>
                      <span className="font-bold text-zinc-500">Product: </span>
                      {order.product}
                    </p>
                    <p>
                      <span className="font-bold text-zinc-500">
                        Collection:{" "}
                      </span>
                      {order.collection}
                    </p>
                    <p>
                      <span className="font-bold text-zinc-500">Due: </span>
                      {order.dueDate}
                    </p>
                  </div>

                  <div className="mt-4">
                    <StatusBadge status={order.status} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

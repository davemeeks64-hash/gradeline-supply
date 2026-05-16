import Link from "next/link";
import AdminSidebar from "@/components/AdminSidebar";

type CustomerType = "Retail" | "Custom" | "Business" | "Repeat Customer";

type Customer = {
  customerName: string;
  phone: string;
  email: string;
  company: string;
  cityState: string;
  totalOrders: number;
  lastOrder: string;
  customerType: CustomerType;
};

const summaryCards = [
  { label: "Total Customers", value: "186", detail: "Demo customer records" },
  { label: "Business Accounts", value: "42", detail: "Shops and companies" },
  { label: "Repeat Customers", value: "68", detail: "More than one order" },
  { label: "New This Month", value: "13", detail: "Fresh customer profiles" },
];

const customers: Customer[] = [
  {
    customerName: "Morgan Hayes",
    phone: "(555) 218-4401",
    email: "morgan@example.com",
    company: "Personal",
    cityState: "Peoria, IL",
    totalOrders: 2,
    lastOrder: "May 24",
    customerType: "Repeat Customer",
  },
  {
    customerName: "Caleb Turner",
    phone: "(555) 907-1128",
    email: "caleb@ironridge.test",
    company: "Iron Ridge Welding",
    cityState: "Davenport, IA",
    totalOrders: 6,
    lastOrder: "May 22",
    customerType: "Business",
  },
  {
    customerName: "Sarah Bennett",
    phone: "(555) 774-3090",
    email: "sarah@example.com",
    company: "Personal",
    cityState: "Bloomington, IL",
    totalOrders: 1,
    lastOrder: "May 18",
    customerType: "Retail",
  },
  {
    customerName: "Derek Jensen",
    phone: "(555) 640-8821",
    email: "derek@example.com",
    company: "Personal",
    cityState: "Cedar Rapids, IA",
    totalOrders: 1,
    lastOrder: "May 29",
    customerType: "Custom",
  },
  {
    customerName: "Alyssa Reed",
    phone: "(555) 330-1844",
    email: "alyssa@peakline.test",
    company: "Peakline Builders",
    cityState: "Rockford, IL",
    totalOrders: 9,
    lastOrder: "May 30",
    customerType: "Business",
  },
  {
    customerName: "Union Local 218",
    phone: "(555) 812-7218",
    email: "orders@local218.test",
    company: "Union Local 218",
    cityState: "Joliet, IL",
    totalOrders: 4,
    lastOrder: "May 27",
    customerType: "Repeat Customer",
  },
];

const panelClassName =
  "rounded-3xl border border-white/10 bg-white/[0.04] shadow-[0_18px_45px_rgba(0,0,0,0.28)]";

const cardClassName =
  "rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.24)]";

const typeClassNames: Record<CustomerType, string> = {
  Retail: "border-blue-300/50 bg-blue-400/10 text-blue-200",
  Custom: "border-cyan-300/50 bg-cyan-400/10 text-cyan-200",
  Business: "border-emerald-300/50 bg-emerald-400/10 text-emerald-200",
  "Repeat Customer": "border-amber-300/50 bg-amber-400/10 text-amber-200",
};

function CustomerTypeBadge({ customerType }: { customerType: CustomerType }) {
  return (
    <span
      className={[
        "inline-flex w-fit rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-widest",
        typeClassNames[customerType],
      ].join(" ")}
    >
      {customerType}
    </span>
  );
}

export default function AdminCustomersPage() {
  return (
    <main className="min-h-screen bg-[#05070a] text-white md:flex">
      <AdminSidebar activeHref="/admin/customers" />

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
                  Customers
                </h1>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-300">
                  Demo customer records for retail buyers, custom projects,
                  repeat customers, and business accounts.
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
                    <th className="px-5 py-4">Customer</th>
                    <th className="px-5 py-4">Phone</th>
                    <th className="px-5 py-4">Email</th>
                    <th className="px-5 py-4">Company</th>
                    <th className="px-5 py-4">City/State</th>
                    <th className="px-5 py-4">Orders</th>
                    <th className="px-5 py-4">Last Order</th>
                    <th className="px-5 py-4">Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {customers.map((customer) => (
                    <tr
                      key={`${customer.customerName}-${customer.email}`}
                      className="bg-white/[0.02] transition hover:bg-white/[0.06]"
                    >
                      <td className="px-5 py-4 font-black text-white">
                        {customer.customerName}
                      </td>
                      <td className="px-5 py-4 text-zinc-300">
                        {customer.phone}
                      </td>
                      <td className="px-5 py-4 text-zinc-400">
                        {customer.email}
                      </td>
                      <td className="px-5 py-4 text-zinc-300">
                        {customer.company}
                      </td>
                      <td className="px-5 py-4 text-zinc-300">
                        {customer.cityState}
                      </td>
                      <td className="px-5 py-4 font-black text-white">
                        {customer.totalOrders}
                      </td>
                      <td className="px-5 py-4 text-zinc-300">
                        {customer.lastOrder}
                      </td>
                      <td className="px-5 py-4">
                        <CustomerTypeBadge
                          customerType={customer.customerType}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid gap-4 p-4 xl:hidden">
              {customers.map((customer) => (
                <article
                  key={`${customer.customerName}-${customer.email}`}
                  className="rounded-2xl border border-white/10 bg-black/30 p-5"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h2 className="text-xl font-black text-white">
                        {customer.customerName}
                      </h2>
                      <p className="mt-2 text-zinc-300">{customer.company}</p>
                    </div>
                    <CustomerTypeBadge customerType={customer.customerType} />
                  </div>

                  <div className="mt-4 grid gap-3 text-sm text-zinc-300 sm:grid-cols-2">
                    <p>
                      <span className="font-bold text-zinc-500">Phone: </span>
                      {customer.phone}
                    </p>
                    <p>
                      <span className="font-bold text-zinc-500">Email: </span>
                      {customer.email}
                    </p>
                    <p>
                      <span className="font-bold text-zinc-500">
                        City/State:{" "}
                      </span>
                      {customer.cityState}
                    </p>
                    <p>
                      <span className="font-bold text-zinc-500">
                        Total Orders:{" "}
                      </span>
                      {customer.totalOrders}
                    </p>
                    <p>
                      <span className="font-bold text-zinc-500">
                        Last Order:{" "}
                      </span>
                      {customer.lastOrder}
                    </p>
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

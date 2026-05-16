import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

type CustomerRecord = Record<string, unknown>;

function formatCellValue(value: unknown) {
  if (value === null || value === undefined) {
    return "-";
  }

  if (typeof value === "object") {
    return JSON.stringify(value);
  }

  return String(value);
}

export default async function SupabaseTestPage() {
  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .limit(50);

  const customers = (data ?? []) as CustomerRecord[];
  const columns = customers[0] ? Object.keys(customers[0]) : [];

  return (
    <main className="min-h-screen bg-[#05070a] px-6 py-12 text-white">
      <section className="mx-auto max-w-7xl">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-blue-950/40 p-6 shadow-2xl md:p-10">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
            Supabase Test
          </p>
          <h1 className="mt-3 text-4xl font-black md:text-5xl">
            Customers Table
          </h1>
          <p className="mt-4 max-w-2xl leading-8 text-zinc-300">
            Test read from the Supabase customers table using the shared
            Gradeline client.
          </p>
        </div>

        {error && (
          <div className="mt-6 rounded-2xl border border-red-400/40 bg-red-500/10 p-5 text-red-100">
            <p className="font-bold">Supabase read failed.</p>
            <p className="mt-2 text-sm">{error.message}</p>
          </div>
        )}

        {!error && customers.length === 0 && (
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-zinc-300">
            No customers found.
          </div>
        )}

        {!error && customers.length > 0 && (
          <div className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-[0_18px_45px_rgba(0,0,0,0.28)]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] border-collapse text-left text-sm">
                <thead className="bg-black/40 text-xs uppercase tracking-widest text-blue-300">
                  <tr>
                    {columns.map((column) => (
                      <th key={column} className="px-4 py-4 font-bold">
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {customers.map((customer, index) => {
                    const rowKey =
                      typeof customer.id === "string" ||
                      typeof customer.id === "number"
                        ? String(customer.id)
                        : `customer-${index}`;

                    return (
                      <tr key={rowKey} className="text-zinc-300">
                        {columns.map((column) => (
                          <td key={column} className="px-4 py-4 align-top">
                            {formatCellValue(customer[column])}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

import Link from "next/link";

type DesignStatus =
  | "Idea"
  | "Mockup"
  | "Approved"
  | "Vector Ready"
  | "LightBurn Ready"
  | "Archived";

type DesignFile = {
  designName: string;
  customer: string;
  orderNumber: string;
  fileType: string;
  status: DesignStatus;
  mockupApproved: boolean;
  svgReady: boolean;
  lightBurnFileReady: boolean;
  finalExportReady: boolean;
  folderLocation: string;
};

const designFiles: DesignFile[] = [
  {
    designName: "Iron Ridge Tag Set",
    customer: "Iron Ridge Welding",
    orderNumber: "GL-1048",
    fileType: "AI / SVG",
    status: "Mockup",
    mockupApproved: false,
    svgReady: false,
    lightBurnFileReady: false,
    finalExportReady: false,
    folderLocation: "/orders/GL-1048/design",
  },
  {
    designName: "Union Slate Award Badge",
    customer: "Union Local 218",
    orderNumber: "GL-1046",
    fileType: "SVG",
    status: "Vector Ready",
    mockupApproved: true,
    svgReady: true,
    lightBurnFileReady: false,
    finalExportReady: false,
    folderLocation: "/orders/GL-1046/vector",
  },
  {
    designName: "Northline Counter Sign",
    customer: "Northline Auto",
    orderNumber: "GL-1045",
    fileType: "LBRN2",
    status: "LightBurn Ready",
    mockupApproved: true,
    svgReady: true,
    lightBurnFileReady: true,
    finalExportReady: false,
    folderLocation: "/orders/GL-1045/lightburn",
  },
  {
    designName: "Jensen Memorial Box Lid",
    customer: "Jensen Family",
    orderNumber: "GL-1044",
    fileType: "PNG / SVG",
    status: "Approved",
    mockupApproved: true,
    svgReady: false,
    lightBurnFileReady: false,
    finalExportReady: false,
    folderLocation: "/orders/GL-1044/mockups",
  },
  {
    designName: "Peakline Patch Batch",
    customer: "Peakline Builders",
    orderNumber: "GL-1043",
    fileType: "SVG / LBRN2",
    status: "Archived",
    mockupApproved: true,
    svgReady: true,
    lightBurnFileReady: true,
    finalExportReady: true,
    folderLocation: "/archive/GL-1043/final",
  },
  {
    designName: "Shop Motto Sign Concept",
    customer: "Walk-in Customer",
    orderNumber: "GL-1050",
    fileType: "Sketch",
    status: "Idea",
    mockupApproved: false,
    svgReady: false,
    lightBurnFileReady: false,
    finalExportReady: false,
    folderLocation: "/ideas/shop-motto-sign",
  },
];

const panelClassName =
  "rounded-3xl border border-white/10 bg-white/[0.04] shadow-[0_18px_45px_rgba(0,0,0,0.28)]";

const statusClassNames: Record<DesignStatus, string> = {
  Idea: "border-zinc-300/50 bg-zinc-300/10 text-zinc-200",
  Mockup: "border-blue-300/50 bg-blue-400/10 text-blue-200",
  Approved: "border-emerald-300/50 bg-emerald-400/10 text-emerald-200",
  "Vector Ready": "border-cyan-300/50 bg-cyan-400/10 text-cyan-200",
  "LightBurn Ready": "border-sky-300/50 bg-sky-400/10 text-sky-200",
  Archived: "border-amber-300/50 bg-amber-400/10 text-amber-200",
};

function StatusBadge({ status }: { status: DesignStatus }) {
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

function ReadyFlag({ label, ready }: { label: string; ready: boolean }) {
  return (
    <span
      className={[
        "inline-flex items-center justify-between gap-3 rounded-xl border px-3 py-2 text-xs font-bold uppercase tracking-widest",
        ready
          ? "border-blue-300/40 bg-blue-400/10 text-blue-200"
          : "border-white/10 bg-black/30 text-zinc-500",
      ].join(" ")}
    >
      {label}
      <span className={ready ? "text-blue-200" : "text-zinc-600"}>
        {ready ? "Ready" : "Open"}
      </span>
    </span>
  );
}

export default function AdminDesignsPage() {
  return (
    <main className="min-h-screen bg-[#05070a] text-white">
      <section className="relative overflow-hidden px-6 py-8 md:py-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,139,196,0.24),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(80,80,80,0.22),_transparent_36%)]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-blue-950/40 p-6 shadow-2xl md:p-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
                  Gradeline Admin
                </p>
                <h1 className="mt-3 text-4xl font-black md:text-6xl">
                  Designs & Files
                </h1>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-300">
                  Demo tracking for mockups, SVG prep, LightBurn files, final
                  exports, and archived design folders.
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
            <div className="hidden overflow-x-auto xl:block">
              <table className="w-full border-collapse text-left">
                <thead className="border-b border-white/10 bg-black/30 text-xs font-bold uppercase tracking-widest text-blue-300">
                  <tr>
                    <th className="px-5 py-4">Design</th>
                    <th className="px-5 py-4">Customer</th>
                    <th className="px-5 py-4">Order</th>
                    <th className="px-5 py-4">Type</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4">Mockup</th>
                    <th className="px-5 py-4">SVG</th>
                    <th className="px-5 py-4">LightBurn</th>
                    <th className="px-5 py-4">Final</th>
                    <th className="px-5 py-4">Folder</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {designFiles.map((file) => (
                    <tr
                      key={`${file.orderNumber}-${file.designName}`}
                      className="bg-white/[0.02] transition hover:bg-white/[0.06]"
                    >
                      <td className="px-5 py-4 font-black text-white">
                        {file.designName}
                      </td>
                      <td className="px-5 py-4 text-zinc-300">
                        {file.customer}
                      </td>
                      <td className="px-5 py-4 text-zinc-300">
                        {file.orderNumber}
                      </td>
                      <td className="px-5 py-4 text-zinc-400">
                        {file.fileType}
                      </td>
                      <td className="px-5 py-4">
                        <StatusBadge status={file.status} />
                      </td>
                      <td className="px-5 py-4 text-zinc-300">
                        {file.mockupApproved ? "Yes" : "No"}
                      </td>
                      <td className="px-5 py-4 text-zinc-300">
                        {file.svgReady ? "Yes" : "No"}
                      </td>
                      <td className="px-5 py-4 text-zinc-300">
                        {file.lightBurnFileReady ? "Yes" : "No"}
                      </td>
                      <td className="px-5 py-4 text-zinc-300">
                        {file.finalExportReady ? "Yes" : "No"}
                      </td>
                      <td className="px-5 py-4 text-zinc-500">
                        {file.folderLocation}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid gap-4 p-4 xl:hidden">
              {designFiles.map((file) => (
                <article
                  key={`${file.orderNumber}-${file.designName}`}
                  className="rounded-2xl border border-white/10 bg-black/30 p-5"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-blue-300">
                        {file.orderNumber} / {file.fileType}
                      </p>
                      <h2 className="mt-2 text-2xl font-black text-white">
                        {file.designName}
                      </h2>
                      <p className="mt-2 text-zinc-300">{file.customer}</p>
                    </div>
                    <StatusBadge status={file.status} />
                  </div>

                  <div className="mt-5 grid gap-2 sm:grid-cols-2">
                    <ReadyFlag
                      label="Mockup Approved"
                      ready={file.mockupApproved}
                    />
                    <ReadyFlag label="SVG Ready" ready={file.svgReady} />
                    <ReadyFlag
                      label="LightBurn Ready"
                      ready={file.lightBurnFileReady}
                    />
                    <ReadyFlag
                      label="Final Export"
                      ready={file.finalExportReady}
                    />
                  </div>

                  <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-xs font-bold uppercase tracking-widest text-blue-300">
                      Folder Location
                    </p>
                    <p className="mt-2 break-all text-sm leading-6 text-zinc-300">
                      {file.folderLocation}
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

import Link from "next/link";

type WorkflowStep =
  | "Design Approval"
  | "File Ready"
  | "Material Pulled"
  | "Laser Setup"
  | "In Production"
  | "Finish / Pack"
  | "Delivered";

type ProductionJob = {
  orderNumber: string;
  customer: string;
  product: string;
  material: string;
  dueDate: string;
  laserSettings: string;
  currentStep: WorkflowStep;
  productionNotes: string;
};

const workflowSteps: WorkflowStep[] = [
  "Design Approval",
  "File Ready",
  "Material Pulled",
  "Laser Setup",
  "In Production",
  "Finish / Pack",
  "Delivered",
];

const productionJobs: ProductionJob[] = [
  {
    orderNumber: "GL-1048",
    customer: "Iron Ridge Welding",
    product: "Engraved shop tags",
    material: "Brushed aluminum",
    dueDate: "May 22",
    laserSettings: "Fiber 40W / 72 speed / 38 power",
    currentStep: "Design Approval",
    productionNotes: "Waiting on final logo confirmation before file prep.",
  },
  {
    orderNumber: "GL-1046",
    customer: "Union Local 218",
    product: "Blue collar slate awards",
    material: "Black slate",
    dueDate: "May 27",
    laserSettings: "CO2 100W / 320 speed / 42 power",
    currentStep: "Material Pulled",
    productionNotes: "Slate blanks inspected; reserve two extras for testing.",
  },
  {
    orderNumber: "GL-1045",
    customer: "Northline Auto",
    product: "Acrylic counter sign",
    material: "Clear acrylic",
    dueDate: "May 28",
    laserSettings: "CO2 100W / 18 speed / 72 power",
    currentStep: "Laser Setup",
    productionNotes: "Mask front face and verify edge polish after cut.",
  },
  {
    orderNumber: "GL-1044",
    customer: "Jensen Family",
    product: "Memorial keepsake box",
    material: "Walnut",
    dueDate: "May 29",
    laserSettings: "Diode 20W / 2600 speed / 78 power",
    currentStep: "In Production",
    productionNotes: "Run lid engraving first, then finish with satin clear.",
  },
  {
    orderNumber: "GL-1043",
    customer: "Peakline Builders",
    product: "Branded leather patches",
    material: "Leatherette",
    dueDate: "May 30",
    laserSettings: "CO2 100W / 410 speed / 18 power",
    currentStep: "Finish / Pack",
    productionNotes: "Batch complete; count and sleeve in sets of 25.",
  },
];

const panelClassName =
  "rounded-3xl border border-white/10 bg-white/[0.04] shadow-[0_18px_45px_rgba(0,0,0,0.28)]";

const stepClassNames: Record<WorkflowStep, string> = {
  "Design Approval": "border-blue-300/50 bg-blue-400/10 text-blue-200",
  "File Ready": "border-cyan-300/50 bg-cyan-400/10 text-cyan-200",
  "Material Pulled": "border-sky-300/50 bg-sky-400/10 text-sky-200",
  "Laser Setup": "border-indigo-300/50 bg-indigo-400/10 text-indigo-200",
  "In Production": "border-amber-300/50 bg-amber-400/10 text-amber-200",
  "Finish / Pack": "border-zinc-300/50 bg-zinc-300/10 text-zinc-200",
  Delivered: "border-green-300/50 bg-green-400/10 text-green-200",
};

function StepBadge({ step }: { step: WorkflowStep }) {
  return (
    <span
      className={[
        "inline-flex w-fit rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-widest",
        stepClassNames[step],
      ].join(" ")}
    >
      {step}
    </span>
  );
}

export default function AdminProductionPage() {
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
                  Production Queue
                </h1>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-300">
                  Demo workflow for design approval, material prep, laser
                  setup, production, finishing, and delivery.
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

          <div className={`${panelClassName} mt-6 p-4 md:p-5`}>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {workflowSteps.map((step) => (
                <StepBadge key={step} step={step} />
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {productionJobs.map((job) => (
              <article key={job.orderNumber} className={`${panelClassName} p-5`}>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-blue-300">
                      {job.orderNumber}
                    </p>
                    <h2 className="mt-2 text-2xl font-black text-white">
                      {job.customer}
                    </h2>
                    <p className="mt-2 text-zinc-300">{job.product}</p>
                  </div>

                  <StepBadge step={job.currentStep} />
                </div>

                <div className="mt-5 grid gap-3 text-sm text-zinc-300 sm:grid-cols-2">
                  <p>
                    <span className="font-bold text-zinc-500">Material: </span>
                    {job.material}
                  </p>
                  <p>
                    <span className="font-bold text-zinc-500">Due: </span>
                    {job.dueDate}
                  </p>
                  <p className="sm:col-span-2">
                    <span className="font-bold text-zinc-500">
                      Laser Settings:{" "}
                    </span>
                    {job.laserSettings}
                  </p>
                </div>

                <div className="mt-5 rounded-2xl border border-white/10 bg-black/30 p-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-blue-300">
                    Production Notes
                  </p>
                  <p className="mt-2 leading-7 text-zinc-300">
                    {job.productionNotes}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

import Link from "next/link";
import AdminPageShell from "@/components/AdminPageShell";

type LaserSetting = {
  material: string;
  category: string;
  machine: string;
  power: string;
  speed: string;
  passes: string;
  airAssist: string;
  focusHeight: string;
  notes: string;
  bestFor: string;
};

const materialCategories = [
  "Leather",
  "Stone",
  "Acrylic",
  "Wood",
  "Drinkware",
];

const laserSettings: LaserSetting[] = [
  {
    material: "Veg tan leather",
    category: "Leather",
    machine: "CO2 100W",
    power: "18%",
    speed: "420 mm/s",
    passes: "1",
    airAssist: "Low",
    focusHeight: "0.0 mm",
    notes: "Mask light leather and test edge darkening before batch runs.",
    bestFor: "Patches, tags, keychains",
  },
  {
    material: "Slate",
    category: "Stone",
    machine: "CO2 100W",
    power: "42%",
    speed: "320 mm/s",
    passes: "1",
    airAssist: "Off",
    focusHeight: "+1.5 mm",
    notes: "Defocus slightly for smoother mark and wipe dust after engraving.",
    bestFor: "Awards, coasters, memorial pieces",
  },
  {
    material: "Acrylic",
    category: "Acrylic",
    machine: "CO2 100W",
    power: "72%",
    speed: "18 mm/s",
    passes: "1",
    airAssist: "Medium",
    focusHeight: "0.0 mm",
    notes: "Use masking on face and confirm flame polish on test corner.",
    bestFor: "Signs, displays, inserts",
  },
  {
    material: "Walnut plywood",
    category: "Wood",
    machine: "Diode 20W",
    power: "78%",
    speed: "2600 mm/min",
    passes: "1",
    airAssist: "High",
    focusHeight: "0.0 mm",
    notes: "Run grain direction test; seal after engraving for richer contrast.",
    bestFor: "Panels, signs, ornaments",
  },
  {
    material: "Cutting boards",
    category: "Wood",
    machine: "CO2 100W",
    power: "34%",
    speed: "280 mm/s",
    passes: "1",
    airAssist: "Medium",
    focusHeight: "+0.5 mm",
    notes: "Mask if deep char is unwanted; mineral oil after cleanup.",
    bestFor: "Recipe boards, gifts, kitchen goods",
  },
  {
    material: "Tumblers",
    category: "Drinkware",
    machine: "Fiber 40W",
    power: "38%",
    speed: "72 mm/s",
    passes: "1",
    airAssist: "Off",
    focusHeight: "Rotary focus",
    notes: "Confirm rotary level and run logo seam opposite handle mark.",
    bestFor: "Branded drinkware, gift sets",
  },
];

const panelClassName =
  "rounded-3xl border border-white/10 bg-white/[0.04] shadow-[0_18px_45px_rgba(0,0,0,0.28)]";

function CategoryBadge({ category }: { category: string }) {
  return (
    <span className="inline-flex w-fit rounded-full border border-blue-300/50 bg-blue-400/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-blue-200">
      {category}
    </span>
  );
}

export default function AdminLaserSettingsPage() {
  return (
    <AdminPageShell activeHref="/admin/laser-settings">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-blue-950/40 p-6 shadow-2xl md:p-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
                  Gradeline Admin
                </p>
                <h1 className="mt-3 text-4xl font-black md:text-6xl">
                  Laser Settings Library
                </h1>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-300">
                  Demo presets for material tests, production runs, and repeat
                  laser jobs across the shop.
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
              {materialCategories.map((category) => (
                <CategoryBadge key={category} category={category} />
              ))}
            </div>
          </div>

          <div className={`${panelClassName} mt-6 overflow-hidden`}>
            <div className="hidden overflow-x-auto xl:block">
              <table className="w-full border-collapse text-left">
                <thead className="border-b border-white/10 bg-black/30 text-xs font-bold uppercase tracking-widest text-blue-300">
                  <tr>
                    <th className="px-5 py-4">Material</th>
                    <th className="px-5 py-4">Machine</th>
                    <th className="px-5 py-4">Power</th>
                    <th className="px-5 py-4">Speed</th>
                    <th className="px-5 py-4">Passes</th>
                    <th className="px-5 py-4">Air</th>
                    <th className="px-5 py-4">Focus</th>
                    <th className="px-5 py-4">Best For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {laserSettings.map((setting) => (
                    <tr
                      key={setting.material}
                      className="bg-white/[0.02] transition hover:bg-white/[0.06]"
                    >
                      <td className="px-5 py-4">
                        <p className="font-black text-white">
                          {setting.material}
                        </p>
                        <p className="mt-1 text-xs uppercase tracking-widest text-blue-300">
                          {setting.category}
                        </p>
                      </td>
                      <td className="px-5 py-4 text-zinc-300">
                        {setting.machine}
                      </td>
                      <td className="px-5 py-4 font-black text-white">
                        {setting.power}
                      </td>
                      <td className="px-5 py-4 text-zinc-300">
                        {setting.speed}
                      </td>
                      <td className="px-5 py-4 text-zinc-300">
                        {setting.passes}
                      </td>
                      <td className="px-5 py-4 text-zinc-300">
                        {setting.airAssist}
                      </td>
                      <td className="px-5 py-4 text-zinc-300">
                        {setting.focusHeight}
                      </td>
                      <td className="px-5 py-4 text-zinc-400">
                        {setting.bestFor}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid gap-4 p-4 xl:hidden">
              {laserSettings.map((setting) => (
                <article
                  key={setting.material}
                  className="rounded-2xl border border-white/10 bg-black/30 p-5"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <CategoryBadge category={setting.category} />
                      <h2 className="mt-3 text-2xl font-black text-white">
                        {setting.material}
                      </h2>
                      <p className="mt-2 text-zinc-300">{setting.machine}</p>
                    </div>
                    <p className="text-lg font-black text-white">
                      {setting.power}
                    </p>
                  </div>

                  <div className="mt-5 grid gap-3 text-sm text-zinc-300 sm:grid-cols-2">
                    <p>
                      <span className="font-bold text-zinc-500">Speed: </span>
                      {setting.speed}
                    </p>
                    <p>
                      <span className="font-bold text-zinc-500">Passes: </span>
                      {setting.passes}
                    </p>
                    <p>
                      <span className="font-bold text-zinc-500">
                        Air Assist:{" "}
                      </span>
                      {setting.airAssist}
                    </p>
                    <p>
                      <span className="font-bold text-zinc-500">
                        Focus Height:{" "}
                      </span>
                      {setting.focusHeight}
                    </p>
                    <p className="sm:col-span-2">
                      <span className="font-bold text-zinc-500">
                        Best For:{" "}
                      </span>
                      {setting.bestFor}
                    </p>
                  </div>

                  <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-xs font-bold uppercase tracking-widest text-blue-300">
                      Notes
                    </p>
                    <p className="mt-2 leading-7 text-zinc-300">
                      {setting.notes}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
    </AdminPageShell>
  );
}


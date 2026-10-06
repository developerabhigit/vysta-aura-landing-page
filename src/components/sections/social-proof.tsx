import { Award, BatteryCharging, HeartPulse, Sparkles, type LucideIcon } from "lucide-react";

interface MetricItem {
  icon: LucideIcon;
  value: string;
  label: string;
}

const metrics: MetricItem[] = [
  {
    icon: HeartPulse,
    value: "99.4%",
    label: "Heart Rate Accuracy",
  },
  {
    icon: BatteryCharging,
    value: "7 Days",
    label: "Continuous Battery Life",
  },
  {
    icon: Award,
    value: "Grade 5",
    label: "Aerospace Titanium",
  },
  {
    icon: Sparkles,
    value: "10M+",
    label: "Sleep Hours Tracked",
  },
];

export function SocialProof() {
  return (
    <section className="border-y border-zinc-200 bg-zinc-50/70 py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-8">
          <p className="text-xs font-semibold tracking-wider text-zinc-700 uppercase">
            Recognized by Leading Tech & Health Publications
          </p>
          <div className="mt-4 flex flex-wrap justify-center items-center gap-8 sm:gap-14 text-zinc-600 font-bold text-sm sm:text-base tracking-tight">
            <span>TECHCRUNCH</span>
            <span>WIRED</span>
            <span>FORBES HEALTH</span>
            <span>THE VERGE</span>
            <span>GQ FITNESS</span>
          </div>
        </div>

        <div className="h-px w-full bg-zinc-200 mb-8" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {metrics.map((item: MetricItem, index: number) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex flex-col items-center">
                <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-200 text-zinc-900">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-zinc-950">
                  {item.value}
                </div>
                <div className="text-xs text-zinc-700 mt-1 font-medium">
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
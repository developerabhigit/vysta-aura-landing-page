import { Moon, ShieldCheck, BatteryCharging, Activity, type LucideIcon } from "lucide-react";
import { featuresContent, type FeaturesContent, type FeatureItem } from "@/data/landing-content";

const featureIconMap: Record<"moon" | "shield" | "battery" | "activity", LucideIcon> = {
  moon: Moon,
  shield: ShieldCheck,
  battery: BatteryCharging,
  activity: Activity,
};

interface FeaturesProps {
  content?: FeaturesContent;
}

export function Features({ content = featuresContent }: FeaturesProps) {
  const { badge, title, subtitle, items } = content;

  return (
    <section id="features" className="py-20 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            {badge}
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950">
            {title}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-600">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((item: FeatureItem, index: number) => {
            const Icon = featureIconMap[item.icon] ?? Activity;
            return (
              <div
                key={index}
                className="group relative rounded-2xl border border-zinc-200/90 bg-white p-8 transition-shadow hover:shadow-md"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-zinc-900 group-hover:bg-zinc-900 group-hover:text-white transition-colors duration-200">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-zinc-950">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
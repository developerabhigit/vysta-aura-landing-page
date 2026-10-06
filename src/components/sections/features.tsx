import { Moon, Activity, Flame, ShieldAlert, type LucideIcon } from "lucide-react";

interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

const featureList: FeatureItem[] = [
  {
    icon: Moon,
    title: "Deep Sleep Architecture",
    description:
      "Pinpoint your REM, light, and deep sleep cycles. Wake up refreshed with precise smart recovery insights every morning.",
  },
  {
    icon: Activity,
    title: "Continuous HRV & Heart Telemetry",
    description:
      "Track heart rate variability 24/7 to gauge autonomic nervous system balance and know exactly when your body needs rest.",
  },
  {
    icon: Flame,
    title: "Calorie & Metabolic Tracking",
    description:
      "Automated active calorie calculation based on continuous skin temperature and motion biometric sensors.",
  },
  {
    icon: ShieldAlert,
    title: "Early Illness & Stress Detection",
    description:
      "Detect micro-fluctuations in overnight skin temperature and resting heart rate before symptoms physically manifest.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            Engineered For Precision
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950">
            Intelligent Health Insights. Without Screen Addiction.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-600">
            No vibrating screens, no notification anxiety. Just clean, medical-grade biometrics quietly synchronizing with your phone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featureList.map((item: FeatureItem, index: number) => {
            const Icon = item.icon;
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
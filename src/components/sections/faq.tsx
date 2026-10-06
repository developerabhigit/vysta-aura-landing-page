interface FAQItem {
  q: string;
  a: string;
}

const faqs: FAQItem[] = [
  {
    q: "How do I find my exact ring size?",
    a: "Every order includes a complimentary Sizing Kit shipped first. Wear sample sizes for 24 hours to ensure a perfect fit, confirm your size in the app, and we'll dispatch your custom titanium ring immediately."
  },
  {
    q: "Is there a monthly subscription fee for the app?",
    a: "Zero subscriptions. Unlike other smart rings, Vysta Aura includes lifetime access to all app features, sleep analysis, and recovery tracking with no hidden charges.",
  },
  {
    q: "Can I wear Vysta Aura while swimming or showering?",
    a: "Yes. Vysta Aura is 5 ATM water-resistant (up to 50 meters). You can safely wear it in the shower, pool, ocean, or during intense sweaty workouts.",
  },
  {
    q: "What is the battery life and how does charging work?",
    a: "The ring delivers up to 7 days of continuous tracking on a single charge. The included magnetic dock charges the ring to 100% in approximately 60 minutes.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-20 bg-white border-t border-zinc-200">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            Frequently Asked Questions
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-zinc-950">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-sm text-zinc-600">
            Everything you need to know before ordering.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((item: FAQItem, index: number) => (
            <details
              key={index}
              className="group rounded-xl border border-zinc-200 bg-zinc-50/50 p-5 transition-colors open:bg-white open:shadow-sm"
            >
              <summary className="flex cursor-pointer items-center justify-between font-semibold text-zinc-900 list-none">
                <span className="text-base">{item.q}</span>
                <span className="ml-4 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-zinc-300 text-xs font-bold text-zinc-500 transition-transform duration-200 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600 border-t border-zinc-100 pt-3">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
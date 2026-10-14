"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { faqContent, type FAQContent } from "@/data/landing-content";

interface FAQProps {
  content?: FAQContent;
}

export function FAQ({ content = faqContent }: FAQProps) {
  const { badge, title, subtitle, items } = content;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="py-20 bg-white border-t border-zinc-200">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            {badge}
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-zinc-950">
            {title}
          </h2>
          <p className="mt-2 text-sm text-zinc-600">
            {subtitle}
          </p>
        </div>

        <div className="space-y-4">
          {items.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={cn(
                  "rounded-xl border transition-colors duration-200 p-5",
                  isOpen
                    ? "border-zinc-300 bg-white shadow-sm ring-1 ring-zinc-200/60"
                    : "border-zinc-200 bg-zinc-50/50 hover:bg-zinc-50"
                )}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(index)}
                  className="flex w-full cursor-pointer items-center justify-between text-left font-semibold text-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 rounded-lg select-none"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-question-${index}`}
                >
                  <span className="text-base text-zinc-950 font-semibold pr-2">
                    {item.question}
                  </span>
                  <span
                    className={cn(
                      "ml-4 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-zinc-300 text-xs font-bold text-zinc-500 transition-transform duration-300",
                      isOpen && "rotate-45 text-zinc-950 border-zinc-950"
                    )}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>

                <div
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  className="grid transition-[grid-template-rows] duration-300 ease-out"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                  }}
                >
                  <div className="overflow-hidden min-h-0">
                    <p className="mt-3 text-sm leading-relaxed text-zinc-600 border-t border-zinc-100 pt-3">
                      {item.answer}
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
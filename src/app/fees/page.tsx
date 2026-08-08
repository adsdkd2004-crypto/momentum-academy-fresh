import { Check } from "lucide-react";

const PLANS = [
  {
    name: "Monthly",
    price: "₹1,600",
    period: "/ month",
    features: [
      "All four subjects included",
      "Mathematics, Science, English, Social Science",
      "Handwritten notes & DPPs",
      "Regular tests",
    ],
    highlight: false,
  },
  {
    name: "Annual Course",
    price: "₹16,000",
    period: "/ year",
    features: [
      "All four subjects included",
      "Two months' savings vs. monthly",
      "Handwritten notes & DPPs",
      "Regular tests",
      "Installments available — ask us",
    ],
    highlight: true,
  },
];

export default function FeesPage() {
  return (
    <section className="container-app py-14">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">Fee Structure</p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-navy-700 dark:text-paper sm:text-4xl">
          Simple, transparent pricing
        </h1>
        <p className="mt-3 text-navy-700/75 dark:text-paper/75">
          One fee covers every subject — no hidden add-ons.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-2xl gap-6 sm:grid-cols-2">
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className={`card p-8 ${
              plan.highlight ? "border-2 border-momentum-500" : ""
            }`}
          >
            {plan.highlight && (
              <span className="rounded-full bg-momentum-50 px-3 py-1 text-xs font-semibold text-momentum-700 dark:bg-momentum-500/10 dark:text-momentum-300">
                Best value
              </span>
            )}
            <h3 className="mt-4 font-display text-lg font-semibold text-navy-700 dark:text-paper">
              {plan.name}
            </h3>
            <p className="mt-2">
              <span className="font-display text-3xl font-bold text-navy-700 dark:text-paper">
                {plan.price}
              </span>
              <span className="text-sm text-navy-700/60 dark:text-paper/60">
                {" "}
                {plan.period}
              </span>
            </p>
            <ul className="mt-6 space-y-3">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-navy-700/75 dark:text-paper/75">
                  <Check size={16} className="mt-0.5 shrink-0 text-momentum-500" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

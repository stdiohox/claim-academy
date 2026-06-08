import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

type Tier = {
  label: string;
  labelColor?: string;
  price: string;
  was?: string;
  payment: string;
  features: string[];
  cta: string;
  featured?: boolean;
};

const TIERS: Tier[] = [
  {
    label: "LAUNCH · FIRST 5 SEATS",
    price: "$2,997",
    was: "reg. $3,499",
    payment: "From $249/mo with Climb Credit",
    features: [
      "4-week bootcamp (1 track)",
      "8-week guaranteed internship",
      "Claude AI Tutor 24/7",
      "CV review + career coaching",
      "Portfolio projects + certificate",
      "30-day money-back guarantee",
    ],
    cta: "Get Started →",
  },
  {
    label: "PROFESSIONAL · BEST VALUE",
    labelColor: "#602889",
    price: "$3,997",
    payment: "From $333/mo · Ascent deferred · Splitit 0%",
    features: [
      "Everything in Launch",
      "Both tracks (Engineering + Builders)",
      "Weekly 1:1 coaching call",
      "Priority employer matching",
      "LinkedIn profile rewrite by Claude AI",
      "3 AI-simulated mock interviews",
      "6-month post-program job support",
    ],
    cta: "Claim Your Spot →",
    featured: true,
  },
  {
    label: "ELITE · MAXIMUM SUPPORT",
    price: "$4,997",
    payment: "From $416/mo · ISA available — $0 upfront",
    features: [
      "Everything in Professional",
      "Dedicated Claude AI Career Coach",
      "Guaranteed interviews at 3+ employers",
      "VIP alumni network + mentor matching",
      "Personalised 6-month AI career roadmap",
      "Employer intro letters from Ola personally",
      "Salary negotiation coaching",
    ],
    cta: "Get Started →",
  },
];

export function Pricing() {
  return (
    <section id="pricing" style={{ backgroundColor: "var(--brand-white)", paddingTop: "64px", paddingBottom: "48px" }}>
      <div className="container-x">
        <h2
          className="font-display font-bold text-center"
          style={{ fontSize: "var(--text-3xl)", letterSpacing: "-0.01em", color: "#000000" }}
        >
          Pick your level of support
        </h2>
        <p
          className="mt-4 text-center mx-auto max-w-[480px]"
          style={{ fontSize: "var(--text-lg)", color: "var(--brand-body-text)" }}
        >
          All tiers include the guaranteed employer internship. Difference is support level.
        </p>

        <div className="mt-14 grid md:grid-cols-3 gap-6 items-start">
          {TIERS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease, delay: i * 0.08 }}
              className="relative bg-white rounded-xl p-8"
              style={
                t.featured
                  ? {
                      border: "1px solid #602889",
                      borderTopWidth: 3,
                      borderTopColor: "#602889",
                      boxShadow: "0 8px 40px rgba(96,40,137,0.15)",
                      paddingBlock: "2.75rem",
                    }
                  : { border: "1px solid var(--brand-gray-200)" }
              }
            >
              {t.featured && (
                <span
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded text-[11px] text-white"
                  style={{
                    background: "linear-gradient(138deg, #602889 0%, #C51BDB 100%)",
                    fontFamily: "var(--font-mono)",
                    letterSpacing: "0.08em",
                  }}
                >
                  MOST POPULAR
                </span>
              )}
              <p
                className="text-[11px] uppercase"
                style={{ fontFamily: "var(--font-mono)", color: t.labelColor ?? "var(--brand-body-text)", letterSpacing: "0.1em" }}
              >
                {t.label}
              </p>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-display font-bold" style={{ fontSize: 48, lineHeight: 1, color: "#000000" }}>
                  {t.price}
                </span>
                {t.was && (
                  <span className="text-[14px] line-through" style={{ color: "var(--brand-body-text)" }}>{t.was}</span>
                )}
              </div>
              <p className="mt-2 text-[13px]" style={{ color: "var(--brand-body-text)" }}>{t.payment}</p>

              <ul className="mt-6 space-y-3">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[14px]" style={{ color: "var(--brand-body-text)" }}>
                    <span className="mt-0.5" style={{ color: "var(--brand-gold-dark)" }}>✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#lead-form"
                className="mt-7 block w-full text-center rounded-md py-3.5 font-semibold transition-all duration-150 hover:scale-[1.01]"
                style={
                  t.featured
                    ? { backgroundColor: "#FFB71B", color: "#000000" }
                    : { border: "1px solid #602889", color: "#602889", backgroundColor: "white" }
                }
                onMouseEnter={(e) => {
                  if (t.featured) e.currentTarget.style.backgroundColor = "#F7901B";
                }}
                onMouseLeave={(e) => {
                  if (t.featured) e.currentTarget.style.backgroundColor = "#FFB71B";
                }}
              >
                {t.cta}
              </a>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 text-center text-[15px]" style={{ color: "var(--brand-body-text)" }}>
          8 ways to pay — including $0 out-of-pocket options.{" "}
          <a href="#lead-form" className="hover:underline font-medium" style={{ color: "#602889" }}>
            See all payment options →
          </a>
        </div>
        <div className="mt-8 flex flex-wrap gap-x-4 gap-y-2 justify-center text-[13px] font-medium" style={{ color: "#000000" }}>
          <span>✓ 30-day money back</span>
          <span style={{ color: "var(--brand-body-text)" }}>·</span>
          <span>✓ Placement guarantee in writing</span>
          <span style={{ color: "var(--brand-body-text)" }}>·</span>
          <span>✓ 2:1 employer ratio</span>
        </div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { CountUp } from "./CountUp";

const ease = [0.16, 1, 0.3, 1] as const;

const CARDS = [
  {
    stat: <><CountUp end={5} /><span>.4 months</span></>,
    title: "The average job search without real experience",
    body: "Without an employer reference and deployed projects, most AI candidates never get past the first round.",
  },
  {
    stat: <CountUp end={200} suffix="+" />,
    title: "Applications sent before landing a single offer",
    body: "A certificate alone doesn't close the gap. Employers want proof you can build and ship — not proof you watched videos.",
  },
  {
    stat: <span>0</span>,
    title: "Other AI programs that guarantee an employer in writing",
    body: "Everyone claims results. We're the only program in the US that puts the internship guarantee in your enrollment contract.",
  },
];

export function Problem() {
  return (
    <section style={{ backgroundColor: "#FFFFFF", paddingTop: "48px", paddingBottom: "64px" }}>
      <div className="container-x">
        <h2
          className="font-display font-bold text-center"
          style={{ fontSize: "var(--text-4xl)", lineHeight: 1.1, letterSpacing: "-0.01em", color: "#000000" }}
        >
          You've been trying to break<br className="hidden md:inline" /> into AI for months. Still stuck.
        </h2>
        <p
          className="mt-4 text-center mx-auto max-w-[560px]"
          style={{ fontSize: "var(--text-lg)", color: "var(--brand-body-text)" }}
        >
          Most bootcamps give you a certificate. Nobody gives you an employer. Until now.
        </p>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {CARDS.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease, delay: i * 0.1 }}
              className="bg-white rounded-lg p-8"
              style={{
                border: "1px solid var(--brand-gray-200)",
                borderTop: "3px solid var(--brand-gold)",
              }}
            >
              <div
                className="font-display font-bold"
                style={{ fontSize: 48, lineHeight: 1, color: "#602889", fontFamily: "var(--font-mono)" }}
              >
                {c.stat}
              </div>
              <h3
                className="font-display font-semibold mt-5"
                style={{ fontSize: 18, color: "#000000" }}
              >
                {c.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed" style={{ color: "var(--brand-body-text)" }}>
                {c.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

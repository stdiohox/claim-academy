import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const FAQS = [
  {
    q: "Do I need prior coding experience?",
    a: "No. The Builders Track requires zero coding background. The Engineering Track starts from absolute foundations. If you can think logically and commit to 10 hours per week, you qualify.",
    tag: "Eligibility",
  },
  {
    q: "What if I don't get placed — really?",
    a: "You receive a full refund. This is written into your enrollment contract before you pay a dollar. We maintain 2 confirmed employer partners per student before any cohort opens specifically to ensure this never happens.",
    tag: "Guarantee",
  },
  {
    q: "Can my employer pay for this?",
    a: "Yes. Under IRS Section 127, US employers can provide up to $5,250 per year in tax-free education benefits. 67% of Fortune 1000 companies offer this. We generate the full paperwork package — invoice, compliance letter, and HR email template — in minutes.",
    tag: "Payment",
  },
  {
    q: "What is the difference between the two tracks?",
    a: "The Engineering Track targets AI Engineer and AI Architect roles — you build with Python, Claude API, LangGraph, RAG systems, and FastAPI. The Builders Track targets AI Product Manager and AI Builder roles — you build with Lovable.dev, n8n, Supabase, and Cursor. Both include the guaranteed internship.",
    tag: "Program",
  },
  {
    q: "When does the next cohort start?",
    a: "Summer 2026 runs two cohorts. Cohort A (CS graduates): training July 6 – August 1, 10 AM ET. Cohort B (working professionals): training August 3 – 28, 7 PM ET. All sessions are recorded.",
    tag: "Schedule",
  },
  {
    q: "How is this different from every other AI bootcamp?",
    a: "One sentence: we are the only AI program in the United States that guarantees a real employer internship in writing. Every other program gives you a certificate. We give you a certificate, a vetted employer, documented work experience, and a founder reference — or your money back.",
    tag: "Differentiator",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<Set<number>>(new Set([0, 1]));

  function toggle(i: number) {
    setOpen(prev => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  }

  return (
    <section
      style={{
        backgroundColor: "#F9F7F4",
        paddingTop: "56px",
        paddingBottom: "64px",
      }}
    >
      <div className="container-x">

        {/* Two-column layout */}
        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{
            gap: "80px",
            alignItems: "start",
          }}
        >

          {/* Left — sticky label block */}
          <div className="md:sticky" style={{ top: "120px" }}>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: "11px",
                color: "#FFB71B",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              Common questions
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "var(--text-3xl)",
                color: "#000000",
                letterSpacing: "-0.025em",
                lineHeight: 1.1,
              }}
            >
              Everything you<br />need to know.
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "15px",
                color: "#AAAAAA",
                marginTop: "16px",
                lineHeight: 1.7,
                maxWidth: "320px",
              }}
            >
              Still have questions? Book a free strategy call and we'll answer everything before you commit.
            </p>
            <a
              href="#lead-form"
              style={{
                display: "inline-block",
                marginTop: "28px",
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: "13px",
                color: "#000000",
                textDecoration: "none",
                backgroundColor: "#FFB71B",
                padding: "12px 24px",
                borderRadius: "6px",
                transition: "background 150ms",
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#F7901B")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#FFB71B")}
            >
              Book a free call →
            </a>
          </div>

          {/* Right — accordion */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {FAQS.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.4, ease, delay: i * 0.06 }}
                style={{
                  borderBottom: "1px solid #E8E8E8",
                  overflow: "hidden",
                }}
              >
                <button
                  onClick={() => toggle(i)}
                  aria-expanded={open.has(i)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "16px",
                    padding: "28px 0",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {/* Tag */}
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "10px",
                        fontWeight: 600,
                        color: open.has(i) ? "#FFB71B" : "#CCCCCC",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        transition: "color 150ms",
                      }}
                    >
                      {faq.tag}
                    </span>
                    {/* Question */}
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        fontSize: "17px",
                        color: open.has(i) ? "#000000" : "#222222",
                        letterSpacing: "-0.01em",
                        lineHeight: 1.3,
                        transition: "color 150ms",
                      }}
                    >
                      {faq.q}
                    </span>
                  </div>

                  {/* Toggle icon */}
                  <div
                    style={{
                      flexShrink: 0,
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      backgroundColor: open.has(i) ? "#FFB71B" : "#F0F0F0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "background 150ms",
                      marginTop: "2px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "16px",
                        fontWeight: 400,
                        color: open.has(i) ? "#000000" : "#888888",
                        lineHeight: 1,
                        transform: open.has(i) ? "rotate(45deg)" : "rotate(0deg)",
                        transition: "transform 200ms, color 150ms",
                        display: "block",
                        marginTop: "-1px",
                      }}
                    >
                      +
                    </span>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {open.has(i) && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <p
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "15px",
                          color: "#555555",
                          lineHeight: 1.75,
                          paddingBottom: "28px",
                          maxWidth: "480px",
                        }}
                      >
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

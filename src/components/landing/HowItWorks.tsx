import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const PHASES = [
  {
    number: "01",
    label: "PHASE ONE",
    title: "Live AI Bootcamp",
    date: "Jul 6 – Aug 1, 2026 · Cohort A",
    body: "Three live sessions per week, 60 minutes each. All recordings included. Two tracks run simultaneously — choose the one that fits your background.",
    tracks: [
      { name: "Engineering Track", detail: "Claude API · LangGraph · RAG Systems · FastAPI · Supabase" },
      { name: "Builders Track", detail: "Cursor · Lovable.dev · n8n · Supabase · Claude.ai Projects" },
    ],
    footer: "You ship 4 deployed projects with live URLs before the internship begins.",
    side: "left",
  },
  {
    number: "02",
    label: "PHASE TWO",
    title: "Guaranteed Employer Internship",
    date: "Aug 3 – Sep 26, 2026 · 8 weeks",
    body: "Placed at a vetted US employer before Week 5 ends. Real projects. Real GitHub commits. Real founder reference on LinkedIn.",
    guarantee: "Full refund if we don't place you within 2 weeks of bootcamp completion. This is written into your enrollment contract.",
    footer: "We maintain 2 confirmed employer partners per student before any cohort opens.",
    side: "right",
  },
  {
    number: "03",
    label: "PHASE THREE",
    title: "Career Activation",
    date: "Lifetime · Included in all tiers",
    body: "Your support doesn't end at graduation. Every student gets a full career toolkit to land the role.",
    bullets: [
      "CV + LinkedIn profile rewrite by AI",
      "3 AI-simulated mock interviews",
      "Personalized job search strategy",
      "Salary negotiation coaching",
      "6-month post-program job support (Pro/Elite)",
      "Lifetime alumni community + monthly AI updates",
    ],
    side: "left",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how"
      className="pt-16 md:pt-[120px] pb-10 md:pb-12"
      style={{
        backgroundColor: "#F7F6FC",
      }}
    >
      <div className="container-x">

        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: "100px" }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "var(--text-4xl)",
              color: "#000000",
              letterSpacing: "-0.03em",
              lineHeight: 1.08,
            }}
          >
            12 weeks. Real training.<br />Real employer. Real career.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "17px",
              color: "#888888",
              marginTop: "16px",
              lineHeight: 1.6,
            }}
          >
            Three phases. One guaranteed outcome.
          </p>
        </div>

        {/* Phases */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {PHASES.map((phase, i) => {
            const isLeft = phase.side === "left";
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease, delay: i * 0.08 }}
                className="grid grid-cols-1 md:grid-cols-2"
                style={{
                  gap: "0",
                  minHeight: "340px",
                  borderTop: "1px solid #F0F0F0",
                  borderBottom: i === PHASES.length - 1 ? "1px solid #F0F0F0" : "none",
                  alignItems: "stretch",
                }}
              >
                {/* Content column */}
                <div
                  className={`${isLeft ? "order-first md:order-first md:pr-[72px]" : "order-first md:order-last md:pl-[72px]"}`}
                  style={{
                    paddingTop: "48px",
                    paddingBottom: "64px",
                    borderRight: isLeft ? "1px solid #F0F0F0" : "none",
                    borderLeft: isLeft ? "none" : "1px solid #F0F0F0",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
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
                    {phase.label}
                  </p>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 800,
                      fontSize: "clamp(28px, 3vw, 42px)",
                      color: "#000000",
                      letterSpacing: "-0.025em",
                      lineHeight: 1.08,
                    }}
                  >
                    {phase.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "13px",
                      color: "#AAAAAA",
                      marginTop: "10px",
                      letterSpacing: "0.01em",
                    }}
                  >
                    {phase.date}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "16px",
                      color: "#666666",
                      lineHeight: 1.75,
                      marginTop: "20px",
                      maxWidth: "480px",
                    }}
                  >
                    {phase.body}
                  </p>

                  {/* Tracks */}
                  {phase.tracks && (
                    <div
                      style={{
                        marginTop: "28px",
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "16px",
                        maxWidth: "520px",
                      }}
                    >
                      {phase.tracks.map(t => (
                        <div
                          key={t.name}
                          style={{
                            backgroundColor: "#FBF6EA",
                            borderRadius: "10px",
                            padding: "18px 20px",
                            border: "1px solid #EFE4CC",
                            borderTop: "2px solid #FFB71B",
                          }}
                        >
                          <p
                            style={{
                              fontFamily: "var(--font-display)",
                              fontWeight: 700,
                              fontSize: "13px",
                              color: "#000000",
                              letterSpacing: "-0.01em",
                            }}
                          >
                            {t.name}
                          </p>
                          <p
                            style={{
                              fontFamily: "var(--font-body)",
                              fontSize: "12px",
                              color: "#777777",
                              marginTop: "8px",
                              lineHeight: 1.6,
                            }}
                          >
                            {t.detail.split(" · ").map((tool, i) => (
                              <span key={i} style={{ display: "block" }}>{tool}</span>
                            ))}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Guarantee box */}
                  {phase.guarantee && (
                    <div
                      style={{
                        marginTop: "24px",
                        backgroundColor: "#FFFBF0",
                        borderLeft: "3px solid #FFB71B",
                        padding: "16px 20px",
                        borderRadius: "0 8px 8px 0",
                        maxWidth: "480px",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "var(--font-body)",
                          fontWeight: 500,
                          fontSize: "14px",
                          color: "#333333",
                          lineHeight: 1.6,
                          margin: 0,
                        }}
                      >
                        {phase.guarantee}
                      </p>
                    </div>
                  )}

                  {/* Bullet list */}
                  {phase.bullets && (
                    <ul style={{ marginTop: "24px", display: "flex", flexDirection: "column", gap: "10px", listStyle: "none", padding: 0 }}>
                      {phase.bullets.map(b => (
                        <li
                          key={b}
                          style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "15px",
                            color: "#555555",
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "10px",
                            lineHeight: 1.5,
                          }}
                        >
                          <span style={{ color: "#FFB71B", fontWeight: 700, flexShrink: 0, marginTop: "1px" }}>→</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Footer line */}
                  {phase.footer && (
                    <p
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        fontSize: "14px",
                        color: "#000000",
                        marginTop: "28px",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {phase.footer}
                    </p>
                  )}
                </div>

                {/* Number watermark column */}
                <div
                  className={`hidden md:flex ${isLeft ? "md:order-last" : "md:order-first"}`}
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "64px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 900,
                      fontSize: "clamp(160px, 18vw, 240px)",
                      color: "#000000",
                      opacity: 0.16,
                      letterSpacing: "-0.05em",
                      lineHeight: 1,
                      userSelect: "none",
                      pointerEvents: "none",
                    }}
                  >
                    {phase.number}
                  </span>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

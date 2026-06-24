import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const ROLES = [
  {
    title: "AI Application Developer",
    tag: "Engineering Track",
    tagColor: "#602889",
    bullets: [
      "Build production AI features with the Claude API",
      "Design retrieval-augmented (RAG) systems over company data",
      "Ship LLM-powered apps with FastAPI and Supabase",
    ],
    salary: "~$70,000–$100,000 / year",
  },
  {
    title: "AI Automation Specialist",
    tag: "Builders Track",
    tagColor: "#F7901B",
    bullets: [
      "Design and deploy automated workflows with n8n",
      "Build AI agents that handle repetitive operations",
      "Eliminate manual bottlenecks across business tools",
    ],
    salary: "~$57,000–$98,000 / year",
  },
  {
    title: "AI Solutions Engineer",
    tag: "Growth Role",
    tagColor: "#1A8A5A",
    bullets: [
      "Prototype and validate AI features for teams and clients",
      "Tune prompts and pipelines for production reliability",
      "Bridge business needs and AI implementation",
    ],
    salary: "~$84,000–$120,000 / year",
  },
];

export function CareerOutcomes() {
  return (
    <section style={{ backgroundColor: "#F7F6FC", paddingTop: "64px", paddingBottom: "72px" }}>
      <div className="container-x">

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "var(--text-3xl)",
              color: "#000000",
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
            }}
          >
            High-Growth, High-Demand AI Careers
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "16px",
              color: "#888888",
              marginTop: "16px",
              maxWidth: "560px",
              margin: "16px auto 0",
              lineHeight: 1.65,
            }}
          >
            Our graduates don't just learn AI — they ship it. While salaries and roles vary by
            experience and location, here's the kind of work — and pay — our program is built
            to prepare you for.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ROLES.map((role, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease, delay: i * 0.08 }}
              style={{
                backgroundColor: "#FBF6EA",
                borderRadius: "12px",
                padding: "28px 28px 24px",
                border: "1px solid #EFE4CC",
                borderTop: "2px solid #FFB71B",
                display: "flex",
                flexDirection: "column",
                gap: "0",
              }}
            >
              {/* Tag */}
              <span
                style={{
                  display: "inline-block",
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  fontSize: "11px",
                  color: role.tagColor,
                  backgroundColor: `${role.tagColor}14`,
                  padding: "3px 10px",
                  borderRadius: "100px",
                  letterSpacing: "0.04em",
                  marginBottom: "14px",
                  alignSelf: "flex-start",
                }}
              >
                {role.tag}
              </span>

              {/* Title */}
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "20px",
                  color: "#000000",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.2,
                  marginBottom: "16px",
                }}
              >
                {role.title}
              </h3>

              {/* Bullets */}
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
                {role.bullets.map((b) => (
                  <li
                    key={b}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "14px",
                      color: "#555555",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "8px",
                      lineHeight: 1.5,
                    }}
                  >
                    <span style={{ color: "#FFB71B", fontWeight: 700, flexShrink: 0, marginTop: "1px" }}>→</span>
                    {b}
                  </li>
                ))}
              </ul>

              {/* Salary */}
              <div
                style={{
                  marginTop: "auto",
                  paddingTop: "20px",
                  borderTop: "1px solid #EFE4CC",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#AAAAAA",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginBottom: "4px",
                  }}
                >
                  Typical Salary Range
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "22px",
                    color: "#602889",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.2,
                  }}
                >
                  {role.salary}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "12px",
            color: "#BBBBBB",
            textAlign: "center",
            marginTop: "32px",
            maxWidth: "680px",
            margin: "32px auto 0",
            lineHeight: 1.6,
          }}
        >
          Salary figures reflect US national averages from public sources (ZipRecruiter, Glassdoor,
          2026) and are not a guarantee of employment or earnings. Individual outcomes vary by
          experience, location, and market conditions.
        </p>

      </div>
    </section>
  );
}

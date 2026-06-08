const TRACKS = {
  engineering: {
    label: "Engineering Track",
    roles: ["AI Engineer", "AI Architect"],
    tools: ["Claude API", "LangGraph", "RAG", "FastAPI", "Supabase", "Langfuse"],
    weeks: [
      { week: "Week 1", focus: "Claude API · Streaming · Prompt Engineering · Eval Frameworks" },
      { week: "Week 2", focus: "RAG Pipeline · Vector DBs · Supabase pgvector · AI Memory" },
      { week: "Week 3", focus: "Multi-Agent Systems · LangGraph · n8n · MCP Servers" },
      { week: "Week 4", focus: "Portfolio Project · Demo Day · AI Architect Document" },
    ],
    callout: "You leave with: 4 deployed projects, a live URL, and a production-ready GitHub portfolio.",
  },
  builders: {
    label: "Builders Track",
    roles: ["AI Product Manager", "AI Builder"],
    tools: ["Cursor", "Lovable.dev", "n8n", "Supabase", "Claude.ai"],
    weeks: [
      { week: "Week 1", focus: "Cursor AI Coding · Claude.ai Projects · Deploy First AI Feature" },
      { week: "Week 2", focus: "RAG Chatbot · Supabase pgvector · Automated Ingestion" },
      { week: "Week 3", focus: "n8n Visual Agent Builder · Autonomous Agents · Human-in-Loop" },
      { week: "Week 4", focus: "Full-Stack Sprint · Demo Day · Product Presentation" },
    ],
    callout: "No prior coding required. You leave with a full-stack AI product at a live URL.",
  },
};

export function Tracks() {
  return (
    <section
      style={{
        backgroundColor: "#F8F8F8",
        paddingTop: "32px",
        paddingBottom: "100px",
      }}
    >
      <div className="container-x">
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "var(--text-3xl)",
            color: "#000000",
            textAlign: "center",
            letterSpacing: "-0.025em",
            marginBottom: "12px",
          }}
        >
          Choose your path into AI
        </h2>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "16px",
            color: "#888888",
            textAlign: "center",
            marginBottom: "56px",
          }}
        >
          Both tracks include the guaranteed employer internship.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
          }}
        >
          {Object.entries(TRACKS).map(([key, t]) => (
            <div
              key={key}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "16px",
                padding: "40px",
                border: "1px solid #EEEEEE",
                display: "flex",
                flexDirection: "column",
                gap: "0",
              }}
            >
              {/* Track header */}
              <div
                style={{
                  borderBottom: "2px solid #FFB71B",
                  paddingBottom: "20px",
                  marginBottom: "28px",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: "22px",
                    color: "#000000",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {t.label}
                </h3>

                {/* Role pills */}
                <div style={{ display: "flex", gap: "8px", marginTop: "12px", flexWrap: "wrap" }}>
                  {t.roles.map(r => (
                    <span
                      key={r}
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "12px",
                        fontWeight: 500,
                        color: "#602889",
                        backgroundColor: "rgba(96,40,137,0.08)",
                        padding: "4px 12px",
                        borderRadius: "100px",
                      }}
                    >
                      {r}
                    </span>
                  ))}
                </div>

                {/* Tool pills */}
                <div style={{ display: "flex", gap: "6px", marginTop: "12px", flexWrap: "wrap" }}>
                  {t.tools.map(tool => (
                    <span
                      key={tool}
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "11px",
                        color: "#888888",
                        backgroundColor: "#F5F5F5",
                        padding: "3px 10px",
                        borderRadius: "4px",
                      }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Week by week */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                {t.weeks.map((w, i) => (
                  <div
                    key={w.week}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "72px 1fr",
                      gap: "16px",
                      padding: "16px 0",
                      borderBottom: i < t.weeks.length - 1 ? "1px solid #F5F5F5" : "none",
                      alignItems: "start",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontWeight: 600,
                        fontSize: "12px",
                        color: "#FFB71B",
                        letterSpacing: "0.02em",
                        paddingTop: "1px",
                      }}
                    >
                      {w.week}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "14px",
                        color: "#444444",
                        lineHeight: 1.5,
                      }}
                    >
                      {w.focus}
                    </span>
                  </div>
                ))}
              </div>

              {/* Callout */}
              <div
                style={{
                  marginTop: "28px",
                  padding: "16px 20px",
                  backgroundColor: "#FFFBF0",
                  borderLeft: "3px solid #FFB71B",
                  borderRadius: "0 8px 8px 0",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 500,
                    fontSize: "13px",
                    color: "#333333",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {t.callout}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

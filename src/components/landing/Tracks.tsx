type Week = { week: string; title: string; plain: string; focus: string };

type Track = {
  label: string;
  roles: string[];
  tools: string[];
  weeks: Week[];
  callout: string;
};

const TRACKS: Record<string, Track> = {
  engineering: {
    label: "Engineering Track",
    roles: ["AI Engineer", "AI Architect"],
    tools: ["Claude API", "LangGraph", "RAG", "FastAPI", "Supabase", "Langfuse"],
    weeks: [
      {
        week: "Week 1",
        title: "Make AI Talk to Your App",
        plain: "Connect to a real AI model, get it responding live word-by-word, write instructions that get reliable answers, and confirm it actually works.",
        focus: "Claude API · Streaming · Prompt Engineering · Eval Frameworks",
      },
      {
        week: "Week 2",
        title: "Give Your AI a Memory",
        plain: "Teach your AI to answer using your own documents and data — and remember past conversations instead of starting blank every time.",
        focus: "RAG Pipeline · Vector DBs · Supabase pgvector · AI Memory",
      },
      {
        week: "Week 3",
        title: "Build AI That Works on Its Own",
        plain: "Create AI agents that handle multi-step tasks by themselves and plug into the apps and tools you already use.",
        focus: "Multi-Agent Systems · LangGraph · n8n · MCP Servers",
      },
      {
        week: "Week 4",
        title: "Ship It and Show It Off",
        plain: "Bring it all together into a real, deployed project, document how you built it, and present it live on Demo Day.",
        focus: "Portfolio Project · Demo Day · AI Architect Document",
      },
    ],
    callout: "You leave with: 4 deployed projects, a live URL, and a production-ready GitHub portfolio.",
  },
  builders: {
    label: "Builders Track",
    roles: ["AI Product Manager", "AI Builder"],
    tools: ["Cursor", "Lovable.dev", "n8n", "Supabase", "Claude.ai"],
    weeks: [
      {
        week: "Week 1",
        title: "Build Your First AI Feature — No Code Needed",
        plain: "Use an AI assistant to write code alongside you, organize your work, and put your very first AI feature live on the internet.",
        focus: "Cursor AI Coding · Claude.ai Projects · First Deployment",
      },
      {
        week: "Week 2",
        title: "Create a Chatbot That Knows Your Stuff",
        plain: "Build a chatbot that answers from your own documents, and set it up to pull in new information automatically.",
        focus: "RAG Chatbot · Supabase pgvector · Automated Ingestion",
      },
      {
        week: "Week 3",
        title: "Automate the Boring Work",
        plain: "Visually build AI agents that run tasks on their own — with you stepping in to approve the decisions that matter.",
        focus: "n8n Visual Agent Builder · Autonomous Agents · Human-in-the-Loop",
      },
      {
        week: "Week 4",
        title: "Launch Your Full Product",
        plain: "Spend the week building a complete AI product end-to-end, then present it live on Demo Day.",
        focus: "Full-Stack Sprint · Demo Day · Product Presentation",
      },
    ],
    callout: "No prior coding required. You leave with a full-stack AI product at a live URL.",
  },
};

export function Tracks() {
  return (
    <section
      style={{
        backgroundColor: "#F8F8F8",
        paddingTop: "40px",
        paddingBottom: "64px",
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
          className="grid grid-cols-1 md:grid-cols-2"
          style={{
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
                        paddingTop: "3px",
                      }}
                    >
                      {w.week}
                    </span>
                    <div>
                      <p
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 700,
                          fontSize: "14px",
                          color: "#111111",
                          letterSpacing: "-0.01em",
                          margin: "0 0 4px",
                          lineHeight: 1.3,
                        }}
                      >
                        {w.title}
                      </p>
                      <p
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "13px",
                          color: "#888888",
                          lineHeight: 1.5,
                          margin: "0 0 8px",
                        }}
                      >
                        {w.plain}
                      </p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                        {w.focus.split(" · ").map((tag, j) => (
                          <span
                            key={j}
                            style={{
                              fontFamily: "var(--font-body)",
                              fontSize: "11px",
                              color: "#999999",
                              backgroundColor: "#F0F0F0",
                              padding: "2px 8px",
                              borderRadius: "4px",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
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

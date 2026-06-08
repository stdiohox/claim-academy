import { motion } from "framer-motion";
import { CountUp } from "./CountUp";

const ease = [0.16, 1, 0.3, 1] as const;

const TESTIMONIALS = [
  {
    quote: "After only my fourth week of classes, I got a job offer. My salary almost doubled from my last job.",
    name: "Claudia Sittman",
    career: "Java Developer at Salesforce / Slalom",
    prev: "Previously in sales",
    photo: "http://claimacademy.org/wp-content/uploads/2022/03/claudi_sittmann.jpeg",
  },
  {
    quote: "At the end of my twelve week course I am satisfied with Claim's claims. I'm personally recommending to friends and family.",
    name: "Brett Smith",
    career: "Software Developer at Anheuser-Busch",
    prev: "Career changer",
    photo: "http://claimacademy.org/wp-content/uploads/2022/03/brett-smith.jpeg",
  },
  {
    quote: "My experience at Claim Academy has been one of the best in my life. I gained a world-class experience in computer programming.",
    name: "Jessica Tucker",
    career: "Software Engineer II at Mastercard",
    prev: "Bootcamp graduate",
    photo: "http://claimacademy.org/wp-content/uploads/2022/03/jessica-tucker.jpeg",
  },
];

export function Testimonials() {
  return (
    <section
      style={{
        backgroundColor: "#F9F7F4",
        paddingTop: "64px",
        paddingBottom: "0",
      }}
    >
      <div className="container-x">

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "72px" }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "var(--text-3xl)",
              color: "#0A0A0A",
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
            }}
          >
            What our graduates say
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "16px",
              color: "#AAAAAA",
              marginTop: "12px",
            }}
          >
            Over 3,800 careers changed since 2013
          </p>
        </div>

        {/* Three testimonial cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{
            gap: "2px",
            backgroundColor: "#EBEBEB",
            borderRadius: "16px",
            overflow: "hidden",
          }}
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease, delay: i * 0.1 }}
              style={{
                backgroundColor: "#FFFFFF",
                padding: "44px 40px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "32px",
              }}
            >
              {/* Stars */}
              <div>
                <div
                  style={{
                    fontSize: "13px",
                    letterSpacing: "3px",
                    color: "#D4A843",
                    marginBottom: "20px",
                  }}
                >
                  ★★★★★
                </div>

                {/* Quote */}
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: "18px",
                    color: "#111111",
                    fontStyle: "italic",
                    lineHeight: 1.55,
                    letterSpacing: "-0.01em",
                  }}
                >
                  "{t.quote}"
                </p>
              </div>

              {/* Person */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  paddingTop: "24px",
                  borderTop: "1px solid #F0F0F0",
                }}
              >
                <img
                  src={t.photo}
                  alt={t.name}
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    flexShrink: 0,
                    border: "2px solid #F0F0F0",
                  }}
                />
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "14px",
                      color: "#111111",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {t.name}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "12px",
                      color: "#999999",
                      marginTop: "2px",
                    }}
                  >
                    {t.career}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Full-bleed bottom bar — stats left, statement right */}
        <div
          className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr]"
          style={{
            marginTop: "80px",
            marginInline: "calc(var(--section-padding-x) * -1)",
            background: "linear-gradient(135deg, #1A1A1A 0%, #0D0D0D 100%)",
            minHeight: "200px",
          }}
        >
          {/* Left — four stats */}
          <div
            className="grid grid-cols-2 lg:grid-cols-4 gap-0"
            style={{
              padding: "0 24px",
              alignItems: "center",
            }}
          >
            {[
              { value: 3800, suffix: "+", label: "Graduates" },
              { value: 87, suffix: "%", label: "Placement rate" },
              { value: 81310, prefix: "$", label: "Avg salary" },
              { value: 11, suffix: " yrs", label: "Operating" },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  textAlign: "center",
                  padding: "48px 8px",
                  borderRight: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: "clamp(18px, 2vw, 38px)",
                    color: "#FFFFFF",
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                    whiteSpace: "nowrap",
                  }}
                >
                  {s.prefix || ""}<CountUp end={s.value} />{s.suffix || ""}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "10px",
                    color: "rgba(255,255,255,0.30)",
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    marginTop: "8px",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Vertical divider */}
          <div className="hidden lg:block" style={{ backgroundColor: "rgba(255,255,255,0.06)" }} />

          {/* Right — bold statement + payment info */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "48px 64px",
              gap: "20px",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(22px, 2.5vw, 32px)",
                color: "#FFFFFF",
                letterSpacing: "-0.025em",
                lineHeight: 1.2,
              }}
            >
              8 ways to pay.<br />
              Including <span style={{ color: "#FFB71B" }}>$0 upfront</span>.
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "14px",
                color: "rgba(255,255,255,0.45)",
                lineHeight: 1.7,
                maxWidth: "360px",
              }}
            >
              From $249/mo with Climb Credit · Employer reimbursement up to $5,250 · ISA available · 30-day money back guarantee
            </p>
            <a
              href="#pricing"
              style={{
                display: "inline-block",
                alignSelf: "flex-start",
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: "13px",
                color: "#FFB71B",
                textDecoration: "none",
                letterSpacing: "0.02em",
                borderBottom: "1px solid rgba(255,183,27,0.35)",
                paddingBottom: "2px",
                transition: "border-color 150ms",
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "#FFB71B")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,183,27,0.35)")}
            >
              See all payment options →
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

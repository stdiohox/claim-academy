import { motion } from "framer-motion";
import { CountUp } from "./CountUp";

const ease = [0.16, 1, 0.3, 1] as const;

const TESTIMONIALS = [
  {
    quote: "After only my fourth week of classes, I got a job offer. My salary almost doubled from my last job.",
    name: "Claudia Sittman",
    career: "Java Developer at Salesforce / Slalom",
    prev: "Previously in sales",
    photo: "/images/testimonial-claudia-sittmann.jpg",
  },
  {
    quote: "At the end of my twelve week course I am satisfied with Claim's claims. I'm personally recommending to friends and family.",
    name: "Brett Smith",
    career: "Software Developer at Anheuser-Busch",
    prev: "Career changer",
    photo: "/images/testimonial-brett-smith.jpg",
  },
  {
    quote: "My experience at Claim Academy has been one of the best in my life. I gained a world-class experience in computer programming.",
    name: "Jessica Tucker",
    career: "Software Engineer II at Mastercard",
    prev: "Bootcamp graduate",
    photo: "/images/testimonial-jessica-tucker.jpg",
  },
];

export function Testimonials() {
  return (
    <section
      style={{
        backgroundColor: "#120820",
        paddingTop: "64px",
        paddingBottom: "48px",
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
              color: "#FFFFFF",
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
              color: "rgba(255,255,255,0.45)",
              marginTop: "12px",
            }}
          >
            Over 3,800 careers changed since 2013
          </p>
        </div>

        {/* Featured video testimonial */}
        {(() => {
          return (
            <div
              style={{
                marginBottom: "48px",
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.08)",
                backgroundColor: "rgba(255,255,255,0.03)",
              }}
            >
              <div
                className="grid grid-cols-1 lg:grid-cols-[3fr_2fr]"
                style={{ alignItems: "stretch" }}
              >
                {/* Video */}
                <div className="video-play-wrap" style={{ position: "relative" }}>
                  <video
                    controls
                    playsInline
                    preload="metadata"
                    poster="/videos/testimonial-video-poster.png"
                    aria-label="Graduate testimonial video — hear directly from a Claim Academy graduate"
                    style={{
                      width: "100%",
                      display: "block",
                      backgroundColor: "#0D0618",
                      maxHeight: "380px",
                      objectFit: "cover",
                    }}
                  >
                    <source src="/videos/main-testimonial-video.mp4" type="video/mp4" />
                    <track kind="captions" srcLang="en" label="English captions" default />
                    Your browser does not support the video tag.
                  </video>
                  <div className="main-video-play-overlay" aria-hidden="true">
                    <svg width="64" height="64" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="11" fill="rgba(0,0,0,0.55)" />
                      <path d="M9 7l8 5-8 5V7z" fill="white" />
                    </svg>
                  </div>
                </div>

                {/* Caption panel */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "40px 36px",
                    gap: "16px",
                  }}
                >
                  <div style={{ fontSize: "14px", letterSpacing: "3px", color: "#D4A843" }}>
                    ★★★★★
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 600,
                      fontSize: "18px",
                      color: "rgba(255,255,255,0.90)",
                      fontStyle: "italic",
                      lineHeight: 1.55,
                      letterSpacing: "-0.01em",
                      margin: 0,
                    }}
                  >
                    "Don't take our word for it — take theirs."
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "13px",
                      color: "rgba(255,255,255,0.40)",
                      margin: 0,
                    }}
                  >
                    Claim Academy Graduates
                  </p>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Three testimonial cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{
            gap: "2px",
            backgroundColor: "rgba(255,255,255,0.04)",
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
                backgroundColor: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "none",
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
                    color: "rgba(255,255,255,0.90)",
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
                  borderTop: "1px solid rgba(255,255,255,0.08)",
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
                    border: "2px solid rgba(255,255,255,0.12)",
                  }}
                />
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "14px",
                      color: "rgba(255,255,255,0.90)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {t.name}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "12px",
                      color: "rgba(255,255,255,0.40)",
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
            marginTop: "56px",
            marginInline: "calc(var(--section-padding-x) * -1)",
            background: "linear-gradient(135deg, rgba(96,40,137,0.25) 0%, rgba(18,8,32,0.0) 100%)",
            borderTop: "1px solid rgba(255,255,255,0.06)",
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

          {/* Right — gold payment callout card */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "40px 48px",
            }}
          >
            {/* Gold callout card */}
            <div
              style={{
                border: "2px solid #FFB71B",
                borderRadius: "14px",
                background: "linear-gradient(135deg, rgba(255,183,27,0.10) 0%, rgba(255,183,27,0.04) 100%)",
                padding: "32px 36px",
                display: "flex",
                flexDirection: "column",
                gap: "18px",
              }}
            >
              {/* Badge pill */}
              <div style={{ alignSelf: "flex-start" }}>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 700,
                    fontSize: "10px",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#000000",
                    backgroundColor: "#FFB71B",
                    padding: "4px 12px",
                    borderRadius: "100px",
                  }}
                >
                  $0 to start
                </span>
              </div>

              {/* Hook — $0 upfront dominates */}
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "clamp(38px, 5vw, 58px)",
                    color: "#FFB71B",
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                    margin: 0,
                  }}
                >
                  $0 upfront.
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: "clamp(16px, 1.8vw, 22px)",
                    color: "rgba(255,255,255,0.75)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.2,
                    marginTop: "8px",
                  }}
                >
                  8 flexible ways to pay.
                </p>
              </div>

              {/* Supporting detail */}
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.40)",
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                From $249/mo with Climb Credit · Employer reimbursement up to $5,250 · ISA available · 30-day money-back guarantee
              </p>

              {/* CTA */}
              <a
                href="#pricing"
                style={{
                  display: "inline-flex",
                  alignSelf: "flex-start",
                  alignItems: "center",
                  gap: "6px",
                  fontFamily: "var(--font-body)",
                  fontWeight: 700,
                  fontSize: "13px",
                  color: "#000000",
                  backgroundColor: "#FFB71B",
                  textDecoration: "none",
                  padding: "10px 20px",
                  borderRadius: "6px",
                  transition: "background-color 150ms",
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#F7901B")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#FFB71B")}
              >
                See all payment options →
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

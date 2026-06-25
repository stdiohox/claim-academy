import { motion } from "framer-motion";
import { CohortCountdown } from "@/components/landing/CohortCountdown";

const ease = [0.16, 1, 0.3, 1] as const;

const headlineWords = ["The", "Only", "AI", "Bootcamp", "That", "Guarantees", "You", "a", "Real", "Employer."];

export function Hero() {
  return (
    <section
      id="top"
      className="pt-20 md:pt-24 pb-16 md:pb-20"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "transparent",
      }}
    >
      {/* Dark base */}
      <div style={{ position: "absolute", inset: 0, backgroundColor: "#120820", zIndex: 0 }} />

      {/* Original purple-magenta gradient at reduced opacity */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(138deg, #602889 0%, #C51BDB 100%)",
        opacity: 0.40,
        zIndex: 1,
      }} />

      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ zIndex: 2, opacity: 0.20 }}
      >
        <source
          src="https://player.vimeo.com/progressive_redirect/playback/732177234/rendition/1080p/file.mp4?loc=external&signature=1d410882807932d9213b5d41b9402c931482611b3ea34f37e347bdfd4beb928e"
          type="video/mp4"
        />
      </video>

      <div className="container-x" style={{ position: "relative", zIndex: 3, width: "100%" }}>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[58%_42%] lg:gap-12 items-center">

          {/* LEFT */}
          <div style={{ position: "relative", zIndex: 3 }}>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease }}
            >
              <div style={{
                display: "inline-block",
                padding: "6px 18px",
                borderRadius: "100px",
                border: "1px solid rgba(255,255,255,0.20)",
                backgroundColor: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(8px)",
                color: "rgba(255,255,255,0.75)",
                fontSize: "12px",
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}>
                2026 Summer Cohorts — Now Open
              </div>
            </motion.div>

            {/* Headline */}
            <h1
              className="text-[var(--text-3xl)] lg:text-[var(--text-5xl)]"
              style={{
                lineHeight: 1.08,
                letterSpacing: "-0.035em",
                color: "white",
                fontWeight: 800,
                marginTop: "28px",
                fontFamily: "var(--font-display)",
              }}
            >
              {headlineWords.map((w, i) => (
                <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", marginRight: "0.25em" }}>
                  <motion.span
                    style={{
                      display: "inline-block",
                      color: w === "Guarantees" ? "#FFB71B" : "white",
                    }}
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.55, ease, delay: 0.1 + i * 0.06 }}
                  >
                    {w}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease, delay: 0.35 }}
              style={{
                fontSize: "18px",
                lineHeight: 1.65,
                color: "rgba(255,255,255,0.60)",
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                maxWidth: "520px",
                marginTop: "24px",
              }}
            >
              12 weeks. 4 weeks of live AI training. 8 weeks of guaranteed internship at a vetted US company. Or your money back — in writing.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease, delay: 0.5 }}
              style={{ marginTop: "36px", display: "flex", flexWrap: "wrap", gap: "12px" }}
            >
              <a
                href="#how"
                style={{
                  backgroundColor: "#FFB71B",
                  color: "#000000",
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  fontSize: "15px",
                  padding: "14px 32px",
                  borderRadius: "6px",
                  border: "none",
                  textDecoration: "none",
                  display: "inline-block",
                  transition: "background-color 150ms",
                  lineHeight: 1,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F7901B")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FFB71B")}
              >
                See How It Works
              </a>
              <a
                href="#lead-form"
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid rgba(255,255,255,0.22)",
                  color: "rgba(255,255,255,0.80)",
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  fontSize: "15px",
                  padding: "14px 32px",
                  borderRadius: "6px",
                  textDecoration: "none",
                  display: "inline-block",
                  transition: "border-color 150ms, color 150ms",
                  lineHeight: 1,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.45)";
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.80)";
                }}
              >
                Book a Free Strategy Call
              </a>
            </motion.div>

            <CohortCountdown variant="dark" />

          </div>

          {/* RIGHT — Proof Card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease, delay: 0.2 }}
            style={{
              position: "relative",
              zIndex: 1,
              background: "rgba(0,0,0,0.65)",
              backdropFilter: "blur(32px)",
              WebkitBackdropFilter: "blur(32px)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "16px",
              padding: "36px",
              boxShadow: "0 24px 64px rgba(0,0,0,0.50)",
              gap: "32px",
              alignItems: "center",
            }}
            className="proof-card-grid grid grid-cols-1 md:grid-cols-[1fr_1px_1fr]"
          >
            {/* Left col — checklist */}
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                "Guaranteed internship — in writing",
                "Real US employer, real projects",
                "2:1 employer-to-student ratio maintained",
                "Full refund if we don't place you",
              ].map((t) => (
                <li key={t} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                  <span style={{ color: "#FFB71B", flexShrink: 0, marginTop: "2px", fontSize: "13px" }}>✓</span>
                  <span style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 400,
                    fontSize: "15px",
                    color: "rgba(255,255,255,0.88)",
                    lineHeight: 1.5,
                  }}>{t}</span>
                </li>
              ))}
            </ul>

            {/* Vertical divider */}
            <div className="hidden md:block" style={{ width: "1px", height: "100%", backgroundColor: "rgba(255,255,255,0.10)", alignSelf: "stretch" }} />

            {/* Right col — price + CTA */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "stretch" }}>
              <p style={{
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                fontSize: "11px",
                color: "rgba(255,255,255,0.45)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                margin: 0,
              }}>Starting from</p>
              <p style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "42px",
                color: "white",
                lineHeight: 1,
                marginTop: "6px",
                letterSpacing: "-0.03em",
              }}>$2,997</p>
              <p style={{
                fontFamily: "var(--font-body)",
                fontSize: "12px",
                color: "rgba(255,255,255,0.40)",
                marginTop: "6px",
              }}>
                or from $249/mo with Climb Credit
              </p>
              <a
                href="#lead-form"
                style={{
                  display: "block",
                  textAlign: "center",
                  backgroundColor: "#FFB71B",
                  color: "#000000",
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  fontSize: "15px",
                  padding: "13px 24px",
                  borderRadius: "6px",
                  textDecoration: "none",
                  marginTop: "20px",
                  transition: "background-color 150ms",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F7901B")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FFB71B")}
              >
                Claim Your Spot
              </a>
              <p style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                fontSize: "11px",
                color: "rgba(255,255,255,0.35)",
                textAlign: "center",
                marginTop: "10px",
                letterSpacing: "0.03em",
              }}>
                Next cohort: Jul 6 · Limited seats
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

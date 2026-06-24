import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const LOGOS = [
  { name: "IBM", src: "http://claimacademy.org/wp-content/uploads/2021/12/logo_0000s_0000_ibm-logo.png" },
  { name: "Boeing", src: "http://claimacademy.org/wp-content/uploads/2021/12/logo_0000s_0001_boeing-logo-black.png" },
  { name: "Mastercard", src: "http://claimacademy.org/wp-content/uploads/2021/12/logo_0000s_0002_mastercard-logo-black.png" },
  { name: "Wells Fargo", src: "http://claimacademy.org/wp-content/uploads/2021/12/logo_0000s_0003_Wells-Fargo-Logo.png" },
  { name: "FedEx", src: "http://claimacademy.org/wp-content/uploads/2021/12/logo_0000s_0004_fedex-logo-black-and-white.png" },
  { name: "Anheuser-Busch", src: "http://claimacademy.org/wp-content/uploads/2022/07/ab-logo.jpg" },
  { name: "Amazon", src: "http://claimacademy.org/wp-content/uploads/2022/07/amazon.jpg" },
  { name: "Google", src: "http://claimacademy.org/wp-content/uploads/2022/07/google.jpg" },
  { name: "Accenture", src: "http://claimacademy.org/wp-content/uploads/2022/07/accenture.jpg" },
  { name: "Enterprise", src: "http://claimacademy.org/wp-content/uploads/2022/07/enterprise.jpg" },
];

export function EmployerNetwork() {
  return (
    <section
      style={{
        backgroundColor: "#F7F6FC",
        paddingTop: "48px",
        paddingBottom: "100px",
        overflow: "hidden",
      }}
    >
      <div className="container-x">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease }}
          style={{ textAlign: "center", marginBottom: "72px" }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: "11px",
              color: "#BBBBBB",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              marginBottom: "20px",
            }}
          >
            Your internship could be here
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
            200+ employer partners.<br />
            <span style={{ color: "#CCCCCC" }}>Built over 11 years.</span>
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "15px",
              color: "#AAAAAA",
              marginTop: "16px",
              maxWidth: "440px",
              margin: "16px auto 0",
              lineHeight: 1.6,
            }}
          >
            We maintain 2 confirmed employer partners per student before any cohort opens.
          </p>
        </motion.div>

      </div>

      {/* Full-bleed logo strip — no container constraint */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Left fade */}
        <div
          className="w-20 md:w-40"
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            background: "linear-gradient(to right, #F7F6FC, transparent)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
        {/* Right fade */}
        <div
          className="w-20 md:w-40"
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            background: "linear-gradient(to left, #F7F6FC, transparent)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        {/* Scrolling row 1 — left to right */}
        <div
          className="logo-track"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "80px",
            width: "max-content",
            paddingInline: "80px",
            marginBottom: "40px",
          }}
        >
          {[...LOGOS, ...LOGOS].map((logo, i) => (
            <img
              key={i}
              src={logo.src}
              alt={logo.name}
              style={{
                height: "40px",
                width: "auto",
                maxWidth: "140px",
                objectFit: "contain",
                opacity: 0.18,
                filter: "grayscale(1)",
                transition: "opacity 300ms",
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.6")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "0.18")}
            />
          ))}
        </div>

        {/* Scrolling row 2 — right to left (reverse) */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "80px",
            width: "max-content",
            paddingInline: "80px",
            animation: "logo-scroll-reverse 35s linear infinite",
          }}
        >
          {[...LOGOS.slice(5), ...LOGOS, ...LOGOS.slice(0, 5)].map((logo, i) => (
            <img
              key={i}
              src={logo.src}
              alt={logo.name}
              style={{
                height: "40px",
                width: "auto",
                maxWidth: "140px",
                objectFit: "contain",
                opacity: 0.12,
                filter: "grayscale(1)",
                transition: "opacity 300ms",
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.5")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "0.12")}
            />
          ))}
        </div>
      </div>

      {/* Bottom guarantee line */}
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            marginTop: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "32px",
            flexWrap: "wrap",
          }}
        >
          {[
            "2:1 employer-to-student ratio",
            "Guaranteed placement in writing",
            "Full refund if we fail",
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                color: "#888888",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: "#FFB71B",
                  flexShrink: 0,
                }}
              />
              {item}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

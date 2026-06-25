import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const COMPANIES = [
  "IBM", "Boeing", "Mastercard", "Wells Fargo", "FedEx",
  "Anheuser-Busch", "Amazon", "Google", "Accenture", "Enterprise",
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

      {/* Company badge grid */}
      <div className="container-x">
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {COMPANIES.map((name) => (
            <span
              key={name}
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: "13px",
                color: "#AAAAAA",
                backgroundColor: "#FFFFFF",
                border: "1px solid #E8E4F0",
                padding: "10px 20px",
                borderRadius: "8px",
                letterSpacing: "0.01em",
                whiteSpace: "nowrap",
              }}
            >
              {name}
            </span>
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

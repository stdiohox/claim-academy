const QUICK_LINKS = [
  { label: "Program", href: "#how" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#lead-form" },
  { label: "Visit Claim Academy →", href: "https://claimacademy.org", target: "_blank", rel: "noopener noreferrer" },
];

const PROGRAM_LINKS = [
  { label: "Engineering Track", href: "#how" },
  { label: "Builders Track", href: "#how" },
  { label: "Summer 2026 Cohorts", href: "#how" },
  { label: "Employer Partners", href: "#how" },
];

const CONTACT_LINKS = [
  { label: "hello@claimacademy.org", href: "mailto:hello@claimacademy.org" },
  { label: "claimaiinternship.com", href: "https://claimaiinternship.com", target: "_blank", rel: "noopener noreferrer" },
  { label: "314.499.5888", href: "tel:3144995888" },
];

const colHeadingStyle: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontWeight: 600,
  fontSize: "10px",
  color: "rgba(255,255,255,0.22)",
  textTransform: "uppercase",
  letterSpacing: "0.14em",
  marginBottom: "20px",
  display: "block",
};

const linkStyle: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontWeight: 400,
  fontSize: "14px",
  color: "rgba(255,255,255,0.45)",
  textDecoration: "none",
  display: "block",
  lineHeight: 2.2,
  transition: "color 150ms",
};

type FooterLink = {
  label: string;
  href: string;
  target?: string;
  rel?: string;
};

function FooterCol({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <span style={colHeadingStyle}>{title}</span>
      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              target={l.target}
              rel={l.rel}
              style={linkStyle}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#FFB71B")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer style={{ backgroundColor: "#000000", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
      {/* Top centered block */}
      <div style={{ paddingTop: "64px", paddingBottom: "48px", textAlign: "center" }}>
        <div style={{ display: "inline-block" }}>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "20px",
              letterSpacing: "-0.03em",
              color: "rgba(255,255,255,0.85)",
            }}
          >
            Claim<span style={{ color: "#FFB71B" }}>Academy</span>
          </span>
        </div>
        <p style={{
          textAlign: "center",
          color: "rgba(255,255,255,0.30)",
          fontSize: "14px",
          fontFamily: "var(--font-body)",
          marginTop: "14px",
          letterSpacing: "0.01em",
        }}>
          The only AI bootcamp that guarantees your employer.
        </p>
      </div>

      {/* Thin divider */}
      <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.07)", maxWidth: "800px", margin: "0 auto" }} />

      {/* Link columns */}
      <div style={{ paddingTop: "48px", paddingBottom: "48px" }}>
        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            paddingInline: "var(--section-padding-x)",
            gap: "40px",
          }}
        >
          <FooterCol title="Quick Links" links={QUICK_LINKS} />
          <FooterCol title="Program" links={PROGRAM_LINKS} />
          <FooterCol title="Contact" links={CONTACT_LINKS} />
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div
          className="flex flex-col md:flex-row text-center md:text-left"
          style={{
            maxWidth: "var(--content-max-width)",
            margin: "0 auto",
            paddingInline: "var(--section-padding-x)",
            paddingTop: "24px",
            paddingBottom: "24px",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <p style={{
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            fontSize: "12px",
            color: "rgba(255,255,255,0.25)",
            margin: 0,
          }}>
            © 2026 Claim Academy. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "24px" }}>
            {["Privacy Policy", "Terms of Service"].map((label) => (
              <a
                key={label}
                href="#"
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 400,
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.25)",
                  textDecoration: "none",
                  transition: "color 150ms",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#FFB71B")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.25)")}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

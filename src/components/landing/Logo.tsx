export function Logo() {
  return (
    <a href="#top" style={{ display: "inline-flex", alignItems: "center", textDecoration: "none" }}>
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "18px",
          letterSpacing: "-0.03em",
          color: "#FFFFFF",
        }}
      >
        Claim<span style={{ color: "#FFB71B" }}>Academy</span>
      </span>
    </a>
  );
}

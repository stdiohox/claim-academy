const COMPANIES = [
  "IBM", "Boeing", "Mastercard", "Wells Fargo", "FedEx",
  "Anheuser-Busch", "Amazon", "Google", "Accenture", "Enterprise",
];

export function LogoBar() {
  return (
    <section
      aria-label="Companies that hire our graduates"
      style={{
        backgroundColor: "#FFFFFF",
        padding: "36px 0",
      }}
    >
      <div
        className="container-x"
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
              backgroundColor: "#F8F8F8",
              border: "1px solid #EEEEEE",
              padding: "8px 18px",
              borderRadius: "8px",
              letterSpacing: "0.01em",
              whiteSpace: "nowrap",
            }}
          >
            {name}
          </span>
        ))}
      </div>
    </section>
  );
}

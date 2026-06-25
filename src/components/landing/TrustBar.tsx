const ITEMS = [
  "30-day money-back guarantee",
  "Employer placement guaranteed in writing",
  "2:1 employer-to-student ratio maintained",
];

export function TrustBar() {
  return (
    <div style={{ backgroundColor: "#602889", width: "100%" }}>
      <div
        className="container-x"
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: "0",
          paddingBlock: "14px",
        }}
      >
        {ITEMS.map((item, i) => (
          <div key={item} style={{ display: "flex", alignItems: "center" }}>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: "13px",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                gap: "7px",
                padding: "4px 16px",
                whiteSpace: "nowrap",
              }}
            >
              <span style={{ color: "#FFB71B", fontWeight: 700, fontSize: "15px" }}>✓</span>
              {item}
            </span>
            {i < ITEMS.length - 1 && (
              <span
                className="hidden sm:inline"
                style={{ color: "rgba(255,255,255,0.25)", fontSize: "16px", userSelect: "none" }}
              >
                ·
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

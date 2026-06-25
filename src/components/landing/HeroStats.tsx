const STATS = [
  {
    value: "4.9",
    stars: true,
    label: "Rating from graduates",
  },
  {
    value: "3,800+",
    stars: false,
    label: "Careers changed since 2013",
  },
  {
    value: "87%",
    stars: false,
    label: "Employer placement rate",
  },
  {
    value: "200+",
    stars: false,
    label: "Employer partners",
  },
];

export function HeroStats() {
  return (
    <div style={{ backgroundColor: "#FFFFFF", borderBottom: "1px solid #ECEAF2" }}>
      <div className="container-x grid grid-cols-2 md:grid-cols-4">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            style={{
              textAlign: "center",
              paddingBlock: "28px",
              paddingInline: "12px",
              borderRight: i !== STATS.length - 1 ? "1px solid #ECEAF2" : "none",
            }}
            className={[
              i < 2 ? "border-b border-[#ECEAF2] md:border-b-0" : "",
              // On mobile col 0 and col 2 have right border; remove col 1's right border on mobile
              i === 1 ? "border-r-0 md:border-r md:border-[#ECEAF2]" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(26px, 3.5vw, 40px)",
                color: "#602889",
                letterSpacing: "-0.03em",
                lineHeight: 1,
              }}
            >
              {s.value}
            </div>
            {s.stars && (
              <div
                style={{
                  color: "#FFB71B",
                  fontSize: "14px",
                  letterSpacing: "2px",
                  marginTop: "5px",
                  lineHeight: 1,
                }}
              >
                ★★★★★
              </div>
            )}
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "11px",
                color: "#999999",
                marginTop: "7px",
                lineHeight: 1.4,
                textTransform: "uppercase",
                letterSpacing: "0.07em",
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

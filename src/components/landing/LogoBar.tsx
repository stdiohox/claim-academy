const LOGOS = [
  { src: "/images/employer-ibm.png",           alt: "IBM" },
  { src: "/images/employer-boeing.png",         alt: "Boeing" },
  { src: "/images/employer-mastercard.png",     alt: "Mastercard" },
  { src: "/images/employer-wells-fargo.png",    alt: "Wells Fargo" },
  { src: "/images/employer-fedex.png",          alt: "FedEx" },
  { src: "/images/employer-anheuser-busch.jpg", alt: "Anheuser-Busch" },
  { src: "/images/employer-amazon.jpg",         alt: "Amazon" },
  { src: "/images/employer-google.jpg",         alt: "Google" },
  { src: "/images/employer-accenture.jpg",      alt: "Accenture" },
  { src: "/images/employer-enterprise.jpg",     alt: "Enterprise" },
];

export function LogoBar() {
  return (
    <section
      aria-label="Companies that hire our graduates"
      style={{
        backgroundColor: "#FFFFFF",
        padding: "36px 0",
        borderBottom: "1px solid #F0F0F0",
      }}
    >
      <div
        className="container-x"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "32px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {LOGOS.map((logo) => (
          <img
            key={logo.alt}
            src={logo.src}
            alt={logo.alt}
            style={{
              height: "32px",
              width: "auto",
              objectFit: "contain",
              opacity: 0.55,
              filter: "grayscale(100%)",
              display: "block",
            }}
          />
        ))}
      </div>
    </section>
  );
}

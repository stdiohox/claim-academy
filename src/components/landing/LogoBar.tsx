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

export function LogoBar() {
  const items = [...LOGOS, ...LOGOS];
  return (
    <section
      aria-label="Companies that hire our graduates"
      style={{
        backgroundColor: "#FFFFFF",
        padding: "36px 0",
        overflow: "hidden",
      }}
    >
      <div
        style={{ overflow: "hidden" }}
        onMouseEnter={e => {
          const track = e.currentTarget.querySelector('.logo-track') as HTMLElement;
          if (track) track.style.animationPlayState = 'paused';
        }}
        onMouseLeave={e => {
          const track = e.currentTarget.querySelector('.logo-track') as HTMLElement;
          if (track) track.style.animationPlayState = 'running';
        }}
        aria-hidden="true"
      >
        <div
          className="logo-track"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "100px",
            width: "max-content",
            paddingInline: "50px",
          }}
        >
          {items.map((logo, i) => (
            <img
              key={i}
              src={logo.src}
              alt={logo.name}
              style={{
                height: "48px",
                width: "auto",
                maxWidth: "160px",
                objectFit: "contain",
                opacity: 0.22,
                filter: "grayscale(1)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

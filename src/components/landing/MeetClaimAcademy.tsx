const POSTER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1280' height='720' viewBox='0 0 1280 720'%3E%3Crect width='1280' height='720' fill='%23120820'/%3E%3Ccircle cx='640' cy='360' r='72' fill='%231e0d35'/%3E%3Cpolygon points='624%2C330 624%2C390 678%2C360' fill='%23FFB71B'/%3E%3C/svg%3E";

export function MeetClaimAcademy() {
  return (
    <section
      style={{
        backgroundColor: "#FFFFFF",
        paddingTop: "64px",
        paddingBottom: "64px",
      }}
    >
      <div className="container-x">
        <div
          className="grid grid-cols-1 lg:grid-cols-2"
          style={{ gap: "56px", alignItems: "center" }}
        >
          {/* Left — text */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: "11px",
                color: "#FFB71B",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              Meet Claim Academy
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(1.75rem, 3vw, 2.75rem)",
                color: "#000000",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              Why we guarantee your employer — and every other bootcamp doesn't.
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "16px",
                color: "#666666",
                lineHeight: 1.75,
                marginTop: "20px",
                maxWidth: "480px",
              }}
            >
              Ola Ayeni, founder of Claim Academy, explains what makes this program different — and why we're the only AI bootcamp in the US willing to put the internship guarantee in writing.
            </p>
            <a
              href="#lead-form"
              style={{
                display: "inline-block",
                marginTop: "28px",
                backgroundColor: "#FFB71B",
                color: "#000000",
                fontFamily: "var(--font-body)",
                fontWeight: 700,
                fontSize: "14px",
                padding: "13px 28px",
                borderRadius: "6px",
                textDecoration: "none",
                transition: "background-color 150ms",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F7901B")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FFB71B")}
            >
              Book a Free Strategy Call →
            </a>
          </div>

          {/* Right — video player */}
          <div>
            <video
              controls
              playsInline
              preload="metadata"
              poster={POSTER}
              aria-label="Meet Claim Academy — founder Ola Ayeni explains the guaranteed employer internship program"
              style={{
                width: "100%",
                aspectRatio: "16/9",
                height: "auto",
                borderRadius: "12px",
                boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
                display: "block",
                backgroundColor: "#120820",
              }}
            >
              <source src="/videos/about-claim.mp4" type="video/mp4" />
              <track kind="captions" srcLang="en" label="English captions" default />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}

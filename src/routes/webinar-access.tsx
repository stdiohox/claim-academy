import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CALENDLY_URL } from "@/lib/booking";

// ── Config ───────────────────────────────────────────────────────────────────
const DRIVE_FILE_ID = "1auI5fQ4A5R7XhsOR5KGDNlrlRdCiNEcr";
const DRIVE_EMBED_SRC = `https://drive.google.com/file/d/${DRIVE_FILE_ID}/preview`;
const LOGO_SRC = "https://claimaiinternship.com/images/claim-logo-transparent.png";

const GOLD = "#C9A227";
const GOLD_GRAD = "linear-gradient(135deg, #E8B930, #C9A227, #A07820)";

export const Route = createFileRoute("/webinar-access")({
  head: () => ({
    meta: [
      { title: "Your Webinar — Claim Academy AI Internship" },
      { name: "description", content: "Your live training session is ready." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: WebinarAccess,
});

// Reads ?name= from the URL. No route-level search schema exists elsewhere in this
// repo yet, so this reads window.location directly rather than introducing one —
// client-only (useEffect) to avoid an SSR/client hydration mismatch, graceful
// fallback to null when absent or empty.
function useNameParam(): string | null {
  const [name, setName] = useState<string | null>(null);
  useEffect(() => {
    const raw = new URLSearchParams(window.location.search).get("name");
    const trimmed = raw?.trim();
    setName(trimmed ? trimmed : null);
  }, []);
  return name;
}

function WebinarAccess() {
  const name = useNameParam();

  return (
    <div className="wa-root">
      <style>{WA_CSS}</style>

      <header className="wa-topbar">
        <div className="wa-topbar-inner">
          <div className="wa-brand">
            <img src={LOGO_SRC} alt="Claim Academy" className="wa-logo" />
            <span className="wa-brand-name">AI Internship</span>
          </div>
          <div className="wa-live">
            <span className="wa-live-dot" aria-hidden />
            <span className="wa-live-text">Now Playing</span>
          </div>
        </div>
      </header>

      <main className="wa-main">
        <div className="wa-wrap">
          {name && (
            <p className="wa-welcome">
              Welcome, {name}. Your training is ready.
            </p>
          )}

          <p className="wa-video-label">Break Into AI — Free Training Session</p>

          <div className="wa-player">
            <iframe
              src={DRIVE_EMBED_SRC}
              allow="autoplay"
              allowFullScreen
              title="Claim Academy AI Internship — Free Training"
              style={{ width: "100%", height: "100%", border: "none" }}
            />
          </div>

          <p className="wa-lock-note">🔒 This recording is available to registered attendees only</p>

          <section className="wa-host">
            <p className="wa-host-eyebrow">Your host</p>
            <div className="wa-host-row">
              <img src={LOGO_SRC} alt="" className="wa-host-avatar" aria-hidden />
              <div>
                <p className="wa-host-name">Claim Academy Team</p>
                <p className="wa-host-stats">11 years · 3,800+ graduates · 87% job placement</p>
              </div>
            </div>
          </section>

          <section className="wa-cta">
            <p className="wa-cta-eyebrow">Next Cohort · August 3, 2026</p>
            <h2 className="wa-cta-headline">Ready to make it official?</h2>
            <p className="wa-cta-body">
              Enjoyed the training? Book a free 30-minute call with our team. We'll walk you through the program, confirm your funding options, and answer every question.
            </p>
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="wa-cta-btn">
              Book Your Discovery Call →
            </a>
            <p className="wa-cta-note">No pressure. No commitment. Just a conversation.</p>
          </section>
        </div>
      </main>

      <footer className="wa-footer">
        © 2026 Claim Academy AI Internship · <a href="mailto:info@claimaiinternship.com">info@claimaiinternship.com</a>
      </footer>
    </div>
  );
}

// ── Scoped styles — all selectors under `.wa-root`; Poppins loaded globally. ──
const WA_CSS = `
  .wa-root, .wa-root * { font-family: 'Poppins', system-ui, sans-serif; box-sizing: border-box; }
  .wa-root {
    background: #0a0a0a;
    color: #FBF6EA;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    overflow-x: clip;
  }

  .wa-topbar {
    background: #12100E;
    border-bottom: 1px solid rgba(201,162,39,0.19);
    position: sticky;
    top: 0;
    z-index: 10;
  }
  .wa-topbar-inner {
    max-width: 1000px;
    margin: 0 auto;
    padding: 14px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .wa-brand { display: flex; align-items: center; gap: 10px; }
  .wa-logo { height: 26px; width: auto; display: block; }
  .wa-brand-name { font-weight: 600; font-size: 13px; letter-spacing: 0.06em; text-transform: uppercase; color: rgba(251,246,234,0.75); }

  .wa-live { display: flex; align-items: center; gap: 8px; }
  .wa-live-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: #E5484D;
    box-shadow: 0 0 0 0 rgba(229,72,77,0.6);
    animation: waPulse 1.6s ease-in-out infinite;
    flex-shrink: 0;
  }
  @keyframes waPulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(229,72,77,0.55); }
    50% { box-shadow: 0 0 0 6px rgba(229,72,77,0); }
  }
  .wa-live-text { font-size: 13px; font-weight: 600; color: rgba(251,246,234,0.7); }

  .wa-main { flex: 1; display: flex; align-items: center; padding: 40px 0 56px; }
  .wa-wrap { width: 100%; max-width: 900px; margin: 0 auto; padding: 0 20px; }

  .wa-welcome {
    text-align: center;
    color: ${GOLD};
    font-weight: 600;
    font-size: 17px;
    margin: 0 0 18px;
  }

  .wa-video-label {
    text-align: center;
    color: ${GOLD};
    font-weight: 700;
    font-size: 12px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    margin: 0 0 16px;
  }

  .wa-player {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    background: #000;
    border: 1px solid rgba(201,162,39,0.25);
    border-radius: 8px;
    overflow: hidden;
  }

  .wa-lock-note {
    text-align: center;
    color: #5C5A56;
    font-size: 13px;
    margin: 14px 0 0;
  }

  .wa-host {
    margin-top: 48px;
    text-align: center;
  }
  .wa-host-eyebrow {
    color: #5C5A56;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin: 0 0 16px;
  }
  .wa-host-row {
    display: inline-flex;
    align-items: center;
    gap: 14px;
    text-align: left;
  }
  .wa-host-avatar {
    width: 44px; height: 44px;
    border-radius: 50%;
    object-fit: contain;
    background: #12100E;
    border: 1px solid rgba(201,162,39,0.3);
    padding: 6px;
  }
  .wa-host-name { font-weight: 700; font-size: 15px; color: #FBF6EA; margin: 0; }
  .wa-host-stats { font-size: 13px; color: #5C5A56; margin: 3px 0 0; }

  .wa-cta {
    margin-top: 40px;
    background: #12100E;
    border: 1px solid rgba(201,162,39,0.4);
    border-radius: 16px;
    padding: 40px;
    text-align: center;
  }
  .wa-cta-eyebrow {
    color: ${GOLD};
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    margin: 0 0 12px;
  }
  .wa-cta-headline {
    font-weight: 800;
    font-size: 24px;
    letter-spacing: -0.02em;
    color: #FBF6EA;
    margin: 0 0 12px;
  }
  .wa-cta-body {
    font-size: 15px;
    line-height: 1.7;
    color: #888680;
    max-width: 480px;
    margin: 0 auto 28px;
  }
  .wa-cta-btn {
    display: inline-block;
    background: ${GOLD_GRAD};
    color: #12100E;
    font-weight: 800;
    font-size: 16px;
    padding: 16px 36px;
    border-radius: 8px;
    text-decoration: none;
    transition: transform 150ms cubic-bezier(0.34,1.56,0.64,1);
  }
  .wa-cta-btn:hover { transform: scale(1.03); }
  .wa-cta-btn:active { transform: scale(0.97); }
  .wa-cta-note {
    font-size: 13px;
    color: #5C5A56;
    margin: 14px 0 0;
  }

  .wa-footer {
    background: #12100E;
    color: rgba(251,246,234,0.4);
    text-align: center;
    font-size: 12px;
    padding: 22px 0;
    border-top: 1px solid rgba(255,255,255,0.06);
  }
  .wa-footer a { color: ${GOLD}; text-decoration: none; }

  @media (max-width: 640px) {
    .wa-brand-name { display: none; }
    .wa-cta { padding: 28px 22px; }
  }

  @media (prefers-reduced-motion: reduce) {
    .wa-live-dot { animation: none; }
  }
`;

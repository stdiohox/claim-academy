import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CALENDLY_URL } from "@/lib/booking";

// ── Webinar constants (single source of truth — no hardcoded literals in markup) ──
const WEBINAR_DATE = "2026-07-27T19:00:00-06:00";
const WEBINAR_TIME = "7:00 PM CST";
const WEBINAR_DATE_DISPLAY = "Monday, July 27";
const N8N_WEBHOOK = "https://n8n.srv1759554.hstgr.cloud/webhook/lead-intake";
const GOOGLE_DRIVE_VIDEO_ID = "1auI5fQ4A5R7XhsOR5KGDNlrlRdCiNEcr";
const VIDEO_SRC = `https://drive.google.com/file/d/${GOOGLE_DRIVE_VIDEO_ID}/preview`;

export const Route = createFileRoute("/webinar")({
  head: () => ({
    meta: [
      { title: "Break Into AI — Free Live Training | Claim Academy AI Internship" },
      {
        name: "description",
        content:
          "Free live webinar: see exactly what you'll learn in the Claim Academy AI Internship before you commit. Engineering & Builders tracks — Claude API, n8n, Cursor, RAG, LangGraph.",
      },
      { property: "og:title", content: "Break Into AI — Free Live Training" },
      {
        property: "og:description",
        content: "See exactly what you'll learn in the Claim Academy AI Internship before you commit.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Webinar,
});

// ── Countdown ─────────────────────────────────────────────────────────────────
type TimeLeft = { days: number; hours: number; mins: number; secs: number } | null;

function getTimeLeft(): TimeLeft {
  const target = new Date(WEBINAR_DATE).getTime();
  if (Number.isNaN(target)) return null; // invalid date → show nothing
  const diff = target - Date.now();
  if (diff <= 0) return null; // passed → show nothing
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    mins: Math.floor((diff % 3600000) / 60000),
    secs: Math.floor((diff % 60000) / 1000),
  };
}

// ── Form ──────────────────────────────────────────────────────────────────────
type FormState = { firstName: string; lastName: string; email: string; phone: string };
type Status = "idle" | "loading" | "success" | "error";
const emptyForm: FormState = { firstName: "", lastName: "", email: "", phone: "" };

function Webinar() {
  // Countdown: init null so server + first client render match (no hydration flash),
  // then populate + tick on the client only; interval cleaned up on unmount.
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(null);
  useEffect(() => {
    setTimeLeft(getTimeLeft());
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");

  const update = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((prev) => (prev[k] ? { ...prev, [k]: false } : prev));
  };

  function validate(): boolean {
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneDigits = form.phone.replace(/\D/g, "");
    const next: Partial<Record<keyof FormState, boolean>> = {
      firstName: form.firstName.trim().length === 0,
      lastName: form.lastName.trim().length === 0,
      email: !emailRe.test(form.email.trim()),
      phone: phoneDigits.length < 10,
    };
    setErrors(next);
    return !Object.values(next).some(Boolean);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    try {
      const res = await fetch(N8N_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: form.firstName,
          last_name: form.lastName,
          email: form.email,
          phone: form.phone,
          source: "webinar",
          lead_type: "webinar_registration",
          webinar_date: WEBINAR_DATE,
          notes: "Registered via webinar landing page",
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const loading = status === "loading";

  return (
    <div className="wb-page">
      <style>{WB_CSS}</style>

      {/* ══ HERO ══ */}
      <header className="wb-hero">
        <div className="wb-hero-gridbg" aria-hidden="true" />
        <div className="wb-wrap">
          <div className="wb-hero-grid">
            <div className="wb-hero-copy">
              {timeLeft && (
                <div className="wb-countdown">
                  <span className="wb-cd-label">Webinar starts in:</span>{" "}
                  <span className="wb-cd-value">
                    {timeLeft.days}d {timeLeft.hours}h {timeLeft.mins}m {timeLeft.secs}s
                  </span>
                </div>
              )}

              <div className="wb-event-pill">
                <span>{WEBINAR_DATE_DISPLAY}</span><span className="wb-dot">·</span>
                <span>{WEBINAR_TIME}</span><span className="wb-dot">·</span>
                <span>Free</span><span className="wb-dot">·</span>
                <span>Live Online</span>
              </div>

              <p className="wb-urgency-note">Spots are limited — this is a live session, not a recording.</p>

              <h1>Break Into <span className="wb-accent">AI</span></h1>
              <p className="wb-subhead">See exactly what you'll learn in the Claim Academy AI Internship before you commit.</p>

              <div className="wb-cta-row">
                <a href="#register" className="wb-btn wb-btn-primary">Save My Spot</a>
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="wb-btn wb-btn-ghost">Talk to an Advisor</a>
              </div>
              <p className="wb-secondary-note">Skip the webinar — book a call directly</p>
            </div>

            <div className="wb-hero-media">
              <div className="wb-video-embed">
                <iframe src={VIDEO_SRC} allow="autoplay" allowFullScreen title="Break Into AI — webinar preview" />
              </div>
            </div>
          </div>
        </div>

        <div className="wb-wrap">
          <div className="wb-trust-bar">
            <span className="wb-stat"><b>3,800+</b> Graduates</span>
            <span className="wb-sep">·</span>
            <span className="wb-stat"><b>11</b> Years</span>
            <span className="wb-sep">·</span>
            <span className="wb-stat"><b>87%</b> Job Placement</span>
          </div>
        </div>
      </header>

      {/* ══ WHAT YOU'LL LEARN ══ */}
      <section className="wb-section">
        <div className="wb-wrap">
          <div className="wb-section-head">
            <div className="wb-eyebrow">What You'll Learn</div>
            <h2>One free hour that shows you the whole path</h2>
          </div>
          <div className="wb-grid wb-cols-3">
            <div className="wb-card wb-learn-card">
              <div className="wb-num">1</div>
              <h3>The AI tools companies are actually hiring for</h3>
              <p>Cursor, Claude API, n8n, Lovable, Supabase, LangGraph, FastAPI — hands-on, not theory.</p>
            </div>
            <div className="wb-card wb-learn-card">
              <div className="wb-num">2</div>
              <h3>What 12 weeks looks like — and what comes after</h3>
              <p>4 weeks live online training (Mon/Wed/Fri, 60 min sessions, recorded) + 8 weeks guaranteed US employer internship, in writing.</p>
            </div>
            <div className="wb-card wb-learn-card">
              <div className="wb-num">3</div>
              <h3>How to get it fully funded</h3>
              <p>Multiple payment options including $0 upfront — ISA, employer reimbursement, and payment plans. Most students find a path that works.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ TWO TRACKS ══ */}
      <section className="wb-section wb-section-alt">
        <div className="wb-wrap">
          <div className="wb-section-head">
            <div className="wb-eyebrow">Two Tracks</div>
            <h2>Pick the path that fits where you're headed</h2>
          </div>
          <div className="wb-grid wb-cols-2">
            <div className="wb-card wb-track-card">
              <span className="wb-track-tag">Engineering Track</span>
              <h3>Build the AI systems</h3>
              <div className="wb-tools-label">Tools</div>
              <div className="wb-chips">
                <span className="wb-chip">Claude API</span><span className="wb-chip">RAG</span>
                <span className="wb-chip">LangGraph</span><span className="wb-chip">FastAPI</span>
                <span className="wb-chip">Supabase</span><span className="wb-chip">Langfuse</span>
              </div>
              <div className="wb-outcome">Outcome: <b>AI Engineer / AI Architect</b></div>
            </div>
            <div className="wb-card wb-track-card">
              <span className="wb-track-tag">Builders Track</span>
              <h3>Ship AI products fast</h3>
              <div className="wb-tools-label">Tools</div>
              <div className="wb-chips">
                <span className="wb-chip">Cursor</span><span className="wb-chip">Lovable.dev</span>
                <span className="wb-chip">n8n</span><span className="wb-chip">Supabase</span>
                <span className="wb-chip">Claude.ai Projects</span>
              </div>
              <div className="wb-outcome">Outcome: <b>AI PM / AI Builder</b></div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ WHO THIS IS FOR ══ */}
      <section className="wb-section">
        <div className="wb-wrap">
          <div className="wb-section-head">
            <div className="wb-eyebrow">Who This Is For</div>
            <h2>If any of these sound like you, come to the webinar</h2>
          </div>
          <div className="wb-grid wb-cols-3">
            <div className="wb-card wb-who-card">
              <div className="wb-ic" aria-hidden="true">🎓</div>
              <h3>Recent grads</h3>
              <p>Ready to launch a tech career and want a real, paid on-ramp into AI.</p>
            </div>
            <div className="wb-card wb-who-card">
              <div className="wb-ic" aria-hidden="true">🔁</div>
              <h3>Working professionals</h3>
              <p>Making the pivot into AI without pressing pause on your income.</p>
            </div>
            <div className="wb-card wb-who-card">
              <div className="wb-ic" aria-hidden="true">⚡</div>
              <h3>Anyone drawn to AI</h3>
              <p>You want to work with AI tools every day — and get paid for it.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ ABOUT ══ */}
      <section className="wb-section wb-about">
        <div className="wb-wrap">
          <div className="wb-section-head">
            <div className="wb-eyebrow">About Claim Academy</div>
            <h2>11 years of placing people into tech careers</h2>
          </div>
          <div className="wb-stats">
            <div className="wb-stat-box"><div className="wb-big">11</div><div className="wb-lbl">Years</div></div>
            <div className="wb-stat-box"><div className="wb-big">3,800+</div><div className="wb-lbl">Graduates</div></div>
            <div className="wb-stat-box"><div className="wb-big">87%</div><div className="wb-lbl">Job Placement (2023)</div></div>
            <div className="wb-stat-box"><div className="wb-big">2</div><div className="wb-lbl">Employer partners / student</div></div>
          </div>
          <div className="wb-guarantee">
            <h3>Guaranteed US employer placement — in writing</h3>
            <p>We place every student with a vetted US employer within 2 weeks of bootcamp completion. If we don't: full refund.</p>
            <p className="wb-fine">2 employer partners confirmed per student before each cohort opens.</p>
          </div>
        </div>
      </section>

      {/* ══ REGISTRATION FORM ══ */}
      <section className="wb-section wb-register-section" id="register">
        <div className="wb-wrap">
          <div className="wb-register-card">
            {status === "success" ? (
              <div className="wb-success-state">
                <div className="wb-celebrate" aria-hidden="true">🎉</div>
                <h3>You're registered!</h3>
                <p>Check your email for webinar details.</p>
                <p>See you there.</p>
                <div className="wb-again">
                  <p style={{ marginBottom: "10px" }}>Already ready to enroll?</p>
                  <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">Book a discovery call →</a>
                </div>
              </div>
            ) : (
              <>
                <h2 className="wb-form-title">Save Your Spot — It's Free</h2>
                <p className="wb-form-sub">Break Into AI · Free Live Training</p>

                <form onSubmit={handleSubmit} noValidate>
                  <div className="wb-grid-2">
                    <div className="wb-field">
                      <label htmlFor="wb-firstName">First Name <span className="wb-req">*</span></label>
                      <input id="wb-firstName" type="text" autoComplete="given-name" placeholder="Jordan"
                        value={form.firstName} onChange={update("firstName")} className={errors.firstName ? "wb-invalid" : ""} />
                      {errors.firstName && <div className="wb-err">Please enter your first name.</div>}
                    </div>
                    <div className="wb-field">
                      <label htmlFor="wb-lastName">Last Name <span className="wb-req">*</span></label>
                      <input id="wb-lastName" type="text" autoComplete="family-name" placeholder="Rivera"
                        value={form.lastName} onChange={update("lastName")} className={errors.lastName ? "wb-invalid" : ""} />
                      {errors.lastName && <div className="wb-err">Please enter your last name.</div>}
                    </div>
                  </div>
                  <div className="wb-field">
                    <label htmlFor="wb-email">Email <span className="wb-req">*</span></label>
                    <input id="wb-email" type="email" autoComplete="email" inputMode="email" placeholder="you@email.com"
                      value={form.email} onChange={update("email")} className={errors.email ? "wb-invalid" : ""} />
                    {errors.email && <div className="wb-err">Please enter a valid email address.</div>}
                  </div>
                  <div className="wb-field">
                    <label htmlFor="wb-phone">Phone <span className="wb-req">*</span></label>
                    <input id="wb-phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="(314) 555-0123"
                      value={form.phone} onChange={update("phone")} className={errors.phone ? "wb-invalid" : ""} />
                    {errors.phone && <div className="wb-err">Please enter a valid phone number.</div>}
                  </div>

                  <button type="submit" disabled={loading} className={`wb-btn wb-btn-primary wb-submit${loading ? " wb-is-loading" : ""}`}>
                    <span className="wb-spinner" aria-hidden="true" />
                    <span>{loading ? "Saving your spot…" : "Save My Spot — It's Free"}</span>
                  </button>
                  <p className="wb-no-cc">No credit card. No obligation. Just show up.</p>
                  {status === "error" && (
                    <div className="wb-form-error" role="alert">
                      Something went wrong — please try again or email info@claimaiinternship.com
                    </div>
                  )}
                </form>

                <div className="wb-form-sep">— or —</div>
                <div className="wb-book-link">
                  <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">Already ready to enroll? Book a discovery call</a>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ══ URGENCY FOOTER ══ */}
      <section className="wb-urgency">
        <div className="wb-wrap">
          <p>The August 3 cohort opens right after the webinar — registered attendees get first access.</p>
          <div className="wb-cta-row">
            <a href="#register" className="wb-btn wb-btn-primary">Save My Spot</a>
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="wb-btn wb-btn-ghost">Book a Call</a>
          </div>
        </div>
      </section>

      <footer className="wb-footer">
        <div className="wb-wrap">
          Claim Academy AI Internship · <a href="mailto:info@claimaiinternship.com">info@claimaiinternship.com</a>
        </div>
      </footer>
    </div>
  );
}

// ── Scoped styles (webinar identity: cream/ink/Poppins — Poppins loaded globally in
// index.html). All selectors prefixed `.wb-` so nothing leaks into the rest of the site.
const WB_CSS = `
  .wb-page {
    --cream:#FBF6EA; --ink:#12100E; --gold:#C9A227;
    --gold-gradient:linear-gradient(135deg,#E8B930,#C9A227,#A07820);
    --stone:#5C5A56; --parchment:#E8DFC8; --radius:12px; --maxw:1120px;
    font-family:'Poppins',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
    font-weight:400; background:var(--cream); color:var(--ink); line-height:1.6;
    -webkit-font-smoothing:antialiased;
  }
  .wb-page *{box-sizing:border-box;}
  .wb-page img,.wb-page iframe{max-width:100%;}
  .wb-wrap{width:100%;max-width:var(--maxw);margin:0 auto;padding:0 20px;}

  .wb-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;
    font-family:inherit;font-weight:600;font-size:16px;padding:15px 28px;border-radius:var(--radius);
    border:none;cursor:pointer;text-decoration:none;text-align:center;line-height:1.2;
    transition:transform .15s ease,box-shadow .15s ease,background .15s ease;}
  .wb-btn:active{transform:translateY(1px);}
  .wb-btn-primary{background:var(--gold-gradient);color:var(--ink);font-weight:700;box-shadow:0 6px 20px rgba(201,162,39,0.35);}
  .wb-btn-primary:hover{box-shadow:0 10px 28px rgba(201,162,39,0.45);transform:translateY(-2px);}
  .wb-btn-primary:disabled{opacity:.7;cursor:not-allowed;transform:none;box-shadow:none;}
  .wb-btn-ghost{background:var(--cream);color:var(--ink);border:1px solid var(--ink);}
  .wb-btn-ghost:hover{background:var(--parchment);transform:translateY(-2px);}

  .wb-hero{position:relative;overflow:hidden;background:var(--ink);color:var(--cream);padding:40px 0 0;}
  .wb-hero-gridbg{position:absolute;inset:0;pointer-events:none;z-index:0;
    background-image:radial-gradient(rgba(201,162,39,0.30) 1.5px,transparent 1.7px);
    background-size:26px 26px;opacity:.45;animation:wbGridDrift 9s linear infinite;
    -webkit-mask-image:radial-gradient(120% 80% at 70% 0%,#000 40%,transparent 100%);
    mask-image:radial-gradient(120% 80% at 70% 0%,#000 40%,transparent 100%);}
  @keyframes wbGridDrift{from{background-position:0 0;}to{background-position:26px 26px;}}
  .wb-hero .wb-wrap{position:relative;z-index:1;}
  .wb-hero-grid{display:grid;grid-template-columns:1fr;gap:32px;align-items:center;padding-bottom:40px;}

  .wb-countdown{margin-bottom:14px;font-weight:600;font-size:14px;letter-spacing:.3px;color:var(--gold);}
  .wb-cd-label{color:var(--parchment);font-weight:500;opacity:.85;}

  .wb-event-pill{display:inline-flex;flex-wrap:wrap;align-items:center;gap:8px;
    background:rgba(201,162,39,0.12);border:1px solid rgba(201,162,39,0.45);color:var(--gold);
    font-weight:600;font-size:13px;padding:7px 14px;border-radius:999px;margin-bottom:16px;}
  .wb-event-pill .wb-dot{opacity:.55;}
  .wb-urgency-note{display:block;font-weight:600;font-size:14px;color:var(--gold);margin:0 0 20px;}

  .wb-hero h1{font-weight:800;font-size:clamp(34px,7vw,60px);line-height:1.05;letter-spacing:-0.5px;margin-bottom:16px;}
  .wb-accent{background:var(--gold-gradient);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:var(--gold);}
  .wb-subhead{font-size:clamp(16px,2.4vw,19px);color:var(--parchment);max-width:34ch;margin-bottom:28px;}

  .wb-cta-row{display:flex;flex-wrap:wrap;gap:14px;}
  .wb-cta-row .wb-btn{flex:1 1 auto;}
  .wb-secondary-note{font-size:13px;color:#b9b2a3;margin-top:10px;}

  .wb-video-embed{position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:var(--radius);
    border:1px solid rgba(201,162,39,0.35);box-shadow:0 18px 50px rgba(0,0,0,0.45);background:#000;}
  .wb-video-embed iframe{position:absolute;top:0;left:0;width:100%;height:100%;border:none;}

  .wb-trust-bar{border-top:1px solid rgba(255,255,255,0.10);display:flex;flex-wrap:wrap;justify-content:center;
    gap:10px 28px;padding:20px 0;text-align:center;}
  .wb-trust-bar .wb-stat{font-weight:600;font-size:14px;color:var(--cream);}
  .wb-trust-bar .wb-stat b{color:var(--gold);font-weight:700;}
  .wb-trust-bar .wb-sep{color:rgba(255,255,255,0.25);}

  .wb-section{padding:64px 0;}
  .wb-section-alt{background:var(--parchment);}
  .wb-section-head{text-align:center;max-width:640px;margin:0 auto 40px;}
  .wb-eyebrow{font-weight:600;font-size:13px;letter-spacing:1.5px;text-transform:uppercase;color:var(--gold);margin-bottom:10px;}
  .wb-section-head h2{font-weight:600;font-size:clamp(26px,4vw,38px);line-height:1.15;letter-spacing:-0.3px;}

  .wb-card{background:var(--cream);border:1px solid var(--parchment);border-radius:var(--radius);padding:26px;}
  .wb-grid{display:grid;gap:20px;grid-template-columns:1fr;}

  .wb-learn-card .wb-num{display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:10px;
    background:var(--gold-gradient);color:var(--ink);font-weight:800;font-size:18px;margin-bottom:16px;}
  .wb-learn-card h3{font-weight:600;font-size:19px;margin-bottom:8px;}
  .wb-learn-card p{color:var(--stone);font-size:15px;}

  .wb-track-tag{display:inline-block;font-weight:700;font-size:12px;letter-spacing:.6px;text-transform:uppercase;color:var(--gold);margin-bottom:6px;}
  .wb-track-card h3{font-weight:600;font-size:22px;margin-bottom:14px;}
  .wb-tools-label{font-weight:600;font-size:12px;letter-spacing:.6px;text-transform:uppercase;color:var(--stone);margin-bottom:10px;}
  .wb-chips{display:flex;flex-wrap:wrap;gap:8px;}
  .wb-chip{background:var(--parchment);color:var(--ink);font-size:13px;font-weight:500;padding:5px 11px;border-radius:999px;}
  .wb-outcome{margin-top:14px;padding-top:14px;border-top:1px dashed var(--parchment);font-size:15px;}
  .wb-outcome b{color:var(--gold);}

  .wb-who-card .wb-ic{font-size:26px;margin-bottom:12px;}
  .wb-who-card h3{font-weight:600;font-size:18px;margin-bottom:6px;}
  .wb-who-card p{color:var(--stone);font-size:15px;}

  .wb-about{background:var(--parchment);}
  .wb-stats{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:28px;}
  .wb-stat-box{background:var(--cream);border:1px solid #ddd2b6;border-radius:var(--radius);padding:20px;text-align:center;}
  .wb-stat-box .wb-big{font-weight:800;font-size:30px;color:var(--gold);line-height:1;}
  .wb-stat-box .wb-lbl{font-size:13px;color:var(--stone);margin-top:8px;font-weight:500;}
  .wb-guarantee{background:var(--ink);color:var(--cream);border-radius:var(--radius);padding:28px;text-align:center;}
  .wb-guarantee h3{font-weight:600;font-size:20px;margin-bottom:12px;color:var(--gold);}
  .wb-guarantee p{color:var(--parchment);font-size:16px;max-width:620px;margin:0 auto 10px;}
  .wb-guarantee .wb-fine{font-size:13px;color:#b9b2a3;}

  .wb-register-section{background:var(--cream);}
  .wb-register-card{max-width:560px;margin:0 auto;background:var(--cream);border:1px solid var(--parchment);
    border-radius:var(--radius);padding:32px;box-shadow:0 10px 40px rgba(18,16,14,0.06);}
  .wb-form-title{font-weight:700;font-size:26px;text-align:center;margin-bottom:6px;}
  .wb-form-sub{text-align:center;color:var(--stone);font-size:15px;margin-bottom:24px;}
  .wb-field{margin-bottom:16px;}
  .wb-field label{display:block;font-weight:500;font-size:14px;margin-bottom:6px;}
  .wb-field label .wb-req{color:var(--gold);}
  .wb-field input{width:100%;font-family:inherit;font-size:16px;color:var(--ink);background:#fff;
    border:1px solid var(--ink);border-radius:10px;padding:13px 14px;transition:border-color .15s ease,box-shadow .15s ease;}
  .wb-field input::placeholder{color:#a7a291;}
  .wb-field input:focus{outline:none;border-color:var(--gold);box-shadow:0 0 0 3px rgba(201,162,39,0.2);}
  .wb-field input.wb-invalid{border-color:#b23b3b;box-shadow:0 0 0 3px rgba(178,59,59,0.15);}
  .wb-err{color:#b23b3b;font-size:12.5px;margin-top:5px;}
  .wb-grid-2{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
  @media (max-width:440px){.wb-grid-2{grid-template-columns:1fr;gap:0;}}

  .wb-submit{width:100%;margin-top:6px;}
  .wb-spinner{width:17px;height:17px;border:2px solid rgba(18,16,14,0.35);border-top-color:var(--ink);
    border-radius:50%;display:none;animation:wbSpin .7s linear infinite;}
  .wb-is-loading .wb-spinner{display:inline-block;}
  @keyframes wbSpin{to{transform:rotate(360deg);}}
  .wb-no-cc{text-align:center;font-size:13px;color:var(--stone);margin-top:14px;}
  .wb-form-error{text-align:center;color:#b23b3b;font-size:15px;font-weight:500;margin-top:12px;}
  .wb-form-sep{display:flex;align-items:center;gap:14px;color:var(--stone);font-size:13px;margin:20px 0;}
  .wb-form-sep::before,.wb-form-sep::after{content:"";flex:1;height:1px;background:var(--parchment);}
  .wb-book-link{text-align:center;}
  .wb-book-link a{color:var(--gold);font-weight:600;text-decoration:none;border-bottom:1px solid rgba(201,162,39,0.5);}
  .wb-book-link a:hover{border-bottom-color:var(--gold);}

  .wb-success-state{text-align:center;}
  .wb-success-state .wb-celebrate{font-size:44px;margin-bottom:8px;}
  .wb-success-state h3{font-weight:700;font-size:24px;margin-bottom:10px;}
  .wb-success-state p{color:var(--stone);font-size:16px;margin-bottom:6px;}
  .wb-success-state .wb-again{margin-top:22px;padding-top:20px;border-top:1px solid var(--parchment);}
  .wb-success-state .wb-again a{color:var(--gold);font-weight:600;text-decoration:none;border-bottom:1px solid rgba(201,162,39,0.5);}

  .wb-urgency{background:var(--ink);color:var(--gold);text-align:center;padding:54px 0;}
  .wb-urgency p{font-weight:600;font-size:clamp(19px,3vw,26px);line-height:1.3;max-width:720px;margin:0 auto 26px;}
  .wb-urgency .wb-cta-row{justify-content:center;}
  .wb-urgency .wb-btn{flex:0 1 auto;min-width:190px;}

  .wb-footer{background:var(--ink);color:#8f887a;text-align:center;font-size:13px;padding:26px 0 40px;border-top:1px solid rgba(255,255,255,0.08);}
  .wb-footer a{color:var(--gold);text-decoration:none;}

  @media (min-width:860px){
    .wb-hero{padding-top:52px;}
    .wb-hero-grid{grid-template-columns:1.05fr 0.95fr;gap:48px;padding-bottom:48px;}
    .wb-cta-row .wb-btn{flex:0 1 auto;}
    .wb-cols-3{grid-template-columns:repeat(3,1fr);}
    .wb-cols-2{grid-template-columns:repeat(2,1fr);}
    .wb-section{padding:84px 0;}
    .wb-about .wb-stats{grid-template-columns:repeat(4,1fr);}
  }

  @media (prefers-reduced-motion: reduce){
    .wb-hero-gridbg{animation:none;}
    .wb-btn:hover,.wb-btn-primary:hover,.wb-btn-ghost:hover{transform:none;}
    .wb-spinner{animation-duration:1.4s;}
  }
`;

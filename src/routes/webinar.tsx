import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, useReducedMotion, useInView } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Check,
  GraduationCap,
  Repeat,
  ShieldCheck,
  Sparkles,
  Wallet,
  Workflow,
  Zap,
} from "lucide-react";
import { CALENDLY_URL } from "@/lib/booking";
import { RevealSection } from "@/lib/motion";

// ── Webinar constants (single source of truth — no hardcoded literals in markup) ──
const COHORT_DATE = "2026-08-03T09:00:00-05:00";
const N8N_WEBHOOK = "https://n8n.srv1759554.hstgr.cloud/webhook/lead-intake";
const VIDEO_SRC = "/videos/grad-testimonial.mp4";
const VIDEO_POSTER = "/videos/grad-testimonial-poster.jpg";

// ── Scoped theme tokens (mirror the employers page's design system) ──
const CREAM = "#FBF6EA";
const INK = "#12100E";
const INK_HOVER = "#2A2824";
const GOLD = "#C9A227";
const GOLD_GRAD = "linear-gradient(135deg, #E8B930 0%, #C9A227 45%, #A07820 100%)";
const STONE = "#5C5A56";
const PARCHMENT = "#E8DFC8";
const BLUE = "#3B4DB8";
const BLUE_BG = "#F0F4FF";
const BLUE_BORDER = "#D8DEFF";
const ease = [0.16, 1, 0.3, 1] as const;
const goldTextGrad: React.CSSProperties = {
  color: GOLD,
  background: GOLD_GRAD,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

export const Route = createFileRoute("/webinar")({
  head: () => ({
    meta: [
      { title: "Break Into AI — Free Training | Claim Academy AI Internship" },
      {
        name: "description",
        content:
          "Watch our free AI training and see exactly what you'll learn in the Claim Academy AI Internship. Cohort starts August 3.",
      },
      { property: "og:title", content: "Break Into AI — Free Training" },
      {
        property: "og:description",
        content: "Watch our free AI training and see exactly what you'll learn in the Claim Academy AI Internship. Cohort starts August 3.",
      },
      { property: "og:type", content: "website" },
    ],
    // Google Ads tag (gtag.js) — this page only, per the ad campaign pointed at /webinar.
    scripts: [
      { attrs: { src: "https://www.googletagmanager.com/gtag/js?id=AW-957715891", async: true } },
      {
        children: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'AW-957715891');`,
      },
    ],
  }),
  component: Webinar,
});

// ══ Shared-style primitives (replicated from the employers page — the repo's
//    per-page-local convention — so the webinar matches it exactly) ════════════

// Count-up on scroll (ease-out-cubic via rAF, respects reduced motion).
function useCountUp(target: number, duration = 2000, decimals = 0) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion() ?? false;
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setCount(target);
      return;
    }
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(parseFloat((eased * target).toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration, decimals, reduce]);
  return { ref, count };
}

// Gold-gradient count-up stat. `tone` picks the label color for ink vs cream backgrounds.
function Stat({ target, suffix, label, tone = "ink" }: { target: number; suffix: string; label: string; tone?: "ink" | "cream" }) {
  const { ref, count } = useCountUp(target, 2000);
  const labelColor = tone === "cream" ? "rgba(251,246,234,0.5)" : STONE;
  return (
    <div>
      <span
        ref={ref}
        style={{
          fontWeight: 800,
          fontSize: "clamp(2.4rem, 5vw, 3.6rem)",
          letterSpacing: "-0.04em",
          lineHeight: 1,
          ...goldTextGrad,
        }}
      >
        {count.toLocaleString()}
        {suffix}
      </span>
      <div style={{ fontWeight: 600, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.12em", color: labelColor, marginTop: "0.6rem" }}>
        {label}
      </div>
    </div>
  );
}

// Shimmer sweep for pill CTAs (driven by `.wb-root a:hover .btn-shimmer` in scoped CSS).
function BtnShimmer() {
  return (
    <span
      aria-hidden
      className="btn-shimmer"
      style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)",
        transform: "translateX(-100%)",
        transition: "transform 0.55s ease",
        pointerEvents: "none",
        borderRadius: "inherit",
      }}
    />
  );
}

// Small-caps eyebrow label.
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ color: GOLD, fontWeight: 600, fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "14px" }}>
      {children}
    </p>
  );
}

// Track-colored tag (Engineering = gold system, Builders = blue system).
function TrackTag({ track, children }: { track: "engineering" | "builders"; children: React.ReactNode }) {
  const isEng = track === "engineering";
  const style: React.CSSProperties = isEng
    ? { background: "rgba(201,162,39,0.1)", color: GOLD, border: "1px solid rgba(201,162,39,0.28)" }
    : { background: BLUE_BG, color: BLUE, border: `1px solid ${BLUE_BORDER}` };
  return (
    <span style={{ display: "inline-block", fontWeight: 600, fontSize: "12px", padding: "5px 12px", borderRadius: "100px", ...style }}>
      {children}
    </span>
  );
}

// Gold pill CTA with trailing arrow-circle + shimmer. `external` opens Calendly in a new tab.
function GoldCta({ href, children, external = false, size = "md" }: { href: string; children: React.ReactNode; external?: boolean; size?: "md" | "lg" }) {
  const circle = size === "lg" ? 38 : 32;
  const arrow = size === "lg" ? 17 : 14;
  const padLeft = size === "lg" ? "30px" : "24px";
  const fontSize = size === "lg" ? "16px" : "14px";
  const ext = external ? { target: "_blank" as const, rel: "noopener noreferrer" } : {};
  return (
    <a
      href={href}
      {...ext}
      className="wb-btn"
      style={{
        display: "inline-flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        gap: "12px",
        background: GOLD,
        borderRadius: "999px",
        padding: `8px 8px 8px ${padLeft}`,
        textDecoration: "none",
        transition: "background-color 0.2s ease, transform 150ms cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = "#B8901F"; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = GOLD; }}
    >
      <BtnShimmer />
      <span style={{ color: INK, fontWeight: 700, fontSize }}>{children}</span>
      <span className="wb-btn-circle" style={{ width: circle, height: circle, borderRadius: "50%", background: INK, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <ArrowRight size={arrow} color={CREAM} />
      </span>
    </a>
  );
}

// Ghost/outline secondary pill (parchment border → ink on hover) with shimmer.
function SecondaryButton({ href, children, external = false, onDark = false }: { href: string; children: React.ReactNode; external?: boolean; onDark?: boolean }) {
  const base = onDark ? "rgba(251,246,234,0.75)" : STONE;
  const border = onDark ? "rgba(251,246,234,0.3)" : PARCHMENT;
  const hover = onDark ? CREAM : INK;
  const ext = external ? { target: "_blank" as const, rel: "noopener noreferrer" } : {};
  return (
    <a
      href={href}
      {...ext}
      className="wb-btn"
      style={{
        display: "inline-block",
        position: "relative",
        overflow: "hidden",
        background: "transparent",
        border: `1.5px solid ${border}`,
        color: base,
        fontWeight: 500,
        fontSize: "16px",
        padding: "14px 30px",
        borderRadius: "999px",
        textDecoration: "none",
        transition: "border-color 150ms, color 150ms, transform 150ms cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = hover; e.currentTarget.style.color = hover; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = border; e.currentTarget.style.color = base; }}
    >
      <BtnShimmer />
      {children}
    </a>
  );
}

// ── Countdown ─────────────────────────────────────────────────────────────────
type TimeLeft = { days: number; hours: number; mins: number; secs: number } | null;

function getTimeLeft(): TimeLeft {
  const target = new Date(COHORT_DATE).getTime();
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

function Countdown({ timeLeft }: { timeLeft: NonNullable<TimeLeft> }) {
  const cells: { v: number; l: string }[] = [
    { v: timeLeft.days, l: "Days" },
    { v: timeLeft.hours, l: "Hrs" },
    { v: timeLeft.mins, l: "Min" },
    { v: timeLeft.secs, l: "Sec" },
  ];
  return (
    <div className="wb-countdown-panel">
      <div className="wb-countdown-head">
        <span className="wb-live-dot" aria-hidden />
        Next cohort starts in
      </div>
      <div className="wb-countdown-cells">
        {cells.map((c, i) => (
          <div className="wb-cd-cellwrap" key={c.l}>
            <div className="wb-cd-cell">
              <span className="wb-cd-num" style={goldTextGrad}>{String(c.v).padStart(2, "0")}</span>
              <span className="wb-cd-lbl">{c.l}</span>
            </div>
            {i < cells.length - 1 && <span className="wb-cd-colon" aria-hidden>:</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Content data ──────────────────────────────────────────────────────────────
const LEARN = [
  {
    icon: Sparkles,
    title: "The AI tools companies are actually hiring for",
    body: "Cursor, Claude API, n8n, Lovable, Supabase, LangGraph, FastAPI — hands-on, not theory.",
  },
  {
    icon: Calendar,
    title: "What 12 weeks looks like — and what comes after",
    body: "4 weeks live online training (Mon/Wed/Fri, 60 min sessions, recorded) + 8 weeks guaranteed US employer internship, in writing.",
  },
  {
    icon: Wallet,
    title: "How to get it fully funded",
    body: "Multiple payment options including $0 upfront — ISA, employer reimbursement, and payment plans. Most students find a path that works.",
  },
];

const WHO = [
  {
    icon: GraduationCap,
    title: "Recent grads",
    body: "You've got the degree but not the callbacks. Get a real, paid on-ramp into AI instead of another unpaid internship.",
  },
  {
    icon: Repeat,
    title: "Working professionals",
    body: "You want into AI without quitting your job first. Evening-friendly live training, then a placement — while you keep your income.",
  },
  {
    icon: Zap,
    title: "Career switchers",
    body: "You're done waiting for permission to work in tech. Build with the exact tools AI teams use, and get placed to prove it.",
  },
];

const ENG_TOOLS = ["Claude API", "RAG", "LangGraph", "FastAPI", "Supabase", "Langfuse"];
const BUILD_TOOLS = ["Cursor", "Lovable.dev", "n8n", "Supabase", "Claude.ai Projects"];

// Faint node-graph backdrop (n8n / LangGraph motif) — static, decorative.
function NodeGraph() {
  return (
    <svg className="wb-nodegraph" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" aria-hidden focusable="false">
      <defs>
        <linearGradient id="wbEdge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#E8B930" />
          <stop offset="1" stopColor="#A07820" />
        </linearGradient>
      </defs>
      <g stroke="url(#wbEdge)" strokeWidth="1" fill="none" opacity="0.9">
        <path d="M120 120 C 220 120, 240 250, 360 250" />
        <path d="M120 120 C 200 140, 260 90, 380 90" />
        <path d="M360 250 C 480 250, 500 130, 600 130" />
        <path d="M360 250 C 470 250, 520 380, 640 380" />
        <path d="M380 90 C 520 90, 540 130, 600 130" />
      </g>
      <g fill="#C9A227">
        {[[120, 120], [380, 90], [360, 250], [600, 130], [640, 380]].map(([x, y]) => (
          <g key={`${x}-${y}`}>
            <circle cx={x} cy={y} r="5" />
            <circle cx={x} cy={y} r="11" fill="none" stroke="#C9A227" strokeWidth="1" opacity="0.5" />
          </g>
        ))}
      </g>
    </svg>
  );
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
  const reduce = useReducedMotion() ?? false;

  // Progressive-reveal state: Step 2 (Calendly) stays blurred/locked until Step 1
  // (registration) succeeds, then unlocks and pre-fills with the lead's own details.
  const [calendlyUnlocked, setCalendlyUnlocked] = useState(false);
  const [registeredUser, setRegisteredUser] = useState({ name: "", email: "", phone: "" });

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

  // Loads the Calendly inline-widget script once on mount for the "book a call
  // directly" column beside the registration form. Cleaned up on unmount.
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.head.appendChild(script);
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  // Fires the Google Ads "actually booked" conversion when Calendly's embedded widget
  // posts a page-level event_scheduled message — distinct from webinar_signup above,
  // since this tracks the direct-booking path rather than the free-training signup.
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data.event === "calendly.event_scheduled") {
        (window as unknown as { gtag?: (command: string, action: string, params: object) => void }).gtag?.(
          "event",
          "conversion",
          { send_to: "AW-957715891/calendly_booked" }
        );
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

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
          webinar_date: COHORT_DATE,
          notes: "Registered via webinar landing page",
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      (window as unknown as { gtag?: (command: string, action: string, params: object) => void }).gtag?.(
        "event",
        "conversion",
        { send_to: "AW-957715891/webinar_signup" }
      );
      setCalendlyUnlocked(true);
      setRegisteredUser({
        name: `${form.firstName} ${form.lastName}`,
        email: form.email,
        phone: form.phone,
      });
      setTimeout(() => {
        document.getElementById("step2-calendly")?.scrollIntoView({ behavior: "smooth" });
      }, 500);
    } catch {
      setStatus("error");
    }
  }

  const calendlyUrl = calendlyUnlocked
    ? `https://calendly.com/ola-claimacademy/your-career-coach-discovery-call-clone?hide_gdpr_banner=1&primary_color=C9A227&name=${encodeURIComponent(registeredUser.name)}&email=${encodeURIComponent(registeredUser.email)}&a1=${encodeURIComponent(registeredUser.phone)}`
    : `https://calendly.com/ola-claimacademy/your-career-coach-discovery-call-clone?hide_gdpr_banner=1&primary_color=C9A227`;

  // Re-initializes the Calendly inline widget once Step 1 unlocks so it actually
  // re-reads the new data-url (with pre-fill params) — Calendly's own script only
  // parses data-url once on initial mount, so a fresh URL alone won't apply prefill
  // to an already-mounted widget.
  useEffect(() => {
    if (calendlyUnlocked && (window as unknown as { Calendly?: { initInlineWidget: (opts: unknown) => void } }).Calendly) {
      const widget = document.querySelector(".calendly-inline-widget");
      if (widget) {
        (window as unknown as { Calendly: { initInlineWidget: (opts: unknown) => void } }).Calendly.initInlineWidget({
          url: calendlyUrl,
          parentElement: widget,
          prefill: {
            name: registeredUser.name,
            email: registeredUser.email,
            customAnswers: { a1: registeredUser.phone },
          },
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calendlyUnlocked]);

  const loading = status === "loading";

  const heroAnim = (delay: number) => ({
    initial: reduce ? { opacity: 1 } : { opacity: 0, y: 18 },
    animate: reduce ? { opacity: 1 } : { opacity: 1, y: 0 },
    transition: { duration: reduce ? 0 : 0.6, ease, delay: reduce ? 0 : delay },
  });

  return (
    <div className="wb-root">
      <style>{WB_CSS}</style>

      {/* ══ HERO (ink, node-graph backdrop) ══ */}
      <header className="wb-hero">
        <NodeGraph />
        <div className="wb-wrap wb-hero-inner">
          <motion.div {...heroAnim(0.02)} className="wb-pill-wrap">
            <span className="wb-pill">
              <span className="wb-pill-dot" aria-hidden />
              <span className="wb-pill-live">NEXT COHORT</span>
              <span className="wb-pill-sep" aria-hidden>·</span>
              August 3, 2026 · Applications Close August 3 · Limited Spots
              <span className="wb-pill-arrow" aria-hidden><ArrowRight size={12} color={CREAM} /></span>
            </span>
          </motion.div>

          <div className="wb-hero-row">
            {/* LEFT — content */}
            <div className="wb-hero-copy">
              <motion.h1 {...heroAnim(0.12)} className="wb-h1">
                Break into <span style={goldTextGrad}>AI</span>.
              </motion.h1>
              <motion.div {...heroAnim(0.2)} className="wb-h1-accent" aria-hidden />
              <motion.p {...heroAnim(0.28)} className="wb-subhead">
                Register below and we'll send your webinar access link instantly. Join when you're ready — no waiting, no scheduling.
              </motion.p>

              {timeLeft ? (
                <motion.div {...heroAnim(0.36)}><Countdown timeLeft={timeLeft} /></motion.div>
              ) : (
                <motion.div {...heroAnim(0.36)} className="wb-countdown-panel">
                  <div className="wb-countdown-head"><span className="wb-live-dot" aria-hidden /> Registration open — seats are limited</div>
                </motion.div>
              )}

              <motion.div {...heroAnim(0.44)} className="wb-cta-row">
                <GoldCta href="#register" size="lg">Save My Spot</GoldCta>
                <SecondaryButton href={CALENDLY_URL} external onDark>Talk to an Advisor</SecondaryButton>
              </motion.div>
              <motion.p {...heroAnim(0.5)} className="wb-cta-note">Skip the webinar — book a call directly</motion.p>
            </div>

            {/* RIGHT — video */}
            <motion.div {...heroAnim(0.34)} className="wb-hero-media">
              <video
                controls
                playsInline
                poster={VIDEO_POSTER}
                style={{
                  width: "100%",
                  borderRadius: "12px",
                  border: "1px solid #C9A227",
                }}
              >
                <source src={VIDEO_SRC} type="video/mp4" />
              </video>
              <p style={{ color: STONE, fontSize: "14px", textAlign: "center", marginTop: "8px" }}>
                Hear from a Claim Academy graduate
              </p>
            </motion.div>
          </div>

          {/* Trust bar */}
          <motion.div {...heroAnim(0.56)} className="wb-trust">
            <div className="wb-trust-item"><Stat target={3800} suffix="+" label="Graduates" tone="cream" /></div>
            <span className="wb-trust-sep" aria-hidden />
            <div className="wb-trust-item"><Stat target={87} suffix="%" label="Job placement" tone="cream" /></div>
            <span className="wb-trust-sep" aria-hidden />
            <div className="wb-trust-item"><Stat target={11} suffix="" label="Years" tone="cream" /></div>
          </motion.div>
        </div>
      </header>

      {/* ══ WHAT YOU'LL LEARN (cream) ══ */}
      <section className="wb-section">
        <div className="wb-wrap">
          <RevealSection>
            <div className="wb-head">
              <Eyebrow>One free hour</Eyebrow>
              <h2 className="wb-h2">Walk out knowing exactly what you'd build — and what it's worth.</h2>
            </div>
          </RevealSection>
          <div className="wb-grid-3">
            {LEARN.map((c, i) => (
              <RevealSection key={c.title} delay={i * 0.08}>
                <div className="wb-card">
                  <div className="wb-icontile"><c.icon size={22} color={INK} /></div>
                  <h3 className="wb-card-title">{c.title}</h3>
                  <p className="wb-card-body">{c.body}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TWO TRACKS (parchment) ══ */}
      <section className="wb-section wb-section-parch">
        <div className="wb-wrap">
          <RevealSection>
            <div className="wb-head">
              <Eyebrow>Two tracks</Eyebrow>
              <h2 className="wb-h2">Pick the path that fits where you're headed.</h2>
            </div>
          </RevealSection>
          <div className="wb-grid-2">
            <RevealSection>
              <div className="wb-track wb-track-eng">
                <TrackTag track="engineering">Engineering Track</TrackTag>
                <h3 className="wb-track-title">Build the AI systems</h3>
                <p className="wb-track-sub">For people who want to engineer the models, pipelines, and APIs behind AI products.</p>
                <div className="wb-tools">{ENG_TOOLS.map((t) => <TrackTag key={t} track="engineering">{t}</TrackTag>)}</div>
                <div className="wb-track-outcome">Outcome → <strong style={goldTextGrad}>AI Engineer / AI Architect</strong></div>
              </div>
            </RevealSection>
            <RevealSection delay={0.08}>
              <div className="wb-track wb-track-build">
                <TrackTag track="builders">Builders Track</TrackTag>
                <h3 className="wb-track-title">Ship AI products fast</h3>
                <p className="wb-track-sub">For people who want to build and launch AI-powered apps and automations, fast.</p>
                <div className="wb-tools">{BUILD_TOOLS.map((t) => <TrackTag key={t} track="builders">{t}</TrackTag>)}</div>
                <div className="wb-track-outcome" style={{ color: BLUE }}>Outcome → <strong style={{ color: BLUE }}>AI PM / AI Builder</strong></div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ══ WHO THIS IS FOR (cream) ══ */}
      <section className="wb-section">
        <div className="wb-wrap">
          <RevealSection>
            <div className="wb-head">
              <Eyebrow>Who this is for</Eyebrow>
              <h2 className="wb-h2">If this sounds like you, this training was built for you.</h2>
            </div>
          </RevealSection>
          <div className="wb-grid-3">
            {WHO.map((c, i) => (
              <RevealSection key={c.title} delay={i * 0.08}>
                <div className="wb-card wb-who">
                  <div className="wb-icontile"><c.icon size={22} color={INK} /></div>
                  <h3 className="wb-card-title">{c.title}</h3>
                  <p className="wb-card-body">{c.body}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ABOUT + GUARANTEE (ink) ══ */}
      <section className="wb-section wb-section-ink">
        <div className="wb-wrap">
          <RevealSection>
            <div className="wb-head">
              <Eyebrow>About Claim Academy</Eyebrow>
              <h2 className="wb-h2" style={{ color: CREAM }}>11 years of turning outsiders into hired engineers.</h2>
            </div>
          </RevealSection>
          <RevealSection delay={0.05}>
            <div className="wb-about-stats">
              <Stat target={11} suffix="" label="Years" tone="cream" />
              <Stat target={3800} suffix="+" label="Graduates" tone="cream" />
              <Stat target={87} suffix="%" label="Job placement (2023)" tone="cream" />
              <Stat target={2} suffix="" label="Employer partners / student" tone="cream" />
            </div>
          </RevealSection>
          <RevealSection delay={0.1}>
            <div className="wb-guarantee">
              <div className="wb-guarantee-badge"><ShieldCheck size={20} color={INK} /></div>
              <div>
                <h3 className="wb-guarantee-title">Guaranteed US employer placement — in writing.</h3>
                <p className="wb-guarantee-body">We place every student with a vetted US employer within 2 weeks of bootcamp completion. If we don't: full refund.</p>
                <p className="wb-guarantee-fine">2 employer partners confirmed per student before each cohort opens.</p>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ══ REGISTRATION (cream) ══ */}
      <section className="wb-section wb-register" id="register">
        <div className="wb-wrap">
          <div className="wb-register-labels">
            <p className="wb-register-label">Step 1 — Get your free training</p>
            <p className="wb-register-label">Step 2 — Book your discovery call</p>
          </div>
          <div className="wb-register-grid">
          <RevealSection>
            <div className="wb-register-card">
              {status === "success" ? (
                <div className="wb-success">
                  <div className="wb-success-badge"><Check size={30} color="#16A34A" /></div>
                  <h3 className="wb-success-title">You're registered!</h3>
                  <p className="wb-success-body">Check your email for your webinar access link. See you inside.</p>
                  <div className="wb-success-again">
                    <p style={{ marginBottom: "14px", color: STONE, fontSize: "15px" }}>Already ready to enroll?</p>
                    <GoldCta href={CALENDLY_URL} external>Book a discovery call</GoldCta>
                  </div>
                </div>
              ) : (
                <>
                  <div className="wb-register-head">
                    <Eyebrow>Save your spot</Eyebrow>
                    <h2 className="wb-register-title">Get Instant Webinar Access — Free</h2>
                    <p className="wb-register-sub">Break Into AI · Free training video · Delivered by email</p>
                  </div>
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="wb-grid-2 wb-form-grid">
                      <Field label="First name" id="wb-firstName" placeholder="Jordan" value={form.firstName} onChange={update("firstName")} invalid={!!errors.firstName} autoComplete="given-name" />
                      <Field label="Last name" id="wb-lastName" placeholder="Rivera" value={form.lastName} onChange={update("lastName")} invalid={!!errors.lastName} autoComplete="family-name" />
                    </div>
                    <Field label="Email" id="wb-email" type="email" placeholder="you@email.com" value={form.email} onChange={update("email")} invalid={!!errors.email} autoComplete="email" />
                    <Field label="Phone" id="wb-phone" type="tel" placeholder="(314) 555-0123" value={form.phone} onChange={update("phone")} invalid={!!errors.phone} autoComplete="tel" />

                    <button type="submit" disabled={loading} className={`wb-btn wb-submit${loading ? " wb-loading" : ""}`}>
                      <BtnShimmer />
                      <span className="wb-spinner" aria-hidden />
                      <span>{loading ? "Saving your spot…" : "Get Instant Access — It's Free"}</span>
                    </button>
                    <p className="wb-no-cc">No credit card. No obligation. Just watch.</p>
                    {status === "error" && (
                      <p className="wb-form-error" role="alert">Something went wrong — please try again or email info@claimaiinternship.com</p>
                    )}
                  </form>
                  <div className="wb-sep">or</div>
                  <div className="wb-book-link">
                    <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">Already ready to enroll? Book a discovery call →</a>
                  </div>
                </>
              )}
            </div>
          </RevealSection>

          <RevealSection delay={0.08}>
            <div className="wb-calendly-panel" id="step2-calendly">
              <p className="wb-calendly-eyebrow">Step 2 — Book your call</p>
              <h3 className="wb-calendly-headline">Already convinced?<br />Skip the video.</h3>
              <p className="wb-calendly-body">
                Book a free 30-minute call with our team. We'll cover the program, funding options, and next steps.
              </p>

              {calendlyUnlocked && (
                <div className="wb-calendly-unlocked-msg">
                  <p>✅ You're registered! Now pick a time for your discovery call — your details are pre-filled.</p>
                </div>
              )}

              <div className="wb-calendly-widget-wrap">
                <div
                  className="calendly-inline-widget wb-calendly-widget"
                  data-url={calendlyUrl}
                  style={{
                    minWidth: "280px",
                    filter: calendlyUnlocked ? "none" : "blur(4px)",
                    pointerEvents: calendlyUnlocked ? "all" : "none",
                    transition: "filter 0.5s ease",
                  }}
                />

                {!calendlyUnlocked && (
                  <div className="wb-calendly-lock">
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ marginBottom: "16px" }}
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="#C9A227" strokeWidth="1.5" fill="none" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round" />
                      <circle cx="12" cy="16" r="1.5" fill="#C9A227" />
                      <line x1="12" y1="17.5" x2="12" y2="19" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <p className="wb-calendly-lock-title">Complete Step 1 first</p>
                    <p className="wb-calendly-lock-body">
                      Register above to unlock your booking slot — we'll pre-fill your details automatically.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </RevealSection>
          </div>
        </div>
      </section>

      {/* ══ URGENCY FOOTER (ink) ══ */}
      <section className="wb-urgency">
        <NodeGraph />
        <div className="wb-wrap wb-urgency-inner">
          <RevealSection>
            <h2 className="wb-urgency-h">Our next cohort starts August 3, 2026.</h2>
            <p className="wb-urgency-sub">Applications close August 3. Seats are limited.</p>
            <div className="wb-cta-row wb-urgency-cta">
              <GoldCta href="#register" size="lg">Save My Spot</GoldCta>
              <SecondaryButton href={CALENDLY_URL} external onDark>Book a Call</SecondaryButton>
            </div>
          </RevealSection>
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

// Labelled text input for the registration form.
function Field({
  label, id, value, onChange, invalid, placeholder, type = "text", autoComplete,
}: {
  label: string; id: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  invalid: boolean; placeholder: string; type?: string; autoComplete?: string;
}) {
  return (
    <label className="wb-field" htmlFor={id}>
      <span className="wb-field-label">{label} <span style={{ color: GOLD }}>*</span></span>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={type === "email" ? "email" : type === "tel" ? "tel" : undefined}
        className={invalid ? "wb-invalid" : ""}
      />
      {invalid && <span className="wb-field-err">Please enter a valid {label.toLowerCase()}.</span>}
    </label>
  );
}

// ── Scoped styles — all selectors under `.wb-root`; Poppins loaded globally. ──
const WB_CSS = `
  .wb-root, .wb-root * { font-family: 'Poppins', system-ui, sans-serif; box-sizing: border-box; }
  .wb-root {
    --cream:#FBF6EA; --ink:#12100E; --gold:#C9A227; --stone:#5C5A56; --parchment:#E8DFC8;
    background: var(--cream); color: var(--stone); overflow-x: clip; max-width: 100%;
  }
  .wb-root img, .wb-root iframe, .wb-root svg { max-width: 100%; }
  .wb-wrap { width: 100%; max-width: 1160px; margin: 0 auto; padding: 0 24px; }
  html { scroll-behavior: smooth; }

  /* Buttons: shimmer sweep + springy press (mirrors the employers page). */
  .wb-root .wb-btn { position: relative; overflow: hidden; }
  .wb-root .wb-btn:hover { transform: scale(1.03); }
  .wb-root .wb-btn:active { transform: scale(0.97); }
  .wb-root a.wb-btn:hover .btn-shimmer, .wb-root button.wb-btn:hover .btn-shimmer { transform: translateX(100%) !important; }
  .wb-root .wb-btn .wb-btn-circle { transition: box-shadow 200ms ease; }
  .wb-root .wb-btn:hover .wb-btn-circle { box-shadow: 0 0 0 3px rgba(201,162,39,0.25); }

  /* ── HERO ── */
  .wb-hero { position: relative; overflow: hidden; background: var(--ink); color: var(--cream); padding: 128px 0 72px; }
  .wb-nodegraph { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0.16; pointer-events: none;
    -webkit-mask-image: radial-gradient(120% 90% at 72% 18%, #000 30%, transparent 82%); mask-image: radial-gradient(120% 90% at 72% 18%, #000 30%, transparent 82%); }
  .wb-hero-inner { position: relative; z-index: 1; }

  .wb-pill-wrap { margin-bottom: 30px; }
  .wb-pill { display: inline-flex; align-items: center; gap: 9px; font-size: 13px; color: rgba(251,246,234,0.9);
    background: rgba(251,246,234,0.06); backdrop-filter: blur(12px) saturate(1.4); -webkit-backdrop-filter: blur(12px) saturate(1.4);
    border: 1px solid rgba(201,162,39,0.3); box-shadow: inset 0 1px 0 rgba(255,255,255,0.08), 0 4px 20px rgba(0,0,0,0.3);
    border-radius: 999px; padding: 6px 8px 6px 14px; }
  .wb-pill-dot { width: 8px; height: 8px; border-radius: 50%; background: linear-gradient(135deg,#E8B930,#C9A227); box-shadow: 0 0 10px rgba(201,162,39,0.7); flex-shrink: 0; }
  .wb-pill-live { font-weight: 700; letter-spacing: 0.1em; color: #C9A227; font-size: 12px; }
  .wb-pill-sep { color: rgba(251,246,234,0.3); }
  .wb-pill-arrow { width: 22px; height: 22px; border-radius: 50%; background: rgba(201,162,39,0.9); display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }

  .wb-hero-row { display: grid; grid-template-columns: 1fr; gap: 40px; align-items: center; }
  .wb-hero-copy, .wb-hero-media { min-width: 0; }
  .wb-grid-3 > *, .wb-grid-2 > * { min-width: 0; }
  .wb-h1 { font-weight: 900; font-size: clamp(2.8rem, 8vw, 5.4rem); line-height: 0.98; letter-spacing: -0.045em; color: var(--cream); margin: 0; }
  .wb-h1-accent { width: 76px; height: 5px; border-radius: 4px; background: linear-gradient(135deg,#E8B930,#C9A227,#A07820); margin: 22px 0 0; }
  .wb-subhead { font-size: 18px; line-height: 1.65; color: rgba(251,246,234,0.72); max-width: 30ch; margin: 22px 0 0; }

  /* Countdown centrepiece */
  .wb-countdown-panel { margin: 30px 0 0; padding: 20px 22px; border-radius: 18px;
    background: rgba(251,246,234,0.04); border: 1px solid rgba(201,162,39,0.28);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.06), 0 10px 40px rgba(0,0,0,0.35); display: block; max-width: 460px; }
  .wb-countdown-head { display: flex; align-items: center; gap: 9px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.14em; color: rgba(251,246,234,0.55); margin-bottom: 16px; }
  .wb-live-dot { width: 8px; height: 8px; border-radius: 50%; background: #C9A227; box-shadow: 0 0 0 0 rgba(201,162,39,0.5); animation: wbPulse 2s ease-in-out infinite; flex-shrink: 0; }
  @keyframes wbPulse { 0%,100% { box-shadow: 0 0 0 0 rgba(201,162,39,0.5);} 50% { box-shadow: 0 0 0 7px rgba(201,162,39,0);} }
  .wb-countdown-cells { display: flex; align-items: flex-start; gap: 4px; }
  .wb-cd-cellwrap { display: flex; align-items: flex-start; gap: 4px; }
  .wb-cd-cell { display: flex; flex-direction: column; align-items: center; min-width: 3ch; }
  .wb-cd-num { font-weight: 800; font-size: clamp(2.4rem, 6vw, 3.6rem); line-height: 1; letter-spacing: -0.03em; font-variant-numeric: tabular-nums; }
  .wb-cd-lbl { font-size: 10px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(251,246,234,0.4); margin-top: 8px; }
  .wb-cd-colon { font-weight: 700; font-size: clamp(1.8rem,4vw,2.6rem); color: rgba(201,162,39,0.5); line-height: 1; padding-top: 4px; }

  .wb-cta-row { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 30px; align-items: center; }
  .wb-cta-note { font-size: 13px; color: rgba(251,246,234,0.45); margin: 12px 0 0; }

  .wb-hero-media { width: 100%; }

  .wb-trust { display: flex; flex-wrap: wrap; align-items: center; gap: 22px 30px; margin-top: 56px;
    padding: 26px 30px; border-radius: 18px; background: rgba(251,246,234,0.04); border: 1px solid rgba(251,246,234,0.08); }
  .wb-trust-item { flex: 1 1 auto; min-width: 120px; }
  .wb-trust-sep { width: 1px; align-self: stretch; background: rgba(251,246,234,0.1); }

  /* ── Sections ── */
  .wb-section { padding: 92px 0; }
  .wb-section-parch { background: var(--parchment); }
  .wb-section-ink { background: var(--ink); }
  .wb-head { max-width: 680px; margin-bottom: 48px; }
  .wb-h2 { font-weight: 800; font-size: clamp(1.9rem, 4vw, 3rem); line-height: 1.08; letter-spacing: -0.03em; color: var(--ink); margin: 0; }

  .wb-grid-3 { display: grid; grid-template-columns: 1fr; gap: 22px; }
  .wb-grid-2 { display: grid; grid-template-columns: 1fr; gap: 22px; }

  .wb-card { background: var(--cream); border: 1px solid var(--parchment); border-radius: 18px; padding: 30px; height: 100%; }
  .wb-section-parch .wb-card { background: #FFFDF7; }
  .wb-icontile { width: 48px; height: 48px; border-radius: 13px; background: linear-gradient(135deg,#E8B930,#C9A227,#A07820); display: flex; align-items: center; justify-content: center; margin-bottom: 20px; box-shadow: 0 6px 18px rgba(201,162,39,0.28); }
  .wb-card-title { font-weight: 700; font-size: 19px; line-height: 1.3; color: var(--ink); margin: 0 0 10px; }
  .wb-card-body { font-size: 15px; line-height: 1.65; color: var(--stone); margin: 0; }

  /* Tracks */
  .wb-track { background: #FFFDF7; border: 1px solid var(--parchment); border-radius: 18px; padding: 32px; height: 100%; position: relative; overflow: hidden; }
  .wb-track::before { content: ""; position: absolute; top: 0; left: 0; right: 0; height: 4px; }
  .wb-track-eng::before { background: linear-gradient(90deg,#E8B930,#C9A227,#A07820); }
  .wb-track-build::before { background: linear-gradient(90deg,#6E7CE0,#3B4DB8); }
  .wb-track-title { font-weight: 800; font-size: 23px; letter-spacing: -0.02em; color: var(--ink); margin: 16px 0 8px; }
  .wb-track-sub { font-size: 15px; line-height: 1.6; color: var(--stone); margin: 0 0 18px; }
  .wb-tools { display: flex; flex-wrap: wrap; gap: 8px; }
  .wb-track-outcome { margin-top: 22px; padding-top: 18px; border-top: 1px dashed var(--parchment); font-size: 15px; font-weight: 500; color: var(--stone); }

  /* About (ink) */
  .wb-about-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 32px 24px; margin-bottom: 44px; }
  .wb-guarantee { display: flex; gap: 20px; align-items: flex-start; background: rgba(251,246,234,0.04); border: 1px solid rgba(201,162,39,0.3); border-radius: 20px; padding: 30px; }
  .wb-guarantee-badge { width: 46px; height: 46px; border-radius: 12px; background: linear-gradient(135deg,#E8B930,#C9A227); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .wb-guarantee-title { font-weight: 700; font-size: 20px; line-height: 1.3; color: var(--cream); margin: 0 0 10px; }
  .wb-guarantee-body { font-size: 16px; line-height: 1.6; color: rgba(251,246,234,0.75); margin: 0 0 8px; }
  .wb-guarantee-fine { font-size: 13px; color: rgba(251,246,234,0.45); margin: 0; }

  /* Register */
  .wb-register { background: var(--cream); }

  .wb-register-labels { display: none; }

  .wb-register-grid { display: grid; grid-template-columns: 1fr; gap: 40px; max-width: 1100px; margin: 0 auto; align-items: start; }

  .wb-register-card { max-width: 560px; margin: 0 auto; background: #FFFDF7; border: 1px solid var(--parchment); border-radius: 22px; padding: 40px; box-shadow: 0 20px 60px rgba(18,16,14,0.07); }

  .wb-calendly-panel { background: #ffffff; border-radius: 16px; border: 1px solid var(--parchment); overflow: hidden; padding: 32px 24px; }
  .wb-calendly-eyebrow { color: var(--gold); font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; margin: 0 0 12px; text-align: center; }
  .wb-calendly-headline { color: var(--ink); font-size: 20px; font-weight: 800; margin: 0 0 8px; text-align: center; line-height: 1.3; }
  .wb-calendly-body { color: var(--stone); font-size: 14px; margin: 0 0 20px; text-align: center; line-height: 1.6; }
  .wb-calendly-widget { height: 600px; }
  .wb-calendly-widget-wrap { position: relative; min-width: 280px; height: 600px; }
  .wb-calendly-widget-wrap .wb-calendly-widget { width: 100%; height: 100%; }

  .wb-calendly-unlocked-msg { background: #C9A22720; border: 1px solid #C9A22760; border-radius: 8px; padding: 12px 16px; margin: 0 0 16px; text-align: center; }
  .wb-calendly-unlocked-msg p { color: #A07820; font-size: 14px; font-weight: 700; margin: 0; }

  .wb-calendly-lock { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; background: rgba(251,246,234,0.85); border-radius: 8px; z-index: 10; }
  .wb-calendly-lock-title { color: var(--ink); font-size: 16px; font-weight: 700; text-align: center; margin: 0 0 8px; padding: 0 24px; }
  .wb-calendly-lock-body { color: var(--stone); font-size: 14px; text-align: center; margin: 0; padding: 0 24px; }

  .wb-register-head { text-align: center; margin-bottom: 26px; }
  .wb-register-head .wb-h2, .wb-register-title { font-weight: 800; font-size: 28px; letter-spacing: -0.02em; color: var(--ink); margin: 0 0 6px; }
  .wb-register-sub { font-size: 14px; color: var(--stone); margin: 0; }
  .wb-field { display: block; margin-bottom: 16px; }
  .wb-field-label { display: block; font-weight: 500; font-size: 14px; color: var(--ink); margin-bottom: 7px; }
  .wb-field input { width: 100%; font-size: 16px; color: var(--ink); background: #fff; border: 1px solid var(--ink); border-radius: 11px; padding: 13px 15px; transition: border-color .15s, box-shadow .15s; }
  .wb-field input::placeholder { color: #a7a291; }
  .wb-field input:focus { outline: none; border-color: var(--gold); box-shadow: 0 0 0 3px rgba(201,162,39,0.2); }
  .wb-field input.wb-invalid { border-color: #b23b3b; box-shadow: 0 0 0 3px rgba(178,59,59,0.14); }
  .wb-field-err { display: block; color: #b23b3b; font-size: 12.5px; margin-top: 5px; }

  .wb-submit { width: 100%; margin-top: 8px; display: inline-flex; align-items: center; justify-content: center; gap: 10px;
    background: var(--gold); color: var(--ink); font-weight: 700; font-size: 16px; border: none; border-radius: 999px; padding: 16px 24px; cursor: pointer;
    transition: background-color .2s, transform 150ms cubic-bezier(0.34,1.56,0.64,1); }
  .wb-submit:hover { background: #B8901F; }
  .wb-submit:disabled { opacity: .75; cursor: not-allowed; }
  .wb-spinner { width: 17px; height: 17px; border: 2px solid rgba(18,16,14,0.35); border-top-color: var(--ink); border-radius: 50%; display: none; animation: wbSpin .7s linear infinite; }
  .wb-loading .wb-spinner { display: inline-block; }
  @keyframes wbSpin { to { transform: rotate(360deg); } }
  .wb-no-cc { text-align: center; font-size: 13px; color: var(--stone); margin: 14px 0 0; }
  .wb-form-error { text-align: center; color: #b23b3b; font-size: 14px; font-weight: 500; margin: 12px 0 0; }
  .wb-sep { display: flex; align-items: center; gap: 14px; color: var(--stone); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; margin: 22px 0; }
  .wb-sep::before, .wb-sep::after { content: ""; flex: 1; height: 1px; background: var(--parchment); }
  .wb-book-link { text-align: center; }
  .wb-book-link a { color: var(--gold); font-weight: 600; font-size: 15px; text-decoration: none; }
  .wb-book-link a:hover { text-decoration: underline; }

  .wb-success { text-align: center; padding: 12px 0; }
  .wb-success-badge { width: 60px; height: 60px; border-radius: 50%; background: #DCFCE7; display: flex; align-items: center; justify-content: center; margin: 0 auto 18px; }
  .wb-success-title { font-weight: 800; font-size: 26px; color: var(--ink); margin: 0 0 10px; }
  .wb-success-body { font-size: 16px; color: var(--stone); margin: 0; }
  .wb-success-again { margin-top: 26px; padding-top: 24px; border-top: 1px solid var(--parchment); display: flex; flex-direction: column; align-items: center; }

  /* Urgency footer */
  .wb-urgency { position: relative; overflow: hidden; background: var(--ink); color: var(--cream); text-align: center; padding: 88px 0; }
  .wb-urgency-inner { position: relative; z-index: 1; }
  .wb-urgency-h { font-weight: 800; font-size: clamp(1.8rem,4vw,2.8rem); letter-spacing: -0.03em; line-height: 1.15; color: var(--cream); margin: 0 auto; max-width: 20ch; }
  .wb-urgency-sub { font-size: 17px; color: rgba(251,246,234,0.6); margin: 16px auto 30px; max-width: 40ch; }
  .wb-urgency-cta { justify-content: center; }

  .wb-footer { background: var(--ink); color: rgba(251,246,234,0.4); text-align: center; font-size: 13px; padding: 28px 0 44px; border-top: 1px solid rgba(255,255,255,0.07); }
  .wb-footer a { color: var(--gold); text-decoration: none; }

  /* ── Desktop ── */
  @media (min-width: 768px) {
    .wb-grid-3 { grid-template-columns: repeat(3, 1fr); }
    .wb-grid-2 { grid-template-columns: repeat(2, 1fr); }
    .wb-about-stats { grid-template-columns: repeat(4, 1fr); }

    .wb-register-labels { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; max-width: 1100px; margin: 0 auto 16px; }
    .wb-register-label { color: var(--gold); font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; text-align: center; margin: 0; }
    .wb-register-grid { grid-template-columns: 1fr 1fr; }
    .wb-register-card { max-width: none; margin: 0; }
  }
  @media (min-width: 940px) {
    .wb-hero { padding: 150px 0 80px; }
    .wb-hero-row { grid-template-columns: 1.05fr 0.95fr; gap: 56px; }
    .wb-form-grid { gap: 14px; }
  }

  @media (max-width: 768px) {
    .wb-calendly-widget-wrap { height: 500px; }
  }

  @media (max-width: 520px) {
    .wb-cta-row .wb-btn { width: 100%; justify-content: center; text-align: center; }
    .wb-cd-cell { min-width: 2.4ch; }
    .wb-trust { gap: 18px; padding: 22px; }
    .wb-trust-sep { display: none; }
    .wb-register-card { padding: 28px 22px; }
  }

  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    .wb-root *, .wb-root *::before, .wb-root *::after { animation: none !important; transition: none !important; }
    .wb-root .wb-btn:hover { transform: none; }
  }
`;

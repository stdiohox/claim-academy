// For Employers page — rendered at /employers (see src/routes/employers.tsx).
//
// THEME (scoped to this page only — does not touch global styles or other pages):
//   Editorial cream/ink/gold system, Poppins everywhere.
//   --cream #FBF6EA (page bg) · --white #FFFFFF (cards) · --ink #12100E (headlines/CTA)
//   --gold #C9A227 (one accent/section) · --gold-dark #C9A227 (eyebrows — unified brand gold)
//   --stone #5C5A56 (body) · --parchment #E8DFC8 (borders) · --parchment-light #F4EDD8 (tags)
//   Poppins is loaded globally in index.html; applied here via the .emp-root scope only.
//
// CANONICAL FACTS: 12-week program = 4 weeks live training + 8 weeks guaranteed US
//   internship. 3,800+ trained · 87% placement · 50+ countries · 11 years.

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion, useInView } from "framer-motion";
import { Menu, X, ArrowRight, ChevronDown, Check } from "lucide-react";
import { CALENDLY_URL } from "@/lib/booking";

// ── Scoped theme tokens (mirror the CSS vars set on .emp-root) ──
const CREAM = "#FBF6EA";
const WHITE = "#FFFFFF";
const INK = "#12100E";
const INK_HOVER = "#2A2824";
const GOLD = "#C9A227";
const GOLD_DARK = "#C9A227"; // unified with --gold (was #B8860B)
const GOLD_GRAD = "linear-gradient(135deg, #E8B930 0%, #C9A227 45%, #A07820 100%)";
// Glossy gold text: gradient clipped to glyphs, solid gold as fallback color.
const goldTextGrad: React.CSSProperties = {
  color: "#C9A227",
  background: GOLD_GRAD,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};
const STONE = "#5C5A56";
const PARCHMENT = "#E8DFC8";
const PARCHMENT_LIGHT = "#F4EDD8";
const ease = [0.16, 1, 0.3, 1] as const;

const CONTACT_EMAIL = "hello@claimacademy.org";
const WEBHOOK_URL = "https://n8n.srv1759554.hstgr.cloud/webhook/lead-intake";

// ── Canonical facts (never contradict these) ────────────────────
const FACTS = {
  trained: "3,800+",
  placement: "87%",
  countries: "50+",
  years: "11",
  guarantee:
    "We place every student with a vetted US employer within 2 weeks of bootcamp completion — in writing.",
};

// Fixed trust-bar stats (no count-up animation — fixed values only).
const TRUST_STATS = [
  { value: "3,800+", label: "graduates trained" },
  { value: "87%", label: "job placement rate" },
  { value: "11 years", label: "placing AI talent" },
];

// ── Employer marquee (illustrative/aspirational network names) ──
// Varied per-name typography so the row reads as real logos, not a uniform list.
const MARQUEE_NAMES: { name: string; style: React.CSSProperties }[] = [
  { name: "Accenture", style: { fontFamily: "Georgia, serif", fontWeight: 700, letterSpacing: "-0.02em", fontSize: "15px" } },
  { name: "Deloitte", style: { fontFamily: "Arial, sans-serif", fontWeight: 900, letterSpacing: "0.04em", fontSize: "13px", textTransform: "uppercase" } },
  { name: "PwC", style: { fontFamily: "'Poppins', sans-serif", fontWeight: 800, letterSpacing: "0.06em", fontSize: "16px" } },
  { name: "IBM", style: { fontFamily: "'Arial Narrow', Arial, sans-serif", fontWeight: 700, letterSpacing: "0.12em", fontSize: "14px", textTransform: "uppercase" } },
  { name: "Microsoft", style: { fontFamily: "'Segoe UI', sans-serif", fontWeight: 600, letterSpacing: "-0.01em", fontSize: "15px" } },
  { name: "JPMorgan", style: { fontFamily: "'Times New Roman', serif", fontWeight: 700, letterSpacing: "0.02em", fontSize: "14px" } },
  { name: "Google", style: { fontFamily: "Arial, sans-serif", fontWeight: 700, letterSpacing: "0.01em", fontSize: "15px" } },
  { name: "Salesforce", style: { fontFamily: "Verdana, sans-serif", fontWeight: 700, letterSpacing: "-0.02em", fontSize: "13px" } },
];

// ── Motion helpers (respect prefers-reduced-motion) ─────────────
function makeReveal(reduce: boolean) {
  return {
    initial: reduce ? { opacity: 1 } : { opacity: 0, y: 18 },
    whileInView: reduce ? { opacity: 1 } : { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: reduce ? 0 : 0.4, ease },
  } as const;
}
function staggerContainer(reduce: boolean, stagger = 0.1) {
  return { hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : stagger } } };
}
function fadeUpVariant(reduce: boolean) {
  return {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.4, ease } },
  };
}

// ── Reusable scroll-reveal wrapper (premium pass) ────────────────
function RevealSection({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const reduce = useReducedMotion() ?? false;
  const isInView = useInView(ref, { once: true, margin: "-8% 0px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduce ? { opacity: 1 } : { y: 48, opacity: 0, scale: 0.98 }}
      animate={isInView ? { y: 0, opacity: 1, scale: 1 } : {}}
      transition={{ duration: reduce ? 0 : 0.75, delay: reduce ? 0 : delay, ease }}
    >
      {children}
    </motion.div>
  );
}

// ── Count-up on scroll (ease-out-cubic via rAF) ─────────────────
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
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      setCount(parseFloat((eased * target).toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration, decimals, reduce]);

  return { ref, count };
}

// One animated stat for the "By the numbers" section (card bg/padding
// comes from .emp-stats-grid > div in the section CSS).
function StatCard({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const { ref, count } = useCountUp(target, 2000);
  return (
    <div>
      <span
        ref={ref}
        style={{
          fontWeight: 800,
          fontSize: "clamp(3rem, 6vw, 5rem)",
          letterSpacing: "-0.04em",
          lineHeight: 1,
          background: GOLD_GRAD,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {count.toLocaleString()}
        {suffix}
      </span>
      <div style={{ fontWeight: 600, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(251,246,234,0.45)", marginTop: "0.75rem" }}>
        {label}
      </div>
    </div>
  );
}

// ── FAQ accordion (self-contained so toggles don't re-render the page) ──
const FAQ_ITEMS = [
  {
    q: "Who owns the IP produced during the internship?",
    a: "Your company owns everything built during the engagement — full stop. Interns work under your direction on your projects. We include an IP assignment clause in every placement agreement.",
  },
  {
    q: "What if the match isn't a good fit?",
    a: "Tell us within the first two weeks and we'll rematch you at no cost. We also match 2 employer partners per student before each cohort opens, so you're already pre-vetted before day one.",
  },
  {
    q: "Can we hire the intern full-time after the trial?",
    a: "Absolutely — and we encourage it. There's no placement fee, no conversion cost. If you love the work, make an offer. 87% of host employers do.",
  },
  {
    q: "How much time does this take on our end?",
    a: "About 2 hours per week of async feedback. No daily standups required. Interns are trained to work independently and ship with minimal hand-holding.",
  },
  {
    q: "What AI tools do the interns actually know?",
    a: "Engineering track graduates are trained on Claude API, LangGraph, FastAPI, Supabase, and Langfuse. Builder track graduates know Cursor, Lovable, n8n, and Supabase. All are trained on real projects, not tutorials.",
  },
  {
    q: "What if we don't have a project ready?",
    a: "We help with that. On your discovery call we'll identify 2–3 AI automation opportunities in your existing workflow. Most companies have more to automate than they realise.",
  },
];

function EmployerFaq() {
  const reduce = useReducedMotion() ?? false;
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <div style={{ maxWidth: "720px", margin: "0 auto", display: "flex", flexDirection: "column", gap: 0 }}>
      {FAQ_ITEMS.map((item, i) => {
        const open = openIndex === i;
        return (
          <div
            key={item.q}
            style={{
              borderBottom: "1px solid rgba(201,162,39,0.15)",
              borderTop: i === 0 ? "1px solid rgba(201,162,39,0.15)" : "none",
            }}
          >
            <button
              onClick={() => setOpenIndex(open ? null : i)}
              aria-expanded={open}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1rem",
                padding: "1.25rem 0",
                minHeight: "44px",
                cursor: "pointer",
                background: "none",
                border: "none",
                textAlign: "left",
              }}
            >
              <span style={{ fontWeight: 600, fontSize: "1rem", ...(open ? goldTextGrad : { color: INK }) }}>
                {item.q}
              </span>
              <ChevronDown
                size={18}
                color="#C9A227"
                style={{ flexShrink: 0, transition: "transform 300ms ease", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
              />
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: reduce ? 0 : 0.3, ease }}
                  style={{ overflow: "hidden" }}
                >
                  <p style={{ paddingBottom: "1.25rem", fontWeight: 400, fontSize: "0.95rem", color: STONE, lineHeight: 1.7 }}>
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

// Shimmer sweep layer for pill CTAs — parent needs position:relative + overflow:hidden.
// The sweep is driven by `.emp-root a:hover .btn-shimmer` in the scoped CSS.
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

// ── Track badge (per spec: Engineering vs Builder color systems) ──
function TrackBadge({ track }: { track: string }) {
  const isEng = /engineering/i.test(track);
  const style: React.CSSProperties = isEng
    ? { background: "rgba(201,162,39,0.1)", color: "#C9A227", border: "1px solid rgba(201,162,39,0.25)" }
    : { background: "#F0F4FF", color: "#3B4DB8", border: "1px solid #D8DEFF" };
  return (
    <span
      style={{
        display: "inline-block",
        fontWeight: 600,
        fontSize: "12px",
        padding: "5px 12px",
        borderRadius: "100px",
        marginBottom: "16px",
        ...style,
      }}
    >
      {track}
    </span>
  );
}

// ── Capabilities: mixed grid — one wide featured (dark) + standard cards ──
// `span` is the 12-col grid column span at desktop.
const STANDARD_CAPS: { track: string; title: string; body: string; tags: string[]; span: number }[] = [
  {
    track: "Builder track",
    title: "Automate a workflow you've been doing manually",
    body: "Zero-touch n8n or Make pipeline. Runs without anyone watching it.",
    tags: ["n8n", "Make", "Supabase"],
    span: 5,
  },
  {
    track: "Engineering track",
    title: "Stand up a RAG knowledge base",
    body: "Internal docs searchable with real retrieval. Not a hallucinating chatbot.",
    tags: ["LangGraph", "RAG", "Claude API"],
    span: 4,
  },
  {
    track: "Builder track",
    title: "Turn raw data into a decision",
    body: "AI-powered insight from spreadsheets and databases your team can act on.",
    tags: ["Lovable", "Cursor", "n8n"],
    span: 4,
  },
  {
    track: "Engineering track",
    title: "Build a reliable prompt system",
    body: "Tested, repeatable prompts across real business use cases. Not one-off experiments.",
    tags: ["Claude.ai", "Langfuse"],
    span: 4,
  },
];

// ── Talent cards (project-led, no monogram avatars) ─────────────
const TALENT = [
  {
    photo: "/images/student-1.jpg",
    initials: "KA",
    project: "AI Support Triage Bot",
    outcome: "Cut support ticket response time by 40% for a 12-person SaaS team",
    track: "Engineering track",
    skills: ["Claude API", "FastAPI", "Supabase"],
  },
  {
    photo: "/images/student-2.jpg",
    initials: "ZO",
    project: "Automated Lead Nurture Workflow",
    outcome: "Replaced 6 manual hours/week with a zero-touch n8n pipeline",
    track: "Builder track",
    skills: ["n8n", "Lovable", "Supabase"],
  },
  {
    photo: "/images/student-3.jpg",
    initials: "DM",
    project: "RAG Knowledge Base",
    outcome: "Built internal doc search across 3,000+ files in under 2 weeks",
    track: "Engineering track",
    skills: ["LangGraph", "Claude API", "RAG"],
  },
];

// ── "How it works for employers" commercial terms ───────────────
const EMPLOYER_TERMS = [
  "No recruitment or agency fee — ever",
  "No obligation to hire after the 8-week trial",
  "2 employer partners matched per student before each cohort opens",
  "We handle onboarding, project scoping support, and weekly check-ins",
  "IP produced during the internship belongs to your company",
  "Time commitment: ~2 hrs/week on your side (async feedback)",
];

const NAV_LINKS = [
  { label: "Builders", href: "#talent-pool" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Post an opportunity", href: "#post-opportunity" },
];

// ── Employer journey timeline (4 steps, hero → hire) ────────────
const EMPLOYER_JOURNEY = [
  {
    num: "01",
    time: "Day 1",
    title: "Post your opportunity",
    desc: "Tell us what you need. Takes 3 minutes. No commitment required.",
  },
  {
    num: "02",
    time: "Within 48 hrs",
    title: "Meet your matched builders",
    desc: "We send you 2 pre-vetted profiles matched to your stack and goals.",
  },
  {
    num: "03",
    time: "Weeks 1–8",
    title: "Run your free trial",
    desc: "Your intern ships real work. ~2 hrs/week of async feedback from you.",
  },
  {
    num: "04",
    time: "Week 12",
    title: "Hire — or don't",
    desc: "No obligation. No fee. But 87% of host employers make an offer.",
  },
];

// ── ROI comparison table (middle column = featured) ─────────────
const ROI_ROW_LABELS = ["Cost to start", "Time to start", "Commitment", "AI skills", "Risk"];
const ROI_COLUMNS = [
  {
    title: "Staffing Agency",
    hero: false,
    rows: [
      "$8,000–25,000 placement fee",
      "4–8 weeks average",
      "Contract lock-in required",
      "Generic talent pool",
      "High — fees paid upfront",
    ],
  },
  {
    title: "Claim AI Intern",
    hero: true,
    rows: [
      "$0 — completely free to host",
      "48 hours or less",
      "Zero obligation to hire",
      "Claude API · n8n · RAG · LangGraph",
      "Zero — full refund guarantee",
    ],
  },
  {
    title: "Junior Full-Time",
    hero: false,
    rows: [
      "$5,000–15,000 recruiting cost",
      "6–12 weeks to hire",
      "Full employment contract",
      "Varies — hard to verify",
      "High — 6-month ramp time",
    ],
  },
];

// ── Buttons (ink primary pill / parchment-outline secondary pill) ──
function SecondaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="emp-btn"
      style={{
        display: "inline-block",
        position: "relative",
        overflow: "hidden",
        background: "transparent",
        border: `1.5px solid ${PARCHMENT}`,
        color: STONE,
        fontWeight: 500,
        fontSize: "16px",
        padding: "14px 32px",
        borderRadius: "999px",
        textDecoration: "none",
        transition: "border-color 150ms, color 150ms, transform 150ms cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = INK;
        e.currentTarget.style.color = INK;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = PARCHMENT;
        e.currentTarget.style.color = STONE;
      }}
    >
      <BtnShimmer />
      {children}
    </a>
  );
}

// ── Pill CTA: label + trailing arrow circle (UPGRADE 4 pattern) ──
// variant "ink" = ink pill / cream circle. variant "gold" = gold pill / ink circle.
function PillCta({
  href,
  children,
  variant = "ink",
  size = "md",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "ink" | "gold";
  size?: "md" | "lg";
}) {
  const isGold = variant === "gold";
  const pillBg = isGold ? GOLD : INK;
  const pillBgHover = isGold ? "#B8901F" : INK_HOVER;
  const labelColor = isGold ? INK : CREAM;
  const circleBg = isGold ? INK : CREAM;
  const arrowColor = isGold ? CREAM : INK;
  const circle = size === "lg" ? 36 : 32;
  const arrow = size === "lg" ? 16 : 14;
  const padLeft = size === "lg" ? "28px" : "24px";
  const fontSize = size === "lg" ? "15px" : "14px";

  return (
    <a
      href={href}
      className="emp-btn"
      style={{
        display: "inline-flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        gap: "12px",
        background: pillBg,
        borderRadius: "999px",
        padding: `8px 8px 8px ${padLeft}`,
        textDecoration: "none",
        transition: "background-color 0.2s ease, transform 150ms cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = pillBgHover;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = pillBg;
      }}
    >
      <BtnShimmer />
      <span style={{ color: labelColor, fontWeight: 600, fontSize }}>{children}</span>
      <span
        className="emp-btn-circle"
        style={{
          width: `${circle}px`,
          height: `${circle}px`,
          borderRadius: "50%",
          background: circleBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <ArrowRight size={arrow} color={arrowColor} />
      </span>
    </a>
  );
}

// ── Page-local cream navbar (does NOT reuse the shared dark <Nav>) ──
function EmployersNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: "38px", // clears the sticky urgency bar above
        insetInline: 0,
        zIndex: 50,
        background: scrolled ? "rgba(251, 246, 234, 0.72)" : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(1.6)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px) saturate(1.6)" : "none",
        borderBottom: scrolled ? "1px solid rgba(201, 162, 39, 0.15)" : "1px solid transparent",
        boxShadow: scrolled ? "0 4px 24px rgba(18, 16, 14, 0.06)" : "none",
        transition: "background 300ms ease, backdrop-filter 300ms ease, box-shadow 300ms ease, border-color 300ms ease",
      }}
    >
      <div
        className="container-x"
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}
      >
        <a href="/" style={{ display: "block" }}>
          <img
            src="/images/claim-logo-transparent.png"
            alt="Claim Academy"
            className="emp-nav-logo"
            style={{ height: "40px", width: "auto", display: "block" }}
          />
        </a>

        {/* Desktop links */}
        <div className="emp-nav-links" style={{ alignItems: "center", gap: "28px" }}>
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{ color: STONE, fontWeight: 500, fontSize: "15px", textDecoration: "none", transition: "color 150ms" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = INK)}
              onMouseLeave={(e) => (e.currentTarget.style.color = STONE)}
            >
              {l.label}
            </a>
          ))}
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Strategy%20call`}
            style={{
              background: INK,
              color: CREAM,
              fontWeight: 500,
              fontSize: "15px",
              padding: "10px 24px",
              borderRadius: "999px",
              textDecoration: "none",
              transition: "background-color 150ms",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = INK_HOVER)}
            onMouseLeave={(e) => (e.currentTarget.style.background = INK)}
          >
            Book a strategy call
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="emp-nav-burger"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          style={{ background: "none", border: "none", color: INK, cursor: "pointer", padding: "4px" }}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="emp-nav-mobile" style={{ background: CREAM, borderTop: `1px solid ${PARCHMENT}`, padding: "12px 0" }}>
          <div className="container-x" style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                style={{ color: STONE, fontWeight: 500, fontSize: "15px", textDecoration: "none", padding: "12px 0", borderBottom: `1px solid ${PARCHMENT}` }}
              >
                {l.label}
              </a>
            ))}
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=Strategy%20call`}
              onClick={() => setMenuOpen(false)}
              style={{
                background: INK,
                color: CREAM,
                fontWeight: 500,
                fontSize: "15px",
                padding: "12px 24px",
                borderRadius: "999px",
                textDecoration: "none",
                textAlign: "center",
                marginTop: "10px",
              }}
            >
              Book a strategy call
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

// ── Field primitives (light inputs) ─────────────────────────────
const inputBase: React.CSSProperties = {
  width: "100%",
  fontSize: "15px",
  color: INK,
  background: WHITE,
  border: `1px solid ${PARCHMENT}`,
  borderRadius: "10px",
  padding: "13px 14px",
  outline: "none",
  transition: "border-color 150ms, box-shadow 150ms",
};

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ display: "block", fontWeight: 600, fontSize: "13px", color: INK, marginBottom: "8px" }}>
      {children}
    </span>
  );
}

const SKILL_OPTIONS = ["Claude API", "RAG / LangGraph", "n8n / Automation", "Data Analysis", "Supabase", "Other"];

// ── Custom dropdown (no native <select>) ────────────────────────
// Controlled: `value` + `onChange` mirror the native select it replaces, so the
// selected value flows into the same form state and the n8n webhook unchanged.
function CustomSelect({
  value,
  onChange,
  options,
  placeholder = "Select one",
  error = false,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder?: string;
  error?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Close on outside click + ESC.
  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const hasValue = value !== "";

  return (
    <div ref={wrapRef} style={{ position: "relative" }}>
      {/* Closed state — looks like an input */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "10px",
          background: WHITE,
          border: `1px solid ${open || error ? (error ? "#C0392B" : "rgba(201, 162, 39, 0.6)") : PARCHMENT}`,
          borderRadius: "8px",
          padding: "12px 16px",
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 400,
          fontSize: "14px",
          color: hasValue ? INK : STONE,
          cursor: "pointer",
          textAlign: "left",
          outline: "none",
          boxShadow: open ? "0 0 0 3px rgba(201, 162, 39, 0.12)" : "none",
          transition: "border-color 150ms, box-shadow 150ms",
        }}
        onMouseEnter={(e) => {
          if (!open) e.currentTarget.style.borderColor = INK;
        }}
        onMouseLeave={(e) => {
          if (!open) e.currentTarget.style.borderColor = error ? "#C0392B" : PARCHMENT;
        }}
      >
        <span>{hasValue ? value : placeholder}</span>
        <ChevronDown
          size={16}
          color={STONE}
          style={{ flexShrink: 0, transition: "transform 150ms", transform: open ? "rotate(180deg)" : "none" }}
        />
      </button>

      {/* Open state — dropdown panel */}
      {open && (
        <ul
          role="listbox"
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            zIndex: 50,
            listStyle: "none",
            margin: 0,
            padding: 0,
            background: WHITE,
            border: `1px solid ${PARCHMENT}`,
            borderRadius: "8px",
            boxShadow: "0 4px 16px rgba(18,16,14,0.08)",
            overflow: "hidden",
          }}
        >
          {options.map((opt, i) => {
            const selected = opt === value;
            return (
              <li
                key={opt}
                role="option"
                aria-selected={selected}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "10px",
                  padding: "11px 16px",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: selected ? 500 : 400,
                  fontSize: "14px",
                  color: INK,
                  cursor: "pointer",
                  background: selected ? PARCHMENT_LIGHT : WHITE,
                  borderTop: i === 0 ? "none" : `1px solid ${PARCHMENT}`,
                }}
                onMouseEnter={(e) => {
                  if (!selected) e.currentTarget.style.background = "rgba(201, 162, 39, 0.06)";
                }}
                onMouseLeave={(e) => {
                  if (!selected) e.currentTarget.style.background = WHITE;
                }}
              >
                {opt}
                {selected && <Check size={16} color={GOLD_DARK} style={{ flexShrink: 0 }} />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

// ── Two-step "Post an opportunity" form (light theme, same webhook) ──
function PostOpportunityForm({ reduce }: { reduce: boolean }) {
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState({ email: "", need: "", company: "", role: "", size: "", brief: "" });
  const [skills, setSkills] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const set = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));
  const toggleSkill = (skill: string) =>
    setSkills((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]));

  const applyFocus = (e: React.FocusEvent<HTMLElement>) => {
    e.currentTarget.style.borderColor = "rgba(201, 162, 39, 0.6)";
    e.currentTarget.style.boxShadow = `0 0 0 3px rgba(201, 162, 39, 0.12)`;
  };
  const removeFocus = (e: React.FocusEvent<HTMLElement>) => {
    e.currentTarget.style.borderColor = PARCHMENT;
    e.currentTarget.style.boxShadow = "none";
  };
  const borderFor = (key: string): React.CSSProperties => (errors[key] ? { borderColor: "#C0392B" } : {});

  // Fire-and-forget POST to the n8n intake webhook. `stage` marks which step
  // the lead reached so the workflow can dedupe/enrich on email.
  async function postLead(stage: "step1" | "step2") {
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "employers_page",
          stage,
          email: form.email,
          need: form.need,
          company: form.company,
          role: form.role,
          teamSize: form.size,
          brief: form.brief,
          skills,
          timestamp: new Date().toISOString(),
        }),
      }).catch(() => null);
      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("track", "Lead", { content_name: "Employers Opportunity", content_category: "Employer" });
      }
    } catch {
      /* non-blocking: UI advances regardless of webhook result */
    }
  }

  async function handleStep1(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next: Record<string, boolean> = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = true;
    if (!form.need) next.need = true;
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setSubmitting(true);
    await postLead("step1");
    setSubmitting(false);
    setStep(2);
  }

  async function handleStep2(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next: Record<string, boolean> = {};
    if (!form.company.trim()) next.company = true;
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setSubmitting(true);
    await postLead("step2");
    setSubmitting(false);
    setDone(true);
  }

  const cardStyle: React.CSSProperties = {
    background: WHITE,
    border: `1px solid ${PARCHMENT}`,
    borderRadius: "16px",
    padding: "clamp(24px, 4vw, 40px)",
    maxWidth: "640px",
    margin: "0 auto",
  };

  if (done) {
    return (
      <motion.div
        initial={reduce ? { opacity: 1 } : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0 : 0.4, ease }}
        style={{ ...cardStyle, textAlign: "center", padding: "56px 32px" }}
      >
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            background: PARCHMENT_LIGHT,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
            fontSize: "28px",
            color: GOLD_DARK,
          }}
        >
          ✓
        </div>
        <h3 style={{ fontWeight: 800, fontSize: "24px", color: INK }}>You're matched in 48 hours.</h3>
        <p style={{ fontSize: "15px", color: STONE, marginTop: "10px", lineHeight: 1.6 }}>
          Thanks — we've got your details. Our team will reach out at {form.email || "your inbox"} within 48 hours with
          matched AI builders.
        </p>
      </motion.div>
    );
  }

  return (
    <div style={cardStyle}>
      {/* Step indicator */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
        {[1, 2].map((n) => (
          <div key={n} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                width: "22px",
                height: "22px",
                borderRadius: "50%",
                fontSize: "12px",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: step >= n ? "rgba(201,162,39,0.12)" : PARCHMENT,
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                border: step >= n ? "1px solid rgba(201,162,39,0.35)" : "1px solid transparent",
                color: step >= n ? "#C9A227" : STONE,
              }}
            >
              {n}
            </span>
            {n === 1 && <span style={{ width: "28px", height: "2px", background: step > 1 ? "rgba(201,162,39,0.5)" : PARCHMENT }} />}
          </div>
        ))}
        <span style={{ fontSize: "13px", color: STONE, marginLeft: "6px" }}>
          {step === 1 ? "Start here — takes 15 seconds" : "A few more details (optional depth)"}
        </span>
      </div>

      {step === 1 ? (
        <form onSubmit={handleStep1} noValidate>
          <div style={{ display: "grid", gap: "18px" }}>
            <label>
              <FieldLabel>Work email</FieldLabel>
              <input
                type="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                onFocus={applyFocus}
                onBlur={removeFocus}
                placeholder="you@company.com"
                style={{ ...inputBase, ...borderFor("email") }}
              />
            </label>
            <label>
              <FieldLabel>What do you need most?</FieldLabel>
              <CustomSelect
                value={form.need}
                onChange={(v) => set("need", v)}
                options={["Engineering intern", "Builder / No-code intern", "Not sure yet"]}
                placeholder="Select one"
                error={!!errors.need}
              />
            </label>
          </div>
          {Object.keys(errors).length > 0 && (
            <p style={{ fontSize: "12px", color: "#C0392B", marginTop: "14px" }}>
              Enter a valid work email and choose what you need.
            </p>
          )}
          <button type="submit" disabled={submitting} className="emp-btn" style={submitBtnStyle}>
            <BtnShimmer />
            {submitting ? "Sending…" : "Get matched in 48 hours →"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleStep2} noValidate>
          <div className="emp-form-grid" style={{ display: "grid", gap: "18px" }}>
            <label>
              <FieldLabel>Company name</FieldLabel>
              <input
                type="text"
                value={form.company}
                onChange={(e) => set("company", e.target.value)}
                onFocus={applyFocus}
                onBlur={removeFocus}
                placeholder="Acme Inc."
                style={{ ...inputBase, ...borderFor("company") }}
              />
            </label>
            <label>
              <FieldLabel>Your role / title</FieldLabel>
              <input
                type="text"
                value={form.role}
                onChange={(e) => set("role", e.target.value)}
                onFocus={applyFocus}
                onBlur={removeFocus}
                placeholder="Head of Operations"
                style={inputBase}
              />
            </label>
            <label>
              <FieldLabel>Team size</FieldLabel>
              <select
                value={form.size}
                onChange={(e) => set("size", e.target.value)}
                onFocus={applyFocus}
                onBlur={removeFocus}
                style={{ ...inputBase, appearance: "none" }}
              >
                <option value="" disabled>Select team size</option>
                {["1-10", "11-50", "51-200", "200+"].map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </label>
          </div>

          <div style={{ marginTop: "18px" }}>
            <FieldLabel>Skills you're after</FieldLabel>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {SKILL_OPTIONS.map((skill) => {
                const active = skills.includes(skill);
                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      padding: "9px 16px",
                      borderRadius: "999px",
                      cursor: "pointer",
                      background: active ? INK : PARCHMENT_LIGHT,
                      color: active ? CREAM : STONE,
                      border: `1px solid ${active ? INK : PARCHMENT}`,
                      transition: "all 120ms",
                    }}
                  >
                    {active ? "✓ " : ""}{skill}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ marginTop: "18px" }}>
            <FieldLabel>
              What would you want them to build? <span style={{ color: STONE, fontWeight: 400 }}>(optional)</span>
            </FieldLabel>
            <textarea
              rows={3}
              value={form.brief}
              onChange={(e) => set("brief", e.target.value)}
              onFocus={applyFocus}
              onBlur={removeFocus}
              placeholder="e.g. Automate our onboarding emails and Slack alerts…"
              style={{ ...inputBase, resize: "vertical" }}
            />
          </div>

          {errors.company && (
            <p style={{ fontSize: "12px", color: "#C0392B", marginTop: "14px" }}>Please add your company name.</p>
          )}
          <button type="submit" disabled={submitting} className="emp-btn" style={submitBtnStyle}>
            <BtnShimmer />
            {submitting ? "Sending…" : "Submit opportunity"}
          </button>
          <p style={{ fontSize: "12px", color: STONE, textAlign: "center", marginTop: "12px" }}>
            Already sent your email in step 1 — this just helps us match faster.
          </p>
        </form>
      )}
    </div>
  );
}

const submitBtnStyle: React.CSSProperties = {
  marginTop: "24px",
  width: "100%",
  position: "relative",
  overflow: "hidden",
  background: INK,
  color: CREAM,
  fontWeight: 600,
  fontSize: "16px",
  padding: "16px",
  borderRadius: "999px",
  border: "none",
  cursor: "pointer",
  transition: "transform 150ms cubic-bezier(0.34, 1.56, 0.64, 1)",
};

// ── Mobile-only floating CTA ─────────────────────────────────────
function MobileStickyCta({ reduce }: { reduce: boolean }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#post-opportunity"
          className="emp-mobile-cta"
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: reduce ? 0 : 0.25, ease }}
          style={{
            position: "fixed",
            right: "16px",
            bottom: "calc(16px + env(safe-area-inset-bottom, 0px))",
            zIndex: 60,
            background: INK,
            color: CREAM,
            fontWeight: 600,
            fontSize: "15px",
            padding: "14px 22px",
            borderRadius: "999px",
            textDecoration: "none",
            boxShadow: "0 10px 30px rgba(18,16,14,0.25)",
          }}
        >
          Post an opportunity
        </motion.a>
      )}
    </AnimatePresence>
  );
}

// Small-caps eyebrow label.
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        color: GOLD_DARK,
        fontWeight: 600,
        fontSize: "11px",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        marginBottom: "14px",
      }}
    >
      {children}
    </p>
  );
}

export default function Employers() {
  const reduce = useReducedMotion() ?? false;
  const reveal = makeReveal(reduce);

  // Founder video: play-button overlay shown until playback starts.
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  // Floating CTA bar: appears once the hero is scrolled past.
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowFloatingCTA(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Calendly inline widget script — cleaned up on unmount so HMR/route
  // changes don't stack duplicate script tags.
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const heroAnim = (delay: number, slide = true) => ({
    initial: reduce ? { opacity: 1 } : slide ? { opacity: 0, y: 18 } : { opacity: 0 },
    animate: reduce ? { opacity: 1 } : slide ? { opacity: 1, y: 0 } : { opacity: 1 },
    transition: { duration: reduce ? 0 : 0.5, ease, delay: reduce ? 0 : delay },
  });

  return (
    <div className="emp-root" style={{ background: CREAM, color: STONE, minHeight: "100vh", overflowX: "hidden" }}>
      {/* ── STICKY URGENCY BAR (above the navbar) ────────────── */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "linear-gradient(90deg, #12100E 0%, #1E1A16 50%, #12100E 100%)",
          borderBottom: "1px solid rgba(201,162,39,0.25)",
          padding: "0.6rem 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          backdropFilter: "blur(8px)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span
            aria-hidden
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#C9A227",
              boxShadow: "0 0 0 0 rgba(201,162,39,0.4)",
              animation: "urgency-pulse 2s ease-in-out infinite",
              flexShrink: 0,
            }}
          />
          <span className="emp-urgency-text" style={{ fontWeight: 500, fontSize: "0.8rem", color: "rgba(251,246,234,0.85)", whiteSpace: "nowrap" }}>
            <span className="emp-urgency-full">Next cohort starts August 3 — applications close August 3.</span>
            <span className="emp-urgency-short">August 3 cohort — spots filling fast.</span>
          </span>
        </div>
        <a
          href="#book-a-call"
          className="emp-urgency-cta"
          style={{
            background: "rgba(201,162,39,0.15)",
            border: "1px solid rgba(201,162,39,0.35)",
            borderRadius: "999px",
            padding: "0.25rem 0.9rem",
            fontWeight: 600,
            fontSize: "0.75rem",
            color: "#C9A227",
            textDecoration: "none",
            whiteSpace: "nowrap",
            transition: "background 150ms",
          }}
        >
          Reserve your spot →
        </a>
      </div>

      {/* Scoped theme: Poppins + tokens apply only inside .emp-root. */}
      <style>{`
        .emp-root, .emp-root * { font-family: 'Poppins', system-ui, sans-serif; }
        .emp-root {
          --cream:#FBF6EA; --white:#FFFFFF; --ink:#12100E; --gold:#C9A227;
          --gold-dark:#C9A227; --stone:#5C5A56; --parchment:#E8DFC8; --parchment-light:#F4EDD8;
          --gold-grad: linear-gradient(135deg, #E8B930 0%, #C9A227 45%, #A07820 100%);
        }
        html { scroll-behavior: smooth; }
        @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }

        /* Pill CTA polish: shimmer sweep + springy scale press. */
        .emp-root .emp-btn { position: relative; overflow: hidden; }
        .emp-root .emp-btn:hover { transform: scale(1.03); }
        .emp-root .emp-btn:active { transform: scale(0.96); }
        .emp-root button:hover .btn-shimmer,
        .emp-root a:hover .btn-shimmer { transform: translateX(100%) !important; }
        .emp-root .emp-btn .emp-btn-circle { transition: box-shadow 200ms ease; }
        .emp-root .emp-btn:hover .emp-btn-circle { box-shadow: 0 0 0 3px rgba(201, 162, 39, 0.25); }

        /* Talent card "View profile" underline slide. */
        .emp-root .view-profile-link { position: relative; }
        .emp-root .view-profile-link::after {
          content: '';
          position: absolute;
          bottom: -1px; left: 0;
          width: 0%; height: 1.5px;
          background: #C9A227;
          transition: width 200ms ease;
        }
        .emp-root .view-profile-link:hover::after { width: 100%; }

        /* Urgency bar: pulsing dot + CTA hover; short copy on mobile. */
        @keyframes urgency-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(201,162,39,0.4); }
          50% { box-shadow: 0 0 0 6px rgba(201,162,39,0); }
        }
        .emp-urgency-cta:hover { background: rgba(201,162,39,0.25) !important; }
        .emp-floating-cta-btn:hover { opacity: 0.9; transform: scale(1.02); }
        /* Hidden below 860px — MobileStickyCta covers small screens up to that width. */
        @media (max-width: 859px) { .emp-floating-cta { display: none !important; } }
        .emp-urgency-short { display: none; }
        @media (max-width: 767px) {
          .emp-urgency-cta { display: none; }
          .emp-urgency-full { display: none; }
          .emp-urgency-short { display: inline; }
          .emp-urgency-text { font-size: 0.75rem !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          .emp-root, .emp-root * { animation: none !important; transition: none !important; }
        }

        .emp-nav-links { display: none; }
        .emp-nav-burger { display: inline-flex; }
        @media (min-width: 860px) {
          .emp-nav-links { display: flex; }
          .emp-nav-burger { display: none; }
          .emp-nav-mobile { display: none; }
          .emp-mobile-cta { display: none !important; }
        }

        .emp-cards-3 { display: grid; grid-template-columns: 1fr; gap: 20px; }
        @media (min-width: 768px) { .emp-cards-3 { grid-template-columns: repeat(3, 1fr); gap: 22px; } }

        /* Hero two-column row: text left, image right on desktop. */
        .emp-hero-row { display: grid; grid-template-columns: 1fr 1fr; }
        @media (max-width: 767px) {
          /* Single column: image flows below the text content. Card grows to fit. */
          .emp-hero-section { height: auto !important; padding-top: 96px !important; }
          .emp-hero-card { height: auto !important; }
          .emp-hero-row { grid-template-columns: 1fr; height: auto !important; }
          .emp-nav-logo { height: 32px !important; }
          .emp-hero-image {
            width: 100%;
            height: 300px !important;
            border-radius: 16px !important;
            overflow: hidden;
            margin: 1.5rem 0 0;
          }
          .emp-hero-fade { display: none; }
          /* Trust bar: glass card spans full width, one row, no separators. */
          .emp-hero-trust {
            flex-direction: row;
            flex-wrap: nowrap;
            align-items: flex-start !important;
            justify-content: space-between;
            width: 100% !important;
            padding: 1rem 1.25rem !important;
          }
          .emp-hero-trust-item { gap: 2px !important; }
          .emp-hero-trust-sep { display: none; }
        }

        /* Hero card responsive: tighten padding on small screens. */
        @media (max-width: 720px) {
          .emp-hero-pill { left: 1.25rem !important; top: 1.25rem !important; right: 1.25rem; }
          .emp-hero-content { padding: 2rem !important; justify-content: flex-end; }
        }
      `}</style>

      <EmployersNav />

      {/* ── HERO (full-height card) ──────────────────────────── */}
      <section
        className="emp-hero-section"
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          background: CREAM,
          padding: "0 1.5rem 1.5rem 1.5rem",
        }}
      >
        <motion.div
          {...heroAnim(0.05, false)}
          className="emp-hero-card"
          style={{
            width: "100%",
            height: "calc(100vh - 96px)",
            marginTop: "auto",
            borderRadius: "24px",
            overflow: "hidden",
            position: "relative",
            background: "#F0EBE0",
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2312100E' stroke-opacity='0.06' stroke-width='0.5'%3E%3Cpath d='M0 0h40v40'/%3E%3C/g%3E%3C/svg%3E\")",
            backgroundSize: "40px 40px",
          }}
        >
          {/* Two-column content row: text left, image right */}
          <div className="emp-hero-row" style={{ height: "100%", alignItems: "end", gap: 0 }}>
            {/* LEFT — content column (pill → headline → subhead → CTAs → trust bar) */}
            <div
              className="emp-hero-content"
              style={{
                position: "relative",
                zIndex: 10,
                padding: "7rem 3rem 3rem 3.5rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                height: "100%",
              }}
            >
              {/* Announcement pill — in-flow, first element */}
              <div className="emp-hero-pill" style={{ marginBottom: "1.75rem" }}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "rgba(251, 246, 234, 0.55)",
                    backdropFilter: "blur(12px) saturate(1.4)",
                    WebkitBackdropFilter: "blur(12px) saturate(1.4)",
                    border: "1px solid rgba(201, 162, 39, 0.3)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.7), 0 4px 16px rgba(201,162,39,0.08)",
                    borderRadius: "999px",
                    padding: "6px 16px 6px 6px",
                    fontSize: "13px",
                    color: STONE,
                  }}
                >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #E8B930, #C9A227)",
                      boxShadow: "0 0 8px rgba(201,162,39,0.5)",
                      flexShrink: 0,
                      marginLeft: "4px",
                    }}
                  />
                  Now matching employers for the August 2026 cohort
                  <span
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      background: INK,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <ArrowRight size={12} color={CREAM} />
                  </span>
                </span>
              </div>

              <h1
                style={{
                  fontWeight: 800,
                  fontSize: "clamp(3rem, 7vw, 5.5rem)",
                  color: INK,
                  lineHeight: 1.05,
                  letterSpacing: "-0.04em",
                  marginBottom: "1.25rem",
                  maxWidth: "780px",
                }}
              >
                Hire an AI builder<br />who already ships.
              </h1>
              <p style={{ fontSize: "17px", color: STONE, maxWidth: "500px", lineHeight: 1.7, marginBottom: "2rem" }}>
                Start a free 8-week working trial. No agency fees. No obligation to hire. Matched in 48 hours.
              </p>
              <div style={{ display: "inline-flex", gap: "12px", flexWrap: "wrap" }}>
                <PillCta href="#talent-pool" size="lg">See available builders</PillCta>
                <SecondaryButton href="#post-opportunity">Post an opportunity</SecondaryButton>
              </div>

              {/* Trust bar — glass card below CTAs, fixed values (no count-up) */}
              <div
                className="emp-hero-trust"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 0,
                  marginTop: "1.75rem",
                  width: "fit-content",
                  background: "rgba(251, 246, 234, 0.45)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(201, 162, 39, 0.25)",
                  borderRadius: "16px",
                  padding: "1rem 1.75rem",
                  boxShadow: "0 4px 24px rgba(201, 162, 39, 0.08), inset 0 1px 0 rgba(255,255,255,0.6)",
                }}
              >
                {[
                  { value: "3,800+", label: "Graduates" },
                  { value: "87%", label: "Placement rate" },
                  { value: "11 yrs", label: "In market" },
                ].map((s, i) => (
                  <div key={s.label} style={{ display: "flex", alignItems: "center" }}>
                    {i > 0 && (
                      <span
                        aria-hidden
                        className="emp-hero-trust-sep"
                        style={{ width: "1px", height: "32px", background: "rgba(201, 162, 39, 0.2)", margin: "0 1.5rem", flexShrink: 0 }}
                      />
                    )}
                    <div className="emp-hero-trust-item" style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                      <span
                        style={{
                          fontWeight: 800,
                          fontSize: "clamp(1.25rem, 2.5vw, 1.6rem)",
                          letterSpacing: "-0.02em",
                          color: "#C9A227",
                          background: "linear-gradient(135deg, #E8B930 0%, #C9A227 45%, #A07820 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                      >
                        {s.value}
                      </span>
                      <span style={{ fontWeight: 600, fontSize: "10px", color: STONE, textTransform: "uppercase", letterSpacing: "0.12em" }}>
                        {s.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — image panel (below the text content on mobile) */}
            <div className="emp-hero-image" style={{ height: "100%", position: "relative", overflow: "hidden", borderRadius: "0 24px 24px 0" }}>
              <img
                src="/images/students/student-gemini.jpg"
                alt="Claim Academy student building at a co-working desk"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
              />
              {/* Left-edge fade blends the image into the card background (desktop only) */}
              <div
                aria-hidden
                className="emp-hero-fade"
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to right, #F0EBE0 0%, transparent 25%)",
                  pointerEvents: "none",
                }}
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── EMPLOYER MARQUEE (illustrative network) ──────────── */}
      <section
        style={{
          position: "relative",
          background: "rgba(251, 246, 234, 0.6)",
          backdropFilter: "blur(16px) saturate(1.4)",
          WebkitBackdropFilter: "blur(16px) saturate(1.4)",
          borderTop: "1px solid rgba(201, 162, 39, 0.15)",
          borderBottom: "1px solid rgba(201, 162, 39, 0.15)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.7), inset 0 -1px 0 rgba(255,255,255,0.4)",
          padding: "0.75rem 0",
          overflow: "hidden",
        }}
      >
        {/* Edge fade masks */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "120px",
            background: "linear-gradient(to right, #FBF6EA, transparent)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "120px",
            background: "linear-gradient(to left, #FBF6EA, transparent)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        {/* Static eyebrow pill over the left fade (desktop only) */}
        <span
          className="emp-marquee-eyebrow"
          style={{
            position: "absolute",
            left: "1.5rem",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 3,
            background: "rgba(201, 162, 39, 0.1)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: "1px solid rgba(201, 162, 39, 0.3)",
            borderRadius: "999px",
            padding: "0.3rem 0.9rem",
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#C9A227",
            whiteSpace: "nowrap",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6)",
          }}
        >
          Hiring from our network
        </span>

        <div className="employer-track" aria-hidden>
          {[...MARQUEE_NAMES, ...MARQUEE_NAMES].map((item, idx) => (
            <div
              key={idx}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "rgba(255, 255, 255, 0.55)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                border: "1px solid rgba(201, 162, 39, 0.18)",
                borderRadius: "999px",
                padding: "0.35rem 1rem",
                marginRight: "0.75rem",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.8)",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #E8B930, #C9A227)",
                  flexShrink: 0,
                }}
              />
              <span style={{ fontWeight: 600, fontSize: "0.8rem", color: "#12100E", letterSpacing: "0.01em", whiteSpace: "nowrap" }}>
                {item.name}
              </span>
            </div>
          ))}
        </div>

        <style>{`
          @keyframes employer-marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .employer-track {
            display: flex;
            width: max-content;
            margin-left: 220px;
            animation: employer-marquee 32s linear infinite;
          }
          @media (max-width: 767px) {
            .employer-track { margin-left: 0; }
            .emp-marquee-eyebrow { display: none; }
          }
          @media (prefers-reduced-motion: reduce) { .employer-track { animation: none; } }
        `}</style>
      </section>

      {/* ── BY THE NUMBERS (animated count-up stats) ─────────── */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          background: INK,
          padding: "clamp(4rem, 6vw, 5.5rem) clamp(1.5rem, 5vw, 6rem)",
          scrollMarginTop: "110px",
        }}
      >
        {/* Gold dot-grid texture */}
        <svg
          aria-hidden
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }}
        >
          <defs>
            <pattern id="emp-stats-dots" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1" fill="#C9A227" opacity="0.07" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#emp-stats-dots)" />
        </svg>

        <div style={{ position: "relative", zIndex: 1 }}>
          <RevealSection delay={0}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <Eyebrow>By the numbers</Eyebrow>
              <h2 style={{ fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3rem)", color: CREAM, letterSpacing: "-0.03em", maxWidth: "600px", margin: "0 auto" }}>
                11 years. 3,800 builders. One guarantee.
              </h2>
            </div>

            {/* 1px gold dividers via gap + wrapper background */}
            <div className="emp-stats-grid">
              <StatCard target={3800} suffix="+" label="Graduates placed" />
              <StatCard target={87} suffix="%" label="Job placement rate" />
              <StatCard target={11} suffix=" yrs" label="In the market" />
              <StatCard target={48} suffix=" hrs" label="Average match time" />
            </div>
          </RevealSection>
        </div>

        <style>{`
          .emp-stats-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 1px;
            background: rgba(201, 162, 39, 0.1);
          }
          .emp-stats-grid > div {
            background: #12100E;
            padding: 2.5rem 2rem;
            text-align: center;
            position: relative;
          }
          @media (max-width: 1023px) {
            .emp-stats-grid { grid-template-columns: repeat(2, 1fr); }
          }
          @media (max-width: 767px) {
            .emp-stats-grid { grid-template-columns: 1fr; }
            .emp-stats-grid > div { padding: 2rem 1.25rem; }
          }
        `}</style>
      </section>

      {/* ── EMPLOYER JOURNEY (4-step timeline) ───────────────── */}
      <section style={{ background: CREAM, padding: "clamp(5rem, 8vw, 7rem) clamp(1.5rem, 5vw, 6rem)", scrollMarginTop: "110px" }}>
        <RevealSection delay={0}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <Eyebrow>Your journey as a host employer</Eyebrow>
            <h2 style={{ fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3.25rem)", color: INK, letterSpacing: "-0.03em", textAlign: "center", maxWidth: "640px", margin: "0.75rem auto 0" }}>
              From first call to full-time hire — in 12 weeks.
            </h2>
          </div>

          <div className="emp-timeline" style={{ position: "relative" }}>
            {/* Horizontal connector (desktop only) */}
            <div
              aria-hidden
              className="emp-timeline-line"
              style={{
                position: "absolute",
                top: "28px",
                left: 0,
                right: 0,
                height: "1px",
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(201,162,39,0.3) 10%, rgba(201,162,39,0.3) 90%, transparent 100%)",
                zIndex: 0,
              }}
            />

            {EMPLOYER_JOURNEY.map((s, index) => (
              <RevealSection delay={index * 0.12} key={index} className="emp-timeline-step-wrap">
                <div className="emp-timeline-step" style={{ position: "relative", zIndex: 1 }}>
                  <div
                    className="emp-timeline-circle"
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "50%",
                      background: "rgba(201,162,39,0.1)",
                      border: "1.5px solid rgba(201,162,39,0.4)",
                      backdropFilter: "blur(8px)",
                      WebkitBackdropFilter: "blur(8px)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 0 0 6px rgba(201,162,39,0.06)",
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ fontWeight: 700, fontSize: "1.1rem", ...goldTextGrad }}>{s.num}</span>
                  </div>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.12em", color: "#C9A227", marginBottom: "0.5rem" }}>
                      {s.time}
                    </p>
                    <h3 style={{ fontWeight: 700, fontSize: "1.05rem", color: INK, letterSpacing: "-0.01em", marginBottom: "0.5rem" }}>
                      {s.title}
                    </h3>
                    <p className="emp-timeline-desc" style={{ fontWeight: 400, fontSize: "0.875rem", color: STONE, lineHeight: 1.6 }}>
                      {s.desc}
                    </p>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </RevealSection>

        <style>{`
          .emp-timeline { display: grid; grid-template-columns: repeat(4, 1fr); }
          .emp-timeline-step { text-align: center; padding: 0 1rem; }
          .emp-timeline-circle { margin: 0 auto 1.25rem; }
          .emp-timeline-desc { max-width: 200px; margin: 0 auto; }
          @media (max-width: 767px) {
            .emp-timeline { display: block; }
            .emp-timeline-line { display: none; }
            .emp-timeline-step-wrap:not(:last-child) { margin-bottom: 2rem; }
            .emp-timeline-step { display: flex; gap: 1.25rem; text-align: left; padding: 0; }
            .emp-timeline-circle { margin: 0; }
            .emp-timeline-desc { max-width: none; margin: 0; }
            /* Vertical connector segment below each circle (except the last step) */
            .emp-timeline-step::after {
              content: '';
              position: absolute;
              left: 27px;
              top: 56px;
              bottom: -2rem;
              width: 1px;
              background: rgba(201,162,39,0.25);
            }
            .emp-timeline-step-wrap:last-child .emp-timeline-step::after { display: none; }
          }
        `}</style>
      </section>

      {/* ── ROI COMPARISON (agency vs Claim vs full-time) ────── */}
      <section style={{ background: "#F0EBE0", padding: "clamp(5rem, 8vw, 7rem) clamp(1.5rem, 5vw, 6rem)", scrollMarginTop: "110px" }}>
        <RevealSection delay={0}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <Eyebrow>Why Claim AI</Eyebrow>
            <h2 style={{ fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3.25rem)", color: INK, letterSpacing: "-0.03em", textAlign: "center", marginTop: "0.75rem" }}>
              The smartest hire you'll make this quarter.
            </h2>
            <p style={{ fontWeight: 400, fontSize: "1rem", color: STONE, textAlign: "center", marginTop: "0.5rem" }}>
              Compare your options before you decide.
            </p>
          </div>

          <div className="emp-roi-grid">
            {ROI_COLUMNS.map((col, index) => (
              <RevealSection
                key={col.title}
                delay={index * 0.1}
                className={col.hero ? "emp-roi-col emp-roi-col-hero" : "emp-roi-col"}
              >
                <div
                  className={col.hero ? "emp-roi-card emp-roi-card-hero" : "emp-roi-card"}
                  style={{
                    position: "relative",
                    borderRadius: "20px",
                    padding: "2rem",
                    height: "100%",
                    ...(col.hero
                      ? {
                          background: INK,
                          border: "1.5px solid rgba(201,162,39,0.4)",
                          boxShadow: "0 24px 64px rgba(18,16,14,0.2), 0 0 0 1px rgba(201,162,39,0.1)",
                        }
                      : { background: WHITE, border: "1px solid #E8DFC8" }),
                  }}
                >
                  {col.hero && (
                    <span
                      style={{
                        position: "absolute",
                        top: "-14px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "linear-gradient(135deg, #E8B930, #C9A227)",
                        color: INK,
                        fontWeight: 700,
                        fontSize: "10px",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        padding: "4px 16px",
                        borderRadius: "999px",
                        boxShadow: "0 4px 12px rgba(201,162,39,0.3)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Best value
                    </span>
                  )}

                  <h3 style={{ fontWeight: 700, fontSize: "1.1rem", color: col.hero ? CREAM : INK, marginBottom: "1rem" }}>
                    {col.title}
                    {col.hero && <span style={{ color: "#C9A227", marginLeft: "6px" }}>✦</span>}
                  </h3>

                  {ROI_ROW_LABELS.map((label, ri) => (
                    <div
                      key={label}
                      style={{
                        borderTop: `1px solid ${col.hero ? "rgba(255,255,255,0.08)" : "#E8DFC8"}`,
                        padding: "1rem 0",
                        display: "flex",
                        flexDirection: "column",
                        gap: "4px",
                      }}
                    >
                      <span style={{ fontWeight: 600, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em", color: col.hero ? "rgba(251,246,234,0.5)" : STONE }}>
                        {label}
                      </span>
                      <span style={{ fontWeight: 700, fontSize: "0.95rem", ...(col.hero ? goldTextGrad : { color: INK }) }}>
                        {col.rows[ri]}
                      </span>
                    </div>
                  ))}

                  {col.hero && (
                    <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "1.25rem", textAlign: "center" }}>
                      <PillCta href="#post-opportunity" variant="gold">Post an opportunity</PillCta>
                    </div>
                  )}
                </div>
              </RevealSection>
            ))}
          </div>
        </RevealSection>

        <style>{`
          .emp-roi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; align-items: stretch; }
          .emp-roi-col { height: 100%; }
          .emp-roi-card-hero { transform: scale(1.03); }
          @media (max-width: 1023px) {
            .emp-roi-card-hero { transform: none; }
          }
          @media (max-width: 767px) {
            .emp-roi-grid { grid-template-columns: 1fr; gap: 24px; }
            .emp-roi-col-hero { order: -1; }
            .emp-roi-card-hero { transform: none; }
          }
        `}</style>
      </section>

      {/* ── SOCIAL PROOF ─────────────────────────────────────── */}
      <section style={{ background: CREAM, paddingTop: "80px", paddingBottom: "80px" }}>
        <div className="container-x">
          <RevealSection delay={0}>
          <motion.figure {...reveal} style={{ maxWidth: "820px", margin: "0 auto", textAlign: "center" }}>
            <blockquote
              style={{
                fontWeight: 600,
                fontSize: "clamp(22px, 3.2vw, 32px)",
                lineHeight: 1.3,
                letterSpacing: "-0.01em",
                color: INK,
                margin: 0,
                background: "rgba(251, 246, 234, 0.6)",
                backdropFilter: "blur(16px) saturate(1.5)",
                WebkitBackdropFilter: "blur(16px) saturate(1.5)",
                border: "1px solid rgba(201, 162, 39, 0.2)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.8), 0 8px 32px rgba(201,162,39,0.06)",
                borderRadius: "20px",
                padding: "2.5rem 3rem",
              }}
            >
              <span style={goldTextGrad}>“</span>
              We asked for an intern who could build automations. They delivered a full n8n workflow that replaced a
              process we'd been doing manually for two years. We hired them full-time at the end of the trial.
              <span style={goldTextGrad}>”</span>
            </blockquote>
            <figcaption style={{ fontSize: "15px", color: STONE, marginTop: "24px" }}>
              — Head of Operations, US SaaS Company <span style={{ opacity: 0.75 }}>(cohort employer)</span>
            </figcaption>
          </motion.figure>

          {/* Stat pills */}
          <motion.div {...reveal} style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center", marginTop: "48px" }}>
            {[`${FACTS.trained} graduates trained`, `${FACTS.placement} job placement rate`, `${FACTS.years} years placing talent`].map((label) => (
              <div
                key={label}
                style={{
                  padding: "10px 20px",
                  borderRadius: "999px",
                  background: PARCHMENT_LIGHT,
                  border: `1px solid ${PARCHMENT}`,
                  fontSize: "14px",
                  fontWeight: 500,
                  color: INK,
                }}
              >
                {label}
              </div>
            ))}
          </motion.div>

          <motion.p {...reveal} style={{ fontSize: "15px", color: STONE, textAlign: "center", marginTop: "28px", maxWidth: "680px", marginInline: "auto", lineHeight: 1.6 }}>
            Zero cost to host. Zero obligation to hire. Full refund guarantee if we don't place within 2 weeks of
            bootcamp.
          </motion.p>
          </RevealSection>
        </div>
      </section>

      {/* ── CAPABILITIES (mixed 12-col grid) ─────────────────── */}
      <section style={{ background: CREAM, paddingTop: "88px", paddingBottom: "88px" }}>
        <div className="container-x" style={{ maxWidth: "1080px", margin: "0 auto" }}>
          <RevealSection delay={0}>
            <div style={{ maxWidth: "620px", marginBottom: "44px" }}>
              <Eyebrow>What your intern ships</Eyebrow>
              <h2 style={{ fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.03em", color: INK, marginBottom: "12px", lineHeight: 1.1 }}>
                Work they can do in week one.
              </h2>
              <p style={{ fontSize: "15px", color: STONE, lineHeight: 1.6 }}>
                Not potential. Deployed projects they've already built during training.
              </p>
            </div>
          </RevealSection>

          <RevealSection delay={0.1}>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.12 }}
            variants={staggerContainer(reduce, 0.08)}
            className="emp-cap-grid"
          >
            {/* Card 1 — wide featured (dark) */}
            <motion.div variants={fadeUpVariant(reduce)} className="emp-cap-feature">
              <div>
                <span
                  style={{
                    display: "inline-block",
                    background: "rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.6)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: "4px",
                    fontSize: "10px",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    padding: "4px 8px",
                    marginBottom: "24px",
                  }}
                >
                  Engineering track
                </span>
                <h3 style={{ fontWeight: 700, fontSize: "22px", color: CREAM, letterSpacing: "-0.02em", maxWidth: "380px", lineHeight: 1.25 }}>
                  Ship a working Claude API integration
                </h3>
                <div style={{ marginTop: "18px", display: "grid", gap: "8px" }}>
                  {["Claude API setup with streaming and tool use", "Deployed to production URL, not a local demo"].map((d) => (
                    <div key={d} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px", color: "rgba(251,246,234,0.55)", lineHeight: 1.4 }}>
                      <span style={{ color: GOLD, flexShrink: 0 }}>✓</span>
                      {d}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "24px" }}>
                {["Claude API", "FastAPI", "Supabase"].map((t) => (
                  <span
                    key={t}
                    style={{
                      background: "rgba(255,255,255,0.07)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      color: "rgba(255,255,255,0.45)",
                      fontSize: "11px",
                      borderRadius: "4px",
                      padding: "3px 8px",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Cards 2–5 — standard (white) */}
            {STANDARD_CAPS.map((c) => (
              <motion.div
                key={c.title}
                variants={fadeUpVariant(reduce)}
                className="emp-cap-std"
                style={{ ["--span" as any]: c.span }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.borderColor = "rgba(201, 162, 39, 0.4)";
                  e.currentTarget.style.boxShadow = "0 12px 40px rgba(201,162,39,0.1), 0 4px 16px rgba(18,16,14,0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = PARCHMENT;
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div>
                  <TrackBadge track={c.track} />
                  <h3 style={{ fontWeight: 700, fontSize: "20px", color: INK, letterSpacing: "-0.02em", lineHeight: 1.25, marginBottom: "10px" }}>
                    {c.title}
                  </h3>
                  <p style={{ fontSize: "13px", color: STONE, lineHeight: 1.6 }}>{c.body}</p>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "20px" }}>
                  {c.tags.map((t, i) => (
                    <span
                      key={t}
                      className="emp-cap-tag"
                      style={{ fontSize: "12px", color: STONE, padding: "3px 8px", borderRadius: "4px", border: "1px solid transparent" }}
                    >
                      {t}{i < c.tags.length - 1 ? " ·" : ""}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
          </RevealSection>
        </div>

        <style>{`
          .emp-cap-grid { display: grid; grid-template-columns: 1fr; gap: 12px; }
          .emp-cap-feature {
            background: ${INK}; border-radius: 16px; padding: 2.5rem; min-height: 320px;
            display: flex; flex-direction: column; justify-content: space-between;
            border: 1px solid transparent;
            transition: border-color 250ms ease, box-shadow 250ms ease;
          }
          .emp-cap-feature:hover {
            border-color: rgba(201, 162, 39, 0.5);
            box-shadow: 0 12px 40px rgba(201, 162, 39, 0.15);
          }
          .emp-cap-std {
            background: ${WHITE}; border: 1px solid ${PARCHMENT}; border-radius: 16px;
            padding: 2.5rem; min-height: 320px;
            display: flex; flex-direction: column; justify-content: space-between;
            transition: transform 250ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 250ms ease, border-color 250ms ease;
          }
          .emp-cap-tag { transition: background 200ms, border-color 200ms, color 200ms; }
          .emp-cap-std:hover .emp-cap-tag {
            background: rgba(201, 162, 39, 0.1);
            border-color: rgba(201, 162, 39, 0.3);
            color: #A07820;
          }
          @media (min-width: 900px) {
            .emp-cap-grid { grid-template-columns: repeat(12, 1fr); }
            .emp-cap-feature { grid-column: span 7; }
            .emp-cap-std { grid-column: span var(--span, 4); }
          }
        `}</style>
      </section>

      {/* ── TALENT (photo cards) ─────────────────────────────── */}
      <section id="talent-pool" style={{ background: WHITE, paddingTop: "88px", paddingBottom: "88px", scrollMarginTop: "80px", borderTop: `1px solid ${PARCHMENT}` }}>
        <div className="container-x" style={{ maxWidth: "1080px", margin: "0 auto" }}>
          <RevealSection delay={0}>
            <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 52px" }}>
              <Eyebrow>Meet your next hire</Eyebrow>
              <h2 style={{ fontWeight: 800, fontSize: "clamp(26px, 3.6vw, 40px)", letterSpacing: "-0.03em", color: INK, marginBottom: "12px" }}>
                Real builders. Real projects. Available now.
              </h2>
              <p style={{ fontSize: "16px", color: STONE, lineHeight: 1.6 }}>
                Each profile leads with a project they've already shipped and the outcome it drove.
              </p>
            </div>
          </RevealSection>

          <div className="emp-talent-grid">
            {TALENT.map((t, index) => {
              const isEng = /engineering/i.test(t.track);
              return (
                <RevealSection key={t.project} delay={index * 0.1}>
                <div
                  className="emp-talent-card"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.borderColor = INK;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.borderColor = PARCHMENT;
                  }}
                >
                  {/* Photo area */}
                  <div style={{ width: "100%", height: "280px", overflow: "hidden", position: "relative", background: PARCHMENT_LIGHT }}>
                    <img
                      src={t.photo}
                      alt={`${t.track} builder — ${t.project}`}
                      loading="lazy"
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
                    />
                    {/* Track badge overlay */}
                    <span
                      style={{
                        position: "absolute",
                        top: "12px",
                        left: "12px",
                        fontSize: "10px",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        padding: "4px 10px",
                        borderRadius: "999px",
                        backdropFilter: "blur(8px) saturate(1.4)",
                        WebkitBackdropFilter: "blur(8px) saturate(1.4)",
                        ...(isEng
                          ? {
                              background: "rgba(18, 16, 14, 0.55)",
                              color: "#C9A227",
                              border: "1px solid rgba(201, 162, 39, 0.4)",
                              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)",
                            }
                          : {
                              background: "rgba(59, 77, 184, 0.55)",
                              color: "#ffffff",
                              border: "1px solid rgba(255,255,255,0.2)",
                              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15)",
                            }),
                      }}
                    >
                      {t.track}
                    </span>
                  </div>

                  {/* Content area */}
                  <div style={{ padding: "1.5rem" }}>
                    <p style={{ fontSize: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "6px", ...goldTextGrad }}>
                      Project built
                    </p>
                    <h3 style={{ fontWeight: 700, fontSize: "16px", color: INK, letterSpacing: "-0.02em", lineHeight: 1.3, marginBottom: "8px" }}>
                      {t.project}
                    </h3>
                    <p style={{ fontSize: "13px", color: STONE, lineHeight: 1.5, marginBottom: "1rem" }}>{t.outcome}</p>

                    <div style={{ borderTop: `1px solid ${PARCHMENT}`, marginBottom: "1rem" }} />

                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "1rem" }}>
                      {t.skills.map((sk) => (
                        <span
                          key={sk}
                          style={{
                            fontSize: "11px",
                            fontWeight: 400,
                            padding: "3px 8px",
                            borderRadius: "4px",
                            background: PARCHMENT_LIGHT,
                            color: STONE,
                            border: `1px solid ${PARCHMENT}`,
                          }}
                        >
                          {sk}
                        </span>
                      ))}
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <a
                        href="#post-opportunity"
                        className="view-profile-link"
                        style={{ fontWeight: 600, fontSize: "13px", color: "#C9A227", textDecoration: "none" }}
                      >
                        View profile →
                      </a>
                      <span
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "50%",
                          background: PARCHMENT,
                          color: STONE,
                          fontSize: "10px",
                          fontWeight: 600,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        {t.initials}
                      </span>
                    </div>
                  </div>
                </div>
                </RevealSection>
              );
            })}
          </div>

          {/* Browse-all ghost pill */}
          <motion.div {...reveal} style={{ textAlign: "center", marginTop: "2rem" }}>
            <a
              href="#post-opportunity"
              className="emp-btn"
              style={{
                display: "inline-block",
                position: "relative",
                overflow: "hidden",
                border: `1.5px solid ${PARCHMENT}`,
                color: STONE,
                borderRadius: "999px",
                padding: "10px 28px",
                fontWeight: 500,
                fontSize: "14px",
                textDecoration: "none",
                transition: "border-color 150ms, color 150ms, transform 150ms cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = INK;
                e.currentTarget.style.color = INK;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = PARCHMENT;
                e.currentTarget.style.color = STONE;
              }}
            >
              <BtnShimmer />
              Browse all available builders →
            </a>
          </motion.div>
        </div>

        <style>{`
          .emp-talent-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }
          /* Cards sit inside RevealSection wrappers, so stretch both to full height. */
          .emp-talent-grid > div { height: 100%; }
          .emp-talent-card {
            display: flex; flex-direction: column; height: 100%;
            background: ${WHITE}; border: 1px solid ${PARCHMENT}; border-radius: 16px;
            overflow: hidden;
            transition: border-color 0.2s ease, transform 0.2s ease;
          }
          @media (min-width: 768px) {
            .emp-talent-grid { grid-template-columns: repeat(3, 1fr); }
          }
        `}</style>
      </section>

      {/* ── FOUNDER VIDEO ────────────────────────────────────── */}
      <section style={{ background: CREAM, padding: "clamp(5rem, 8vw, 7rem) clamp(1.5rem, 5vw, 6rem)" }}>
        <RevealSection delay={0}>
          <div className="emp-founder-grid">
            {/* LEFT — video player (first in DOM so it stacks on top on mobile) */}
            <div
              className="emp-founder-video"
              style={{
                position: "relative",
                borderRadius: "20px",
                overflow: "hidden",
                border: "1px solid rgba(201, 162, 39, 0.2)",
                boxShadow: "0 24px 64px rgba(18,16,14,0.12), 0 8px 24px rgba(201,162,39,0.08)",
              }}
            >
              <video
                ref={videoRef}
                src="/videos/intro-claim-academy.mp4"
                poster="/videos/intro-claim-academy-poster.png"
                controls
                width="100%"
                onPlay={() => setPlaying(true)}
                style={{ display: "block", width: "100%", height: "auto", borderRadius: "20px" }}
              />
              {!playing && (
                <div
                  onClick={() => {
                    videoRef.current?.play();
                    setPlaying(true);
                  }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(18,16,14,0.25)",
                    borderRadius: "20px",
                    cursor: "pointer",
                  }}
                >
                  <span
                    className="emp-play-btn"
                    style={{
                      width: "72px",
                      height: "72px",
                      borderRadius: "50%",
                      background: "rgba(251,246,234,0.92)",
                      backdropFilter: "blur(8px)",
                      WebkitBackdropFilter: "blur(8px)",
                      border: "1px solid rgba(201,162,39,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 8px 32px rgba(18,16,14,0.2)",
                      transition: "transform 200ms",
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ marginLeft: "3px" }}>
                      <path d="M6 4L16 10L6 16V4Z" fill="#12100E" />
                    </svg>
                  </span>
                </div>
              )}
            </div>

            {/* RIGHT — text content */}
            <div>
              <p style={{ fontWeight: 600, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "1rem", ...goldTextGrad }}>
                From the founder
              </p>
              <h2 style={{ fontWeight: 800, fontSize: "clamp(1.75rem, 3vw, 2.75rem)", color: INK, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: "1.25rem" }}>
                Why we guarantee every placement — in writing.
              </h2>
              <p style={{ fontWeight: 400, fontSize: "1rem", color: STONE, lineHeight: 1.7, marginBottom: "2rem" }}>
                Ola Ayeni, founder of Claim Academy, explains how 11 years of placing developers with US employers
                taught us exactly what companies need — and why we back every match with a full refund guarantee.
              </p>
              <div
                className="emp-founder-stats"
                style={{ display: "flex", gap: "2rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(201,162,39,0.15)" }}
              >
                {[
                  { value: "11 yrs", label: "Building this network" },
                  { value: "3,800+", label: "Grads placed" },
                  { value: "87%", label: "Placement rate" },
                ].map((s) => (
                  <div key={s.label} style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    <span style={{ fontWeight: 700, fontSize: "1.4rem", ...goldTextGrad }}>{s.value}</span>
                    <span style={{ fontWeight: 600, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", color: STONE }}>
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </RevealSection>

        <style>{`
          .emp-founder-grid { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(3rem, 6vw, 6rem); align-items: center; }
          .emp-play-btn:hover { transform: scale(1.08); }
          @media (max-width: 767px) {
            .emp-founder-grid { grid-template-columns: 1fr; }
            .emp-founder-video { border-radius: 16px !important; }
            .emp-founder-video video { border-radius: 16px !important; }
            .emp-founder-stats { gap: 1.25rem !important; flex-wrap: wrap; }
          }
        `}</style>
      </section>

      {/* ── BOOK A CALL (inline Calendly embed) ──────────────── */}
      <section
        id="book-a-call"
        style={{
          background: "#F0EBE0",
          padding: "clamp(4rem, 7vw, 6rem) clamp(1.5rem, 5vw, 6rem)",
          scrollMarginTop: "110px",
        }}
      >
        <RevealSection delay={0}>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontWeight: 600, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "14px", ...goldTextGrad }}>
              Schedule a call
            </p>
            <h2 style={{ fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3.25rem)", color: INK, letterSpacing: "-0.03em", textAlign: "center", marginBottom: "12px" }}>
              Talk to us before you post.
            </h2>
            <p style={{ fontWeight: 400, fontSize: "1rem", color: STONE, textAlign: "center", maxWidth: "480px", margin: "0 auto 2.5rem", lineHeight: 1.7 }}>
              15 minutes. We'll match you to the right builder profile and walk you through exactly what to expect.
            </p>
          </div>

          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <div
              className="calendly-inline-widget"
              data-url={`${CALENDLY_URL}?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=C9A227`}
              style={{
                minWidth: "320px",
                height: "700px",
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid rgba(201,162,39,0.2)",
                boxShadow: "0 8px 40px rgba(18,16,14,0.08)",
              }}
            />

            {/* Reassurance strip */}
            <div style={{ display: "flex", gap: "2rem", justifyContent: "center", marginTop: "1.5rem", flexWrap: "wrap" }}>
              {["No agency fee", "No obligation to hire", "Matched in 48 hrs"].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span
                    aria-hidden
                    style={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      border: "1px solid #C9A227",
                      color: "#C9A227",
                      fontSize: "9px",
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    ✓
                  </span>
                  <span style={{ fontWeight: 500, fontSize: "0.85rem", color: STONE }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>
      </section>

      {/* ── WHY US / COMMERCIAL TERMS ────────────────────────── */}
      <section id="how-it-works" style={{ background: CREAM, paddingTop: "88px", paddingBottom: "88px", scrollMarginTop: "80px" }}>
        <div className="container-x" style={{ maxWidth: "980px", margin: "0 auto" }}>
          <RevealSection delay={0}>
          <motion.div {...reveal} style={{ textAlign: "center", marginBottom: "44px" }}>
            <Eyebrow>For employers</Eyebrow>
            <h2 style={{ fontWeight: 800, fontSize: "clamp(26px, 3.6vw, 40px)", letterSpacing: "-0.03em", color: INK }}>
              How it works for employers
            </h2>
          </motion.div>

          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer(reduce, 0.08)}
            style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "14px", maxWidth: "760px", marginInline: "auto" }}
          >
            {EMPLOYER_TERMS.map((term) => (
              <motion.li
                key={term}
                variants={fadeUpVariant(reduce)}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "14px",
                  padding: "18px 22px",
                  borderRadius: "12px",
                  background: WHITE,
                  border: `1px solid ${PARCHMENT}`,
                }}
              >
                <span aria-hidden style={{ fontWeight: 800, fontSize: "18px", lineHeight: 1.4, flexShrink: 0, ...goldTextGrad }}>✓</span>
                <span style={{ fontSize: "16px", color: INK, lineHeight: 1.5 }}>{term}</span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.p {...reveal} style={{ fontSize: "15px", color: STONE, textAlign: "center", marginTop: "36px", maxWidth: "680px", marginInline: "auto", lineHeight: 1.6 }}>
            {FACTS.guarantee}
          </motion.p>
          </RevealSection>
        </div>
      </section>

      {/* ── FAQ (accordion) ──────────────────────────────────── */}
      <section style={{ background: CREAM, padding: "clamp(4rem, 7vw, 6rem) clamp(1.5rem, 5vw, 6rem)", scrollMarginTop: "110px" }}>
        <RevealSection delay={0}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <Eyebrow>Common questions</Eyebrow>
            <h2 style={{ fontWeight: 800, fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", color: INK, letterSpacing: "-0.03em", textAlign: "center", marginTop: "0.75rem" }}>
              Everything you need to know.
            </h2>
          </div>
          <EmployerFaq />
        </RevealSection>
      </section>

      {/* ── POST AN OPPORTUNITY (two-step form) ──────────────── */}
      <section id="post-opportunity" style={{ background: WHITE, paddingTop: "88px", paddingBottom: "88px", scrollMarginTop: "80px", borderTop: `1px solid ${PARCHMENT}` }}>
        <div className="container-x">
          <RevealSection delay={0}>
            <div style={{ textAlign: "center", maxWidth: "560px", margin: "0 auto 44px" }}>
              <Eyebrow>Get matched</Eyebrow>
              <h2 style={{ fontWeight: 800, fontSize: "clamp(26px, 3.6vw, 40px)", letterSpacing: "-0.03em", color: INK, marginBottom: "12px" }}>
                Post an internship opportunity
              </h2>
              <p style={{ fontSize: "17px", color: STONE, lineHeight: 1.6 }}>
                Start with your email and what you need — we'll match you in 48 hours. No fee to host. No obligation to hire.
              </p>
            </div>
          </RevealSection>

          <RevealSection delay={0.1}>
            <PostOpportunityForm reduce={reduce} />
          </RevealSection>
        </div>

        <style>{`
          @media (min-width: 640px) { .emp-form-grid { grid-template-columns: repeat(2, 1fr); } }
        `}</style>
      </section>

      {/* ── FINAL CTA + FOOTER (one cohesive ink closing block) ── */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          background: INK,
          padding: "clamp(5rem, 10vw, 9rem) clamp(1.5rem, 5vw, 6rem)",
          paddingBottom: 0,
        }}
      >
        <style>{`
          .emp-final-grid { display: grid; grid-template-columns: 1fr auto; gap: clamp(2rem, 6vw, 8rem); align-items: center; }
          .emp-final-actions { display: flex; flex-direction: column; gap: 12px; align-items: flex-end; }
          .emp-footer-row { display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 2rem; padding-top: 2rem; padding-bottom: 2.5rem; }
          .emp-footer-links { display: flex; justify-content: center; gap: 2rem; }
          .emp-footer-right { display: flex; flex-direction: column; gap: 4px; text-align: right; }
          @media (max-width: 767px) {
            .emp-final-grid { grid-template-columns: 1fr; text-align: center; }
            .emp-final-sub { max-width: 100% !important; margin-inline: auto; }
            .emp-final-actions { align-items: stretch; }
            .emp-final-actions a { width: 100%; justify-content: center; }
            .emp-footer-row { grid-template-columns: 1fr; justify-items: center; gap: 1rem; }
            .emp-footer-links { display: none; }
            .emp-footer-right { text-align: center; align-items: center; }
          }
        `}</style>

        {/* Gold dot-grid texture layer */}
        <svg
          aria-hidden
          viewBox="0 0 1200 600"
          preserveAspectRatio="xMidYMid slice"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}
        >
          <defs>
            <pattern id="emp-final-dots" width="48" height="48" patternUnits="userSpaceOnUse">
              <circle cx="24" cy="24" r="1.5" fill="#C9A227" opacity="0.12" />
            </pattern>
          </defs>
          <rect width="1200" height="600" fill="url(#emp-final-dots)" />
        </svg>

        {/* Giant decorative "C" — stroke only, bottom-right */}
        <span
          aria-hidden
          style={{
            position: "absolute",
            bottom: "-60px",
            right: "-20px",
            fontWeight: 800,
            fontSize: "clamp(200px, 30vw, 400px)",
            lineHeight: 1,
            color: "transparent",
            WebkitTextStroke: "1px rgba(201, 162, 39, 0.08)",
            pointerEvents: "none",
            userSelect: "none",
            zIndex: 0,
          }}
        >
          C
        </span>

        <div style={{ position: "relative", zIndex: 1 }}>
          <motion.div {...reveal} className="emp-final-grid">
            {/* LEFT — eyebrow, two-line headline, subtext */}
            <div>
              <div style={{ fontWeight: 600, fontSize: "11px", letterSpacing: "0.14em", color: GOLD, textTransform: "uppercase", marginBottom: "1.25rem" }}>
                Ready to hire?
              </div>
              <h2 style={{ fontWeight: 800, fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: CREAM, letterSpacing: "-0.03em", lineHeight: 1.05, margin: 0 }}>
                <span style={{ display: "block" }}>Start a free trial</span>
                <span style={{ display: "block" }}>
                  with an <span style={{ color: GOLD, fontStyle: "italic" }}>AI builder</span>.
                </span>
              </h2>
              <p className="emp-final-sub" style={{ fontWeight: 400, fontSize: "1rem", color: "rgba(251, 246, 234, 0.55)", marginTop: "1.25rem", maxWidth: "420px", lineHeight: 1.7 }}>
                Tell us what you need. We'll match you within 48 hours. No fee to host. No obligation to hire.
              </p>
            </div>

            {/* RIGHT — stacked CTAs */}
            <div className="emp-final-actions">
              <a
                href="#post-opportunity"
                className="emp-btn"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  position: "relative",
                  overflow: "hidden",
                  gap: "12px",
                  background: GOLD,
                  borderRadius: "999px",
                  padding: "8px 8px 8px 28px",
                  textDecoration: "none",
                  transition: "background 200ms, transform 150ms cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#B8860B")}
                onMouseLeave={(e) => (e.currentTarget.style.background = GOLD)}
              >
                <BtnShimmer />
                <span style={{ fontWeight: 600, fontSize: "0.95rem", color: INK }}>Post an opportunity</span>
                <span className="emp-btn-circle" style={{ width: "36px", height: "36px", borderRadius: "50%", background: INK, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <ArrowRight size={16} color={GOLD} />
                </span>
              </a>
              <a
                href="#talent-pool"
                className="emp-btn"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden",
                  border: "1.5px solid rgba(251, 246, 234, 0.25)",
                  background: "transparent",
                  borderRadius: "999px",
                  padding: "12px 28px",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  color: CREAM,
                  textDecoration: "none",
                  transition: "border-color 200ms, background 200ms, transform 150ms cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(251, 246, 234, 0.5)";
                  e.currentTarget.style.background = "rgba(251, 246, 234, 0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(251, 246, 234, 0.25)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <BtnShimmer />
                Browse available builders
              </a>
            </div>
          </motion.div>

          {/* FOOTER — same ink block, divided by a hairline */}
          <footer style={{ borderTop: "1px solid rgba(251, 246, 234, 0.1)", marginTop: "clamp(3rem, 6vw, 5rem)" }}>
            <div className="emp-footer-row">
              <img
                src="/images/claim-logo-transparent.png"
                alt="Claim Academy"
                style={{ height: "32px", width: "auto" }}
              />
              <div className="emp-footer-links">
                {NAV_LINKS.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    style={{ fontWeight: 400, fontSize: "0.875rem", color: "rgba(251, 246, 234, 0.45)", textDecoration: "none", transition: "color 150ms" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(251, 246, 234, 0.85)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(251, 246, 234, 0.45)")}
                  >
                    {l.label}
                  </a>
                ))}
              </div>
              <div className="emp-footer-right">
                <span style={{ fontWeight: 400, fontSize: "0.8rem", color: "rgba(251, 246, 234, 0.35)" }}>
                  © {new Date().getFullYear()} Claim Academy
                </span>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  style={{ fontWeight: 400, fontSize: "0.8rem", color: GOLD, textDecoration: "none" }}
                  onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
                  onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>
          </footer>
        </div>
      </section>

      {/* ── FLOATING CTA BAR (desktop, post-hero) ────────────── */}
      <AnimatePresence>
        {showFloatingCTA && (
          <motion.div
            className="emp-floating-cta"
            initial={reduce ? { opacity: 0, x: "-50%" } : { y: 80, opacity: 0, x: "-50%" }}
            animate={reduce ? { opacity: 1, x: "-50%" } : { y: 0, opacity: 1, x: "-50%" }}
            exit={reduce ? { opacity: 0, x: "-50%" } : { y: 80, opacity: 0, x: "-50%" }}
            transition={{ duration: reduce ? 0 : 0.4, ease }}
            style={{
              position: "fixed",
              bottom: "24px",
              left: "50%",
              zIndex: 90,
              background: "rgba(18,16,14,0.88)",
              backdropFilter: "blur(16px) saturate(1.4)",
              WebkitBackdropFilter: "blur(16px) saturate(1.4)",
              border: "1px solid rgba(201,162,39,0.3)",
              borderRadius: "999px",
              padding: "0.5rem 0.5rem 0.5rem 1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              boxShadow: "0 8px 32px rgba(18,16,14,0.4), 0 0 0 1px rgba(201,162,39,0.1)",
            }}
          >
            <span
              aria-hidden
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#C9A227",
                boxShadow: "0 0 0 0 rgba(201,162,39,0.4)",
                animation: "urgency-pulse 2s ease-in-out infinite",
                flexShrink: 0,
              }}
            />
            <span style={{ fontWeight: 500, fontSize: "0.875rem", color: "rgba(251,246,234,0.8)", whiteSpace: "nowrap" }}>
              3 spots remaining this cohort
            </span>
            <a
              href="#post-opportunity"
              className="emp-floating-cta-btn"
              style={{
                background: "linear-gradient(135deg, #E8B930, #C9A227)",
                borderRadius: "999px",
                padding: "0.6rem 1.25rem",
                fontWeight: 700,
                fontSize: "0.875rem",
                color: "#12100E",
                textDecoration: "none",
                whiteSpace: "nowrap",
                transition: "opacity 150ms, transform 150ms",
              }}
            >
              Post an opportunity →
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <MobileStickyCta reduce={reduce} />
    </div>
  );
}

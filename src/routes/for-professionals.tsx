import { createFileRoute } from "@tanstack/react-router";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AnimatedHeadline,
  CounterStat,
  RevealSection,
  StaggerContainer,
  StaggerItem,
  initSpotlight,
} from "@/lib/motion";
import "@fontsource-variable/fraunces";

export const Route = createFileRoute("/for-professionals")({
  head: () => ({
    meta: [
      { title: "AI Internship for Working Professionals — Claim Academy" },
      {
        name: "description",
        content: "Add AI to your career in 12 weeks. Employer reimbursement available under IRS Section 127. Guaranteed internship placement or full refund.",
      },
      { property: "og:title", content: "AI Internship for Working Professionals — Claim Academy" },
      {
        property: "og:description",
        content: "12 weeks to real AI experience. Your employer may cover up to $5,250. Guaranteed placement or full refund.",
      },
    ],
  }),
  component: ForProfessionalsPage,
});

const BOOK_URL = (import.meta as { env?: Record<string, string> }).env?.VITE_STRATEGY_CALL_URL ?? "#book-call";
const EASE = [0.16, 1, 0.3, 1] as const;

function ForProfessionalsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.id = 'for-pros-styles';
    styleEl.textContent = prosCss;
    document.head.appendChild(styleEl);
    return () => { document.getElementById('for-pros-styles')?.remove(); };
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => initSpotlight(".pros-card"), 50);
    return () => {
      window.clearTimeout(id);
    };
  }, []);

  return (
    <div className="for-pros-page">
      <div className="pros-noise" aria-hidden="true" />
      <header className="pros-header">
        <img src="/images/logo-white.png" alt="Claim Academy" style={{ height: "36px", width: "auto" }} />
        <button type="button" onClick={openModal} className="pros-btn-gold">
          See If You Qualify
        </button>
      </header>
      <main>
        <HeroPros onOpen={openModal} />
        <DilemmaSection />
        <EmployerReimbursement onOpen={openModal} />
        <ProgramSection />
        <GuaranteePros onOpen={openModal} />
        <WhoWeAccept />
        <PricingPros onOpen={openModal} />
        <FaqPros />
        <FinalCtaPros onOpen={openModal} />
      </main>
      <footer className="pros-footer">
        <p>© Claim Academy. All rights reserved.</p>
      </footer>
      <StickyMobileCtaPros onOpen={openModal} />
      <ProsModal isOpen={modalOpen} onClose={closeModal} />
    </div>
  );
}

// ─── HERO ───────────────────────────────────────────────────────────────────

function HeroPros({ onOpen }: { onOpen: () => void }) {
  return (
    <section className="hero-pros">
      <div className="hero-pros-orb" aria-hidden="true" />
      <div className="hero-pros-inner">
        <motion.div
          className="pros-eyebrow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
        >
          FOR WORKING PROFESSIONALS
        </motion.div>

        <AnimatedHeadline
          as="h1"
          className="pros-hero-headline"
          delay={0.6}
          text="Add AI to Your Career. Without Quitting. Without Risk. Possibly Without Paying a Cent."
        />

        <motion.p
          className="pros-hero-sub"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2, ease: EASE }}
        >
          Most Fortune 1000 companies cover up to $5,250 of this program under IRS Section 127.
          And if we don't place you — full refund.
        </motion.p>

        <motion.div
          className="employer-callout"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.4, ease: EASE }}
        >
          Your employer may cover up to $5,250 of this — tax-free. We generate all the HR paperwork.
          <a href="#employer-reimbursement">Learn how →</a>
        </motion.div>

        <motion.div
          className="pros-ctas"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1, delayChildren: 1.6 } },
          }}
        >
          <motion.button
            type="button"
            onClick={onOpen}
            className="pros-btn-gold large"
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } }}
          >
            See If You Qualify
          </motion.button>
          <motion.a
            href="#employer-reimbursement"
            className="pros-btn-glass"
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } }}
          >
            How does employer reimbursement work? →
          </motion.a>
        </motion.div>

        <motion.div
          className="pros-stats"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.8, ease: EASE }}
        >
          <div className="pros-stat">
            <span className="pros-stat-num"><CounterStat target={11} suffix=" yrs" duration={1.4} /></span>
            <span className="pros-stat-label">OPERATING</span>
          </div>
          <div className="pros-stat-divider" />
          <div className="pros-stat">
            <span className="pros-stat-num"><CounterStat target={3800} suffix="+" duration={1.4} /></span>
            <span className="pros-stat-label">GRADUATES</span>
          </div>
          <div className="pros-stat-divider" />
          <div className="pros-stat">
            <span className="pros-stat-num"><CounterStat target={87} suffix="%" duration={1.4} /></span>
            <span className="pros-stat-label">PLACEMENT RATE</span>
          </div>
          <div className="pros-stat-divider" />
          <div className="pros-stat">
            <span className="pros-stat-num" style={{ fontSize: "var(--text-lg)" }}>Written</span>
            <span className="pros-stat-label">GUARANTEE</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── DILEMMA ────────────────────────────────────────────────────────────────

function DilemmaSection() {
  return (
    <section className="section-pros section-light section-dilemma">
      <div className="pros-container">
        <RevealSection>
          <AnimatedHeadline
            as="h2"
            className="pros-section-headline"
            text="You Already Know AI Is Coming. The Question Is What You Do Next."
          />
          <div className="dilemma-grid">
            <div>
              <div className="dilemma-label dilemma-label-muted">WITHOUT CAI</div>
              <p className="dilemma-text">
                Take a Coursera course. Get a certificate. Add it to your LinkedIn.
                Hope someone notices. Keep doing your current job while watching
                AI-skilled colleagues get promoted around you.
              </p>
            </div>
            <div className="dilemma-divider" />
            <div>
              <div className="dilemma-label dilemma-label-gold">WITH CAI</div>
              <p className="dilemma-text dilemma-text-primary">
                12 weeks. 4 weeks building real AI. 8 weeks at a real company,
                on real projects, with a founder reference. Your employer might
                even pay for it.
              </p>
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

// ─── EMPLOYER REIMBURSEMENT ─────────────────────────────────────────────────

function EmployerReimbursement({ onOpen }: { onOpen: () => void }) {
  const steps = [
    {
      num: "1",
      title: "Ask Your HR Team",
      desc: "One question: \"Do we offer tuition reimbursement?\"",
    },
    {
      num: "2",
      title: "We Generate the Package",
      desc: "IRS 127 compliance letter, invoice, HR email template. 2 minutes.",
    },
    {
      num: "3",
      title: "Your Employer Pays Us",
      desc: "You're enrolled at zero personal cost.",
    },
  ];

  return (
    <section className="section-pros section-tint" id="employer-reimbursement">
      <div className="pros-container">
        <RevealSection>
          <AnimatedHeadline
            as="h2"
            className="pros-section-headline"
            text="There's a Good Chance Your Employer Will Pay for This."
          />
          <p className="pros-section-body">
            Under IRS Section 127, US employers can provide up to $5,250/year in education
            benefits — completely tax-free for you and your employer. 67% of Fortune 1000
            companies offer this benefit. Most employees have no idea it exists. We generate
            all the paperwork your HR team needs in 2 minutes.
          </p>
          <StaggerContainer className="reimb-steps">
            {steps.map((s) => (
              <StaggerItem key={s.num} className="reimb-step">
                <div className="reimb-num">{s.num}</div>
                <div className="reimb-title">{s.title}</div>
                <p className="reimb-desc">{s.desc}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <div style={{ textAlign: "center" }}>
            <button type="button" onClick={onOpen} className="pros-gold-link">
              See if your employer qualifies — Book a free call →
            </button>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

// ─── PROGRAM ────────────────────────────────────────────────────────────────

function ProgramSection() {
  const cards = [
    {
      pill: "PHASE 1",
      title: "Live AI Training",
      body: "3 sessions/week online, evenings, recorded — fits your schedule. Engineering Track (build AI systems) or Builders Track (ship AI products, zero coding required). 4 deployed projects.",
      note: "Evenings · 3x/week · All recorded",
      featured: false,
    },
    {
      pill: "PHASE 2 · GUARANTEED",
      title: "Employer Internship",
      body: "Placed at a vetted US company within 2 weeks of training completion. Remote. Real production work. Founder reference and LinkedIn recommendation.",
      tag: "Placement guaranteed in writing",
      featured: true,
    },
    {
      pill: "PHASE 3 · LIFETIME",
      title: "Career Activation",
      body: "CV + LinkedIn rewrite. 3 AI mock interviews. Personalized job search strategy. Salary negotiation coaching. Alumni community.",
      note: "Included in all tiers",
      featured: false,
    },
  ];

  return (
    <section className="section-pros section-light">
      <div className="pros-container">
        <RevealSection>
          <AnimatedHeadline
            as="h2"
            className="pros-section-headline"
            text="The Program, Simply Explained."
          />
        </RevealSection>
        <StaggerContainer className="pros-cards-grid">
          {cards.map((c) => (
            <StaggerItem
              key={c.title}
              className={`pros-card${c.featured ? " pros-card-featured" : ""}`}
            >
              <div className="pros-pill">{c.pill}</div>
              <h3 className="pros-card-title">{c.title}</h3>
              <p className="pros-card-body">{c.body}</p>
              {c.tag && <span className="pros-tag-gold">{c.tag}</span>}
              {c.note && <p className="pros-card-note">{c.note}</p>}
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

// ─── GUARANTEE ──────────────────────────────────────────────────────────────

function GuaranteePros({ onOpen }: { onOpen: () => void }) {
  return (
    <section className="section-pros section-navy">
      <div className="pros-container">
        <RevealSection>
          <div className="pros-guarantee-inner">
            <AnimatedHeadline
              as="h2"
              className="pros-section-headline pros-headline-on-dark"
              text="Our Guarantee Is Unusual. We Mean It."
            />
            <p className="pros-guarantee-body">
              We place every student with a vetted US employer within 2 weeks of training
              completion — or you receive a full refund. Written into your enrollment contract
              before you pay a cent. We maintain a 2:1 employer-to-student ratio for every cohort.
            </p>
            <div className="pros-guarantee-row">
              <div className="pros-guarantee-card">
                87% job placement rate over 11 years · 2:1 employer-to-student ratio · Full refund if we fail
              </div>
              <button
                type="button"
                onClick={onOpen}
                className="pros-btn-gold"
                style={{ whiteSpace: 'nowrap', alignSelf: 'center' }}
              >
                See If You Qualify
              </button>
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

// ─── WHO WE ACCEPT ──────────────────────────────────────────────────────────

function WhoWeAccept() {
  const profiles = [
    {
      title: "Software Engineers & Data Analysts",
      desc: "Adding AI to your existing technical stack. Engineering Track recommended.",
    },
    {
      title: "Product Managers",
      desc: "Learning to lead AI teams and evaluate AI solutions. Builders Track recommended.",
    },
    {
      title: "Business Professionals",
      desc: "Transitioning from consulting, finance, or operations into AI-adjacent roles. No coding required.",
    },
    {
      title: "Career Switchers",
      desc: "Ready to invest in a guaranteed outcome, not another course that leads nowhere.",
    },
  ];

  return (
    <section className="section-pros section-light">
      <div className="pros-container-narrow">
        <RevealSection>
          <AnimatedHeadline
            as="h2"
            className="pros-section-headline"
            text="We Accept Students Who Are Ready."
          />
          <p className="pros-section-subhead">
            We don't take everyone. A free strategy call confirms fit before either of us commits.
          </p>
        </RevealSection>
        <StaggerContainer className="who-grid">
          {profiles.map((p) => (
            <StaggerItem key={p.title} className="who-card">
              <h3 className="who-card-title">{p.title}</h3>
              <p className="who-card-desc">{p.desc}</p>
            </StaggerItem>
          ))}
        </StaggerContainer>
        <RevealSection delay={0.4}>
          <p className="pros-who-footer">
            Not sure which track fits? We'll figure it out on your free call.
          </p>
        </RevealSection>
      </div>
    </section>
  );
}

// ─── PRICING ────────────────────────────────────────────────────────────────

function PricingPros({ onOpen }: { onOpen: () => void }) {
  const tiers = [
    {
      name: "LAUNCH",
      price: "$2,997",
      monthly: "≈ $249/mo with Climb Credit",
      bullets: [
        "4-week bootcamp (1 track)",
        "Guaranteed 8-week internship",
        "Career activation",
        "Alumni community",
      ],
      cta: "Get Started",
      featured: false,
    },
    {
      name: "PROFESSIONAL",
      price: "$3,997",
      monthly: "≈ $333/mo with Climb Credit",
      bullets: [
        "Everything in Launch",
        "Both tracks (Engineering + Builders)",
        "Weekly 1:1 coaching call",
        "Priority employer matching",
        "3 AI mock interviews",
        "6-month job support",
      ],
      cta: "Enroll in Professional →",
      featured: true,
    },
    {
      name: "ELITE",
      price: "$4,997",
      monthly: "≈ $416/mo with Climb Credit",
      bullets: [
        "Everything in Professional",
        "Dedicated Claude Career Coach",
        "Guaranteed interviews at 3+ employers",
        "Employer intro letters from Ola",
        "Salary negotiation coaching",
      ],
      cta: "Go Elite",
      featured: false,
    },
  ];

  return (
    <section className="section-pros section-blue-tint">
      <div className="pros-container">
        <RevealSection>
          <AnimatedHeadline
            as="h2"
            className="pros-section-headline"
            text="Investment — Starting With Whether Your Employer Covers It."
          />
          <div className="pros-reimb-callout">
            Many professionals attend at $0 personal cost through employer reimbursement.
            Ask us about it on your free call.
          </div>
        </RevealSection>
        <StaggerContainer className="pros-pricing-grid">
          {tiers.map((t) => (
            <StaggerItem
              key={t.name}
              className={`pros-pricing-card${t.featured ? " pros-pricing-featured" : ""}`}
            >
              {t.featured && (
                <span className="pros-popular-badge">RECOMMENDED FOR PROFESSIONALS</span>
              )}
              <div className="pros-tier-name">{t.name}</div>
              <div className="pros-tier-price">{t.price}</div>
              <div className="pros-tier-monthly">{t.monthly}</div>
              <ul className="pros-tier-bullets">
                {t.bullets.map((b) => <li key={b}>{b}</li>)}
              </ul>
              <button
                type="button"
                onClick={onOpen}
                className={t.featured ? "pros-btn-gold" : "btn-navy"}
                style={{ width: "100%", justifyContent: "center" }}
              >
                {t.cta}
              </button>
            </StaggerItem>
          ))}
        </StaggerContainer>
        <RevealSection delay={0.3}>
          <p className="pros-pricing-footer">
            From $249/month with Climb Credit · Employer reimbursement available · 30-day money-back guarantee · 8 ways to pay
          </p>
        </RevealSection>
      </div>
    </section>
  );
}

// ─── FAQ ────────────────────────────────────────────────────────────────────

const prosFaqs = [
  {
    q: "Can my employer really pay for this?",
    a: "Yes. IRS Section 127 allows employers to provide up to $5,250/year in education benefits, tax-free. We generate the full HR package in 2 minutes — invoice, compliance letter, email template. You submit it to your HR manager.",
  },
  {
    q: "Will this fit around my current job?",
    a: "Yes. Sessions are evenings, 3x/week, 60 minutes each, all recorded. Most professionals complete this without taking any time off work.",
  },
  {
    q: "What if I have no coding experience?",
    a: "The Builders Track requires zero coding background. It's built for professionals who want to ship AI products without becoming engineers. Engineering Track starts from foundations if you want to go deeper.",
  },
  {
    q: "What does 'guaranteed internship' actually mean?",
    a: "We place you with a vetted US employer within 2 weeks of completing the 4-week bootcamp. If we don't, you get a full refund. Written into your contract.",
  },
];

function FaqPros() {
  const [open, setOpen] = useState<Record<number, boolean>>({ 0: true, 1: true });

  return (
    <section className="section-pros section-light">
      <div className="pros-container-narrow">
        <RevealSection>
          <AnimatedHeadline as="h2" className="pros-section-headline" text="Questions, Answered." />
        </RevealSection>
        <StaggerContainer className="pros-faq-list">
          {prosFaqs.map((f, i) => (
            <StaggerItem key={i} className="pros-faq-item">
              <button
                type="button"
                className="pros-faq-q"
                onClick={() => setOpen((p) => ({ ...p, [i]: !p[i] }))}
                aria-expanded={!!open[i]}
              >
                <span>{f.q}</span>
                <span className={`pros-faq-chev${open[i] ? " open" : ""}`} aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
              </button>
              <AnimatePresence initial={false}>
                {open[i] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    style={{ overflow: "hidden" }}
                  >
                    <p className="pros-faq-a">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

// ─── FINAL CTA ──────────────────────────────────────────────────────────────

function FinalCtaPros({ onOpen }: { onOpen: () => void }) {
  return (
    <section className="pros-final">
      <div className="pros-container-narrow" style={{ textAlign: "center" }}>
        <RevealSection>
          <AnimatedHeadline
            as="h2"
            className="pros-section-headline pros-headline-on-dark"
            text="The Smartest Career Move You Can Make in 12 Weeks."
          />
          <p className="pros-final-sub">
            A free 20-minute call. We'll confirm it's the right fit and walk you through
            employer reimbursement.
          </p>
          <button type="button" onClick={onOpen} className="pros-btn-gold large">
            See If You Qualify
          </button>
          <p className="pros-final-meta">
            No pressure. No hard sell. Just an honest conversation.
          </p>
        </RevealSection>
      </div>
    </section>
  );
}

// ─── STICKY MOBILE CTA ──────────────────────────────────────────────────────

function StickyMobileCtaPros({ onOpen }: { onOpen: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {mounted && scrolled && (
        <motion.button
          type="button"
          onClick={onOpen}
          className="pros-mobile-cta"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          See If You Qualify
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ─── PROS MODAL ─────────────────────────────────────────────────────────────

interface ProsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function ProsModal({ isOpen, onClose }: ProsModalProps) {
  const WEBHOOK = (import.meta as { env?: Record<string, string> }).env?.VITE_WEBHOOK_URL ?? "";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [background, setBackground] = useState("");
  const [track, setTrack] = useState("");
  const [source, setSource] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  useEffect(() => {
    if (!isOpen) {
      setFirstName(""); setLastName(""); setEmail("");
      setPhone(""); setBackground(""); setTrack("");
      setSource(""); setStatus("idle");
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    if (!firstName || !email || !phone) return;
    setStatus("submitting");
    try {
      await fetch(WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, phone, background, track, source, source_page: "/for-professionals" }),
      });

      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const onBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onBackdrop}
          role="dialog"
          aria-modal="true"
          aria-label="See if you qualify"
        >
          <motion.div
            className="modal-panel"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {status === "success" ? (
              <div className="modal-success">
                <div className="modal-success-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5"
                    strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3>Thanks — you're all set.</h3>
                <p>Our admissions team will reach out shortly to confirm next steps. Keep an eye on your inbox.</p>
              </div>
            ) : (
              <>
                <div className="modal-header">
                  <h2 className="modal-title">See If You Qualify</h2>
                  <p className="modal-subtitle">Takes 2 minutes. No commitment.</p>
                </div>

                <div className="modal-body">
                  <div className="form-group-label">YOUR INFO</div>
                  <div className="form-row">
                    <div className="form-field">
                      <label className="field-label" htmlFor="fp-firstName">First name</label>
                      <input id="fp-firstName" type="text" className="field-input" placeholder="Jane"
                        value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div className="form-field">
                      <label className="field-label" htmlFor="fp-lastName">Last name</label>
                      <input id="fp-lastName" type="text" className="field-input" placeholder="Smith"
                        value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-field">
                      <label className="field-label" htmlFor="fp-email">Email</label>
                      <input id="fp-email" type="email" className="field-input" placeholder="you@example.com"
                        value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-field">
                      <label className="field-label" htmlFor="fp-phone">Phone</label>
                      <input id="fp-phone" type="tel" className="field-input" placeholder="+1 (555) 555-5555"
                        value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                  </div>

                  <div className="form-group-label" style={{ marginTop: "var(--space-6)" }}>ABOUT YOU</div>

                  <div className="form-field">
                    <label className="field-label">Your background</label>
                    <div className="pill-group">
                      {["Recent grad", "Professional", "Career switcher", "Other"].map((opt) => (
                        <button key={opt} type="button"
                          className={`pill-btn ${background === opt ? "active" : ""}`}
                          onClick={() => setBackground(opt)}>{opt}</button>
                      ))}
                    </div>
                  </div>

                  <div className="form-field">
                    <label className="field-label">Which track interests you?</label>
                    <div className="pill-group">
                      {["Engineering Track", "Builders Track", "Not sure yet"].map((opt) => (
                        <button key={opt} type="button"
                          className={`pill-btn ${track === opt ? "active" : ""}`}
                          onClick={() => setTrack(opt)}>{opt}</button>
                      ))}
                    </div>
                  </div>

                  <div className="form-field">
                    <label className="field-label">How did you hear about us?</label>
                    <div className="pill-group">
                      {["LinkedIn", "Webinar", "Google", "Referral", "Other"].map((opt) => (
                        <button key={opt} type="button"
                          className={`pill-btn ${source === opt ? "active" : ""}`}
                          onClick={() => setSource(opt)}>{opt}</button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-gold shimmer modal-submit"
                    onClick={handleSubmit} disabled={status === "submitting"}>
                    {status === "submitting" ? "Submitting..." : "Book My Free Strategy Call →"}
                  </button>
                  {status === "error" && (
                    <p className="modal-error">Something went wrong. Please try again or email us directly.</p>
                  )}
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── CSS ────────────────────────────────────────────────────────────────────

const prosCss = `
.for-pros-page {
  --bg-base: #FAF8F5;
  --bg-elevated: #FFFFFF;
  --bg-dark: #0F1B2D;
  --bg-dark-2: #162236;
  --accent: #602889;
  --accent-rgb: 96,40,137;
  --accent-gold: #FFB71B;
  --text-primary: #0F1B2D;
  --text-secondary: rgba(15,27,45,0.65);
  --text-tertiary: rgba(15,27,45,0.40);
  --text-on-dark: rgba(255,255,255,0.92);
  --text-on-dark-2: rgba(255,255,255,0.60);
  --border-light: rgba(15,27,45,0.08);
  --border-medium: rgba(15,27,45,0.15);
  font-family:'Inter',system-ui,sans-serif;
  font-size:var(--text-base); line-height:1.7;
  background:var(--bg-base); color:var(--text-primary);
  overflow-x:hidden; position:relative; min-height:100vh;
}
.for-pros-page * { box-sizing:border-box; }
.pros-noise {
  position:fixed; inset:0; z-index:9999; pointer-events:none; opacity:0.015;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
}
.pros-header {
  position:relative; z-index:10; background:#0F1B2D;
  padding:var(--space-4) var(--section-padding-x);
  display:flex; align-items:center; justify-content:space-between;
}
.section-pros { padding:clamp(3rem,6vw,6rem) var(--section-padding-x); }
.section-light { background:var(--bg-base); }
.section-white { background:var(--bg-elevated); }
.section-navy { background:var(--bg-dark); }
.section-tint { background:#EDE7FC; }
.section-blue-tint { background:#E5EFF8; }
.section-dilemma { position:relative; }
.section-dilemma::before {
  content:''; display:block; height:3px;
  background:linear-gradient(90deg,transparent,rgba(255,183,27,0.4) 30%,rgba(96,40,137,0.4) 70%,transparent);
}
.pros-container { max-width:var(--content-max-width); margin:0 auto; }
.pros-container-narrow { max-width:800px; margin:0 auto; }
.pros-section-headline {
  font-family:'Fraunces Variable',Georgia,serif; font-weight:300;
  font-optical-sizing:auto;
  font-size:var(--text-3xl); line-height:1.15;
  letter-spacing:-0.02em; text-align:center;
  color:var(--text-primary); margin:0 auto var(--space-6); max-width:800px;
}
.pros-headline-on-dark { color:rgba(255,255,255,0.95); }
.pros-section-body {
  font-size:var(--text-lg); color:var(--text-secondary);
  line-height:1.7; max-width:680px; margin:0 auto var(--space-4); text-align:center;
}
.pros-section-subhead {
  font-size:var(--text-base); color:var(--text-secondary);
  text-align:center; margin:0 auto var(--space-8); max-width:580px; line-height:1.6;
}
.hero-pros {
  position:relative; padding:var(--space-16) var(--section-padding-x);
  background:#0F1B2D; overflow:hidden;
}
.hero-pros-orb {
  position:absolute; top:-30%; right:-15%; width:70vw; height:70vw;
  background:radial-gradient(circle,rgba(96,40,137,1) 0%,rgba(96,40,137,0) 70%);
  opacity:0.06; pointer-events:none;
}
.hero-pros-inner {
  max-width:var(--content-max-width); margin:0 auto;
  text-align:center; position:relative; z-index:1;
}
.pros-eyebrow {
  display:inline-block; font-family:'Space Grotesk',sans-serif;
  font-weight:600; font-size:0.75rem; letter-spacing:0.15em;
  color:rgba(255,255,255,0.8); padding:0.5rem 1rem; border-radius:999px;
  border:1px solid rgba(255,255,255,0.2); margin-bottom:var(--space-8);
}
.pros-hero-headline {
  font-family:'Fraunces Variable',Georgia,serif; font-weight:300;
  font-optical-sizing:auto;
  font-size:var(--text-4xl); line-height:1.12; letter-spacing:-0.02em;
  color:rgba(255,255,255,0.95); max-width:820px; margin:0 auto var(--space-6);
}
.pros-hero-sub {
  font-size:var(--text-lg); line-height:1.6; color:rgba(255,255,255,0.6);
  max-width:680px; margin:0 auto var(--space-8);
}
.employer-callout {
  display:inline-block; background:rgba(255,255,255,0.08);
  border:1px solid rgba(255,183,27,0.35);
  border-left:3px solid var(--accent-gold); border-radius:12px;
  padding:var(--space-4) var(--space-6); font-size:var(--text-base);
  color:rgba(255,255,255,0.90); margin-bottom:var(--space-8);
  line-height:1.6; max-width:560px; text-align:left;
}
.employer-callout a {
  color:var(--accent-gold); font-weight:600;
  text-decoration:none; margin-left:var(--space-2);
}
.employer-callout a:hover { text-decoration:underline; }
.pros-ctas {
  display:flex; gap:var(--space-4); justify-content:center;
  flex-wrap:wrap; margin-bottom:var(--space-12);
}
.pros-stats {
  display:flex; gap:var(--space-8); justify-content:center;
  flex-wrap:wrap; align-items:center; padding-top:var(--space-8);
  border-top:1px solid rgba(255,255,255,0.08);
}
.pros-stat { display:flex; flex-direction:column; align-items:center; gap:0.25rem; }
.pros-stat-divider { width:1px; height:40px; background:rgba(255,255,255,0.12); }
.pros-stat-num {
  font-family:'Space Grotesk',sans-serif; font-weight:700;
  font-size:var(--text-2xl); color:rgba(255,255,255,0.95);
  line-height:1; letter-spacing:-0.02em;
}
.pros-stat-label {
  font-size:0.7rem; letter-spacing:0.12em; color:rgba(255,255,255,0.45);
  font-weight:500; text-align:center;
}
.pros-btn-gold {
  background:var(--accent-gold); color:#000;
  font-family:'Space Grotesk',sans-serif; font-weight:700; font-size:0.95rem;
  padding:0.95rem 1.75rem; border-radius:12px; border:none; cursor:pointer;
  text-decoration:none; display:inline-flex; align-items:center; justify-content:center;
  position:relative; overflow:hidden;
  transition:transform 0.18s cubic-bezier(0.16,1,0.3,1),box-shadow 0.25s;
}
.pros-btn-gold:hover { transform:scale(1.03); box-shadow:0 12px 40px rgba(255,183,27,0.35); }
.pros-btn-gold:active { transform:scale(0.96); }
.pros-btn-gold.large { font-size:1.05rem; padding:1.1rem 2.25rem; }
.pros-btn-gold::before {
  content:''; position:absolute; inset:0;
  background:linear-gradient(120deg,transparent 30%,rgba(255,255,255,0.35) 50%,transparent 70%);
  transform:translateX(-100%);
  transition:transform 0.7s cubic-bezier(0.16,1,0.3,1); pointer-events:none;
}
.pros-btn-gold:hover::before { transform:translateX(100%); }
.pros-btn-glass {
  background:rgba(255,255,255,0.06); color:rgba(255,255,255,0.85);
  border:1px solid rgba(255,255,255,0.2); border-radius:12px;
  padding:0.95rem 1.75rem; text-decoration:none;
  font-family:'Space Grotesk',sans-serif; font-weight:600; font-size:0.95rem;
  display:inline-flex; align-items:center; justify-content:center;
  transition:background 0.2s,border-color 0.2s;
}
.pros-btn-glass:hover { background:rgba(255,255,255,0.10); border-color:rgba(255,255,255,0.3); }
.dilemma-grid {
  display:grid; grid-template-columns:1fr 24px 1fr;
  gap:var(--space-8); align-items:start; margin-top:var(--space-10);
}
.dilemma-label {
  font-family:'Space Grotesk',sans-serif; font-weight:700;
  font-size:0.7rem; letter-spacing:0.15em; margin-bottom:var(--space-4);
}
.dilemma-label-muted { color:var(--text-tertiary); }
.dilemma-label-gold { color:var(--accent-gold); }
.dilemma-text { font-size:var(--text-base); line-height:1.7; color:var(--text-secondary); }
.dilemma-text-primary { color:var(--text-primary); font-weight:500; }
.dilemma-divider { width:1px; background:var(--border-light); align-self:stretch; margin:0 auto; }
.reimb-steps {
  display:grid; grid-template-columns:repeat(3,1fr);
  gap:var(--space-8); margin:var(--space-10) 0 var(--space-8);
}
.reimb-step { text-align:center; }
.reimb-num {
  width:48px; height:48px; border-radius:50%;
  background:var(--accent-gold); color:#000;
  font-family:'Space Grotesk',sans-serif; font-weight:700; font-size:1.1rem;
  display:flex; align-items:center; justify-content:center; margin:0 auto var(--space-4);
}
.reimb-title {
  font-family:'Space Grotesk',sans-serif; font-weight:600;
  font-size:var(--text-lg); color:var(--text-primary); margin-bottom:var(--space-2);
}
.reimb-desc { font-size:var(--text-sm); color:var(--text-secondary); line-height:1.6; margin:0; }
.pros-gold-link {
  color:var(--accent-gold); font-weight:600; text-decoration:none;
  font-size:var(--text-base); cursor:pointer; background:none; border:none;
  font-family:'Space Grotesk',sans-serif;
}
.pros-gold-link:hover { text-decoration:underline; }
.pros-cards-grid {
  display:grid; grid-template-columns:repeat(3,1fr);
  gap:var(--space-6); margin-top:var(--space-10);
}
.pros-card {
  background:var(--bg-elevated); border:1px solid var(--border-light);
  border-radius:16px; padding:var(--space-8);
  position:relative; isolation:isolate;
  transition:transform 0.3s cubic-bezier(0.16,1,0.3,1),box-shadow 0.3s,border-color 0.3s;
}
.pros-card:hover { transform:translateY(-4px); box-shadow:0 20px 60px rgba(15,27,45,0.10); border-color:var(--border-medium); }
.pros-card-featured { border-top:3px solid var(--accent); box-shadow:0 8px 40px rgba(96,40,137,0.10); }
.pros-card::after {
  content:''; position:absolute; inset:0;
  background:radial-gradient(400px circle at var(--mouse-x,50%) var(--mouse-y,50%),rgba(255,183,27,0.05),transparent 40%);
  border-radius:inherit; opacity:0; transition:opacity 0.3s; pointer-events:none; z-index:1;
}
.pros-card:hover::after { opacity:1; }
.pros-card>* { position:relative; z-index:2; }
.pros-pill {
  display:inline-block; padding:0.3rem 0.8rem;
  background:rgba(96,40,137,0.08); border:1px solid rgba(96,40,137,0.2);
  border-radius:999px; color:var(--accent);
  font-family:'Space Grotesk',sans-serif; font-weight:600;
  font-size:0.7rem; letter-spacing:0.1em; margin-bottom:var(--space-4);
}
.pros-card-title {
  font-family:'Space Grotesk',sans-serif; font-weight:600;
  font-size:var(--text-xl); color:var(--text-primary);
  margin:0 0 var(--space-4); letter-spacing:-0.02em;
}
.pros-card-body { font-size:var(--text-base); color:var(--text-secondary); line-height:1.7; margin:0 0 var(--space-4); }
.pros-card-note { font-size:0.8rem; color:var(--text-tertiary); letter-spacing:0.03em; margin:0; }
.pros-tag-gold {
  display:inline-block; padding:0.35rem 0.8rem;
  background:rgba(255,183,27,0.10); border:1px solid rgba(255,183,27,0.3);
  border-radius:999px; color:#92620A; font-size:0.75rem; font-weight:600; letter-spacing:0.05em;
}
.pros-guarantee-inner {
  display:flex; flex-direction:column; align-items:center;
  text-align:center; max-width:700px; margin:0 auto;
}
.pros-guarantee-row {
  display:flex; align-items:center; gap:var(--space-6);
  justify-content:center; margin-top:var(--space-8); flex-wrap:wrap;
}
.pros-guarantee-body {
  font-size:var(--text-lg); color:rgba(255,255,255,0.7);
  max-width:640px; margin:0 auto var(--space-8); line-height:1.7; text-align:center;
}
.pros-guarantee-card {
  display:block; width:100%; max-width:460px;
  margin:0;
  padding:var(--space-5) var(--space-8);
  background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.10);
  border-top:2px solid var(--accent-gold);
  border-left:3px solid var(--accent-gold); border-radius:12px;
  color:rgba(255,255,255,0.85); font-size:var(--text-base); line-height:1.7; text-align:center;
}
.who-grid {
  display:grid; grid-template-columns:repeat(2,1fr);
  gap:var(--space-6); margin:var(--space-10) 0 var(--space-8);
}
.who-card {
  background:var(--bg-elevated); border:1px solid rgba(15,27,45,0.12);
  border-radius:16px; padding:var(--space-6);
  box-shadow:0 2px 12px rgba(15,27,45,0.05);
  transition:border-color 0.3s,transform 0.3s,box-shadow 0.3s;
}
.who-card:hover { border-color:rgba(96,40,137,0.25); transform:translateY(-2px); box-shadow:0 8px 32px rgba(15,27,45,0.08); }
.who-card-title {
  font-family:'Space Grotesk',sans-serif; font-weight:600;
  font-size:var(--text-lg); color:var(--text-primary);
  margin:0 0 var(--space-2); letter-spacing:-0.01em;
}
.who-card-desc { font-size:var(--text-sm); color:var(--text-secondary); line-height:1.6; margin:0; }
.pros-who-footer { text-align:center; color:var(--text-secondary); font-size:var(--text-base); margin-top:var(--space-4); }
.pros-pricing-grid {
  display:grid; grid-template-columns:repeat(3,1fr);
  gap:var(--space-6); margin:var(--space-8) 0 var(--space-6); align-items:stretch;
}
.pros-pricing-card {
  background:var(--bg-elevated); border:1px solid var(--border-light);
  border-radius:16px; padding:var(--space-8);
  display:flex; flex-direction:column;
  transition:transform 0.3s,box-shadow 0.3s; position:relative;
}
.pros-pricing-card:hover { transform:translateY(-4px); box-shadow:0 20px 60px rgba(15,27,45,0.10); }
.pros-pricing-featured {
  border:2px solid var(--accent); box-shadow:0 8px 40px rgba(96,40,137,0.15);
  transform:translateY(-8px);
}
.pros-pricing-featured:hover { transform:translateY(-12px); }
.pros-popular-badge {
  position:absolute; top:-14px; left:50%; transform:translateX(-50%);
  background:var(--bg-dark); color:#fff;
  font-family:'Space Grotesk',sans-serif; font-weight:700;
  font-size:0.65rem; letter-spacing:0.12em;
  padding:0.35rem 1rem; border-radius:999px; white-space:nowrap;
}
.pros-tier-name {
  font-family:'Space Grotesk',sans-serif; font-weight:700;
  font-size:0.8rem; letter-spacing:0.15em; color:var(--text-tertiary); margin:0 0 var(--space-3);
}
.pros-tier-price {
  font-family:'Space Grotesk',sans-serif; font-weight:700;
  font-size:var(--text-3xl); color:var(--text-primary);
  margin:0 0 var(--space-2); line-height:1; letter-spacing:-0.02em;
}
.pros-tier-monthly { font-size:0.8rem; color:var(--text-tertiary); margin:0 0 var(--space-6); letter-spacing:0.02em; }
.pros-tier-bullets {
  list-style:none; padding:0; margin:0 0 var(--space-8);
  display:flex; flex-direction:column; gap:var(--space-3); flex:1;
}
.pros-tier-bullets li { color:var(--text-secondary); font-size:0.95rem; line-height:1.5; padding-left:1.5rem; position:relative; }
.pros-tier-bullets li::before { content:'✓'; position:absolute; left:0; color:var(--accent); font-weight:700; }
.btn-navy {
  background:transparent; color:var(--text-primary);
  border:1.5px solid rgba(15,27,45,0.30);
  font-family:'Space Grotesk Variable',sans-serif; font-weight:600; font-size:0.95rem;
  padding:0.85rem 1.5rem; border-radius:10px; cursor:pointer;
  transition:border-color 0.2s,background 0.2s,color 0.2s;
  text-decoration:none; display:block; text-align:center; width:100%;
}
.btn-navy:hover { border-color:var(--accent); background:rgba(96,40,137,0.04); color:var(--accent); }
.pros-reimb-callout {
  background:rgba(255,183,27,0.10); border:1px solid rgba(255,183,27,0.30);
  border-radius:12px; padding:var(--space-5) var(--space-6);
  text-align:center; font-size:var(--text-base); color:var(--text-primary);
  margin-bottom:var(--space-8); line-height:1.6; font-weight:500;
}
.pros-pricing-footer { text-align:center; color:var(--text-tertiary); font-size:0.875rem; margin-top:var(--space-4); }
.pros-faq-list { display:flex; flex-direction:column; gap:var(--space-4); margin-top:var(--space-8); }
.pros-faq-item {
  background:var(--bg-elevated); border:1px solid var(--border-light);
  border-radius:12px; overflow:hidden;
}
.pros-faq-q {
  width:100%; display:flex; justify-content:space-between; align-items:center;
  padding:var(--space-6); background:transparent; border:0; cursor:pointer;
  font-family:'Space Grotesk',sans-serif; font-weight:600;
  font-size:var(--text-base); color:var(--text-primary); text-align:left;
}
.pros-faq-chev {
  color:var(--accent); display:flex; align-items:center;
  transition:transform 0.3s cubic-bezier(0.16,1,0.3,1); margin-left:1rem; flex-shrink:0;
}
.pros-faq-chev.open { transform:rotate(180deg); }
.pros-faq-a { padding:0 var(--space-6) var(--space-6); color:var(--text-secondary); font-size:var(--text-base); line-height:1.7; margin:0; }
.pros-final {
  background:linear-gradient(180deg,#162236 0%,#0F1B2D 100%);
  border-top:1px solid rgba(255,183,27,0.15);
  padding:clamp(3rem,6vw,6rem) var(--section-padding-x);
  text-align:center;
}
.pros-final-sub {
  font-size:var(--text-lg); color:rgba(255,255,255,0.6);
  max-width:560px; margin:0 auto var(--space-8); line-height:1.6;
}
.pros-final-meta { color:rgba(255,255,255,0.4); font-size:0.85rem; margin-top:var(--space-6); }
.pros-footer {
  padding:var(--space-8) var(--section-padding-x);
  text-align:center; color:var(--text-tertiary); font-size:0.8rem;
  border-top:1px solid var(--border-light); background:var(--bg-base);
}
.pros-mobile-cta {
  position:fixed; left:0; right:0; bottom:0;
  background:var(--bg-dark); color:#fff; text-align:center;
  font-family:'Space Grotesk',sans-serif; font-weight:700; font-size:1rem;
  padding:1.1rem 1.5rem calc(1.1rem + env(safe-area-inset-bottom));
  z-index:9998; border:none; cursor:pointer;
  box-shadow:0 -8px 32px rgba(0,0,0,0.2); display:none;
  border-top:1px solid rgba(255,183,27,0.2);
}
@media(max-width:768px){
  .pros-mobile-cta { display:block; }
  .pros-footer { padding-bottom:calc(var(--space-8) + 100px); }
  .pros-hero-headline { font-size:var(--text-3xl); }
  .pros-section-headline { font-size:var(--text-2xl); }
  .dilemma-grid { grid-template-columns:1fr; }
  .dilemma-divider { display:none; }
  .reimb-steps { grid-template-columns:1fr; }
  .who-grid { grid-template-columns:1fr; }
  .pros-guarantee-row { flex-direction:column; align-items:center; }
  .pros-guarantee-card { max-width:100%; }
}
@media(max-width:1024px){
  .pros-cards-grid { grid-template-columns:1fr; }
  .pros-pricing-grid { grid-template-columns:1fr; }
  .pros-pricing-featured { transform:none; }
  .pros-pricing-featured:hover { transform:translateY(-4px); }
}
@media(min-width:769px){ .pros-mobile-cta { display:none !important; } }
.modal-backdrop{position:fixed;inset:0;z-index:99990;background:rgba(0,0,0,0.75);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;padding:var(--space-4);overflow-y:auto;}
.modal-panel{background:#ffffff;border-radius:20px;width:100%;max-width:560px;max-height:90vh;overflow-y:auto;position:relative;box-shadow:0 32px 80px rgba(0,0,0,0.5),0 0 0 1px rgba(0,0,0,0.05);}
.modal-close{position:absolute;top:var(--space-4);right:var(--space-4);width:36px;height:36px;border-radius:50%;background:rgba(0,0,0,0.06);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#374151;z-index:1;transition:background 0.2s;}
.modal-close:hover{background:rgba(0,0,0,0.12);}
.modal-header{padding:var(--space-8) var(--space-8) var(--space-4);border-bottom:1px solid rgba(0,0,0,0.06);}
.modal-title{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:1.5rem;color:#111827;margin:0 0 var(--space-2);letter-spacing:-0.02em;line-height:1.2;}
.modal-subtitle{font-size:0.875rem;color:#6B7280;margin:0;}
.modal-body{padding:var(--space-6) var(--space-8);}
.form-group-label{font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:0.7rem;letter-spacing:0.15em;color:#6B7280;margin-bottom:var(--space-4);}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:var(--space-4);margin-bottom:var(--space-4);}
.form-field{display:flex;flex-direction:column;gap:var(--space-2);margin-bottom:var(--space-4);}
.field-label{font-size:0.875rem;font-weight:500;color:#374151;}
.field-input{padding:0.65rem 0.875rem;border:1.5px solid #E5E7EB;border-radius:8px;font-size:0.95rem;color:#111827;background:#fff;outline:none;transition:border-color 0.2s,box-shadow 0.2s;font-family:'Inter',sans-serif;width:100%;}
.field-input:focus{border-color:#602889;box-shadow:0 0 0 3px rgba(96,40,137,0.1);}
.field-input::placeholder{color:#9CA3AF;}
.pill-group{display:flex;flex-wrap:wrap;gap:var(--space-2);}
.pill-btn{padding:0.45rem 1rem;border:1.5px solid #E5E7EB;border-radius:999px;background:#fff;color:#374151;font-size:0.875rem;font-weight:500;cursor:pointer;font-family:'Inter',sans-serif;transition:border-color 0.15s,background 0.15s,color 0.15s;white-space:nowrap;}
.pill-btn:hover{border-color:#602889;color:#602889;}
.pill-btn.active{background:#602889;border-color:#602889;color:#fff;font-weight:600;}
.modal-footer{padding:var(--space-4) var(--space-8) var(--space-8);border-top:1px solid rgba(0,0,0,0.06);}
.modal-submit{width:100%;justify-content:center;font-size:1rem;padding:0.95rem 1.75rem;}
.modal-submit:disabled{opacity:0.6;cursor:not-allowed;transform:none !important;}
.modal-error{text-align:center;color:#DC2626;font-size:0.875rem;margin-top:var(--space-4);}
.modal-success{padding:var(--space-12) var(--space-8);text-align:center;}
.modal-success-icon{width:64px;height:64px;border-radius:50%;background:rgba(0,208,132,0.1);display:flex;align-items:center;justify-content:center;margin:0 auto var(--space-6);color:#00D084;}
.modal-success h3{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:1.5rem;color:#111827;margin:0 0 var(--space-3);letter-spacing:-0.02em;}
.modal-success p{color:#6B7280;font-size:0.95rem;line-height:1.6;margin:0;}
@media(max-width:640px){
  .modal-backdrop{align-items:flex-end;padding:0;}
  .modal-panel{border-radius:20px 20px 0 0;max-height:92vh;width:100%;}
  .form-row{grid-template-columns:1fr;}
  .modal-header{padding:var(--space-6) var(--space-6) var(--space-3);}
  .modal-body{padding:var(--space-4) var(--space-6);}
  .modal-footer{padding:var(--space-3) var(--space-6) calc(var(--space-6) + env(safe-area-inset-bottom));}
}
`;

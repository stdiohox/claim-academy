import { createFileRoute } from "@tanstack/react-router";
import React, { useEffect, useState, type ReactNode } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef } from "react";
import {
  AnimatedHeadline,
  CounterStat,
  RevealSection,
  StaggerContainer,
  StaggerItem,
  initCursor,
  initSpotlight,
} from "@/lib/motion";

export const Route = createFileRoute("/for-grads")({
  head: () => ({
    meta: [
      { title: "Claim AI Internship for CS & STEM Grads — 12 Weeks to a Real Employer" },
      {
        name: "description",
        content: "4 weeks live AI training + 8 weeks at a real US employer. Guaranteed placement in writing or full refund. Built for recent CS/STEM graduates.",
      },
      { property: "og:title", content: "Claim AI Internship for CS & STEM Grads" },
      {
        property: "og:description",
        content: "12 weeks to real employer experience and an AI portfolio. Guaranteed placement or full refund.",
      },
    ],
  }),
  component: ForGradsPage,
});

const BOOK_URL = (import.meta as { env?: Record<string, string> }).env?.VITE_STRATEGY_CALL_URL ?? "#book-call";
const EASE = [0.16, 1, 0.3, 1] as const;

function ForGradsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.id = 'for-grads-styles';
    styleEl.textContent = pageCss;
    document.head.appendChild(styleEl);
    return () => { document.getElementById('for-grads-styles')?.remove(); };
  }, []);

  useEffect(() => {
    const cleanupCursor = initCursor();
    const id = window.setTimeout(() => initSpotlight(".spotlight-card"), 50);
    return () => {
      window.clearTimeout(id);
      cleanupCursor?.();
    };
  }, []);

  return (
    <div className="for-grads-page">
      <div className="noise-overlay" aria-hidden="true" />
      <header className="page-header">
        <img src="/images/logo-white.png" alt="Claim Academy"
          style={{ height: '36px', width: 'auto' }} />
        <button type="button" onClick={openModal} className="btn btn-gold shimmer"
          style={{ fontSize: '0.85rem', padding: '0.6rem 1.25rem' }}>
          Book a Free Call →
        </button>
      </header>
      <main>
        <Hero onOpen={openModal} />
        <IntroVideo />
        <ExperienceParadox />
        <WhatYouGet />
        <Guarantee onOpen={openModal} />
        <TestimonialVideo />
        <WhoFor onOpen={openModal} />
        <Pricing onOpen={openModal} />
        <Faq />
        <FinalCta onOpen={openModal} />
      </main>
      <footer className="page-footer">
        <p>© Claim Academy. All rights reserved.</p>
      </footer>
      <StickyMobileCta onOpen={openModal} />
      <LeadModal isOpen={modalOpen} onClose={closeModal} />
    </div>
  );
}

function Hero({ onOpen }: { onOpen: () => void }) {
  return (
    <section className="hero">
      <div className="orb-field hero-orbs" aria-hidden="true">
        <div className="orb orb-purple-tl" />
        <div className="orb orb-gold-br" />
      </div>
      <div className="hero-inner">
        <motion.div
          className="eyebrow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1, ease: EASE }}
        >
          FOR CS &amp; STEM GRADUATES
        </motion.div>
        <AnimatedHeadline
          as="h1"
          className="hero-headline"
          delay={0.25}
          text="You Have the Degree. Companies Want Experience. Here's How to Get Both in 12 Weeks."
        />
        <motion.p
          className="hero-subhead"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.55, ease: EASE }}
        >
          Claim AI Internship gives you 4 weeks of live AI training AND 8 weeks
          at a real US employer — guaranteed in writing. Not a simulation.
          A real job reference.
        </motion.p>
        <motion.div
          className="hero-ctas"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.65 } },
          }}
        >
          <motion.button type="button" onClick={onOpen} className="btn btn-gold shimmer" variants={ctaItem}>
            Book Your Free Strategy Call
          </motion.button>
          <motion.a href="#what-you-get" className="btn btn-glass shimmer" variants={ctaItem}
            style={{ borderColor: 'rgba(255,255,255,0.3)' }}>
            See How It Works →
          </motion.a>
        </motion.div>
        <motion.p
          className="hero-urgency"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.75, ease: EASE }}
        >
          Cohort A starts Jul 6 · Limited to 20 seats per cohort
        </motion.p>
        <motion.div
          className="stats-row"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06, delayChildren: 0.8 } },
          }}
        >
          <Stat target={3800} suffix="+" label="GRADUATES" />
          <Stat target={87} suffix="%" label="PLACEMENT RATE" />
          <Stat target={11} suffix="" label="YRS OPERATING" />
          <Stat target={200} suffix="+" label="EMPLOYER PARTNERS" />
        </motion.div>
        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.4 }}
          aria-hidden="true"
        >
          <span className="scroll-dot" />
        </motion.div>
      </div>
    </section>
  );
}

const ctaItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
};

function Stat({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  return (
    <motion.div
      className="stat"
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
      }}
    >
      <span className="stat-num">
        <CounterStat target={target} suffix={suffix} duration={1.6} />
      </span>
      <span className="stat-label">{label}</span>
    </motion.div>
  );
}

function ExperienceParadox() {
  const cards = [
    "Entry-level jobs require 2-3 years of experience.",
    "Bootcamp certificates don't close that gap.",
    "AI applications without real projects go straight to the reject pile.",
  ];
  return (
    <section className="section section-paradox dot-grid">
      <div className="container">
        <RevealSection>
          <AnimatedHeadline as="h2" className="section-headline"
            text="You Already Know the Problem." />
          <p className="section-subhead">Every grad faces the same wall:</p>
        </RevealSection>
        <StaggerContainer className="paradox-grid">
          {cards.map((c, i) => (
            <StaggerItem key={i} className="spotlight-card paradox-card">
              <span className="card-num">0{i + 1}</span>
              <p>{c}</p>
            </StaggerItem>
          ))}
        </StaggerContainer>
        <RevealSection delay={0.3}>
          <div className="pivot">
            <p>We built the only program that solves all three. At once.</p>
            <PivotUnderline />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              style={{ textAlign: 'center', marginTop: 'var(--space-8)' }}
            >
              <a href="#what-you-get" className="gold-link"
                style={{ fontSize: 'var(--text-sm)' }}>
                Here's how it works →
              </a>
            </motion.div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

function PivotUnderline() {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  return (
    <span ref={ref} className="pivot-underline-wrap">
      <motion.span
        className="pivot-underline"
        initial={{ width: 0 }}
        animate={inView ? { width: "100%" } : undefined}
        transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
      />
    </span>
  );
}

function WhatYouGet() {
  return (
    <section className="section section-get" id="what-you-get">
      <div className="container">
        <RevealSection>
          <AnimatedHeadline as="h2" className="section-headline"
            text="12 Weeks. A Real Employer. A Portfolio That Gets Interviews." />
        </RevealSection>
        <StaggerContainer className="get-grid">
          <StaggerItem className="spotlight-card get-card glass">
            <span className="watermark">01</span>
            <h3 className="get-week">WEEKS 1–4</h3>
            <h4 className="get-title">Live AI Training</h4>
            <p>3 sessions/week online, evenings, all recorded. Choose Engineering
            Track (Claude API, RAG, LangGraph) or Builders Track (Cursor, n8n,
            Lovable.dev). Ship 4 deployed projects with live URLs.</p>
            <span className="tag">No prior AI experience needed</span>
          </StaggerItem>
          <StaggerItem className="spotlight-card get-card get-card-featured glass-accent">
            <span className="watermark">02</span>
            <h3 className="get-week">WEEKS 5–12</h3>
            <h4 className="get-title">Guaranteed Employer Internship</h4>
            <p>Real projects at a vetted US company. Founder reference. GitHub
            credits. Documented work experience. Placed within 2 weeks of
            training completion — in writing.</p>
            <span className="tag tag-gold">GUARANTEED OR FULL REFUND</span>
          </StaggerItem>
          <StaggerItem className="spotlight-card get-card glass">
            <span className="watermark">03</span>
            <h3 className="get-week">AFTER</h3>
            <h4 className="get-title">Career Activation (Lifetime)</h4>
            <p>CV + LinkedIn rewrite. 3 AI mock interviews. Personalized job
            search strategy. Alumni community. Monthly AI updates.</p>
            <span className="tag">Included in all tiers</span>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}

function Guarantee({ onOpen }: { onOpen: () => void }) {
  return (
    <section className="section section-guarantee">
      <div className="guarantee-orbs" aria-hidden="true">
        <div className="orb orb-purple guarantee-orb-1" />
        <div className="orb orb-purple guarantee-orb-2" />
      </div>
      <div className="container">
        <RevealSection>
          <motion.div
            className="guarantee-eyebrow"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            OUR GUARANTEE
          </motion.div>
          <AnimatedHeadline as="h2" className="section-headline guarantee-headline"
            text="If We Don't Place You, You Pay Nothing." />
          <p className="guarantee-body">
            We place every student with a vetted US employer within 2 weeks of
            training completion — or you receive every dollar back. Written into
            your enrollment contract before you pay a cent.
          </p>
          <div className="guarantee-stats">
            <div className="stat">
              <span className="stat-num">2:1</span>
              <span className="stat-label">EMPLOYER-TO-STUDENT RATIO</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-num">
                <CounterStat target={87} suffix="%" duration={1.6} />
              </span>
              <span className="stat-label">PLACEMENT RATE OVER 11 YEARS</span>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: 'var(--space-12)' }}>
            <button type="button" onClick={onOpen} className="btn btn-gold shimmer"
              style={{ fontSize: '1rem', padding: '1rem 2rem' }}>
              Book Your Free Strategy Call
            </button>
            <p style={{
              marginTop: 'var(--space-4)',
              fontSize: '0.8rem',
              color: 'rgba(255,255,255,0.45)',
              letterSpacing: '0.03em',
            }}>
              Written into your enrollment contract before you pay a cent.
            </p>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

function WhoFor({ onOpen }: { onOpen: () => void }) {
  const items = [
    "You graduated in the last 2 years with a CS, STEM, or technical degree",
    "You've applied to AI/tech jobs and heard nothing back",
    "You want real employer experience, not another certificate",
    "You can commit 10 hours/week for 12 weeks",
    "You're ready to stop waiting and start building",
  ];
  return (
    <section className="section section-who">
      <div className="container container-narrow">
        <RevealSection>
          <AnimatedHeadline as="h2" className="section-headline"
            text="This Is Built for You If..." />
        </RevealSection>
        <StaggerContainer className="checklist">
          {items.map((it, i) => (
            <ChecklistItem key={i} text={it} />
          ))}
        </StaggerContainer>
        <RevealSection delay={0.5}>
          <p className="who-footer">
            Not sure if you qualify?{" "}
            <button type="button" onClick={onOpen} className="gold-link" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
              Book a free 20-min call →
            </button>
          </p>
        </RevealSection>
      </div>
    </section>
  );
}

function ChecklistItem({ text }: { text: string }) {
  return (
    <motion.div
      className="checklist-item"
      variants={{
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
      }}
    >
      <svg className="check" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 12.5l4.5 4.5L19 7" fill="none" stroke="currentColor"
          strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>{text}</span>
    </motion.div>
  );
}

function Pricing({ onOpen }: { onOpen: () => void }) {
  const tiers = [
    {
      name: "LAUNCH", price: "$2,997", monthly: "≈ $249/mo with Climb",
      bullets: [
        "4 weeks live AI training",
        "8-week guaranteed internship",
        "Career activation (lifetime)",
        "Alumni community",
      ],
      cta: "Get Started", buttonClass: "btn-glass",
    },
    {
      name: "PROFESSIONAL", price: "$3,997", monthly: "≈ $333/mo with Climb", featured: true,
      bullets: [
        "Everything in Launch",
        "Both tracks (Engineering + Builders)",
        "Weekly 1:1 coaching call",
        "Priority employer matching",
        "3 AI mock interviews",
        "6-month job support",
      ],
      cta: "Choose Professional", buttonClass: "btn-gold",
    },
    {
      name: "ELITE", price: "$4,997", monthly: "≈ $416/mo with Climb",
      bullets: [
        "Everything in Professional",
        "Dedicated Claude Career Coach",
        "Guaranteed interviews at 3+ employers",
        "Employer intro letters from Ola",
        "Salary negotiation coaching",
      ],
      cta: "Go Elite", buttonClass: "btn-glass",
    },
  ];
  return (
    <section className="section section-pricing">
      <div className="container">
        <RevealSection>
          <AnimatedHeadline as="h2" className="section-headline"
            text="Investment — How Most Grads Pay $0 Upfront" />
          <p className="section-subhead">
            From $249/month with Climb Credit. No payments during the program.
          </p>
        </RevealSection>
        <StaggerContainer className="pricing-grid">
          {tiers.map((t) => (
            <StaggerItem
              key={t.name}
              className={`spotlight-card pricing-card ${t.featured
                ? "pricing-card-featured"
                : "glass"}`}
            >
              {t.featured && <span className="popular-pill">MOST POPULAR</span>}
              <h3 className="tier-name">{t.name}</h3>
              <p className="tier-price">{t.price}</p>
              <p className="tier-monthly">{t.monthly}</p>
              <ul className="tier-bullets">
                {t.bullets.map((b) => <li key={b}>{b}</li>)}
              </ul>
              <button type="button" onClick={onOpen} className={`btn ${t.buttonClass} shimmer tier-cta`}>
                {t.cta}
              </button>
            </StaggerItem>
          ))}
        </StaggerContainer>
        <RevealSection delay={0.3}>
          <p className="pricing-footer">
            30-day money-back guarantee on all tiers · 8 ways to pay including $0 upfront
          </p>
        </RevealSection>
      </div>
    </section>
  );
}

const faqs = [
  {
    q: "Do I need prior AI or coding experience?",
    a: "No. Engineering Track starts from foundations. Builders Track requires zero coding. Your degree gives you the logical thinking — we teach the AI.",
  },
  {
    q: "How is this different from a bootcamp?",
    a: "Bootcamps give certificates. We give you an employer. The guaranteed internship is the difference.",
  },
  {
    q: "What if I don't get placed?",
    a: "Full refund. Written into your enrollment contract before you pay a cent.",
  },
  {
    q: "How much does it actually cost per month?",
    a: "Launch tier on Climb Credit is $249/month. Ascent Funding lets you defer all payments during the 12-week program.",
  },
];

function Faq() {
  const [open, setOpen] = useState<Record<number, boolean>>({ 0: true, 1: true, 2: true });
  return (
    <section className="section section-faq">
      <div className="container container-narrow">
        <RevealSection>
          <AnimatedHeadline as="h2" className="section-headline"
            text="Questions, Answered." />
        </RevealSection>
        <StaggerContainer className="faq-list">
          {faqs.map((f, i) => (
            <StaggerItem key={i} className="faq-item glass">
              <button
                type="button" className="faq-q"
                onClick={() => setOpen((p) => ({ ...p, [i]: !p[i] }))}
                aria-expanded={!!open[i]}
              >
                <span>{f.q}</span>
                <span className={`faq-chev ${open[i] ? 'open' : ''}`} aria-hidden="true">
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
                    className="faq-a-wrap"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    style={{ overflow: "hidden" }}
                  >
                    <p className="faq-a">{f.a}</p>
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

function FinalCta({ onOpen }: { onOpen: () => void }) {
  return (
    <section className="section section-final">
      <div className="final-orbs" aria-hidden="true">
        <div className="orb final-orb-1" style={{
          background: 'radial-gradient(circle, rgba(255,183,27,0.6) 0%, transparent 70%)',
          opacity: 0.08,
        }} />
        <div className="orb final-orb-2" style={{
          background: 'radial-gradient(circle, rgba(255,183,27,0.4) 0%, transparent 70%)',
          opacity: 0.05,
        }} />
      </div>
      <div className="container container-narrow">
        <RevealSection>
          <AnimatedHeadline as="h2" className="section-headline final-headline"
            text="Your Employer Is Already Waiting. Your Cohort Starts Jul 6." />
          <p className="final-sub">
            20-minute call. No pressure. We'll tell you honestly if this is the right fit.
          </p>
          <div className="final-cta-wrap">
            <button type="button" onClick={onOpen} className="btn btn-gold shimmer" style={{
              fontSize: '1.1rem',
              padding: '1.2rem 2.5rem',
              boxShadow: '0 0 40px rgba(255,183,27,0.3), 0 8px 32px rgba(0,0,0,0.4)',
            }}>
              Book Your Free Strategy Call
            </button>
          </div>
          <p className="final-meta">
            Cohort A: Jul 6 · Cohort B: Aug 3 · Limited seats per cohort
          </p>
        </RevealSection>
      </div>
    </section>
  );
}

function StickyMobileCta({ onOpen }: { onOpen: () => void }) {
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
          className="mobile-cta"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          Book Free Strategy Call
        </motion.button>
      )}
    </AnimatePresence>
  );
}

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function LeadModal({ isOpen, onClose }: LeadModalProps) {
  const WEBHOOK = (import.meta as { env?: Record<string, string> })
    .env?.VITE_WEBHOOK_URL ?? '';

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [background, setBackground] = useState('');
  const [track, setTrack] = useState('');
  const [source, setSource] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (!isOpen) {
      setFirstName(''); setLastName(''); setEmail('');
      setPhone(''); setBackground(''); setTrack('');
      setSource(''); setStatus('idle');
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    if (!firstName || !email || !phone) return;
    setStatus('submitting');
    try {
      await fetch(WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, phone, background, track, source, source_page: '/for-grads' }),
      });

      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const onBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
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
          aria-label="Book your free strategy call"
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

            {status === 'success' ? (
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
                  <h2 className="modal-title">Get Your Free Strategy Call</h2>
                  <p className="modal-subtitle">Takes 2 minutes to fill out.</p>
                </div>

                <div className="modal-body">
                  <div className="form-group-label">YOUR INFO</div>
                  <div className="form-row">
                    <div className="form-field">
                      <label className="field-label" htmlFor="fg-firstName">First name</label>
                      <input id="fg-firstName" type="text" className="field-input" placeholder="Jane"
                        value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div className="form-field">
                      <label className="field-label" htmlFor="fg-lastName">Last name</label>
                      <input id="fg-lastName" type="text" className="field-input" placeholder="Smith"
                        value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-field">
                      <label className="field-label" htmlFor="fg-email">Email</label>
                      <input id="fg-email" type="email" className="field-input" placeholder="you@example.com"
                        value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-field">
                      <label className="field-label" htmlFor="fg-phone">Phone</label>
                      <input id="fg-phone" type="tel" className="field-input" placeholder="+1 (555) 555-5555"
                        value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                  </div>

                  <div className="form-group-label" style={{ marginTop: 'var(--space-6)' }}>ABOUT YOU</div>

                  <div className="form-field">
                    <label className="field-label">Your background</label>
                    <div className="pill-group">
                      {['Recent grad', 'Professional', 'Career switcher', 'Other'].map((opt) => (
                        <button key={opt} type="button"
                          className={`pill-btn ${background === opt ? 'active' : ''}`}
                          onClick={() => setBackground(opt)}>{opt}</button>
                      ))}
                    </div>
                  </div>

                  <div className="form-field">
                    <label className="field-label">Which track interests you?</label>
                    <div className="pill-group">
                      {['Engineering Track', 'Builders Track', 'Not sure yet'].map((opt) => (
                        <button key={opt} type="button"
                          className={`pill-btn ${track === opt ? 'active' : ''}`}
                          onClick={() => setTrack(opt)}>{opt}</button>
                      ))}
                    </div>
                  </div>

                  <div className="form-field">
                    <label className="field-label">How did you hear about us?</label>
                    <div className="pill-group">
                      {['LinkedIn', 'Webinar', 'Google', 'Referral', 'Other'].map((opt) => (
                        <button key={opt} type="button"
                          className={`pill-btn ${source === opt ? 'active' : ''}`}
                          onClick={() => setSource(opt)}>{opt}</button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-gold shimmer modal-submit"
                    onClick={handleSubmit} disabled={status === 'submitting'}>
                    {status === 'submitting' ? 'Submitting...' : 'Book My Free Strategy Call →'}
                  </button>
                  {status === 'error' && (
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

function IntroVideo() {
  return (
    <section className="section section-intro-video">
      <div className="container container-narrow">
        <RevealSection>
          <div className="intro-video-label">MEET CLAIM ACADEMY</div>
          <h2 className="intro-video-headline">
            See exactly what you're signing up for — in 90 seconds.
          </h2>
          <p className="intro-video-sub">
            Before you book a call, hear directly from the team
            why this program exists and what makes it different.
          </p>
          <div className="video-player-wrap">
            <video
              src="/videos/intro-claim-academy.mp4"
              controls
              playsInline
              preload="metadata"
              aria-label="Claim Academy intro video"
              className="video-player"
              style={{ backgroundColor: '#000' }}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

function TestimonialVideo() {
  return (
    <section className="section section-testimonial-video">
      <div className="container">
        <RevealSection>
          <div className="testimonial-video-inner">
            <div className="testimonial-video-left">
              <div className="intro-video-label">REAL GRADUATE</div>
              <h2 className="intro-video-headline"
                style={{ textAlign: 'left', margin: '0 0 var(--space-4)' }}>
                Don't take our word for it — take theirs.
              </h2>
              <p className="intro-video-sub"
                style={{ textAlign: 'left', margin: '0 0 var(--space-8)' }}>
                A Claim Academy graduate shares what the program
                actually looked like — the training, the internship,
                and what came after.
              </p>
              <div className="testimonial-quote-card glass">
                <p className="testimonial-quote">
                  "The guaranteed internship is what made the
                  difference. I had a real employer reference
                  before I even started applying."
                </p>
                <span className="testimonial-attr">
                  — A Claim Academy Graduate
                </span>
              </div>
            </div>
            <div className="testimonial-video-right">
              <div className="video-player-wrap">
                <video
                  src="/videos/grad-testimonial.mp4"
                  controls
                  playsInline
                  preload="metadata"
                  aria-label="Claim Academy graduate testimonial"
                  className="video-player"
                  style={{ backgroundColor: '#000' }}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

// Unused but satisfies ReactNode import
const _unused: ReactNode = null;

const pageCss = `
.for-grads-page {
  --bg-base: #08080C;
  --bg-elevated: #0F0F14;
  --bg-raised: #161620;
  --accent: #602889;
  --accent-rgb: 96, 40, 137;
  --accent-gold: #FFB71B;
  --text-primary: rgba(255,255,255,0.95);
  --text-secondary: rgba(255,255,255,0.60);
  --text-tertiary: rgba(255,255,255,0.35);
  --border-subtle: rgba(255,255,255,0.06);
  --border-normal: rgba(255,255,255,0.10);
  position: relative; min-height: 100vh;
  background: var(--bg-base); color: var(--text-primary);
  font-family: 'Inter', system-ui, sans-serif; overflow-x: hidden;
  font-size: var(--text-base); line-height: 1.6;
}
.for-grads-page * { box-sizing: border-box; }
.for-grads-page .orb-purple-tl {
  top:-20vh; left:-10vw; width:70vw; height:70vw;
  background:radial-gradient(circle,rgba(96,40,137,1) 0%,rgba(96,40,137,0) 70%);
  opacity:0.35;
}
.for-grads-page .orb-gold-br {
  bottom:-20vh; right:-10vw; width:60vw; height:60vw;
  background:radial-gradient(circle,rgba(255,183,27,1) 0%,rgba(255,183,27,0) 70%);
  opacity:0.12;
}
.page-header {
  position:relative; z-index:10;
  padding:var(--space-4) var(--section-padding-x);
  display:flex; align-items:center; justify-content:space-between;
}
.hero {
  position:relative; min-height:auto;
  padding:var(--space-16) var(--section-padding-x);
  display:flex; align-items:center; justify-content:center;
  overflow:hidden;
}
.hero-orbs { position:absolute; inset:0; z-index:0; pointer-events:none; overflow:hidden; }
.hero-inner { position:relative; z-index:1; max-width:var(--content-max-width); width:100%; text-align:center; }
.eyebrow {
  display:inline-block;
  font-family:'Space Grotesk',sans-serif; font-weight:600;
  font-size:0.75rem; letter-spacing:0.15em; color:var(--accent-gold);
  padding:0.5rem 1rem; border-radius:999px;
  background:rgba(255,183,27,0.08); border:1px solid rgba(255,183,27,0.25);
  margin-bottom:var(--space-8);
}
.hero-headline {
  font-family:'Space Grotesk',sans-serif; font-weight:700;
  font-size:var(--text-4xl); line-height:1.08; letter-spacing:-0.025em;
  color:var(--text-primary); max-width:780px; margin:0 auto var(--space-8);
}
.hero-subhead {
  font-size:var(--text-lg); color:var(--text-secondary);
  max-width:700px; margin:0 auto var(--space-8); line-height:1.6;
}
.hero-ctas {
  display:flex; gap:var(--space-4); justify-content:center;
  flex-wrap:wrap; margin-bottom:var(--space-4);
}
.hero-urgency { font-size:0.875rem; color:var(--text-tertiary); margin:0 0 var(--space-8); }
.stats-row {
  display:flex; gap:var(--space-8); justify-content:center;
  flex-wrap:wrap; align-items:center;
}
.stats-row .stat { padding:0 var(--space-6); position:relative; }
.stats-row .stat+.stat::before {
  content:''; position:absolute; left:0; top:20%; height:60%;
  width:1px; background:var(--border-normal);
}
.stat { display:flex; flex-direction:column; align-items:center; gap:0.25rem; }
.stat-num {
  font-family:'Space Grotesk',sans-serif; font-weight:700;
  font-size:var(--text-3xl); color:var(--accent-gold);
  line-height:1; letter-spacing:-0.02em;
}
.stat-label {
  font-size:0.7rem; letter-spacing:0.12em; color:var(--text-secondary);
  font-weight:600; text-align:center; max-width:12rem;
}
.scroll-indicator {
  position:absolute; bottom:var(--space-8); left:50%; transform:translateX(-50%);
  width:24px; height:40px; border:1.5px solid rgba(255,255,255,0.25);
  border-radius:999px; display:flex; justify-content:center; padding-top:6px;
}
.scroll-dot {
  width:3px; height:8px; background:rgba(255,255,255,0.6); border-radius:2px;
  animation:scroll-pulse 1.8s ease-in-out infinite;
}
@keyframes scroll-pulse {
  0%,100%{transform:translateY(0);opacity:0;}
  50%{transform:translateY(8px);opacity:1;}
}
.btn {
  position:relative; overflow:hidden;
  display:inline-flex; align-items:center; justify-content:center;
  padding:0.95rem 1.75rem;
  font-family:'Space Grotesk',sans-serif; font-weight:600; font-size:0.95rem;
  border-radius:12px; text-decoration:none; cursor:pointer;
  transition:transform 0.18s cubic-bezier(0.16,1,0.3,1),box-shadow 0.25s;
  border:1px solid transparent; letter-spacing:-0.01em;
}
.btn:hover{transform:scale(1.03);}
.btn:active{transform:scale(0.96);}
.btn-gold{background:var(--accent-gold);color:#000;box-shadow:0 8px 32px rgba(255,183,27,0.25);}
.btn-gold:hover{box-shadow:0 12px 40px rgba(255,183,27,0.40);}
.btn-glass{background:rgba(255,255,255,0.06);color:var(--text-primary);border:1px solid rgba(255,255,255,0.25);backdrop-filter:blur(20px);}
.btn-glass:hover{background:rgba(255,255,255,0.10);border-color:rgba(255,255,255,0.35);}
.btn-large{padding:1.15rem 2.25rem;font-size:1.05rem;}
.shimmer::before{
  content:'';position:absolute;inset:0;
  background:linear-gradient(120deg,transparent 30%,rgba(255,255,255,0.35) 50%,transparent 70%);
  transform:translateX(-100%);transition:transform 0.7s cubic-bezier(0.16,1,0.3,1);
  pointer-events:none;
}
.shimmer:hover::before{transform:translateX(100%);}
.section{position:relative;padding:clamp(3rem,6vw,6rem) var(--section-padding-x);background:var(--bg-base);}
.section-paradox{background:var(--bg-elevated);}
.section-who{background:var(--bg-elevated);}
.section-faq{background:var(--bg-elevated);}
.container{max-width:var(--content-max-width);margin:0 auto;}
.container-narrow{max-width:800px;margin:0 auto;}
.section-headline{
  font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:var(--text-3xl);
  line-height:1.1;letter-spacing:-0.025em;text-align:center;
  margin:0 auto var(--space-6);max-width:900px;
}
.section-subhead{text-align:center;color:var(--text-secondary);font-size:var(--text-lg);margin:0 auto var(--space-8);max-width:600px;line-height:1.6;}
.paradox-grid{display:grid;gap:var(--space-6);grid-template-columns:repeat(3,1fr);margin-bottom:var(--space-8);}
@media(max-width:1024px){.paradox-grid{grid-template-columns:1fr;}}
.paradox-card{position:relative;padding:var(--space-8);border-radius:16px;border-left:4px solid var(--accent-gold);background:rgba(255,183,27,0.03);overflow:hidden;transition:transform 0.35s cubic-bezier(0.16,1,0.3,1),border-color 0.3s;}
.paradox-card:hover{transform:translateY(-4px);background:rgba(255,183,27,0.05);}
.paradox-card p{font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:var(--text-lg);line-height:1.4;color:var(--text-primary);margin:0;}
.card-num{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:0.75rem;letter-spacing:0.15em;color:var(--accent-gold);display:block;margin-bottom:var(--space-4);}
.pivot{text-align:center;max-width:680px;margin:0 auto;padding-top:var(--space-8);}
.pivot p{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:var(--text-2xl);color:var(--text-primary);margin:0 0 var(--space-6);line-height:1.3;letter-spacing:-0.02em;}
.pivot-underline-wrap{display:block;height:3px;max-width:280px;margin:0 auto;background:rgba(255,183,27,0.15);border-radius:2px;overflow:hidden;}
.pivot-underline{display:block;height:100%;background:linear-gradient(90deg,var(--accent-gold),#FFD56B);border-radius:2px;}
.get-grid{display:grid;gap:var(--space-6);grid-template-columns:repeat(3,1fr);align-items:stretch;}
@media(max-width:1024px){.get-grid{grid-template-columns:1fr;}}
.get-card{position:relative;padding:var(--space-8);border-radius:20px;overflow:hidden;transition:transform 0.35s cubic-bezier(0.16,1,0.3,1);}
.get-card-featured{border:1px solid rgba(96,40,137,0.6);box-shadow:0 0 80px rgba(96,40,137,0.30),0 0 0 1px rgba(96,40,137,0.20),inset 0 1px 0 rgba(255,255,255,0.08);transform:translateY(-8px);background:rgba(96,40,137,0.10);}
.watermark{position:absolute;top:-1rem;right:0.5rem;font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:8rem;line-height:1;color:var(--accent-gold);opacity:0.12;pointer-events:none;user-select:none;}
.get-week{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:0.75rem;letter-spacing:0.15em;color:var(--accent-gold);margin:0 0 var(--space-2);}
.get-title{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:var(--text-xl);margin:0 0 var(--space-4);color:var(--text-primary);letter-spacing:-0.02em;}
.get-card p{color:var(--text-secondary);font-size:var(--text-base);line-height:1.6;margin:0 0 var(--space-6);}
.tag{display:inline-block;padding:0.4rem 0.8rem;font-size:0.7rem;letter-spacing:0.1em;font-weight:600;background:rgba(255,255,255,0.04);color:var(--text-secondary);border-radius:999px;border:1px solid var(--border-subtle);}
.tag-gold{background:rgba(255,183,27,0.12);color:var(--accent-gold);border-color:rgba(255,183,27,0.3);}
.section-guarantee{position:relative;overflow:hidden;background:radial-gradient(ellipse at center,#371454 0%,#2A1340 60%,#1A0828 100%);}
.guarantee-eyebrow{display:block;width:fit-content;margin:0 auto var(--space-6);font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:0.7rem;letter-spacing:0.18em;color:rgba(255,255,255,0.7);padding:0.4rem 1rem;border-radius:999px;border:1px solid rgba(255,255,255,0.2);text-align:center;}
.guarantee-orbs{position:absolute;inset:0;pointer-events:none;}
.guarantee-orb-1{top:-30%;left:10%;width:60vw;height:60vw;opacity:0.4;}
.guarantee-orb-2{bottom:-30%;right:10%;width:50vw;height:50vw;opacity:0.3;}
.guarantee-headline{color:#fff;}
.guarantee-body{font-size:var(--text-xl);color:rgba(255,255,255,0.85);max-width:680px;margin:0 auto var(--space-8);text-align:center;line-height:1.5;}
.guarantee-stats{display:flex;gap:var(--space-12);justify-content:center;align-items:center;flex-wrap:wrap;}
.stat-divider{width:1px;height:60px;background:rgba(255,255,255,0.15);}
.checklist{display:flex;flex-direction:column;gap:var(--space-4);max-width:700px;margin:0 auto var(--space-12);}
.checklist-item{display:flex;align-items:center;gap:var(--space-4);padding:var(--space-4) var(--space-6);background:rgba(255,255,255,0.02);border:1px solid var(--border-subtle);border-radius:12px;font-size:var(--text-base);color:var(--text-primary);line-height:1.5;}
.check{flex-shrink:0;width:24px;height:24px;color:var(--accent-gold);}
.who-footer{text-align:center;color:var(--text-secondary);font-size:var(--text-base);}
.gold-link{color:var(--accent-gold);text-decoration:none;font-weight:600;}
.gold-link:hover{text-decoration:underline;}
.pricing-grid{display:grid;gap:var(--space-6);grid-template-columns:repeat(3,1fr);margin-bottom:var(--space-8);align-items:stretch;}
@media(max-width:1024px){.pricing-grid{grid-template-columns:1fr;}}
.pricing-card{position:relative;padding:var(--space-8);border-radius:20px;display:flex;flex-direction:column;transition:transform 0.35s cubic-bezier(0.16,1,0.3,1);}
.pricing-card-featured{border:1px solid rgba(255,255,255,0.20);box-shadow:0 0 0 1px rgba(255,183,27,0.15),0 0 80px rgba(255,183,27,0.12),0 0 40px rgba(96,40,137,0.20),inset 0 1px 0 rgba(255,255,255,0.10);transform:translateY(-12px) scale(1.02);background:rgba(255,255,255,0.05);z-index:1;position:relative;}
.popular-pill{position:absolute;top:-14px;left:50%;transform:translateX(-50%);background:var(--accent-gold);color:#000;font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:0.7rem;letter-spacing:0.15em;padding:0.35rem 1.1rem;border-radius:999px;white-space:nowrap;width:auto;max-width:160px;box-shadow:0 4px 20px rgba(255,183,27,0.5),0 0 0 3px rgba(255,183,27,0.15);}
.tier-name{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:0.85rem;letter-spacing:0.15em;color:var(--text-secondary);margin:0 0 var(--space-4);}
.tier-price{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:var(--text-3xl);color:var(--accent-gold);margin:0 0 var(--space-2);line-height:1;letter-spacing:-0.02em;}
.tier-monthly{font-size:0.8rem;color:var(--text-tertiary);margin:0 0 var(--space-6);letter-spacing:0.02em;}
.tier-bullets{list-style:none;padding:0;margin:0 0 var(--space-8);display:flex;flex-direction:column;gap:var(--space-3);flex:1;}
.tier-bullets li{color:var(--text-secondary);font-size:0.95rem;line-height:1.5;padding-left:1.5rem;position:relative;}
.tier-bullets li::before{content:'✓';position:absolute;left:0;color:var(--accent-gold);font-weight:700;}
.tier-cta{width:100%;}
.pricing-footer{text-align:center;color:var(--text-secondary);font-size:0.875rem;margin-top:var(--space-8);}
.faq-list{display:flex;flex-direction:column;gap:var(--space-4);}
.faq-item{border-radius:14px;overflow:hidden;}
.faq-q{width:100%;display:flex;justify-content:space-between;align-items:center;padding:var(--space-6);background:transparent;border:0;cursor:pointer;font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:var(--text-lg);color:var(--text-primary);text-align:left;}
.faq-chev{color:var(--accent-gold);display:flex;align-items:center;transition:transform 0.3s cubic-bezier(0.16,1,0.3,1);margin-left:1rem;flex-shrink:0;}
.faq-chev.open{transform:rotate(180deg);}
.faq-a{padding:0 var(--space-6) var(--space-6);color:var(--text-secondary);font-size:var(--text-base);line-height:1.6;margin:0;}
.section-final{position:relative;overflow:hidden;background:linear-gradient(180deg,#1C1200 0%,#0D0900 60%,#08080C 100%);border-top:1px solid rgba(255,183,27,0.15);text-align:center;}
.final-orbs{position:absolute;inset:0;pointer-events:none;}
.final-orb-1{top:-20%;left:-10%;width:60vw;height:60vw;}
.final-orb-2{bottom:-20%;right:-10%;width:50vw;height:50vw;}
.final-headline{color:#fff;}
.final-sub{color:rgba(255,255,255,0.7);font-size:var(--text-lg);max-width:600px;margin:0 auto var(--space-8);}
.final-cta-wrap{margin-bottom:var(--space-6);}
.final-meta{color:var(--text-tertiary);font-size:0.875rem;}
.spotlight-card{position:relative;isolation:isolate;}
.spotlight-card::after{content:'';position:absolute;inset:0;background:radial-gradient(400px circle at var(--mouse-x,50%) var(--mouse-y,50%),rgba(255,183,27,0.08),transparent 40%);border-radius:inherit;opacity:0;transition:opacity 0.3s;pointer-events:none;z-index:1;}
.spotlight-card:hover::after{opacity:1;}
.spotlight-card:hover{transform:translateY(-4px);border-color:rgba(255,255,255,0.18);}
.spotlight-card>*{position:relative;z-index:2;}
.page-footer{padding:var(--space-8) var(--section-padding-x);text-align:center;color:var(--text-tertiary);font-size:0.8rem;border-top:1px solid var(--border-subtle);}
.mobile-cta{position:fixed;left:0;right:0;bottom:0;background:var(--accent-gold);color:#000;text-align:center;text-decoration:none;font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:1rem;padding:1.1rem 1.5rem calc(1.1rem + env(safe-area-inset-bottom));z-index:9998;box-shadow:0 -8px 32px rgba(0,0,0,0.4);display:none;}
@media(max-width:768px){
  .mobile-cta{display:block;}
  .page-footer{padding-bottom:calc(var(--space-8) + 100px);}
  .hero-headline{font-size:var(--text-3xl);}
  .section-headline{font-size:var(--text-2xl);}
  .watermark{font-size:5rem;}
  .pricing-card-featured{transform:none;}
  .stats-row{gap:var(--space-4);}
  .stats-row .stat+.stat::before{display:none;}
  .pivot p{font-size:var(--text-xl);line-height:1.4;}
}
.section-intro-video{background:var(--bg-elevated);text-align:center;padding:clamp(3rem,6vw,6rem) var(--section-padding-x);}
.intro-video-label{font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:0.7rem;letter-spacing:0.18em;color:var(--accent-gold);margin-bottom:var(--space-4);}
.intro-video-headline{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:var(--text-2xl);line-height:1.2;letter-spacing:-0.02em;color:var(--text-primary);max-width:600px;margin:0 auto var(--space-4);}
.intro-video-sub{font-size:var(--text-base);color:var(--text-secondary);max-width:520px;margin:0 auto var(--space-8);line-height:1.6;}
.video-player-wrap{position:relative;border-radius:16px;overflow:hidden;box-shadow:0 0 0 1px rgba(255,255,255,0.08),0 32px 80px rgba(0,0,0,0.6),0 0 60px rgba(96,40,137,0.15);background:#000;max-width:800px;margin:0 auto;}
.video-player{width:100%;aspect-ratio:16/9;display:block;border-radius:16px;}
.section-testimonial-video{background:var(--bg-base);padding:clamp(3rem,6vw,6rem) var(--section-padding-x);}
.testimonial-video-inner{display:grid;grid-template-columns:1fr 1fr;gap:var(--space-12);align-items:center;}
@media(max-width:1024px){
  .testimonial-video-inner{grid-template-columns:1fr;}
  .testimonial-video-left{text-align:center;}
  .testimonial-video-left .intro-video-headline{text-align:center !important;margin:0 auto var(--space-4) !important;}
  .testimonial-video-left .intro-video-sub{text-align:center !important;margin:0 auto var(--space-8) !important;}
}
.testimonial-quote-card{padding:var(--space-6);border-radius:16px;margin-top:var(--space-6);}
.testimonial-quote{font-size:var(--text-lg);color:var(--text-primary);line-height:1.6;font-style:italic;margin:0 0 var(--space-4);}
.testimonial-attr{font-size:var(--text-sm);color:var(--accent-gold);font-weight:600;font-family:'Space Grotesk',sans-serif;letter-spacing:0.05em;}
@media(min-width:769px){.mobile-cta{display:none !important;}}
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

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";

const ease = [0.16, 1, 0.3, 1] as const;

const schema = z.object({
  firstName: z.string().trim().min(2, "Required (min 2 chars)").max(80),
  lastName: z.string().trim().min(2, "Required (min 2 chars)").max(80),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().regex(/^[+\d][\d\s()-]{9,}$/, "Enter a valid phone number"),
  background: z.enum(["recent_grad", "working_professional", "career_switcher", "other"], { message: "Select an option" }),
  track: z.enum(["engineering", "builders", "unsure"], { message: "Select an option" }),
  source: z.enum(["linkedin", "webinar", "google", "referral", "other"], { message: "Select an option" }),
});

const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL as string;

const inputCls =
  "w-full px-4 py-3 rounded-md text-[15px] text-[var(--brand-dark)] bg-white outline-none transition-all focus:[border-color:var(--brand-purple)] focus:[box-shadow:0_0_0_3px_var(--brand-purple-glow)]";

export function LeadForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitError(null);
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const fieldErrs: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const k = String(issue.path[0]);
        if (!fieldErrs[k]) fieldErrs[k] = issue.message;
      }
      setErrors(fieldErrs);
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...parsed.data, timestamp: new Date().toISOString() }),
      }).catch(() => null);
      setSuccess(true);
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      id="lead-form"
      className="section-y"
      style={{ background: "transparent", position: "relative" }}
    >
      {/* Dark base */}
      <div style={{ position: "absolute", inset: 0, backgroundColor: "#1A0A24", zIndex: 0 }} />

      {/* Original purple-magenta gradient at reduced opacity */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(138deg, #602889 0%, #C51BDB 100%)",
        opacity: 0.40,
        zIndex: 1,
      }} />

      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 2,
          opacity: 0.20,
          pointerEvents: "none",
        }}
      >
        <source
          src="https://player.vimeo.com/progressive_redirect/playback/732177234/rendition/1080p/file.mp4?loc=external&signature=1d410882807932d9213b5d41b9402c931482611b3ea34f37e347bdfd4beb928e"
          type="video/mp4"
        />
      </video>

      <div className="container-x grid lg:grid-cols-2 gap-12 lg:gap-16 items-center" style={{ position: "relative", zIndex: 3 }}>
        {/* LEFT */}
        <div className="text-white">
          <h2
            className="font-display font-extrabold text-[var(--text-2xl)] lg:text-[var(--text-4xl)]"
            style={{ lineHeight: 1.05, letterSpacing: "-0.02em" }}
          >
            Book your free<br /> strategy call.
          </h2>
          <p className="mt-4 text-white/80" style={{ fontSize: "var(--text-xl)" }}>
            No commitment. No pressure. Just clarity. 20 minutes with an admissions advisor. We'll confirm the program is right for you before you pay a single dollar.
          </p>
          <ul className="mt-8 space-y-2 font-mono text-[13px] text-white/70">
            {[
              "Free. No credit card required.",
              "Personalized track recommendation",
              "All 8 payment options explained",
              "Placement guarantee reviewed with you",
            ].map((t) => (
              <li key={t}>→ {t}</li>
            ))}
          </ul>
          <p className="mt-6 text-[13px] text-white/70">
            <span className="text-[var(--brand-gold)]">★★★★★</span> 4.9/5 across 200+ strategy calls
          </p>
        </div>

        {/* RIGHT */}
        <div
          className="bg-white rounded-xl p-8 sm:p-9 relative"
          style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}
        >
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease, delay: 0.2 }}
                className="text-center py-8"
              >
                <div className="mx-auto mb-4 w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "#DCFCE7" }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="font-display font-bold text-[var(--brand-dark)] text-[22px]">You're booked.</h3>
                <p className="mt-2 text-[15px] text-[var(--brand-gray-600)]">
                  Check your email for the Zoom link. We look forward to speaking with you.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={onSubmit}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease }}
                noValidate
              >
                <h3 className="font-display font-bold text-[var(--brand-dark)] text-[20px]">
                  Get Your Free Strategy Call
                </h3>
                <p className="mt-1 text-[14px] text-[var(--brand-gray-600)]">
                  Takes 2 minutes to fill out.
                </p>

                <div className="mt-6 space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="First name" name="firstName" error={errors.firstName}>
                      <input name="firstName" className={inputCls} style={{ border: errors.firstName ? "1px solid var(--brand-purple)" : "1px solid var(--brand-gray-200)" }} placeholder="Jane" />
                    </Field>
                    <Field label="Last name" name="lastName" error={errors.lastName}>
                      <input name="lastName" className={inputCls} style={{ border: errors.lastName ? "1px solid var(--brand-purple)" : "1px solid var(--brand-gray-200)" }} placeholder="Smith" />
                    </Field>
                  </div>
                  <Field label="Email address" name="email" error={errors.email}>
                    <input type="email" name="email" className={inputCls} style={{ border: errors.email ? "1px solid var(--brand-purple)" : "1px solid var(--brand-gray-200)" }} placeholder="you@example.com" />
                  </Field>
                  <Field label="Phone number" name="phone" error={errors.phone}>
                    <input type="tel" name="phone" className={inputCls} style={{ border: errors.phone ? "1px solid var(--brand-purple)" : "1px solid var(--brand-gray-200)" }} placeholder="+1 (555) 555-5555" />
                  </Field>
                  <Field label="Current background" name="background" error={errors.background}>
                    <select name="background" defaultValue="" className={inputCls} style={{ border: errors.background ? "1px solid var(--brand-purple)" : "1px solid var(--brand-gray-200)" }}>
                      <option value="" disabled>Select one</option>
                      <option value="recent_grad">Recent CS/STEM graduate</option>
                      <option value="working_professional">Working professional (employed)</option>
                      <option value="career_switcher">Career switcher</option>
                      <option value="other">Other</option>
                    </select>
                  </Field>
                  <Field label="Track interest" name="track" error={errors.track}>
                    <select name="track" defaultValue="" className={inputCls} style={{ border: errors.track ? "1px solid var(--brand-purple)" : "1px solid var(--brand-gray-200)" }}>
                      <option value="" disabled>Select one</option>
                      <option value="engineering">Engineering Track (AI Engineer / Architect)</option>
                      <option value="builders">Builders Track (AI PM / Builder)</option>
                      <option value="unsure">Not sure yet</option>
                    </select>
                  </Field>
                  <Field label="How did you hear about us?" name="source" error={errors.source}>
                    <select name="source" defaultValue="" className={inputCls} style={{ border: errors.source ? "1px solid var(--brand-purple)" : "1px solid var(--brand-gray-200)" }}>
                      <option value="" disabled>Select one</option>
                      <option value="linkedin">LinkedIn</option>
                      <option value="webinar">Webinar</option>
                      <option value="google">Google search</option>
                      <option value="referral">Referral from a friend</option>
                      <option value="other">Other</option>
                    </select>
                  </Field>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-6 w-full disabled:opacity-70 font-semibold text-[16px] py-3.5 rounded-md transition-all duration-150 hover:scale-[1.01]"
                  style={{ backgroundColor: "#FFB71B", color: "#000000" }}
                >
                  {submitting ? "Submitting…" : "Book My Free Strategy Call →"}
                </button>
                {submitError && (
                  <p className="mt-2 text-center text-[12px] text-[var(--brand-purple)]">{submitError}</p>
                )}
                <p className="mt-3 text-center text-[12px] text-[var(--brand-gray-600)]">
                  🔒 Your information is private. No spam. No hard sell.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, error, children }: { label: string; name: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[13px] font-medium text-[var(--brand-dark)] mb-1.5">{label}</span>
      {children}
      {error && (
        <span id={`${name}-err`} className="mt-1 block text-[12px] text-[var(--brand-purple)]">
          {error}
        </span>
      )}
    </label>
  );
}

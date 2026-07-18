// Standalone, printable Student Enrollment Agreement page.
// Rendered at /enrollment-agreement (see src/routes/enrollment-agreement.tsx).
// Content mirrors public/enrollment-agreement.pdf (Version 1.1, Effective June 1, 2026).

const PURPLE = "#602889";
const GOLD = "#ffb71b";
const INK = "#1f2430";
const BODY = "#333a45";
const MUTED = "#6b7280";

const bodyText: React.CSSProperties = {
  fontSize: "16px",
  lineHeight: 1.75,
  color: BODY,
  margin: "0 0 16px",
};

function Article({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginTop: "56px" }}>
      <h2
        style={{
          fontSize: "26px",
          fontWeight: 800,
          color: PURPLE,
          letterSpacing: "-0.01em",
          lineHeight: 1.2,
          margin: "0 0 4px",
          paddingBottom: "12px",
          borderBottom: `2px solid ${PURPLE}`,
        }}
      >
        <span style={{ color: INK }}>ARTICLE {number}.</span>{" "}
        {title}
      </h2>
      <div style={{ marginTop: "24px" }}>{children}</div>
    </section>
  );
}

function Section({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginTop: "32px" }}>
      <h3 style={{ fontSize: "18px", fontWeight: 700, color: INK, margin: "0 0 12px" }}>
        {number} {title}
      </h3>
      {children}
    </div>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p style={bodyText}>{children}</p>;
}

function Bullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul style={{ margin: "0 0 16px", paddingLeft: "22px", listStyle: "disc" }}>
      {items.map((it, i) => (
        <li key={i} style={{ ...bodyText, margin: "0 0 10px" }}>
          {it}
        </li>
      ))}
    </ul>
  );
}

function NumberedList({ start = 1, items }: { start?: number; items: React.ReactNode[] }) {
  return (
    <ol start={start} style={{ margin: "0 0 16px", paddingLeft: "24px", listStyle: "decimal" }}>
      {items.map((it, i) => (
        <li key={i} style={{ ...bodyText, margin: "0 0 10px" }}>
          {it}
        </li>
      ))}
    </ol>
  );
}

// Gold left-border callout for important notices / disclaimers.
function Callout({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        margin: "24px 0",
        padding: "20px 24px",
        background: "rgba(255,183,27,0.08)",
        borderLeft: `4px solid ${GOLD}`,
        borderRadius: "6px",
      }}
    >
      {title && (
        <p style={{ fontSize: "14px", fontWeight: 700, letterSpacing: "0.02em", color: "#8a6100", margin: "0 0 8px" }}>
          {title}
        </p>
      )}
      <div style={{ fontSize: "15px", lineHeight: 1.7, color: BODY }}>{children}</div>
    </div>
  );
}

// Highlighted warning box for ALL-CAPS / non-negotiable sections.
function WarningBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        margin: "24px 0",
        padding: "20px 24px",
        background: "rgba(220,38,38,0.05)",
        border: "1px solid rgba(220,38,38,0.25)",
        borderLeft: "4px solid #dc2626",
        borderRadius: "6px",
      }}
    >
      <p style={{ fontSize: "14px", fontWeight: 700, letterSpacing: "0.02em", color: "#b91c1c", margin: "0 0 8px" }}>
        {title}
      </p>
      <div style={{ fontSize: "15px", lineHeight: 1.7, color: "#4b1d1d" }}>{children}</div>
    </div>
  );
}

// Styled option boxes replacing the PDF's ☐ checkboxes.
function OptionGrid({ options }: { options: { label: string; detail: string }[] }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "16px",
        margin: "16px 0 24px",
      }}
    >
      {options.map((opt) => (
        <div
          key={opt.label}
          style={{
            display: "flex",
            gap: "12px",
            padding: "16px 18px",
            border: `1.5px solid ${PURPLE}`,
            borderRadius: "10px",
            background: "rgba(96,40,137,0.03)",
          }}
        >
          <span
            aria-hidden
            style={{
              flexShrink: 0,
              width: "20px",
              height: "20px",
              marginTop: "2px",
              border: `2px solid ${PURPLE}`,
              borderRadius: "5px",
              background: "#fff",
            }}
          />
          <div>
            <p style={{ fontSize: "15px", fontWeight: 700, color: PURPLE, margin: "0 0 4px" }}>{opt.label}</p>
            <p style={{ fontSize: "13.5px", lineHeight: 1.55, color: MUTED, margin: 0 }}>{opt.detail}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function EnrollmentAgreement() {
  return (
    <main style={{ background: "#fff", minHeight: "100vh" }}>
      {/* Brand header */}
      <header style={{ backgroundColor: "#000", borderBottom: `3px solid ${PURPLE}` }}>
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "16px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          <a href="/" style={{ display: "inline-flex", alignItems: "center", textDecoration: "none" }}>
            <img src="/images/logo-white.png" alt="Claim Academy" style={{ height: "34px", width: "auto", display: "block" }} />
          </a>
          <a
            href="/"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "14px",
              fontWeight: 500,
              color: "rgba(255,255,255,0.75)",
              textDecoration: "none",
            }}
          >
            ← Back to home
          </a>
        </div>
      </header>

      {/* Document body */}
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "48px 24px 96px",
          fontFamily: "var(--font-body)",
        }}
      >
        {/* Title block */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h1 style={{ fontSize: "34px", fontWeight: 800, color: INK, letterSpacing: "-0.02em", lineHeight: 1.15, margin: 0 }}>
              Student Enrollment Agreement
            </h1>
            <p style={{ fontSize: "15px", color: MUTED, margin: "10px 0 0" }}>
              Version 1.1 · Effective Date: June 1, 2026
            </p>
          </div>
          <a
            href="/enrollment-agreement.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flexShrink: 0,
              display: "inline-block",
              backgroundColor: GOLD,
              color: "#1a1a1a",
              fontWeight: 700,
              fontSize: "15px",
              padding: "12px 22px",
              borderRadius: "8px",
              textDecoration: "none",
              boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
            }}
          >
            ↓ Download PDF
          </a>
        </div>

        <div style={{ height: "1px", background: "#e5e7eb", margin: "32px 0 8px" }} />

        <P>
          This Student Enrollment Agreement (hereinafter "Agreement" or "Contract") is entered into as of the date of the
          Student's electronic or written signature below, by and between:
        </P>
        <Bullets
          items={[
            <>
              <strong>PROVIDER — Claim, LLC</strong>, a limited liability company organized under the laws of the State of
              Missouri, doing business as Claim Academy AI Internship Program, with its principal place of business at St.
              Louis, Missouri (hereinafter referred to as "Claim Academy," "Company," "Program," or "We").
            </>,
            <>
              <strong>STUDENT</strong> — The individual identified in Section 1 below who has submitted an enrollment
              application and agreed to enroll in the Claim Academy AI Internship Program (hereinafter referred to as
              "Student," "You," or "Participant").
            </>,
          ]}
        />
        <P>
          Together, Claim Academy and the Student are referred to as the "Parties." By signing this Agreement — whether
          electronically or by handwritten signature — the Student acknowledges that they have read, understood, and agreed
          to be bound by all terms and conditions set forth herein.
        </P>

        {/* ARTICLE 1 */}
        <Article number="1" title="Program Selection">
          <Section number="1.1" title="Track Selection">
            <P>
              Student hereby selects the following training track for the Claim Academy AI Internship Program. Selection is
              binding upon enrollment. Track changes may be requested no later than the end of Day 3 of Session 1, subject to
              availability and written approval from Claim Academy.
            </P>
            <OptionGrid
              options={[
                {
                  label: "TRACK A — AI ARCHITECT (Engineering)",
                  detail: "Claude API · RAG Systems · LangGraph Agents · FastAPI · Supabase · Langfuse. Target roles: AI Engineer, AI Architect.",
                },
                {
                  label: "TRACK B — AI BUILDER (No-Code / Low-Code)",
                  detail: "Cursor · Lovable.dev · n8n · Supabase · Claude.ai Projects. Target roles: AI Product Manager, AI Builder.",
                },
              ]}
            />
          </Section>
          <Section number="1.2" title="Cohort Selection">
            <OptionGrid
              options={[
                { label: "COHORT A — (For Recent Graduates, etc.)", detail: "Bootcamp: Tue/Wed/Thurs 6:00 PM CST" },
                { label: "COHORT B — (Working Professionals)", detail: "Bootcamp: Tue/Wed/Thurs 6:00 PM CST" },
              ]}
            />
          </Section>
        </Article>

        {/* ARTICLE 2 */}
        <Article number="2" title="Program Description">
          <Section number="2.1" title="Program Overview">
            <P>
              The Claim Academy AI Internship Program (the "Program") is a 12-week intensive AI career accelerator consisting
              of two sequential phases:
            </P>
            <Bullets
              items={[
                <>
                  <strong>Phase 1 (Weeks 1–4) — Bootcamp Training Phase.</strong> Live online instruction, three (3) sessions
                  per week (Tuesday, Wednesday, Thursday), sixty (60) minutes per session. Students build four (4) portfolio
                  projects using real AI tools and APIs. All sessions are recorded and available for replay within 24 hours.
                  AI Tutor is available in the program Discord community 24 hours a day, 7 days a week. Instructors available
                  as needed.
                </>,
                <>
                  <strong>Phase 2 (Weeks 5–12) — Guaranteed Internship Placement Phase.</strong> Eight (8) weeks of
                  real-world AI internship experience with a vetted U.S.-based employer partner. The internship may be either
                  PAID or UNPAID, at the sole discretion of the employer. Claim Academy does not guarantee compensation for
                  the internship period or after. The internship results in a verifiable employer reference, real-world
                  project experience, and a portfolio artifact suitable for inclusion in the Student's professional resume.
                </>,
                <>
                  <strong>Phase 3 (Lifetime) — Career Activation Phase.</strong> Optional but required to qualify for the full
                  Money-Back Guarantee (see Article 7). Includes lifetime alumni community access, bi-weekly career coaching
                  check-ins, job application support, LinkedIn optimization, mock interview preparation, and salary
                  negotiation coaching.
                </>,
              ]}
            />
            <Callout title="IMPORTANT NOTICE REGARDING INTERNSHIP COMPENSATION">
              The internship component of this Program (Phase 2) may be either PAID or UNPAID at the sole discretion of the
              employer partner to whom the Student is assigned. Claim Academy makes no representation, warranty, or guarantee
              that the Student will receive monetary compensation during the internship period. Students who require paid
              placements should disclose this requirement to their Enrollment Advisor prior to signing this Agreement. Claim
              Academy will make reasonable efforts to match pay-preference students with compensating employers, but cannot
              guarantee availability.
            </Callout>
          </Section>
        </Article>

        {/* ARTICLE 3 */}
        <Article number="3" title="Student Obligations and Participation Requirements">
          <P>
            In consideration of enrollment in the Program and Claim Academy's commitment to provide training and internship
            placement services, the Student agrees to fulfill ALL of the following obligations. Failure to meet these
            obligations may result in dismissal from the Program without refund eligibility, disqualification from the
            internship placement guarantee, and/or disqualification from the money-back guarantee.
          </P>
          <Section number="3.1" title="Attendance Requirements">
            <P>
              The Student agrees to maintain a minimum attendance rate of ninety-eight percent (98%) across all scheduled
              bootcamp sessions. With twelve (12) sessions per cohort, this means the Student may miss no more than one (1)
              session without written pre-approval from their assigned instructor. The following attendance rules apply:
            </P>
            <Bullets
              items={[
                "Attendance is recorded from the time the Student joins the live Zoom session until its conclusion. Partial attendance (joining after the first 10 minutes or leaving more than 10 minutes before the session ends) counts as one-half (0.5) session attended.",
                "If a Student must miss a session due to documented emergency (medical, family, or unavoidable work conflict), they must: (a) notify their instructor by email at least two (2) hours before the session where possible, or within two (2) hours after the session; and (b) watch the recorded session replay in full within forty-eight (48) hours of the live session; and (c) complete all assignments associated with that session on time as if they had attended.",
                "Three (3) or more unexcused absences (without prior written approval or documented emergency) constitutes grounds for academic dismissal from the Program without refund eligibility.",
                "Attendance records are maintained by Claim Academy and may be provided to employer partners at their request as part of the student profile.",
              ]}
            />
          </Section>
          <Section number="3.2" title="Assignment Completion Requirements">
            <P>
              The Student agrees to complete and submit all assigned coursework, portfolio projects, code exercises, and
              assessments on time and at the standard required by the Program. Specifically:
            </P>
            <NumberedList
              items={[
                "All assignments must be submitted through the designated submission system (GitHub repository, Notion portal, or designated submission form) by the deadline specified in the Program schedule.",
                "Late submissions are accepted up to forty-eight (48) hours past the deadline with a 20% grade deduction. Submissions later than forty-eight (48) hours past the deadline will receive a zero (0) grade.",
                "Students must earn a passing grade of sixty percent (60%) or higher on all assignments to remain in good academic standing. Students falling below this threshold on two (2) or more consecutive assignments will be placed on Academic Probation and must attend a mandatory academic support session within five (5) business days.",
                "The following four (4) portfolio artifacts are required for Program completion and are prerequisites for the internship placement phase: (a) A deployed AI application using the Claude API with streaming; (b) A Retrieval-Augmented Generation (RAG) system connected to a real data source; (c) An AI agent or automated workflow using n8n, LangGraph, or equivalent; (d) A final integrated project (\"Capstone\") presented at Demo Day.",
                "Plagiarism, code copying from others' submitted work, or AI-generated code submitted without meaningful modification is strictly prohibited and may result in immediate dismissal from the Program.",
              ]}
            />
          </Section>
          <Section number="3.3" title="Coaching and Speaking Engagement Requirements">
            <P>
              The Program includes mandatory coaching sessions and speaking or community participation requirements that are
              integral to the educational and career preparation experience. The Student agrees to:
            </P>
            <Bullets
              items={[
                "Attend all scheduled individual or group coaching sessions, including but not limited to: weekly instructor office hours (minimum two (2) per month), career coaching sessions (minimum one (1) per month during Phases 2 and 3), and any crisis or support sessions scheduled in response to academic performance issues.",
                "Attend all mandatory speaking engagements, including: Demo Day (final week of Phase 1, mandatory), Orientation Webinar (pre-program, mandatory), any employer showcase events scheduled by Claim Academy during Phase 1 or Phase 2, and any alumni panels or industry networking events designated as mandatory by Claim Academy with a minimum of five (5) business days' written notice.",
                "Participate in the Discord community with a minimum of three (3) substantive contributions per week during Phase 1 (questions, answers to peers, project shares). Community participation is monitored and constitutes part of the engagement record reviewed by employer partners.",
              ]}
            />
          </Section>
          <Section number="3.4" title="Interview Preparation and Pre-Interview Coaching Requirement">
            <P>
              Prior to participating in any employer interview arranged by Claim Academy as part of the internship placement
              process, the Student is REQUIRED to complete the following:
            </P>
            <WarningBox title="MANDATORY PRE-INTERVIEW COACHING — NON-WAIVABLE">
              EVERY Student must complete at least one (1) full interview coaching session with a Claim Academy Career Coach
              or AI-simulated mock interview (minimum 30 minutes) BEFORE attending their first employer interview arranged
              through the Program. This requirement cannot be waived. Students who proceed to an employer interview without
              completing the mandatory coaching session forfeit their eligibility for re-matching if the first interview is
              unsuccessful. Claim Academy's Career Coach will certify the Student as 'Interview-Ready' upon completing this
              requirement. This certification will be noted in the Student's file and shared with the employer partner.
            </WarningBox>
            <NumberedList
              start={6}
              items={[
                "Complete one (1) AI-simulated mock interview session in the designated platform (minimum 30 minutes) prior to any employer-arranged interview.",
                "Complete a LinkedIn profile optimization session with the Career Coach AI agent.",
                "Review and practice the designated behavioral interview framework (STAR method) with their Career Coach prior to the interview.",
                "Prepare and submit to their Career Coach a written summary of the employer's company, the role they are interviewing for, and three (3) specific talking points connecting their portfolio to the employer's needs — at least twenty-four (24) hours before the scheduled interview.",
              ]}
            />
          </Section>
          <Section number="3.5" title="Phase 3 — Career Activation Requirements (Required for Money-Back Guarantee Eligibility)">
            <P>
              If the Student elects to participate in Phase 3 (Career Activation) and wishes to preserve eligibility for the
              Money-Back Guarantee described in Article 7, the Student must fulfill ALL of the following ongoing obligations
              during the career search period:
            </P>
            <Bullets
              items={[
                "Submit a minimum of fifteen (15) qualifying job applications per week. A qualifying application means a complete, tailored application to a real, open role at a real company — not a bulk apply. Documentation (employer name, role title, application date, submission method) must be logged in the Claim Academy Career Dashboard.",
                "Send at least ten (10) substantive professional networking messages per week. Qualifying messages include LinkedIn connection requests with a personalized note, follow-up messages with previous contacts, informational interview requests, and thank-you notes post-interview. Form messages sent via automation do NOT qualify.",
                "Attend all bi-weekly (every two weeks) check-in sessions with the assigned Claim Academy Career Coach. Missed check-ins must be rescheduled within five (5) business days. More than three (3) missed check-ins without rescheduling within the required window disqualifies the Student from the money-back guarantee.",
                "NOT limit job applications solely to remote positions. The Student agrees to apply to a reasonable mix of remote, hybrid, and in-office opportunities. Claim Academy reserves the right to disqualify a Student from the money-back guarantee if Claim Academy determines, in its reasonable judgment, that the Student's application strategy has been unduly limited by geography or work-modality preferences.",
                "Respond to all job leads, referrals, interview opportunities, and employer introductions provided by Claim Academy within forty-eight (48) hours. Failure to respond to three (3) or more employer-arranged opportunities without documented cause disqualifies the Student from guarantee eligibility.",
                "Maintain a professional, up-to-date LinkedIn profile at all times, incorporating all revisions recommended by the Career Coach.",
              ]}
            />
          </Section>
        </Article>

        {/* ARTICLE 4 */}
        <Article number="4" title="Financial Terms and Payment Obligations">
          <Section number="4.1" title="Program Investment — Pricing Tiers">
            <P>The Student agrees to pay the program tuition corresponding to the tier selected at enrollment.</P>
          </Section>
          <Section number="4.2" title="Payment Plans and Terms">
            <P>
              Payment of tuition must be completed in full prior to the final session of the four (4) week bootcamp training
              phase (Phase 1). No Student will be permitted to enter the internship placement phase (Phase 2) with an
              outstanding tuition balance. The following payment options are available:
            </P>
            <Bullets
              items={[
                <><strong>Full Payment.</strong> Full tuition paid at enrollment via Stripe. Eligible for the highest priority status on employer matching.</>,
                <><strong>Deposit + Balance (50/50).</strong> 50% deposit paid at enrollment to reserve the Student's seat. The remaining 50% balance is due no later than the end of Week 1 of the bootcamp. Failure to pay by the Week 1 deadline results in suspension from the program without refund of the initial deposit.</>,
                <><strong>Class Tuition Partner (Monthly).</strong> Monthly installment plan through Claim AI Internship Partner; Student applies directly through Claim AI Internship's partner link. Repayment terms, interest rates, and conditions are governed by the Class Tuition Partner's agreement between Student and Partner. Tuition must be fully funded before the final bootcamp session.</>,
                <><strong>Deferred Repayment.</strong> Deferred repayment option through Claim AI Internship Partner. Governed by the separate Partner's loan agreement. Student may defer payments during the 12-week program period. Loan principal and interest begin accruing per the Deferred Repayment standard terms.</>,
                <><strong>Third-Party Financing / Klarna / Splitit / PayPal.</strong> Third-party financing options available at checkout. Each is subject to the terms and conditions of the respective third-party provider. Claim AI Internship is not responsible for financing decisions made by third-party lenders.</>,
                <><strong>Employer Tuition Reimbursement (IRS Section 127).</strong> Student's employer may pay up to $5,250 per year in education benefits tax-free under IRS Section 127. Claim AI Internship will generate the required documentation (official invoice, IRS compliance letter, HR submission email) within two (2) business days of enrollment. Student is responsible for submitting documentation to their employer and ensuring payment is received by Claim Academy before the end of the bootcamp phase.</>,
              ]}
            />
            <WarningBox title="PAYMENT IN FULL REQUIREMENT — NON-NEGOTIABLE">
              ALL TUITION MUST BE PAID IN FULL BEFORE THE FINAL CLASS OF PHASE 1 (THE BOOTCAMP). No exceptions. A Student with
              any outstanding balance as of the date of the final bootcamp session will not be eligible for: (a) internship
              placement in Phase 2; (b) Career Activation services in Phase 3; (c) any refund or money-back guarantee; (d)
              access to the alumni community or Discord server. Claim Academy reserves the right to suspend portal access,
              revoke Discord membership, and withhold the completion certificate for any Student with an outstanding balance.
            </WarningBox>
          </Section>
        </Article>

        {/* ARTICLE 5 */}
        <Article number="5" title="Internship Placement Guarantee">
          <Section number="5.1" title="The Guarantee">
            <P>
              Subject to the Student's fulfillment of all conditions set forth in Section 5.2 below, Claim Academy guarantees
              that the Student will be matched with and begin an internship at a vetted U.S.-based employer partner within
              thirty (30) calendar days of the successful completion of Phase 1 (the bootcamp), as evidenced by:
            </P>
            <NumberedList
              start={10}
              items={[
                "Submission and passing grade of all four (4) required portfolio artifacts;",
                "Attendance record of ninety-eight percent (98%) or higher across all bootcamp sessions;",
                "Payment of tuition in full; and",
                "Completion of the mandatory pre-interview coaching requirement (Section 3.4).",
              ]}
            />
            <P>
              If Claim AI Internship fails to match the Student with a qualifying internship opportunity within the thirty
              (30) day window specified above despite the Student's full compliance with all conditions, Claim Academy will
              issue a full refund of all tuition paid by the Student, as set forth in the Refund Policy in Article 6.
            </P>
            <WarningBox title="CRITICAL DISCLAIMER — INTERNSHIP DOES NOT GUARANTEE FULL-TIME EMPLOYMENT">
              CLAIM ACADEMY OR CLAIM AI INTERNSHIP EXPRESSLY STATES AND THE STUDENT ACKNOWLEDGES AND AGREES THAT THE
              INTERNSHIP PLACEMENT GUARANTEE DOES NOT IN ANY WAY GUARANTEE, PROMISE, OR IMPLY THAT THE INTERNSHIP WILL LEAD TO
              A FULL-TIME JOB OFFER FROM THE EMPLOYER. THE DECISION TO EXTEND A FULL-TIME EMPLOYMENT OFFER IS MADE SOLELY AND
              EXCLUSIVELY AT THE DISCRETION OF THE EMPLOYER PARTNER. Claim Academy has no authority to compel any employer to
              extend a full-time offer, and makes no representation to that effect. The internship is designed to provide the
              Student with real-world experience, a professional reference, and a portfolio artifact — not a guaranteed
              employment outcome.
            </WarningBox>
          </Section>
          <Section number="5.2" title="Conditions for Guarantee Eligibility">
            <P>The internship placement guarantee is conditional. The Student must satisfy ALL of the following conditions to be eligible:</P>
            <NumberedList
              start={14}
              items={[
                "Completion of all four (4) required portfolio artifacts with a passing grade;",
                "Attendance at ninety-eight percent (98%) or more of all scheduled bootcamp sessions;",
                "Payment of full tuition prior to the final bootcamp session;",
                "Completion of the mandatory pre-interview coaching session (see Section 3.4);",
                "Attendance at Demo Day and all mandatory employer showcase events;",
                "A professional, up-to-date LinkedIn profile meeting Claim Academy's minimum standards at the time of employer matching;",
                "Timely response (within 48 hours) to all employer introduction and interview scheduling communications from Claim Academy;",
                "No material breach of this Agreement, the Student Code of Conduct, or Claim Academy's community policies.",
                "You must be at least 21 years old.",
                "You must permanently reside in the United States.",
                "You must be legally authorized to work in the United States in the professional field related to your Claim AI Internship or Claim Academy program of graduation, without requiring current or future sponsorship.",
                "You must be seeking employment with a U.S. employer.",
                "You must be enrolled in a program that is MBG-eligible.",
              ]}
            />
            <P><strong>English Proficiency:</strong></P>
            <Bullets
              items={[
                "You must be proficient in spoken and written English at the time you start the program.",
                "Proficiency is defined as B2 level on the Common European Framework of Reference (CEFR), as determined by a third-party assessment or as requested by the Claim Academy or Claim AI Internship team.",
              ]}
            />
          </Section>
          <Section number="5.3" title="Internship Compensation — Paid vs. Unpaid">
            <P>The internship may be either PAID or UNPAID, and the Student expressly acknowledges and agrees to the following:</P>
            <Bullets
              items={[
                "The internship compensation structure (if any) is determined solely by the employer partner to which the Student is matched. Claim Academy or Claim AI Internship does not set or guarantee a set amount, and only negotiates intern compensation on behalf of students up to the amount the employer is willing to pay.",
                "\"Unpaid internship\" means the Student receives no monetary compensation during the internship period but gains work experience, a professional reference, and a portfolio artifact.",
                "\"Paid internship\" means the Student receives monetary compensation as negotiated directly between the Student and the employer partner. Any compensation arrangement is governed by a separate agreement between the Student and the employer.",
                "Students who require a paid internship must notify Claim Academy in writing during the enrollment process. Claim Academy will make reasonable good-faith efforts to match such students with paying employers but cannot guarantee availability of compensated placements.",
                "Claim Academy is not a party to any compensation agreement between the Student and the employer partner, and bears no liability for unpaid wages, misclassification of worker status, or any other labor or employment law issues arising from the internship.",
              ]}
            />
          </Section>
        </Article>

        {/* ARTICLE 6 */}
        <Article number="6" title="Refund Policy">
          <Section number="6.1" title="30-Day Money-Back Guarantee">
            <P>
              Students who are dissatisfied with the Program for any reason may request a full refund of all tuition paid,
              provided the request is submitted within three (3) calendar days of the first live class session of their
              enrolled cohort AND prior to the completion of Week 1 of the Program. To request a refund under this provision:
            </P>
            <NumberedList
              start={27}
              items={[
                "Submit a written refund request to info@claimaiinternship.com with the subject line: \"Refund Request — [Full Name] — [Cohort].\"",
                "The request must be received within the three (3) day window. Requests received after Week 1 are not eligible under this provision.",
                "Claim AI Internship will process the refund within thirty (30) business days of receiving the written request.",
              ]}
            />
          </Section>
          <Section number="6.2" title="Internship Placement Guarantee Refund">
            <P>
              If Claim AI Internship fails to place the Student in a qualifying internship within thirty (30) calendar days of
              successful Program completion, and the Student has met all conditions in Section 5.2, the Student is entitled to
              a full refund of all tuition paid. To claim this refund:
            </P>
            <NumberedList
              start={30}
              items={[
                "Submit a written refund request to info@claimaiinternship.com within seven (7) calendar days of the end of the 30-day placement window.",
                "Include documentation demonstrating completion of all four (4) portfolio artifacts, attendance records, and payment confirmation.",
                "Claim AI Internship will review and respond within fourteen (14) business days.",
              ]}
            />
          </Section>
          <Section number="6.3" title="Money-Back Guarantee (Phase 3 — Career Activation)">
            <P>
              Students who elect Phase 3 Career Activation and fulfill ALL of the obligations in Section 3.5 of this Agreement
              for a period of ten (10) months following the acceptance of their final Capstone project, and who have not
              received an offer for a full-time technology role during that period, are entitled to request a full refund of
              all tuition paid under the following conditions:
            </P>
            <Bullets
              items={[
                "Student must have submitted a minimum of fifteen (15) qualifying job applications per week throughout the ten (10) month period, documented in the Claim Academy Career Dashboard.",
                "Student must have sent at least ten (10) qualifying networking messages per week throughout the ten (10) month period.",
                "Student must have attended all bi-weekly Career Coach check-in sessions (or rescheduled within five business days of each missed session).",
                "Student must not have limited applications solely to remote positions, as determined by Claim Academy's reasonable review of the Career Dashboard documentation.",
                "Student must have responded to all employer introductions and interview opportunities provided by Claim Academy within forty-eight (48) hours.",
                "Refund requests must be submitted within fourteen (14) calendar days of the end of the ten (10) month period.",
              ]}
            />
          </Section>
          <Section number="6.4" title="Non-Refundable Fees and Situations">
            <P>The following payments are NON-REFUNDABLE under any circumstances:</P>
            <Bullets
              items={[
                "Any deposit paid to reserve a program seat where the Student later voluntarily withdraws after Day 1 of the cohort.",
                "Payments made under a third-party financing arrangement (e.g., Climb, Ascent, Affirm, PayPal, etc.) are subject to the refund terms of those third-party agreements. Claim Academy's refund obligations are limited to tuition it has directly received and retained.",
                "Non-attendance at a session for personal reasons unrelated to documented emergency.",
                "Voluntary withdrawal after the 30-day money-back guarantee window has closed.",
                "Dismissal from the Program for academic misconduct, violation of the Code of Conduct, or non-payment.",
              ]}
            />
          </Section>
        </Article>

        {/* ARTICLE 7 */}
        <Article number="7" title="Employer Relationship and Employment Limitations">
          <Section number="7.1" title="Nature of the Employer Relationship">
            <P>
              Claim AI Internship facilitates connections between Students and employer partners for the purpose of completing
              the internship component of the Program. The Student acknowledges and agrees that:
            </P>
            <Bullets
              items={[
                "Claim AI Internship is not the Student's employer and is not responsible for any acts or omissions of any employer partner during the internship period.",
                "The internship relationship is governed by a separate agreement between the Student and the employer partner. Claim AI Internship or Claim Academy is not a party to that agreement.",
                "Employer partners are independent companies that have voluntarily agreed to host Claim AI Internship interns. They retain full discretion over intern work assignments, supervision, compensation (if any), and all employment decisions.",
                "Claim AI Internship cannot and does not guarantee: (a) the continuation of the internship beyond the committed dates; (b) conversion of the internship to full-time employment; (c) the quality of the work experience; (d) specific projects, technologies, or teammates the Student will be assigned.",
              ]}
            />
          </Section>
          <Section number="7.2" title="No Employment Guarantee — Explicit Acknowledgment">
            <WarningBox title="THE STUDENT EXPRESSLY ACKNOWLEDGES, UNDERSTANDS, AND AGREES THAT:">
              Claim Academy's internship placement guarantee is limited to securing an internship opportunity for the Student.
              The decision to offer full-time employment following the internship — or at any time — is made exclusively at the
              discretion of the employer. Claim Academy or Claim AI Internship makes no representation, warranty, or promise
              regarding full-time employment outcomes. Any oral or written statement by any Claim Academy representative
              suggesting or implying a guarantee of full-time employment shall not be binding on Claim AI Internship.
            </WarningBox>
          </Section>
        </Article>

        {/* ARTICLE 8 */}
        <Article number="8" title="General Terms and Conditions">
          <Section number="8.1" title="Conduct and Community Standards">
            <P>
              The Student agrees to conduct themselves professionally and respectfully at all times in all Program-related
              communications, including live sessions, Discord, Slack, email, and interactions with employer partners. Claim
              Academy reserves the right to dismiss any Student for: threatening or harassing behavior toward instructors,
              staff, peers, or employer representatives; sharing proprietary curriculum materials with non-enrolled
              individuals; fraudulent misrepresentation in assignments, portfolio work, or employer communications; or any
              conduct that, in Claim Academy's sole judgment, damages the reputation of the Program or its employer
              relationships.
            </P>
          </Section>
          <Section number="8.2" title="Intellectual Property">
            <P>
              All curriculum materials, recorded sessions, project frameworks, and tools provided by Claim Academy remain the
              intellectual property of Claim Academy and are licensed to the Student for personal educational use only. The
              Student's original project work and portfolio artifacts are owned by the Student. If the Student uses employer
              data, systems, or resources during the internship, ownership of work product is governed by the internship
              agreement with that employer.
            </P>
          </Section>
          <Section number="8.3" title="Privacy and Data Use">
            <P>
              Claim Academy collects, stores, and uses Student information as described in its Privacy Policy (available at
              claimaiinternship.com/privacy). By signing this Agreement, the Student consents to Claim Academy sharing their
              professional profile, portfolio links, attendance record, and performance metrics with potential employer
              partners for the purposes of internship placement. Claim Academy will not sell or share Student personal
              information with third parties for marketing purposes.
            </P>
          </Section>
          <Section number="8.4" title="Entire Agreement and Modifications">
            <P>
              This Agreement constitutes the entire agreement between the Parties with respect to the Student's enrollment in
              the Program and supersedes all prior representations, warranties, and understandings, whether written or oral.
              This Agreement may not be modified except by a written amendment signed by both Parties. Any promises made
              verbally by Claim Academy representatives that are not reflected in this Agreement are not binding on Claim
              Academy.
            </P>
          </Section>
          <Section number="8.5" title="Governing Law and Dispute Resolution">
            <P>
              This Agreement shall be governed by the laws of the State of Missouri, without regard to conflict of law
              principles. Any dispute arising from or relating to this Agreement shall first be submitted to non-binding
              mediation in St. Louis, Missouri, with costs split equally between the Parties. If mediation fails to resolve the
              dispute, the Parties agree to binding arbitration under the rules of the American Arbitration Association. Class
              action and jury trial rights are hereby waived.
            </P>
          </Section>
          <Section number="8.6" title="Severability">
            <P>
              If any provision of this Agreement is found to be unenforceable or invalid, that provision shall be modified to
              the minimum extent necessary to make it enforceable, and the remaining provisions of this Agreement shall remain
              in full force and effect.
            </P>
          </Section>
        </Article>

        {/* Closing block */}
        <div
          style={{
            marginTop: "56px",
            padding: "24px",
            background: "#120820",
            borderRadius: "12px",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: "16px", fontWeight: 700, color: "#fff", margin: "0 0 6px" }}>
            CLAIM ACADEMY AI INTERNSHIP PROGRAM
          </p>
          <p style={{ fontSize: "14px", fontStyle: "italic", color: GOLD, margin: "0 0 8px" }}>
            This document is legally binding. Please retain a copy for your records.
          </p>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", margin: 0 }}>
            Claim Academy, LLC · St. Louis, Missouri · claimaiinternship.com · info@claimaiinternship.com · Version 1.1 — June 2026
          </p>
        </div>

        <div style={{ marginTop: "40px", textAlign: "center" }}>
          <a
            href="/enrollment-agreement.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              backgroundColor: GOLD,
              color: "#1a1a1a",
              fontWeight: 700,
              fontSize: "15px",
              padding: "14px 28px",
              borderRadius: "8px",
              textDecoration: "none",
            }}
          >
            ↓ Download PDF
          </a>
        </div>
      </div>
    </main>
  );
}

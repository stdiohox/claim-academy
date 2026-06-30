import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { HeroStats } from "@/components/landing/HeroStats";
import { LogoBar } from "@/components/landing/LogoBar";
import { Problem } from "@/components/landing/Problem";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Tracks } from "@/components/landing/Tracks";
import { CareerOutcomes } from "@/components/landing/CareerOutcomes";
import { Testimonials } from "@/components/landing/Testimonials";
import { Pricing } from "@/components/landing/Pricing";
import { EmployerNetwork } from "@/components/landing/EmployerNetwork";
import { LeadForm } from "@/components/landing/LeadForm";
import { TrustBar } from "@/components/landing/TrustBar";
import { StickyCtaBar } from "@/components/landing/StickyCtaBar";
import { FAQ } from "@/components/landing/FAQ";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Claim Academy AI Internship — Guaranteed Employer Placement" },
      {
        name: "description",
        content:
          "12-week AI bootcamp with a guaranteed employer internship in writing. 4 weeks live training, 8 weeks placed at a vetted US company — or full refund.",
      },
      { property: "og:title", content: "Claim Academy AI Internship — Guaranteed Employer Placement" },
      {
        property: "og:description",
        content: "The only AI bootcamp in the US that guarantees a real employer internship — in writing.",
      },
    ],
    scripts: [
      {
        children: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','1407484639676240');fbq('track','PageView');`,
      },
    ],
    links: [
      { rel: 'preconnect', href: 'https://connect.facebook.net' },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-[var(--brand-dark)] text-white">
      <Nav />
      <Hero />
      <HeroStats />
      <LogoBar />
      <TrustBar />
      <Problem />
      <HowItWorks />
      <Tracks />
      <CareerOutcomes />
      <Testimonials />
      <TrustBar />
      <Pricing />
      <EmployerNetwork />
      <LeadForm />
      <div id="faq">
        <FAQ />
      </div>
      <Footer />
      <StickyCtaBar />
    </main>
  );
}

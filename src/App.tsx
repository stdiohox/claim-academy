import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { LogoBar } from "@/components/landing/LogoBar";
import { Problem } from "@/components/landing/Problem";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Tracks } from "@/components/landing/Tracks";
import { Testimonials } from "@/components/landing/Testimonials";
import { Pricing } from "@/components/landing/Pricing";
import { EmployerNetwork } from "@/components/landing/EmployerNetwork";
import { LeadForm } from "@/components/landing/LeadForm";
import { FAQ } from "@/components/landing/FAQ";
import { Footer } from "@/components/landing/Footer";

export default function App() {
  return (
    <main className="min-h-screen bg-[var(--brand-dark)] text-white">
      <Nav />
      <Hero />
      <LogoBar />
      <Problem />
      <HowItWorks />
      <Tracks />
      <Testimonials />
      <Pricing />
      <EmployerNetwork />
      <LeadForm />
      <div id="faq">
        <FAQ />
      </div>
      <Footer />
    </main>
  );
}

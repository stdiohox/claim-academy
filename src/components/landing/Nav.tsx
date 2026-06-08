import { useEffect, useState } from "react";
import { Logo } from "./Logo";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 inset-x-0 z-50 transition-all duration-[250ms]"
      style={{
        backgroundColor: scrolled ? "rgba(0,0,0,0.92)" : "#000000",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border-dark)" : "1px solid transparent",
      }}
    >
      <div className="container-x flex items-center justify-between h-16">
        <Logo />
        <div className="flex items-center gap-2 sm:gap-6">
          <a href="#how" className="hidden sm:inline relative text-white/80 hover:text-white text-sm font-medium group transition-colors">
            How It Works
            <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-white transition-all duration-200 group-hover:w-full" />
          </a>
          <a href="#pricing" className="hidden sm:inline relative text-white/80 hover:text-white text-sm font-medium group transition-colors">
            Pricing
            <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-white transition-all duration-200 group-hover:w-full" />
          </a>
          <a
            href="#lead-form"
            className="text-sm font-semibold px-5 py-2.5 rounded-md transition-all duration-150 hover:scale-[1.02] active:scale-100"
            style={{ backgroundColor: "#FFB71B", color: "#000000" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F7901B")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FFB71B")}
          >
            Book a Free Strategy Call
          </a>
        </div>
      </div>
    </nav>
  );
}

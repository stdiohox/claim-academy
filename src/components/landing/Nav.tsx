import { useEffect, useState } from "react";
import { Logo } from "./Logo";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
        <div className="scale-90 md:scale-100 origin-left">
          <Logo />
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          <a href="#how" className="relative text-white/80 hover:text-white text-sm font-medium group transition-colors">
            How It Works
            <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-white transition-all duration-200 group-hover:w-full" />
          </a>
          <a href="#pricing" className="relative text-white/80 hover:text-white text-sm font-medium group transition-colors">
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

        {/* Mobile right: CTA + hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href="#lead-form"
            className="text-xs font-semibold px-3 py-2 rounded-md transition-all duration-150"
            style={{ backgroundColor: "#FFB71B", color: "#000000" }}
          >
            Book a Call
          </a>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="p-2 text-white"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div
          className="md:hidden flex flex-col gap-1 px-4 pb-4"
          style={{ backgroundColor: "rgba(0,0,0,0.96)", borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <a
            href="#how"
            onClick={() => setMenuOpen(false)}
            className="py-3 text-white/80 hover:text-white text-sm font-medium border-b border-white/10 transition-colors"
          >
            How It Works
          </a>
          <a
            href="#pricing"
            onClick={() => setMenuOpen(false)}
            className="py-3 text-white/80 hover:text-white text-sm font-medium border-b border-white/10 transition-colors"
          >
            Pricing
          </a>
          <a
            href="#lead-form"
            onClick={() => setMenuOpen(false)}
            className="mt-2 text-sm font-semibold px-5 py-3 rounded-md text-center transition-all duration-150"
            style={{ backgroundColor: "#FFB71B", color: "#000000" }}
          >
            Book a Free Strategy Call
          </a>
        </div>
      )}
    </nav>
  );
}

import { useEffect, useRef, useState } from "react";

export function StickyCtaBar() {
  const [visible, setVisible] = useState(false);
  const heroRef = useRef<Element | null>(null);
  const formRef = useRef<Element | null>(null);
  const heroHidden = useRef(false);
  const formVisible = useRef(false);

  useEffect(() => {
    heroRef.current = document.querySelector("#top");
    formRef.current = document.querySelector("#lead-form");

    function update() {
      setVisible(heroHidden.current && !formVisible.current);
    }

    const heroObs = new IntersectionObserver(
      ([entry]) => {
        heroHidden.current = !entry.isIntersecting;
        update();
      },
      { threshold: 0 }
    );

    const formObs = new IntersectionObserver(
      ([entry]) => {
        formVisible.current = entry.isIntersecting;
        update();
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) heroObs.observe(heroRef.current);
    if (formRef.current) formObs.observe(formRef.current);

    return () => {
      heroObs.disconnect();
      formObs.disconnect();
    };
  }, []);

  return (
    <div
      aria-hidden={!visible}
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: "#602889",
        paddingTop: "12px",
        paddingBottom: "calc(12px + env(safe-area-inset-bottom, 0px))",
        paddingInline: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
        boxShadow: "0 -4px 24px rgba(0,0,0,0.30)",
        borderTop: "1px solid rgba(255,255,255,0.12)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(10px)",
        transition: "opacity 250ms ease-out, transform 250ms ease-out",
        pointerEvents: visible ? "auto" : "none",
      }}
      className="md:hidden"
    >
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: 600,
          fontSize: "13px",
          color: "rgba(255,255,255,0.80)",
          margin: 0,
          lineHeight: 1.3,
          flexShrink: 1,
          minWidth: 0,
        }}
      >
        Next cohort: <span style={{ color: "#FFB71B" }}>Jul 6</span> · Limited seats
      </p>
      <a
        href="#lead-form"
        style={{
          flexShrink: 0,
          backgroundColor: "#FFB71B",
          color: "#000000",
          fontFamily: "var(--font-body)",
          fontWeight: 700,
          fontSize: "14px",
          padding: "13px 20px",
          borderRadius: "6px",
          textDecoration: "none",
          whiteSpace: "nowrap",
          minHeight: "48px",
          display: "flex",
          alignItems: "center",
          transition: "background-color 150ms",
          lineHeight: 1,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F7901B")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FFB71B")}
      >
        Book a Free Call
      </a>
    </div>
  );
}

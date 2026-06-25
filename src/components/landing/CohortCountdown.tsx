import { useEffect, useState } from "react";
import { COHORT_START, COHORT_CAPACITY, COHORT_NAME } from "@/lib/cohort";

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number } | null;

function getTimeLeft(): TimeLeft {
  const diff = new Date(COHORT_START).getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000)  / 60000),
    seconds: Math.floor((diff % 60000)    / 1000),
  };
}

export function CohortCountdown({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const isDark      = variant === "dark";
  const labelColor  = isDark ? "rgba(255,255,255,0.45)" : "#AAAAAA";
  const numColor    = isDark ? "#FFFFFF"                : "#111111";
  const unitColor   = isDark ? "rgba(255,255,255,0.40)" : "#AAAAAA";
  const seatColor   = isDark ? "rgba(255,255,255,0.55)" : "#888888";
  const dotColor    = "#FFB71B";

  if (!timeLeft) {
    return (
      <div style={{ marginTop: "20px" }}>
        <p style={{
          fontFamily: "var(--font-body)",
          fontSize: "13px",
          color: seatColor,
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: dotColor, display: "inline-block", flexShrink: 0 }} />
          Next cohort enrolling now — limited seats
        </p>
      </div>
    );
  }

  const units = [
    { value: timeLeft.days,    label: "days" },
    { value: timeLeft.hours,   label: "hrs" },
    { value: timeLeft.minutes, label: "min" },
    { value: timeLeft.seconds, label: "sec" },
  ];

  return (
    <div style={{ marginTop: "20px" }}>
      <p style={{
        fontFamily: "var(--font-body)",
        fontWeight: 600,
        fontSize: "10px",
        color: labelColor,
        textTransform: "uppercase",
        letterSpacing: "0.14em",
        marginBottom: "10px",
      }}>
        {COHORT_NAME} starts in:
      </p>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "4px" }}>
        {units.map((u, i) => (
          <div key={u.label} style={{ display: "flex", alignItems: "flex-end", gap: "4px" }}>
            <div style={{ textAlign: "center" }}>
              <span style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "28px",
                lineHeight: 1,
                color: numColor,
                letterSpacing: "-0.03em",
                display: "block",
                minWidth: "2ch",
              }}>
                {String(u.value).padStart(2, "0")}
              </span>
              <span style={{
                fontFamily: "var(--font-body)",
                fontSize: "10px",
                color: unitColor,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}>
                {u.label}
              </span>
            </div>
            {i < units.length - 1 && (
              <span style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "22px",
                color: dotColor,
                lineHeight: 1,
                paddingBottom: "14px",
                userSelect: "none",
              }}>:</span>
            )}
          </div>
        ))}
      </div>
      <p style={{
        fontFamily: "var(--font-body)",
        fontSize: "12px",
        color: seatColor,
        marginTop: "10px",
        display: "flex",
        alignItems: "center",
        gap: "6px",
      }}>
        <span style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: dotColor, display: "inline-block", flexShrink: 0 }} />
        Limited to {COHORT_CAPACITY} seats · {COHORT_NAME}
      </p>
    </div>
  );
}

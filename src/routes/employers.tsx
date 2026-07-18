import { createFileRoute } from "@tanstack/react-router";
import Employers from "@/pages/Employers";

export const Route = createFileRoute("/employers")({
  head: () => ({
    meta: [
      { title: "For Employers — Claim Academy AI Internship" },
      {
        name: "description",
        content:
          "Hire project-ready AI builders through Claim Academy. Host a free 8-week working trial (part of our 12-week program: 4 weeks training + 8 weeks guaranteed internship) — no agency fees, no obligation to hire.",
      },
    ],
  }),
  component: Employers,
});

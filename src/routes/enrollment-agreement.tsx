import { createFileRoute } from "@tanstack/react-router";
import EnrollmentAgreement from "@/pages/EnrollmentAgreement";

export const Route = createFileRoute("/enrollment-agreement")({
  head: () => ({
    meta: [
      { title: "Student Enrollment Agreement — Claim Academy AI Internship" },
      {
        name: "description",
        content:
          "Claim Academy AI Internship Program Student Enrollment Agreement (Version 1.1, effective June 1, 2026).",
      },
    ],
  }),
  component: EnrollmentAgreement,
});

import type { Metadata } from "next";
import { CertificationsIndex } from "@/components/certs/CertificationsIndex";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Certification Roadmap",
  description:
    "Unlockable badges: APP, PSP, CPP, PMP, RCDD, and vendor certifications for physical security engineers.",
};

export default function CertificationsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <SectionHeading kicker="Achievements" title="Certification Roadmap">
        The badge progression for this profession. The ASIS track (APP → PSP →
        CPP) is the spine; PMP, RCDD, and vendor certs are situational
        unlocks depending on your path. Requirements below were checked against
        the cited sources in July 2026 — always verify the current handbook
        before applying.
      </SectionHeading>

      <CertificationsIndex />
    </div>
  );
}

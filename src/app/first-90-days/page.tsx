import type { Metadata } from "next";
import { QuestRoadmap } from "@/components/quests/QuestRoadmap";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "My First 90 Days",
  description:
    "The onboarding questline: first week, 30, 60, 90 days, and first year as a Jr Physical Security Engineer.",
};

export default function First90DaysPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <SectionHeading kicker="The Opening Questline" title="My First 90 Days">
        A concrete roadmap from day one to year one. Main quests are the
        must-dos; side quests are where you pull ahead. Check them off — your
        progress saves in this browser.
      </SectionHeading>
      <QuestRoadmap />
    </div>
  );
}

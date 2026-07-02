import type { Metadata } from "next";
import { codexEntries } from "@/data/codex";
import type { CodexCategory } from "@/data/types";
import { SkillCodexCard } from "@/components/codex/SkillCodexCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Tools & Skills Codex",
  description:
    "The equipment and domain-knowledge compendium: Bluebeam, Revit, Division 28, access control, PoE, and more.",
};

const categories: CodexCategory[] = [
  "Design Software",
  "Documents & Standards",
  "Security Systems",
  "Infrastructure",
];

export default function CodexPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <SectionHeading kicker="The Compendium" title="Tools & Skills Codex">
        Every tool, system, and domain concept a new physical security engineer
        meets — each translated into software-engineering terms, because that&apos;s
        the language you already speak.
      </SectionHeading>

      {categories.map((category) => {
        const entries = codexEntries.filter((e) => e.category === category);
        return (
          <section key={category} className="mb-14">
            <Reveal>
              <h2 className="rune mb-5 flex items-center gap-3 text-brass">
                <span className="gold-rule w-8" />
                {category}
                <span className="font-mono text-muted">({entries.length})</span>
              </h2>
            </Reveal>
            <div className="grid gap-4 lg:grid-cols-2">
              {entries.map((entry, i) => (
                <Reveal key={entry.id} delay={0.04 * (i % 2)}>
                  <SkillCodexCard entry={entry} />
                </Reveal>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { careerPaths } from "@/data/paths";
import { nodeById } from "@/data/careerNodes";
import { pathColor } from "@/lib/pathColors";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Career Paths",
  description: "The seven career paths branching from Jr Physical Security Engineer.",
};

export default function PathsIndexPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <SectionHeading kicker="Field Notes" title="The Seven Paths">
        Each path is a direction of growth, not a contract. Most careers borrow
        from two or three — the atlas just makes the options visible.
      </SectionHeading>

      <div className="space-y-4">
        {careerPaths.map((path, i) => {
          const color = pathColor(path.id);
          const ladder = path.ladder
            .map((id) => nodeById.get(id)?.title)
            .filter(Boolean);
          return (
            <Reveal key={path.id} delay={0.04 * i}>
              <Link
                href={`/paths/${path.slug}`}
                className="card group block p-6"
                style={{ borderLeftColor: color, borderLeftWidth: 3 }}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="font-display text-2xl text-parchment">
                    <span className="mr-3 font-mono text-sm" style={{ color }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {path.name}
                  </h2>
                  <span className="rune text-muted transition-colors group-hover:text-brass">
                    Full field notes →
                  </span>
                </div>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-parchment-dim">
                  {path.tagline}
                </p>
                <p className="mt-4 font-mono text-xs leading-relaxed text-muted">
                  {ladder.join("  →  ")}
                </p>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}

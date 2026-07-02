import type { Tier } from "@/data/types";
import { tierLabels } from "@/lib/pathColors";

const tierGlyphs: Record<Tier, string> = {
  base: "I",
  advanced: "II",
  specialist: "III",
  leadership: "IV",
};

export function TierBadge({ tier, color }: { tier: Tier; color?: string }) {
  return (
    <span
      className="rune inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1"
      style={{
        borderColor: color ?? "var(--line-strong)",
        color: color ?? "var(--brass)",
      }}
    >
      <span className="font-mono">{tierGlyphs[tier]}</span>
      {tierLabels[tier]}
    </span>
  );
}

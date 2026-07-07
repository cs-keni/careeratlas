"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import type { CareerNode } from "@/data/types";
import { certById } from "@/data/certifications";
import { pathById } from "@/data/paths";
import { pathColor } from "@/lib/pathColors";
import { TierBadge } from "@/components/ui/TierBadge";
import { EstimateTag, formatSalary } from "@/components/ui/EstimateTag";

/** Free-form cert ids used in node data that aren't full Certification entries. */
const looseCertLabels: Record<string, string> = {
  "capm-or-pmp": "CAPM → PMP",
  "gicsp-or-similar": "GICSP or similar OT-security cert",
};

function certLabel(id: string): string {
  return certById.get(id)?.name ?? looseCertLabels[id] ?? id;
}

/** How long the copy button shows its ✓ before reverting. */
const COPY_RESET_MS = 1200;

function Section({ title, items, color }: { title: string; items?: string[]; color: string }) {
  if (!items?.length) return null;
  return (
    <div>
      <p className="rune mb-2" style={{ color }}>{title}</p>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm leading-relaxed text-parchment-dim">
            <span className="mt-0.5 shrink-0 font-mono text-xs" style={{ color }}>▸</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CareerNodeCard({
  role,
  onClose,
  onSelectRole,
  allTitles,
}: {
  role: CareerNode;
  onClose: () => void;
  onSelectRole: (id: string) => void;
  allTitles: Map<string, string>;
}) {
  const color = pathColor(role.path);
  const path = role.path !== "shared" ? pathById.get(role.path) : undefined;

  // Copy-link micro-state: icon flips to a checkmark, reverts after COPY_RESET_MS.
  // The aside is keyed by role.id, so switching nodes resets this naturally.
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), COPY_RESET_MS);
    return () => clearTimeout(timer);
  }, [copied]);

  const copyLink = async () => {
    const url = new URL(window.location.href);
    url.searchParams.set("node", role.id);
    try {
      await navigator.clipboard.writeText(url.toString());
      setCopied(true);
    } catch {
      // clipboard unavailable (permissions, http) — leave the icon as-is
    }
  };

  // Escape closes the panel from anywhere — React Flow only handles Escape
  // while a node has focus, and a deep-linked panel has no focused node.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <motion.aside
      key={role.id}
      initial={{ x: 40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 40, opacity: 0 }}
      transition={{ type: "spring", stiffness: 320, damping: 32 }}
      className="atlas-scroll absolute inset-y-0 right-0 z-10 w-full overflow-y-auto border-l border-[var(--line)] bg-ink-950/95 backdrop-blur-lg sm:w-[26rem]"
    >
      <div className="corner-ticks m-4 rounded-lg border border-[var(--line)] bg-ink-900/60 p-5">
        <div className="flex items-start justify-between gap-3">
          <TierBadge tier={role.tier} color={color} />
          <div className="flex items-center gap-2">
            <button
              onClick={copyLink}
              aria-label="Copy node link"
              title="Copy node link"
              className="focus-brass grid h-8 w-8 place-items-center rounded border border-[var(--line)] font-mono transition-colors hover:border-[var(--line-strong)]"
              style={{ color: copied ? "var(--brass-bright)" : "var(--muted)" }}
            >
              {copied ? "✓" : "⧉"}
            </button>
            <button
              onClick={onClose}
              aria-label="Close details"
              className="focus-brass grid h-8 w-8 place-items-center rounded border border-[var(--line)] font-mono text-muted transition-colors hover:border-[var(--line-strong)] hover:text-parchment"
            >
              ×
            </button>
          </div>
        </div>
        <span aria-live="polite" className="sr-only">
          {copied ? "Link copied" : ""}
        </span>

        <h2 className="mt-3 font-display text-2xl leading-tight text-parchment">{role.title}</h2>
        {path && (
          <Link href={`/paths/${path.slug}`} className="rune mt-1 inline-block hover:underline" style={{ color }}>
            {path.name} Path →
          </Link>
        )}
        <p className="mt-3 text-sm leading-relaxed text-parchment-dim">{role.description}</p>

        {/* Stat block */}
        <div className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-[var(--line)] bg-[var(--line)]">
          <div className="bg-ink-900 p-3">
            <p className="rune text-muted">Experience</p>
            <p className="mt-1 font-mono text-sm text-parchment">
              {role.yearsExperience} <EstimateTag />
            </p>
          </div>
          <div className="bg-ink-900 p-3">
            <p className="rune text-muted">Salary Range</p>
            <p className="mt-1 font-mono text-sm text-parchment">
              {role.salaryEstimate ? (
                <>
                  {formatSalary(role.salaryEstimate.min, role.salaryEstimate.max)} <EstimateTag />
                </>
              ) : (
                "varies"
              )}
            </p>
          </div>
        </div>
        {role.salaryEstimate?.note && (
          <p className="mt-1.5 text-xs text-muted">{role.salaryEstimate.note}</p>
        )}

        <div className="mt-5 space-y-5">
          <Section title="⬦ Unlock Requirements" items={role.unlockRequirements} color={color} />
          <Section title="⬦ Key Responsibilities" items={role.responsibilities} color={color} />
          <Section title="⬦ Required Skills" items={role.requiredSkills} color={color} />
          <Section title="⬦ Recommended Skills" items={role.recommendedSkills} color={color} />
          <Section title="⬦ Recommended Quests" items={role.quests} color={color} />
          <Section title="⬦ Your CS Background Helps" items={role.csBackgroundAdvantages} color={color} />
          <Section title="⬦ Risks & Tradeoffs" items={role.risks} color={color} />

          {role.tools.length > 0 && (
            <div>
              <p className="rune mb-2" style={{ color }}>⬦ Tools / Equipment</p>
              <div className="flex flex-wrap gap-1.5">
                {role.tools.map((tool) => (
                  <span key={tool} className="rounded bg-ink-800 px-2 py-1 font-mono text-xs text-parchment-dim">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}

          {role.certifications.length > 0 && (
            <div>
              <p className="rune mb-2" style={{ color }}>⬦ Certifications</p>
              <div className="flex flex-wrap gap-1.5">
                {role.certifications.map((id) => (
                  <Link
                    key={id}
                    href="/certifications"
                    className="rounded border border-[var(--line-strong)] px-2 py-1 font-mono text-xs text-brass transition-colors hover:bg-ink-800"
                  >
                    {certById.get(id)?.badge ?? "◈"} {certLabel(id)}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {role.nextRoles.length > 0 && (
            <div>
              <p className="rune mb-2" style={{ color }}>⬦ Evolves Into</p>
              <div className="flex flex-col gap-1.5">
                {role.nextRoles.map((id) => (
                  <button
                    key={id}
                    onClick={() => onSelectRole(id)}
                    className="group flex items-center justify-between rounded border border-[var(--line)] px-3 py-2 text-left text-sm text-parchment-dim transition-all hover:border-[var(--line-strong)] hover:text-parchment"
                  >
                    {allTitles.get(id) ?? id}
                    <span className="font-mono text-brass transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.aside>
  );
}

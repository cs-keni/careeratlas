"use client";

import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import type { CareerNode } from "@/data/types";
import { pathColor, tierLabels } from "@/lib/pathColors";

export type RoleFlowNode = Node<{ role: CareerNode; dimmed: boolean }, "role">;

const tierGlyphs = { base: "I", advanced: "II", specialist: "III", leadership: "IV" } as const;

export function CareerRoleNode({ data, selected }: NodeProps<RoleFlowNode>) {
  const { role, dimmed } = data;
  const color = pathColor(role.path);
  const isBase = role.tier === "base";

  return (
    <div
      className="w-60 cursor-pointer rounded-lg border px-4 py-3 transition-all duration-300"
      style={{
        background: selected
          ? "linear-gradient(160deg, var(--ink-800), var(--ink-850))"
          : "linear-gradient(160deg, var(--ink-900), var(--ink-850))",
        borderColor: selected ? color : dimmed ? "var(--line)" : "var(--line-strong)",
        boxShadow: selected
          ? `0 0 0 1px ${color}, 0 0 28px -4px ${color}`
          : isBase
            ? "0 0 24px -6px var(--brass-glow)"
            : "0 4px 16px rgba(0,0,0,0.35)",
        opacity: dimmed ? 0.28 : 1,
      }}
    >
      <Handle type="target" position={Position.Top} className="!h-1.5 !w-1.5 !border-0" style={{ background: color }} />
      <div className="rune mb-1.5 flex items-center gap-2" style={{ color }}>
        <span className="font-mono">{tierGlyphs[role.tier]}</span>
        <span>{role.category ?? tierLabels[role.tier]}</span>
      </div>
      <p className="font-display text-[0.95rem] leading-snug text-parchment">{role.title}</p>
      <p className="mt-1.5 font-mono text-[0.65rem] text-muted">{role.yearsExperience} · est.</p>
      <Handle type="source" position={Position.Bottom} className="!h-1.5 !w-1.5 !border-0" style={{ background: color }} />
    </div>
  );
}

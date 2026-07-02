import type { Metadata } from "next";
import { CareerTree } from "@/components/tree/CareerTree";

export const metadata: Metadata = {
  title: "Career Skill Tree",
  description:
    "The interactive career skill tree for physical security engineering — explore every branch from Jr Physical Security Engineer.",
};

export default function TreePage() {
  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col">
      <div className="border-b border-[var(--line)] px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-baseline justify-between gap-2">
          <h1 className="font-display text-xl text-parchment">
            Career Skill Tree
          </h1>
          <p className="rune text-muted">
            Click a node for details · filter by path · multiclassing encouraged
          </p>
        </div>
      </div>
      <div className="min-h-0 flex-1">
        <CareerTree />
      </div>
    </div>
  );
}

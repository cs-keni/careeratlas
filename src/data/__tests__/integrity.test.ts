/**
 * Content-graph validation. All site content is hand-edited TypeScript data;
 * this suite is the safety net that keeps a typo'd node id or a copy-pasted
 * position from shipping as a broken tree.
 */
import { describe, expect, it } from "vitest";
import { careerNodes, nodeById } from "@/data/careerNodes";
import { careerPaths } from "@/data/paths";
import { certifications } from "@/data/certifications";
import { questPhases } from "@/data/quests";

describe("career node graph", () => {
  it("has globally unique node ids", () => {
    const seen = new Set<string>();
    const dupes = careerNodes.filter((n) => (seen.has(n.id) ? true : (seen.add(n.id), false)));
    expect(dupes.map((n) => n.id)).toEqual([]);
  });

  it("only references nextRoles that exist", () => {
    const broken = careerNodes.flatMap((n) =>
      n.nextRoles.filter((t) => !nodeById.has(t)).map((t) => `${n.id} → ${t}`),
    );
    expect(broken).toEqual([]);
  });

  it("has no cycles (career progression is a DAG)", () => {
    const visiting = new Set<string>();
    const done = new Set<string>();
    const walk = (id: string, trail: string[]): string[] | null => {
      if (done.has(id)) return null;
      if (visiting.has(id)) return [...trail, id];
      visiting.add(id);
      for (const next of nodeById.get(id)?.nextRoles ?? []) {
        const cycle = walk(next, [...trail, id]);
        if (cycle) return cycle;
      }
      visiting.delete(id);
      done.add(id);
      return null;
    };
    for (const node of careerNodes) {
      const cycle = walk(node.id, []);
      expect(cycle, cycle ? `cycle: ${cycle.join(" → ")}` : undefined).toBeNull();
    }
  });

  it("has no two nodes at the same canvas position", () => {
    const seen = new Map<string, string>();
    const collisions: string[] = [];
    for (const n of careerNodes) {
      const key = `${n.position.x},${n.position.y}`;
      const other = seen.get(key);
      if (other) collisions.push(`${other} and ${n.id} share ${key}`);
      seen.set(key, n.id);
    }
    expect(collisions).toEqual([]);
  });
});

describe("career paths", () => {
  it("ladders reference real nodes", () => {
    const broken = careerPaths.flatMap((p) =>
      p.ladder.filter((id) => !nodeById.has(id)).map((id) => `${p.id}: ${id}`),
    );
    expect(broken).toEqual([]);
  });

  it("path ids are unique", () => {
    expect(new Set(careerPaths.map((p) => p.id)).size).toBe(careerPaths.length);
  });
});

describe("certifications", () => {
  it("cert ids are unique", () => {
    expect(new Set(certifications.map((c) => c.id)).size).toBe(certifications.length);
  });

  it("every certification cites at least one source", () => {
    const missing = certifications.filter((c) => !c.sources?.length).map((c) => c.id);
    expect(missing).toEqual([]);
  });

  it("verified requirements always carry sources", () => {
    const unsupported = certifications
      .filter((c) => c.requirementsVerified && !c.sources?.length)
      .map((c) => c.id);
    expect(unsupported).toEqual([]);
  });
});

describe("quests", () => {
  it("quest ids are globally unique (they are storage identity)", () => {
    const all = questPhases.flatMap((p) => p.quests.map((q) => q.id));
    expect(new Set(all).size).toBe(all.length);
  });

  it("phase ids are unique", () => {
    expect(new Set(questPhases.map((p) => p.id)).size).toBe(questPhases.length);
  });
});

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { questPhases } from "@/data/quests";

const STORAGE_KEY = "careeratlas-quest-progress";

function questKey(phaseId: string, title: string) {
  return `${phaseId}::${title}`;
}

export function QuestRoadmap() {
  const [done, setDone] = useState<Set<string>>(new Set());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setDone(new Set(JSON.parse(raw) as string[]));
    } catch {
      // corrupted storage — start fresh
    }
    setHydrated(true);
  }, []);

  const toggle = (key: string) => {
    setDone((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      return next;
    });
  };

  const totalQuests = questPhases.reduce((n, p) => n + p.quests.length, 0);
  const completed = done.size;

  return (
    <div>
      {/* Overall progress — XP bar */}
      <div className="card mb-10 p-5">
        <div className="flex items-baseline justify-between">
          <p className="rune text-brass">Questline Progress</p>
          <p className="font-mono text-sm text-parchment">
            {hydrated ? completed : 0} / {totalQuests} complete
          </p>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-ink-800">
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, var(--brass), var(--brass-bright))" }}
            initial={{ width: 0 }}
            animate={{ width: hydrated ? `${(completed / totalQuests) * 100}%` : 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
          />
        </div>
        <p className="mt-2 text-xs text-muted">
          Progress is saved in your browser. Check quests off as you complete them.
        </p>
      </div>

      {/* Phase timeline */}
      <ol className="relative space-y-10 border-l border-[var(--line-strong)] pl-6 sm:pl-8">
        {questPhases.map((phase, phaseIndex) => {
          const phaseDone = phase.quests.filter((q) => done.has(questKey(phase.id, q.title))).length;
          const allDone = phaseDone === phase.quests.length;
          return (
            <motion.li
              key={phase.id}
              className="relative"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.05 * phaseIndex, ease: [0.22, 1, 0.36, 1] }}
            >
              <span
                className="absolute -left-[2.05rem] top-1 grid h-6 w-6 place-items-center rounded-full border font-mono text-[0.6rem] sm:-left-[2.55rem]"
                style={{
                  borderColor: allDone ? "var(--brass)" : "var(--line-strong)",
                  background: allDone ? "var(--brass)" : "var(--ink-950)",
                  color: allDone ? "var(--ink-950)" : "var(--brass)",
                }}
              >
                {allDone ? "✓" : phaseIndex + 1}
              </span>

              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h2 className="font-display text-2xl text-parchment">{phase.label}</h2>
                <span className="rune text-muted">{phase.timeframe}</span>
                <span className="rune ml-auto text-brass">{phase.theme}</span>
              </div>

              <ul className="mt-4 space-y-2">
                {phase.quests.map((quest) => {
                  const key = questKey(phase.id, quest.title);
                  const isDone = done.has(key);
                  return (
                    <li key={key}>
                      <button
                        onClick={() => toggle(key)}
                        className={`card flex w-full items-start gap-3 p-4 text-left transition-opacity ${
                          isDone ? "opacity-55" : ""
                        }`}
                      >
                        <span
                          className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded border font-mono text-xs transition-all duration-200"
                          style={{
                            borderColor: isDone ? "var(--brass)" : "var(--line-strong)",
                            background: isDone ? "var(--brass)" : "transparent",
                            color: "var(--ink-950)",
                          }}
                        >
                          {isDone && "✓"}
                        </span>
                        <span className="min-w-0">
                          <span className="flex flex-wrap items-center gap-2">
                            <span
                              className={`font-medium ${
                                isDone ? "text-muted line-through" : "text-parchment"
                              }`}
                            >
                              {quest.title}
                            </span>
                            <span
                              className="rune rounded-full border px-1.5 py-0.5 text-[0.55rem]"
                              style={{
                                borderColor: quest.type === "main" ? "var(--brass)" : "var(--line-strong)",
                                color: quest.type === "main" ? "var(--brass)" : "var(--muted)",
                              }}
                            >
                              {quest.type === "main" ? "Main Quest" : "Side Quest"}
                            </span>
                          </span>
                          <span className="mt-1 block text-sm leading-relaxed text-parchment-dim">
                            {quest.detail}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}

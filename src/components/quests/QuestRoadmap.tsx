"use client";

import { motion } from "framer-motion";
import {
  LEGACY_QUEST_PROGRESS_KEY,
  migrateLegacyQuestProgress,
  questPhases,
} from "@/data/quests";
import { QUEST_PROGRESS_KEY, useStoredSet } from "@/lib/storage";

export function QuestRoadmap() {
  const { values: done, toggle, hydrated } = useStoredSet(QUEST_PROGRESS_KEY, {
    migrateLegacy: { key: LEGACY_QUEST_PROGRESS_KEY, transform: migrateLegacyQuestProgress },
  });

  const totalQuests = questPhases.reduce((n, p) => n + p.quests.length, 0);
  // Count only stored ids that still exist in the current questline — a raw
  // `done.size` would count stale ids (content edits, legacy migration) and can
  // read past 100%. Mirrors the per-phase filter below and the cert counter.
  const completed = questPhases.reduce(
    (n, p) => n + p.quests.filter((q) => done.has(q.id)).length,
    0,
  );

  return (
    <div>
      {/* Overall progress — XP bar */}
      <div className="card mb-10 p-5">
        <div className="flex items-baseline justify-between">
          <p className="rune text-brass">Questline Progress</p>
          <p className="font-mono text-sm text-parchment">
            {hydrated ? completed : 0} / {totalQuests} charted
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
          Progress is saved in your browser. Chart quests as you finish them.
        </p>
      </div>

      {/* Phase timeline */}
      <ol className="relative space-y-10 border-l border-[var(--line-strong)] pl-6 sm:pl-8">
        {questPhases.map((phase, phaseIndex) => {
          const phaseDone = phase.quests.filter((q) => done.has(q.id)).length;
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
                  const isDone = done.has(quest.id);
                  return (
                    <li key={quest.id}>
                      <button
                        onClick={() => toggle(quest.id)}
                        aria-pressed={isDone}
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

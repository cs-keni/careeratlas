"use client";

/**
 * Shared localStorage persistence for tracked progress (quests, certs, routes).
 *
 * Conventions:
 * - Every key is versioned under `careeratlas:v1:` so a future format change
 *   is a new namespace + migration, never a silent reinterpretation.
 * - Hooks hydrate in an effect (never during render) so server HTML and the
 *   first client paint always match; read `hydrated` before animating state in.
 * - localStorage writes happen in effects, outside setState updaters, and are
 *   wrapped in try/catch — quota errors or disabled storage degrade to
 *   in-memory state instead of crashing the page.
 * - Only user mutations persist. Hydrated state is never written back, so
 *   corrupt-but-recoverable stored data survives a plain page load, and the
 *   legacy migration deletes its source key only after a confirmed v1 write.
 */

import { useEffect, useRef, useState } from "react";

const PREFIX = "careeratlas:v1:";

export function storageKey(name: string): string {
  return `${PREFIX}${name}`;
}

export const QUEST_PROGRESS_KEY = storageKey("quest-progress");
export const CERT_PROGRESS_KEY = storageKey("cert-progress");

/** Absent, invalid (unparseable / storage unavailable), and readable values
 * are distinct states: migration must run only when the v1 key is truly
 * absent, never over data that exists but can't be read right now. */
type ReadResult =
  | { status: "absent" }
  | { status: "invalid" }
  | { status: "ok"; value: unknown };

function readRaw(key: string): ReadResult {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return { status: "absent" };
    return { status: "ok", value: JSON.parse(raw) as unknown };
  } catch {
    return { status: "invalid" };
  }
}

/** Returns false on quota/disabled storage so callers can avoid destructive
 * follow-ups (e.g. deleting a legacy key whose replacement never landed). */
function write(key: string, value: unknown): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false; // quota exceeded / storage disabled — keep working in memory
  }
}

function remove(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
    // ignore
  }
}

export interface LegacyMigration {
  /** The pre-v1 key to migrate from, removed after a successful migration. */
  key: string;
  /** Maps the legacy parsed value to v1 entries; return null to discard. */
  transform: (legacy: unknown) => string[] | null;
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((v) => typeof v === "string");
}

/**
 * A persisted Set<string> — quest checkmarks and friends.
 * Membership toggles; the whole set round-trips as a JSON array.
 */
export function useStoredSet(
  key: string,
  options?: { migrateLegacy?: LegacyMigration },
): { values: Set<string>; toggle: (id: string) => void; hydrated: boolean } {
  const [values, setValues] = useState<Set<string>>(new Set());
  const [hydrated, setHydrated] = useState(false);
  const migrationRef = useRef(options?.migrateLegacy);
  const dirtyRef = useRef(false);

  useEffect(() => {
    const stored = readRaw(key);
    let initial: string[] | null =
      stored.status === "ok" && isStringArray(stored.value) ? stored.value : null;
    // Migrate only when the v1 key is truly absent — corrupt or wrong-shape
    // v1 data must not be silently replaced by a stale legacy snapshot.
    if (initial === null && stored.status === "absent" && migrationRef.current) {
      const { key: legacyKey, transform } = migrationRef.current;
      const legacy = readRaw(legacyKey);
      if (legacy.status === "ok") {
        initial = transform(legacy.value);
        // Delete the legacy copy only once its replacement is confirmed on
        // disk — if the v1 write fails, migration retries next load instead
        // of destroying the only persisted copy.
        if (initial === null || write(key, initial)) remove(legacyKey);
      } else if (legacy.status === "invalid") {
        remove(legacyKey); // unreadable legacy data — nothing to preserve
      }
    }
    // One-time hydration from localStorage — a state initializer would run
    // during SSR, where storage doesn't exist, and desync server/client HTML.
    if (initial) setValues(new Set(initial));
    setHydrated(true);
  }, [key]);

  useEffect(() => {
    // Persist only user changes — writing merely-hydrated state back would
    // overwrite corrupt-but-recoverable stored data on a plain page load.
    if (hydrated && dirtyRef.current) write(key, [...values]);
  }, [key, values, hydrated]);

  const toggle = (id: string) => {
    // A click landing before hydration would act on the empty initial state
    // and could later persist that emptiness over stored progress.
    if (!hydrated) return;
    dirtyRef.current = true;
    setValues((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return { values, toggle, hydrated };
}

/**
 * A persisted Record<string, V> for keyed states — e.g. cert progress maps
 * of `{ certId: "planned" | "in-progress" | "earned" }`.
 */
export function useStoredMap<V extends string>(
  key: string,
  isValue: (v: unknown) => v is V,
): {
  map: Record<string, V>;
  set: (id: string, value: V | null) => void;
  hydrated: boolean;
} {
  const [map, setMap] = useState<Record<string, V>>({});
  const [hydrated, setHydrated] = useState(false);
  const isValueRef = useRef(isValue);
  const dirtyRef = useRef(false);

  useEffect(() => {
    let initial: Record<string, V> | null = null;
    const stored = readRaw(key);
    // Arrays are objects too — without this guard a stored JSON array would
    // hydrate as numeric-keyed ghost entries.
    if (
      stored.status === "ok" &&
      stored.value !== null &&
      typeof stored.value === "object" &&
      !Array.isArray(stored.value)
    ) {
      initial = {};
      for (const [k, v] of Object.entries(stored.value as Record<string, unknown>)) {
        if (isValueRef.current(v)) initial[k] = v;
      }
    }
    /* eslint-disable react-hooks/set-state-in-effect -- one-time hydration
       from localStorage; see useStoredSet above */
    if (initial) setMap(initial);
    setHydrated(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [key]);

  useEffect(() => {
    // Persist only user changes — see useStoredSet above.
    if (hydrated && dirtyRef.current) write(key, map);
  }, [key, map, hydrated]);

  const set = (id: string, value: V | null) => {
    if (!hydrated) return;
    dirtyRef.current = true;
    setMap((prev) => {
      const next = { ...prev };
      if (value === null) delete next[id];
      else next[id] = value;
      return next;
    });
  };

  return { map, set, hydrated };
}

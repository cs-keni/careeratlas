import { describe, expect, it, vi } from "vitest";
import { act, renderHook, waitFor } from "@testing-library/react";
import { storageKey, useStoredMap, useStoredSet } from "@/lib/storage";

const KEY = storageKey("test-set");

describe("useStoredSet", () => {
  it("hydrates from an existing v1 key", async () => {
    localStorage.setItem(KEY, JSON.stringify(["a", "b"]));
    const { result } = renderHook(() => useStoredSet(KEY));
    await waitFor(() => expect(result.current.hydrated).toBe(true));
    expect(result.current.values).toEqual(new Set(["a", "b"]));
  });

  it("starts fresh on corrupted JSON without crashing", async () => {
    localStorage.setItem(KEY, "{not json![");
    const { result } = renderHook(() => useStoredSet(KEY));
    await waitFor(() => expect(result.current.hydrated).toBe(true));
    expect(result.current.values.size).toBe(0);
  });

  it("starts fresh on a wrong-shape value", async () => {
    localStorage.setItem(KEY, JSON.stringify({ nope: true }));
    const { result } = renderHook(() => useStoredSet(KEY));
    await waitFor(() => expect(result.current.hydrated).toBe(true));
    expect(result.current.values.size).toBe(0);
  });

  it("toggle adds, persists, and removes", async () => {
    const { result } = renderHook(() => useStoredSet(KEY));
    await waitFor(() => expect(result.current.hydrated).toBe(true));

    act(() => result.current.toggle("x"));
    expect(result.current.values.has("x")).toBe(true);
    await waitFor(() =>
      expect(JSON.parse(localStorage.getItem(KEY)!)).toEqual(["x"]),
    );

    act(() => result.current.toggle("x"));
    expect(result.current.values.has("x")).toBe(false);
    await waitFor(() =>
      expect(JSON.parse(localStorage.getItem(KEY)!)).toEqual([]),
    );
  });

  it("migrates a legacy key once, then removes it", async () => {
    localStorage.setItem("old-key", JSON.stringify(["legacy::One", "legacy::Two"]));
    const transform = (legacy: unknown) =>
      Array.isArray(legacy)
        ? legacy.filter((v): v is string => typeof v === "string").map((v) => v.replace("legacy::", ""))
        : null;

    const { result } = renderHook(() =>
      useStoredSet(KEY, { migrateLegacy: { key: "old-key", transform } }),
    );
    await waitFor(() => expect(result.current.hydrated).toBe(true));

    expect(result.current.values).toEqual(new Set(["One", "Two"]));
    expect(localStorage.getItem("old-key")).toBeNull();
    expect(JSON.parse(localStorage.getItem(KEY)!)).toEqual(["One", "Two"]);
  });

  it("does not migrate when a v1 key already exists", async () => {
    localStorage.setItem(KEY, JSON.stringify(["current"]));
    localStorage.setItem("old-key", JSON.stringify(["stale"]));
    const transform = vi.fn(() => ["stale"]);

    const { result } = renderHook(() =>
      useStoredSet(KEY, { migrateLegacy: { key: "old-key", transform } }),
    );
    await waitFor(() => expect(result.current.hydrated).toBe(true));

    expect(result.current.values).toEqual(new Set(["current"]));
    expect(transform).not.toHaveBeenCalled();
  });

  it("keeps the legacy key when the v1 migration write fails", async () => {
    localStorage.setItem("old-key", JSON.stringify(["legacy::One"]));
    const transform = (legacy: unknown) =>
      Array.isArray(legacy)
        ? legacy.filter((v): v is string => typeof v === "string").map((v) => v.replace("legacy::", ""))
        : null;
    const setItem = vi
      .spyOn(Storage.prototype, "setItem")
      .mockImplementation(() => {
        throw new DOMException("quota", "QuotaExceededError");
      });
    try {
      const { result } = renderHook(() =>
        useStoredSet(KEY, { migrateLegacy: { key: "old-key", transform } }),
      );
      await waitFor(() => expect(result.current.hydrated).toBe(true));
      // Migrated in memory for this session…
      expect(result.current.values).toEqual(new Set(["One"]));
    } finally {
      setItem.mockRestore();
    }
    // …but the only persisted copy survives so migration retries next load.
    expect(localStorage.getItem("old-key")).toBe(JSON.stringify(["legacy::One"]));
  });

  it("does not write back over corrupt stored data on load", async () => {
    localStorage.setItem(KEY, "{not json![");
    const { result } = renderHook(() => useStoredSet(KEY));
    await waitFor(() => expect(result.current.hydrated).toBe(true));
    expect(result.current.values.size).toBe(0);
    // Corrupt bytes stay recoverable until the user actually changes state.
    expect(localStorage.getItem(KEY)).toBe("{not json![");
  });

  it("does not migrate legacy data over a corrupt v1 key", async () => {
    localStorage.setItem(KEY, "{not json![");
    localStorage.setItem("old-key", JSON.stringify(["legacy::Stale"]));
    const transform = vi.fn(() => ["Stale"]);
    const { result } = renderHook(() =>
      useStoredSet(KEY, { migrateLegacy: { key: "old-key", transform } }),
    );
    await waitFor(() => expect(result.current.hydrated).toBe(true));
    expect(result.current.values.size).toBe(0);
    expect(transform).not.toHaveBeenCalled();
    expect(localStorage.getItem("old-key")).not.toBeNull();
  });

  it("discards legacy data when the transform rejects it", async () => {
    localStorage.setItem("old-key", JSON.stringify({ wrong: "shape" }));
    const { result } = renderHook(() =>
      useStoredSet(KEY, { migrateLegacy: { key: "old-key", transform: () => null } }),
    );
    await waitFor(() => expect(result.current.hydrated).toBe(true));
    expect(result.current.values.size).toBe(0);
    expect(localStorage.getItem("old-key")).toBeNull();
  });

  it("removes an unreadable legacy key without migrating", async () => {
    localStorage.setItem("old-key", "{not json![");
    const transform = vi.fn(() => ["never"]);
    const { result } = renderHook(() =>
      useStoredSet(KEY, { migrateLegacy: { key: "old-key", transform } }),
    );
    await waitFor(() => expect(result.current.hydrated).toBe(true));
    expect(result.current.values.size).toBe(0);
    expect(transform).not.toHaveBeenCalled();
    expect(localStorage.getItem("old-key")).toBeNull();
  });

  it("survives quota-exceeded writes with in-memory state intact", async () => {
    const { result } = renderHook(() => useStoredSet(KEY));
    await waitFor(() => expect(result.current.hydrated).toBe(true));

    const setItem = vi
      .spyOn(Storage.prototype, "setItem")
      .mockImplementation(() => {
        throw new DOMException("quota", "QuotaExceededError");
      });
    try {
      act(() => result.current.toggle("kept-in-memory"));
      expect(result.current.values.has("kept-in-memory")).toBe(true);
    } finally {
      setItem.mockRestore();
    }
  });
});

type Tri = "planned" | "in-progress" | "earned";
const isTri = (v: unknown): v is Tri =>
  v === "planned" || v === "in-progress" || v === "earned";
const MAP_KEY = storageKey("test-map");

describe("useStoredMap", () => {
  it("hydrates and drops entries that fail validation", async () => {
    localStorage.setItem(
      MAP_KEY,
      JSON.stringify({ psp: "earned", app: "completed", cpp: 3 }),
    );
    const { result } = renderHook(() => useStoredMap<Tri>(MAP_KEY, isTri));
    await waitFor(() => expect(result.current.hydrated).toBe(true));
    expect(result.current.map).toEqual({ psp: "earned" });
  });

  it("set writes through and null deletes", async () => {
    const { result } = renderHook(() => useStoredMap<Tri>(MAP_KEY, isTri));
    await waitFor(() => expect(result.current.hydrated).toBe(true));

    act(() => result.current.set("app", "planned"));
    act(() => result.current.set("psp", "in-progress"));
    await waitFor(() =>
      expect(JSON.parse(localStorage.getItem(MAP_KEY)!)).toEqual({
        app: "planned",
        psp: "in-progress",
      }),
    );

    act(() => result.current.set("app", null));
    expect(result.current.map).toEqual({ psp: "in-progress" });
    await waitFor(() =>
      expect(JSON.parse(localStorage.getItem(MAP_KEY)!)).toEqual({
        psp: "in-progress",
      }),
    );
  });

  it("starts fresh on corrupted JSON", async () => {
    localStorage.setItem(MAP_KEY, "!!!");
    const { result } = renderHook(() => useStoredMap<Tri>(MAP_KEY, isTri));
    await waitFor(() => expect(result.current.hydrated).toBe(true));
    expect(result.current.map).toEqual({});
  });

  it("starts fresh when the stored value is an array, not a map", async () => {
    // Arrays are typeof "object" — must not hydrate as numeric-keyed entries.
    localStorage.setItem(MAP_KEY, JSON.stringify(["planned", "earned"]));
    const { result } = renderHook(() => useStoredMap<Tri>(MAP_KEY, isTri));
    await waitFor(() => expect(result.current.hydrated).toBe(true));
    expect(result.current.map).toEqual({});
  });
});

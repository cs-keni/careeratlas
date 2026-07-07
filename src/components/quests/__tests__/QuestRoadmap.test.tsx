import { describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QuestRoadmap } from "@/components/quests/QuestRoadmap";
import { LEGACY_QUEST_PROGRESS_KEY as LEGACY_KEY, questPhases } from "@/data/quests";
import { QUEST_PROGRESS_KEY } from "@/lib/storage";

// Derived from data so hand-editing quests.ts never breaks these tests.
const TOTAL = questPhases.reduce((n, p) => n + p.quests.length, 0);

describe("QuestRoadmap", () => {
  it("migrates legacy title-keyed progress to quest ids once", async () => {
    localStorage.setItem(
      LEGACY_KEY,
      JSON.stringify([
        "week-1::Set up your toolchain",
        "days-30::Join ASIS",
        "week-1::A title that no longer exists",
      ]),
    );

    render(<QuestRoadmap />);

    await waitFor(() =>
      expect(JSON.parse(localStorage.getItem(QUEST_PROGRESS_KEY)!)).toEqual([
        "w1-toolchain",
        "d30-join-asis",
      ]),
    );
    expect(localStorage.getItem(LEGACY_KEY)).toBeNull();
    expect(screen.getByText(new RegExp(`2 / ${TOTAL} charted`))).toBeInTheDocument();
  });

  it("toggles a quest and persists its id", async () => {
    const user = userEvent.setup();
    render(<QuestRoadmap />);
    await waitFor(() =>
      expect(screen.getByText(new RegExp(`0 / ${TOTAL} charted`))).toBeInTheDocument(),
    );

    await user.click(
      screen.getByRole("button", { name: /Start a personal glossary/ }),
    );

    await waitFor(() =>
      expect(JSON.parse(localStorage.getItem(QUEST_PROGRESS_KEY)!)).toEqual([
        "w1-glossary",
      ]),
    );
    expect(screen.getByText(new RegExp(`1 / ${TOTAL} charted`))).toBeInTheDocument();
  });

  it("hydrates existing v1 progress", async () => {
    localStorage.setItem(
      QUEST_PROGRESS_KEY,
      JSON.stringify(["w1-onboarding", "w1-timekeeping", "d90-autocad"]),
    );
    render(<QuestRoadmap />);
    await waitFor(() =>
      expect(screen.getByText(new RegExp(`3 / ${TOTAL} charted`))).toBeInTheDocument(),
    );
  });

  // Regression: QuestRoadmap counted raw done.size, so a stored id no longer in
  // the questline (content edit, legacy migration) inflated the counter past
  // the total. Found by Codex adversarial pass during /ship on 2026-07-07.
  it("ignores stored ids that are no longer in the questline", async () => {
    localStorage.setItem(
      QUEST_PROGRESS_KEY,
      JSON.stringify(["w1-onboarding", "this-quest-no-longer-exists"]),
    );
    render(<QuestRoadmap />);
    await waitFor(() =>
      expect(screen.getByText(new RegExp(`1 / ${TOTAL} charted`))).toBeInTheDocument(),
    );
    // Never report more completed than exist, whatever is stored.
    expect(
      screen.queryByText(new RegExp(`${TOTAL + 1} / ${TOTAL} charted`)),
    ).not.toBeInTheDocument();
  });
});

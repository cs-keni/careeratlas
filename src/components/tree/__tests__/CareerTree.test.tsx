import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { CareerTree } from "@/components/tree/CareerTree";

// CareerTree renders outside a Next router here; a minimal stub reading the
// real location keeps NodeParamSync mountable. Non-reactive is fine — these
// tests drive the mount/popstate/replaceState paths.
vi.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(window.location.search),
}));

function setUrl(pathAndQuery: string) {
  window.history.replaceState(null, "", pathAndQuery);
}

beforeEach(() => {
  setUrl("/tree");
});

describe("CareerTree share links", () => {
  it("opens the detail panel for a valid ?node= id on arrival", async () => {
    setUrl("/tree?node=jr-pse");
    render(<CareerTree />);

    expect(
      await screen.findByRole("heading", { name: "Jr Physical Security Engineer" }),
    ).toBeInTheDocument();
  });

  it("silently falls back to the plain tree for an unknown ?node= id", async () => {
    setUrl("/tree?node=not-a-real-node");
    render(<CareerTree />);

    // The legend renders (tree is alive), but no detail panel opened.
    expect(await screen.findByRole("button", { name: "All Paths" })).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.queryByRole("button", { name: "Close details" })).not.toBeInTheDocument(),
    );
  });

  it("syncs selection from history on popstate", async () => {
    render(<CareerTree />);
    await screen.findByRole("button", { name: "All Paths" });

    setUrl("/tree?node=jr-pse");
    window.dispatchEvent(new PopStateEvent("popstate"));

    expect(
      await screen.findByRole("heading", { name: "Jr Physical Security Engineer" }),
    ).toBeInTheDocument();

    setUrl("/tree");
    window.dispatchEvent(new PopStateEvent("popstate"));
    await waitFor(() =>
      expect(screen.queryByRole("button", { name: "Close details" })).not.toBeInTheDocument(),
    );
  });

  it("mirrors selection into the URL and clears it on close", async () => {
    setUrl("/tree?node=jr-pse");
    render(<CareerTree />);
    await screen.findByRole("heading", { name: "Jr Physical Security Engineer" });

    // Selecting a next role from the panel writes its id into ?node=.
    fireEvent.click(screen.getByRole("button", { name: /^Physical Security Engineer/ }));
    await screen.findByRole("heading", { name: "Physical Security Engineer" });
    expect(window.location.search).toContain("node=pse");

    // Closing the panel clears the param — the URL always matches the view.
    fireEvent.click(screen.getByRole("button", { name: "Close details" }));
    await waitFor(() => expect(window.location.search).not.toContain("node="));
  });

  it("closes the detail panel on Escape", async () => {
    setUrl("/tree?node=jr-pse");
    render(<CareerTree />);
    await screen.findByRole("heading", { name: "Jr Physical Security Engineer" });

    fireEvent.keyDown(window, { key: "Escape" });
    await waitFor(() =>
      expect(screen.queryByRole("button", { name: "Close details" })).not.toBeInTheDocument(),
    );
    expect(window.location.search).not.toContain("node=");
  });

  it("leaves the copy icon at rest when the clipboard write fails", async () => {
    const writeText = vi.fn().mockRejectedValue(new Error("denied"));
    const originalClipboard = Object.getOwnPropertyDescriptor(navigator, "clipboard");
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });

    try {
      setUrl("/tree?node=jr-pse");
      render(<CareerTree />);

      const copy = await screen.findByRole("button", { name: "Copy node link" });
      fireEvent.click(copy);

      await waitFor(() => expect(writeText).toHaveBeenCalledTimes(1));
      // Rejection is swallowed: no checkmark, no announcement, no crash.
      expect(copy).toHaveTextContent("⧉");
      expect(screen.queryByText("Link copied")).not.toBeInTheDocument();
    } finally {
      if (originalClipboard) {
        Object.defineProperty(navigator, "clipboard", originalClipboard);
      } else {
        delete (navigator as { clipboard?: unknown }).clipboard;
      }
    }
  });

  it("copies a shareable link with copied micro-state and aria-live announcement", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    // fireEvent, not userEvent: userEvent.setup() would replace this
    // clipboard stub with its own. Restored in finally so the stub can't
    // leak into tests added after this one.
    const originalClipboard = Object.getOwnPropertyDescriptor(navigator, "clipboard");
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });

    try {
      setUrl("/tree?node=jr-pse");
      render(<CareerTree />);

      const copy = await screen.findByRole("button", { name: "Copy node link" });
      fireEvent.click(copy);

      expect(writeText).toHaveBeenCalledTimes(1);
      expect(writeText.mock.calls[0][0]).toContain("/tree?node=jr-pse");
      await waitFor(() => expect(copy).toHaveTextContent("✓"));
      expect(screen.getByText("Link copied")).toBeInTheDocument();

      // Micro-state reverts on its own after ~1.2s.
      await waitFor(() => expect(copy).toHaveTextContent("⧉"), { timeout: 3000 });
    } finally {
      if (originalClipboard) {
        Object.defineProperty(navigator, "clipboard", originalClipboard);
      } else {
        delete (navigator as { clipboard?: unknown }).clipboard;
      }
    }
  });
});

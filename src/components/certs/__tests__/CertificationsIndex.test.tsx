import { describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { asisSpine, CertificationsIndex } from "@/components/certs/CertificationsIndex";
import { CertificationBadge } from "@/components/certs/CertificationBadge";
import { certifications } from "@/data/certifications";
import { CERT_PROGRESS_KEY } from "@/lib/storage";

// Derived from data so hand-editing certifications.ts never breaks these tests.
const TOTAL = certifications.length;

describe("CertificationsIndex", () => {
  it("ASIS spine ids reference real certifications", () => {
    const certIds = new Set(certifications.map((c) => c.id));
    const missing = asisSpine.filter((s) => !certIds.has(s.id)).map((s) => s.id);
    expect(missing).toEqual([]);
  });

  it("renders a badge read-only without a tracking control when onCycle is omitted", () => {
    render(<CertificationBadge cert={certifications[0]} progress="earned" />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("cycles a cert untracked → Planned → In Progress → Earned → untracked and persists", async () => {
    const user = userEvent.setup();
    render(<CertificationsIndex />);

    const track = await screen.findByRole("button", {
      name: "Track APP. Mark as Planned.",
    });

    await user.click(track);
    await waitFor(() =>
      expect(JSON.parse(localStorage.getItem(CERT_PROGRESS_KEY)!)).toEqual({
        app: "planned",
      }),
    );

    await user.click(
      screen.getByRole("button", { name: "APP is Planned. Mark as In Progress." }),
    );
    await user.click(
      screen.getByRole("button", { name: "APP is In Progress. Mark as Earned." }),
    );
    await waitFor(() =>
      expect(JSON.parse(localStorage.getItem(CERT_PROGRESS_KEY)!)).toEqual({
        app: "earned",
      }),
    );

    await user.click(
      screen.getByRole("button", { name: "APP is Earned. Clear tracking." }),
    );
    await waitFor(() =>
      expect(JSON.parse(localStorage.getItem(CERT_PROGRESS_KEY)!)).toEqual({}),
    );
  });

  it("hydrates stored progress: counter and ASIS spine light up", async () => {
    localStorage.setItem(
      CERT_PROGRESS_KEY,
      JSON.stringify({ app: "earned", psp: "in-progress", pmp: "earned" }),
    );
    render(<CertificationsIndex />);

    await waitFor(() =>
      // 2 earned of TOTAL, shown as split spans: "2" + "of N earned"
      expect(screen.getByText(new RegExp(`of ${TOTAL} earned`))).toHaveTextContent(
        `2 of ${TOTAL} earned`,
      ),
    );
    // The APP spine segment flips its caption to Earned; PSP stays estimate-only.
    expect(screen.getByText("Earned ✓")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "APP is Earned. Clear tracking." }),
    ).toBeInTheDocument();
  });

  it("ignores corrupt stored values and renders untracked", async () => {
    localStorage.setItem(
      CERT_PROGRESS_KEY,
      JSON.stringify({ app: "completed", psp: 42 }),
    );
    render(<CertificationsIndex />);
    await waitFor(() =>
      expect(screen.getByText(new RegExp(`of ${TOTAL} earned`))).toHaveTextContent(
        `0 of ${TOTAL} earned`,
      ),
    );
    expect(
      screen.getByRole("button", { name: "Track APP. Mark as Planned." }),
    ).toBeInTheDocument();
  });
});

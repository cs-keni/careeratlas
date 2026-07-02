export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-[var(--line)]">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-lg text-parchment">
              Security Career <span className="italic text-brass">Atlas</span>
            </p>
            <p className="mt-1 max-w-md text-sm text-muted">
              A field guide to physical security engineering careers. Paths are
              possibilities, not rails — multiclass freely.
            </p>
          </div>
          <p className="rune text-muted">
            Salaries &amp; timelines are rough estimates · verify cert
            requirements at the source
          </p>
        </div>
      </div>
    </footer>
  );
}

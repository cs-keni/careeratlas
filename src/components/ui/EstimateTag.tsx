/** Small persistent reminder that a figure is a rough estimate. */
export function EstimateTag() {
  return (
    <span className="rune rounded bg-ink-800 px-1.5 py-0.5 text-[0.6rem] text-muted">
      est.
    </span>
  );
}

export function formatSalary(min: number, max: number): string {
  const fmt = (n: number) => `$${Math.round(n / 1000)}k`;
  return `${fmt(min)}–${fmt(max)}`;
}

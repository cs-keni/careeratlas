import type { ReactNode } from "react";

export function SectionHeading({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-8">
      <p className="rune mb-2 text-brass">◆ {kicker}</p>
      <h2 className="font-display text-3xl tracking-tight text-parchment sm:text-4xl">
        {title}
      </h2>
      {children && <p className="mt-3 max-w-2xl text-parchment-dim">{children}</p>}
      <div className="gold-rule mt-6" />
    </div>
  );
}

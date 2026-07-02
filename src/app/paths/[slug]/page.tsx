import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { careerPaths, pathBySlug } from "@/data/paths";
import { pathColor } from "@/lib/pathColors";
import { PathDetail } from "@/components/paths/PathDetail";

export function generateStaticParams() {
  return careerPaths.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const path = pathBySlug.get(slug);
  return {
    title: path ? `${path.name} Path` : "Path",
    description: path?.tagline,
  };
}

export default async function PathPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const path = pathBySlug.get(slug);
  if (!path) notFound();

  const color = pathColor(path.id);
  const index = careerPaths.findIndex((p) => p.id === path.id);
  const next = careerPaths[(index + 1) % careerPaths.length];

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <Link href="/paths" className="rune text-muted transition-colors hover:text-parchment">
        ← All paths
      </Link>

      <header className="mt-6 mb-12">
        <p className="rune mb-3" style={{ color }}>
          ◆ Path {String(index + 1).padStart(2, "0")} of {careerPaths.length}
        </p>
        <h1 className="font-display text-4xl tracking-tight text-parchment sm:text-5xl">
          {path.name}
        </h1>
        <p className="mt-3 font-display text-xl italic" style={{ color }}>
          {path.tagline}
        </p>
        <p className="mt-5 max-w-3xl leading-relaxed text-parchment-dim">{path.overview}</p>
        <div className="gold-rule mt-8" />
      </header>

      <PathDetail path={path} />

      <div className="mt-16 flex justify-end border-t border-[var(--line)] pt-8">
        <Link
          href={`/paths/${next.slug}`}
          className="rune group text-muted transition-colors hover:text-parchment"
        >
          Next path: <span style={{ color: pathColor(next.id) }}>{next.name}</span>{" "}
          <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </div>
  );
}

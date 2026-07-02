"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const navItems = [
  { href: "/tree", label: "Skill Tree" },
  { href: "/paths", label: "Paths" },
  { href: "/certifications", label: "Certifications" },
  { href: "/codex", label: "Codex" },
  { href: "/first-90-days", label: "First 90 Days" },
  { href: "/compare", label: "SWE ↔ PSE" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-ink-950/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span
            aria-hidden
            className="grid h-7 w-7 place-items-center rounded border border-[var(--line-strong)] font-mono text-sm text-brass transition-transform duration-300 group-hover:rotate-45"
          >
            ✦
          </span>
          <span className="font-display text-lg tracking-tight text-parchment">
            Security Career <span className="italic text-brass">Atlas</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rune rounded px-3 py-2 transition-colors duration-200 ${
                isActive(item.href)
                  ? "text-brass-bright"
                  : "text-muted hover:text-parchment"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          className="rune flex items-center gap-2 text-muted md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          Menu
          <span className="font-mono text-brass">{open ? "×" : "≡"}</span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
            className="overflow-hidden border-t border-[var(--line)] md:hidden"
          >
            <div className="flex flex-col px-4 py-2">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`rune block py-3 ${
                      isActive(item.href) ? "text-brass-bright" : "text-parchment-dim"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

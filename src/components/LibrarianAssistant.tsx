import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Compass, MessageCircle, Sparkles, X } from "lucide-react";
import { getBookEnrichment } from "@/lib/devshelf-enrichments";
import { useLibrary, type MascotChoice } from "@/lib/library-storage";
import type { ShelfCategory, Technology } from "@/lib/devshelf-catalog";

function MascotAvatar({ mascot }: { mascot: MascotChoice }) {
  if (mascot === "cat") {
    return (
      <svg width="34" height="34" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <path
          d="M8 14L10 6L16 11H20L26 6L28 14C30 16.5 30.5 22 27.5 26C24.5 29.5 11.5 29.5 8.5 26C5.5 22 6 16.5 8 14Z"
          fill="#E5BFA6"
          stroke="#51443C"
          strokeWidth="1.5"
        />
        <circle cx="14" cy="18" r="1.5" fill="#51443C" />
        <circle cx="22" cy="18" r="1.5" fill="#51443C" />
        <path
          d="M16.5 21L18 22.5L19.5 21"
          stroke="#51443C"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <path d="M9 20H5M27 20H31" stroke="#51443C" strokeWidth="1.1" strokeLinecap="round" />
      </svg>
    );
  }

  if (mascot === "ghost") {
    return (
      <svg width="34" height="34" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <path
          d="M10 29V16C10 10.5 13.5 7 18 7C22.5 7 26 10.5 26 16V29L22.5 26.5L18 29L13.5 26.5L10 29Z"
          fill="#FDFBF6"
          stroke="#51443C"
          strokeWidth="1.5"
        />
        <circle cx="15" cy="16" r="1.6" fill="#51443C" />
        <circle cx="21" cy="16" r="1.6" fill="#51443C" />
        <rect
          x="21"
          y="19"
          width="7"
          height="9"
          rx="1"
          fill="#B7A3D0"
          stroke="#51443C"
          strokeWidth="1.2"
        />
      </svg>
    );
  }

  // Owl default (Barnaby)
  return (
    <svg width="34" height="34" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <path
        d="M9 12L12 7L15 10H21L24 7L27 12C29 16 29 24 24 28C21 30 15 30 12 28C7 24 7 16 9 12Z"
        fill="#EBD99C"
        stroke="#51443C"
        strokeWidth="1.5"
      />
      <circle cx="14" cy="16" r="3.4" fill="#FDFBF6" stroke="#51443C" strokeWidth="1.3" />
      <circle cx="22" cy="16" r="3.4" fill="#FDFBF6" stroke="#51443C" strokeWidth="1.3" />
      <circle cx="14" cy="16" r="1.3" fill="#51443C" />
      <circle cx="22" cy="16" r="1.3" fill="#51443C" />
      <path d="M16.5 19L18 21.5L19.5 19H16.5Z" fill="#C7997D" stroke="#51443C" strokeWidth="1" />
    </svg>
  );
}

const mascotNames: Record<MascotChoice, string> = {
  owl: "Barnaby the Owl",
  cat: "Mochi the Library Cat",
  ghost: "Pip the Book Ghost",
};

const interestPrompts: Array<{ label: string; categories: ShelfCategory[] }> = [
  { label: "UI & Design", categories: ["Frontend", "UI/UX", "Design"] },
  { label: "Spatial 3D/XR", categories: ["AR/VR"] },
  { label: "Backend & Data", categories: ["Backend", "Databases"] },
  { label: "AI & Models", categories: ["AI/ML"] },
  { label: "Mobile Apps", categories: ["App Dev"] },
];

export function LibrarianAssistant() {
  const { preferences, exploredIds, allAvailableBooks, openBookPreview, quietMode } = useLibrary();
  const prefersReducedMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [selectedInterest, setSelectedInterest] = useState<string | null>(null);
  const [challengeSeed, setChallengeSeed] = useState(0);

  // Rule-based contextual librarian recommendation
  const contextualTip = useMemo(() => {
    const exploredSet = new Set(exploredIds);
    const byId = new Map(allAvailableBooks.map((b) => [b.id, b]));

    for (let i = exploredIds.length - 1; i >= 0; i--) {
      const book = byId.get(exploredIds[i]!);
      if (!book) continue;
      const related = getBookEnrichment(book)
        .relatedIds.map((id) => byId.get(id))
        .find((rel): rel is Technology => Boolean(rel && !exploredSet.has(rel.id)));
      if (related) {
        return {
          message: `Psst... you've explored ${book.name}. Have you met ${related.name} yet?`,
          suggested: related,
        };
      }
    }

    const fallback = byId.get("threejs") ?? allAvailableBooks[0]!;
    return {
      message: "Welcome to the reading room! Looking for a quiet volume to spark a weekend build?",
      suggested: fallback,
    };
  }, [exploredIds, allAvailableBooks]);

  const interestPick = useMemo(() => {
    if (!selectedInterest) return null;
    const rule = interestPrompts.find((p) => p.label === selectedInterest);
    if (!rule) return null;
    const pool = allAvailableBooks.filter((b) => rule.categories.includes(b.category));
    if (pool.length === 0) return null;
    return pool[challengeSeed % pool.length] ?? pool[0]!;
  }, [selectedInterest, allAvailableBooks, challengeSeed]);

  const challengeBook = useMemo(() => {
    const unexplored = allAvailableBooks.filter((b) => !exploredIds.includes(b.id));
    const pool = unexplored.length > 0 ? unexplored : allAvailableBooks;
    return pool[(challengeSeed * 3 + 5) % pool.length] ?? allAvailableBooks[0]!;
  }, [allAvailableBooks, exploredIds, challengeSeed]);

  if (quietMode) return null;

  return (
    <div className="fixed right-4 bottom-4 z-30 sm:right-6 sm:bottom-6">
      <AnimatePresence>
        {open && (
          <motion.aside
            aria-label="Library assistant"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.2 }}
            className="mb-3 w-[min(92vw,340px)] overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border bg-secondary/60 px-4 py-3">
              <div className="flex items-center gap-2.5">
                <MascotAvatar mascot={preferences.mascot} />
                <div>
                  <p className="font-editorial text-base leading-tight text-foreground">
                    {mascotNames[preferences.mascot]}
                  </p>
                  <p className="font-catalog text-[10px] tracking-wider uppercase text-muted-foreground">
                    LIBRARY GUIDE
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close librarian guide"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <X size={15} />
              </button>
            </div>

            <div className="space-y-4 p-4">
              {/* Rule-based Personal Whisper */}
              <div className="rounded-md border border-border bg-background p-3">
                <p className="text-xs leading-relaxed text-foreground">{contextualTip.message}</p>
                <button
                  type="button"
                  onClick={() => {
                    openBookPreview(contextualTip.suggested);
                    setOpen(false);
                  }}
                  className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                >
                  <Sparkles size={12} />
                  Open {contextualTip.suggested.name} ({contextualTip.suggested.category})
                </button>
              </div>

              {/* Interest Matcher */}
              <div>
                <p className="font-catalog text-[10px] tracking-wider uppercase text-muted-foreground">
                  WHAT ARE YOU CURIOUS ABOUT?
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {interestPrompts.map((item) => {
                    const active = selectedInterest === item.label;
                    return (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => {
                          setSelectedInterest(item.label);
                          setChallengeSeed((s) => s + 1);
                        }}
                        className={`rounded border px-2.5 py-1 text-[11px] font-medium transition-colors ${
                          active
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-background text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>

                {interestPick && (
                  <div className="mt-2.5 flex items-center justify-between gap-2 rounded border border-border bg-secondary/45 px-3 py-2">
                    <div className="min-w-0">
                      <p className="truncate font-editorial text-sm text-foreground">
                        {interestPick.name}
                      </p>
                      <p className="truncate text-[11px] text-muted-foreground">
                        {interestPick.description}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => openBookPreview(interestPick)}
                      className="shrink-0 rounded bg-primary px-2.5 py-1 text-[11px] font-medium text-primary-foreground"
                    >
                      Peek
                    </button>
                  </div>
                )}
              </div>

              {/* Exploration Challenge */}
              <div className="border-t border-border pt-3">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 font-catalog text-[10px] tracking-wider uppercase text-muted-foreground">
                    <Compass size={11} /> TODAY&apos;S EXPLORATION CHALLENGE
                  </span>
                  <button
                    type="button"
                    onClick={() => setChallengeSeed((s) => s + 1)}
                    className="text-[11px] text-muted-foreground underline hover:text-foreground"
                  >
                    New quest
                  </button>
                </div>
                <p className="mt-1 text-xs text-foreground">
                  Inspect <span className="font-medium">{challengeBook.name}</span> from{" "}
                  <span className="text-muted-foreground">{challengeBook.category}</span> to stamp
                  your passport.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    openBookPreview(challengeBook);
                    setOpen(false);
                  }}
                  className="mt-2 text-xs font-medium text-primary hover:underline"
                >
                  Visit {challengeBook.name} →
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Mascot Trigger Pill */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={`Open ${mascotNames[preferences.mascot]} guide`}
        className="flex items-center gap-2.5 rounded-full border border-border bg-card py-2 pr-4 pl-2.5 text-foreground shadow-lg transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <MascotAvatar mascot={preferences.mascot} />
        <span className="hidden text-xs font-medium sm:inline">Ask the Librarian</span>
        <MessageCircle size={14} className="text-primary sm:hidden" />
      </button>
    </div>
  );
}

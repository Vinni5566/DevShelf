import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BookOpen, Calendar, RefreshCw, Sparkles, X } from "lucide-react";
import { Book } from "@/components/Book";
import { getBookEnrichment } from "@/lib/devshelf-enrichments";
import { useLibrary } from "@/lib/library-storage";

export function MysteryBookModal() {
  const {
    mysteryState,
    closeMysteryBook,
    openMysteryBook,
    openBookPreview,
    isFavorite,
    toggleFavorite,
  } = useLibrary();
  const prefersReducedMotion = useReducedMotion();
  const [revealed, setRevealed] = useState(false);

  const book = mysteryState.book;

  useEffect(() => {
    if (!mysteryState.isOpen) {
      setRevealed(false);
      return;
    }
    setRevealed(false);
    const timer = window.setTimeout(() => setRevealed(true), prefersReducedMotion ? 10 : 520);
    return () => window.clearTimeout(timer);
  }, [mysteryState.isOpen, mysteryState.book?.id, mysteryState.mode, prefersReducedMotion]);

  useEffect(() => {
    if (!mysteryState.isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMysteryBook();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mysteryState.isOpen, closeMysteryBook]);

  const enrichment = book ? getBookEnrichment(book) : null;

  return (
    <AnimatePresence>
      {mysteryState.isOpen && book && enrichment && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="mystery-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMysteryBook}
            className="fixed inset-0 bg-[#2C231D]/60 backdrop-blur-[3px] dark:bg-black/75"
          />

          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-xl overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-2xl"
          >
            {/* Header Bar */}
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <div className="flex items-center gap-2">
                <Sparkles size={15} className="text-primary" />
                <span className="font-catalog text-[11px] tracking-[0.16em] uppercase text-muted-foreground">
                  {mysteryState.mode === "daily"
                    ? "TODAY'S DAILY MYSTERY BOOK"
                    : "THE MYSTERY BOOK"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    openMysteryBook(mysteryState.mode === "daily" ? "random" : "daily")
                  }
                  className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Calendar size={12} />
                  {mysteryState.mode === "daily" ? "Pick random" : "Daily pick"}
                </button>

                <button
                  type="button"
                  onClick={closeMysteryBook}
                  aria-label="Close mystery book"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:text-foreground"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="px-6 py-8 sm:px-8">
              <div className="flex flex-col items-center text-center">
                {/* Sliding & Flipping Book Container */}
                <div className="shelf-perspective relative flex h-[310px] items-center justify-center">
                  <AnimatePresence mode="wait">
                    {!revealed ? (
                      <motion.div
                        key="wrapped"
                        initial={
                          prefersReducedMotion
                            ? { opacity: 0 }
                            : { x: -48, opacity: 0, rotateY: -22 }
                        }
                        animate={
                          prefersReducedMotion ? { opacity: 1 } : { x: 0, opacity: 1, rotateY: 0 }
                        }
                        exit={
                          prefersReducedMotion
                            ? { opacity: 0 }
                            : { rotateY: 90, opacity: 0, scale: 0.96 }
                        }
                        transition={{
                          duration: prefersReducedMotion ? 0.01 : 0.34,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="flex h-[284px] w-[204px] flex-col items-center justify-between rounded-r-md rounded-l-[3px] border border-[#51443C]/30 bg-[#E6D7BC] p-5 text-[#51443C] shadow-xl"
                      >
                        <span className="font-catalog text-[10px] tracking-[0.2em] uppercase opacity-70">
                          BLIND DATE WITH DOCS
                        </span>
                        <div className="flex flex-col items-center gap-3">
                          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#51443C]/35 bg-[#FDFBF6]">
                            <span className="font-editorial text-2xl">?</span>
                          </div>
                          <p className="font-editorial text-lg leading-snug">
                            Sliding a volume from the stacks…
                          </p>
                        </div>
                        <span className="font-catalog text-[10px] opacity-65">
                          UNWRAPPING EDITION
                        </span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key={`revealed-${book.id}`}
                        initial={
                          prefersReducedMotion
                            ? { opacity: 0 }
                            : { rotateY: -85, opacity: 0, scale: 0.94 }
                        }
                        animate={{ rotateY: 0, opacity: 1, scale: 1 }}
                        transition={{
                          duration: prefersReducedMotion ? 0.01 : 0.38,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      >
                        <Book
                          book={book}
                          variant="large"
                          isFavorite={isFavorite(book.id)}
                          onSelect={() => {}}
                          onToggleFavorite={toggleFavorite}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Revealed Details */}
                <div className="mt-5 max-w-md">
                  <p className="font-catalog text-[10px] tracking-[0.16em] uppercase text-muted-foreground">
                    {book.catalogNo} · {book.category} · {enrichment.difficulty}
                  </p>
                  <h2
                    id="mystery-modal-title"
                    className="mt-1.5 font-editorial text-3xl text-foreground"
                  >
                    {revealed ? book.name : "Choosing from the shelves…"}
                  </h2>
                  <p className="mt-2.5 text-sm leading-relaxed text-foreground/90">
                    {book.description}
                  </p>

                  <div className="mt-4 rounded-md border border-border bg-secondary/55 px-4 py-3 text-left">
                    <p className="font-catalog text-[10px] tracking-widest uppercase text-muted-foreground">
                      WHY EXPLORE THIS VOLUME
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {enrichment.whyExplore}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex w-full flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      closeMysteryBook();
                      openBookPreview(book);
                    }}
                    className="inline-flex items-center gap-2 whitespace-nowrap rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    <BookOpen size={15} />
                    Open this book
                  </button>

                  <button
                    type="button"
                    onClick={() => openMysteryBook("random")}
                    className="inline-flex items-center gap-2 whitespace-nowrap rounded-md border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    <RefreshCw size={14} />
                    Pick another
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

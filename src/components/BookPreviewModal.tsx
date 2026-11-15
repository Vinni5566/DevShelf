import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Bell, Bookmark, Check, ExternalLink, Layers, PenLine, Shuffle, X } from "lucide-react";
import { Book } from "@/components/Book";
import { getCollectionForCategory } from "@/lib/devshelf-catalog";
import { getBookEnrichment, getRelatedBooks } from "@/lib/devshelf-enrichments";
import { useLibrary } from "@/lib/library-storage";

const notePrompts = [
  "Use this for my next hackathon",
  "Explore this after finishing React",
  "Bookmarking key API patterns",
];

export function BookPreviewModal() {
  const {
    activeBook,
    closeBookPreview,
    openBookPreview,
    isFavorite,
    toggleFavorite,
    openMysteryBook,
    allAvailableBooks,
    notes,
    saveBookNote,
    stacks,
    addBookToStack,
    notify,
  } = useLibrary();
  const prefersReducedMotion = useReducedMotion();
  const [noteDraft, setNoteDraft] = useState("");
  const [noteSavedFlag, setNoteSavedFlag] = useState(false);

  useEffect(() => {
    if (!activeBook) return;
    setNoteDraft(notes[activeBook.id] ?? "");
    setNoteSavedFlag(false);
  }, [activeBook, notes]);

  useEffect(() => {
    if (!activeBook) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeBookPreview();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeBook, closeBookPreview]);

  const saved = activeBook ? isFavorite(activeBook.id) : false;
  const collection = activeBook ? getCollectionForCategory(activeBook.category) : null;
  const enrichment = activeBook ? getBookEnrichment(activeBook) : null;
  const relatedBooks = activeBook ? getRelatedBooks(activeBook, allAvailableBooks) : [];

  function handleSaveNote() {
    if (!activeBook) return;
    saveBookNote(activeBook.id, noteDraft);
    setNoteSavedFlag(true);
    window.setTimeout(() => setNoteSavedFlag(false), 1800);
  }

  return (
    <AnimatePresence>
      {activeBook && collection && enrichment && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="book-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.18 }}
            onClick={closeBookPreview}
            className="fixed inset-0 bg-[#2C231D]/55 backdrop-blur-[3px] dark:bg-black/70"
          />

          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-lg border border-border bg-card text-card-foreground shadow-2xl"
          >
            <button
              type="button"
              onClick={closeBookPreview}
              aria-label="Close book preview"
              className="sticky top-4 right-4 z-20 float-right mt-4 mr-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/90 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <X size={16} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-[270px_1fr]">
              {/* Left Cover Spread */}
              <div className="flex flex-col items-center justify-between border-b border-border bg-secondary/70 px-6 py-8 md:border-r md:border-b-0">
                <div className="shelf-perspective transition-transform duration-300 hover:scale-[1.02]">
                  <Book
                    book={activeBook}
                    variant="large"
                    isFavorite={saved}
                    onSelect={() => {}}
                    onToggleFavorite={toggleFavorite}
                  />
                </div>

                <div className="mt-6 w-full space-y-2.5 border-t border-border pt-4 text-center">
                  <p className="font-catalog text-[11px] tracking-wider uppercase text-muted-foreground">
                    {activeBook.catalogNo} · EST. {activeBook.yearReleased}
                  </p>
                  <p className="text-xs font-medium text-foreground">
                    Reading pace: {enrichment.difficulty}
                  </p>
                  <div className="rounded border border-border bg-card/80 px-3 py-2 text-left text-[11px]">
                    <div className="flex items-center justify-between gap-2 text-muted-foreground">
                      <span className="inline-flex items-center gap-1 font-catalog uppercase">
                        <Bell size={11} className="text-primary" />
                        {enrichment.edition.version}
                      </span>
                      <span>Checked {enrichment.edition.lastChecked}</span>
                    </div>
                    <p className="mt-1 leading-snug text-muted-foreground">
                      {enrichment.edition.releaseNote}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Inside-Cover Details, Related Books & Marginalia */}
              <div className="flex flex-col justify-between p-6 sm:p-8">
                <div>
                  <div className="flex items-center gap-2 pr-10">
                    <span
                      aria-hidden="true"
                      className="inline-block h-2 w-4 rounded-[1px]"
                      style={{ backgroundColor: collection.accentHex }}
                    />
                    <span className="font-catalog text-[11px] tracking-widest uppercase text-muted-foreground">
                      {collection.title}
                    </span>
                  </div>

                  <h2
                    id="book-modal-title"
                    className="mt-2 font-editorial text-3xl text-foreground sm:text-4xl"
                  >
                    {activeBook.name}
                  </h2>

                  <p className="mt-3 text-base leading-relaxed text-foreground/90">
                    {activeBook.description}
                  </p>

                  <div className="mt-4 border-t border-border pt-3.5">
                    <p className="font-catalog text-[10px] tracking-widest uppercase text-muted-foreground">
                      CURATOR&apos;S NOTE &amp; FUN FACT
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {activeBook.curatorNote} {enrichment.funFact}
                    </p>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">{activeBook.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{activeBook.tags.join(" · ")}</span>
                  </div>

                  {/* Primary & Save Actions */}
                  <div className="mt-5 flex flex-wrap items-center gap-2.5">
                    <a
                      href={activeBook.docs}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    >
                      Open official documentation
                      <ExternalLink size={15} />
                    </a>

                    <button
                      type="button"
                      onClick={() => toggleFavorite(activeBook.id)}
                      aria-pressed={saved}
                      className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
                        saved
                          ? "border-primary bg-secondary text-foreground"
                          : "border-border bg-background text-foreground hover:bg-muted"
                      }`}
                    >
                      {saved ? <Check size={15} /> : <Bookmark size={15} />}
                      {saved ? "Saved on shelf" : "Save to My Shelf"}
                    </button>
                  </div>

                  {/* Quick-Add to Custom Stack */}
                  {stacks.length > 0 && (
                    <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1 font-catalog text-[10px] uppercase">
                        <Layers size={11} /> Add to stack:
                      </span>
                      {stacks.slice(0, 3).map((stack) => {
                        const inStack = stack.bookIds.includes(activeBook.id);
                        return (
                          <button
                            key={stack.id}
                            type="button"
                            disabled={inStack}
                            onClick={() => {
                              addBookToStack(stack.id, activeBook.id);
                              notify(
                                "Added to stack",
                                `${activeBook.name} tucked into "${stack.name}".`,
                              );
                            }}
                            className="rounded border border-border bg-background px-2 py-1 text-[11px] font-medium text-foreground transition-colors hover:bg-muted disabled:opacity-55"
                          >
                            {inStack ? `✓ ${stack.name}` : `+ ${stack.name}`}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Marginalia / Personal Notes */}
                  <div className="mt-5 border-t border-border pt-4">
                    <div className="flex items-center justify-between gap-2">
                      <label
                        htmlFor="marginalia-input"
                        className="inline-flex items-center gap-1.5 font-catalog text-[10px] tracking-widest uppercase text-muted-foreground"
                      >
                        <PenLine size={11} /> BOOKMARKS &amp; MARGINALIA
                      </label>
                      {noteSavedFlag && (
                        <span className="text-[11px] font-medium text-primary">
                          Note tucked in margin
                        </span>
                      )}
                    </div>
                    <textarea
                      id="marginalia-input"
                      rows={2}
                      value={noteDraft}
                      onChange={(e) => setNoteDraft(e.target.value)}
                      placeholder="Jot down why you want to revisit this volume…"
                      className="mt-2 w-full resize-none rounded-md border border-border bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                    />
                    <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap gap-1.5">
                        {notePrompts.map((prompt) => (
                          <button
                            key={prompt}
                            type="button"
                            onClick={() => setNoteDraft(prompt)}
                            className="text-[11px] text-muted-foreground underline decoration-border underline-offset-2 hover:text-foreground"
                          >
                            {prompt}
                          </button>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={handleSaveNote}
                        className="rounded border border-border bg-secondary px-3 py-1 text-xs font-medium text-foreground transition-colors hover:bg-muted"
                      >
                        Save note
                      </button>
                    </div>
                  </div>

                  {/* Related Books */}
                  {relatedBooks.length > 0 && (
                    <div className="mt-5 border-t border-border pt-4">
                      <p className="font-catalog text-[10px] tracking-widest uppercase text-muted-foreground">
                        RELATED BOOKS ON NEIGHBORING SHELVES
                      </p>
                      <div className="mt-2.5 grid grid-cols-3 gap-2.5">
                        {relatedBooks.map((rel) => (
                          <button
                            key={rel.id}
                            type="button"
                            onClick={() => openBookPreview(rel)}
                            className="rounded-md border border-border bg-background px-3 py-2 text-left transition-colors hover:border-primary hover:bg-muted/60"
                          >
                            <span className="block font-editorial text-sm text-foreground">
                              {rel.name}
                            </span>
                            <span className="block truncate font-catalog text-[10px] text-muted-foreground">
                              {rel.category}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Row */}
                <div className="mt-6 flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
                  <span className="font-catalog truncate">{activeBook.docsLabel}</span>
                  <button
                    type="button"
                    onClick={() => {
                      closeBookPreview();
                      openMysteryBook("random");
                    }}
                    className="inline-flex items-center gap-1.5 whitespace-nowrap font-medium text-foreground transition-colors hover:text-primary"
                  >
                    <Shuffle size={13} />
                    Try Mystery Book
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

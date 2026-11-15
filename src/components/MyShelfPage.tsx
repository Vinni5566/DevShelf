import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Bookmark, ExternalLink, NotebookPen, Shuffle, Trash2 } from "lucide-react";
import emptyShelfImg from "@/assets/images/empty_shelf_illustration_1794753861020.jpg";
import { Book } from "@/components/Book";
import { ReadingPassport } from "@/components/ReadingPassport";
import { BrassBookend } from "@/components/ShelfProps";
import { TechStacksSection } from "@/components/TechStacksSection";
import { useLibrary } from "@/lib/library-storage";

const EMPTY_SHELF_IMG = emptyShelfImg;

export function MyShelfPage() {
  const {
    favoriteBooks,
    recentBooks,
    allAvailableBooks,
    notes,
    isFavorite,
    toggleFavorite,
    openBookPreview,
    openMysteryBook,
    clearRecent,
  } = useLibrary();
  const [emptyImgFailed, setEmptyImgFailed] = useState(false);

  const annotatedBooks = useMemo(
    () =>
      allAvailableBooks
        .map((book) => ({ book, note: notes[book.id]?.trim() ?? "" }))
        .filter((entry) => entry.note.length > 0),
    [allAvailableBooks, notes],
  );

  return (
    <main className="mx-auto max-w-[1240px] px-5 pt-10 pb-16 sm:px-8 lg:px-12">
      {/* Personal Shelf Header */}
      <header className="border-b border-border pb-8">
        <p className="font-catalog text-[11px] font-bold tracking-[0.18em] uppercase text-muted-foreground">
          PERSONAL COLLECTION
        </p>
        <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-editorial text-4xl tracking-tight text-foreground sm:text-5xl">
              My Shelf
            </h1>
            <p className="mt-2 max-w-xl text-base text-muted-foreground">
              Your bookmarked volumes, custom tech stacks, reading passport stamps, and quiet notes
              tucked inside the margins.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-catalog text-xs tabular-nums text-muted-foreground">
              {favoriteBooks.length} {favoriteBooks.length === 1 ? "SAVED VOLUME" : "SAVED VOLUMES"}
            </span>
            <button
              type="button"
              onClick={() => openMysteryBook("random")}
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-md border border-border bg-card px-4 py-2 text-xs font-medium text-foreground transition-colors hover:bg-muted"
            >
              <Shuffle size={13} className="text-primary" />
              Pick a book for me!
            </button>
          </div>
        </div>
      </header>

      {/* Saved Books Showcase */}
      <section aria-labelledby="saved-books-heading" className="mt-10">
        <h2 id="saved-books-heading" className="sr-only">
          Saved technologies
        </h2>

        {favoriteBooks.length === 0 ? (
          <div className="mx-auto flex max-w-lg flex-col items-center rounded-lg border border-border bg-card px-6 py-10 text-center">
            {!emptyImgFailed ? (
              <div className="w-72 overflow-hidden rounded-md bg-[#F8F3E9] p-2">
                <img
                  src={EMPTY_SHELF_IMG}
                  alt="An empty wooden bookshelf waiting for books, with a small potted fern, brass bookend, and lavender ribbon bookmark"
                  referrerPolicy="no-referrer"
                  onError={() => setEmptyImgFailed(true)}
                  className="plate-blend-light aspect-[4/3] w-full rounded object-cover"
                />
              </div>
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted text-primary">
                <Bookmark size={28} />
              </div>
            )}

            <h3 className="mt-5 font-editorial text-2xl text-foreground">
              Your personal shelf is waiting
            </h3>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Tap the bookmark icon on any book across the library to tuck your favorite references
              onto this wooden shelf.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Browse the bookshelves
                <ArrowRight size={15} />
              </Link>
              <Link
                to="/explore"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                Search catalogue
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Illustrated Wooden Shelf Arrangement */}
            <div>
              <div className="shelf-scroll shelf-perspective overflow-x-auto pt-14 pb-1">
                <div className="flex min-w-max items-end gap-4 px-4">
                  <BrassBookend side="left" />
                  {favoriteBooks.map((book) => (
                    <Book
                      key={book.id}
                      book={book}
                      isFavorite={true}
                      onSelect={openBookPreview}
                      onToggleFavorite={toggleFavorite}
                    />
                  ))}
                  <BrassBookend side="right" />
                </div>
              </div>
              <div aria-hidden="true">
                <div className="wooden-plank-top h-3 rounded-t-[2px] border-x border-t border-[#51443C]/25 dark:border-black/40" />
                <div className="wooden-plank-face h-3.5 rounded-b-[3px] border border-[#51443C]/30 dark:border-black/50" />
              </div>
            </div>

            {/* Saved Index List with Remove Controls */}
            <div>
              <h3 className="font-catalog text-[11px] tracking-[0.15em] uppercase text-muted-foreground">
                SHELF MANIFEST
              </h3>
              <div className="mt-3 divide-y divide-border rounded-lg border border-border bg-card">
                {favoriteBooks.map((book) => (
                  <div
                    key={book.id}
                    className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2.5">
                        <span className="font-catalog text-[11px] text-muted-foreground">
                          {book.catalogNo}
                        </span>
                        <button
                          type="button"
                          onClick={() => openBookPreview(book)}
                          className="font-editorial text-xl text-foreground transition-colors hover:text-primary"
                        >
                          {book.name}
                        </button>
                        <span className="text-xs text-muted-foreground">· {book.category}</span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{book.description}</p>
                    </div>

                    <div className="flex shrink-0 items-center gap-3">
                      <a
                        href={book.docs}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted"
                      >
                        Official docs <ExternalLink size={12} />
                      </a>
                      <button
                        type="button"
                        onClick={() => toggleFavorite(book.id)}
                        aria-label={`Remove ${book.name} from My Shelf`}
                        className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-destructive"
                      >
                        <Trash2 size={13} />
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Custom Tech Stack Builder */}
      <TechStacksSection />

      {/* Developer Reading Passport */}
      <ReadingPassport />

      {/* Bookmarks & Marginalia Notes */}
      <section aria-labelledby="marginalia-heading" className="mt-14 border-t border-border pt-12">
        <div className="flex items-baseline justify-between gap-4">
          <div>
            <p className="inline-flex items-center gap-1.5 font-catalog text-[11px] tracking-[0.16em] uppercase text-muted-foreground">
              <NotebookPen size={12} className="text-primary" /> PERSONAL ANNOTATIONS
            </p>
            <h2 id="marginalia-heading" className="mt-1 font-editorial text-3xl text-foreground">
              Bookmarks &amp; marginalia
            </h2>
          </div>
          <span className="font-catalog text-xs tabular-nums text-muted-foreground">
            {annotatedBooks.length} {annotatedBooks.length === 1 ? "NOTE" : "NOTES"}
          </span>
        </div>

        {annotatedBooks.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">
            Open any volume&apos;s inside cover and jot down reminders, snippets, or project ideas —
            your marginalia will gather quietly here.
          </p>
        ) : (
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            {annotatedBooks.map(({ book, note }) => (
              <article
                key={book.id}
                className="flex flex-col justify-between rounded-lg border border-border bg-card p-5"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-catalog text-[10px] tracking-wider uppercase text-muted-foreground">
                      {book.catalogNo} · {book.category}
                    </span>
                    <button
                      type="button"
                      onClick={() => openBookPreview(book)}
                      className="text-xs font-medium text-primary hover:underline"
                    >
                      Edit note
                    </button>
                  </div>
                  <h3 className="mt-1 font-editorial text-2xl text-foreground">
                    <button
                      type="button"
                      onClick={() => openBookPreview(book)}
                      className="text-left hover:text-primary"
                    >
                      {book.name}
                    </button>
                  </h3>
                  <p className="mt-2 whitespace-pre-line rounded-md border border-border/70 bg-background/70 px-3.5 py-2.5 text-sm leading-relaxed text-foreground/90">
                    {note}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Recently Explored Section */}
      <section
        aria-labelledby="recently-explored-heading"
        className="mt-14 border-t border-border pt-10"
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-catalog text-[10px] tracking-[0.16em] uppercase text-muted-foreground">
              READING HISTORY
            </p>
            <h2
              id="recently-explored-heading"
              className="mt-1 font-editorial text-2xl text-foreground sm:text-3xl"
            >
              Recently explored
            </h2>
          </div>

          {recentBooks.length > 0 && (
            <button
              type="button"
              onClick={clearRecent}
              className="text-xs font-medium text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
            >
              Clear history
            </button>
          )}
        </div>

        {recentBooks.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">
            Volumes you open in the reading room will appear here for easy return.
          </p>
        ) : (
          <div className="mt-6">
            <div className="flex items-end gap-4 overflow-x-auto pt-12 pb-1 shelf-scroll shelf-perspective">
              {recentBooks.map((book) => (
                <Book
                  key={book.id}
                  book={book}
                  isFavorite={isFavorite(book.id)}
                  onSelect={openBookPreview}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
            <div aria-hidden="true">
              <div className="wooden-plank-top h-3 rounded-t-[2px] border-x border-t border-[#51443C]/25 dark:border-black/40" />
              <div className="wooden-plank-face h-3.5 rounded-b-[3px] border border-[#51443C]/30 dark:border-black/50" />
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

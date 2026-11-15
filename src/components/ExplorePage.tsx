import { useMemo, useState } from "react";
import {
  ArrowDownAZ,
  ArrowUpAZ,
  Bookmark,
  Check,
  ExternalLink,
  FileText,
  LayoutGrid,
  Search,
  Sparkles,
} from "lucide-react";
import emptySearchImg from "@/assets/images/empty_search_illustration_1794753860858.jpg";
import { Book } from "@/components/Book";
import { CategoryFilters } from "@/components/CategoryFilters";
import { LearningAdventures } from "@/components/LearningAdventures";
import { SearchBar } from "@/components/SearchBar";
import {
  collections,
  filterCatalog,
  type ShelfCategory,
  type SortOrder,
} from "@/lib/devshelf-catalog";
import { getBookEnrichment } from "@/lib/devshelf-enrichments";
import { useLibrary } from "@/lib/library-storage";

const EMPTY_SEARCH_IMG = emptySearchImg;
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function ExplorePage() {
  const { allAvailableBooks, isFavorite, openBookPreview, toggleFavorite, notes } = useLibrary();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"All" | ShelfCategory>("All");
  const [sortOrder, setSortOrder] = useState<SortOrder>("curated");
  const [viewMode, setViewMode] = useState<"thumbnails" | "cards">("thumbnails");
  const [letterFilter, setLetterFilter] = useState<string>("All");
  const [emptyImgFailed, setEmptyImgFailed] = useState(false);

  const baseFiltered = useMemo(
    () => filterCatalog(allAvailableBooks, query, category, sortOrder),
    [allAvailableBooks, query, category, sortOrder],
  );

  const availableLetters = useMemo(() => {
    const set = new Set<string>();
    for (const book of baseFiltered) {
      const first = book.name.charAt(0).toUpperCase();
      if (/[A-Z]/.test(first)) set.add(first);
    }
    return set;
  }, [baseFiltered]);

  const filtered = useMemo(() => {
    if (letterFilter === "All") return baseFiltered;
    return baseFiltered.filter((book) => book.name.charAt(0).toUpperCase() === letterFilter);
  }, [baseFiltered, letterFilter]);

  const recentlyAddedBooks = useMemo(
    () => allAvailableBooks.filter((t) => t.recentlyAdded),
    [allAvailableBooks],
  );

  const popularCollections = useMemo(() => collections.filter((c) => c.popular), []);

  const isDefaultBrowse =
    query.trim() === "" && category === "All" && sortOrder === "curated" && letterFilter === "All";

  return (
    <main className="mx-auto max-w-[1240px] px-5 pt-10 pb-16 sm:px-8 lg:px-12">
      {/* Editorial Catalogue Header */}
      <header className="border-b border-border pb-8">
        <p className="font-catalog text-[11px] font-bold tracking-[0.18em] uppercase text-muted-foreground">
          THE CARD CATALOGUE
        </p>
        <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="font-editorial text-4xl tracking-tight text-foreground sm:text-5xl">
              Explore the library
            </h1>
            <p className="mt-2 max-w-2xl text-base text-muted-foreground">
              Browse every volume by shelf, flip through vintage index cards from A to Z, or follow
              a guided learning adventure.
            </p>
          </div>
          <p className="font-catalog text-xs tracking-wider uppercase text-muted-foreground">
            {allAvailableBooks.length} INDEXED EDITIONS
          </p>
        </div>

        {/* Search + Filter + View Mode + Alphabetical Sorting Toolbar */}
        <div className="mt-7 space-y-4">
          <SearchBar value={query} onChange={setQuery} resultCount={filtered.length} />

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <CategoryFilters
              selected={category}
              onSelect={(cat) => {
                setCategory(cat);
                setLetterFilter("All");
              }}
            />

            <div className="flex flex-wrap items-center gap-2 self-start">
              {/* Old Library Catalogue Toggle */}
              <div
                role="group"
                aria-label="Catalogue display mode"
                className="inline-flex shrink-0 items-center gap-1 rounded-md border border-border bg-card p-1"
              >
                <button
                  type="button"
                  onClick={() => setViewMode("thumbnails")}
                  className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded px-2.5 py-1.5 text-xs font-medium transition-colors ${
                    viewMode === "thumbnails"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <LayoutGrid size={13} />
                  Shelves
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("cards")}
                  className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded px-2.5 py-1.5 text-xs font-medium transition-colors ${
                    viewMode === "cards"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <FileText size={13} />
                  Index Cards
                </button>
              </div>

              {/* Alphabetical Sort Control */}
              <div
                role="group"
                aria-label="Sort catalogue"
                className="inline-flex shrink-0 items-center gap-1 rounded-md border border-border bg-card p-1"
              >
                <button
                  type="button"
                  onClick={() => setSortOrder("curated")}
                  className={`whitespace-nowrap rounded px-2.5 py-1.5 text-xs font-medium transition-colors ${
                    sortOrder === "curated"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Curated
                </button>
                <button
                  type="button"
                  onClick={() => setSortOrder("az")}
                  className={`inline-flex items-center gap-1 whitespace-nowrap rounded px-2.5 py-1.5 text-xs font-medium transition-colors ${
                    sortOrder === "az"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <ArrowDownAZ size={13} />
                  A–Z
                </button>
                <button
                  type="button"
                  onClick={() => setSortOrder("za")}
                  className={`inline-flex items-center gap-1 whitespace-nowrap rounded px-2.5 py-1.5 text-xs font-medium transition-colors ${
                    sortOrder === "za"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <ArrowUpAZ size={13} />
                  Z–A
                </button>
              </div>
            </div>
          </div>

          {/* A–Z Index Drawer Tabs */}
          <div
            role="group"
            aria-label="Filter by starting letter"
            className="flex flex-wrap items-center gap-1 pt-1"
          >
            <span className="mr-1.5 font-catalog text-[10px] tracking-wider uppercase text-muted-foreground">
              DRAWER:
            </span>
            <button
              type="button"
              onClick={() => setLetterFilter("All")}
              className={`rounded px-2 py-0.5 font-catalog text-[11px] transition-colors ${
                letterFilter === "All"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              ALL
            </button>
            {ALPHABET.map((letter) => {
              const hasEntries = availableLetters.has(letter);
              const active = letterFilter === letter;
              return (
                <button
                  key={letter}
                  type="button"
                  disabled={!hasEntries}
                  onClick={() => setLetterFilter(active ? "All" : letter)}
                  className={`rounded px-1.5 py-0.5 font-catalog text-[11px] transition-colors ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : hasEntries
                        ? "text-foreground hover:bg-muted"
                        : "cursor-not-allowed text-muted-foreground/30"
                  }`}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Recently Added & Popular Collections (shown when browsing unfiltered) */}
      {isDefaultBrowse && (
        <>
          <div className="mt-10 grid grid-cols-1 gap-10 border-b border-border pb-12 lg:grid-cols-[1.2fr_0.8fr]">
            {/* Recently Added Shelf Strip */}
            <section aria-labelledby="recently-added-heading">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-catalog text-[10px] tracking-[0.16em] uppercase text-muted-foreground">
                    NEW ARRIVALS
                  </p>
                  <h2
                    id="recently-added-heading"
                    className="mt-1 font-editorial text-2xl text-foreground"
                  >
                    Recently added to the shelves
                  </h2>
                </div>
                <span className="font-catalog text-xs text-muted-foreground">
                  {recentlyAddedBooks.length} VOLUMES
                </span>
              </div>

              <div className="mt-5 flex items-end gap-4 overflow-x-auto pt-12 pb-2 shelf-scroll shelf-perspective">
                {recentlyAddedBooks.map((book) => (
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
                <div className="wooden-plank-top h-2.5 rounded-t-[2px] border-x border-t border-[#51443C]/20" />
                <div className="wooden-plank-face h-3 rounded-b-[2px] border border-[#51443C]/25" />
              </div>
            </section>

            {/* Popular Collections Index */}
            <section aria-labelledby="popular-collections-heading">
              <p className="font-catalog text-[10px] tracking-[0.16em] uppercase text-muted-foreground">
                READER FAVORITES
              </p>
              <h2
                id="popular-collections-heading"
                className="mt-1 font-editorial text-2xl text-foreground"
              >
                Popular collections
              </h2>

              <div className="mt-5 divide-y divide-border rounded-lg border border-border bg-card">
                {popularCollections.map((col) => {
                  const count = allAvailableBooks.filter((t) => t.category === col.category).length;
                  return (
                    <button
                      key={col.id}
                      type="button"
                      onClick={() => setCategory(col.category)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-muted/70 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            aria-hidden="true"
                            className="h-2.5 w-2.5 shrink-0 rounded-full border border-black/15"
                            style={{ backgroundColor: col.accentHex }}
                          />
                          <span className="font-editorial text-lg text-foreground">
                            {col.title}
                          </span>
                        </div>
                        <p className="mt-0.5 truncate text-xs text-muted-foreground">
                          {col.subtitle}
                        </p>
                      </div>
                      <span className="font-catalog shrink-0 text-xs tabular-nums text-muted-foreground">
                        {count} vols →
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
          </div>

          <LearningAdventures />
        </>
      )}

      {/* Catalogue Entries / Empty State */}
      <section aria-labelledby="catalogue-results-heading" className="mt-10">
        <div className="flex items-baseline justify-between">
          <h2 id="catalogue-results-heading" className="font-editorial text-2xl text-foreground">
            {category === "All" ? "Full shelf index" : `${category} index`}
            {letterFilter !== "All" ? ` · Drawer ${letterFilter}` : ""}
          </h2>
          <span className="font-catalog text-xs tabular-nums text-muted-foreground">
            SHOWING {filtered.length} OF {allAvailableBooks.length}
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className="mx-auto mt-10 flex max-w-md flex-col items-center rounded-lg border border-border bg-card px-6 py-10 text-center">
            {!emptyImgFailed ? (
              <div className="w-64 overflow-hidden rounded-md bg-[#F8F3E9] p-2">
                <img
                  src={EMPTY_SEARCH_IMG}
                  alt="A small stack of vintage clothbound books with a brass magnifying glass"
                  referrerPolicy="no-referrer"
                  onError={() => setEmptyImgFailed(true)}
                  className="plate-blend-light aspect-[4/3] w-full rounded object-cover"
                />
              </div>
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted text-primary">
                <Search size={28} />
              </div>
            )}

            <h3 className="mt-5 font-editorial text-2xl text-foreground">Not on this shelf yet</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              We couldn&apos;t find any volume matching your current filters. Try another keyword or
              reset your drawer selection.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("All");
                setSortOrder("curated");
                setLetterFilter("All");
              }}
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Sparkles size={14} />
              Show entire library
            </button>
          </div>
        ) : viewMode === "cards" ? (
          /* Vintage Library Index Card View */
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((book) => {
              const saved = isFavorite(book.id);
              const enrichment = getBookEnrichment(book);
              const hasNote = Boolean(notes[book.id]?.trim());
              return (
                <article
                  key={book.id}
                  className="relative flex flex-col justify-between overflow-hidden rounded-md border border-border bg-card shadow-xs"
                >
                  {/* Classic Red Catalogue Top Rule & Perforation Hole */}
                  <div className="border-b-2 border-[#C77D8A]/55 bg-secondary/45 px-5 py-3">
                    <div className="flex items-center justify-between font-catalog text-[10px] tracking-[0.14em] uppercase text-muted-foreground">
                      <span>{book.catalogNo}</span>
                      <span>{book.category}</span>
                    </div>
                  </div>

                  {/* Ruled Index Card Body */}
                  <div className="flex-1 space-y-2.5 px-5 py-4">
                    <div className="flex items-baseline justify-between gap-2 border-b border-border/60 pb-2">
                      <h3 className="font-editorial text-2xl text-foreground">
                        <button
                          type="button"
                          onClick={() => openBookPreview(book)}
                          className="text-left transition-colors hover:text-primary"
                        >
                          {book.name}
                        </button>
                      </h3>
                      <span className="font-catalog shrink-0 text-[10px] text-muted-foreground">
                        {enrichment.edition.version}
                      </span>
                    </div>

                    <p className="border-b border-border/50 pb-2 text-xs leading-relaxed text-foreground/85">
                      {book.description}
                    </p>

                    <p className="font-catalog text-[10px] tracking-wider uppercase text-muted-foreground">
                      {enrichment.difficulty} · {book.yearReleased}
                      {hasNote ? " · Marginalia saved" : ""}
                    </p>

                    <p className="text-xs italic leading-relaxed text-muted-foreground">
                      &ldquo;{book.curatorNote}&rdquo;
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="flex items-center justify-between border-t border-border bg-background/50 px-5 py-3 text-xs">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => openBookPreview(book)}
                        className="font-medium text-foreground underline decoration-border underline-offset-4 hover:text-primary"
                      >
                        Inspect
                      </button>
                      <a
                        href={book.docs}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
                      >
                        Docs <ExternalLink size={11} />
                      </a>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        aria-hidden="true"
                        className="h-3 w-3 rounded-full border border-border bg-background"
                        title="Catalogue rod hole"
                      />
                      <button
                        type="button"
                        onClick={() => toggleFavorite(book.id)}
                        aria-pressed={saved}
                        className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
                      >
                        {saved ? (
                          <Check size={12} className="text-primary" />
                        ) : (
                          <Bookmark size={12} />
                        )}
                        {saved ? "Saved" : "Save"}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2">
            {filtered.map((book) => {
              const saved = isFavorite(book.id);
              const enrichment = getBookEnrichment(book);
              return (
                <article
                  key={book.id}
                  className="flex items-center gap-5 border-b border-border pb-7"
                >
                  {/* Miniature 3D Book Cover Thumbnail */}
                  <div className="shelf-perspective shrink-0 scale-[0.82] origin-left -mr-4">
                    <Book
                      book={book}
                      isFavorite={saved}
                      onSelect={openBookPreview}
                      onToggleFavorite={toggleFavorite}
                    />
                  </div>

                  {/* Book Catalogue Metadata */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 font-catalog text-[10px] tracking-wider uppercase text-muted-foreground">
                      <span>{book.catalogNo}</span>
                      <span aria-hidden="true">·</span>
                      <span>{book.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{enrichment.difficulty}</span>
                    </div>

                    <h3 className="mt-1 font-editorial text-2xl text-foreground">
                      <button
                        type="button"
                        onClick={() => openBookPreview(book)}
                        className="text-left transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                      >
                        {book.name}
                      </button>
                    </h3>

                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {book.description}
                    </p>

                    {/* Unboxed Metadata Tags */}
                    <p className="mt-2 font-catalog text-[11px] text-muted-foreground/85">
                      {book.tags.join(" · ")}
                    </p>

                    <div className="mt-3.5 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => openBookPreview(book)}
                        className="text-xs font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
                      >
                        Inspect volume
                      </button>
                      <span aria-hidden="true" className="text-border">
                        ·
                      </span>
                      <a
                        href={book.docs}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                      >
                        Official docs <ExternalLink size={11} />
                      </a>
                      <span aria-hidden="true" className="text-border">
                        ·
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleFavorite(book.id)}
                        aria-pressed={saved}
                        className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {saved ? (
                          <Check size={12} className="text-primary" />
                        ) : (
                          <Bookmark size={12} />
                        )}
                        {saved ? "Saved" : "Save"}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}

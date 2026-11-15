import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Book } from "@/components/Book";
import { BrassBookend, ShelfPropCluster } from "@/components/ShelfProps";
import type { CollectionMeta, Technology } from "@/lib/devshelf-catalog";

type CollectionSectionProps = {
  collection: CollectionMeta;
  books: Technology[];
  isFavorite: (id: string) => boolean;
  onSelectBook: (book: Technology) => void;
  onToggleFavorite: (id: string) => void;
};

export function CollectionSection({
  collection,
  books,
  isFavorite,
  onSelectBook,
  onToggleFavorite,
}: CollectionSectionProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const syncScrollControls = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 6);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 6);
  }, []);

  useEffect(() => {
    syncScrollControls();
    window.addEventListener("resize", syncScrollControls);
    return () => window.removeEventListener("resize", syncScrollControls);
  }, [syncScrollControls, books.length]);

  function scrollShelf(direction: "prev" | "next") {
    const el = scrollerRef.current;
    if (!el) return;
    const distance = Math.max(240, el.clientWidth * 0.65);
    el.scrollBy({
      left: direction === "next" ? distance : -distance,
      behavior: "smooth",
    });
  }

  return (
    <section
      id={collection.id}
      aria-labelledby={`${collection.id}-heading`}
      className="scroll-mt-24 pt-10 first:pt-2"
    >
      {/* Editorial Collection Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="inline-block h-2.5 w-5 rounded-[2px] border border-[#3A2E27]/20"
              style={{ backgroundColor: collection.accentHex }}
            />
            <span className="font-catalog text-[11px] tracking-[0.14em] uppercase text-muted-foreground">
              {collection.kicker}
            </span>
          </div>
          <h3
            id={`${collection.id}-heading`}
            className="mt-1.5 font-editorial text-2xl tracking-tight text-foreground sm:text-3xl"
          >
            {collection.title}
          </h3>
          <p className="mt-1 max-w-xl text-sm text-muted-foreground">{collection.subtitle}</p>
        </div>

        {/* Volume count + Previous / Next shelf controls */}
        <div className="flex items-center gap-3 self-start sm:self-end">
          <span className="font-catalog text-xs tabular-nums text-muted-foreground">
            {String(books.length).padStart(2, "0")} {books.length === 1 ? "VOLUME" : "VOLUMES"}
          </span>

          <div
            className="flex items-center gap-1.5"
            role="group"
            aria-label={`Browse ${collection.title}`}
          >
            <button
              type="button"
              onClick={() => scrollShelf("prev")}
              disabled={!canScrollLeft}
              aria-label={`Scroll ${collection.title} left`}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => scrollShelf("next")}
              disabled={!canScrollRight}
              aria-label={`Scroll ${collection.title} right`}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Physical Illustrated Wooden Shelf */}
      <div className="relative mt-4">
        <div
          ref={scrollerRef}
          onScroll={syncScrollControls}
          className="shelf-scroll shelf-perspective relative overflow-x-auto overflow-y-visible pt-16 pb-1"
        >
          <div className="flex min-w-max items-end gap-3.5 px-3 sm:gap-4 sm:px-5">
            <BrassBookend side="left" />

            {books.map((book) => (
              <Book
                key={book.id}
                book={book}
                isFavorite={isFavorite(book.id)}
                onSelect={onSelectBook}
                onToggleFavorite={onToggleFavorite}
              />
            ))}

            <BrassBookend side="right" />
            <ShelfPropCluster variant={collection.propVariant} />
          </div>
        </div>

        {/* Two-plane Walnut Wooden Shelf Ledge */}
        <div aria-hidden="true" className="relative z-10">
          <div className="wooden-plank-top h-3 rounded-t-[2px] border-x border-t border-[#51443C]/25 dark:border-black/40" />
          <div className="wooden-plank-face relative h-3.5 rounded-b-[3px] border border-[#51443C]/30 dark:border-black/50">
            <div className="mx-6 mt-1 h-px bg-white/25 dark:bg-white/10" />
          </div>
        </div>
      </div>
    </section>
  );
}

import { useState } from "react";
import { EyeOff, SlidersHorizontal, Sparkles } from "lucide-react";
import { CollectionSection } from "@/components/CollectionSection";
import { collections, type ShelfCategory } from "@/lib/devshelf-catalog";
import { librarianQuotes } from "@/lib/devshelf-adventures";
import { useLibrary } from "@/lib/library-storage";

function SleepyShelfCat({ onPet }: { onPet: () => void }) {
  return (
    <div className="mx-auto mt-2 flex max-w-[1240px] justify-end px-8">
      <button
        type="button"
        onClick={onPet}
        aria-label="Pet the sleepy shelf cat"
        title="Psst... a sleepy cat on the shelf"
        className="group -mb-3 inline-flex items-center gap-2 rounded-t-md px-2 py-1 text-muted-foreground transition-transform hover:-translate-y-0.5"
      >
        <svg width="42" height="28" viewBox="0 0 42 28" fill="none" aria-hidden="true">
          <path
            d="M8 24C8 15 14 11 22 11C28 11 33 15 34 21C35 23 37 24 39 24H8Z"
            fill="#E5BFA6"
            stroke="#51443C"
            strokeWidth="1.3"
          />
          <path d="M12 14L11 7L16 11" fill="#E5BFA6" stroke="#51443C" strokeWidth="1.3" />
          <path d="M18 11L20 7L22 11" fill="#E5BFA6" stroke="#51443C" strokeWidth="1.3" />
          <path
            d="M13 17C14 18 15.5 18 16.5 17"
            stroke="#51443C"
            strokeWidth="1.1"
            strokeLinecap="round"
          />
          <path
            d="M33 22C37 22 39 19 37 16"
            stroke="#51443C"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>
        <span className="font-catalog text-[9px] opacity-0 transition-opacity group-hover:opacity-100">
          purr?
        </span>
      </button>
    </div>
  );
}

export function Bookshelf() {
  const {
    allAvailableBooks,
    isFavorite,
    openBookPreview,
    toggleFavorite,
    preferences,
    setPersonalizeOpen,
    openMysteryBook,
    quietMode,
    toggleQuietMode,
    notify,
  } = useLibrary();
  const [selectedCategory, setSelectedCategory] = useState<"All" | ShelfCategory>("All");
  const [quoteIdx, setQuoteIdx] = useState(0);

  const orderedCollections = preferences.categoryOrder
    .map((cat) => collections.find((c) => c.category === cat))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  const visibleCollections =
    selectedCategory === "All"
      ? orderedCollections
      : orderedCollections.filter((c) => c.category === selectedCategory);

  function handlePetCat() {
    const quote = librarianQuotes[quoteIdx % librarianQuotes.length]!;
    setQuoteIdx((i) => i + 1);
    notify("Mochi purrs softly", quote);
  }

  return (
    <section
      id="collections"
      aria-labelledby="bookshelf-heading"
      className={`mx-auto max-w-[1240px] px-5 pt-12 pb-16 sm:px-8 lg:px-12 ${
        preferences.density === "compact" ? "space-y-6" : ""
      }`}
    >
      {/* Bookshelf Intro & Controls */}
      {!quietMode && (
        <div className="flex flex-col gap-5 border-b border-border pb-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="font-catalog text-[11px] tracking-[0.16em] uppercase text-muted-foreground">
                CURATED COLLECTIONS · {allAvailableBooks.length} VOLUMES
              </p>
              <h2
                id="bookshelf-heading"
                className="mt-2 font-editorial text-3xl text-foreground sm:text-4xl"
              >
                Browse the shelves
              </h2>
              <p className="mt-1.5 max-w-xl text-sm text-muted-foreground">
                Pick up any volume to read its inside cover, leave personal notes, or step straight
                into official docs.
              </p>
            </div>

            {/* Library Toolbar Utilities */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => openMysteryBook("random")}
                className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-md border border-border bg-card px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-muted"
              >
                <Sparkles size={13} className="text-primary" />
                Pick a book for me!
              </button>
              <button
                type="button"
                onClick={() => setPersonalizeOpen(true)}
                className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-md border border-border bg-card px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-muted"
              >
                <SlidersHorizontal size={13} />
                Personalize
              </button>
              <button
                type="button"
                onClick={toggleQuietMode}
                className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-md border border-border bg-card px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <EyeOff size={13} />
                Quiet mode
              </button>
            </div>
          </div>

          {/* Interactive Collection Filter Tabs */}
          <div
            role="tablist"
            aria-label="Filter shelves by collection"
            className="flex items-center gap-1.5 overflow-x-auto pb-1 shelf-scroll"
          >
            <button
              type="button"
              role="tab"
              aria-selected={selectedCategory === "All"}
              onClick={() => setSelectedCategory("All")}
              className={`shrink-0 whitespace-nowrap rounded-md px-3 py-2 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
                selectedCategory === "All"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              All Shelves
            </button>
            {orderedCollections.map((collection) => {
              const active = selectedCategory === collection.category;
              return (
                <button
                  key={collection.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedCategory(collection.category)}
                  className={`shrink-0 whitespace-nowrap rounded-md px-3 py-2 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {collection.category}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Shelves Stack */}
      <div className={preferences.density === "compact" ? "mt-6 space-y-6" : "mt-8 space-y-12"}>
        {visibleCollections.map((collection, idx) => {
          const shelfBooks = allAvailableBooks.filter((t) => t.category === collection.category);
          return (
            <div key={collection.id}>
              {idx === 2 && !quietMode && <SleepyShelfCat onPet={handlePetCat} />}
              <CollectionSection
                collection={collection}
                books={shelfBooks}
                isFavorite={isFavorite}
                onSelectBook={openBookPreview}
                onToggleFavorite={toggleFavorite}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

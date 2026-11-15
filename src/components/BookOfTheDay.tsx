import { BookOpen, ExternalLink, Sparkles } from "lucide-react";
import { Book } from "@/components/Book";
import { getBookEnrichment, getBookOfTheDay, getRelatedBooks } from "@/lib/devshelf-enrichments";
import { useLibrary } from "@/lib/library-storage";

export function BookOfTheDay() {
  const { isFavorite, toggleFavorite, openBookPreview, allAvailableBooks } = useLibrary();
  const featured = getBookOfTheDay();
  const enrichment = getBookEnrichment(featured);
  const related = getRelatedBooks(featured, allAvailableBooks);

  return (
    <section
      aria-labelledby="book-of-day-heading"
      className="mx-auto max-w-[1240px] px-5 pt-10 sm:px-8 lg:px-12"
    >
      <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
        <div className="grid grid-cols-1 items-center gap-8 px-6 py-7 sm:px-8 lg:grid-cols-[260px_1fr]">
          {/* Left: Propped on a Wooden Reading Stand */}
          <div className="flex flex-col items-center">
            <div className="shelf-perspective relative flex flex-col items-center pt-2">
              <div className="origin-bottom -rotate-2 scale-[0.86] sm:scale-[0.9]">
                <Book
                  book={featured}
                  variant="large"
                  isFavorite={isFavorite(featured.id)}
                  onSelect={openBookPreview}
                  onToggleFavorite={toggleFavorite}
                />
              </div>
              {/* Illustrated Wooden Bookstand Base */}
              <div aria-hidden="true" className="-mt-3 w-56">
                <div className="wooden-plank-top h-2.5 rounded-t-[2px] border-x border-t border-[#51443C]/25" />
                <div className="wooden-plank-face flex h-4 items-center justify-center rounded-b-[3px] border border-[#51443C]/30">
                  <span className="font-catalog text-[8px] tracking-[0.22em] uppercase text-[#FDFBF6]/80">
                    TODAY&apos;S FEATURED STAND
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Editorial Spotlight Details */}
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-catalog text-[11px] tracking-[0.14em] uppercase text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 text-primary font-bold">
                <Sparkles size={12} /> BOOK OF THE DAY
              </span>
              <span aria-hidden="true">·</span>
              <span>{featured.category}</span>
              <span aria-hidden="true">·</span>
              <span>{enrichment.difficulty}</span>
              <span aria-hidden="true">·</span>
              <span>{enrichment.edition.version}</span>
            </div>

            <h2
              id="book-of-day-heading"
              className="mt-2 font-editorial text-3xl text-foreground sm:text-4xl"
            >
              {featured.name}
            </h2>

            <p className="mt-2.5 max-w-2xl text-base leading-relaxed text-foreground/90">
              {featured.description} {featured.curatorNote}
            </p>

            {/* Fun Fact Inset */}
            <div className="mt-4 rounded-md border border-border bg-secondary/55 px-4 py-3">
              <p className="font-catalog text-[10px] tracking-[0.14em] uppercase text-muted-foreground">
                LIBRARIAN&apos;S FUN FACT
              </p>
              <p className="mt-1 text-sm leading-relaxed text-foreground/85">
                {enrichment.funFact}
              </p>
            </div>

            {/* CTAs & Related Volumes */}
            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href={featured.docs}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Open official documentation
                  <ExternalLink size={14} />
                </a>

                <button
                  type="button"
                  onClick={() => openBookPreview(featured)}
                  className="inline-flex items-center gap-2 whitespace-nowrap rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  <BookOpen size={14} />
                  Read inside cover
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <span className="font-catalog text-[10px] tracking-wider uppercase">
                  Paired with:
                </span>
                {related.map((rel, idx) => (
                  <span key={rel.id} className="inline-flex items-center gap-2">
                    {idx > 0 && <span aria-hidden="true">·</span>}
                    <button
                      type="button"
                      onClick={() => openBookPreview(rel)}
                      className="font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
                    >
                      {rel.name}
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

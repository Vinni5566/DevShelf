import { useMemo } from "react";
import { Check, Compass } from "lucide-react";
import { TechLogo } from "@/components/TechLogo";
import { learningAdventures } from "@/lib/devshelf-adventures";
import { useLibrary } from "@/lib/library-storage";

export function LearningAdventures() {
  const { allAvailableBooks, exploredIds, openBookPreview } = useLibrary();

  const bookMap = useMemo(
    () => new Map(allAvailableBooks.map((b) => [b.id, b])),
    [allAvailableBooks],
  );

  return (
    <section aria-labelledby="adventures-heading" className="mt-12 border-b border-border pb-12">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="inline-flex items-center gap-1.5 font-catalog text-[11px] tracking-[0.16em] uppercase text-muted-foreground">
            <Compass size={12} className="text-primary" /> GUIDED READING TRAILS
          </p>
          <h2 id="adventures-heading" className="mt-1 font-editorial text-3xl text-foreground">
            Learning adventures
          </h2>
          <p className="mt-1 max-w-xl text-sm text-muted-foreground">
            Follow curated sequences of books to build new mental models step by step.
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
        {learningAdventures.map((trail) => {
          const steps = trail.bookIds.map((id) => bookMap.get(id)).filter((b) => Boolean(b));
          const completedCount = trail.bookIds.filter((id) => exploredIds.includes(id)).length;
          return (
            <article key={trail.id} className="rounded-lg border border-border bg-card p-5">
              <div className="flex items-center justify-between gap-2">
                <span className="font-catalog text-[10px] tracking-widest uppercase text-muted-foreground">
                  {trail.kicker}
                </span>
                <span className="font-catalog text-[11px] tabular-nums text-primary">
                  {completedCount}/{steps.length} EXPLORED
                </span>
              </div>

              <h3 className="mt-1.5 font-editorial text-2xl text-foreground">{trail.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{trail.description}</p>

              {/* Trail Steps */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {steps.map((book, idx) => {
                  if (!book) return null;
                  const done = exploredIds.includes(book.id);
                  return (
                    <div key={book.id} className="flex items-center gap-2">
                      {idx > 0 && (
                        <span aria-hidden="true" className="text-xs text-muted-foreground">
                          →
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => openBookPreview(book)}
                        className={`inline-flex items-center gap-1.5 rounded border px-2.5 py-1.5 text-xs font-medium transition-colors ${
                          done
                            ? "border-primary/50 bg-secondary text-foreground"
                            : "border-border bg-background text-foreground hover:border-primary"
                        }`}
                      >
                        {done ? (
                          <Check size={12} className="text-primary" />
                        ) : (
                          <TechLogo techId={book.id} size={13} />
                        )}
                        <span>{book.name}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

import { useMemo } from "react";
import { Award, CheckCircle2 } from "lucide-react";
import { categories, type ShelfCategory } from "@/lib/devshelf-catalog";
import { passportStampDefs } from "@/lib/devshelf-adventures";
import { useLibrary } from "@/lib/library-storage";

export function ReadingPassport() {
  const { exploredIds, favorites, unlockedStampIds, allAvailableBooks } = useLibrary();

  const categoriesVisited = useMemo(() => {
    const byId = new Map(allAvailableBooks.map((b) => [b.id, b]));
    const visited = new Set<ShelfCategory>();
    for (const id of exploredIds) {
      const book = byId.get(id);
      if (book) visited.add(book.category);
    }
    return visited.size;
  }, [exploredIds, allAvailableBooks]);

  return (
    <section aria-labelledby="passport-heading" className="mt-14 border-t border-border pt-12">
      <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
        {/* Passport Cover Header */}
        <div className="flex flex-col gap-5 border-b border-border bg-secondary/55 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <p className="inline-flex items-center gap-1.5 font-catalog text-[11px] tracking-[0.16em] uppercase text-muted-foreground">
              <Award size={13} className="text-primary" /> DEVELOPER LIBRARY PASSPORT
            </p>
            <h2 id="passport-heading" className="mt-1 font-editorial text-3xl text-foreground">
              The Reading Passport
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Collect quiet ink stamps as you wander across shelves, inspect volumes, and leave
              notes in the margins.
            </p>
          </div>

          {/* Personal Milestones Strip (no leaderboards) */}
          <div className="grid grid-cols-3 gap-4 border-t border-border pt-4 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-6">
            <div>
              <p className="font-editorial text-2xl tabular-nums text-foreground">
                {exploredIds.length}
              </p>
              <p className="font-catalog text-[10px] tracking-wider uppercase text-muted-foreground">
                EXPLORED
              </p>
            </div>
            <div>
              <p className="font-editorial text-2xl tabular-nums text-foreground">
                {categoriesVisited}/{categories.length}
              </p>
              <p className="font-catalog text-[10px] tracking-wider uppercase text-muted-foreground">
                SHELVES
              </p>
            </div>
            <div>
              <p className="font-editorial text-2xl tabular-nums text-foreground">
                {favorites.length}
              </p>
              <p className="font-catalog text-[10px] tracking-wider uppercase text-muted-foreground">
                BOOKMARKED
              </p>
            </div>
          </div>
        </div>

        {/* Inked Stamp Grid */}
        <div className="p-6 sm:p-8">
          <div className="flex items-center justify-between pb-4">
            <span className="font-catalog text-[11px] tracking-wider uppercase text-muted-foreground">
              PASSPORT STAMPS
            </span>
            <span className="font-catalog text-xs tabular-nums text-primary">
              {unlockedStampIds.length} / {passportStampDefs.length} COLLECTED
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {passportStampDefs.map((stamp, idx) => {
              const unlocked = unlockedStampIds.includes(stamp.id);
              const rotation = idx % 2 === 0 ? "-rotate-1" : "rotate-1";
              return (
                <div
                  key={stamp.id}
                  className={`flex items-center gap-3.5 rounded-md border p-4 transition-colors ${
                    unlocked
                      ? "border-border bg-background"
                      : "border-dashed border-border/80 bg-background/40 opacity-65"
                  }`}
                >
                  {/* Circular Rubber Stamp Seal */}
                  <div
                    aria-hidden="true"
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 font-editorial text-base ${rotation} ${
                      unlocked
                        ? "border-[#51443C]/60 text-[#3A2E27]"
                        : "border-dashed border-border text-muted-foreground"
                    }`}
                    style={unlocked ? { backgroundColor: stamp.accentHex } : undefined}
                  >
                    {stamp.sealSymbol}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <h3 className="truncate font-editorial text-lg text-foreground">
                        {stamp.title}
                      </h3>
                      {unlocked && <CheckCircle2 size={13} className="shrink-0 text-primary" />}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {unlocked ? stamp.subtitle : stamp.requirementLabel}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

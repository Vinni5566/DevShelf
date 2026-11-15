import { useState } from "react";
import { ArrowDown, BookOpen, Calendar, LampDesk, Sparkles } from "lucide-react";
import { collections } from "@/lib/devshelf-catalog";
import { useLibrary } from "@/lib/library-storage";

const HERO_ILLUSTRATION_SRC = "/src/assets/images/hero_library_scene_1794753858832.jpg";

export function HeroSection() {
  const { openMysteryBook, allAvailableBooks, lampLit, toggleLamp } = useLibrary();
  const [imgFailed, setImgFailed] = useState(false);

  function scrollToShelves() {
    document.getElementById("collections")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section
      aria-labelledby="hero-heading"
      className="mx-auto max-w-[1240px] border-b border-border px-5 pt-8 pb-10 sm:px-8 sm:pt-12 sm:pb-12 lg:px-12"
    >
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
        {/* LEFT: Asymmetric Editorial Copy */}
        <div className="max-w-xl">
          <p className="font-catalog text-[11px] font-bold tracking-[0.18em] uppercase text-muted-foreground">
            A LIBRARY FOR THE CURIOUS
          </p>

          <h1
            id="hero-heading"
            className="mt-4 font-editorial text-[clamp(2.5rem,4.7vw,4rem)] leading-[1.06] tracking-tight text-foreground text-balance"
          >
            Somewhere between curiosity and code.
          </h1>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-[17px]">
            A little library of the technologies we love. Find your next tool, explore something
            new, or revisit an old favorite.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={scrollToShelves}
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-sm transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              Explore the library
              <ArrowDown size={15} />
            </button>

            <button
              type="button"
              onClick={() => openMysteryBook("random")}
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-md border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <Sparkles size={15} className="text-primary" />
              Pick a book for me!
            </button>

            <button
              type="button"
              onClick={() => openMysteryBook("daily")}
              className="inline-flex items-center gap-1.5 whitespace-nowrap px-2 py-2 text-xs font-medium text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
            >
              <Calendar size={13} />
              Daily mystery
            </button>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
            <span className="font-catalog">{allAvailableBooks.length} VOLUMES</span>
            <span aria-hidden="true">·</span>
            <span>{collections.length} CURATED SHELVES</span>
            <span aria-hidden="true">·</span>
            <span>OFFICIAL DOCS ONLY</span>
          </div>
        </div>

        {/* RIGHT: Illustrated Composition + Interactive Reading Lamp Easter Egg */}
        <div className="relative mx-auto w-full max-w-[440px] lg:ml-auto lg:mr-0">
          <figure className="relative overflow-hidden rounded-lg border border-border/80 bg-[#F8F3E9] p-3 shadow-[0_18px_42px_-18px_rgba(81,68,60,0.22)] dark:border-border dark:bg-[#F3ECE0] dark:shadow-[0_18px_44px_-12px_rgba(0,0,0,0.55)]">
            {/* Warm Lamp Glow Overlay when Lit */}
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
                lampLit ? "opacity-100" : "opacity-0"
              }`}
              style={{
                background:
                  "radial-gradient(circle at 68% 28%, rgba(235, 217, 156, 0.34) 0%, rgba(235, 217, 156, 0.08) 42%, transparent 72%)",
              }}
            />

            {/* Dim veil when reading lamp is switched off */}
            {!lampLit && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[#2C231D]/20 transition-opacity duration-500"
              />
            )}

            {!imgFailed ? (
              <img
                src={HERO_ILLUSTRATION_SRC}
                alt="An illustrated desk scene with an open book, a colorful stack of clothbound programming books, a warm brass reading lamp, eucalyptus leaves, and paper stars"
                referrerPolicy="no-referrer"
                onError={() => setImgFailed(true)}
                className="plate-blend-light relative aspect-square w-full rounded-[4px] object-cover"
              />
            ) : (
              <div className="flex aspect-square w-full flex-col items-center justify-center rounded-[4px] bg-[#EFE8DA] p-8 text-center text-[#51443C]">
                <BookOpen size={44} strokeWidth={1.4} />
                <p className="mt-3 font-editorial text-xl">Reading Room Collection</p>
                <p className="mt-1 text-xs opacity-75">
                  {allAvailableBooks.length} hand-bound technical references
                </p>
              </div>
            )}

            <figcaption className="relative mt-2.5 flex items-center justify-between border-t border-[#51443C]/12 pt-2 font-catalog text-[10px] tracking-wider uppercase text-[#7A695D]">
              <span>FIG. 01 — THE READING TABLE</span>
              <button
                type="button"
                onClick={toggleLamp}
                aria-pressed={lampLit}
                title="Click the reading lamp"
                className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[#51443C] transition-colors hover:bg-[#51443C]/10"
              >
                <LampDesk size={12} />
                {lampLit ? "LAMP ON" : "LAMP OFF"}
              </button>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

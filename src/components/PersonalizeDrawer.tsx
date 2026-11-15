import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUp, RotateCcw, SlidersHorizontal, X } from "lucide-react";
import {
  useLibrary,
  type AccentChoice,
  type DensityChoice,
  type MascotChoice,
  type ShelfWoodTheme,
  type TextureChoice,
} from "@/lib/library-storage";

const woodOptions: Array<{ value: ShelfWoodTheme; label: string; swatch: string }> = [
  { value: "walnut", label: "Warm Walnut", swatch: "#9C7758" },
  { value: "oak", label: "Honey Oak", swatch: "#D7BE98" },
  { value: "ebony", label: "Dark Ebony", swatch: "#524844" },
];

const accentOptions: Array<{ value: AccentChoice; label: string; swatch: string }> = [
  { value: "walnut", label: "Walnut", swatch: "#80634E" },
  { value: "lavender", label: "Lavender", swatch: "#B7A3D0" },
  { value: "sage", label: "Sage", swatch: "#A9BBA2" },
  { value: "rose", label: "Dusty Rose", swatch: "#D9AEB9" },
  { value: "powder", label: "Powder Blue", swatch: "#AFC5D7" },
];

const mascotOptions: Array<{ value: MascotChoice; label: string }> = [
  { value: "owl", label: "Barnaby (Owl)" },
  { value: "cat", label: "Mochi (Cat)" },
  { value: "ghost", label: "Pip (Ghost)" },
];

const textureOptions: Array<{ value: TextureChoice; label: string }> = [
  { value: "grain", label: "Paper Grain" },
  { value: "linen", label: "Woven Linen" },
  { value: "smooth", label: "Clean Ivory" },
];

const densityOptions: Array<{ value: DensityChoice; label: string }> = [
  { value: "immersive", label: "Immersive" },
  { value: "compact", label: "Compact" },
];

export function PersonalizeDrawer() {
  const {
    isPersonalizeOpen,
    setPersonalizeOpen,
    preferences,
    updatePreferences,
    resetPreferences,
  } = useLibrary();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isPersonalizeOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPersonalizeOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isPersonalizeOpen, setPersonalizeOpen]);

  function moveCategory(index: number, delta: -1 | 1) {
    const target = index + delta;
    if (target < 0 || target >= preferences.categoryOrder.length) return;
    const next = [...preferences.categoryOrder];
    const [moved] = next.splice(index, 1);
    if (!moved) return;
    next.splice(target, 0, moved);
    updatePreferences({ categoryOrder: next });
  }

  return (
    <AnimatePresence>
      {isPersonalizeOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="personalize-title"
          className="fixed inset-0 z-50 flex justify-end"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPersonalizeOpen(false)}
            className="fixed inset-0 bg-[#2C231D]/45 backdrop-blur-[2px] dark:bg-black/65"
          />

          <motion.aside
            initial={prefersReducedMotion ? { opacity: 0 } : { x: 360 }}
            animate={{ x: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { x: 360 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex h-full w-full max-w-md flex-col border-l border-border bg-card text-card-foreground shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={16} className="text-primary" />
                <h2 id="personalize-title" className="font-editorial text-xl text-foreground">
                  Personalize your library
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setPersonalizeOpen(false)}
                aria-label="Close personalization panel"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground"
              >
                <X size={15} />
              </button>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto p-6">
              {/* Bookshelf Wood */}
              <div>
                <p className="font-catalog text-[10px] tracking-[0.15em] uppercase text-muted-foreground">
                  BOOKSHELF WOOD FINISH
                </p>
                <div className="mt-2.5 grid grid-cols-3 gap-2">
                  {woodOptions.map((opt) => {
                    const active = preferences.shelfTheme === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => updatePreferences({ shelfTheme: opt.value })}
                        className={`flex flex-col items-center gap-1.5 rounded-md border px-2 py-2.5 text-xs font-medium transition-colors ${
                          active
                            ? "border-primary bg-secondary"
                            : "border-border bg-background hover:bg-muted"
                        }`}
                      >
                        <span
                          className="h-4 w-8 rounded-[2px] border border-black/20"
                          style={{ backgroundColor: opt.swatch }}
                        />
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Accent Ink */}
              <div>
                <p className="font-catalog text-[10px] tracking-[0.15em] uppercase text-muted-foreground">
                  ACCENT INK COLOR
                </p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {accentOptions.map((opt) => {
                    const active = preferences.accent === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => updatePreferences({ accent: opt.value })}
                        className={`inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
                          active
                            ? "border-primary bg-secondary"
                            : "border-border bg-background hover:bg-muted"
                        }`}
                      >
                        <span
                          className="h-3 w-3 rounded-full border border-black/15"
                          style={{ backgroundColor: opt.swatch }}
                        />
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mascot */}
              <div>
                <p className="font-catalog text-[10px] tracking-[0.15em] uppercase text-muted-foreground">
                  LIBRARY MASCOT
                </p>
                <div className="mt-2.5 grid grid-cols-3 gap-2">
                  {mascotOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => updatePreferences({ mascot: opt.value })}
                      className={`rounded-md border px-2.5 py-2 text-xs font-medium transition-colors ${
                        preferences.mascot === opt.value
                          ? "border-primary bg-secondary text-foreground"
                          : "border-border bg-background text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Paper Texture & Layout Density */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-catalog text-[10px] tracking-[0.15em] uppercase text-muted-foreground">
                    PAPER TEXTURE
                  </p>
                  <div className="mt-2 flex flex-col gap-1.5">
                    {textureOptions.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => updatePreferences({ texture: opt.value })}
                        className={`rounded border px-3 py-1.5 text-left text-xs font-medium ${
                          preferences.texture === opt.value
                            ? "border-primary bg-secondary text-foreground"
                            : "border-border bg-background text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="font-catalog text-[10px] tracking-[0.15em] uppercase text-muted-foreground">
                    SHELF LAYOUT
                  </p>
                  <div className="mt-2 flex flex-col gap-1.5">
                    {densityOptions.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => updatePreferences({ density: opt.value })}
                        className={`rounded border px-3 py-1.5 text-left text-xs font-medium ${
                          preferences.density === opt.value
                            ? "border-primary bg-secondary text-foreground"
                            : "border-border bg-background text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Shelf Order */}
              <div>
                <p className="font-catalog text-[10px] tracking-[0.15em] uppercase text-muted-foreground">
                  ARRANGE FAVORITE SHELVES FIRST
                </p>
                <ul className="mt-2 divide-y divide-border rounded-md border border-border bg-background">
                  {preferences.categoryOrder.map((cat, idx) => (
                    <li key={cat} className="flex items-center justify-between px-3 py-2 text-xs">
                      <span className="font-medium text-foreground">
                        <span className="mr-2 font-catalog text-[10px] text-muted-foreground">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        {cat}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => moveCategory(idx, -1)}
                          aria-label={`Move ${cat} up`}
                          className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-30"
                        >
                          <ArrowUp size={13} />
                        </button>
                        <button
                          type="button"
                          disabled={idx === preferences.categoryOrder.length - 1}
                          onClick={() => moveCategory(idx, 1)}
                          aria-label={`Move ${cat} down`}
                          className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-30"
                        >
                          <ArrowDown size={13} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-border px-6 py-4">
              <button
                type="button"
                onClick={resetPreferences}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
              >
                <RotateCcw size={13} />
                Reset defaults
              </button>
              <button
                type="button"
                onClick={() => setPersonalizeOpen(false)}
                className="rounded-md bg-primary px-4 py-2 text-xs font-medium text-primary-foreground"
              >
                Done
              </button>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}

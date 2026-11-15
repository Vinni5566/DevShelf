import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { ArrowRight, Bell, CheckCircle2, Eye, Menu, Moon, Search, Sun, X } from "lucide-react";
import { TechLogo } from "@/components/TechLogo";
import { filterCatalog } from "@/lib/devshelf-catalog";
import { getUpdatedVolumes } from "@/lib/devshelf-enrichments";
import { useLibrary } from "@/lib/library-storage";

function DevShelfLogoMark() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <rect
        x="4"
        y="6"
        width="8"
        height="20"
        rx="1.5"
        fill="#B7A3D0"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <line x1="6.5" y1="10" x2="9.5" y2="10" stroke="currentColor" strokeWidth="1.1" />
      <rect
        x="12"
        y="4"
        width="9"
        height="22"
        rx="1.5"
        fill="#EBD99C"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle
        cx="16.5"
        cy="13"
        r="2"
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="1"
      />
      <rect
        x="21.5"
        y="7.5"
        width="7.5"
        height="18.5"
        rx="1.5"
        transform="rotate(-5 21.5 7.5)"
        fill="#A9BBA2"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}

export function Navbar() {
  const {
    favorites,
    theme,
    toggleTheme,
    isSearchOpen,
    setSearchOpen,
    openBookPreview,
    allAvailableBooks,
    quietMode,
    toggleQuietMode,
  } = useLibrary();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [updatesOpen, setUpdatesOpen] = useState(false);
  const [updatesChecked, setUpdatesChecked] = useState(false);
  const [quickQuery, setQuickQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const updatedVolumes = useMemo(() => getUpdatedVolumes(allAvailableBooks), [allAvailableBooks]);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 40);
    } else {
      setQuickQuery("");
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      } else if (event.key === "Escape") {
        if (isSearchOpen) setSearchOpen(false);
        if (updatesOpen) setUpdatesOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isSearchOpen, updatesOpen, setSearchOpen]);

  const quickResults = useMemo(
    () =>
      quickQuery.trim() ? filterCatalog(allAvailableBooks, quickQuery, "All").slice(0, 6) : [],
    [quickQuery, allAvailableBooks],
  );

  function handleCollectionsClick() {
    setMobileMenuOpen(false);
    if (pathname === "/") {
      document.getElementById("collections")?.scrollIntoView({ behavior: "smooth" });
    } else {
      void navigate({ to: "/", hash: "collections" });
    }
  }

  if (quietMode) {
    return (
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-border/60 bg-background/90 px-5 py-2.5 backdrop-blur-md sm:px-8">
        <span className="font-editorial text-lg text-foreground">
          DevShelf · Quiet Reading Mode
        </span>
        <button
          type="button"
          onClick={toggleQuietMode}
          className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted"
        >
          <Eye size={13} />
          Exit quiet mode
        </button>
      </div>
    );
  }

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
          {/* Zone 1: Illustrated Logo & Wordmark */}
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="inline-flex shrink-0 items-center gap-2.5 whitespace-nowrap text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            <DevShelfLogoMark />
            <span className="font-editorial text-xl tracking-tight">DevShelf</span>
          </Link>

          {/* Zone 2: Primary Navigation Links */}
          <nav aria-label="Primary navigation" className="hidden items-center gap-8 md:flex">
            <Link
              to="/"
              className={`whitespace-nowrap shrink-0 border-b-2 py-1 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring ${
                pathname === "/"
                  ? "border-primary font-medium text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Discover
            </Link>

            <button
              type="button"
              onClick={handleCollectionsClick}
              className="whitespace-nowrap shrink-0 cursor-pointer border-b-2 border-transparent py-1 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              Collections
            </button>

            <Link
              to="/explore"
              className={`whitespace-nowrap shrink-0 border-b-2 py-1 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring ${
                pathname === "/explore"
                  ? "border-primary font-medium text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Explore
            </Link>

            <Link
              to="/my-shelf"
              className={`inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 border-b-2 py-1 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring ${
                pathname === "/my-shelf"
                  ? "border-primary font-medium text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <span>My Shelf</span>
              <span className="font-catalog text-xs tabular-nums text-primary">
                {favorites.length}
              </span>
            </Link>
          </nav>

          {/* Zone 3: Search, Documentation Update Bell & Theme Utilities */}
          <div className="relative flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search the library"
              title="Search the library (Ctrl/Cmd + K)"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <Search size={17} strokeWidth={1.8} />
            </button>

            <button
              type="button"
              onClick={() => {
                setUpdatesOpen((v) => !v);
                setUpdatesChecked(true);
              }}
              aria-expanded={updatesOpen}
              aria-label="Documentation edition updates"
              title="Recent verified documentation updates"
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <Bell size={17} strokeWidth={1.8} />
              {!updatesChecked && (
                <span
                  aria-hidden="true"
                  className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-primary"
                />
              )}
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label={
                theme === "light"
                  ? "Switch to evening dark theme"
                  : "Switch to daylight ivory theme"
              }
              title={theme === "light" ? "Candlelit dark mode" : "Daylight ivory mode"}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {theme === "light" ? (
                <Moon size={17} strokeWidth={1.8} />
              ) : (
                <Sun size={17} strokeWidth={1.8} />
              )}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-muted md:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>

            {/* Documentation Update Bell Popover */}
            {updatesOpen && (
              <div
                role="region"
                aria-label="Verified documentation updates"
                className="absolute top-12 right-0 z-50 w-[min(90vw,340px)] overflow-hidden rounded-lg border border-border bg-card shadow-2xl"
              >
                <div className="flex items-center justify-between border-b border-border bg-secondary/50 px-4 py-3">
                  <div>
                    <p className="font-catalog text-[10px] tracking-widest uppercase text-muted-foreground">
                      EDITION LEDGER
                    </p>
                    <p className="font-editorial text-base text-foreground">Verified doc updates</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setUpdatesOpen(false)}
                    aria-label="Close updates ledger"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X size={15} />
                  </button>
                </div>

                <ul className="max-h-72 divide-y divide-border overflow-y-auto">
                  {updatedVolumes.map(({ book, edition }) => (
                    <li key={book.id}>
                      <button
                        type="button"
                        onClick={() => {
                          setUpdatesOpen(false);
                          openBookPreview(book);
                        }}
                        className="flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/70"
                      >
                        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded border border-border bg-background text-foreground">
                          <TechLogo techId={book.id} size={14} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center justify-between gap-2">
                            <span className="font-editorial text-sm text-foreground">
                              {book.name}
                            </span>
                            <span className="font-catalog text-[10px] text-primary">
                              {edition.version}
                            </span>
                          </span>
                          <span className="mt-0.5 block text-xs text-muted-foreground">
                            {edition.releaseNote}
                          </span>
                          <span className="mt-1 inline-flex items-center gap-1 font-catalog text-[9px] uppercase text-muted-foreground">
                            <CheckCircle2 size={10} className="text-primary" /> Verified{" "}
                            {edition.lastChecked}
                          </span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <nav
            aria-label="Mobile navigation"
            className="border-t border-border bg-background px-5 py-4 md:hidden"
          >
            <div className="flex flex-col gap-3">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 text-sm font-medium text-foreground"
              >
                Discover
              </Link>
              <button
                type="button"
                onClick={handleCollectionsClick}
                className="py-1.5 text-left text-sm font-medium text-foreground"
              >
                Collections
              </button>
              <Link
                to="/explore"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 text-sm font-medium text-foreground"
              >
                Explore Catalogue
              </Link>
              <Link
                to="/my-shelf"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-1.5 text-sm font-medium text-foreground"
              >
                <span>My Shelf</span>
                <span className="font-catalog text-xs tabular-nums text-primary">
                  {favorites.length}
                </span>
              </Link>
            </div>
          </nav>
        )}
      </header>

      {/* Quick Index Search Overlay */}
      {isSearchOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Quick library search"
          className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-20 sm:pt-28"
        >
          <div
            onClick={() => setSearchOpen(false)}
            className="fixed inset-0 bg-[#2C231D]/50 backdrop-blur-[2px] dark:bg-black/70"
          />

          <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-lg border border-border bg-card shadow-2xl">
            <div className="flex items-center gap-3 border-b border-border px-4 py-3.5">
              <Search size={18} className="shrink-0 text-muted-foreground" />
              <input
                ref={searchInputRef}
                type="search"
                value={quickQuery}
                onChange={(e) => setQuickQuery(e.target.value)}
                placeholder="Look up a language, framework, tool, or tag…"
                aria-label="Quick search technologies"
                className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                aria-label="Close search"
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <X size={16} />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto p-3">
              {quickQuery.trim() === "" ? (
                <div className="px-2 py-5 text-center">
                  <p className="font-editorial text-lg text-foreground">
                    Search the card catalogue
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Try typing Python, Three.js, Radix UI, Flutter, or &ldquo;containers&rdquo;.
                  </p>
                  <Link
                    to="/explore"
                    onClick={() => setSearchOpen(false)}
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                  >
                    Open full Explore catalogue <ArrowRight size={13} />
                  </Link>
                </div>
              ) : quickResults.length === 0 ? (
                <div className="px-2 py-6 text-center">
                  <p className="text-sm font-medium text-foreground">No matching volumes found</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Try another keyword or browse all collections in Explore.
                  </p>
                </div>
              ) : (
                <ul className="divide-y divide-border">
                  {quickResults.map((book) => (
                    <li key={book.id}>
                      <button
                        type="button"
                        onClick={() => {
                          setSearchOpen(false);
                          openBookPreview(book);
                        }}
                        className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left transition-colors hover:bg-muted"
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded border border-border bg-background text-foreground">
                          <TechLogo techId={book.id} size={18} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block font-editorial text-base text-foreground">
                            {book.name}
                          </span>
                          <span className="block truncate text-xs text-muted-foreground">
                            {book.category} · {book.description}
                          </span>
                        </span>
                        <span className="font-catalog shrink-0 text-[10px] text-muted-foreground">
                          {book.catalogNo}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

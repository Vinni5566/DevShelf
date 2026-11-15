import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, Bookmark, BookOpen, Check, ChevronRight, ExternalLink, Heart, LibraryBig, Search, Sparkles, X } from "lucide-react";
import libraryVignette from "@/assets/devshelf-library-vignette.png";
import { Button } from "@/components/ui/button";
import { categories, filterCatalog, technologies, type ShelfCategory, type Technology } from "@/lib/devshelf-catalog";

const categoryTabs: ("All" | ShelfCategory)[] = ["All", ...categories];
const shelfNotes: Record<ShelfCategory, string> = {
  Languages: "The words we use to make things",
  Frontend: "Everything the browser can dream up",
  Backend: "The quiet magic behind the screen",
  Databases: "Little homes for big ideas",
  "AI/ML": "Curiosity, patterns & possibilities",
  DevOps: "Tools for making the whole thing work",
  Design: "Good ideas, made visible",
};
const bookHeights = ["h-[178px]", "h-[194px]", "h-[184px]", "h-[201px]", "h-[180px]", "h-[192px]"];
const storageKeys = { favorites: "devshelf:favorites", recent: "devshelf:recent" };

function readList(key: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const saved = window.localStorage.getItem(key);
    const value: unknown = saved ? JSON.parse(saved) : [];
    return Array.isArray(value) ? value.filter((id): id is string => typeof id === "string") : [];
  } catch {
    return [];
  }
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DevShelf — a little library for curious developers" },
      { name: "description", content: "Find the official docs for your favorite languages, frameworks, tools, and ideas, all on one beautifully organized bookshelf." },
      { property: "og:title", content: "DevShelf — a little library for curious developers" },
      { property: "og:description", content: "Your little corner of the developer universe. Find your next favorite docs on the shelf." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DevShelf,
});

function DevShelf() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"All" | ShelfCategory>("All");
  const [favorites, setFavorites] = useState<string[]>(readList(storageKeys.favorites));
  const [recent, setRecent] = useState<string[]>(readList(storageKeys.recent));
  const [view, setView] = useState<"explore" | "saved">("explore");
  const filtered = useMemo(() => filterCatalog(technologies, query, category), [query, category]);
  const favoriteBooks = useMemo(() => favorites.flatMap((id) => technologies.filter((book) => book.id === id)), [favorites]);
  const recentBooks = useMemo(() => recent.flatMap((id) => technologies.filter((book) => book.id === id)), [recent]);
  const visibleBooks = view === "saved" ? filterCatalog(favoriteBooks, query, category) : filtered;

  function toggleFavorite(id: string) {
    setFavorites((current) => {
      const next = current.includes(id) ? current.filter((entry) => entry !== id) : [id, ...current];
      window.localStorage.setItem(storageKeys.favorites, JSON.stringify(next));
      return next;
    });
  }

  function openBook(book: Technology) {
    setRecent((current) => {
      const next = [book.id, ...current.filter((id) => id !== book.id)].slice(0, 8);
      window.localStorage.setItem(storageKeys.recent, JSON.stringify(next));
      return next;
    });
  }

  function jumpToShelves() {
    setView("explore");
    document.getElementById("shelves")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="site-header">
        <div className="site-nav">
          <a className="brand" href="#top" aria-label="DevShelf home">
            <span className="brand-mark"><BookOpen size={19} strokeWidth={1.8} /></span>
            <span>dev<span className="brand-light">shelf</span></span>
          </a>
          <nav className="main-nav" aria-label="Main navigation">
            <button className={view === "explore" ? "nav-link active" : "nav-link"} onClick={() => { setView("explore"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Explore</button>
            <button className="nav-link" onClick={jumpToShelves}>The shelves</button>
            <button className={view === "saved" ? "nav-link active" : "nav-link"} onClick={() => { setView("saved"); setCategory("All"); document.getElementById("shelves")?.scrollIntoView({ behavior: "smooth" }); }}>My shelf <span className="nav-count">{favorites.length}</span></button>
          </nav>
          <button className="save-shortcut" onClick={() => { setView("saved"); setCategory("All"); document.getElementById("shelves")?.scrollIntoView({ behavior: "smooth" }); }} aria-label="Open saved books" title="My shelf">
            <Bookmark size={17} strokeWidth={1.8} />
          </button>
        </div>
      </header>

      <main id="top">
        <section className="intro" aria-labelledby="intro-title">
          <div className="intro-copy">
            <div className="eyebrow"><Sparkles size={13} /> A LITTLE LIBRARY FOR CURIOUS DEVELOPERS</div>
            <h1 id="intro-title">Your little corner of the<br className="desktop-break" /> developer <span>universe.</span></h1>
            <p className="intro-desc">All your favorite technologies, one beautiful bookshelf.<br className="desktop-break" /> Find the docs you need and make yourself at home.</p>
            <label className="search-box">
              <Search size={19} strokeWidth={1.8} />
              <input aria-label="Search the library" placeholder="A language, a tool, a little curiosity…" value={query} onChange={(event) => setQuery(event.target.value)} onFocus={() => setView("explore")} />
              {query && <button className="clear-search" onClick={() => setQuery("")} aria-label="Clear search"><X size={15} /></button>}
              <span className="search-hint">{visibleBooks.length} books</span>
            </label>
            <button className="text-link" onClick={jumpToShelves}>Come on in <ArrowDown size={15} /></button>
          </div>
          <div className="intro-art-wrap" aria-hidden="true">
            <img className="intro-art" src={libraryVignette} width={1024} height={1024} alt="" />
            <span className="art-sparkle sparkle-one">✳</span><span className="art-sparkle sparkle-two">✦</span>
            <div className="art-note"><span className="note-dot" /> A good place to begin</div>
          </div>
          <span className="intro-rule" />
        </section>

        <section id="shelves" className="library-section">
          <div className="section-head">
            <div>
              <p className="section-kicker">TAKE A LOOK AROUND</p>
              <h2>{view === "saved" ? "Your little shelf" : "Find your next read."}</h2>
              <p className="section-subtitle">{view === "saved" ? "The books you’ve tucked away for later." : "Hand-picked places to start, one book at a time."}</p>
            </div>
            <div className="collection-note"><LibraryBig size={17} strokeWidth={1.65} /><span><strong>{visibleBooks.length}</strong> little doors to open</span></div>
          </div>

          <div className="filter-bar" aria-label="Filter by category">
            <div className="filter-scroll">
              {categoryTabs.map((tab) => <button key={tab} className={category === tab ? "filter-chip selected" : "filter-chip"} onClick={() => setCategory(tab)} aria-pressed={category === tab}>{tab === "All" ? "Everything" : tab}</button>)}
            </div>
            <button className="saved-filter" onClick={() => setView(view === "saved" ? "explore" : "saved")} aria-pressed={view === "saved"}><Heart size={14} fill={view === "saved" ? "currentColor" : "none"} /> Saved <span>{favorites.length}</span></button>
          </div>

          {view === "saved" && favoriteBooks.length === 0 ? (
            <div className="empty-state"><div className="empty-icon"><Bookmark size={23} /></div><h3>Your shelf is waiting.</h3><p>Tap the little bookmark on any book to keep it close.</p><Button variant="outline" onClick={() => setView("explore")}>Browse the library <ArrowRight size={15} /></Button></div>
          ) : visibleBooks.length === 0 ? (
            <div className="empty-state"><div className="empty-icon"><Search size={23} /></div><h3>Hmm, this book isn’t on our shelf yet!</h3><p>Try another search or browse a different corner of the library.</p><Button variant="outline" onClick={() => { setQuery(""); setCategory("All"); }}>Show me everything <ArrowRight size={15} /></Button></div>
          ) : (
            <div className="shelf-list">
              {categories.map((shelfCategory) => {
                const books = visibleBooks.filter((book) => book.category === shelfCategory);
                if (books.length === 0) return null;
                return <ShelfRow key={shelfCategory} category={shelfCategory} books={books} favorites={favorites} onToggleFavorite={toggleFavorite} onOpen={openBook} />;
              })}
            </div>
          )}
        </section>

        {view === "explore" && recentBooks.length > 0 && <section className="recent-section" aria-label="Recently opened books"><div className="recent-title"><div><p className="section-kicker">PICK UP WHERE YOU LEFT OFF</p><h2>Recently explored</h2></div><ChevronRight size={19} /></div><div className="recent-list">{recentBooks.slice(0, 5).map((book) => <a key={book.id} className="recent-item" href={book.docs} target="_blank" rel="noreferrer" onClick={() => openBook(book)}><span className={`recent-mark cover-${book.cover}`}>{book.mark}</span><span><strong>{book.name}</strong><small>{book.category}</small></span><ExternalLink size={13} /></a>)}</div></section>}
      </main>

      <footer className="site-footer"><a className="footer-brand" href="#top"><BookOpen size={16} /> dev<span>shelf</span></a><p>A little library, made for the love of learning.</p><div className="footer-links"><a href="https://github.com/topics/documentation" target="_blank" rel="noreferrer">GitHub <ExternalLink size={12} /></a><a href="mailto:hello@devshelf.example?subject=Hello%20DevShelf">Say hello <ExternalLink size={12} /></a></div><span className="footer-colophon">GATHERED WITH CARE · OPEN SOURCE DOCS</span></footer>
    </div>
  );
}

function ShelfRow({ category, books, favorites, onToggleFavorite, onOpen }: { category: ShelfCategory; books: Technology[]; favorites: string[]; onToggleFavorite: (id: string) => void; onOpen: (book: Technology) => void }) {
  return <section className="shelf-group" aria-label={`${category} books`}><div className="shelf-label"><span className="shelf-index">{String(categories.indexOf(category) + 1).padStart(2, "0")}</span><div><h3>{category}</h3><p>{shelfNotes[category]}</p></div><span className="shelf-total">{String(books.length).padStart(2, "0")} {books.length === 1 ? "BOOK" : "BOOKS"}</span></div><div className="shelf-scroller"><div className="books-row">{books.map((book, index) => <BookItem key={book.id} book={book} index={index} isFavorite={favorites.includes(book.id)} onToggleFavorite={onToggleFavorite} onOpen={onOpen} />)}<div className="shelf-decor" aria-hidden="true"><span>✳</span><span>❧</span></div></div></div><div className="wood-shelf" aria-hidden="true"><span /></div></section>;
}

function BookItem({ book, index, isFavorite, onToggleFavorite, onOpen }: { book: Technology; index: number; isFavorite: boolean; onToggleFavorite: (id: string) => void; onOpen: (book: Technology) => void }) {
  return <div className={`book-wrap ${bookHeights[index % bookHeights.length]}`}>
    <a className={`book-cover cover-${book.cover}`} href={book.docs} target="_blank" rel="noreferrer" aria-label={`Open ${book.name} official documentation in a new tab`} onClick={() => onOpen(book)}>
      <span className="book-top-line" /><span className="book-seal">{book.mark}</span><span className="book-title">{book.name}</span><span className="book-rule" /><span className="book-bottom-mark">{book.category === "AI/ML" ? "✳" : "✦"}</span><span className="book-spine" />
      <span className="book-tooltip"><strong>{book.name}</strong><span>{book.description}</span><span className="tooltip-open">Open official docs <ExternalLink size={11} /></span></span>
    </a>
    <button className={isFavorite ? "book-save is-saved" : "book-save"} onClick={() => onToggleFavorite(book.id)} aria-label={isFavorite ? `Remove ${book.name} from My Shelf` : `Save ${book.name} to My Shelf`} aria-pressed={isFavorite} title={isFavorite ? "Remove from My Shelf" : "Save to My Shelf"}>{isFavorite ? <Check size={12} /> : <Bookmark size={12} />}</button>
  </div>;
}
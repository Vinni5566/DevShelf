import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  categories,
  technologies,
  type ShelfCategory,
  type Technology,
} from "@/lib/devshelf-catalog";
import { getDailyMysteryBook, secretBook } from "@/lib/devshelf-enrichments";

const STORAGE_KEYS = {
  favorites: "devshelf:favorites:v2",
  recent: "devshelf:recent:v2",
  explored: "devshelf:explored:v1",
  notes: "devshelf:notes:v1",
  stacks: "devshelf:stacks:v1",
  prefs: "devshelf:prefs:v1",
  theme: "devshelf:theme:v2",
  secret: "devshelf:secret:v1",
} as const;

export type ThemeMode = "light" | "dark";
export type ShelfWoodTheme = "walnut" | "oak" | "ebony";
export type AccentChoice = "walnut" | "lavender" | "sage" | "rose" | "powder";
export type MascotChoice = "owl" | "cat" | "ghost";
export type TextureChoice = "grain" | "linen" | "smooth";
export type DensityChoice = "immersive" | "compact";

export type LibraryPreferences = {
  shelfTheme: ShelfWoodTheme;
  accent: AccentChoice;
  mascot: MascotChoice;
  texture: TextureChoice;
  density: DensityChoice;
  categoryOrder: ShelfCategory[];
};

export type CustomStack = {
  id: string;
  name: string;
  bookIds: string[];
  updatedAt: number;
};

export type ToastMessage = {
  id: number;
  title: string;
  body: string;
};

const defaultPreferences: LibraryPreferences = {
  shelfTheme: "walnut",
  accent: "walnut",
  mascot: "owl",
  texture: "grain",
  density: "immersive",
  categoryOrder: [...categories],
};

const defaultStarterStacks: CustomStack[] = [
  {
    id: "starter-fullstack",
    name: "My Next Project Stack",
    bookIds: ["typescript", "react", "tailwind", "nodejs", "postgresql"],
    updatedAt: 1,
  },
];

type LibraryContextValue = {
  favorites: string[];
  recent: string[];
  exploredIds: string[];
  notes: Record<string, string>;
  stacks: CustomStack[];
  preferences: LibraryPreferences;
  favoriteBooks: Technology[];
  recentBooks: Technology[];
  allAvailableBooks: Technology[];
  theme: ThemeMode;
  activeBook: Technology | null;
  isSearchOpen: boolean;
  isPersonalizeOpen: boolean;
  mysteryState: { isOpen: boolean; book: Technology | null; mode: "random" | "daily" };
  lampLit: boolean;
  quietMode: boolean;
  secretUnlocked: boolean;
  unlockedStampIds: string[];
  toast: ToastMessage | null;
  toggleTheme: () => void;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  openBookPreview: (book: Technology) => void;
  closeBookPreview: () => void;
  openMysteryBook: (mode?: "random" | "daily") => void;
  closeMysteryBook: () => void;
  clearRecent: () => void;
  setSearchOpen: (open: boolean) => void;
  setPersonalizeOpen: (open: boolean) => void;
  saveBookNote: (bookId: string, note: string) => void;
  createStack: (name: string, initialBookIds?: string[]) => CustomStack;
  renameStack: (stackId: string, name: string) => void;
  deleteStack: (stackId: string) => void;
  addBookToStack: (stackId: string, bookId: string) => void;
  removeBookFromStack: (stackId: string, bookId: string) => void;
  reorderBookInStack: (stackId: string, fromIndex: number, toIndex: number) => void;
  updatePreferences: (patch: Partial<LibraryPreferences>) => void;
  resetPreferences: () => void;
  toggleLamp: () => void;
  toggleQuietMode: () => void;
  unlockSecret: (reason?: string) => void;
  notify: (title: string, body: string) => void;
  dismissToast: () => void;
};

const LibraryContext = createContext<LibraryContextValue | null>(null);

function getValidIdSet(): Set<string> {
  return new Set([...technologies.map((t) => t.id), secretBook.id]);
}

function readIdList(key: string, legacyKey?: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw =
      window.localStorage.getItem(key) ??
      (legacyKey ? window.localStorage.getItem(legacyKey) : null);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const validIds = getValidIdSet();
    return parsed.filter((id): id is string => typeof id === "string" && validIds.has(id));
  } catch {
    return [];
  }
}

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function LibraryProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recent, setRecent] = useState<string[]>([]);
  const [exploredIds, setExploredIds] = useState<string[]>([]);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [stacks, setStacks] = useState<CustomStack[]>(defaultStarterStacks);
  const [preferences, setPreferences] = useState<LibraryPreferences>(defaultPreferences);
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [secretUnlocked, setSecretUnlocked] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const [activeBook, setActiveBook] = useState<Technology | null>(null);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [isPersonalizeOpen, setPersonalizeOpen] = useState(false);
  const [mysteryState, setMysteryState] = useState<{
    isOpen: boolean;
    book: Technology | null;
    mode: "random" | "daily";
  }>({ isOpen: false, book: null, mode: "random" });

  const [lampLit, setLampLit] = useState(true);
  const [lampClicks, setLampClicks] = useState(0);
  const [quietMode, setQuietMode] = useState(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const notify = useCallback((title: string, body: string) => {
    setToast({ id: Date.now(), title, body });
  }, []);

  const dismissToast = useCallback(() => setToast(null), []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 4600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    setFavorites(readIdList(STORAGE_KEYS.favorites, "devshelf:favorites"));
    const loadedRecent = readIdList(STORAGE_KEYS.recent, "devshelf:recent");
    setRecent(loadedRecent);
    const loadedExplored = readIdList(STORAGE_KEYS.explored);
    setExploredIds(loadedExplored.length > 0 ? loadedExplored : loadedRecent);
    setNotes(readJson<Record<string, string>>(STORAGE_KEYS.notes, {}));
    const loadedStacks = readJson<CustomStack[] | null>(STORAGE_KEYS.stacks, null);
    if (Array.isArray(loadedStacks) && loadedStacks.length > 0) {
      setStacks(loadedStacks);
    }

    const storedPrefs = readJson<Partial<LibraryPreferences>>(STORAGE_KEYS.prefs, {});
    const mergedOrder = Array.isArray(storedPrefs.categoryOrder)
      ? [
          ...storedPrefs.categoryOrder.filter((c): c is ShelfCategory => categories.includes(c)),
          ...categories.filter((c) => !storedPrefs.categoryOrder?.includes(c)),
        ]
      : [...categories];
    setPreferences({ ...defaultPreferences, ...storedPrefs, categoryOrder: mergedOrder });

    setSecretUnlocked(window.localStorage.getItem(STORAGE_KEYS.secret) === "1");
    const storedTheme = window.localStorage.getItem(STORAGE_KEYS.theme);
    const initialTheme: ThemeMode = storedTheme === "dark" ? "dark" : "light";
    setTheme(initialTheme);
    setHydrated(true);
  }, []);

  // Sync theme, wood theme, accent, texture attributes on <html>
  useEffect(() => {
    if (!hydrated) return;
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.setAttribute("data-shelf-theme", preferences.shelfTheme);
    root.setAttribute("data-accent", preferences.accent);
    root.setAttribute("data-texture", preferences.texture);
    try {
      window.localStorage.setItem(STORAGE_KEYS.theme, theme);
      window.localStorage.setItem(STORAGE_KEYS.prefs, JSON.stringify(preferences));
    } catch {
      // Ignore storage errors
    }
  }, [theme, preferences, hydrated]);

  const allAvailableBooks = useMemo(
    () => (secretUnlocked ? [...technologies, secretBook] : technologies),
    [secretUnlocked],
  );

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((current) => {
      const next = current.includes(id)
        ? current.filter((entry) => entry !== id)
        : [id, ...current];
      try {
        window.localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(next));
      } catch {
        // Ignore storage errors
      }
      return next;
    });
  }, []);

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);

  const openBookPreview = useCallback((book: Technology) => {
    setActiveBook(book);
    setRecent((current) => {
      const next = [book.id, ...current.filter((id) => id !== book.id)].slice(0, 10);
      try {
        window.localStorage.setItem(STORAGE_KEYS.recent, JSON.stringify(next));
      } catch {
        // Ignore storage errors
      }
      return next;
    });
    setExploredIds((current) => {
      if (current.includes(book.id)) return current;
      const next = [...current, book.id];
      try {
        window.localStorage.setItem(STORAGE_KEYS.explored, JSON.stringify(next));
      } catch {
        // Ignore storage errors
      }
      return next;
    });
  }, []);

  const closeBookPreview = useCallback(() => {
    setActiveBook(null);
  }, []);

  const openMysteryBook = useCallback(
    (mode: "random" | "daily" = "random") => {
      if (mode === "daily") {
        setMysteryState({ isOpen: true, book: getDailyMysteryBook(), mode: "daily" });
        return;
      }
      const pool = mysteryState.book
        ? allAvailableBooks.filter((t) => t.id !== mysteryState.book?.id)
        : allAvailableBooks;
      const chosen = pool[Math.floor(Math.random() * pool.length)] ?? allAvailableBooks[0]!;
      setMysteryState({ isOpen: true, book: chosen, mode: "random" });
    },
    [allAvailableBooks, mysteryState.book],
  );

  const closeMysteryBook = useCallback(() => {
    setMysteryState((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const clearRecent = useCallback(() => {
    setRecent([]);
    try {
      window.localStorage.removeItem(STORAGE_KEYS.recent);
    } catch {
      // Ignore storage errors
    }
  }, []);

  const saveBookNote = useCallback((bookId: string, note: string) => {
    setNotes((current) => {
      const next = { ...current };
      if (note.trim() === "") {
        delete next[bookId];
      } else {
        next[bookId] = note;
      }
      try {
        window.localStorage.setItem(STORAGE_KEYS.notes, JSON.stringify(next));
      } catch {
        // Ignore storage errors
      }
      return next;
    });
  }, []);

  const persistStacks = useCallback((next: CustomStack[]) => {
    setStacks(next);
    try {
      window.localStorage.setItem(STORAGE_KEYS.stacks, JSON.stringify(next));
    } catch {
      // Ignore storage errors
    }
  }, []);

  const createStack = useCallback((name: string, initialBookIds: string[] = []): CustomStack => {
    const created: CustomStack = {
      id: `stack-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      name: name.trim() || "Untitled Stack",
      bookIds: initialBookIds,
      updatedAt: Date.now(),
    };
    setStacks((current) => {
      const next = [created, ...current];
      try {
        window.localStorage.setItem(STORAGE_KEYS.stacks, JSON.stringify(next));
      } catch {
        // Ignore storage errors
      }
      return next;
    });
    return created;
  }, []);

  const renameStack = useCallback(
    (stackId: string, name: string) => {
      persistStacks(
        stacks.map((s) =>
          s.id === stackId ? { ...s, name: name.trim() || s.name, updatedAt: Date.now() } : s,
        ),
      );
    },
    [stacks, persistStacks],
  );

  const deleteStack = useCallback(
    (stackId: string) => {
      persistStacks(stacks.filter((s) => s.id !== stackId));
    },
    [stacks, persistStacks],
  );

  const addBookToStack = useCallback(
    (stackId: string, bookId: string) => {
      persistStacks(
        stacks.map((s) =>
          s.id === stackId && !s.bookIds.includes(bookId)
            ? { ...s, bookIds: [...s.bookIds, bookId], updatedAt: Date.now() }
            : s,
        ),
      );
    },
    [stacks, persistStacks],
  );

  const removeBookFromStack = useCallback(
    (stackId: string, bookId: string) => {
      persistStacks(
        stacks.map((s) =>
          s.id === stackId
            ? { ...s, bookIds: s.bookIds.filter((id) => id !== bookId), updatedAt: Date.now() }
            : s,
        ),
      );
    },
    [stacks, persistStacks],
  );

  const reorderBookInStack = useCallback(
    (stackId: string, fromIndex: number, toIndex: number) => {
      persistStacks(
        stacks.map((s) => {
          if (s.id !== stackId) return s;
          if (
            fromIndex < 0 ||
            toIndex < 0 ||
            fromIndex >= s.bookIds.length ||
            toIndex >= s.bookIds.length
          ) {
            return s;
          }
          const copy = [...s.bookIds];
          const [moved] = copy.splice(fromIndex, 1);
          if (!moved) return s;
          copy.splice(toIndex, 0, moved);
          return { ...s, bookIds: copy, updatedAt: Date.now() };
        }),
      );
    },
    [stacks, persistStacks],
  );

  const updatePreferences = useCallback((patch: Partial<LibraryPreferences>) => {
    setPreferences((current) => ({ ...current, ...patch }));
  }, []);

  const resetPreferences = useCallback(() => {
    setPreferences(defaultPreferences);
  }, []);

  const unlockSecret = useCallback(
    (reason = "You uncovered a hidden shelf volume: The Book of Shaders!") => {
      if (secretUnlocked) return;
      setSecretUnlocked(true);
      try {
        window.localStorage.setItem(STORAGE_KEYS.secret, "1");
      } catch {
        // Ignore storage errors
      }
      notify("You've found a secret shelf!", reason);
    },
    [secretUnlocked, notify],
  );

  const toggleLamp = useCallback(() => {
    setLampLit((prev) => !prev);
    setLampClicks((prev) => {
      const next = prev + 1;
      if (next === 3 && !secretUnlocked) {
        unlockSecret("Toggling the brass reading lamp revealed The Book of Shaders in AR/VR.");
      }
      return next;
    });
  }, [secretUnlocked, unlockSecret]);

  const toggleQuietMode = useCallback(() => {
    setQuietMode((prev) => !prev);
  }, []);

  // Reading Passport stamps derived cleanly from user activity
  const unlockedStampIds = useMemo(() => {
    const bookById = new Map(allAvailableBooks.map((b) => [b.id, b]));
    const exploredBooks = exploredIds
      .map((id) => bookById.get(id))
      .filter((b): b is Technology => Boolean(b));

    const categoryCounts = new Map<ShelfCategory, number>();
    for (const book of exploredBooks) {
      categoryCounts.set(book.category, (categoryCounts.get(book.category) ?? 0) + 1);
    }

    const stamps: string[] = [];
    if (exploredBooks.length >= 1) stamps.push("first-chapter");
    if (exploredIds.includes("python")) stamps.push("python-explorer");
    if ((categoryCounts.get("Frontend") ?? 0) >= 3) stamps.push("frontend-wanderer");
    if ((categoryCounts.get("Databases") ?? 0) >= 2) stamps.push("database-detective");
    if ((categoryCounts.get("AI/ML") ?? 0) >= 2) stamps.push("ai-adventurer");
    if ((categoryCounts.get("AR/VR") ?? 0) >= 1) stamps.push("spatial-pioneer");
    if ((categoryCounts.get("UI/UX") ?? 0) + (categoryCounts.get("Design") ?? 0) >= 2) {
      stamps.push("ux-connoisseur");
    }
    if ((categoryCounts.get("App Dev") ?? 0) >= 2) stamps.push("app-builder");
    if (categoryCounts.size >= 5) stamps.push("open-source-traveler");
    if (stacks.some((s) => s.id !== "starter-fullstack" || s.updatedAt > 1))
      stamps.push("stack-architect");
    if (Object.keys(notes).length >= 1) stamps.push("marginalia-scribe");
    if (secretUnlocked) stamps.push("secret-keeper");
    return stamps;
  }, [allAvailableBooks, exploredIds, stacks, notes, secretUnlocked]);

  const favoriteBooks = useMemo(
    () => favorites.flatMap((id) => allAvailableBooks.filter((t) => t.id === id)),
    [favorites, allAvailableBooks],
  );

  const recentBooks = useMemo(
    () => recent.flatMap((id) => allAvailableBooks.filter((t) => t.id === id)),
    [recent, allAvailableBooks],
  );

  const value = useMemo<LibraryContextValue>(
    () => ({
      favorites,
      recent,
      exploredIds,
      notes,
      stacks,
      preferences,
      favoriteBooks,
      recentBooks,
      allAvailableBooks,
      theme,
      activeBook,
      isSearchOpen,
      isPersonalizeOpen,
      mysteryState,
      lampLit,
      quietMode,
      secretUnlocked,
      unlockedStampIds,
      toast,
      toggleTheme,
      toggleFavorite,
      isFavorite,
      openBookPreview,
      closeBookPreview,
      openMysteryBook,
      closeMysteryBook,
      clearRecent,
      setSearchOpen,
      setPersonalizeOpen,
      saveBookNote,
      createStack,
      renameStack,
      deleteStack,
      addBookToStack,
      removeBookFromStack,
      reorderBookInStack,
      updatePreferences,
      resetPreferences,
      toggleLamp,
      toggleQuietMode,
      unlockSecret,
      notify,
      dismissToast,
    }),
    [
      favorites,
      recent,
      exploredIds,
      notes,
      stacks,
      preferences,
      favoriteBooks,
      recentBooks,
      allAvailableBooks,
      theme,
      activeBook,
      isSearchOpen,
      isPersonalizeOpen,
      mysteryState,
      lampLit,
      quietMode,
      secretUnlocked,
      unlockedStampIds,
      toast,
      toggleTheme,
      toggleFavorite,
      isFavorite,
      openBookPreview,
      closeBookPreview,
      openMysteryBook,
      closeMysteryBook,
      clearRecent,
      saveBookNote,
      createStack,
      renameStack,
      deleteStack,
      addBookToStack,
      removeBookFromStack,
      reorderBookInStack,
      updatePreferences,
      resetPreferences,
      toggleLamp,
      toggleQuietMode,
      unlockSecret,
      notify,
      dismissToast,
    ],
  );

  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>;
}

export function useLibrary() {
  const ctx = useContext(LibraryContext);
  if (!ctx) {
    throw new Error("useLibrary must be used within LibraryProvider");
  }
  return ctx;
}

import { useEffect, useMemo, useState, type DragEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  GripVertical,
  Layers,
  Plus,
  Share2,
  Trash2,
  X,
} from "lucide-react";
import { TechLogo } from "@/components/TechLogo";
import type { Technology } from "@/lib/devshelf-catalog";
import { useLibrary } from "@/lib/library-storage";

const presetTemplates: Array<{ name: string; bookIds: string[] }> = [
  { name: "My MERN Stack", bookIds: ["mongodb", "express", "react", "nodejs"] },
  { name: "My AI/ML Toolkit", bookIds: ["python", "pytorch", "scikit-learn", "huggingface"] },
  {
    name: "My Hackathon Toolkit",
    bookIds: ["typescript", "nextjs", "tailwind", "firebase", "figma"],
  },
];

type SharedStackPayload = {
  name: string;
  bookIds: string[];
};

function decodeSharedStack(raw: string): SharedStackPayload | null {
  try {
    const json = decodeURIComponent(escape(window.atob(raw)));
    const parsed = JSON.parse(json) as { n?: unknown; b?: unknown };
    if (typeof parsed.n !== "string" || !Array.isArray(parsed.b)) return null;
    const bookIds = parsed.b.filter((id): id is string => typeof id === "string");
    if (bookIds.length === 0) return null;
    return { name: parsed.n, bookIds };
  } catch {
    return null;
  }
}

function encodeSharedStack(name: string, bookIds: string[]): string {
  const json = JSON.stringify({ n: name, b: bookIds });
  return window.btoa(unescape(encodeURIComponent(json)));
}

export function TechStacksSection() {
  const {
    stacks,
    allAvailableBooks,
    createStack,
    renameStack,
    deleteStack,
    addBookToStack,
    removeBookFromStack,
    reorderBookInStack,
    openBookPreview,
    notify,
  } = useLibrary();

  const [selectedStackId, setSelectedStackId] = useState<string>(stacks[0]?.id ?? "");
  const [newStackName, setNewStackName] = useState("");
  const [pickerQuery, setPickerQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [sharedPreview, setSharedPreview] = useState<SharedStackPayload | null>(null);
  const [draggedBookIndex, setDraggedBookIndex] = useState<number | null>(null);
  const [draggedCatalogId, setDraggedCatalogId] = useState<string | null>(null);

  useEffect(() => {
    if (!stacks.some((s) => s.id === selectedStackId)) {
      setSelectedStackId(stacks[0]?.id ?? "");
    }
  }, [stacks, selectedStackId]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const raw = params.get("stack");
    if (raw) {
      const decoded = decodeSharedStack(raw);
      if (decoded) setSharedPreview(decoded);
    }
  }, []);

  const bookMap = useMemo(
    () => new Map(allAvailableBooks.map((b) => [b.id, b])),
    [allAvailableBooks],
  );

  const activeStack = stacks.find((s) => s.id === selectedStackId) ?? stacks[0] ?? null;

  const stackBooks = useMemo(() => {
    if (!activeStack) return [];
    return activeStack.bookIds
      .map((id) => bookMap.get(id))
      .filter((b): b is Technology => Boolean(b));
  }, [activeStack, bookMap]);

  const pickerBooks = useMemo(() => {
    const q = pickerQuery.trim().toLowerCase();
    return allAvailableBooks
      .filter((b) => !activeStack?.bookIds.includes(b.id))
      .filter((b) => !q || b.name.toLowerCase().includes(q) || b.category.toLowerCase().includes(q))
      .slice(0, 12);
  }, [allAvailableBooks, activeStack, pickerQuery]);

  function handleCreateStack(e: React.FormEvent) {
    e.preventDefault();
    if (!newStackName.trim()) return;
    const created = createStack(newStackName.trim());
    setSelectedStackId(created.id);
    setNewStackName("");
    notify("New stack created", `"${created.name}" is ready for volumes.`);
  }

  function handleShareStack(stackId: string, name: string, bookIds: string[]) {
    if (typeof window === "undefined") return;
    const encoded = encodeSharedStack(name, bookIds);
    const shareUrl = `${window.location.origin}/my-shelf?stack=${encodeURIComponent(encoded)}`;
    void navigator.clipboard?.writeText(shareUrl).catch(() => {});
    setCopiedId(stackId);
    notify("Shareable stack link copied", `Anyone with this link can view "${name}".`);
    window.setTimeout(() => setCopiedId(null), 2200);
  }

  function handleDropIntoStack(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    if (!activeStack) return;
    const catalogId = e.dataTransfer.getData("application/x-devshelf-catalog") || draggedCatalogId;
    if (catalogId) {
      addBookToStack(activeStack.id, catalogId);
      setDraggedCatalogId(null);
      return;
    }
  }

  return (
    <section aria-labelledby="tech-stacks-heading" className="mt-14 border-t border-border pt-12">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="inline-flex items-center gap-1.5 font-catalog text-[11px] tracking-[0.16em] uppercase text-muted-foreground">
            <Layers size={12} className="text-primary" /> CUSTOM COLLECTIONS
          </p>
          <h2 id="tech-stacks-heading" className="mt-1.5 font-editorial text-3xl text-foreground">
            Build your own tech stack
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            Gather books into custom reading stacks, drag volumes to rearrange their order, and copy
            a shareable link.
          </p>
        </div>

        {/* Starter Templates */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-catalog text-[10px] tracking-wider uppercase text-muted-foreground">
            Quick templates:
          </span>
          {presetTemplates.map((tpl) => (
            <button
              key={tpl.name}
              type="button"
              onClick={() => {
                const created = createStack(tpl.name, tpl.bookIds);
                setSelectedStackId(created.id);
                notify("Stack added", `Created "${tpl.name}".`);
              }}
              className="rounded border border-border bg-card px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:bg-muted"
            >
              + {tpl.name}
            </button>
          ))}
        </div>
      </div>

      {/* Shared Stack Preview Banner if ?stack= is in URL */}
      {sharedPreview && (
        <div className="mt-6 rounded-lg border border-primary/50 bg-secondary/70 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-catalog text-[10px] tracking-widest uppercase text-primary">
                SHARED STACK INVITATION
              </p>
              <h3 className="mt-1 font-editorial text-2xl text-foreground">{sharedPreview.name}</h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  const saved = createStack(sharedPreview.name, sharedPreview.bookIds);
                  setSelectedStackId(saved.id);
                  setSharedPreview(null);
                  notify("Shared stack saved", `"${saved.name}" was added to your stacks.`);
                }}
                className="rounded-md bg-primary px-3.5 py-2 text-xs font-medium text-primary-foreground"
              >
                Save copy to my stacks
              </button>
              <button
                type="button"
                onClick={() => setSharedPreview(null)}
                aria-label="Dismiss shared stack"
                className="rounded-md border border-border bg-card p-2 text-muted-foreground hover:text-foreground"
              >
                <X size={14} />
              </button>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {sharedPreview.bookIds
              .map((id) => bookMap.get(id))
              .filter((b): b is Technology => Boolean(b))
              .map((book) => (
                <button
                  key={book.id}
                  type="button"
                  onClick={() => openBookPreview(book)}
                  className="inline-flex items-center gap-2 rounded border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:border-primary"
                >
                  <TechLogo techId={book.id} size={14} />
                  {book.name}
                </button>
              ))}
          </div>
        </div>
      )}

      {/* Stack Workspace */}
      <div className="mt-7 grid grid-cols-1 gap-6 lg:grid-cols-[270px_1fr]">
        {/* Left: Stack Selector & Creator */}
        <div className="space-y-4">
          <form onSubmit={handleCreateStack} className="flex gap-2">
            <input
              type="text"
              value={newStackName}
              onChange={(e) => setNewStackName(e.target.value)}
              placeholder="New stack name…"
              aria-label="New stack name"
              className="min-w-0 flex-1 rounded-md border border-border bg-card px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />
            <button
              type="submit"
              className="inline-flex shrink-0 items-center gap-1 rounded-md bg-primary px-3 py-2 text-xs font-medium text-primary-foreground"
            >
              <Plus size={14} />
              Create
            </button>
          </form>

          <ul className="divide-y divide-border rounded-lg border border-border bg-card">
            {stacks.map((stack) => {
              const active = activeStack?.id === stack.id;
              return (
                <li key={stack.id} className="flex items-center justify-between gap-2 px-3 py-2.5">
                  <button
                    type="button"
                    onClick={() => setSelectedStackId(stack.id)}
                    className={`min-w-0 flex-1 text-left ${
                      active ? "font-semibold text-primary" : "text-foreground hover:text-primary"
                    }`}
                  >
                    <span className="block truncate text-sm">{stack.name}</span>
                    <span className="font-catalog text-[10px] text-muted-foreground">
                      {stack.bookIds.length} {stack.bookIds.length === 1 ? "VOLUME" : "VOLUMES"}
                    </span>
                  </button>

                  {stacks.length > 1 && (
                    <button
                      type="button"
                      onClick={() => deleteStack(stack.id)}
                      aria-label={`Delete ${stack.name}`}
                      className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-destructive"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right: Active Stack Dropzone & Reorderable Volumes */}
        {activeStack && (
          <div className="space-y-5 rounded-lg border border-border bg-card p-5 sm:p-6">
            <div className="flex flex-col gap-3 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0 flex-1">
                <label
                  htmlFor="active-stack-name"
                  className="font-catalog text-[10px] uppercase text-muted-foreground"
                >
                  STACK TITLE
                </label>
                <input
                  id="active-stack-name"
                  type="text"
                  value={activeStack.name}
                  onChange={(e) => renameStack(activeStack.id, e.target.value)}
                  className="mt-0.5 w-full bg-transparent font-editorial text-2xl text-foreground focus:outline-none"
                />
              </div>

              <button
                type="button"
                onClick={() =>
                  handleShareStack(activeStack.id, activeStack.name, activeStack.bookIds)
                }
                disabled={activeStack.bookIds.length === 0}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-border bg-background px-3.5 py-2 text-xs font-medium text-foreground transition-colors hover:bg-muted disabled:opacity-45"
              >
                {copiedId === activeStack.id ? (
                  <Check size={13} className="text-primary" />
                ) : (
                  <Share2 size={13} />
                )}
                {copiedId === activeStack.id ? "Link copied" : "Share stack link"}
              </button>
            </div>

            {/* Drop Zone */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDropIntoStack}
              className="min-h-[120px] rounded-md border border-dashed border-border bg-background/70 p-4"
            >
              {stackBooks.length === 0 ? (
                <p className="py-6 text-center text-xs text-muted-foreground">
                  Drag books from the shelf drawer below, or click + to tuck them into this stack.
                </p>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {stackBooks.map((book, index) => (
                    <div
                      key={book.id}
                      draggable
                      onDragStart={() => setDraggedBookIndex(index)}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        if (draggedBookIndex !== null && draggedBookIndex !== index) {
                          reorderBookInStack(activeStack.id, draggedBookIndex, index);
                        }
                        setDraggedBookIndex(null);
                      }}
                      className="flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 shadow-xs"
                    >
                      <GripVertical
                        size={13}
                        className="cursor-grab text-muted-foreground"
                        aria-hidden="true"
                      />
                      <button
                        type="button"
                        onClick={() => openBookPreview(book)}
                        className="inline-flex items-center gap-2 text-left text-xs font-medium text-foreground hover:text-primary"
                      >
                        <TechLogo techId={book.id} size={15} />
                        <span>{book.name}</span>
                      </button>

                      <div className="ml-1 flex items-center gap-0.5 border-l border-border pl-1.5">
                        <button
                          type="button"
                          disabled={index === 0}
                          onClick={() => reorderBookInStack(activeStack.id, index, index - 1)}
                          aria-label={`Move ${book.name} left`}
                          className="rounded p-0.5 text-muted-foreground hover:text-foreground disabled:opacity-25"
                        >
                          <ArrowLeft size={12} />
                        </button>
                        <button
                          type="button"
                          disabled={index === stackBooks.length - 1}
                          onClick={() => reorderBookInStack(activeStack.id, index, index + 1)}
                          aria-label={`Move ${book.name} right`}
                          className="rounded p-0.5 text-muted-foreground hover:text-foreground disabled:opacity-25"
                        >
                          <ArrowRight size={12} />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeBookFromStack(activeStack.id, book.id)}
                          aria-label={`Remove ${book.name} from stack`}
                          className="rounded p-0.5 text-muted-foreground hover:text-destructive"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Catalog Picker Drawer (Drag or Click to Add) */}
            <div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="font-catalog text-[10px] tracking-wider uppercase text-muted-foreground">
                  DRAG OR CLICK VOLUMES TO ADD
                </p>
                <input
                  type="search"
                  value={pickerQuery}
                  onChange={(e) => setPickerQuery(e.target.value)}
                  placeholder="Filter books to add…"
                  aria-label="Filter books to add to stack"
                  className="rounded border border-border bg-background px-2.5 py-1 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div className="mt-2.5 flex flex-wrap gap-2">
                {pickerBooks.map((book) => (
                  <button
                    key={book.id}
                    type="button"
                    draggable
                    onDragStart={(e) => {
                      setDraggedCatalogId(book.id);
                      e.dataTransfer.setData("application/x-devshelf-catalog", book.id);
                    }}
                    onClick={() => addBookToStack(activeStack.id, book.id)}
                    className="inline-flex items-center gap-1.5 rounded border border-border bg-background px-2.5 py-1.5 text-xs text-foreground transition-colors hover:border-primary hover:bg-muted"
                  >
                    <Plus size={12} className="text-primary" />
                    <TechLogo techId={book.id} size={13} />
                    <span>{book.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

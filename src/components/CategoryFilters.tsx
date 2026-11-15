import { collections, type ShelfCategory } from "@/lib/devshelf-catalog";

type CategoryFiltersProps = {
  selected: "All" | ShelfCategory;
  onSelect: (category: "All" | ShelfCategory) => void;
};

export function CategoryFilters({ selected, onSelect }: CategoryFiltersProps) {
  return (
    <div
      role="tablist"
      aria-label="Filter catalogue by shelf category"
      className="flex items-center gap-1.5 overflow-x-auto pb-1 shelf-scroll"
    >
      <button
        type="button"
        role="tab"
        aria-selected={selected === "All"}
        onClick={() => onSelect("All")}
        className={`shrink-0 whitespace-nowrap rounded-md px-3.5 py-2 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
          selected === "All"
            ? "bg-primary text-primary-foreground"
            : "border border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
        }`}
      >
        All Collections
      </button>

      {collections.map((collection) => {
        const active = selected === collection.category;
        return (
          <button
            key={collection.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onSelect(collection.category)}
            className={`inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-md px-3.5 py-2 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
              active
                ? "bg-primary text-primary-foreground"
                : "border border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full border border-black/15"
              style={{ backgroundColor: collection.accentHex }}
            />
            {collection.category}
          </button>
        );
      })}
    </div>
  );
}

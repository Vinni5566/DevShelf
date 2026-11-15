import { Search, X } from "lucide-react";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  resultCount: number;
  placeholder?: string;
};

export function SearchBar({
  value,
  onChange,
  resultCount,
  placeholder = "Search by name, category, or tag (e.g. React, SQL, containers)…",
}: SearchBarProps) {
  return (
    <label className="flex h-14 w-full items-center gap-3 rounded-lg border border-border bg-card px-4 shadow-sm transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
      <Search size={19} strokeWidth={1.8} className="shrink-0 text-muted-foreground" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search the technology catalogue"
        className="min-w-0 flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search query"
          className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:text-foreground"
        >
          <X size={14} />
        </button>
      )}
      <span className="font-catalog shrink-0 border-l border-border pl-3 text-xs tabular-nums text-muted-foreground">
        {resultCount} {resultCount === 1 ? "VOLUME" : "VOLUMES"}
      </span>
    </label>
  );
}

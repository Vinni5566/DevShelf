import { Bookmark, Check, ArrowUpRight } from "lucide-react";
import { TechLogo } from "@/components/TechLogo";
import type { CoverTone, Technology } from "@/lib/devshelf-catalog";

const coverPalette: Record<
  CoverTone,
  {
    face: string;
    spine: string;
    band: string;
    ink: string;
    mutedInk: string;
    accent: string;
  }
> = {
  lavender: {
    face: "#C3B2DB",
    spine: "#9F89BF",
    band: "#F7F1E5",
    ink: "#392F2A",
    mutedInk: "#5A4B44",
    accent: "#765E9B",
  },
  butter: {
    face: "#EBD99C",
    spine: "#CEB76F",
    band: "#FAF6EC",
    ink: "#3D3228",
    mutedInk: "#665544",
    accent: "#997E36",
  },
  sage: {
    face: "#B1C2AA",
    spine: "#8CA284",
    band: "#F8F4EA",
    ink: "#33382F",
    mutedInk: "#525C4D",
    accent: "#5A7452",
  },
  rose: {
    face: "#DFB8C2",
    spine: "#BF8E9B",
    band: "#FBF6F1",
    ink: "#3D2F31",
    mutedInk: "#664E52",
    accent: "#9C5F70",
  },
  powder: {
    face: "#B6CBDC",
    spine: "#8DA7BE",
    band: "#F9F5EC",
    ink: "#2E363E",
    mutedInk: "#4E5C69",
    accent: "#587B99",
  },
  peach: {
    face: "#E6C1AA",
    spine: "#C7997D",
    band: "#FCF7EE",
    ink: "#3F3129",
    mutedInk: "#685144",
    accent: "#9E6A4C",
  },
};

type BookProps = {
  book: Technology;
  isFavorite: boolean;
  onSelect: (book: Technology) => void;
  onToggleFavorite: (id: string) => void;
  variant?: "shelf" | "large";
};

export function Book({
  book,
  isFavorite,
  onSelect,
  onToggleFavorite,
  variant = "shelf",
}: BookProps) {
  const palette = coverPalette[book.cover];
  const isLarge = variant === "large";

  const height = isLarge ? 296 : book.height;
  const width = isLarge ? 196 : book.width;
  const spineW = isLarge ? 24 : book.thickness;

  return (
    <div
      className={`group relative shrink-0 select-none ${isLarge ? "" : "flex flex-col justify-end"}`}
      style={
        isLarge
          ? { width: `${width + spineW}px`, height: `${height}px` }
          : { height: `${height}px` }
      }
    >
      {/* Grounded contact shadow on wooden shelf */}
      {!isLarge && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-1 left-2 right-1 h-2.5 rounded-full bg-[#3A2B22]/25 blur-[3px] transition-all duration-200 group-hover:scale-x-90 group-hover:bg-[#3A2B22]/15 dark:bg-black/50"
        />
      )}

      {/* Floating librarian hover tooltip (shelf mode only) */}
      {!isLarge && (
        <div
          role="tooltip"
          className="pointer-events-none absolute bottom-[calc(100%+12px)] left-1/2 z-30 hidden w-56 -translate-x-1/2 translate-y-1.5 rounded-md border border-border bg-card px-3.5 py-2.5 text-left opacity-0 shadow-lg transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 md:block"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="font-catalog text-[10px] tracking-wider text-muted-foreground">
              {book.catalogNo}
            </span>
            <span className="text-[10px] font-medium text-muted-foreground">{book.category}</span>
          </div>
          <p className="mt-1 font-editorial text-sm text-foreground">{book.name}</p>
          <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-muted-foreground">
            {book.description}
          </p>
          <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-primary">
            Inspect volume <ArrowUpRight size={11} />
          </span>
        </div>
      )}

      {/* Quick bookmark ribbon button on shelf */}
      {!isLarge && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(book.id);
          }}
          aria-label={
            isFavorite ? `Remove ${book.name} from My Shelf` : `Save ${book.name} to My Shelf`
          }
          aria-pressed={isFavorite}
          title={isFavorite ? "Saved to My Shelf" : "Save to My Shelf"}
          className={`absolute -top-2 right-1.5 z-20 flex h-7 w-7 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-all duration-150 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
            isFavorite
              ? "opacity-100 text-primary"
              : "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 hover:text-primary"
          }`}
        >
          {isFavorite ? (
            <Check size={13} strokeWidth={2.4} />
          ) : (
            <Bookmark size={13} strokeWidth={1.8} />
          )}
        </button>
      )}

      {/* Main 3D Book Button / Showcase */}
      <button
        type="button"
        onClick={() => onSelect(book)}
        aria-label={`Open ${book.name} book preview (${book.category})`}
        className={`book-3d-trigger relative flex h-full items-stretch text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring ${
          isLarge ? "cursor-default" : "cursor-pointer"
        }`}
        style={{ width: `${width + spineW}px` }}
      >
        <div
          className="book-3d-shell relative flex h-full w-full items-stretch rounded-r-[4px] rounded-l-[2px]"
          style={{
            boxShadow: isLarge
              ? "12px 18px 34px rgba(58, 43, 34, 0.24), 2px 4px 10px rgba(58, 43, 34, 0.14)"
              : "3px 5px 10px rgba(58, 43, 34, 0.16), 1px 2px 3px rgba(58, 43, 34, 0.12)",
          }}
        >
          {/* Left 3D Spine */}
          <div
            aria-hidden="true"
            className="book-cloth-texture relative flex shrink-0 flex-col items-center justify-between overflow-hidden rounded-l-[3px] border-y border-l border-[#3A2E27]/25 py-2.5"
            style={{
              width: `${spineW}px`,
              backgroundColor: palette.spine,
              color: palette.ink,
              boxShadow:
                "inset -3px 0 5px rgba(58, 43, 34, 0.18), inset 2px 0 3px rgba(255, 255, 255, 0.22)",
            }}
          >
            {/* Raised Spine Rib Bands */}
            <span className="h-[2px] w-full bg-[#3A2E27]/20" />
            <span
              className="font-catalog tracking-widest uppercase"
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
                fontSize: isLarge ? "9px" : "7px",
                opacity: 0.72,
              }}
            >
              {book.spineLabel}
            </span>
            <span className="h-[2px] w-full bg-[#3A2E27]/20" />
          </div>

          {/* Front Cover Face */}
          <div
            className="book-cloth-texture relative flex flex-1 flex-col overflow-hidden rounded-r-[4px] border border-l-0 border-[#3A2E27]/22"
            style={{
              backgroundColor: palette.face,
              color: palette.ink,
              boxShadow:
                "inset 4px 0 7px rgba(58, 43, 34, 0.1), inset -2px 0 3px rgba(255, 255, 255, 0.25)",
            }}
          >
            {/* Top Cream Page Block Edge */}
            <div
              aria-hidden="true"
              className="h-[4px] w-full border-b border-[#3A2E27]/15"
              style={{
                background:
                  "repeating-linear-gradient(90deg, var(--page-edge) 0px, var(--page-edge) 3px, var(--page-edge-line) 3px, var(--page-edge-line) 4px)",
              }}
            />

            {/* Cover Template Artwork */}
            <div className="relative flex flex-1 flex-col justify-between p-2.5">
              <CoverTemplateArtwork book={book} palette={palette} isLarge={isLarge} />
            </div>

            {/* Right Cream Fore-edge Page Lip */}
            <div
              aria-hidden="true"
              className="absolute top-[4px] right-0 bottom-0 w-[3px]"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(253, 251, 246, 0.55) 60%, rgba(58, 43, 34, 0.18))",
              }}
            />
          </div>
        </div>
      </button>
    </div>
  );
}

function CoverTemplateArtwork({
  book,
  palette,
  isLarge,
}: {
  book: Technology;
  palette: (typeof coverPalette)[CoverTone];
  isLarge: boolean;
}) {
  const logoSize = isLarge ? 30 : 19;
  const titleClass = isLarge ? "text-[22px] leading-[1.12]" : "text-[13px] leading-[1.15]";

  switch (book.template) {
    case "linen-framed":
      return (
        <div
          className="flex h-full flex-col items-center justify-between border px-1.5 py-2 text-center"
          style={{ borderColor: `${palette.ink}33` }}
        >
          <span
            className="font-catalog text-[8px] tracking-widest uppercase"
            style={{ color: palette.mutedInk }}
          >
            {book.catalogNo}
          </span>
          <div className="flex flex-col items-center gap-2">
            <div
              className="flex items-center justify-center rounded-full border"
              style={{
                width: isLarge ? 58 : 36,
                height: isLarge ? 58 : 36,
                backgroundColor: palette.band,
                borderColor: `${palette.ink}30`,
                color: palette.ink,
              }}
            >
              <TechLogo techId={book.id} size={logoSize} />
            </div>
            <span className={`font-editorial ${titleClass}`} style={{ color: palette.ink }}>
              {book.name}
            </span>
          </div>
          <div className="flex items-center gap-1.5" style={{ color: palette.accent }}>
            <span className="h-px w-3 bg-current opacity-50" />
            <span className="text-[9px]">✦</span>
            <span className="h-px w-3 bg-current opacity-50" />
          </div>
        </div>
      );

    case "botanical-arch":
      return (
        <div
          className="flex h-full flex-col items-center justify-between rounded-t-full border px-1.5 pt-3 pb-2 text-center"
          style={{
            borderColor: `${palette.ink}30`,
            backgroundColor: `${palette.band}55`,
          }}
        >
          <span className="text-[10px]" style={{ color: palette.accent }}>
            ❧
          </span>
          <div className="flex flex-col items-center gap-1.5">
            <span className={`font-editorial ${titleClass}`} style={{ color: palette.ink }}>
              {book.name}
            </span>
            <span
              className="font-catalog text-[7.5px] tracking-wider uppercase"
              style={{ color: palette.mutedInk }}
            >
              {book.category}
            </span>
          </div>
          <div
            className="flex items-center justify-center rounded-full p-1.5"
            style={{ backgroundColor: palette.band, color: palette.ink }}
          >
            <TechLogo techId={book.id} size={logoSize} />
          </div>
        </div>
      );

    case "gilded-stripe":
      return (
        <div className="flex h-full flex-col justify-between py-1">
          <div className="flex items-center justify-between px-1">
            <span className="font-catalog text-[7.5px]" style={{ color: palette.mutedInk }}>
              {book.yearReleased}
            </span>
            <span className="text-[9px]" style={{ color: palette.accent }}>
              ✳
            </span>
          </div>
          {/* Cream Belly-Band */}
          <div
            className="-mx-2.5 flex flex-col items-center gap-1.5 border-y px-2 py-2.5 text-center"
            style={{
              backgroundColor: palette.band,
              borderColor: `${palette.ink}28`,
              color: palette.ink,
            }}
          >
            <TechLogo techId={book.id} size={logoSize} />
            <span className={`font-editorial ${titleClass}`}>{book.name}</span>
          </div>
          <div className="flex justify-center">
            <span
              className="h-0.5 w-8 rounded-full"
              style={{ backgroundColor: `${palette.ink}30` }}
            />
          </div>
        </div>
      );

    case "monogram-seal":
      return (
        <div className="relative flex h-full flex-col justify-between p-1">
          <div className="flex items-start justify-between">
            <div
              className="flex items-center justify-center rounded-[3px] border p-1.5"
              style={{
                backgroundColor: palette.band,
                borderColor: `${palette.ink}28`,
                color: palette.ink,
              }}
            >
              <TechLogo techId={book.id} size={logoSize} />
            </div>
            <span className="font-catalog text-[7.5px]" style={{ color: palette.mutedInk }}>
              {book.catalogNo}
            </span>
          </div>
          <div
            className="my-auto h-px w-full -rotate-6"
            style={{ backgroundColor: `${palette.ink}24` }}
          />
          <div>
            <span className={`block font-editorial ${titleClass}`} style={{ color: palette.ink }}>
              {book.name}
            </span>
            <span
              className="mt-0.5 block font-catalog text-[7.5px] uppercase"
              style={{ color: palette.mutedInk }}
            >
              {book.category}
            </span>
          </div>
        </div>
      );

    case "corner-ornament":
      return (
        <div className="relative flex h-full flex-col items-center justify-between p-1.5 text-center">
          {/* Corner Brackets */}
          <span
            className="absolute top-0 left-0 h-2.5 w-2.5 border-t border-l"
            style={{ borderColor: palette.ink }}
          />
          <span
            className="absolute top-0 right-0 h-2.5 w-2.5 border-t border-r"
            style={{ borderColor: palette.ink }}
          />
          <span
            className="absolute bottom-0 left-0 h-2.5 w-2.5 border-b border-l"
            style={{ borderColor: palette.ink }}
          />
          <span
            className="absolute right-0 bottom-0 h-2.5 w-2.5 border-r border-b"
            style={{ borderColor: palette.ink }}
          />

          <span
            className="font-catalog text-[7.5px] tracking-widest uppercase"
            style={{ color: palette.mutedInk }}
          >
            EDITION
          </span>

          <div
            className="flex items-center justify-center rotate-45 border p-2"
            style={{
              backgroundColor: palette.band,
              borderColor: `${palette.ink}35`,
              color: palette.ink,
            }}
          >
            <div className="-rotate-45">
              <TechLogo techId={book.id} size={logoSize - 2} />
            </div>
          </div>

          <span className={`font-editorial ${titleClass}`} style={{ color: palette.ink }}>
            {book.name}
          </span>
        </div>
      );

    case "halftone-band":
    default:
      return (
        <div className="flex h-full flex-col justify-between">
          {/* Classic Book Plate Header */}
          <div
            className="rounded-[2px] border px-2 py-2 text-center"
            style={{
              backgroundColor: palette.band,
              borderColor: `${palette.ink}28`,
              color: palette.ink,
            }}
          >
            <span className={`block font-editorial ${titleClass}`}>{book.name}</span>
            <span
              className="mt-0.5 block font-catalog text-[7px] tracking-widest uppercase"
              style={{ color: palette.mutedInk }}
            >
              {book.catalogNo}
            </span>
          </div>

          <div className="flex flex-1 items-center justify-center" style={{ color: palette.ink }}>
            <TechLogo techId={book.id} size={logoSize + 2} />
          </div>

          <div
            className="flex items-center justify-between border-t pt-1"
            style={{ borderColor: `${palette.ink}24` }}
          >
            <span className="font-catalog text-[7px]" style={{ color: palette.mutedInk }}>
              DOCS
            </span>
            <span className="text-[9px]" style={{ color: palette.accent }}>
              ✦
            </span>
          </div>
        </div>
      );
  }
}

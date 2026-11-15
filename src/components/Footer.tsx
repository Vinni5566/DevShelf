import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { FooterBookplateVignette } from "@/components/ShelfProps";

export function Footer() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();

  function handleCollectionsClick() {
    if (pathname === "/") {
      document.getElementById("collections")?.scrollIntoView({ behavior: "smooth" });
    } else {
      void navigate({ to: "/", hash: "collections" });
    }
  }

  return (
    <footer className="mt-16 border-t border-border bg-secondary/45">
      <div className="mx-auto max-w-[1240px] px-5 py-12 sm:px-8 lg:px-12">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          {/* Left: Storybook Closing Colophon */}
          <div className="flex items-start gap-5">
            <div className="hidden text-foreground sm:block">
              <FooterBookplateVignette />
            </div>
            <div>
              <Link to="/" className="font-editorial text-2xl tracking-tight text-foreground">
                DevShelf
              </Link>
              <p className="mt-1.5 font-editorial text-base italic text-muted-foreground">
                &ldquo;A little library for the endlessly curious.&rdquo;
              </p>
              <p className="mt-2 font-catalog text-[10px] tracking-[0.14em] uppercase text-muted-foreground">
                COLOPHON · BOUND FOR INDEPENDENT EXPLORATION
              </p>
            </div>
          </div>

          {/* Right: Navigation, GitHub & Feedback */}
          <div className="flex flex-wrap items-center gap-x-7 gap-y-3 text-sm">
            <Link
              to="/"
              className="whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground"
            >
              Discover
            </Link>
            <button
              type="button"
              onClick={handleCollectionsClick}
              className="cursor-pointer whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground"
            >
              Collections
            </button>
            <Link
              to="/explore"
              className="whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground"
            >
              Explore
            </Link>
            <Link
              to="/my-shelf"
              className="whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground"
            >
              My Shelf
            </Link>
            <span aria-hidden="true" className="hidden text-border sm:inline">
              |
            </span>
            <a
              href="https://github.com/Vinni5566/devshelf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground"
            >
              GitHub <ExternalLink size={12} />
            </a>
            <a
              href="mailto:hello@devshelf.dev?subject=DevShelf%20Library%20Feedback"
              className="inline-flex items-center gap-1 whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground"
            >
              Feedback <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

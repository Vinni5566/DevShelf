import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { BookPreviewModal } from "@/components/BookPreviewModal";
import { Footer } from "@/components/Footer";
import { LibrarianAssistant } from "@/components/LibrarianAssistant";
import { LibraryToast } from "@/components/LibraryToast";
import { MysteryBookModal } from "@/components/MysteryBookModal";
import { Navbar } from "@/components/Navbar";
import { PersonalizeDrawer } from "@/components/PersonalizeDrawer";
import { LibraryProvider } from "@/lib/library-storage";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <p className="font-catalog text-xs tracking-widest uppercase text-muted-foreground">
          VOLUME NOT FOUND
        </p>
        <h1 className="mt-3 font-editorial text-6xl text-foreground">404</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          The shelf or reading room you&apos;re looking for isn&apos;t in this wing of the library.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Return to the library
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-editorial text-2xl text-foreground">This page didn&apos;t load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back to the reading room.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "DevShelf — An Immersive Digital Library for Developers" },
      {
        name: "description",
        content:
          "The internet's little library for curious developers. Browse languages, frameworks, and tools arranged as physical books on curated shelves.",
      },
      { property: "og:title", content: "DevShelf — An Immersive Digital Library" },
      {
        property: "og:description",
        content:
          "Somewhere between curiosity and code. Find your next favorite developer documentation on the shelf.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400..700;1,9..40,400..500&family=DM+Serif+Display:ital@0;1&family=Space+Mono:wght@400;700&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="paper-grain min-h-screen bg-background text-foreground">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <LibraryProvider>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <div className="flex-1">
            <Outlet />
          </div>
          <Footer />
        </div>
        <BookPreviewModal />
        <MysteryBookModal />
        <PersonalizeDrawer />
        <LibrarianAssistant />
        <LibraryToast />
      </LibraryProvider>
    </QueryClientProvider>
  );
}

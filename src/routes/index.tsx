import { createFileRoute } from "@tanstack/react-router";
import { BookOfTheDay } from "@/components/BookOfTheDay";
import { Bookshelf } from "@/components/Bookshelf";
import { HeroSection } from "@/components/HeroSection";
import { SecretRoomsSection } from "@/components/SecretRoomsSection";
import { useLibrary } from "@/lib/library-storage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DevShelf" },
      {
        name: "description",
        content:
          "Somewhere between curiosity and code. A curated digital bookstore of programming languages, frameworks, and developer tools.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { quietMode } = useLibrary();

  return (
    <main>
      {!quietMode && (
        <>
          <HeroSection />
          <BookOfTheDay />
        </>
      )}
      <Bookshelf />
      {!quietMode && <SecretRoomsSection />}
    </main>
  );
}

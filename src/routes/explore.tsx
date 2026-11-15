import { createFileRoute } from "@tanstack/react-router";
import { ExplorePage } from "@/components/ExplorePage";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore the Catalogue — DevShelf" },
      {
        name: "description",
        content: "Search and browse all 39 volumes across 7 curated developer collections.",
      },
    ],
  }),
  component: ExplorePage,
});

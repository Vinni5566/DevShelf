import { createFileRoute } from "@tanstack/react-router";
import { ExplorePage } from "@/components/ExplorePage";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore | DevShelf" },
      {
        name: "description",
        content: "Search and browse 58 volumes across 10 curated developer collections.",
      },
    ],
  }),
  component: ExplorePage,
});

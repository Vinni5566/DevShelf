import { createFileRoute } from "@tanstack/react-router";
import { MyShelfPage } from "@/components/MyShelfPage";

export const Route = createFileRoute("/my-shelf")({
  head: () => ({
    meta: [
      { title: "My Shelf | DevShelf" },
      {
        name: "description",
        content:
          "Your personal shelf of bookmarked developer documentation and recently explored volumes.",
      },
    ],
  }),
  component: MyShelfPage,
});

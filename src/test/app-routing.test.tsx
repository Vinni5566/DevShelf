import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { learningAdventures, passportStampDefs, secretRooms } from "@/lib/devshelf-adventures";
import { collections, filterCatalog, technologies } from "@/lib/devshelf-catalog";
import {
  getBookEnrichment,
  getBookOfTheDay,
  getDailyMysteryBook,
  getRelatedBooks,
  getUpdatedVolumes,
  secretBook,
} from "@/lib/devshelf-enrichments";
import { routeTree } from "@/routeTree.gen";

describe("App routing and catalog", () => {
  it("matches pages for /, /explore, and /my-shelf", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    for (const path of ["/", "/explore", "/my-shelf"]) {
      const matches = router.matchRoutes(path);
      expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
    }
  });

  it("includes all 10 curated collections and valid documentation URLs", () => {
    expect(collections).toHaveLength(10);
    expect(technologies).toHaveLength(57);
    for (const tech of technologies) {
      expect(tech.docs).toMatch(/^https:\/\//);
    }
    expect(filterCatalog(technologies, "", "AR/VR").length).toBeGreaterThanOrEqual(6);
    expect(filterCatalog(technologies, "", "UI/UX").length).toBeGreaterThanOrEqual(6);
    expect(filterCatalog(technologies, "", "App Dev").length).toBeGreaterThanOrEqual(6);
  });

  it("filters by name, category, and tags and sorts alphabetically", () => {
    const containerHits = filterCatalog(technologies, "containers", "All");
    expect(containerHits.map((t) => t.id)).toEqual(
      expect.arrayContaining(["docker", "kubernetes"]),
    );

    const sortedAZ = filterCatalog(technologies, "", "Languages", "az");
    expect(sortedAZ.map((t) => t.name)).toEqual([
      "C++",
      "Go",
      "Java",
      "JavaScript",
      "Python",
      "Rust",
      "TypeScript",
    ]);
  });

  it("provides deterministic daily picks, enrichments, and related volumes", () => {
    const sampleDate = new Date("2026-11-15T12:00:00Z");
    const bookOfDay = getBookOfTheDay(sampleDate);
    const dailyMystery = getDailyMysteryBook(sampleDate);

    expect(bookOfDay).toEqual(getBookOfTheDay(sampleDate));
    expect(dailyMystery).toEqual(getDailyMysteryBook(sampleDate));
    expect(bookOfDay.id).not.toBe(dailyMystery.id);

    const react = technologies.find((t) => t.id === "react")!;
    const enrichment = getBookEnrichment(react);
    expect(enrichment.difficulty).toBe("Gentle Start");
    expect(enrichment.edition.version).toBeTruthy();

    const related = getRelatedBooks(react, technologies);
    expect(related).toHaveLength(3);
    expect(related.every((r) => r.id !== "react")).toBe(true);

    expect(getUpdatedVolumes(technologies).length).toBeGreaterThan(0);
    expect(secretBook.docs).toMatch(/^https:\/\//);
  });

  it("defines valid learning adventures, secret rooms, and passport stamps", () => {
    const allIds = new Set(technologies.map((t) => t.id));

    expect(learningAdventures).toHaveLength(4);
    for (const trail of learningAdventures) {
      for (const id of trail.bookIds) {
        expect(allIds.has(id)).toBe(true);
      }
    }

    expect(secretRooms).toHaveLength(6);
    for (const room of secretRooms) {
      for (const id of room.featuredBookIds) {
        expect(allIds.has(id)).toBe(true);
      }
    }

    expect(passportStampDefs).toHaveLength(12);
  });
});

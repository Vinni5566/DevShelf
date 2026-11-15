import type { ShelfCategory } from "@/lib/devshelf-catalog";

export type LearningAdventure = {
  id: string;
  title: string;
  kicker: string;
  description: string;
  accentHex: string;
  bookIds: string[];
};

export type SecretRoom = {
  id: string;
  title: string;
  subtitle: string;
  atmosphere: string;
  accentHex: string;
  roomTone: string;
  categories: ShelfCategory[];
  featuredBookIds: string[];
};

export type PassportStampDef = {
  id: string;
  title: string;
  subtitle: string;
  sealSymbol: string;
  accentHex: string;
  requirementLabel: string;
};

export const learningAdventures: LearningAdventure[] = [
  {
    id: "first-fullstack",
    title: "Your First Full-Stack Project",
    kicker: "TRAIL 01 · 6 VOLUMES",
    description:
      "From semantic markup and styling to interactive components, APIs, and durable data.",
    accentHex: "#AFC5D7",
    bookIds: ["html", "css", "typescript", "react", "nodejs", "postgresql"],
  },
  {
    id: "enter-ai",
    title: "Enter the World of AI",
    kicker: "TRAIL 02 · 5 VOLUMES",
    description:
      "Start with Python foundations, move through classical ML, deep tensors, and open models.",
    accentHex: "#B7A3D0",
    bookIds: ["python", "scikit-learn", "pytorch", "huggingface", "openai"],
  },
  {
    id: "git-wizard",
    title: "Become a Git & Shipping Wizard",
    kicker: "TRAIL 03 · 5 VOLUMES",
    description:
      "Master branching history, collaborative reviews, containers, orchestration, and editor craft.",
    accentHex: "#E5BFA6",
    bookIds: ["git", "github", "docker", "kubernetes", "vscode"],
  },
  {
    id: "spatial-craft",
    title: "Craft Spatial & Tactile Interfaces",
    kicker: "TRAIL 04 · 5 VOLUMES",
    description:
      "Blend design systems, accessible primitives, motion physics, and real-time 3D worlds.",
    accentHex: "#D9AEB9",
    bookIds: ["figma", "radix-ui", "framer", "threejs", "webxr"],
  },
];

export const secretRooms: SecretRoom[] = [
  {
    id: "ai-observatory",
    title: "The AI Observatory",
    subtitle: "Skylights, star charts, tensors, and open-weight models.",
    atmosphere: "Quiet brass telescopes and notebooks filled with vector math.",
    accentHex: "#B7A3D0",
    roomTone: "#EDE7F5",
    categories: ["AI/ML"],
    featuredBookIds: ["pytorch", "tensorflow", "scikit-learn", "huggingface", "openai"],
  },
  {
    id: "frontend-atelier",
    title: "The Frontend Atelier",
    subtitle: "Drafting tables, color swatches, and reactive browser canvases.",
    atmosphere: "Sunlit linen curtains and carefully typeset layout grids.",
    accentHex: "#AFC5D7",
    roomTone: "#E8F0F6",
    categories: ["Frontend"],
    featuredBookIds: ["react", "nextjs", "vue", "angular", "html", "css", "tailwind"],
  },
  {
    id: "database-basement",
    title: "The Database Basement",
    subtitle: "Stone arches, indexed drawers, relational ledgers, and swift caches.",
    atmosphere: "Cool cedar cabinets holding every transaction in strict order.",
    accentHex: "#D9AEB9",
    roomTone: "#F5E9EC",
    categories: ["Databases"],
    featuredBookIds: ["postgresql", "mongodb", "redis", "mysql", "firebase"],
  },
  {
    id: "cloud-tower",
    title: "The Cloud Tower",
    subtitle: "Wind-swept balconies for containers, clusters, and distributed services.",
    atmosphere: "Blueprints of resilient servers pinned neatly to corkboards.",
    accentHex: "#A9BBA2",
    roomTone: "#EBF1E8",
    categories: ["Backend", "DevOps"],
    featuredBookIds: ["docker", "kubernetes", "nodejs", "fastapi", "spring"],
  },
  {
    id: "wizards-workshop",
    title: "The Wizard's Workshop",
    subtitle: "Version-control time machines, editor bindings, and systems lore.",
    atmosphere: "Candlelight, mechanical keyboards, and time-tested CLI manuals.",
    accentHex: "#EBD99C",
    roomTone: "#F7F1DC",
    categories: ["Languages", "DevOps"],
    featuredBookIds: ["git", "github", "vscode", "postman", "rust", "cpp", "go"],
  },
  {
    id: "design-corner",
    title: "The Design Corner",
    subtitle: "Specimen books, typography rules, interaction heuristics, and spatial UI.",
    atmosphere: "Pressed botanicals, Pantone chips, and hand-bound sketchbooks.",
    accentHex: "#E5BFA6",
    roomTone: "#F6ECE4",
    categories: ["Design", "UI/UX"],
    featuredBookIds: ["figma", "framer", "storybook", "material-design", "apple-hig", "laws-of-ux"],
  },
];

export const passportStampDefs: PassportStampDef[] = [
  {
    id: "first-chapter",
    title: "First Chapter",
    subtitle: "Opened your very first volume",
    sealSymbol: "I",
    accentHex: "#EBD99C",
    requirementLabel: "Explore 1 volume",
  },
  {
    id: "python-explorer",
    title: "Python Explorer",
    subtitle: "Visited the Python reference shelf",
    sealSymbol: "Py",
    accentHex: "#EBD99C",
    requirementLabel: "Inspect Python",
  },
  {
    id: "frontend-wanderer",
    title: "Frontend Wanderer",
    subtitle: "Browsed the browser atelier",
    sealSymbol: "✦",
    accentHex: "#AFC5D7",
    requirementLabel: "Explore 3 Frontend volumes",
  },
  {
    id: "database-detective",
    title: "Database Detective",
    subtitle: "Unlocked secrets of the Data Room",
    sealSymbol: "❋",
    accentHex: "#D9AEB9",
    requirementLabel: "Explore 2 Database volumes",
  },
  {
    id: "ai-adventurer",
    title: "AI Adventurer",
    subtitle: "Charted the Machine Learning Corner",
    sealSymbol: "✳",
    accentHex: "#B7A3D0",
    requirementLabel: "Explore 2 AI/ML volumes",
  },
  {
    id: "spatial-pioneer",
    title: "Spatial Pioneer",
    subtitle: "Stepped into 3D & XR worlds",
    sealSymbol: "◈",
    accentHex: "#AFC5D7",
    requirementLabel: "Explore an AR/VR volume",
  },
  {
    id: "ux-connoisseur",
    title: "UX Connoisseur",
    subtitle: "Studied accessibility & craft",
    sealSymbol: "❧",
    accentHex: "#D9AEB9",
    requirementLabel: "Explore 2 UI/UX or Design volumes",
  },
  {
    id: "app-builder",
    title: "App Builder",
    subtitle: "Visited the Mobile & App Studio",
    sealSymbol: "⟐",
    accentHex: "#A9BBA2",
    requirementLabel: "Explore 2 App Dev volumes",
  },
  {
    id: "open-source-traveler",
    title: "Open Source Traveler",
    subtitle: "Roamed across five distinct shelves",
    sealSymbol: "◉",
    accentHex: "#A9BBA2",
    requirementLabel: "Visit 5 categories",
  },
  {
    id: "stack-architect",
    title: "Stack Architect",
    subtitle: "Curated a custom tech stack",
    sealSymbol: "⊞",
    accentHex: "#E5BFA6",
    requirementLabel: "Save a custom stack",
  },
  {
    id: "marginalia-scribe",
    title: "Marginalia Scribe",
    subtitle: "Wrote personal notes inside a volume",
    sealSymbol: "✎",
    accentHex: "#B7A3D0",
    requirementLabel: "Add a personal book note",
  },
  {
    id: "secret-keeper",
    title: "Candlelight Finder",
    subtitle: "Discovered a hidden library secret",
    sealSymbol: "🕯",
    accentHex: "#EBD99C",
    requirementLabel: "Find a library Easter egg",
  },
];

export const librarianQuotes = [
  "A good developer library is never finished — it grows with every curiosity.",
  "Even a five-minute glance at unfamiliar docs can spark a weekend project.",
  "The quietest breakthroughs often begin by flipping open a book outside your daily stack.",
  "Leave little notes in the margins for your future self.",
];

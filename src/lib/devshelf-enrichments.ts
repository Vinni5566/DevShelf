import { technologies, type ShelfCategory, type Technology } from "@/lib/devshelf-catalog";

export type DifficultyLabel = "Gentle Start" | "Intermediate" | "Deep Craft";

export type EditionUpdate = {
  version: string;
  lastChecked: string;
  releaseNote: string;
  hasRecentUpdate?: boolean;
};

export type BookEnrichment = {
  difficulty: DifficultyLabel;
  funFact: string;
  whyExplore: string;
  relatedIds: string[];
  edition: EditionUpdate;
};

const defaultDifficultyByCategory: Record<ShelfCategory, DifficultyLabel> = {
  Languages: "Intermediate",
  Frontend: "Gentle Start",
  Backend: "Intermediate",
  Databases: "Intermediate",
  "AI/ML": "Intermediate",
  DevOps: "Intermediate",
  Design: "Gentle Start",
  "AR/VR": "Intermediate",
  "UI/UX": "Gentle Start",
  "App Dev": "Intermediate",
};

export const bookEnrichments: Record<string, BookEnrichment> = {
  python: {
    difficulty: "Gentle Start",
    funFact:
      "Guido van Rossum named Python after Monty Python's Flying Circus during a winter holiday in 1989.",
    whyExplore:
      "Its standard library and clear syntax let you prototype scripts, APIs, and ML notebooks effortlessly.",
    relatedIds: ["django", "fastapi", "pytorch"],
    edition: {
      version: "v3.13",
      lastChecked: "Nov 2026",
      releaseNote: "Free-threaded experimental build & JIT improvements",
      hasRecentUpdate: true,
    },
  },
  java: {
    difficulty: "Intermediate",
    funFact:
      "Java was originally named 'Oak' after a tree outside James Gosling's office before becoming Java.",
    whyExplore:
      "Virtual threads in modern Java make high-throughput concurrency remarkably readable.",
    relatedIds: ["spring", "kotlin", "postgresql"],
    edition: {
      version: "JDK 23",
      lastChecked: "Nov 2026",
      releaseNote: "Stream gatherers & scoped values preview",
    },
  },
  javascript: {
    difficulty: "Gentle Start",
    funFact: "Brendan Eich wrote the first prototype of JavaScript in just ten days in May 1995.",
    whyExplore:
      "Understanding closures, promises, and the event loop unlocks every browser and Node tool.",
    relatedIds: ["typescript", "react", "nodejs"],
    edition: {
      version: "ES2025",
      lastChecked: "Nov 2026",
      releaseNote: "Iterator helpers & Set composition methods",
    },
  },
  typescript: {
    difficulty: "Intermediate",
    funFact:
      "TypeScript was developed inside Microsoft in 2012 by Anders Hejlsberg, creator of C# and Turbo Pascal.",
    whyExplore:
      "Structural types catch subtle bugs before runtime and turn your editor into a trusty co-pilot.",
    relatedIds: ["javascript", "react", "nextjs"],
    edition: {
      version: "v5.8",
      lastChecked: "Nov 2026",
      releaseNote: "Faster type checking & erasable syntax checks",
      hasRecentUpdate: true,
    },
  },
  cpp: {
    difficulty: "Deep Craft",
    funFact:
      "Bjarne Stroustrup initially called it 'C with Classes' in 1979 while working at Bell Labs.",
    whyExplore:
      "Nothing teaches memory ownership, cache locality, and zero-cost abstractions quite like modern C++.",
    relatedIds: ["rust", "unreal", "git"],
    edition: {
      version: "C++23",
      lastChecked: "Nov 2026",
      releaseNote: "std::expected, mdspan, and print formatting",
    },
  },
  go: {
    difficulty: "Gentle Start",
    funFact:
      "Go's mascot, the cheerful Go Gopher, was illustrated by Renee French using clean geometric curves.",
    whyExplore:
      "You can read the entire Go specification in an afternoon and compile static binaries in seconds.",
    relatedIds: ["docker", "kubernetes", "postgresql"],
    edition: {
      version: "Go 1.24",
      lastChecked: "Nov 2026",
      releaseNote: "Generic type aliases & Swiss Tables maps",
    },
  },
  rust: {
    difficulty: "Deep Craft",
    funFact:
      "Rust began in 2006 as a personal side project by Graydon Hoare, named after a hardy group of fungi.",
    whyExplore:
      "The borrow checker feels strict at first, then rewards you with fearless concurrency and speed.",
    relatedIds: ["cpp", "go", "webxr"],
    edition: {
      version: "Edition 2024",
      lastChecked: "Nov 2026",
      releaseNote: "Async closures & ergonomics updates",
      hasRecentUpdate: true,
    },
  },
  react: {
    difficulty: "Gentle Start",
    funFact:
      "React was first deployed on Facebook's News Feed in 2011 and open-sourced at JSConf US in 2013.",
    whyExplore:
      "Thinking in declarative UI components reshapes how you break down complex interfaces.",
    relatedIds: ["nextjs", "typescript", "radix-ui"],
    edition: {
      version: "v19.2",
      lastChecked: "Nov 2026",
      releaseNote: "Actions, useOptimistic & Server Components",
      hasRecentUpdate: true,
    },
  },
  nextjs: {
    difficulty: "Intermediate",
    funFact:
      "Next.js shipped in 2016 with just six core principles focused on zero-config universal React rendering.",
    whyExplore:
      "Great for exploring how server rendering, streaming Suspense, and static generation fit together.",
    relatedIds: ["react", "tailwind", "typescript"],
    edition: {
      version: "v15.3",
      lastChecked: "Nov 2026",
      releaseNote: "Turbopack dev stability & React 19 support",
    },
  },
  vue: {
    difficulty: "Gentle Start",
    funFact:
      "Evan You created Vue in 2014 by extracting the parts of AngularJS he enjoyed most into a lighter tool.",
    whyExplore:
      "Single-file components keep template, reactive script, and scoped CSS harmoniously in one place.",
    relatedIds: ["html", "css", "tailwind"],
    edition: {
      version: "v3.5",
      lastChecked: "Nov 2026",
      releaseNote: "Reactive props destructure & memory tuning",
    },
  },
  angular: {
    difficulty: "Intermediate",
    funFact:
      "Angular's modern signal-based reactivity marks its biggest ergonomic shift since Angular 2.",
    whyExplore:
      "A cohesive all-in-one architecture with routing, forms, and dependency injection built right in.",
    relatedIds: ["typescript", "material-design", "express"],
    edition: {
      version: "v19",
      lastChecked: "Nov 2026",
      releaseNote: "Standalone defaults & linkedSignal API",
    },
  },
  html: {
    difficulty: "Gentle Start",
    funFact:
      "Tim Berners-Lee published the first description of HTML in 1991 with only 18 structural tags.",
    whyExplore:
      "Semantic landmarks and native form elements give accessibility and clarity for free.",
    relatedIds: ["css", "wai-aria", "aframe"],
    edition: {
      version: "HTML Living Standard",
      lastChecked: "Nov 2026",
      releaseNote: "Popover API & customizable <select>",
    },
  },
  css: {
    difficulty: "Gentle Start",
    funFact:
      "Hakon Wium Lie proposed Cascading Style Sheets in 1994 while working alongside Tim Berners-Lee at CERN.",
    whyExplore:
      "Modern CSS subgrid, container queries, and 3D transforms rival entire JavaScript layout engines.",
    relatedIds: ["html", "tailwind", "framer"],
    edition: {
      version: "CSS Baseline 2025",
      lastChecked: "Nov 2026",
      releaseNote: "Anchor positioning & @starting-style",
    },
  },
  tailwind: {
    difficulty: "Gentle Start",
    funFact:
      "Tailwind CSS started in 2017 as helper utility files extracted from Adam Wathan's side projects.",
    whyExplore: "v4 moves configuration straight into CSS with instant zero-config theme tokens.",
    relatedIds: ["css", "react", "radix-ui"],
    edition: {
      version: "v4.2",
      lastChecked: "Nov 2026",
      releaseNote: "Oxide CSS engine & @theme CSS variables",
      hasRecentUpdate: true,
    },
  },
  nodejs: {
    difficulty: "Intermediate",
    funFact:
      "Ryan Dahl demonstrated Node.js at JSConf EU in 2009 to show non-blocking file upload progress bars.",
    whyExplore:
      "Native TypeScript stripping and built-in test runner make modern Node remarkably batteries-included.",
    relatedIds: ["express", "typescript", "postgresql"],
    edition: {
      version: "v22 LTS",
      lastChecked: "Nov 2026",
      releaseNote: "Built-in WebSocket client & require(esm)",
    },
  },
  express: {
    difficulty: "Gentle Start",
    funFact:
      "Express was inspired by Ruby's Sinatra and became the backbone of early Node.js web apps.",
    whyExplore:
      "Its tiny middleware pipeline makes HTTP request lifecycles crystal clear in under 50 lines.",
    relatedIds: ["nodejs", "mongodb", "postman"],
    edition: {
      version: "v5.1",
      lastChecked: "Nov 2026",
      releaseNote: "Native async error forwarding in routes",
    },
  },
  django: {
    difficulty: "Intermediate",
    funFact:
      "Named after jazz guitarist Django Reinhardt, it was forged inside a Kansas newsroom in 2003.",
    whyExplore:
      "Its built-in admin panel, migrations, and security defaults help solo makers ship fast.",
    relatedIds: ["python", "postgresql", "fastapi"],
    edition: {
      version: "v5.2",
      lastChecked: "Nov 2026",
      releaseNote: "Composite primary keys & async ORM gains",
    },
  },
  fastapi: {
    difficulty: "Gentle Start",
    funFact:
      "FastAPI uses standard Python type annotations to generate OpenAPI documentation automatically.",
    whyExplore:
      "One of the fastest ways to turn Python functions into documented, validated JSON APIs.",
    relatedIds: ["python", "postgresql", "docker"],
    edition: {
      version: "v0.115",
      lastChecked: "Nov 2026",
      releaseNote: "FastAPI CLI & Pydantic v2 ergonomics",
    },
  },
  spring: {
    difficulty: "Intermediate",
    funFact:
      "Spring grew out of Rod Johnson's 2002 book challenging heavy J2EE enterprise boilerplate.",
    whyExplore:
      "Spring Boot auto-configuration and actuator metrics show how production JVM services scale.",
    relatedIds: ["java", "kotlin", "postgresql"],
    edition: {
      version: "v3.4",
      lastChecked: "Nov 2026",
      releaseNote: "Virtual thread tuning & structured logging",
    },
  },
  postgresql: {
    difficulty: "Intermediate",
    funFact:
      "PostgreSQL evolved from UC Berkeley's 1986 POSTGRES research project led by Michael Stonebraker.",
    whyExplore:
      "From strict relational joins to JSONB and vector extensions, Postgres quietly does it all.",
    relatedIds: ["mysql", "redis", "django"],
    edition: {
      version: "v17",
      lastChecked: "Nov 2026",
      releaseNote: "JSON_TABLE, faster vacuum & I/O streaming",
    },
  },
  mongodb: {
    difficulty: "Gentle Start",
    funFact:
      "The name MongoDB comes from the word 'humongous', reflecting its focus on large-scale document stores.",
    whyExplore:
      "Storing nested JSON-shaped objects feels intuitive when your domain schema is still evolving.",
    relatedIds: ["nodejs", "express", "redis"],
    edition: {
      version: "v8.0",
      lastChecked: "Nov 2026",
      releaseNote: "Queryable encryption & aggregation speedups",
    },
  },
  redis: {
    difficulty: "Gentle Start",
    funFact:
      "Salvatore Sanfilippo wrote the first version of Redis in 2009 to scale a real-time web log analyzer.",
    whyExplore:
      "Sorted sets, streams, and atomic counters solve caching and rate-limiting in milliseconds.",
    relatedIds: ["postgresql", "nodejs", "docker"],
    edition: {
      version: "v7.4",
      lastChecked: "Nov 2026",
      releaseNote: "Hash field expiration & vector search",
    },
  },
  mysql: {
    difficulty: "Gentle Start",
    funFact: "MySQL was named after co-founder Michael Widenius's daughter, My.",
    whyExplore:
      "Powering classic LAMP stacks and high-volume read replicas with clear, dependable SQL.",
    relatedIds: ["postgresql", "redis", "nodejs"],
    edition: {
      version: "v8.4 LTS",
      lastChecked: "Nov 2026",
      releaseNote: "Long-term stability & InnoDB tuning",
    },
  },
  firebase: {
    difficulty: "Gentle Start",
    funFact:
      "Firebase began in 2011 as Envolve, a startup providing real-time chat widgets before spinning out sync.",
    whyExplore:
      "Real-time listeners and drop-in authentication let small teams ship live apps in a weekend.",
    relatedIds: ["react", "flutter", "react-native"],
    edition: {
      version: "SDK v11",
      lastChecked: "Nov 2026",
      releaseNote: "Data Connect & App Hosting integration",
    },
  },
  pytorch: {
    difficulty: "Deep Craft",
    funFact:
      "PyTorch's eager execution graph made debugging neural networks feel like writing plain Python.",
    whyExplore:
      "The clearest bridge between reading a machine learning paper and running tensors on a GPU.",
    relatedIds: ["python", "huggingface", "tensorflow"],
    edition: {
      version: "v2.6",
      lastChecked: "Nov 2026",
      releaseNote: "torch.compile speedups & Python 3.13",
      hasRecentUpdate: true,
    },
  },
  tensorflow: {
    difficulty: "Intermediate",
    funFact:
      "Google Brain released TensorFlow in 2015 after building its earlier internal DistBelief system.",
    whyExplore:
      "Keras 3 lets you build models cleanly and deploy across browsers, servers, and mobile edge.",
    relatedIds: ["python", "pytorch", "scikit-learn"],
    edition: {
      version: "v2.18",
      lastChecked: "Nov 2026",
      releaseNote: "LiteRT edge runtime & Keras 3 support",
    },
  },
  "scikit-learn": {
    difficulty: "Gentle Start",
    funFact:
      "Created during a 2007 Google Summer of Code project, its API inspired nearly every Python ML library.",
    whyExplore:
      "Its consistent fit/predict workflow and visual user guide make classical ML wonderfully approachable.",
    relatedIds: ["python", "pytorch", "tensorflow"],
    edition: {
      version: "v1.6",
      lastChecked: "Nov 2026",
      releaseNote: "Array API support & calibration curves",
    },
  },
  huggingface: {
    difficulty: "Gentle Start",
    funFact:
      "Hugging Face began in 2016 as a playful chatbot app before pivoting to open-source AI tooling.",
    whyExplore:
      "Thousands of open models, datasets, and spaces ready to inspect and fine-tune locally.",
    relatedIds: ["pytorch", "python", "openai"],
    edition: {
      version: "Transformers v4.49",
      lastChecked: "Nov 2026",
      releaseNote: "Multimodal pipelines & quantized weights",
    },
  },
  openai: {
    difficulty: "Gentle Start",
    funFact:
      "Structured JSON outputs and tool-calling turned text completion endpoints into composable building blocks.",
    whyExplore:
      "Clean reference guides for embeddings, streaming responses, and evaluation workflows.",
    relatedIds: ["huggingface", "python", "typescript"],
    edition: {
      version: "Responses API",
      lastChecked: "Nov 2026",
      releaseNote: "Unified tool calling & structured outputs",
    },
  },
  git: {
    difficulty: "Gentle Start",
    funFact:
      "Linus Torvalds wrote the initial Git core in April 2005 in under two weeks to manage the Linux kernel.",
    whyExplore:
      "Mastering rebase, bisect, and reflog turns version control from anxiety into a superpower.",
    relatedIds: ["github", "vscode", "docker"],
    edition: {
      version: "v2.48",
      lastChecked: "Nov 2026",
      releaseNote: "Reftable backend & performance fixes",
    },
  },
  github: {
    difficulty: "Gentle Start",
    funFact:
      "The Octocat mascot was originally purchased from iStock by co-founder Tom Preston-Werner as 'Octopuss'.",
    whyExplore:
      "Actions workflows, pull request reviews, and open-source repositories live at the center of teamwork.",
    relatedIds: ["git", "docker", "vscode"],
    edition: {
      version: "Actions & Copilot",
      lastChecked: "Nov 2026",
      releaseNote: "Immutable actions & security advisories",
    },
  },
  docker: {
    difficulty: "Intermediate",
    funFact:
      "Docker launched as an open-source project at PyCon in 2013 during a five-minute lightning talk.",
    whyExplore:
      "Multi-stage Dockerfiles and Compose let any stack boot identically on laptops and cloud servers.",
    relatedIds: ["kubernetes", "nodejs", "postgresql"],
    edition: {
      version: "Engine v28",
      lastChecked: "Nov 2026",
      releaseNote: "BuildKit improvements & Compose watch",
    },
  },
  kubernetes: {
    difficulty: "Deep Craft",
    funFact:
      "Kubernetes means 'helmsman' in Greek, which is why its logo features a seven-spoked ship wheel.",
    whyExplore:
      "Understanding pods, services, and reconciliation loops demystifies modern cloud infrastructure.",
    relatedIds: ["docker", "go", "github"],
    edition: {
      version: "v1.32",
      lastChecked: "Nov 2026",
      releaseNote: "Dynamic resource allocation & sidecar GA",
    },
  },
  postman: {
    difficulty: "Gentle Start",
    funFact:
      "Abhinav Asthana built the first version of Postman in 2012 as a Chrome extension to simplify API testing.",
    whyExplore:
      "Great for inspecting headers, OAuth tokens, and sharing reproducible API collections.",
    relatedIds: ["express", "fastapi", "git"],
    edition: {
      version: "v11",
      lastChecked: "Nov 2026",
      releaseNote: "API Flows & workspace collections",
    },
  },
  vscode: {
    difficulty: "Gentle Start",
    funFact:
      "VS Code builds on the Monaco editor and Language Server Protocol, which standardized IDE intelligence.",
    whyExplore:
      "Learning command palettes, multi-cursor edits, and debugger configs speeds up every language.",
    relatedIds: ["git", "typescript", "github"],
    edition: {
      version: "v1.98",
      lastChecked: "Nov 2026",
      releaseNote: "Improved terminal tabs & extension profiles",
    },
  },
  figma: {
    difficulty: "Gentle Start",
    funFact:
      "Figma pioneered browser-based multiplayer design using a custom WebGL renderer and CRDT state.",
    whyExplore:
      "Design tokens, Auto Layout, and Dev Mode bring designers and engineers onto one shared page.",
    relatedIds: ["framer", "storybook", "material-design"],
    edition: {
      version: "Variables & Dev Mode",
      lastChecked: "Nov 2026",
      releaseNote: "Code Connect & multi-mode variables",
    },
  },
  framer: {
    difficulty: "Intermediate",
    funFact:
      "Framer Motion began as Popmotion before becoming the go-to declarative spring physics engine for React.",
    whyExplore:
      "Spring physics and layout transitions turn abrupt UI state changes into tactile motion.",
    relatedIds: ["react", "figma", "tailwind"],
    edition: {
      version: "Motion v12",
      lastChecked: "Nov 2026",
      releaseNote: "Zero-config layout animations & scroll triggers",
    },
  },
  storybook: {
    difficulty: "Intermediate",
    funFact:
      "Storybook turns each UI component state into an isolated, inspectable museum specimen.",
    whyExplore:
      "Ideal for testing edge states, accessibility contrast, and living component documentation.",
    relatedIds: ["react", "radix-ui", "figma"],
    edition: {
      version: "v8.6",
      lastChecked: "Nov 2026",
      releaseNote: "Built-in Vitest & accessibility test addon",
    },
  },
  notion: {
    difficulty: "Gentle Start",
    funFact:
      "Notion's creators drew inspiration from Doug Engelbart and early personal-computing paper metaphors.",
    whyExplore:
      "Flexible blocks and databases help document architecture decisions and reading logs cleanly.",
    relatedIds: ["figma", "github", "storybook"],
    edition: {
      version: "API & Charts",
      lastChecked: "Nov 2026",
      releaseNote: "Formula 2.0 & workspace webhooks",
    },
  },
  threejs: {
    difficulty: "Intermediate",
    funFact:
      "Ricardo Cabello (mrdoob) created Three.js in 2010 in ActionScript before porting it to JavaScript.",
    whyExplore:
      "Turns WebGL matrices into intuitive scenes, cameras, materials, and interactive 3D worlds.",
    relatedIds: ["webxr", "babylonjs", "typescript"],
    edition: {
      version: "r173",
      lastChecked: "Nov 2026",
      releaseNote: "WebGPU renderer & TSL shading language",
      hasRecentUpdate: true,
    },
  },
  webxr: {
    difficulty: "Intermediate",
    funFact:
      "WebXR replaced the older WebVR draft to unify both augmented and virtual reality under one browser API.",
    whyExplore:
      "Step directly from a webpage into stereoscopic 3D with controllers and hand tracking.",
    relatedIds: ["threejs", "aframe", "babylonjs"],
    edition: {
      version: "W3C Candidate",
      lastChecked: "Nov 2026",
      releaseNote: "Hand input & hit-test modules",
    },
  },
  unity: {
    difficulty: "Intermediate",
    funFact:
      "Unity launched in 2005 exclusively for Mac OS X before growing into a universal 3D and XR engine.",
    whyExplore:
      "Its XR Interaction Toolkit provides grab physics, teleportation, and spatial UI out of the box.",
    relatedIds: ["unreal", "threejs", "webxr"],
    edition: {
      version: "Unity 6",
      lastChecked: "Nov 2026",
      releaseNote: "Multiplayer center & WebGPU preview",
    },
  },
  unreal: {
    difficulty: "Deep Craft",
    funFact:
      "Epic Games originally wrote Unreal Engine in 1998; today it drives architecture, film, and XR.",
    whyExplore:
      "Lumen global illumination and Blueprints visual scripting let you craft cinema-grade scenes.",
    relatedIds: ["unity", "cpp", "threejs"],
    edition: {
      version: "UE 5.5",
      lastChecked: "Nov 2026",
      releaseNote: "MegaLights & enhanced OpenXR pipeline",
    },
  },
  babylonjs: {
    difficulty: "Intermediate",
    funFact:
      "Babylon.js is written in TypeScript with first-party WebXR helpers and a live browser Playground.",
    whyExplore: "A welcoming TypeScript-native 3D engine with built-in physics and GUI layers.",
    relatedIds: ["threejs", "typescript", "webxr"],
    edition: {
      version: "v7.40",
      lastChecked: "Nov 2026",
      releaseNote: "Gaussian splatting & WebGPU shader graph",
    },
  },
  aframe: {
    difficulty: "Gentle Start",
    funFact:
      "Mozilla's VR team built A-Frame in 2015 so web developers could author 3D scenes with HTML tags.",
    whyExplore:
      "An entity-component system tucked behind friendly markup — great for quick WebXR prototypes.",
    relatedIds: ["webxr", "threejs", "html"],
    edition: {
      version: "v1.6",
      lastChecked: "Nov 2026",
      releaseNote: "Hand-tracking controls & Three.js r164+",
    },
  },
  "material-design": {
    difficulty: "Gentle Start",
    funFact:
      "Material Design began with physical paper-and-ink studies using real cardstock under studio lighting.",
    whyExplore:
      "Dynamic tonal palettes and clear accessibility contrast specs make Material 3 great study material.",
    relatedIds: ["jetpack-compose", "flutter", "apple-hig"],
    edition: {
      version: "Material 3",
      lastChecked: "Nov 2026",
      releaseNote: "Expressive motion & adaptive panes",
    },
  },
  "apple-hig": {
    difficulty: "Gentle Start",
    funFact:
      "Apple published its first Human Interface Guidelines in 1987 for the Macintosh desktop.",
    whyExplore:
      "Masterclasses on visual hierarchy, touch targets, spatial windows, and respectful UX.",
    relatedIds: ["swiftui", "material-design", "laws-of-ux"],
    edition: {
      version: "visionOS & iOS 18",
      lastChecked: "Nov 2026",
      releaseNote: "Spatial depth & dark/tinted icon specs",
    },
  },
  "radix-ui": {
    difficulty: "Intermediate",
    funFact:
      "Radix Primitives separate behavior and keyboard accessibility completely from visual styling.",
    whyExplore:
      "Reading its focus-management and ARIA docs teaches how resilient dialogs and menus really work.",
    relatedIds: ["react", "wai-aria", "tailwind"],
    edition: {
      version: "Themes v3 / Primitives",
      lastChecked: "Nov 2026",
      releaseNote: "Improved roving focus & React 19 support",
    },
  },
  "wai-aria": {
    difficulty: "Intermediate",
    funFact:
      "The WAI-ARIA Authoring Practices Guide offers tested keyboard interaction recipes for 30+ widgets.",
    whyExplore:
      "Every tabs, combobox, and dialog pattern becomes measurably better when you check APG first.",
    relatedIds: ["html", "radix-ui", "laws-of-ux"],
    edition: {
      version: "APG 1.2",
      lastChecked: "Nov 2026",
      releaseNote: "Updated combobox & grid navigation patterns",
    },
  },
  "laws-of-ux": {
    difficulty: "Gentle Start",
    funFact:
      "Jon Yablonski paired classic human-factors psychology with minimalist geometric posters.",
    whyExplore:
      "Quickly anchors interface decisions in Fitts's Law, Miller's Law, and cognitive load.",
    relatedIds: ["apple-hig", "material-design", "wai-aria"],
    edition: {
      version: "2nd Edition",
      lastChecked: "Nov 2026",
      releaseNote: "Expanded heuristics & ethics principles",
    },
  },
  lucide: {
    difficulty: "Gentle Start",
    funFact:
      "Lucide forked from Feather Icons as a community-maintained library with 1,500+ crisp 24px icons.",
    whyExplore:
      "Clean stroke geometry and tree-shakable React components keep UI affordances sharp.",
    relatedIds: ["react", "tailwind", "figma"],
    edition: {
      version: "v0.575",
      lastChecked: "Nov 2026",
      releaseNote: "Expanded UI & spatial icon glyphs",
    },
  },
  "react-native": {
    difficulty: "Intermediate",
    funFact:
      "React Native's New Architecture replaces the async bridge with synchronous JSI native bindings.",
    whyExplore:
      "Share React mental models across iOS and Android while rendering genuine native platform views.",
    relatedIds: ["expo", "react", "typescript"],
    edition: {
      version: "v0.77",
      lastChecked: "Nov 2026",
      releaseNote: "New Architecture default & CSS display:contents",
    },
  },
  flutter: {
    difficulty: "Gentle Start",
    funFact:
      "Flutter renders every pixel itself using its Impeller graphics engine for consistent 120fps motion.",
    whyExplore:
      "Stateful hot reload and expressive widgets make cross-platform mobile design wonderfully fluid.",
    relatedIds: ["dart", "material-design", "firebase"],
    edition: {
      version: "v3.29",
      lastChecked: "Nov 2026",
      releaseNote: "Impeller upgrades & Cupertino fidelity",
      hasRecentUpdate: true,
    },
  },
  swiftui: {
    difficulty: "Gentle Start",
    funFact:
      "SwiftUI powers apps across iPhone, Mac, Watch, and Apple Vision Pro from one declarative syntax.",
    whyExplore:
      "Clean state wrappers and spring modifiers let native Apple apps come together in surprisingly few lines.",
    relatedIds: ["apple-hig", "react-native", "kotlin"],
    edition: {
      version: "iOS 18 / Xcode 16",
      lastChecked: "Nov 2026",
      releaseNote: "Mesh gradients & zoom transitions",
    },
  },
  "jetpack-compose": {
    difficulty: "Intermediate",
    funFact:
      "Jetpack Compose turns Kotlin functions annotated with @Composable into reactive Android UI trees.",
    whyExplore:
      "Pairs naturally with Material 3 tokens and adaptive foldables/tablet layouts on Android.",
    relatedIds: ["kotlin", "material-design", "flutter"],
    edition: {
      version: "BOM 2025.02",
      lastChecked: "Nov 2026",
      releaseNote: "Shared element transitions & adaptive suites",
    },
  },
  expo: {
    difficulty: "Gentle Start",
    funFact:
      "Expo Router brings file-based navigation and universal web/mobile links to React Native.",
    whyExplore:
      "Go from `npx create-expo-app` to testing on a physical phone in under two minutes.",
    relatedIds: ["react-native", "react", "typescript"],
    edition: {
      version: "SDK 52",
      lastChecked: "Nov 2026",
      releaseNote: "Expo Router v4 & DOM components",
    },
  },
  kotlin: {
    difficulty: "Gentle Start",
    funFact:
      "JetBrains named Kotlin after Kotlin Island near St. Petersburg, inspired by Java's island naming.",
    whyExplore:
      "Null safety, coroutines, and Kotlin Multiplatform make mobile business logic crisp and portable.",
    relatedIds: ["jetpack-compose", "java", "spring"],
    edition: {
      version: "v2.1",
      lastChecked: "Nov 2026",
      releaseNote: "K2 compiler stable & guard conditions",
    },
  },
  dart: {
    difficulty: "Gentle Start",
    funFact:
      "Dart compiles both just-in-time for sub-second hot reload and ahead-of-time to ARM64 machine code.",
    whyExplore:
      "Sound null safety, pattern matching, and isolates make client app architecture remarkably clean.",
    relatedIds: ["flutter", "kotlin", "typescript"],
    edition: {
      version: "v3.7",
      lastChecked: "Nov 2026",
      releaseNote: "Null-aware elements & wildcard variables",
    },
  },
  "book-of-shaders": {
    difficulty: "Deep Craft",
    funFact:
      "Hidden in the candlelit stacks — Patricio Gonzalez Vivo's interactive treatise on fragment shaders.",
    whyExplore:
      "A secret gem for turning pure math (`sin`, `smoothstep`, noise) into living light and texture.",
    relatedIds: ["threejs", "webxr", "css"],
    edition: {
      version: "Secret Edition",
      lastChecked: "Nov 2026",
      releaseNote: "Discovered by toggling the library reading lamp",
      hasRecentUpdate: true,
    },
  },
};

export const secretBook: Technology = {
  id: "book-of-shaders",
  catalogNo: "SEC-01",
  name: "The Book of Shaders",
  spineLabel: "SHADERS",
  category: "AR/VR",
  description:
    "A gentle, interactive step-by-step guide through the abstract and complex universe of Fragment Shaders.",
  curatorNote:
    "Kept behind the brass reading lamp — open it when you want to paint with GLSL mathematics.",
  docs: "https://thebookofshaders.com/",
  docsLabel: "thebookofshaders.com",
  cover: "lavender",
  template: "corner-ornament",
  height: 224,
  width: 116,
  thickness: 17,
  tags: ["shaders", "glsl", "webgl", "secret"],
  yearReleased: 2015,
};

export function getBookEnrichment(book: Technology): BookEnrichment {
  const found = bookEnrichments[book.id];
  if (found) return found;
  return {
    difficulty: defaultDifficultyByCategory[book.category] ?? "Intermediate",
    funFact: `${book.name} has been a trusted reference on developer shelves since ${book.yearReleased}.`,
    whyExplore: book.curatorNote,
    relatedIds: [],
    edition: {
      version: "Current Docs",
      lastChecked: "Nov 2026",
      releaseNote: "Verified official documentation link",
    },
  };
}

export function getRelatedBooks(book: Technology, pool: Technology[] = technologies): Technology[] {
  const enrichment = getBookEnrichment(book);
  const byId = new Map(pool.map((t) => [t.id, t]));
  const explicit = enrichment.relatedIds
    .map((id) => byId.get(id))
    .filter((t): t is Technology => Boolean(t && t.id !== book.id));
  if (explicit.length >= 3) return explicit.slice(0, 3);
  const sameCategory = pool.filter(
    (t) => t.category === book.category && t.id !== book.id && !explicit.some((e) => e.id === t.id),
  );
  return [...explicit, ...sameCategory].slice(0, 3);
}

function getDaySeed(date: Date = new Date()): number {
  const yyyy = date.getFullYear();
  const mm = date.getMonth() + 1;
  const dd = date.getDate();
  return yyyy * 10000 + mm * 100 + dd;
}

export function getBookOfTheDay(date: Date = new Date()): Technology {
  const seed = getDaySeed(date);
  return technologies[seed % technologies.length] ?? technologies[0]!;
}

export function getDailyMysteryBook(date: Date = new Date()): Technology {
  const seed = getDaySeed(date) * 7 + 13;
  return technologies[seed % technologies.length] ?? technologies[1]!;
}

export function getUpdatedVolumes(
  pool: Technology[] = technologies,
): Array<{ book: Technology; edition: EditionUpdate }> {
  return pool
    .map((book) => ({ book, edition: getBookEnrichment(book).edition }))
    .filter((entry) => entry.edition.hasRecentUpdate);
}

<div align="center">

# DevShelf

### _Somewhere between curiosity and code: the internet's little library for developers._

Browse **57+ programming languages, frameworks, design systems, and spatial tools** bound as physical 3D volumes on warm wooden shelves.

![DevShelf Hero Illustration](./src/assets/images/hero_library_scene_1794753858832.jpg)

`TanStack Start` · `React 19` · `TypeScript` · `Tailwind CSS v4` · `Framer Motion` · `Zero Backend Required`

</div>

---

## Why DevShelf Exists

Most developer directories read like spreadsheets: sterile grids of logos, tags, and external links.

**DevShelf** reimagines technical discovery as stepping into a sunlit, independent bookstore. Every technology sits spine-out or cover-forward on a warm walnut shelf with its own clothbound palette, catalog number, curator's note, and marginalia, inviting you to linger, pull a random volume off the ledge, and rediscover the joy of learning something unfamiliar.

> _"A good developer library is never finished; it grows with every curiosity."_

---

## Inside the Library

### Tactile Discovery & Play

| Experience                     | What It Does                                                                                                                                                                                          |
| :----------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **The Signature 3D Bookshelf** | 6 bespoke cover templates (`linen-framed`, `botanical-arch`, `gilded-stripe`, `monogram-seal`, `corner-ornament`, `halftone-band`), custom spine typography, wooden shelf planks, and tabletop props. |
| **The Mystery Book**           | Hit **"Pick a book for me!"** to slide a wrapped volume off the stacks and flip it open, or inspect today's deterministic **Daily Mystery** edition.                                                  |
| **Book of the Day**            | A daily featured technology propped on a wooden reading stand with curated difficulty (`Gentle Start`, `Intermediate`, `Deep Craft`), verified edition info, and a librarian's fun fact.              |
| **Secret Library Rooms**       | Six arched oak doorways: _The AI Observatory_, _The Frontend Atelier_, _The Database Basement_, _The Cloud Tower_, _The Wizard's Workshop_, and _The Design Corner_.                                  |
| **The Old Library Catalogue**  | Toggle between visual shelf thumbnails and perforated vintage index cards with **A to Z drawer tabs** and **Learning Adventures** reading trails.                                                     |

### Personal Shelves, Stacks & Stamps

| Feature                               | How It Works                                                                                                                                                                                                     |
| :------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Build Your Own Tech Stack**         | Create custom named stacks (_My MERN Stack_, _My AI/ML Toolkit_, _My Hackathon Toolkit_), drag & reorder books, and generate a **shareable `?stack=` link** with zero backend.                                   |
| **The Reading Passport**              | Collect **12 inked passport stamps** (_Python Explorer_, _Frontend Wanderer_, _Database Detective_, _Spatial Pioneer_, _Marginalia Scribe_, etc.) purely for personal delight, with no competitive leaderboards. |
| **Inside-Cover Preview & Marginalia** | Open any book to read its inside flap, jump to related volumes, inspect verified version updates, and save personal **Bookmarks & Marginalia** notes.                                                            |
| **The Librarian Mascot**              | Choose _Barnaby the Owl_, _Mochi the Library Cat_, or _Pip the Book Ghost_ for contextual, rule-based nudges (_"Psst... you've explored React. Have you met Next.js yet?"_) and daily quests.                    |
| **Personalize & Quiet Mode**          | Swap shelf wood finishes (_Warm Walnut_, _Honey Oak_, _Dark Ebony_), ink accents, paper grain, shelf order, or enter distraction-free **Quiet Reading Mode**.                                                    |

> **Library Whisper:** _Try clicking the brass reading lamp in the hero illustration three times, or spot the sleepy cat tucked between the shelves._

---

## The Ten Curated Shelves

| Shelf | Collection                      | Focus                                                              |
| :---: | :------------------------------ | :----------------------------------------------------------------- |
| `01`  | **The Language Lounge**         | Python, Java, JavaScript, TypeScript, C++, Go, Rust                |
| `02`  | **The Frontend Atelier**        | React, Next.js, Vue, Angular, HTML5, CSS3, Tailwind CSS            |
| `03`  | **The Backend Archive**         | Node.js, Express, Django, FastAPI, Spring Boot                     |
| `04`  | **The Data Room**               | PostgreSQL, MongoDB, Redis, MySQL, Firebase                        |
| `05`  | **The Machine Learning Corner** | PyTorch, TensorFlow, scikit-learn, Hugging Face, OpenAI            |
| `06`  | **The Workshop**                | Git, GitHub, Docker, Kubernetes, Postman, VS Code                  |
| `07`  | **The Design Studio**           | Figma, Framer, Storybook, Notion                                   |
| `08`  | **The Spatial Pavilion**        | Three.js, WebXR, Unity, Unreal Engine, Babylon.js, A-Frame         |
| `09`  | **The UI/UX Reading Room**      | Material Design, Apple HIG, Radix UI, WAI-ARIA, Laws of UX, Lucide |
| `10`  | **The Mobile & App Studio**     | React Native, Flutter, SwiftUI, Jetpack Compose, Expo, Kotlin      |

---

## Aesthetic & Typography

DevShelf follows a stationery-inspired editorial palette in both sunlit **Day** and candlelit **Night** themes:

- **Surfaces & Ink**: Antique Ivory (`#F8F3E9`), Cocoa Brown (`#51443C`), Warm Walnut (`#80634E`)
- **Cloth Bindings**: Dusty Lavender (`#B7A3D0`), Butter Yellow (`#EBD99C`), Muted Sage (`#A9BBA2`), Dusty Rose (`#D9AEB9`), Powder Blue (`#AFC5D7`), Warm Peach (`#E5BFA6`)
- **Typefaces**: `DM Serif Display` for literary titles, `DM Sans` for comfortable reading, `Space Mono` for catalog numbers and stamp metadata

---

## Project Architecture

```text
src/
├── routes/
│   ├── __root.tsx             # App shell, fonts, LibraryProvider, global modals & librarian
│   ├── index.tsx              # Homepage (Hero, Book of the Day, 3D Bookshelf, Secret Rooms)
│   ├── explore.tsx            # Card Catalogue, A to Z drawer filter, Index Cards & Adventures
│   └── my-shelf.tsx           # Saved Shelf, Tech Stack Builder, Reading Passport & Marginalia
├── components/
│   ├── Book.tsx               # 3D-perspective clothbound volume with 6 cover templates
│   ├── Bookshelf.tsx          # Reorderable wooden shelves with density & cat Easter egg
│   ├── BookPreviewModal.tsx   # Inside-cover reader with difficulty, edition ledger & notes
│   ├── MysteryBookModal.tsx   # 2-stage slide-out & 3D flip reveal (Random + Daily)
│   ├── TechStacksSection.tsx  # Drag-and-drop stack builder & ?stack= link encoder
│   ├── ReadingPassport.tsx    # Personal exploration stats & 12 collectable ink stamps
│   ├── LibrarianAssistant.tsx # Rule-based Owl / Cat / Ghost guide
│   └── PersonalizeDrawer.tsx  # Wood theme, accent, mascot, texture & shelf order controls
└── lib/
    ├── devshelf-catalog.ts    # 10 shelves & 57 curated volumes
    ├── devshelf-enrichments.ts# Difficulty, fun facts, related books, edition ledger
    ├── devshelf-adventures.ts # Guided trails, secret rooms & passport stamp rules
    └── library-storage.tsx    # LocalStorage persistence + URL stack sharing
```

---

## Getting Started

Run DevShelf locally with **Node.js (v20+)** and **npm**:

```sh
git clone https://github.com/Vinni5566/devshelf.git
cd devshelf
npm install
npm run dev
```

Visit `http://localhost:3000` to step inside the reading room.

### Scripts

| Command          | Description                                                 |
| :--------------- | :---------------------------------------------------------- |
| `npm run dev`    | Start Vite + TanStack Start on `0.0.0.0:3000`               |
| `npm run build`  | Compile client assets and Nitro Node server into `.output/` |
| `npm run start`  | Run the production server (`PORT=3000`)                     |
| `npm test`       | Run the Vitest catalog, enrichment, and routing test suite  |
| `npm run lint`   | Validate code quality with ESLint                           |
| `npm run format` | Format all source files with Prettier                       |

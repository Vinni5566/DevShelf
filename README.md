# DevShelf

> _Somewhere between curiosity and code — the internet's little library for developers._

**DevShelf** is an immersive, whimsical digital library where programming languages, frameworks, libraries, design systems, and developer tools live as illustrated 3D books arranged across curated wooden shelves. Built to feel like stepping into an independent bookstore rather than browsing a typical directory, DevShelf turns documentation discovery into a tactile, playful reading experience.

## Features

- **The Signature 3D Bookshelf** — 57 curated volumes organized across 10 shelves (`Languages`, `Frontend`, `Backend`, `Databases`, `AI/ML`, `DevOps`, `Design`, `AR/VR`, `UI/UX`, and `App Dev`), each rendered with custom cover art, spine labels, and tactile hover states.
- **The Mystery Book & Daily Mystery** — Click _"Pick a book for me!"_ to slide a wrapped volume off the shelf and flip it open, or check the deterministic daily mystery pick.
- **Book of the Day** — A daily featured technology propped on a wooden reading stand with its curated difficulty, verified edition, fun fact, and related volumes.
- **Interactive Inside-Cover Preview & Marginalia** — Inspect any volume's inside cover for curated difficulty labels, edition notes, related books, and persistent **Bookmarks & Marginalia** personal notes.
- **Build Your Own Tech Stack** — Assemble custom named stacks (such as _My MERN Stack_, _My AI/ML Toolkit_, or _My Hackathon Toolkit_), drag and reorder volumes, and copy shareable `?stack=` links.
- **The Reading Passport** — Collect 12 quiet ink stamps as you explore shelves, unlock milestones, and annotate books (no competitive leaderboards).
- **Secret Library Rooms** — Step behind six themed oak doors (_The AI Observatory_, _The Frontend Atelier_, _The Database Basement_, _The Cloud Tower_, _The Wizard's Workshop_, and _The Design Corner_).
- **The Librarian Mascot** — Choose between _Barnaby the Owl_, _Mochi the Library Cat_, or _Pip the Book Ghost_ for rule-based recommendations, interest matching, and daily exploration challenges.
- **The Old Library Catalogue & Learning Adventures** — Switch between visual shelf thumbnails and vintage perforated index cards with A–Z drawer tabs, or follow guided multi-book reading trails.
- **Personalize Your Library & Easter Eggs** — Customize bookshelf wood finishes (_Warm Walnut_, _Honey Oak_, _Dark Ebony_), accent ink colors, paper textures, shelf order, Quiet Reading Mode, the Documentation Update Bell, and a hidden volume unlocked via the brass reading lamp.

## Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/start) & [TanStack Router](https://tanstack.com/router) + React 19 + TypeScript
- **Styling & Motion**: Tailwind CSS v4, Framer Motion
- **Icons**: Lucide React & Simple Icons
- **Testing & Quality**: Vitest, Testing Library, ESLint, Prettier

## Getting Started

You need Node.js (v20+) and npm (or Bun) installed locally.

```sh
git clone https://github.com/Vinni5566/devshelf.git
cd devshelf
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## Available Scripts

- `npm run dev` — Start the Vite + TanStack Start development server on port `3000`
- `npm run build` — Build the production client and Nitro Node server bundle
- `npm run start` — Serve the built application from `.output/server/index.mjs`
- `npm test` — Run the Vitest test suite
- `npm run lint` — Check code quality with ESLint
- `npm run format` — Format files with Prettier

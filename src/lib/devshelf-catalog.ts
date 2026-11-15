export type ShelfCategory =
  | "Languages"
  | "Frontend"
  | "Backend"
  | "Databases"
  | "AI/ML"
  | "DevOps"
  | "Design";

export type Technology = {
  id: string;
  name: string;
  category: ShelfCategory;
  description: string;
  docs: string;
  mark: string;
  cover: string;
  tags: string[];
};

export const categories: ShelfCategory[] = [
  "Languages",
  "Frontend",
  "Backend",
  "Databases",
  "AI/ML",
  "DevOps",
  "Design",
];

export const technologies: Technology[] = [
  { id: "python", name: "Python", category: "Languages", description: "A friendly language with a world of possibilities.", docs: "https://docs.python.org/3/", mark: "Py", cover: "peach", tags: ["programming", "language"] },
  { id: "javascript", name: "JavaScript", category: "Languages", description: "The language that brings the web to life.", docs: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", mark: "JS", cover: "butter", tags: ["programming", "web"] },
  { id: "typescript", name: "TypeScript", category: "Languages", description: "JavaScript, with a little more confidence.", docs: "https://www.typescriptlang.org/docs/", mark: "TS", cover: "sky", tags: ["programming", "web"] },
  { id: "java", name: "Java", category: "Languages", description: "A dependable classic, still going strong.", docs: "https://docs.oracle.com/en/java/", mark: "☕", cover: "rose", tags: ["programming", "language"] },
  { id: "cpp", name: "C++", category: "Languages", description: "Get close to the metal and make it count.", docs: "https://en.cppreference.com/w/", mark: "C++", cover: "sky", tags: ["programming", "language"] },
  { id: "go", name: "Go", category: "Languages", description: "Small, speedy tools for a big world.", docs: "https://go.dev/doc/", mark: "Go", cover: "mint", tags: ["programming", "language"] },
  { id: "rust", name: "Rust", category: "Languages", description: "Performance and peace of mind, together.", docs: "https://doc.rust-lang.org/", mark: "Rs", cover: "rose", tags: ["programming", "language"] },
  { id: "react", name: "React", category: "Frontend", description: "Build user interfaces one thoughtful piece at a time.", docs: "https://react.dev/", mark: "⚛", cover: "sky", tags: ["framework", "javascript"] },
  { id: "nextjs", name: "Next.js", category: "Frontend", description: "A complete toolkit for the web.", docs: "https://nextjs.org/docs", mark: "N", cover: "lilac", tags: ["framework", "react"] },
  { id: "vue", name: "Vue", category: "Frontend", description: "An approachable way to make interfaces.", docs: "https://vuejs.org/guide/", mark: "V", cover: "mint", tags: ["framework", "javascript"] },
  { id: "angular", name: "Angular", category: "Frontend", description: "A full-featured framework for ambitious apps.", docs: "https://angular.dev/overview", mark: "A", cover: "rose", tags: ["framework", "javascript"] },
  { id: "html", name: "HTML", category: "Frontend", description: "The building blocks behind every page.", docs: "https://developer.mozilla.org/en-US/docs/Web/HTML", mark: "5", cover: "peach", tags: ["web", "markup"] },
  { id: "css", name: "CSS", category: "Frontend", description: "Give the web its shape, color, and character.", docs: "https://developer.mozilla.org/en-US/docs/Web/CSS", mark: "3", cover: "lilac", tags: ["web", "styles"] },
  { id: "tailwind", name: "Tailwind CSS", category: "Frontend", description: "Style right where your ideas take shape.", docs: "https://tailwindcss.com/docs", mark: "≋", cover: "mint", tags: ["styles", "css"] },
  { id: "nodejs", name: "Node.js", category: "Backend", description: "JavaScript beyond the browser.", docs: "https://nodejs.org/docs/latest/api/", mark: "⬡", cover: "mint", tags: ["runtime", "javascript"] },
  { id: "express", name: "Express", category: "Backend", description: "A minimal, flexible web framework for Node.", docs: "https://expressjs.com/", mark: "Ex", cover: "butter", tags: ["framework", "node"] },
  { id: "django", name: "Django", category: "Backend", description: "A high-level Python framework for quick starts.", docs: "https://docs.djangoproject.com/", mark: "Dj", cover: "mint", tags: ["framework", "python"] },
  { id: "fastapi", name: "FastAPI", category: "Backend", description: "Modern, quick APIs built with Python.", docs: "https://fastapi.tiangolo.com/", mark: "Fa", cover: "sky", tags: ["framework", "python", "api"] },
  { id: "spring", name: "Spring Boot", category: "Backend", description: "A head start on production-ready Java apps.", docs: "https://docs.spring.io/spring-boot/index.html", mark: "Sp", cover: "sage", tags: ["framework", "java"] },
  { id: "postgresql", name: "PostgreSQL", category: "Databases", description: "A powerful open-source relational database.", docs: "https://www.postgresql.org/docs/", mark: "❋", cover: "sky", tags: ["database", "sql"] },
  { id: "mongodb", name: "MongoDB", category: "Databases", description: "A flexible home for document-shaped data.", docs: "https://www.mongodb.com/docs/", mark: "M", cover: "mint", tags: ["database", "nosql"] },
  { id: "redis", name: "Redis", category: "Databases", description: "Keep data close and lightning fast.", docs: "https://redis.io/docs/latest/", mark: "R", cover: "rose", tags: ["database", "cache"] },
  { id: "mysql", name: "MySQL", category: "Databases", description: "A familiar, reliable relational database.", docs: "https://dev.mysql.com/doc/", mark: "My", cover: "sky", tags: ["database", "sql"] },
  { id: "firebase", name: "Firebase", category: "Databases", description: "A suite of tools for building full-stack apps.", docs: "https://firebase.google.com/docs", mark: "✦", cover: "butter", tags: ["database", "google"] },
  { id: "pytorch", name: "PyTorch", category: "AI/ML", description: "A flexible foundation for machine learning.", docs: "https://pytorch.org/docs/stable/index.html", mark: "◉", cover: "peach", tags: ["machine learning", "python"] },
  { id: "tensorflow", name: "TensorFlow", category: "AI/ML", description: "Tools and guides for building machine learning.", docs: "https://www.tensorflow.org/learn", mark: "Tf", cover: "peach", tags: ["machine learning", "python"] },
  { id: "scikit-learn", name: "Scikit-learn", category: "AI/ML", description: "Simple, practical tools for predictive data.", docs: "https://scikit-learn.org/stable/user_guide.html", mark: "sk", cover: "butter", tags: ["machine learning", "python"] },
  { id: "huggingface", name: "Hugging Face", category: "AI/ML", description: "A welcoming home for open AI models.", docs: "https://huggingface.co/docs", mark: "🤗", cover: "butter", tags: ["machine learning", "models"] },
  { id: "openai", name: "OpenAI API", category: "AI/ML", description: "Build with models and helpful developer tools.", docs: "https://platform.openai.com/docs/overview", mark: "✳", cover: "sage", tags: ["ai", "api"] },
  { id: "git", name: "Git", category: "DevOps", description: "A little time machine for your code.", docs: "https://git-scm.com/doc", mark: "⑂", cover: "peach", tags: ["version control", "tools"] },
  { id: "github", name: "GitHub", category: "DevOps", description: "Build, share, and grow things together.", docs: "https://docs.github.com/", mark: "◉", cover: "lilac", tags: ["version control", "tools"] },
  { id: "docker", name: "Docker", category: "DevOps", description: "A neat little box for your application.", docs: "https://docs.docker.com/", mark: "▱", cover: "sky", tags: ["containers", "tools"] },
  { id: "kubernetes", name: "Kubernetes", category: "DevOps", description: "Keep containerized applications in harmony.", docs: "https://kubernetes.io/docs/home/", mark: "☸", cover: "sky", tags: ["containers", "tools"] },
  { id: "postman", name: "Postman", category: "DevOps", description: "Explore and test the APIs you are building.", docs: "https://learning.postman.com/docs/", mark: "↗", cover: "peach", tags: ["api", "tools"] },
  { id: "vscode", name: "VS Code", category: "DevOps", description: "A wonderfully extensible editor for your work.", docs: "https://code.visualstudio.com/docs", mark: "⟐", cover: "sky", tags: ["editor", "tools"] },
  { id: "figma", name: "Figma", category: "Design", description: "A shared canvas for ideas and interfaces.", docs: "https://help.figma.com/hc/en-us", mark: "◈", cover: "lilac", tags: ["design", "collaboration"] },
  { id: "framer", name: "Framer", category: "Design", description: "Design and publish beautiful websites.", docs: "https://www.framer.com/learn/", mark: "F", cover: "rose", tags: ["design", "web"] },
  { id: "notion", name: "Notion", category: "Design", description: "Gather your notes and plans in one place.", docs: "https://www.notion.com/help", mark: "N", cover: "butter", tags: ["productivity", "notes"] },
  { id: "storybook", name: "Storybook", category: "Design", description: "Build and document UI components in isolation.", docs: "https://storybook.js.org/docs", mark: "Sb", cover: "rose", tags: ["design", "components"] },
];

export function filterCatalog(
  items: Technology[],
  query: string,
  category: ShelfCategory | "All",
) {
  const needle = query.trim().toLocaleLowerCase();
  return items.filter((item) => {
    const matchesCategory = category === "All" || item.category === category;
    const searchable = [item.name, item.category, item.description, ...item.tags]
      .join(" ")
      .toLocaleLowerCase();
    return matchesCategory && (!needle || searchable.includes(needle));
  });
}
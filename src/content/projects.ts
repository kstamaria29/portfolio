export type ProjectImage = {
  src: string;
  alt: string;
};

export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectCategory = "production" | "side" | "academic";

export type Project = {
  id: string;
  title: string;
  category: ProjectCategory;
  shortDescription: string;
  fullDescription: string;
  tags: string[];
  techStack: string[];
  images: ProjectImage[];
  links: ProjectLink[];
  highlights?: string[];
  role?: string;
  challenges?: string[];
  outcomes?: string[];
  date?: string;
};

export const projectsSection = {
  heading: "Projects",
  description: "Click a project to view details, links, and a small image gallery.",
  categories: [
    { id: "production", label: "Production Projects" },
    { id: "side", label: "Side Projects" },
    { id: "academic", label: "Academic Projects" },
  ] as const,
} as const;

export const projects: Project[] = [
  {
    id: "project-1",
    title: "Seen People Landing Page",
    category: "production",
    shortDescription:
      "A sleek Next.js landing experience for an AI‑powered, human‑curated gallery of creative and developer experiments, featuring weekly spotlights and discovery‑focused browsing.",
    fullDescription:
      "Seen People is a community‑driven showcase that blends AI assistance with human curation to spotlight the most compelling creative and developer experiments. The experience highlights weekly “Experiment Spotlight” features and “Creator Spotlight” profiles, giving visitors quick ways to discover standout projects and contributors. It also frames the broader ecosystem with discovery prompts, curated experiment collections, and social/community touchpoints like events, challenges, and blog posts—positioning the project as a hub for inspiration, learning, and community engagement. The result is a polished, content‑rich interface that emphasizes discovery, storytelling, and curated quality across a wide range of AI‑assisted work.",
    tags: ["UI", "Accessibility", "Performance"],
    techStack: ["Next.js", "Tailwind", "Motion"],
    images: [
      { src: "/projects/seen-landing1.jpg", alt: "Project placeholder image 1" },
      { src: "/placeholders/project-2.svg", alt: "Project placeholder image 2" },
    ],
    links: [
      { label: "Live Demo", href: "https://seen-people.vercel.app/" },
      { label: "GitHub", href: "https://github.com/" },
    ],
    highlights: ["Reduced-motion aware animations", "Accessible modal dialog"],
    role: "Design + Development",
    challenges: ["Balancing motion with readability", "Accessible focus management"],
    outcomes: ["Clean component structure", "Content-driven sections"],
    date: "2026",
  },
  {
    id: "project-2",
    title: "Product Landing",
    category: "side",
    shortDescription: "A crisp landing page with strong typography and conversion CTA.",
    fullDescription:
      "A landing page template focused on a consistent spacing/typography system, responsive layout, and subtle hover/tap interactions that don’t distract from content.",
    tags: ["Landing", "Design System"],
    techStack: ["React", "Tailwind", "Motion"],
    images: [{ src: "/placeholders/project-3.svg", alt: "Project placeholder image 3" }],
    links: [{ label: "Case Study", href: "https://example.com" }],
    date: "2026",
  },
  {
    id: "project-3",
    title: "Dashboard UI Kit",
    category: "academic",
    shortDescription: "Reusable cards, badges, and buttons with consistent styling.",
    fullDescription:
      "A small UI kit scaffold demonstrating reusable patterns: cards, badges, buttons, and section layout. Designed for quick iteration and easy content updates.",
    tags: ["Components", "UI Kit"],
    techStack: ["React", "Tailwind"],
    images: [{ src: "/placeholders/project-2.svg", alt: "Project placeholder image 2" }],
    links: [{ label: "GitHub", href: "https://github.com/" }],
    date: "2025",
  },
];

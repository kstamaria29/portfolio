export type ProjectImage = {
  src: string;
  alt: string;
};

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  id: string;
  title: string;
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
} as const;

export const projects: Project[] = [
  {
    id: "project-1",
    title: "Playful Portfolio",
    shortDescription: "A responsive single-page portfolio with theme + motion foundations.",
    fullDescription:
      "An intentionally small, maintainable portfolio scaffold with a clear content model and accessible components. Includes a projects modal, reduced-motion support, and a light/dark theme toggle that persists.",
    tags: ["UI", "Accessibility", "Performance"],
    techStack: ["React", "Vite", "Tailwind", "Motion"],
    images: [
      { src: "/placeholders/project-1.svg", alt: "Project placeholder image 1" },
      { src: "/placeholders/project-2.svg", alt: "Project placeholder image 2" },
    ],
    links: [
      { label: "Live Demo", href: "https://example.com" },
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

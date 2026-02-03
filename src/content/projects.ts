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
  techStack: string[];
  images: ProjectImage[];
  links: ProjectLink[];
  highlights?: string[];
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
    techStack: ["Next.js", "Typescript", "Tailwind", "Motion"],
    images: [
      { src: "/projects/seen-landing1.jpg", alt: "Seen Landing Page 1" },
      { src: "/projects/seen-landing2.jpg", alt: "Seen Landing Page 2" },
      { src: "/projects/seen-landing3.jpg", alt: "Seen Landing Page 3" },
      { src: "/projects/seen-landing4.jpg", alt: "Seen Landing Page 4" },
      { src: "/projects/seen-landing5.jpg", alt: "Seen Landing Page 5" },
    ],
    links: [
      { label: "Live Demo", href: "https://seen-people.vercel.app/" },
      { label: "GitHub", href: "https://github.com/" },
    ],
    highlights: [
      "Translated Figma specs into pixel‑matched layout.",
      "Built reusable UI components for consistency.",
      "Implemented responsive design across breakpoints.",
      "Added motion‑driven hero animations for polish.",
      "Structured sections to mirror UX flow.",
      "Crafted themed gradients and layered visuals.",
    ],
    date: "2026",
  },
  {
    id: "project-2",
    title: "Seen People Submission Page",
    category: "production",
    shortDescription:
      "A guided, multi‑step submission flow that lets creators upload assets, define roles/categories/tech, craft AI‑assisted copy, and customize a showcase layout before publishing.",
    fullDescription:
      "The submission experience is a polished, step‑by‑step studio for building a full experiment showcase. It begins with asset uploads plus creator identity, categories, and technologies, paired with an AI Assistant that can shape tone, structure, and custom instructions for generated text. Next, creators write a title and description, add structured narrative sections, and can generate AI suggestions with revision tools like regenerate/undo/redo before applying content. The third step focuses on presentation: a hero image uploader and a drag‑and‑drop “showcase” organizer let creators order sections and image galleries to tell their story clearly. The flow culminates in a preview‑and‑publish screen that mirrors the final showcase layout. The result is a cohesive submission pipeline that blends guided inputs, AI‑assisted writing, and layout control into a creator‑friendly publishing workflow.",
    techStack: ["Next.js", "Typescript", "Tailwind", "Jotai", "OpenAi"],
    images: [
      { src: "/projects/seen-submit1.jpg", alt: "Project placeholder image 1" },
      { src: "/placeholders/project-2.svg", alt: "Project placeholder image 2" },
    ],
    links: [
      { label: "Live Demo", href: "https://seen-people.vercel.app/submit" },
      { label: "GitHub", href: "https://github.com/" },
    ],
    highlights: [
      "Multi‑step submission flow guides creators seamlessly.",
      "Asset uploads capture hero and gallery media.",
      "Structured metadata: role, categories, technologies.",
      "AI assistant accelerates writing and tone control.",
      "Drag‑and‑drop showcase ordering improves presentation.",
      "Preview‑and‑publish step mirrors final output.",
    ],
    date: "2026",
  },
  {
    id: "project-3",
    title: "SM Driving Marketing Site",
    category: "production",
    shortDescription:
      "A CMS-driven marketing site for SM Driving School with hero, services, pricing, reviews, FAQs, and contact sections built for fast updates and conversions.",
    fullDescription:
      "A modern React/Vite marketing experience for SM Driving School that pulls live content from a Supabase-backed CMS. The homepage assembles hero messaging, services, pricing, reviews, about, FAQs, and contact into a cohesive conversion funnel, while also featuring video content to build trust and credibility. Content is retrieved via dedicated CMS queries (hero, services, pricing, FAQs, reviews, and more), enabling non-developers to update the site without code changes and ensuring the marketing copy stays current and consistent across sections.",
    techStack: ["Next.js", "Typescript", "Tailwind", "Jotai", "OpenAi"],
    images: [
      { src: "/projects/smdriving-marketing1.jpg", alt: "SM Driving Marketing 1" },
      { src: "/projects/smdriving-marketing2.jpg", alt: "SM Driving Marketing 2" },
      { src: "/projects/smdriving-marketing3.jpg", alt: "SM Driving Marketing 3" },
      { src: "/projects/smdriving-marketing4.jpg", alt: "SM Driving Marketing 4" },
      { src: "/projects/smdriving-marketing5.jpg", alt: "SM Driving Marketing 5" },
      { src: "/projects/smdriving-marketing6.jpg", alt: "SM Driving Marketing 6" },
      { src: "/projects/smdriving-marketing7.jpg", alt: "SM Driving Marketing 7" },
    ],
    links: [
      { label: "Live Demo", href: "https://smdriving.co.nz/" },
      { label: "GitHub", href: "https://github.com/" },
    ],
    highlights: [
      "CMS-driven landing page for rapid content updates.",
      "Fast Vite build with React + TypeScript.",
      "Supabase-backed content powering dynamic site sections.",
      "Clear calls-to-action driving lesson inquiries.",
      "Mobile responsive.",
    ],
    date: "2026",
  },
  {
    id: "project-4",
    title: "SM Driving School Operations Dashboard",
    category: "production",
    shortDescription:
      "An admin dashboard for managing lessons, students, assessments, blog content, and CMS updates, with a central home view for day-to-day operations.",
    fullDescription:
      "A full operations hub tailored for driving school workflows. The dashboard’s home view surfaces real-time teaching context such as local weather conditions and upcoming lessons to help instructors plan effectively. It includes dedicated areas for calendar scheduling, student management, assessments, mock tests, and blog publishing, all accessible from a unified sidebar. The platform also provides a built-in content management section that mirrors the marketing site’s CMS structure, allowing staff to edit hero, services, reviews, pricing, and FAQs directly from the admin interface.",
    techStack: ["Next.js", "Typescript", "Tailwind", "Jotai", "OpenAi"],
    images: [
      { src: "/projects/smdriving-dashboard1.jpg", alt: "Project placeholder image 1" },
      { src: "/placeholders/project-2.svg", alt: "Project placeholder image 2" },
    ],
    links: [{ label: "GitHub", href: "https://github.com/" }],
    highlights: [
      "Operational hub for lessons, students, assessments.",
      "Weather and schedule insights for instructors.",
      "Built-in CMS to update marketing content.",
      "Blog management tools for content publishing.",
      "Scalable Next.js dashboard with modular pages.",
    ],
    date: "2026",
  },
  {
    id: "project-5",
    title: "Dashboard UI Kit",
    category: "academic",
    shortDescription: "Reusable cards, badges, and buttons with consistent styling.",
    fullDescription:
      "A small UI kit scaffold demonstrating reusable patterns: cards, badges, buttons, and section layout. Designed for quick iteration and easy content updates.",
    techStack: ["React", "Tailwind"],
    images: [{ src: "/placeholders/project-2.svg", alt: "Project placeholder image 2" }],
    links: [{ label: "GitHub", href: "https://github.com/" }],
    date: "2025",
  },
  {
    id: "project-6",
    title: "Product Landing",
    category: "side",
    shortDescription: "A crisp landing page with strong typography and conversion CTA.",
    fullDescription:
      "A landing page template focused on a consistent spacing/typography system, responsive layout, and subtle hover/tap interactions that don’t distract from content.",
    techStack: ["React", "Tailwind", "Motion"],
    images: [{ src: "/placeholders/project-3.svg", alt: "Project placeholder image 3" }],
    links: [{ label: "Case Study", href: "https://example.com" }],
    date: "2026",
  },
];

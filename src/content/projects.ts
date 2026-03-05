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
  fullDescription: string | string[];
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
    id: "project-prod-1",
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
      { label: "GitHub", href: "https://github.com/kstamaria29/seen-people" },
    ],
    highlights: [
      "Translated Figma specs into pixel‑matched layout.",
      "Built reusable UI components for consistency.",
      "Implemented responsive design across breakpoints.",
      "Added motion‑driven hero animations for polish.",
      "Structured sections to mirror UX flow.",
      "Crafted themed gradients and layered visuals.",
    ],
    date: "2025",
  },
  {
    id: "project-prod-2",
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
      { label: "GitHub", href: "https://github.com/kstamaria29/seen-people" },
    ],
    highlights: [
      "Multi‑step submission flow guides creators seamlessly.",
      "Asset uploads capture hero and gallery media.",
      "Structured metadata: role, categories, technologies.",
      "AI assistant accelerates writing and tone control.",
      "Drag‑and‑drop showcase ordering improves presentation.",
      "Preview‑and‑publish step mirrors final output.",
    ],
    date: "2025",
  },
  {
    id: "project-prod-3",
    title: "Driving School Management App",
    category: "production",
    shortDescription:
      "Built a production-ready Expo React Native app for driving schools, combining student/lesson operations, three assessment workflows, and role-based multi-tenant security with Supabase RLS.",
    fullDescription:
      "Driving School Management App is a full-featured mobile platform for modern driving schools, designed to help instructors and admins run day-to-day operations from one secure app. It includes end-to-end student and lesson workflows, configurable assessments (Driving Assessment, Restricted Mock Test, and Full License Mock Test), and PDF export capabilities to support structured evaluation and reporting. The app uses an auth-gated navigation architecture with onboarding and resilient session handling, then transitions into a drawer-based main experience optimized for real operational use. Under the hood, it is built with Expo + React Native + TypeScript, powered by Supabase, React Query, and a role-aware data model that enforces organization boundaries and permissions for owner/admin/instructor roles through RLS policies. This project demonstrates strong product thinking, secure multi-tenant backend design, and scalable mobile architecture suitable for real clients—not just demos.",
    techStack: [
      "React Native Expo",
      "Typescript",
      "Codex",
      "Zustand",
      "Supabase",
      "OpenAi",
    ],
    images: [
      {
        src: "/projects/drivingschool-management1.jpg",
        alt: "Driving School Management image 1",
      },
      {
        src: "/projects/drivingschool-management2.jpg",
        alt: "Driving School Management image 2",
      },
      {
        src: "/projects/drivingschool-management3.jpg",
        alt: "Driving School Management image 3",
      },
      {
        src: "/projects/drivingschool-management4.jpg",
        alt: "Driving School Management image 4",
      },
      {
        src: "/projects/drivingschool-management5.jpg",
        alt: "Driving School Management image 5",
      },
      {
        src: "/projects/drivingschool-management6.jpg",
        alt: "Driving School Management image 6",
      },
      {
        src: "/projects/drivingschool-management7.jpg",
        alt: "Driving School Management image 7",
      },
      {
        src: "/projects/drivingschool-management8.jpg",
        alt: "Driving School Management image 8",
      },
      {
        src: "/projects/drivingschool-management9.jpg",
        alt: "Driving School Management image 9",
      },
      {
        src: "/projects/drivingschool-management10.jpg",
        alt: "Driving School Management image 10",
      },
      {
        src: "/projects/drivingschool-management11.jpg",
        alt: "Driving School Management image 11",
      },
      {
        src: "/projects/drivingschool-management12.jpg",
        alt: "Driving School Management image 12",
      },
      {
        src: "/projects/drivingschool-management13.jpg",
        alt: "Driving School Management image 13",
      },
      {
        src: "/projects/drivingschool-management14.jpg",
        alt: "Driving School Management image 14",
      },
      {
        src: "/projects/drivingschool-management15.jpg",
        alt: "Driving School Management image 15",
      },
      {
        src: "/projects/drivingschool-management16.jpg",
        alt: "Driving School Management image 16",
      },
    ],
    links: [
      { label: "GitHub", href: "https://github.com/kstamaria29/drivingschool-app" },
    ],
    highlights: [
      "Multi-tenant architecture with strict Supabase RLS controls.",
      "Role-based workflows for owners, admins, and instructors.",
      "End-to-end student lifecycle: onboarding, archive, and histories.",
      "Lesson scheduling with Today/Week and calendar workflows.",
      "Three assessment engines, including PDF result exports.",
      "Auth-gated navigation with robust session recovery handling.",
      "Responsive drawer UX with theme-aware mobile interfaces.",
    ],
    date: "2026",
  },

  {
    id: "project-prod-4",
    title: "SM Driving Marketing Site",
    category: "production",
    shortDescription:
      "A CMS-driven marketing site for SM Driving School with hero, services, pricing, testimonials, FAQs, and contact sections built for fast updates and conversions.",
    fullDescription:
      "A modern React/Vite marketing experience for SM Driving School that pulls live content from a Supabase-backed CMS. The homepage assembles hero messaging, services, pricing, testimonials, about, FAQs, and contact into a cohesive conversion funnel, while also featuring video content to build trust and credibility. Content is retrieved via dedicated CMS queries (hero, services, pricing, FAQs, testimonials, and more), enabling non-developers to update the site without code changes and ensuring the marketing copy stays current and consistent across sections.",
    techStack: ["React.js", "Typescript", "Tailwind", "Supabase"],
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
      { label: "GitHub", href: "https://github.com/kstamaria29/smdriving" },
    ],
    highlights: [
      "CMS-driven landing page for rapid content updates.",
      "Fast Vite build with React + TypeScript.",
      "Supabase-backed content powering dynamic site sections.",
      "Clear calls-to-action driving lesson inquiries.",
      "Mobile responsive.",
    ],
    date: "2025",
  },
  {
    id: "project-prod-5",
    title: "SM Driving School Operations Dashboard",
    category: "production",
    shortDescription:
      "An admin dashboard for managing lessons, students, assessments, blog content, and CMS updates, with a central home view for day-to-day operations.",
    fullDescription:
      "A full operations hub tailored for driving school workflows. The dashboard’s home view surfaces real-time teaching context such as local weather conditions and upcoming lessons to help instructors plan effectively. It includes dedicated areas for calendar scheduling, student management, assessments, mock tests, and blog publishing, all accessible from a unified sidebar. The platform also provides a built-in content management section that mirrors the marketing site’s CMS structure, allowing staff to edit hero, services, testimonials, pricing, and FAQs directly from the admin interface.",
    techStack: ["Next.js", "Typescript", "Tailwind", "Jotai", "Supabase", "OpenAi"],
    images: [
      { src: "/projects/smdriving-dashboard1.jpg", alt: "SM Driving Dashboard image 1" },
      { src: "/projects/smdriving-dashboard2.jpg", alt: "SM Driving Dashboard image 2" },
      { src: "/projects/smdriving-dashboard3.jpg", alt: "SM Driving Dashboard image 3" },
    ],
    links: [{ label: "GitHub", href: "https://github.com/kstamaria29/smdriving" }],
    highlights: [
      "Operational hub for lessons, students, assessments.",
      "Weather and schedule insights for instructors.",
      "Built-in CMS to update marketing content.",
      "Blog management tools for content publishing.",
      "Scalable Next.js dashboard with modular pages.",
    ],
    date: "2025",
  },

  {
    id: "project-side-1",
    title: "Ai Portfolio Generator",
    category: "side",
    shortDescription:
      "Build and refine a polished professional profile in minutes. Generates and improves sections with AI-assisted rewriting so your bio reads clear, confident, and recruiter-friendly.",
    fullDescription:
      "Profile Generator is a web app I built to help candidates quickly draft and iteratively improve the core written pieces recruiters actually read: a strong headline, a clear summary, and tight, impact-focused sections. Instead of producing a single “one-shot” output, the app supports a section-by-section workflow so you can refine content with intent: tighten wording, reduce fluff, improve structure, and keep your tone consistent. This makes it easier to converge on a final profile that sounds like you—not a template.",
    techStack: ["Next.js", "Tailwind", "Typescript", "OpenAi", "Ai Vision"],
    images: [
      { src: "/projects/ai-portfolio1.jpg", alt: "Ai Portfolio Builder image 1" },
      { src: "/projects/ai-portfolio2.jpg", alt: "Ai Portfolio Builder image 2" },
    ],
    links: [{ label: "GitHub", href: "https://github.com/" }],
    highlights: [
      "AI-assisted section-by-section profile improvements.",
      "Structured outputs for consistent recruiter scanning.",
      "Modern Next.js App Router architecture.",
      "Reduces time to draft professional bios.",
    ],

    date: "2025",
  },
  {
    id: "project-side-2",
    title: "Nano Banana Library",
    category: "side",
    shortDescription:
      "A polished, CMS-driven library catalog built with Strapi, featuring curated content, fast discovery, and a clean UI designed for scalability.",
    fullDescription: [
      "Nano Banana Library is a content-driven catalog application built to showcase how I design modern web experiences around a structured CMS. The app focuses on browsing and discovering a curated “library” of items with clear information architecture, consistent content modeling, and a UI that feels fast and intentional.",
      "I used Strapi as the headless CMS to centralize content management and enforce reliable structure across the app. Content types are modeled to reflect real product needs, making it easy to expand the catalog without code changes. This separation allows non-technical editing while keeping the frontend clean and predictable.",
      "From an engineering perspective, the project demonstrates practical full-stack thinking: designing content schemas, consuming a CMS API cleanly, and building a maintainable interface that supports future enhancements (search, filtering, pagination, SEO-friendly routing, and richer editorial workflows). The result is a production-style app that highlights CMS integration, scalable data modeling, and front-end craftsmanship.",
    ],
    techStack: [
      "Next.js",
      "Tailwind",
      "Typescript",
      "Strapi",
      "Google Gemini",
      "Nano Banana",
    ],
    images: [
      { src: "/projects/nanobanana-library1.jpg", alt: "Nano Banana Library image 1" },
      { src: "/projects/nanobanana-library2.jpg", alt: "Nano Banana Library image 2" },
      { src: "/projects/nanobanana-library3.jpg", alt: "Nano Banana Library image 3" },
      { src: "/projects/nanobanana-library4.jpg", alt: "Nano Banana Library image 4" },
      { src: "/projects/nanobanana-library5.jpg", alt: "Nano Banana Library image 5" },
      { src: "/projects/nanobanana-library6.jpg", alt: "Nano Banana Library image 6" },
    ],
    links: [{ label: "GitHub", href: "https://github.com/" }],
    highlights: [
      "Strapi CMS content modeling and relations.",
      "API-driven, scalable catalog architecture.",
      "Maintainable frontend component structure.",
      "Built for easy content expansion.",
    ],

    date: "2025",
  },
  {
    id: "project-side-3",
    title: "Kenneth's Recipe Generator",
    category: "side",
    shortDescription:
      "Generate complete recipes from ingredients using Google Gemini, with an image preview and a clean, fast Next.js UI.",
    fullDescription: [
      "Kenneth’s AI Recipe Generator is a modern web app that turns a simple ingredient list into a complete, structured recipe experience. Users enter what they have on hand, and the app generates a full recipe output designed for real usability—clear title and description, cooking time, difficulty, measured ingredients, step-by-step instructions, timeline guidance, and practical tips.",
      "Beyond text generation, the app also demonstrates multimodal capability by generating a matching recipe image after the recipe is produced. This shows how to orchestrate sequential AI calls, manage asynchronous state cleanly, and present results in a polished interface.",
    ],
    techStack: ["Next.js", "Tailwind", "Typescript", "Google Gemini", "Nano Banana"],
    images: [
      { src: "/projects/recipe-generator1.jpg", alt: "Recipe Generator image 1" },
      { src: "/projects/recipe-generator2.jpg", alt: "Recipe Generator image 2" },
      { src: "/projects/recipe-generator3.jpg", alt: "Recipe Generator image 3" },
      { src: "/projects/recipe-generator4.jpg", alt: "Recipe Generator image 4" },
    ],
    links: [{ label: "GitHub", href: "https://github.com/" }],
    highlights: [
      "Gemini-powered recipe generation from ingredients.",
      "Structured prompts for consistent output.",
      "Image generation with loading states.",
      "Responsive UI with progressive layout.",
      "Extensible architecture for new features.",
    ],

    date: "2025",
  },
];

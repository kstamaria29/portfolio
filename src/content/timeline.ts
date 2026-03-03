export type TimelineItem = {
  id: string;
  title: string;
  caption: string;
  description: string;
};

export const timelineSection = {
  heading: "Timeline",
  description:
    "A quick look at the milestones, roles, and learning moments along my journey.",
} as const;

export const timeline: TimelineItem[] = [
  {
    id: "timeline-1",
    title: "SM Driving School",
    caption: "Jan 2026 - Present",
    description:
      "Working alongside SM Driving School Owner/Instructor to develop a tablet-first Expo React Native app for SM Driving School, architected as a multi-tenant SaaS from day one. Implemented organization-scoped data and role-based access (owner/admin/instructor) on Supabase with RLS, plus student management, lesson scheduling/today workflows, assessment tracking, and PDF exports. The platform is designed to onboard additional driving schools, with subscription/tiered access able to be added as a next step.",
  },
  {
    id: "timeline-2",
    title: "Seen Ventures (Mentored Industry Placement)",
    caption: "October 2025 - January 2026",
    description:
      "Completed a 12-week internship with Seen Ventures, where I helped start a product from scratch and take it from idea toward an MVP. The project focused on building a platform for creatives and developers to showcase and submit AI experiments, while enabling employers and recruiters to explore an applicant’s experiments and project work.",
  },
  {
    id: "timeline-3",
    title: "Mission Ready HQ",
    caption: "2025 - 2026",
    description:
      "Completed Mission Ready HQ’s AI-Powered Advanced Full Stack Developer Diploma (Level 5), progressing through full stack foundations, advanced AI/cloud/DevOps, and a mentored industry work placement. Built responsive, mobile-first web apps using professional tooling and version control, developing interactive front-ends, backend APIs, and databases while following software standards plus testing, CI, and cybersecurity best practices. Levelled up by delivering end-to-end apps with cloud deployment on Microsoft Azure, Docker containerisation, commercial API integrations, and generative AI features (OpenAI), applying Agile/Scrum, TDD, and design thinking—while strengthening communication, collaboration, and career readiness through real-world project work.",
  },
];

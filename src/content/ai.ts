import { contact } from "./contact";
import { profile } from "./profile";
import { projects } from "./projects";
import { reviews } from "./reviews";
import { skillsSection } from "./skills";

export const portfolioAssistant = {
  heading: "Ask Kenneth AI",
  description:
    "Ask anything about my background, projects, skills, or how to reach me. This bot only answers using my portfolio info.",
  greeting:
    "Hi! I’m Kenneth’s portfolio assistant. Ask me about Kenneth’s background, projects, skills, or contact info.",
  suggestedQuestions: [
    "Which projects best represent Kenneth's full-stack skills?",
    "What technologies does Kenneth use most often?",
    "What's Kenneth's background before tech?",
    "How can I contact Kenneth?",
  ],
  extraContext: {
    focus: [
      "Full-stack development (React, Next.js, Node.js)",
      "AI-assisted app experiences (Azure, Gemini, OpenAI)",
      "Clean UI, accessibility, and maintainable components",
    ],
    notes: [
      "If a question isn't answered by the portfolio context, reply that you don't know based on Kenneth's portfolio and suggest contacting him via email.",
      "Prefer linking to the live demo or GitHub when discussing projects if links are available in the context.",
    ],
  },
} as const;

export type PortfolioAssistantMessage = {
  role: "user" | "assistant";
  content: string;
};

export function getPortfolioAssistantContext() {
  return {
    profile: {
      name: profile.name,
      title: profile.title,
      tagline: profile.tagline,
      shortbio: profile.shortbio,
      bio: profile.bio,
      highlights: profile.highlights,
      socials: profile.socials,
    },
    skills: {
      heading: skillsSection.heading,
      description: skillsSection.description,
      categories: skillsSection.categories.map((category) => ({
        id: category.id,
        title: category.title,
        skills: category.skills.map((skill) => ({
          id: skill.id,
          label: skill.label,
          level: skill.level,
        })),
      })),
    },
    projects: projects.map((project) => ({
      id: project.id,
      title: project.title,
      category: project.category,
      date: project.date,
      shortDescription: project.shortDescription,
      techStack: project.techStack,
      highlights: project.highlights ?? [],
      links: project.links,
    })),
    reviews: reviews.map((review) => ({
      id: review.id,
      name: review.name,
      title: review.title,
      company: review.company,
      quote: review.quote,
    })),
    contact: {
      heading: contact.heading,
      description: contact.description,
      email: contact.email,
      infoItems: contact.infoCard.items.map((item) => ({
        id: item.id,
        label: item.label,
        value: item.value,
        href: item.href,
      })),
      status: contact.status,
    },
    extra: portfolioAssistant.extraContext,
  } as const;
}


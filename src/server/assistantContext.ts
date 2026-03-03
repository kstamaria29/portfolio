import { contact } from "../content/contact.js";
import { portfolioAssistant } from "../content/ai.js";
import { profile } from "../content/profile.js";
import { projects } from "../content/projects.js";
import { skillsSection } from "../content/skills.js";
import { testimonials } from "../content/testimonials.js";
import { timeline, timelineSection } from "../content/timeline.js";

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
    testimonials: testimonials.map((testimonial) => ({
      id: testimonial.id,
      name: testimonial.name,
      title: testimonial.title,
      company: testimonial.company,
      quote: testimonial.quote,
    })),
    timeline: {
      heading: timelineSection.heading,
      description: timelineSection.description,
      items: timeline.map((item) => ({
        id: item.id,
        title: item.title,
        caption: item.caption,
        description: item.description,
      })),
    },
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


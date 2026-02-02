export const sectionIds = {
  hero: "hero",
  about: "about",
  skills: "skills",
  projects: "projects",
  reviews: "reviews",
  contact: "contact",
} as const;

export const site = {
  nav: [
    { id: sectionIds.hero, label: "Home" },
    { id: sectionIds.about, label: "About" },
    { id: sectionIds.skills, label: "Skills" },
    { id: sectionIds.projects, label: "Projects" },
    { id: sectionIds.reviews, label: "Reviews" },
    { id: sectionIds.contact, label: "Contact" },
  ],
  footer: {
    tagline: "Built with React, Tailwind, and Motion.",
  },
} as const;

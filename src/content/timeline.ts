export type TimelineItem = {
  id: string;
  title: string;
  caption: string;
  description: string;
};

export const timelineSection = {
  heading: "Timeline",
  description: "A quick look at the milestones, roles, and learning moments along my journey.",
} as const;

export const timeline: TimelineItem[] = [
  {
    id: "timeline-1",
    title: "Timeline entry title",
    caption: "Jan 2026 - Present",
    description:
      "A short description of what you worked on, the impact you made, and the skills you strengthened. Replace this placeholder with your real story.",
  },
  {
    id: "timeline-2",
    title: "Another timeline entry",
    caption: "Sep 2024 - Dec 2025",
    description:
      "Use this space to highlight a role, course, or project phase. Keep it concise and focus on outcomes, collaboration, and what you shipped.",
  },
  {
    id: "timeline-3",
    title: "One more entry",
    caption: "2019 - 2023",
    description:
      "Add a few sentences about your responsibilities, achievements, or key learnings. You can update the content later in this file.",
  },
];

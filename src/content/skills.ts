export type Skill = {
  id: string;
  label: string;
  level: number; // 0-100
};

export type SkillCategory = {
  id: string;
  title: string;
  barColorClassName: string;
  skills: Skill[];
};

export const skillsSection = {
  heading: "My Skills",
  description: "A quick snapshot of the tools and technologies I use most often.",
  categories: [
    {
      id: "frontend",
      title: "Frontend",
      barColorClassName: "from-orange-500 to-amber-400",
      skills: [
        { id: "html-css", label: "HTML5 / CSS3", level: 90 },
        { id: "javascript", label: "JavaScript", level: 80 },
        { id: "typescript", label: "TypeScript", level: 80 },
        { id: "react", label: "React", level: 75 },
        { id: "nextjs", label: "Next.js", level: 75 },
        { id: "tailwind", label: "Tailwind CSS", level: 85 },
      ],
    },
    {
      id: "backend",
      title: "Backend",
      barColorClassName: "from-sky-500 to-indigo-400",
      skills: [
        { id: "node", label: "Node.js", level: 75 },
        { id: "supabase", label: "Supabase", level: 80 },
        { id: "mysql", label: "MySql", level: 70 },
        { id: "mongodb", label: "MongoDB", level: 70 },
      ],
    },
    {
      id: "tools-workflow",
      title: "Tools & Workflow",
      barColorClassName: "from-emerald-500 to-lime-400",
      skills: [
        { id: "figma", label: "Figma", level: 70 },
        { id: "gemini", label: "Google Gemini", level: 70 },
        { id: "openai", label: "OpenAi Codex Cli", level: 70 },
        { id: "agile", label: "Agile Methodologies", level: 70 },
        { id: "git", label: "Git", level: 70 },
      ],
    },
  ] satisfies SkillCategory[],
} as const;

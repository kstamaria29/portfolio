export type Skill = {
  id: string;
  label: string;
  level: number; // 0-100
};

export const skillsSection = {
  heading: "My Skills",
  description: "A quick snapshot of the tools and technologies I use most often.",
  columns: [
    [
      { id: "html-css", label: "HTML5 / CSS3", level: 90 },
      { id: "javascript", label: "JavaScript", level: 80 },
      { id: "typescript", label: "TypeScript", level: 80 },
      { id: "react", label: "React", level: 75 },
      { id: "nextjs", label: "Next.js", level: 75 },
      { id: "tailwind", label: "Tailwind CSS", level: 85 },
    ],
    [
      { id: "node", label: "Node.js", level: 75 },
      { id: "supabase", label: "Supabase", level: 80 },
      { id: "mysql", label: "MySql", level: 70 },
      { id: "mongodb", label: "MongoDB", level: 70 },
      { id: "gemini", label: "Google Gemini", level: 70 },
      { id: "openai", label: "OpenAi Codex Cli", level: 70 },
      { id: "mongodb", label: "MongoDB", level: 70 },
    ],
  ] satisfies Skill[][],
} as const;

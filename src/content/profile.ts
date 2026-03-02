export type SocialLink = {
  label: string;
  href: string;
};

export const profile = {
  name: "Kenneth Sta Maria",
  title: "Full Stack Developer",
  tagline: "Hi! I am",
  shortbio:
    "AI-powered full stack developer who loves turning ideas into user-focused products. Skilled in Next.js, React, MongoDB, MySQL, and Tailwind CSS, with experience building AI features using Azure and Gemini. Exploring Ai Tools such as OpenAI Codex to sharpen my workflow as AI evolves fast.",
  heroImage: {
    src: "/images/profile.png",
    alt: "Portrait photo",
  },
  aboutSection: {
    heading: "About",
  },
  bio: [
    "From the moment I printed “Hello World” in the console of my first application, I knew I was hooked. That single line of code sparked my passion for software development - a field where creativity meets logic and every problem is an opportunity to learn.",
    "I've recently acquired an AI-Powered Full Stack Developer Diploma from Mission Ready HQ, and as part of the 32-week program I finished a 12-week internship with Seen Ventures, where I helped start a product from scratch and take it from idea toward an MVP. The project focused on building a platform for creatives and developers to showcase and submit AI experiments, while enabling employers and recruiters to explore an applicant’s experiments and project work.",
    "I build full-stack applications with HTML, CSS, JavaScript, React, Next.js, Node.js, MongoDB, MySQL, Supabase and Tailwind CSS, and I’ve delivered AI-powered features using tools like Azure and Gemini. I’m also actively exploring modern AI developer tools, most recently OpenAI Codex, to improve my workflow and stay current with how development is evolving as AI accelerates.",
    "I’m passionate about continuous learning and using technology to build meaningful, user-focused solutions. My goal is to keep growing as a developer and contribute to innovative projects that make a real impact.",
  ],
  highlights: ["Accessibility-first UI", "Clean, maintainable components"],
  socials: [
    { label: "GitHub", href: "https://github.com/kstamaria29/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/kennethsm/" },
    { label: "Email", href: "mailto:kennethsm.dev@gmail.com" },
  ] satisfies SocialLink[],
  ctas: {
    primary: { label: "View projects", href: "#projects" },
    secondary: { label: "Get in touch", href: "#contact" },
  },
} as const;

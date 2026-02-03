export type SocialLink = {
  label: string;
  href: string;
};

export const profile = {
  name: "Kenneth Sta Maria",
  title: "Full Stack Developer",
  tagline: "Hi! I am",
  shortbio:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis dolore aspernatur architecto omnis animi cum dignissimos repellat. Pariatur, dolorem dolor. Quia pariatur consequuntur tempora repellendus voluptatem est nulla earum!",
  heroImage: {
    src: "/images/profile.png",
    alt: "Portrait photo",
  },
  aboutSection: {
    heading: "About",
    asideHeading: "What you can expect",
  },
  bio: [
    "From the moment I printed “Hello World” in the console of my first application, I knew I was hooked. That single line of code sparked my passion for software development - a field where creativity meets logic and every problem is an opportunity to learn.",
    "Before entering tech, I spent 15 years at New World Albany, working my way up from an assistant to a supervisor and eventually to a 2IC. Those years built a strong foundation in customer service, teamwork, and leadership, which continue to guide how I approach collaboration and communication in the tech world.",
    "I’m currently studying at Mission Ready HQ, where I’m close to completing my AI-Powered Full Stack Developer Diploma. Through my projects and assignments, I’ve gained hands-on experience creating AI-powered applications using Azure and Gemini, as well as building full-stack solutions with HTML, CSS, JavaScript, React, Node.js, MongoDB, MySQL, and Tailwind CSS.",
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

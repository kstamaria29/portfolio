export type ContactInfoIcon = "mail" | "linkedin" | "download";

export type ContactInfoItem = {
  id: string;
  label: string;
  value: string;
  href: string;
  icon: ContactInfoIcon;
};

export const contact = {
  heading: "Contact",
  description:
    "Have a role, project, or collaboration in mind? Send a message and I'll get back to you.",
  email: "kenneth@example.com",
  infoCard: {
    heading: "Contact Information",
    items: [
      {
        id: "email",
        label: "Email",
        value: "kenneth@example.com",
        href: "mailto:kenneth@example.com",
        icon: "mail",
      },
      {
        id: "linkedin",
        label: "LinkedIn",
        value: "linkedin.com/in/your-handle",
        href: "https://www.linkedin.com/",
        icon: "linkedin",
      },
      {
        id: "resume",
        label: "Resume",
        value: "Download Resume",
        href: "/resume.pdf",
        icon: "download",
      },
    ] satisfies ContactInfoItem[],
  },
  status: {
    heading: "Current Status",
    message: "Available for freelance work and full-time opportunities",
    available: true,
  },
  formCard: {
    heading: "Send Me a Message",
    buttonLabel: "Send Message",
  },
  formspree: {
    formId: "",
  },
} as const;


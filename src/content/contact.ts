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
  email: "kennethsm.dev@gmail.com",
  infoCard: {
    heading: "Contact Information",
    items: [
      {
        id: "email",
        label: "Email",
        value: "kennethsm.dev@gmail.com",
        href: "mailto:kennethsm.dev@gmail.com",
        icon: "mail",
      },
      {
        id: "linkedin",
        label: "LinkedIn",
        value: "linkedin.com/in/kennethsm",
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
    formId: "xaqbdope",
  },
} as const;

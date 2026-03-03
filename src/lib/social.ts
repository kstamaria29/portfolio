import { Github, Linkedin, Mail } from "lucide-react";

type SocialIcon = typeof Github;

export function getSocialIcon(label: string, href: string): SocialIcon | null {
  const normalized = label.toLowerCase();
  if (normalized.includes("github")) return Github;
  if (normalized.includes("linkedin")) return Linkedin;
  if (href.startsWith("mailto:") || normalized.includes("email")) return Mail;
  return null;
}


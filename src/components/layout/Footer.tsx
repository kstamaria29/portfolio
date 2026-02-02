import { profile } from "../../content/profile";
import { site } from "../../content/site";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200/60 py-10 dark:border-white/10">
      <Container className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          © {new Date().getFullYear()} {profile.name}. {site.footer.tagline}
        </p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {profile.socials.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-zinc-600 no-underline hover:text-zinc-900 hover:underline dark:text-zinc-400 dark:hover:text-zinc-50"
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
            >
              {link.label}
            </a>
          ))}
        </div>
      </Container>
    </footer>
  );
}


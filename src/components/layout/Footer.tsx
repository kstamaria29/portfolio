import { profile } from "../../content/profile";
import { site } from "../../content/site";
import { getSocialIcon } from "../../lib/social";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200/60 py-10 dark:border-white/10 3xl:py-14">
      <Container className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-zinc-600 dark:text-zinc-400 3xl:text-base">
          © {new Date().getFullYear()} {profile.name}. {site.footer.tagline}
        </p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {profile.socials.map((link) => {
            const Icon = getSocialIcon(link.label, link.href);
            return (
              <a
                key={link.label}
                href={link.href}
                className="inline-flex items-center gap-2 text-sm text-zinc-600 no-underline hover:text-zinc-900 hover:underline dark:text-zinc-400 dark:hover:text-zinc-50 3xl:text-base"
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              >
                {Icon ? <Icon className="h-4 w-4" aria-hidden="true" /> : null}
                {link.label}
              </a>
            );
          })}
        </div>
      </Container>
    </footer>
  );
}

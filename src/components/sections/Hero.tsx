import { motion, useReducedMotion } from "motion/react";

import { profile } from "../../content/profile";
import { sectionIds } from "../../content/site";
import { getSectionMotionProps } from "../../lib/motion";
import { Container } from "../layout/Container";
import { Button } from "../ui/Button";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const motionProps = getSectionMotionProps(shouldReduceMotion);

  return (
    <motion.section
      id={sectionIds.hero}
      className="relative scroll-mt-24 flex min-h-[80vh] items-center py-16 sm:py-20 md:max-h-screen"
      {...motionProps}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="absolute -right-24 top-24 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl" />
      </div>

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-300">
              {profile.title}
            </p>
            <h1 className="mt-4 max-w-3xl text-balance text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl">
              {profile.tagline}
            </h1>
            <h1 className="mt-4 max-w-3xl text-balance text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl leading-8">
              <span className="text-emerald-500">Kenneth</span> Sta Maria
            </h1>

            <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
              {profile.bio[0]}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href={profile.ctas.primary.href} variant="primary">
                {profile.ctas.primary.label}
              </Button>
              <Button href={profile.ctas.secondary.href} variant="secondary">
                {profile.ctas.secondary.label}
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2">
              {profile.socials.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-zinc-700 no-underline hover:text-zinc-900 hover:underline dark:text-zinc-300 dark:hover:text-zinc-50"
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute -inset-8 rounded-full bg-emerald-400/10 blur-2xl dark:bg-emerald-800/10" />

            <img
              src={profile.heroImage.src}
              alt={profile.heroImage.alt}
              className="h-auto w-full rounded-2xl object-contain"
              loading="eager"
            />
          </div>
        </div>
      </Container>
    </motion.section>
  );
}

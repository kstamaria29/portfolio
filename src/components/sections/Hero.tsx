import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Mail } from "lucide-react";

import { profile } from "../../content/profile";
import { sectionIds } from "../../content/site";
import { getSectionMotionProps } from "../../lib/motion";
import { getSocialIcon } from "../../lib/social";
import { Container } from "../layout/Container";
import { Button } from "../ui/Button";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const motionProps = getSectionMotionProps(shouldReduceMotion);

  return (
    <motion.section
      id={sectionIds.hero}
      className="relative scroll-mt-24 flex min-h-[80vh] items-center py-16 sm:py-20 md:max-h-screen 3xl:py-24"
      {...motionProps}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden lg:hidden">
        <img
          src={profile.heroImage.src}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-bottom opacity-30 dark:opacity-25"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/70 to-white/95 dark:from-zinc-950/90 dark:via-zinc-950/60 dark:to-zinc-950/90" />
      </div>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl 3xl:-left-32 3xl:top-2 3xl:h-96 3xl:w-96" />
        <div className="absolute -right-24 top-24 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl 3xl:-right-32 3xl:top-10 3xl:h-96 3xl:w-96" />
      </div>

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center 3xl:gap-16">
          <div>
            <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-300 3xl:text-base">
              {profile.title}
            </p>
            <h1 className="mt-4 max-w-3xl text-balance text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl 3xl:text-7xl">
              {profile.tagline}
            </h1>
            <h1 className="mt-4 max-w-3xl text-balance text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl leading-8 3xl:text-6xl 3xl:leading-tight">
              <span className="sm:text-6xl text-emerald-500 3xl:text-7xl">Kenneth</span> Sta Maria
            </h1>

            <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-zinc-600 dark:text-zinc-300 3xl:text-lg">
              {profile.shortbio}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3 3xl:gap-4">
              <Button href={profile.ctas.primary.href} variant="primary">
                {profile.ctas.primary.label}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button href={profile.ctas.secondary.href} variant="secondary">
                <Mail className="h-4 w-4" aria-hidden="true" />
                {profile.ctas.secondary.label}
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2">
              {profile.socials.map((link) => {
                const Icon = getSocialIcon(link.label, link.href);
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className="inline-flex items-center gap-2 text-sm font-medium text-zinc-700 no-underline hover:text-zinc-900 hover:underline dark:text-zinc-300 dark:hover:text-zinc-50 3xl:text-base"
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  >
                    {Icon ? <Icon className="h-4 w-4" aria-hidden="true" /> : null}
                    {link.label}
                  </a>
                );
              })}
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="pointer-events-none absolute -inset-8 rounded-full bg-emerald-400/10 blur-2xl dark:bg-emerald-800/10 3xl:-inset-10" />

            <img
              src={profile.heroImage.src}
              alt={profile.heroImage.alt}
              className="h-auto w-full rounded-2xl object-contain 3xl:rounded-3xl"
              loading="eager"
            />
          </div>
        </div>
      </Container>
    </motion.section>
  );
}

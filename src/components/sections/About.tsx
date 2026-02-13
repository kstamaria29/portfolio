import { motion, useReducedMotion } from "motion/react";

import { profile } from "../../content/profile";
import { sectionIds } from "../../content/site";
import { getSectionMotionProps } from "../../lib/motion";
import { Container } from "../layout/Container";
import { Card } from "../ui/Card";
import { AboutChatbot } from "./AboutChatbot";

export function About() {
  const shouldReduceMotion = useReducedMotion();
  const motionProps = getSectionMotionProps(shouldReduceMotion);

  return (
    <motion.section
      id={sectionIds.about}
      className="scroll-mt-24 border-t border-zinc-200/60 py-20 dark:border-white/10"
      {...motionProps}
    >
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-5xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            {profile.aboutSection.heading}
          </h2>
          <div className="mx-auto mt-6 h-px w-44 bg-zinc-200/70 dark:bg-white/10" />
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-start">
          <Card>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              Profile bio
            </h3>

            <div className="mt-4 space-y-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
              {profile.bio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-6 border-t border-zinc-200/70 pt-5 dark:border-white/10">
              <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                {profile.aboutSection.asideHeading}
              </h4>
              <ul className="mt-4 space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
                {profile.highlights.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          <AboutChatbot />
        </div>
      </Container>
    </motion.section>
  );
}

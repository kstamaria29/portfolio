import { motion, useReducedMotion } from "motion/react";
import { type CSSProperties, useLayoutEffect, useRef, useState } from "react";

import { profile } from "../../content/profile";
import { sectionIds } from "../../content/site";
import { getSectionMotionProps } from "../../lib/motion";
import { Container } from "../layout/Container";
import { Card } from "../ui/Card";
import { AboutChatbot } from "./AboutChatbot";

export function About() {
  const shouldReduceMotion = useReducedMotion();
  const motionProps = getSectionMotionProps(shouldReduceMotion);
  const profileCardRef = useRef<HTMLDivElement | null>(null);
  const [profileCardHeight, setProfileCardHeight] = useState<number | null>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const element = profileCardRef.current;
    if (!element) return;

    const updateHeight = () => {
      const nextHeight = Math.round(element.getBoundingClientRect().height);
      setProfileCardHeight((prev) => (prev === nextHeight ? prev : nextHeight));
    };

    updateHeight();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateHeight);
      return () => window.removeEventListener("resize", updateHeight);
    }

    const observer = new ResizeObserver(() => updateHeight());
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

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

        <div
          className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-start"
          style={
            profileCardHeight
              ? ({ "--about-profile-card-height": `${profileCardHeight}px` } as CSSProperties)
              : undefined
          }
        >
          <div ref={profileCardRef}>
            <Card>
              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
                Profile bio
              </h3>

              <div className="mt-4 space-y-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                {profile.bio.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </Card>
          </div>

          <AboutChatbot />
        </div>
      </Container>
    </motion.section>
  );
}

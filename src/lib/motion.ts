export function getSectionMotionProps(shouldReduceMotion: boolean | null) {
  const reduce = Boolean(shouldReduceMotion);
  return {
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, amount: 0.2 },
    variants: {
      hidden: { opacity: 0, y: reduce ? 0 : 12 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: reduce ? 0.2 : 0.6,
        },
      },
    },
  } as const;
}

export function getHoverTapMotion(shouldReduceMotion: boolean | null) {
  const reduce = Boolean(shouldReduceMotion);
  if (reduce) return {};
  return {
    whileHover: { y: -2 },
    whileTap: { scale: 0.98 },
    transition: { type: "spring", stiffness: 420, damping: 28 },
  } as const;
}

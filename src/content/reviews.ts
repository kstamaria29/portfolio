export type Review = {
  id: string;
  name: string;
  title: string;
  company: string;
  quote: string | string[];
};

export const reviewsSection = {
  heading: "Reviews",
  description:
    "A few placeholder testimonials to show the layout. Swap these in `src/content/reviews.ts`.",
} as const;

export const reviews: Review[] = [
  {
    id: "review-1",
    name: "Alex Rivera",
    title: "Product Manager",
    company: "Acme Co.",
    quote: [
      "Clear communication, fast iteration, and the final UI was polished and accessible.",
      "Exactly what we needed.",
    ],
  },
  {
    id: "review-2",
    name: "Sam Lee",
    title: "Design Lead",
    company: "Studio North",
    quote: [
      "Great eye for detail.",
      "The interactions feel crisp without getting in the way of the content.",
    ],
  },
  {
    id: "review-3",
    name: "Jordan Kim",
    title: "Engineer",
    company: "BuildWorks",
    quote: [
      "Thoughtful component structure and maintainable patterns.",
      "Easy to extend and ship.",
    ],
  },
];

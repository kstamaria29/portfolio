export type Review = {
  id: string;
  name: string;
  title: string;
  company: string;
  quote: string | string[];
};

export const reviewsSection = {
  heading: "Reviews",
  description: "Reviews and testimonials from the people I have worked and studied with.",
} as const;

export const reviews: Review[] = [
  {
    id: "review-1",
    name: "Andy Guffey",
    title: "Full Stack Developer",
    company: "Mission Ready",
    quote: [
      "I had the privilege of working with Kenneth on a number of projects during our time studying software development at Mission Ready, and I can confidently say he was an integral part of every project we collaborated on.",
      "From the outset, Kenneth demonstrated a high level of professionalism, consistency, and technical ability across both frontend and backend development. His knack for breaking down complex problems, offering creative solutions, and supporting the team made a significant impact on our overall success.",
      "What truly stood out was Kenneth’s willingness to go above and beyond. On multiple occasions, he picked up additional workloads to keep the project moving forward and ensure we met our deadlines never once compromising on quality. His dependability and dedication were a driving force behind the successful delivery of our projects.",
      "Beyond his technical strengths, Kenneth brought a consistently positive and focused attitude that helped maintain team morale and momentum. His contributions were truly pivotal, and I have no doubt he’ll bring the same value to any team or organisation he's part of.",
    ],
  },
];

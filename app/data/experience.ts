export type ExperienceItem = {
  period: string;
  role: string;
  context: string;
  description: string;
  highlights: string[];
};

export const experience: ExperienceItem[] = [
  {
    period: "NOW",
    role: "Independent creative developer",
    context: "Selected product and brand collaborations",
    description:
      "Partnering with thoughtful teams to translate a rough idea into a sharp, expressive digital experience.",
    highlights: ["Creative direction through launch", "Design systems that can grow"],
  },
  {
    period: "RECENT",
    role: "Design + engineering collaborator",
    context: "Product-minded teams and founders",
    description:
      "Working at the seam between design intent and real-world implementation, where the most useful details live.",
    highlights: ["Prototypes that make decisions easier", "Interfaces built for actual use"],
  },
  {
    period: "FOUNDATION",
    role: "Visual problem solver",
    context: "Identity, interaction, and digital craft",
    description:
      "Building a practice around taste, systems thinking, and the small movements that make a screen feel alive.",
    highlights: ["Strong visual hierarchy", "Purposeful motion and feedback"],
  },
];

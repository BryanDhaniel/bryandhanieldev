export type ExperienceItem = {
  period: string;
  role: string;
  organization: string;
  location: string;
  description: string;
  highlights: string[];
};

export const experience: ExperienceItem[] = [
  {
    period: "JUL — SEP 2025",
    role: "Software & AI Engineer Intern",
    organization: "National Research and Innovation Agency (BRIN)",
    location: "Bandung, Indonesia",
    description:
      "Built a full-stack Next.js application that detects emotions and predicts potential bullying from voice, wiring the Web Audio API, an audio classification model, and back-end services into one working pipeline.",
    highlights: [
      "Designed, trained, and evaluated an audio classification model for emotion and bullying-pattern detection",
      "Integrated RESTful APIs for front-end/back-end data exchange",
      "Owned the Web Audio API integration end to end",
    ],
  },
  {
    period: "FEB — JUN 2025",
    role: "Software & AI Engineer — Researchship",
    organization: "Center of Excellence HUMIC, Telkom University",
    location: "Bandung, Indonesia",
    description:
      "Developed a web and mobile application to detect skin cancer (melanoma and carcinoma) using a DenseNet-based image classification model, shipped across two platforms.",
    highlights: [
      "Built the web platform on the MERN stack and the mobile app in Flutter",
      "Delivered 2 solutions improving diagnostic efficiency and user experience",
      "Contributed to AI integration, front-end implementation, and UI/UX design",
    ],
  },
  {
    period: "DEC 2024 — MAY 2025",
    role: "Software Engineer Intern",
    organization: "Telkom University",
    location: "Bandung, Indonesia",
    description:
      "Applied full-stack development to build an AI-powered desktop/chat application using Ollama open-source LLMs to support internal academic needs.",
    highlights: [
      "Designed and implemented a React-based front end with an intuitive UX",
      "Integrated the front end with the back-end API, connecting the UI to the AI model logic",
    ],
  },
];
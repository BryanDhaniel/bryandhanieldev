import type { IconType } from "react-icons";
import {
  PiBrainBold,
  PiCloudArrowUpBold,
  PiCodeBold,
  PiDatabaseBold,
} from "react-icons/pi";

export type SkillGroup = {
  title: string;
  description: string;
  icon: IconType;
  color: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Software engineering",
    description: "Full-stack applications built for clear UX, reliable APIs, and maintainable delivery.",
    icon: PiCodeBold,
    color: "#00ffc6",
    skills: ["TypeScript", "React", "Next.js", "Node.js", "REST APIs"],
  },
  {
    title: "AI engineering",
    description: "Practical machine-learning and LLM features that turn research into useful product experiences.",
    icon: PiBrainBold,
    color: "#ff3366",
    skills: ["Python", "PyTorch", "LLM APIs", "Computer vision", "AI integration"],
  },
  {
    title: "Data + backend",
    description: "Structured data, application logic, and services that give products a dependable core.",
    icon: PiDatabaseBold,
    color: "#d7ff54",
    skills: ["PostgreSQL", "Firebase", "SQL", "Express", "API design"],
  },
  {
    title: "Cloud + delivery",
    description: "A disciplined workflow for versioning, testing, shipping, and improving real software.",
    icon: PiCloudArrowUpBold,
    color: "#a6a6a6",
    skills: ["Git", "GitHub", "Docker", "Vercel", "Testing"],
  },
];

const skillCloudTools = [
  { slug: "typescript", label: "TypeScript" },
  { slug: "javascript", label: "JavaScript" },
  { slug: "react", label: "React" },
  { slug: "nextdotjs", label: "Next.js" },
  { slug: "nodedotjs", label: "Node.js" },
  { slug: "express", label: "Express" },
  { slug: "html5", label: "HTML5" },
  { slug: "css3", label: "CSS3" },
  { slug: "flutter", label: "Flutter" },
  { slug: "dart", label: "Dart" },
  { slug: "firebase", label: "Firebase" },
  { slug: "postgresql", label: "PostgreSQL" },
  { slug: "figma", label: "Figma" },
  { slug: "git", label: "Git" },
  { slug: "github", label: "GitHub" },
  { slug: "vercel", label: "Vercel" },
  { slug: "docker", label: "Docker" },
  { slug: "python", label: "Python" },
  { slug: "pytorch", label: "PyTorch" },
  { slug: "visualstudiocode", label: "VS Code" },
];

export const skillCloudIcons = skillCloudTools.map((tool) => tool.slug);
export const skillCloudLabels = skillCloudTools.map((tool) => tool.label);

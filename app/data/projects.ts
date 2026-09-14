export type ProjectCategory = "Web" | "Mobile" | "AI & Data" | "Research" | "Product" |"AI & Multi-Agent" |"AI & Developer Tools" | "AI & Interactive Simulation";

export type Project = {
  order: number;
  slug: string;
  title: string;
  year: string;
  category: ProjectCategory;
  team: string;
  role: string;
  description: string;
  overview: string;
  purpose: string;
  contribution: string;
  stack: string[];
  cover: string;
  link: string;
  featured?: boolean;
  accent: string;
};

export const projects: Project[] = [
  {
    order: 1,
    slug: "ghibli-chat-app",
    title: "Ghibli Chat App",
    year: "2024",
    category: "Web",
    team: "Personal project",
    role: "Full-stack developer",
    description: "A real-time, email-first chat app built as an early deep dive into Firebase.",
    overview:
      "Ghibli Chat App is a real-time chat experience that lets people connect using email rather than a phone number. It includes straightforward authentication, messaging, and media sharing for everyday conversations.",
    purpose:
      "I built this as my first large project to understand how a complete real-time product comes together, from authentication to data storage and live updates.",
    contribution:
      "I owned the frontend and backend implementation, including the Firebase authentication flow, Firestore data model, and storage integration.",
    stack: ["JavaScript", "HTML", "CSS", "Firebase", "Firestore", "Storage"],
    cover: "/projects/ghibli-chat.webp",
    link: "https://ghiblichatapp-bryans-projects-ce7304ff.vercel.app/",
    accent: "#00ffc6",
  },
  {
    order: 2,
    slug: "temajuk-tourism",
    title: "Temajuk Tourism Website",
    year: "2024",
    category: "Web",
    team: "Team project · Innovillage",
    role: "UI/UX designer & frontend developer",
    description: "A destination website that helps visitors plan a trip to Temajuk with confidence.",
    overview:
      "Visit Temajuk was designed as a destination guide, inspired by city-tourism platforms such as Visit London. It brings together useful information for people planning a visit to Temajuk.",
    purpose:
      "The project was developed in response to an Innovillage brief and a lecturer-led client request, with the goal of making destination information easier to find and use.",
    contribution:
      "I was responsible for the UI/UX direction in Figma and contributed the frontend implementation of the website.",
    stack: ["Flutter", "Figma", "UI/UX", "Frontend"],
    cover: "/projects/temajuk-tourism.webp",
    link: "https://visittemajuk.com",
    accent: "#d7ff54",
  },
  {
    order: 3,
    slug: "sid-telkom-submission",
    title: "SID Telkom Submission Website",
    year: "2024",
    category: "Web",
    team: "Team project · RPLGDC internship",
    role: "Frontend engineer",
    description: "A practical submission system that makes Student ID requests easier to manage.",
    overview:
      "This web application supports Student ID (KTM) submissions with a dedicated request flow and a data layer for handling each application.",
    purpose:
      "We created it during an RPLGDC internship to simplify KTM submissions and practice shipping a full web workflow as a team.",
    contribution:
      "As the only frontend engineer on the team, I was fully responsible for the client-side product experience.",
    stack: ["React", "Express", "SQL", "Frontend"],
    cover: "/projects/sid-submission.webp",
    link: "https://github.com/rafifpurnomo/Tugas-Intern_ASE-LAB",
    accent: "#ff3366",
  },
  {
    order: 4,
    slug: "online-shop-flutter",
    title: "Online Shop UI/UX Flutter",
    year: "2024",
    category: "Mobile",
    team: "Personal project",
    role: "Mobile UI developer",
    description: "A polished Flutter commerce prototype focused on clear browsing and product discovery.",
    overview:
      "This mobile app prototype explores a clean shopping flow for browsing products, viewing details, and moving through a simple purchase journey.",
    purpose:
      "I made it to practice translating a UI/UX concept into a responsive Flutter interface, with reusable components and a scalable screen structure.",
    contribution:
      "I independently implemented the complete mobile interface in Flutter.",
    stack: ["Flutter", "Mobile UI", "Responsive layouts", "Component design"],
    cover: "/projects/online-shop.webp",
    link: "https://github.com/BryanDhaniel/online-shop-ai",
    accent: "#ff3366",
  },
  {
    order: 5,
    slug: "ai-plant-disease-detection",
    title: "AI Plant Disease Detection App",
    year: "2024",
    category: "AI & Data",
    team: "Team project",
    role: "Mobile UI/UX & frontend developer",
    description: "A mobile app that uses image classification to identify common plant diseases.",
    overview:
      "Users can capture or upload leaf images and receive an AI-powered classification result. The app uses a Google Teachable Machine model to make early disease detection more accessible.",
    purpose:
      "The project was a practical way to combine mobile development with AI integration and explore how a useful agricultural tool could feel simple in everyday use.",
    contribution:
      "I worked on the mobile UI/UX and Flutter frontend, and contributed to integrating the model for real-time detection.",
    stack: ["Flutter", "Teachable Machine", "Image classification", "Mobile UI/UX"],
    cover: "/projects/plant-disease.webp",
    link: "https://github.com/Mr-Roma/AI-Plant-App",
    accent: "#d7ff54",
  },
  {
    order: 6,
    slug: "pat-a-pet",
    title: "Pat-A-Pet Adoption App",
    year: "2025",
    category: "Product",
    team: "Team project",
    role: "Web full-stack developer & mobile contributor",
    description: "A web and mobile platform that makes pet adoption and posting more approachable.",
    overview:
      "Pat-A-Pet connects people who want to adopt, post pets for adoption, or share pet-related activities. The product spans a MERN web platform and a Flutter mobile app.",
    purpose:
      "We used the project to go deeper into MERN and Flutter while building around a social cause: helping pets find loving homes and raising awareness around responsible adoption.",
    contribution:
      "I led frontend and backend work for the website and also contributed to the companion mobile app.",
    stack: ["MERN", "Flutter", "Community product", "Full stack"],
    cover: "/projects/pat-a-pet.webp",
    link: "https://pat-a-pet-web.vercel.app/",
    accent: "#ff3366",
  },
  {
    order: 7,
    slug: "melanotect",
    title: "Melanotect",
    year: "2025",
    category: "AI & Data",
    team: "Team project",
    role: "Web & mobile developer · AI integration",
    description: "A cross-platform AI concept for accessible skin-cancer risk screening.",
    overview:
      "Melanotect lets people upload skin-lesion images and receive AI-based melanoma or carcinoma predictions. The web experience uses MERN, the mobile app uses Flutter, and the classifier is powered by DenseNet.",
    purpose:
      "We wanted to explore how web, mobile, and deep learning could come together in an accessible early-detection tool that also builds awareness around skin health.",
    contribution:
      "I contributed to both the MERN web and Flutter mobile experiences, plus integration of the DenseNet-based model.",
    stack: ["MERN", "Flutter", "DenseNet", "Image classification"],
    cover: "/projects/melanotect.webp",
    // link: "https://melanotect.humicprototyping.com/",
    link: "https://btp.telkomuniversity.ac.id/landing/ip/HCNA2302260286",
    accent: "#ff3366",
  },
  {
    order: 8,
    slug: "study-mind",
    title: "StudyMind",
    year: "2025",
    category: "AI & Data",
    team: "Google Chrome Built-in AI Challenge 2025",
    role: "Full-stack developer",
    description: "A private, browser-native study assistant powered by Chrome’s Built-in AI APIs.",
    overview:
      "StudyMind helps students process academic text and PDFs with a retro-inspired interface and local, private data processing. Gemini Nano runs key AI tasks offline after the initial load.",
    purpose:
      "I created it for the Google Chrome Built-in AI Challenge 2025 to help students work through academic materials without depending on expensive cloud subscriptions or constant internet access.",
    contribution:
      "I built the full-stack Next.js application, integrated Gemini Nano, and shipped six tools: summarize, question generation, translation, proofreading, writing improvement, and explanation.",
    stack: ["Next.js", "TypeScript", "Gemini Nano", "Chrome Built-in AI", "PDF.js"],
    cover: "/projects/study-mind.webp",
    link: "https://study-mind-nine.vercel.app/",
    featured: true,
    accent: "#00ffc6",
  },
  {
    order: 9,
    slug: "alzheimer-detection-speech",
    title: "Alzheimer Detection from Speech",
    year: "2025",
    category: "AI & Data",
    team: "Personal research project",
    role: "Machine-learning developer",
    description: "A speech-analysis system that explores non-invasive early Alzheimer’s screening.",
    overview:
      "The system analyses vocal biomarkers and speech patterns using Wav2Vec2 feature extraction and an SVM classifier to identify subtle linguistic and acoustic signals linked to cognitive decline.",
    purpose:
      "The goal was to explore a more accessible, non-invasive path for early screening that could support healthcare professionals through simple voice recordings.",
    contribution:
      "I developed the ML pipeline, processed audio data, built feature extraction with Wav2Vec2, trained the SVM classifier, and converted the model to ONNX for cross-platform use.",
    stack: ["Python", "Wav2Vec2", "SVM", "ONNX", "Audio ML"],
    cover: "/projects/alzheimer-detection.webp",
    link: "https://github.com/BryanDhaniel/alzheimer-detection",
    accent: "#d7ff54",
  },
  {
    order: 10,
    slug: "color-vision",
    title: "Color Vision",
    year: "2025",
    category: "Research",
    team: "Undergraduate thesis",
    role: "Primary researcher & developer",
    description: "A hybrid AI system for color-blindness diagnosis and personalised career consultation.",
    overview:
      "Developed as my final-year thesis, Color Vision combines a rule-based expert system for Ishihara test diagnosis with an LLM that provides tailored career consultation.",
    purpose:
      "The objective was to create a reliable self-diagnostic and career-guidance tool that helps people with color-vision deficiency navigate professional requirements more safely.",
    contribution:
      "I designed the Ishihara decision-tree logic, built the React interface, and integrated LLM APIs for real-time consultation and career recommendations.",
    stack: ["React", "Expert system", "LLM APIs", "Ishihara test", "Research"],
    cover: "/projects/color-vision.webp",
    link: "https://github.com/BryanDhaniel/ColorVision",
    featured: true,
    accent: "#ff3366",
  },
  {
    order: 11,
    slug: "aspire",
    title: "ASPIRE",
    year: "2025",
    category: "AI & Data",
    team: "Personal product project",
    role: "Full-stack developer & database engineer",
    description: "An AI-guided academic recommendation system for career and course mapping.",
    overview:
      "ASPIRE combines automated academic-history parsing, LLM-based career matching, and course recommendations to help students map their strengths to real industry requirements.",
    purpose:
      "It was designed to give students a more systematic, data-driven way to plan education paths and reduce the risk of misaligned career decisions.",
    contribution:
      "I built the transcript parsing module, the LLM-assisted career-matching logic, and the course-recommendation system based on skill-gap analysis.",
    stack: ["Full stack", "LLMs", "Database design", "Recommendation systems"],
    cover: "/projects/aspire.webp",
    link: "https://aspire-mu.vercel.app/",
    accent: "#00ffc6",
  },
  {
    order: 12,
    slug: "orbit-x",
    title: "OrbitX",
    year: "2025",
    category: "Web",
    team: "Personal project",
    role: "Frontend developer",
    description: "An interactive 3D web experience for exploring the solar system.",
    overview:
      "OrbitX gives people an informative, responsive way to explore planets, the sun, and asteroid belts through a 3D solar-system visualization in the browser.",
    purpose:
      "I wanted to make astronomy data feel more visual, engaging, and approachable through an interactive web-based learning tool.",
    contribution:
      "I developed the Next.js application with Turbopack, built the 3D celestial components, and integrated detailed planet textures for a richer exploration experience.",
    stack: ["Next.js", "3D web", "Turbopack", "Interactive education"],
    cover: "/projects/orbit-x.webp",
    link: "https://github.com/BryanDhaniel/orbitx",
    accent: "#00ffc6",
  },
  {
    order: 13,
    slug: "autonomous-lunar-lander",
    title: "Autonomous Lunar Lander",
    year: "2026",
    category: "Research",
    team: "Personal research project",
    role: "Machine-learning developer",
    description: "A Deep Reinforcement Learning agent for a stable autonomous spacecraft landing.",
    overview:
      "This project implements a Deep Q-Network and Double DQN agent for LunarLander-v3. Experience replay and target networks help produce stable, consistent landing behaviour.",
    purpose:
      "The work demonstrates how reinforcement learning can solve continuous-control problems in a discrete action space, including decisions around main and side engines.",
    contribution:
      "I implemented the PyTorch pipeline, configured experience replay and target networks, achieved an average evaluation reward above 400, and built 2D and 3D browser visualisations for monitoring performance.",
    stack: ["PyTorch", "DQN", "Double DQN", "Reinforcement learning", "3D visualisation"],
    cover: "/projects/lunar-lander.webp",
    link: "https://github.com/BryanDhaniel/lunarlander",
    featured: true,
    accent: "#d7ff54",
  },
  {
    order: 14,
    slug: "soul-chess",
    title: "SoulChess",
    year: "2026",
    category: "Web",
    team: "Personal project",
    role: "Game systems & full-stack developer",
    description: "A fantasy chess strategy game built around a custom 16×16 battlefield and unique piece abilities.",
    overview:
    "SoulChess reimagines classic chess as a turn-based fantasy strategy game played on a 16×16 octagonal board, where players build a 20-piece deck and use unique abilities to outmaneuver their opponent.",
    purpose:
    "The project explores how traditional chess mechanics can be extended into a larger tactical system through custom board geometry, deck building, special abilities, and multiple AI strategies.",
    contribution:
    "I built the core game engine, board and movement logic, deck validation system, piece abilities, AI strategies, game-state management, and the interactive web interface.",
    stack: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Game AI", "Docker"],
    cover: "/projects/soul-chess.webp",
    link: "https://soul-chess-brown.vercel.app/",
    featured: true,
    accent: "#d7ff54",
  },
  {
    order: 15,
    slug: "epos",
    title: "Epos",
    year: "2026",
    category: "AI & Interactive Simulation",
    team: "OpenAI Hackathon",
    role: "AI systems & full-stack developer",
    description:
      "An interactive historical simulation platform that turns complex events into explorable systems.",
    overview:
      "Epos recreates historical scenarios as deterministic, interactive simulations where logistics, weather, resources, trust, incomplete information, and civilian impact influence how events unfold.",
    purpose:
      "The project explores how historical events can be taught through systems and simulation rather than passive storytelling, while clearly separating historical evidence from modeled inference and counterfactual scenarios.",
    contribution:
      "I designed the simulation engine, historical scenario system, agent state and memory models, replayable counterfactual mechanics, interactive 3D world, and AI-powered historical briefing experience.",
    stack: [
      "Next.js",
      "TypeScript",
      "Three.js",
      "React Three Fiber",
      "Drei",
      "Zustand",
      "OpenAI",
    ],
    cover: "/projects/epos.webp",
    link: "https://epos-smoky.vercel.app/",
    featured: true,
    accent: "#d7ff54",
  },
  {
    order: 16,
    slug: "open-debate",
    title: "OpenDebate",
    year: "2026",
    category: "AI & Multi-Agent",
    team: "Personal project",
    role: "AI systems & full-stack developer",
    description: "A multi-agent debate platform where AI researchers argue, rebut, and judge opposing positions.",
    overview:
    "OpenDebate gives two AI debaters the same topic, lets them independently research opposing positions, and orchestrates a structured debate through openings, rebuttals, cross-examination, and closing arguments.",
    purpose:
    "The project explores fairer multi-agent reasoning by separating research, debate orchestration, and evaluation, while using an anonymized AI judge to reduce positional bias.",
    contribution:
    "I designed the debate state machine, AI debater and judge pipeline, isolated parallel research, structured score validation, and real-time SSE streaming system.",
    stack: ["Next.js", "TypeScript", "OpenAI", "Tavily", "AI SDK", "SSE"],
    cover: "/projects/opendebate.webp",
    link: "https://opendebate-mu.vercel.app/",
    featured: true,
    accent: "#00ffc6",
  },
  {
    order: 17,
    slug: "my-agent",
    title: "My-Agent",
    year: "2026",
    category: "AI & Developer Tools",
    team: "Personal project",
    role: "AI systems developer",
    description: "A terminal-based AI coding agent built from scratch with a custom agent runtime.",
    overview:
    "My-Agent is a Claude Code-inspired coding agent built from scratch, with a hand-rolled agent loop that can reason over tasks, use tools, modify project files, and execute commands through a terminal-native interface.",
    purpose:
    "The project explores how modern AI coding agents work internally, focusing on tool use, context management, permissions, multi-provider support, and reliable agent execution.",
    contribution:
    "I designed and implemented the agent loop, tool system, provider abstraction, permission controls, context management, session persistence, sub-agents, task orchestration, and Ink-based terminal UI.",
    stack: ["TypeScript", "Node.js", "LLM Agents", "MCP", "Ink", "Zod"],
    cover: "/projects/my-agent.webp",
    link: "https://github.com/BryanDhaniel/my-agent",
    featured: true,
    accent: "#d7ff54",
  },

];

export const featuredProjects = projects.filter((project) => project.featured);

/**
 * The three newest projects, most recent first.
 * Sorts a copy: `projects` must keep its original order because
 * `getProjectNeighbors` and the archive grid both depend on it.
 */
export const latestProjects = [...projects].sort((a, b) => b.order - a.order).slice(0, 3);

/**
 * Which projects appear in the home page "Selected work" section.
 *
 * Edit this list to change the selection — the numbers are each project's
 * `order` value. The array order is also the display order, and the first
 * three positions map to the grid slots: large, small, then full-width.
 */
export const selectedProjectOrders = [15, 16, 17];

/** The projects named in `selectedProjectOrders`, kept in that exact order. */
export const selectedProjects = selectedProjectOrders
  .map((order) => projects.find((project) => project.order === order))
  .filter((project): project is Project => project !== undefined);

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getProjectNeighbors(slug: string) {
  const currentIndex = projects.findIndex((project) => project.slug === slug);

  if (currentIndex === -1) return { previous: undefined, next: undefined };

  return {
    previous: projects[currentIndex - 1],
    next: projects[currentIndex + 1],
  };
}

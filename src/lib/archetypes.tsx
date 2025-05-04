import React from "react";

export interface Archetype {
  slug: string;
  name: string;
  description: string;
  strengths: string[];
  challenges: string[];
  recommendations: string[];
  avatar: React.ReactNode;
}

export const archetypes: Archetype[] = [
  {
    slug: "visionary",
    name: "Visionary",
    description:
      "Creative, forward-thinking ideators who envision bold futures and possibilities.",
    strengths: [
      "Innovative idea generation",
      "Big-picture strategic thinking",
      "Inspiring and motivational communication",
    ],
    challenges: [
      "Tendency to overlook practical details",
      "Prone to idealism without follow-through",
      "May struggle with routine tasks",
    ],
    recommendations: [
      "Develop structured planning habits",
      "Pair with detail-focused partners",
      "Use milestone tracking tools to stay grounded",
    ],
    avatar: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        className="w-12 h-12"
      >
        <circle cx="32" cy="32" r="30" fill="#4F46E5" />
        <path
          d="M32 16v32M16 32h32"
          stroke="#FFF"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    slug: "innovator",
    name: "Innovator",
    description:
      "Systematic creators who blend analytical rigor with creative solutions to optimize processes.",
    strengths: [
      "Structured creativity",
      "Methodical problem-solving",
      "Process optimization expertise",
    ],
    challenges: [
      "May overanalyze and slow progress",
      "Can be inflexible to spontaneous change",
      "Risk of perfectionism",
    ],
    recommendations: [
      "Set clear deadlines to curb analysis paralysis",
      "Practice rapid prototyping techniques",
      "Balance rigor with periodic creative play",
    ],
    avatar: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        className="w-12 h-12"
      >
        <rect x="12" y="12" width="40" height="40" fill="#059669" />
        <path
          d="M12 32h40M32 12v40"
          stroke="#FFF"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    slug: "commander",
    name: "Commander",
    description:
      "Assertive leaders who drive teams toward high-stakes goals with discipline and authority.",
    strengths: [
      "Decisive, goal-oriented leadership",
      "High energy and assertiveness",
      "Strong organizational skills",
    ],
    challenges: [
      "May appear domineering under stress",
      "Risk of undervaluing team input",
      "Can prioritize results over relationships",
    ],
    recommendations: [
      "Solicit regular team feedback",
      "Cultivate active listening practices",
      "Include collaborative decision checkpoints",
    ],
    avatar: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        className="w-12 h-12"
      >
        <polygon
          points="32,8 8,56 56,56"
          fill="#DC2626"
        />
      </svg>
    ),
  },
  {
    slug: "influencer",
    name: "Influencer",
    description:
      "Empathic networkers who excel at persuasion, relationship building, and community engagement.",
    strengths: [
      "High emotional intelligence",
      "Natural persuasion and rapport-building",
      "Skilled at fostering community",
    ],
    challenges: [
      "May struggle with boundaries",
      "Risk of people-pleasing",
      "Can get distracted by social dynamics",
    ],
    recommendations: [
      "Set clear personal boundaries",
      "Prioritize deep one-on-one connections",
      "Use agendas to stay on task in meetings",
    ],
    avatar: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        className="w-12 h-12"
      >
        <circle cx="32" cy="24" r="12" fill="#F59E0B" />
        <path
          d="M16 56c0-8 16-8 16-8s16 0 16 8"
          fill="#FBBF24"
        />
      </svg>
    ),
  },
  {
    slug: "strategist",
    name: "Strategist",
    description:
      "Long-term planners who evaluate risks and opportunities to chart optimal pathways forward.",
    strengths: [
      "Exceptional planning and foresight",
      "Risk analysis abilities",
      "Systematic evaluation of scenarios",
    ],
    challenges: [
      "May overplan and delay action",
      "Can be averse to rapid change",
      "Risk of analysis paralysis",
    ],
    recommendations: [
      "Adopt iterative planning sprints",
      "Balance long-range and short-term goals",
      "Use decision matrices to streamline choices",
    ],
    avatar: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        className="w-12 h-12"
      >
        <rect x="24" y="8" width="16" height="48" fill="#2563EB" />
        <path
          d="M8 32h48"
          stroke="#FFF"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    slug: "investigator",
    name: "Investigator",
    description:
      "Inquisitive researchers driven by ethical rigor and deep analytical inquiry.",
    strengths: [
      "Thorough research skills",
      "High integrity and ethical standards",
      "Deep analytical thinking",
    ],
    challenges: [
      "May overfocus on details",
      "Risk of information overload",
      "Can struggle to communicate insights succinctly",
    ],
    recommendations: [
      "Set information boundaries",
      "Practice summary and synthesis techniques",
      "Use visual aids to present complex data",
    ],
    avatar: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        className="w-12 h-12"
      >
        <circle cx="32" cy="32" r="24" fill="#10B981" />
        <path
          d="M32 16v32M16 32h16"
          stroke="#FFF"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    slug: "mediator",
    name: "Mediator",
    description:
      "Compassionate harmonizers who navigate conflicts and foster cooperative environments.",
    strengths: [
      "Strong conflict resolution skills",
      "High empathy and compassion",
      "Skilled at building consensus",
    ],
    challenges: [
      "May avoid necessary confrontations",
      "Can over-prioritize harmony at cost of efficiency",
      "Risk of internalizing others’ stress",
    ],
    recommendations: [
      "Practice assertive communication",
      "Set clear conflict-resolution protocols",
      "Schedule personal decompression time",
    ],
    avatar: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        className="w-12 h-12"
      >
        <path
          d="M8 32h48M32 8v48"
          stroke="#6366F1"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    slug: "guardian",
    name: "Guardian",
    description:
      "Dependable executors who ensure stability, compliance, and ethical standards.",
    strengths: [
      "Highly reliable and responsible",
      "Strong adherence to rules and policies",
      "Excellent organizational maintenance",
    ],
    challenges: [
      "May resist necessary innovation",
      "Risk of rigidity in processes",
      "Can become stressed by ambiguity",
    ],
    recommendations: [
      "Incorporate periodic innovation reviews",
      "Build in flexible exception protocols",
      "Use scenario planning for ambiguity management",
    ],
    avatar: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        className="w-12 h-12"
      >
        <rect x="16" y="16" width="32" height="32" fill="#EF4444" />
      </svg>
    ),
  },
  {
    slug: "integrator",
    name: "Integrator",
    description:
      "Versatile collaborators who adapt fluidly to roles and bridge diverse perspectives.",
    strengths: [
      "Exceptional adaptability",
      "Balanced skill set across dimensions",
      "Effective at unifying teams",
    ],
    challenges: [
      "May lack a clear specialty",
      "Risk of overextending",
      "Can struggle to prioritize tasks",
    ],
    recommendations: [
      "Define core focus areas for each project",
      "Use time-blocking for task prioritization",
      "Leverage specialist support when needed",
    ],
    avatar: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        className="w-12 h-12"
      >
        <circle cx="32" cy="32" r="30" fill="#8B5CF6" />
        <circle cx="32" cy="32" r="16" fill="#C084FC" />
      </svg>
    ),
  },
];

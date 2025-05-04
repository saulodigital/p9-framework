import React from "react";

export interface PracticalApplications {
  growth: string[];
  collaboration: string[];
  career: string[];
}

export interface Archetype {
  slug: string;
  name: string;
  description: string;
  strengths: string[];
  challenges: string[];
  recommendations: string[];
  avatar: React.ReactNode;
  applications: PracticalApplications;
}

export const archetypes: Archetype[] = [
  {
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
    applications: {
      growth: [
        // Cognitive‐Experiential Self-Theory suggests alternating schema-driven planning with free-form ideation
        "Schedule regular “blue-sky” brainstorming sessions followed by structured feasibility reviews (Epstein, 1994).",
        // Self-Determination Theory: support autonomy in idea generation
        "Use autonomy-supportive tools (e.g., mind-mapping software) to explore ideas before committing to details (Ryan & Deci, 2000).",
        // Metacognitive strategy: reflect on idea volume vs. execution
        "At week’s end, journal which ideas were acted upon versus shelved—helps calibrate your innovator’s impulse (Schraw & Dennison, 1994).",
      ],
      collaboration: [
        // Complementary roles: pair with a detail-oriented partner
        "Team up with an Integrator or Guardian who excels at follow-through and operational detail (Belbin Team Roles).",
        // Use “pitch & pull” communication
        "Lead with compelling vision statements, then elicit critiques to ground ideas in practical constraints (Kotter, 1996).",
      ],
      career: [
        // Strategic foresight roles emphasize long-term perspective
        "Pursue roles in R&D, corporate strategy, or innovation labs where big-picture thinking is prized (O’Connor & McDermott, 2004).",
        // Advisory or board positions allow high-level impact
        "Consider advisory board or thought-leadership positions to shape direction without day-to-day execution.",
      ],
    },
  },
  {
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
    applications: {
      growth: [
        // Dual-Process Theory: alternate analytical and creative modes
        "Block dedicated “divergent” time for ideation, then switch to “convergent” time for analysis (Stanovich & West, 2000).",
        // Lean Startup methodology
        "Adopt rapid-prototyping (MVP) cycles to validate ideas quickly and reduce perfectionism (Ries, 2011).",
      ],
      collaboration: [
        // Leverage collective intelligence
        "Run structured ideation workshops (e.g., SCAMPER technique) with Visionaries to spark novel solutions (Michalko, 2006).",
        // Use process mapping
        "Document and share optimized workflows to help teams adopt improvements seamlessly (Hammer & Champy, 1993).",
      ],
      career: [
        // Product design and process engineering
        "Look for roles in UX/UI, operations, or process engineering where structured creativity drives impact.",
        // Continuous improvement functions
        "Consider Six Sigma or Agile coaching positions to blend rigor with innovation.",
      ],
    },
  },
  {
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
    applications: {
      growth: [
        // Transformational leadership practice
        "Practice articulating a clear vision with “Why” and “How” to inspire buy-in (Bass & Avolio, 1994).",
        // Emotional intelligence training
        "Develop active listening and empathy through structured EI workshops to mitigate perceived dominance (Goleman, 1998).",
      ],
      collaboration: [
        // Inclusive decision checkpoints
        "Embed regular team feedback loops (e.g., “Start-Stop-Continue”) to balance decisiveness with input (Edmondson, 2012).",
        // Delegation frameworks
        "Use RACI matrices to distribute responsibilities and empower team members (Project Management Institute).",
      ],
      career: [
        // Executive leadership tracks
        "Aim for roles in operations management, project leadership, or C-suite where decisive action is valued.",
        // High-stakes environments
        "Consider fields like emergency services, military, or turnaround consulting where authority drives results.",
      ],
    },
  },
  {
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
    applications: {
      growth: [
        // Social network analysis
        "Map your network and schedule time for high-leverage connections (Burt, 2000).",
        // Persuasion science
        "Apply principles from Cialdini’s Influence (2006): reciprocity and social proof to strengthen rapport.",
      ],
      collaboration: [
        // Community-building rituals
        "Host regular informal gatherings (e.g., “coffee huddles”) to maintain strong team bonds.",
        // Boundary setting
        "Use SMART goals to keep people-pleasing in check and maintain productivity (Doran, 1981).",
      ],
      career: [
        // Customer-facing roles
        "Explore positions in sales, public relations, or community management where empathy drives performance.",
        // Culture and engagement functions
        "Consider roles in People & Culture or brand advocacy to leverage your networking strengths.",
      ],
    },
  },
  {
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
    applications: {
      growth: [
        // Scenario planning
        "Run “what-if” workshops to anticipate multiple futures (Schwartz, 1991).",
        // Decision-matrix practice
        "Use Eisenhower grids or weighted decision matrices for key personal & professional choices.",
      ],
      collaboration: [
        // Storyboarding roadmaps
        "Visualize strategic plans via Gantt or strategy maps so stakeholders grasp the big picture.",
        // Cross-functional forums
        "Lead monthly cross-team strategy reviews to align tactical execution with long-term goals.",
      ],
      career: [
        // Strategic planning roles
        "Target roles like corporate strategist, management consultant, or business architect.",
        // Policy and advisory
        "Consider think-tank or policy positions to shape broader organizational direction.",
      ],
    },
  },
  {
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
    applications: {
      growth: [
        // Meta-analysis habit
        "Practice summary writing: condense research into one-page briefs to build synthesis skills.",
        // Information boundaries
        "Set strict time limits when researching to avoid analysis paralysis (O’Reilly, 2018).",
      ],
      collaboration: [
        // Research showcases
        "Run “lunch & learn” sessions to present findings succinctly to non-specialists.",
        // Data-visualization tools
        "Use dashboards (e.g., Tableau) to translate deep analysis into actionable insights.",
      ],
      career: [
        // Research and audit roles
        "Pursue roles in R&D, compliance, or academic research where rigor and ethics are key.",
        // Data science paths
        "Consider data-analyst or epidemiology positions, leveraging your analytical rigor.",
      ],
    },
  },
  {
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
    applications: {
      growth: [
        // Conflict-resolution frameworks
        "Learn and apply Thomas-Kilmann methods to address conflict styles effectively (TKI, 1974).",
        // Mindfulness training
        "Practice active mindfulness (Kabat-Zinn, 1994) to manage emotional contagion.",
      ],
      collaboration: [
        // Facilitation best practices
        "Use structured facilitation techniques (e.g., Liberating Structures) to guide group consensus.",
        // Empathy mapping
        "Lead empathy mapping workshops so teams truly understand user or stakeholder perspectives.",
      ],
      career: [
        // HR and coaching roles
        "Consider HR business partner, organizational development, or professional coaching positions.",
        // Mediation and counseling
        "Explore roles in dispute resolution services or as a certified mediator.",
      ],
    },
  },
  {
    avatar: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        className="w-12 h-12"
      >
        <rect x="16" y="16" width="32" height="32" fill="#EF4444" />
      </svg>
    ),
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
    applications: {
      growth: [
        // Adaptive compliance
        "Schedule quarterly innovation reviews to balance stability with necessary change.",
        // Cognitive flexibility
        "Practice scenario-based exercises to build comfort with ambiguity (Fleeson & Jayawickreme, 2015).",
      ],
      collaboration: [
        // Standard-setting workshops
        "Lead sessions to document and refine SOPs, ensuring both clarity and buy-in.",
        // Exception protocols
        "Establish flexible exception processes so the team can innovate within guardrails.",
      ],
      career: [
        // Operations and compliance
        "Look for roles in quality assurance, regulatory affairs, or operations management.",
        // Program management
        "Consider program manager positions overseeing large-scale implementations.",
      ],
    },
  },
  {
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
    applications: {
      growth: [
        // Role rotation
        "Periodically switch project roles to deepen specialization and avoid overextension.",
        // Boundary setting
        "Use time-blocking to allocate “deep focus” and “context-shifting” periods (Cal Newport).",
      ],
      collaboration: [
        // Bridge-builder rituals
        "Host “cross-pollination” sessions where different functions share insights.",
        // Resource coordination
        "Implement simple RACI charts so teams know how you connect points.",
      ],
      career: [
        // Program or portfolio management
        "Aim for program manager or product owner roles that leverage your adaptability.",
        // Consulting and generalist roles
        "Consider management consulting or internal strategy roles requiring broad oversight.",
      ],
    },
  },
];

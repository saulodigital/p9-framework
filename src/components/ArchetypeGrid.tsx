"use client";

import { archetypeCentroids } from "@/lib/archetypeCentroids";
import { ArchetypeCard } from "./ArchetypeCard";

const cards = [
  { slug: "visionary", name: "Visionary", signature: "Future-focused ideation" },
  { slug: "innovator", name: "Innovator", signature: "Structured creativity" },
  { slug: "commander", name: "Commander", signature: "Directive leadership" },
  { slug: "influencer", name: "Influencer", signature: "Empathic persuasion" },
  { slug: "strategist", name: "Strategist", signature: "Long-term planning" },
  { slug: "investigator", name: "Investigator", signature: "Rigorous inquiry" },
  { slug: "mediator", name: "Mediator", signature: "Team harmony" },
  { slug: "guardian", name: "Guardian", signature: "Reliable execution" },
  { slug: "integrator", name: "Integrator", signature: "Versatile problem-solving" },
];

export function ArchetypeGrid() {
  return (
    <section className="py-12 bg-white">
      <h2 className="text-3xl font-bold text-center mb-8">Meet the Archetypes</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {cards.map(({ slug, name, signature }) => (
          <ArchetypeCard
            key={slug}
            slug={slug}
            name={name}
            signature={signature}
            centroid={archetypeCentroids[slug]}
          />
        ))}
      </div>
    </section>
  );
}

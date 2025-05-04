"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { archetypeCentroids } from "@/lib/archetypeCentroids";

// Dynamically load the client-only chart
const ClientRadar = dynamic(() => import("./ClientRadar"), { ssr: false });

interface Card {
  slug: string;
  name: string;
  signature: string;
}

const cards: Card[] = [
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

export default function ArchetypeGrid() {
  return (
    <section className="py-12 bg-white">
      <h2 className="text-3xl font-bold text-center mb-8">Meet the Archetypes</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {cards.map(({ slug, name, signature }) => {
          const data = archetypeCentroids[slug];
          return (
            <div
              key={slug}
              className="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-lg transition flex flex-col items-center"
            >
              {/* Avatar */}
              <div className="mb-4 w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                {name[0]}
              </div>

              <h3 className="text-xl font-semibold mb-1">{name}</h3>
              <p className="text-gray-600 text-center mb-4">{signature}</p>

              {/* Client-only Radar chart */}
              <ClientRadar data={data} dataKey={slug} name={name} />

              <Link
                href={`/archetype/${slug}`}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
              >
                Learn More
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
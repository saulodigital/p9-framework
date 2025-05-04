// app/archetype/[slug]/page.tsx
import React from "react";
import Link from "next/link";
import { archetypes } from "@/lib/archetypes";
import { archetypeCentroids } from "@/lib/archetypeCentroids";
import ArchetypeRadar from "@/components/ArchetypeRadar";

export default function ArchetypePage({ params }: { params: { slug: string } }) {
  const archetype = archetypes.find((a) => a.slug === params.slug);
  if (!archetype) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold">Archetype not found</h2>
        <p>
          <Link href="/">Back to home</Link>
        </p>
      </div>
    );
  }

  const data = archetypeCentroids[archetype.slug];

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Avatar */}
      <div className="flex justify-center">{archetype.avatar}</div>

      {/* Title & Description */}
      <h1 className="text-3xl font-bold text-center">{archetype.name}</h1>
      <p className="text-gray-700 text-center">{archetype.description}</p>

      {/* Client-only Radar Chart */}
      <div className="flex justify-center">
        <ArchetypeRadar slug={archetype.slug} name={archetype.name} data={data} />
      </div>

      {/* Strengths */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Strengths</h2>
        <ul className="list-disc list-inside space-y-1 text-gray-800">
          {archetype.strengths.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </section>

      {/* Challenges */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Challenges</h2>
        <ul className="list-disc list-inside space-y-1 text-gray-800">
          {archetype.challenges.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </section>

      {/* Recommendations */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Recommendations</h2>
        <ul className="list-disc list-inside space-y-1 text-gray-800">
          {archetype.recommendations.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </section>

      {/* Back Link */}
      <div className="text-center">
        <Link href="/">
          <span className="text-blue-600 underline">← Back to Archetype Grid</span>
        </Link>
      </div>
    </div>
  );
}

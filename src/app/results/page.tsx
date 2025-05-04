"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { computeProfile } from "@/lib/scoring";
import { Archetype } from "@/lib/archetypes";
import PracticalApplications from "@/components/PracticalApplications";
import LabelFeedback from "@/components/LabelFeedback";
import PersonalizedInsights from "@/components/PersonalizedInsights";

export default function Results() {
  const [profile, setProfile] = useState<(Archetype & { score: number })[] | null>(null);

  useEffect(() => {
    const answers: Record<string, number> = JSON.parse(
      localStorage.getItem("answers") || "{}"
    );
    const prof = computeProfile(answers);
    setProfile(prof);
  }, []);

  if (!profile) return <div>Loading your results…</div>;

  const [primary, ...others] = profile;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Primary Archetype</h2>

      <div className="bg-blue-50 p-4 rounded shadow">
        <h3 className="text-xl font-semibold">{primary.name}</h3>
        <p className="mb-2">Score: {primary.score.toFixed(2)}</p>
        <p className="mb-4">{primary.description}</p>
        <Link
          href={`/archetype/${primary.slug}`}
          className="inline-block mt-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Explore more about {primary.name}
        </Link>
      </div>

      <h3 className="text-xl font-bold mt-6">Other Archetypes</h3>
      <ul className="mt-3 space-y-2">
        {others.map((arch) => (
          <li key={arch.slug}>
            <strong>{arch.name}</strong>: {arch.score.toFixed(2)}
          </li>
        ))}
      </ul>

      <PracticalApplications apps={primary.applications} />
      <PersonalizedInsights archetype={primary} />
      <LabelFeedback label={primary.slug} />
    </div>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { computeProfile, computeDimensionAverages } from "@/lib/scoring";
import { Archetype } from "@/lib/archetypes";
import DimensionRadar from "@/components/DimensionRadar";
import PracticalApplications from "@/components/PracticalApplications";
import PersonalizedInsights from "@/components/PersonalizedInsights";
import LabelFeedback from "@/components/LabelFeedback";

type ProfileItem = Archetype & { score: number; tier: string };

export default function Results() {
  const [dimData, setDimData] = useState<{ dimension: string; score: number }[]>([]);
  const [profile, setProfile] = useState<ProfileItem[] | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("answers") || "{}";
    const answers: Record<string, number> = JSON.parse(stored);

    // dimension data
    const dimAvgs = computeDimensionAverages(answers);
    setDimData(Object.entries(dimAvgs).map(([dimension, score]) => ({ dimension, score })));

    // archetype profile
    const rawProfile = computeProfile(answers);
    // assign tiers
    const SECONDARY = 0.6, SUPPORTING = 0.3;
    const tiered = rawProfile.map((a, i) => ({
      ...a,
      tier: i === 0
        ? "Primary"
        : a.score >= SECONDARY
          ? "Secondary"
          : a.score >= SUPPORTING
            ? "Supporting"
            : "Minor",
    }));
    setProfile(tiered);
  }, []);

  if (!profile) return <div>Loading your results…</div>;

  const primary = profile[0];
  const others = profile.slice(1);

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your P9 Profile</h2>
        <Link href="/questionnaire" className="text-sm text-blue-500 underline">
          Retake Test
        </Link>
      </div>

      {/* Dimensions */}
      <section>
        <h3 className="text-xl font-semibold mb-2">Dimension Scores</h3>
        <ul className="grid grid-cols-2 gap-3 mb-4 text-sm">
          {dimData.map((d) => (
            <li key={d.dimension}>
              <strong>{d.dimension}</strong>: {d.score.toFixed(2)}
            </li>
          ))}
        </ul>
        <div className="flex justify-center">
          <DimensionRadar data={dimData} />
        </div>
      </section>

      {/* Archetypes */}
      <section>
        <h3 className="text-xl font-semibold mb-2">Archetype Scores &amp; Tiers</h3>
        <ul className="space-y-2">
          {profile.map((a) => (
            <li key={a.slug} className="flex justify-between text-sm">
              <div>
                <span className="font-medium">{a.name}</span>{" "}
                <span className="text-gray-500">({a.tier})</span>
              </div>
              <div>{a.score.toFixed(2)}</div>
            </li>
          ))}
        </ul>
      </section>

      {/* Primary Details */}
      <section className="bg-blue-50 p-4 rounded shadow">
        <h3 className="text-xl font-semibold">{primary.name}</h3>
        <p className="mt-1 mb-2">Score: {primary.score.toFixed(2)}</p>
        <p className="mb-4">{primary.description}</p>
        <Link
          href={`/archetype/${primary.slug}`}
          className="inline-block bg-blue-500 text-white px-4 py-2 rounded"
        >
          Learn More
        </Link>
      </section>

      <PracticalApplications apps={primary.applications} />
      <PersonalizedInsights archetype={primary} />
      <LabelFeedback label={primary.slug} />
    </div>
  );
}

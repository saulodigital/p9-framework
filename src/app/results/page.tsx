"use client";

import { useEffect, useState } from "react";
import { archetypes, Archetype } from "@/lib/archetypes";
import { questions } from "../questionnaire/components/questions";
import LabelFeedback from "@/components/LabelFeedback";
import PersonalizedInsights from "@/components/PersonalizedInsights";

// Compute average scores per dimension
const calculateAverages = (answers: Record<string, number>) => {
  const dimensionScores: Record<string, number[]> = {};
  questions.forEach((q) => {
    let value = answers[q.id] ?? 0;
    if (q.reverse) value = 8 - value;
    if (!dimensionScores[q.dimension]) dimensionScores[q.dimension] = [];
    dimensionScores[q.dimension].push(value);
  });
  const averages: Record<string, number> = {};
  Object.entries(dimensionScores).forEach(([dim, vals]) => {
    averages[dim] = vals.reduce((sum, v) => sum + v, 0) / vals.length;
  });
  return averages;
};

export default function Results() {
  const [profile, setProfile] = useState<(Archetype & { score: number })[] | null>(null);

  useEffect(() => {
    const answers: Record<string, number> = JSON.parse(localStorage.getItem("answers") || "{}");
    const averages = calculateAverages(answers);

    // Define which dimensions feed each archetype score
    const dimensionMap: Record<string, string[]> = {
      visionary: ["Openness", "Extraversion", "Adaptability"],
      innovator: ["Openness", "Conscientiousness", "Adaptability"],
      commander: ["Extraversion", "Conscientiousness", "Adaptability"],
      influencer: ["Extraversion", "Agreeableness", "Adaptability"],
      strategist: ["Conscientiousness", "Openness", "Adaptability"],
      investigator: ["Openness", "Emotionality", "Conscientiousness"],
      mediator: ["Agreeableness", "Emotionality", "Adaptability"],
      guardian: ["Conscientiousness", "Emotionality", "Agreeableness"],
      integrator: ["Openness", "Extraversion", "Conscientiousness", "Agreeableness", "Emotionality", "Adaptability"],
    };

    // Attach scores to each archetype
    const scored = archetypes.map((arch) => {
      const dims = dimensionMap[arch.slug] || [];
      const score = dims.reduce((sum, d) => sum + (averages[d] || 0), 0) / dims.length;
      return { ...arch, score };
    });

    // Sort descending
    scored.sort((a, b) => b.score - a.score);
    setProfile(scored);
  }, []);

  if (!profile) {
    return <div>Loading your results...</div>;
  }

  const primary = profile[0];
  const others = profile.slice(1);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Primary Archetype</h2>

      <div className="bg-blue-50 p-4 rounded shadow">
        <h3 className="text-xl font-semibold">{primary.name}</h3>
        <p className="mb-4">Score: {primary.score.toFixed(1)}</p>
        <p className="mb-4">{primary.description}</p>
        <a
          href={`/archetype/${primary.slug}`}
          className="inline-block mt-3 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Explore more about {primary.name}
        </a>
      </div>

      <h3 className="text-xl font-bold mt-6">Other Archetypes</h3>
      <ul className="mt-3 space-y-2">
        {others.map((arch) => (
          <li key={arch.slug}>
            <strong>{arch.name}</strong>: {arch.score.toFixed(1)}
          </li>
        ))}
      </ul>

      <PersonalizedInsights archetype={primary} />
      <LabelFeedback label={primary.slug} />
    </div>
  );
}

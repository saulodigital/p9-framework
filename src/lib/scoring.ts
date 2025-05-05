import { questions } from "@/app/questionnaire/components/questions";
import { archetypes, Archetype } from "./archetypes";
import { Dimension } from "@/lib/archetypeCentroids";

// Center a 1–7 Likert to –3…+3
export function mapLikert(raw: number): number {
  return raw - 4;
}

export function computeDimensionAverages(
  answers: Record<string, number>
): Record<Dimension, number> {
  const buckets: Partial<Record<Dimension, number[]>> = {};

  questions.forEach((q) => {
    const dim = q.dimension as Dimension;
    let raw = answers[q.id] ?? 4;
    if (q.reverse) raw = 8 - raw;
    const score = mapLikert(raw);

    buckets[dim] = buckets[dim] ?? [];
    buckets[dim]!.push(score);
  });

  const averages = {} as Record<Dimension, number>;
  (Object.keys(buckets) as Dimension[]).forEach((dim) => {
    const vals = buckets[dim]!;
    averages[dim] = vals.reduce((a, b) => a + b, 0) / vals.length;
  });

  return averages;
}

export const archetypeDimensions: Record<Archetype["slug"], Dimension[]> = {
  visionary: ["Openness", "Extraversion", "Adaptability"],
  innovator: ["Openness", "Conscientiousness", "Adaptability"],
  commander: ["Extraversion", "Conscientiousness", "Adaptability"],
  influencer: ["Extraversion", "Agreeableness", "Adaptability"],
  strategist: ["Conscientiousness", "Openness", "Adaptability"],
  investigator: ["Openness", "Emotionality", "Conscientiousness"],
  mediator: ["Agreeableness", "Emotionality", "Adaptability"],
  guardian: ["Conscientiousness", "Emotionality", "Agreeableness"],
  integrator: [
    "Openness",
    "Extraversion",
    "Conscientiousness",
    "Agreeableness",
    "Emotionality",
    "Adaptability",
  ],
};

export function computeArchetypeScores(
  dimAvgs: Record<Dimension, number>
): Record<Archetype["slug"], number> {
  const scores = {} as Record<Archetype["slug"], number>;
  archetypes.forEach((arch) => {
    const dims = archetypeDimensions[arch.slug];
    const sum = dims.reduce((acc, d) => acc + (dimAvgs[d] ?? 0), 0);
    scores[arch.slug] = sum / dims.length;
  });
  return scores;
}

export function computeProfile(
  answers: Record<string, number>
): (Archetype & { score: number })[] {
  const dimAvgs = computeDimensionAverages(answers);
  const rawScores = computeArchetypeScores(dimAvgs);
  return archetypes
    .map((arch) => ({ ...arch, score: rawScores[arch.slug] ?? 0 }))
    .sort((a, b) => b.score - a.score);
}

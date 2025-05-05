// lib/scoring.ts
import { questions } from "@/app/questionnaire/components/questions";
import { archetypes, Archetype } from "./archetypes";
import { Dimension } from "@/lib/archetypeCentroids";

// 1–7 Likert → –3…+3
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
    (buckets[dim] ||= []).push(score);
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
  for (const arch of archetypes) {
    const dims = archetypeDimensions[arch.slug];
    const sum = dims.reduce((acc, d) => acc + (dimAvgs[d] ?? 0), 0);
    scores[arch.slug] = sum / dims.length;
  }
  return scores;
}

// --- TIEBREAKERS ---

// 1) Peak strength: max of its defining dims
function peakStrength(
  slug: Archetype["slug"],
  dimAvgs: Record<Dimension, number>
) {
  const dims = archetypeDimensions[slug];
  return Math.max(...dims.map((d) => dimAvgs[d] ?? 0));
}

// 2) Dimension consistency: negative variance across its dims
function consistencyScore(
  slug: Archetype["slug"],
  dimAvgs: Record<Dimension, number>
) {
  const dims = archetypeDimensions[slug];
  const vals = dims.map((d) => dimAvgs[d] ?? 0);
  const mean = vals.reduce((a, b) => a + b, 0) / vals.length;
  const variance =
    vals.reduce((sum, v) => sum + (v - mean) ** 2, 0) / vals.length;
  // lower variance is better, so invert
  return -variance;
}

// Main profile computation with robust sorting
export function computeProfile(
  answers: Record<string, number>
): (Archetype & { score: number })[] {
  const dimAvgs = computeDimensionAverages(answers);
  const rawScores = computeArchetypeScores(dimAvgs);

  return archetypes
    .map((arch) => ({
      ...arch,
      score: rawScores[arch.slug] ?? 0,
    }))
    .sort((a, b) => {
      // 1) primary mean score
      const diff = b.score - a.score;
      if (diff !== 0) return diff;

      // 2) tiebreak by peak dimension strength
      const peakDiff =
        peakStrength(b.slug, dimAvgs) - peakStrength(a.slug, dimAvgs);
      if (peakDiff !== 0) return peakDiff;

      // 3) final tiebreak by consistency (more consistent = higher)
      return (
        consistencyScore(b.slug, dimAvgs) - consistencyScore(a.slug, dimAvgs)
      );
    });
}

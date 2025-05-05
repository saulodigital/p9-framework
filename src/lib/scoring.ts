// lib/scoring.ts

import { questions } from "@/app/questionnaire/components/questions";
import { archetypes, Archetype } from "./archetypes";
import { Dimension } from "@/lib/archetypeCentroids";

/** 1. Map 1–7 Likert to –3…+3 */
export function mapLikert(raw: number): number {
  return raw - 4;
}

/** 2. Compute each HEXACO/Cognitive/Motivational/Adaptability dimension average. */
export function computeDimensionAverages(
  answers: Record<string, number>
): Record<Dimension, number> {
  const buckets: Partial<Record<Dimension, number[]>> = {};
  questions.forEach(q => {
    const dim = q.dimension as Dimension;
    let raw = answers[q.id] ?? 4;
    if (q.reverse) raw = 8 - raw;
    (buckets[dim] ||= []).push(mapLikert(raw));
  });
  const avgs: Record<Dimension, number> = {} as any;
  (Object.keys(buckets) as Dimension[]).forEach(dim => {
    const vals = buckets[dim]!;
    avgs[dim] = vals.reduce((a, b) => a + b, 0) / vals.length;
  });
  return avgs;
}

/** 3. Archetype → which dimensions define it */
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
    "Openness", "Extraversion", "Conscientiousness",
    "Agreeableness", "Emotionality", "Adaptability"
  ],
};

/** 4. Compute mean score per archetype */
export function computeArchetypeScores(
  dimAvgs: Record<Dimension, number>
): Record<string, number> {
  const scores: Record<string, number> = {};
  for (const arch of archetypes) {
    const dims = archetypeDimensions[arch.slug];
    scores[arch.slug] =
      dims.reduce((sum, d) => sum + (dimAvgs[d] ?? 0), 0) / dims.length;
  }
  return scores;
}

/** 5. Label thresholds (on the –3…+3 scale, i.e. –100…+100%) */
const T = {
  PRIMARY_MIN: 0.7,       // ≥ 70% of max possible
  MULTI_MIN: 0.50,        // 50–70% → Multifaceted
  SECONDARY_MIN: 0.30,    // ≥ 30% → Secondary/supporting
  DUALCORE_GAP: 0.15,     // top two within 15% → Dual-Core
};

/** 6. Full profile with scores & tiered labels */
export function computeProfile(
  answers: Record<string, number>
): Array<Archetype & { score: number; label: string; rank: number }> {
  const dimAvgs = computeDimensionAverages(answers);
  const raw = computeArchetypeScores(dimAvgs);
  // Build sorted list
  const list = archetypes
    .map(a => ({ ...a, score: raw[a.slug] ?? 0 }))
    .sort((a, b) => b.score - a.score);

  // Extract top three
  const [first, second, third] = list;
  const s1 = first.score, s2 = second.score, s3 = third.score;

  // Decide category
  let label: string;
  if (s1 >= T.PRIMARY_MIN) {
    // Primary clear winner
    label = first.name;
  } else if (
    // within DUALCORE_GAP → Dual-Core
    s1 - s2 <= T.DUALCORE_GAP &&
    s2 >= T.SECONDARY_MIN
  ) {
    label = `Dual-Core ${first.name}–${second.name}`;
  } else if (s1 >= T.MULTI_MIN && s2 >= T.SECONDARY_MIN) {
    // Multifaceted: a strong top and reasonable runner-up
    label = `Multifaceted ${first.name}`;
  } else if (s1 <= T.MULTI_MIN && s2 >= T.SECONDARY_MIN && s3 >= T.SECONDARY_MIN) {
    // Generalist: no strong peak, three comparable scores
    label = `Generalist ${first.name}–${second.name}–${third.name}`;
  } else {
    // Otherwise fall back to primary
    label = first.name;
  }

  // Attach label & rank
  return list.map((a, i) => ({
    ...a,
    rank: i + 1,
    label: i === 0 ? label : "",
  }));
}

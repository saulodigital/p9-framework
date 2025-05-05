// lib/scoring.ts

import { questions } from "@/app/questionnaire/components/questions";
import { archetypes, Archetype } from "./archetypes";
import { Dimension } from "@/lib/archetypeCentroids";

/** 1) Map 1–7 Likert → –3…+3 */
export function mapLikert(raw: number): number {
  return raw - 4;
}

/** 2) Dimension averages */
export function computeDimensionAverages(
  answers: Record<string, number>
): Record<Dimension, number> {
  const buckets: Partial<Record<Dimension, number[]>> = {};
  for (const q of questions) {
    const dim = q.dimension as Dimension;
    let raw = answers[q.id] ?? 4;
    if (q.reverse) raw = 8 - raw;
    (buckets[dim] ||= []).push(mapLikert(raw));
  }
  const avgs = {} as Record<Dimension, number>;
  for (const dim of Object.keys(buckets) as Dimension[]) {
    const vals = buckets[dim]!;
    avgs[dim] = vals.reduce((a, b) => a + b, 0) / vals.length;
  }
  return avgs;
}

/** 3) Archetype definition */
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
    "Agreeableness", "Emotionality", "Adaptability",
  ],
};

/** 4) Mean score per archetype */
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

/** 5) Thresholds on the –3…+3 scale */
const T = {
  PRIMARY_MIN: 0.7,     // ≥70 %
  MULTI_MIN: 0.50,      // 50–70 %
  SECONDARY_MIN: 0.30,  // ≥30 %
  DUALCORE_GAP: 0.15,   // ≤15 % gap
};

/** 6) Final profile + primaryLabel */
export interface ProfileItem extends Archetype {
  score: number;
  rank: number;
  primaryLabel?: string;
}

export function computeProfile(
  answers: Record<string, number>
): ProfileItem[] {
  const dimAvgs = computeDimensionAverages(answers);
  const raw = computeArchetypeScores(dimAvgs);

  // Sort by mean score descending
  const sorted = archetypes
    .map(a => ({ ...a, score: raw[a.slug] ?? 0 }))
    .sort((a, b) => b.score - a.score);

  const [first, second, third] = sorted;
  const s1 = first.score, s2 = second.score, s3 = third.score;

  // Decide the primary label
  let primaryLabel: string;
  if (s1 >= T.PRIMARY_MIN) {
    primaryLabel = first.name;
  } else if (s1 - s2 <= T.DUALCORE_GAP && s2 >= T.SECONDARY_MIN) {
    primaryLabel = `Dual-Core ${first.name}–${second.name}`;
  } else if (s1 >= T.MULTI_MIN && s2 >= T.SECONDARY_MIN) {
    primaryLabel = `Multifaceted ${first.name}`;
  } else if (s1 <= T.MULTI_MIN && s2 >= T.SECONDARY_MIN && s3 >= T.SECONDARY_MIN) {
    primaryLabel = `Generalist ${first.name}–${second.name}–${third.name}`;
  } else {
    primaryLabel = first.name;
  }

  // Attach rank & label only to the top archetype
  return sorted.map((a, i) => ({
    ...a,
    rank: i + 1,
    primaryLabel: i === 0 ? primaryLabel : undefined,
  }));
}

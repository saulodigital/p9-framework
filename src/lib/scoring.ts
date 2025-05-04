import { questions } from "@/app/questionnaire/components/questions";
import { archetypes, Archetype } from "./archetypes";

//
// 1. Map raw Likert –3...+3
//
export function mapLikert(raw: number): number {
  return raw - 4;
}

//
// 2. Compute per‐dimension averages (centered scores)
//
export function computeDimensionAverages(
  answers: Record<string, number>
): Record<string, number> {
  const buckets: Record<string, number[]> = {};

  questions.forEach((q) => {
    // Default to neutral (4) if missing
    let raw = answers[q.id] ?? 4;
    // Reverse‐score if needed
    if (q.reverse) raw = 8 - raw;
    const score = mapLikert(raw);

    if (!buckets[q.dimension]) buckets[q.dimension] = [];
    buckets[q.dimension].push(score);
  });

  const averages: Record<string, number> = {};
  for (const dim of Object.keys(buckets)) {
    const vals = buckets[dim]!;
    averages[dim] = vals.reduce((sum, v) => sum + v, 0) / vals.length;
  }
  return averages;
}

//
// 3. Define which dimensions feed each archetype
//
export const archetypeDimensions: Record<string, string[]> = {
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

//
// 4. Compute raw archetype scores (equal‐weighted sum of its dimensions)
//    You can replace equal‐weighting with PCA‐derived weights if available.
//
export function computeArchetypeScores(
  dimAvgs: Record<string, number>
): Record<string, number> {
  const scores: Record<string, number> = {};
  for (const arch of archetypes) {
    const dims = archetypeDimensions[arch.slug] || [];
    if (!dims.length) {
      scores[arch.slug] = 0;
      continue;
    }
    const sum = dims.reduce((acc, d) => acc + (dimAvgs[d] ?? 0), 0);
    scores[arch.slug] = sum / dims.length;  // equal‐weight average
  }
  return scores;
}

//
// 5. Full profile: map to Archetype objects and sort descending
//
export function computeProfile(
  answers: Record<string, number>
): (Archetype & { score: number })[] {
  const dimAvgs = computeDimensionAverages(answers);
  const rawScores = computeArchetypeScores(dimAvgs);

  const profile = archetypes.map((a) => ({
    ...a,
    score: rawScores[a.slug] ?? 0,
  }));
  // Sort highest‐first
  profile.sort((a, b) => b.score - a.score);
  return profile;
}

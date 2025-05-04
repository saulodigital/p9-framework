import { questions } from "@/app/questionnaire/components/questions";
import { archetypes, Archetype } from "./archetypes";

export function mapLikert(raw: number): number {
  return raw - 4;
}

export function computeDimensionAverages(
  answers: Record<string, number>
): Record<string, number> {
  const buckets: Record<string, number[]> = {};

  questions.forEach((q) => {
    let raw = answers[q.id] ?? 4;
    if (q.reverse) raw = 8 - raw;
    const score = mapLikert(raw);
    buckets[q.dimension] = buckets[q.dimension] || [];
    buckets[q.dimension].push(score);
  });

  const averages: Record<string, number> = {};
  for (const dim of Object.keys(buckets)) {
    const vals = buckets[dim]!;
    averages[dim] = vals.reduce((a, b) => a + b, 0) / vals.length;
  }
  return averages;
}

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

export function computeArchetypeScores(
  dimAvgs: Record<string, number>
): Record<string, number> {
  const scores: Record<string, number> = {};
  for (const arch of archetypes) {
    const dims = archetypeDimensions[arch.slug] || [];
    if (dims.length === 0) {
      scores[arch.slug] = 0;
    } else {
      const sum = dims.reduce((acc, d) => acc + (dimAvgs[d] ?? 0), 0);
      scores[arch.slug] = sum / dims.length;
    }
  }
  return scores;
}

export function computeProfile(
  answers: Record<string, number>
): (Archetype & { score: number })[] {
  const dimAvgs = computeDimensionAverages(answers);
  const rawScores = computeArchetypeScores(dimAvgs);
  const profile = archetypes.map((a) => ({
    ...a,
    score: rawScores[a.slug] ?? 0,
  }));
  profile.sort((a, b) => b.score - a.score);
  return profile;
}

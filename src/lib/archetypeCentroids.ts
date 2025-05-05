export type Dimension =
  | "Honesty-Humility"
  | "Emotionality"
  | "Extraversion"
  | "Agreeableness"
  | "Conscientiousness"
  | "Openness"
  | "Adaptability";

export interface Centroid {
  dimension: Dimension;
  [slug: string]: number | string;
}

// Percentile scores for each archetype (0–100)
export const archetypeCentroids: Record<string, Centroid[]> = {
  visionary: [
    { dimension: "Openness", visionary: 90 },
    { dimension: "Extraversion", visionary: 80 },
    { dimension: "Conscientiousness", visionary: 40 },
    { dimension: "Agreeableness", visionary: 50 },
    { dimension: "Emotionality", visionary: 45 },
    { dimension: "Adaptability", visionary: 75 },
  ],
  innovator: [
    { dimension: "Openness", innovator: 88 },
    { dimension: "Extraversion", innovator: 50 },
    { dimension: "Conscientiousness", innovator: 85 },
    { dimension: "Agreeableness", innovator: 45 },
    { dimension: "Emotionality", innovator: 40 },
    { dimension: "Adaptability", innovator: 70 },
  ],
  commander: [
    { dimension: "Openness", commander: 55 },
    { dimension: "Extraversion", commander: 90 },
    { dimension: "Conscientiousness", commander: 92 },
    { dimension: "Agreeableness", commander: 35 },
    { dimension: "Emotionality", commander: 30 },
    { dimension: "Adaptability", commander: 60 },
  ],
  influencer: [
    { dimension: "Openness", influencer: 65 },
    { dimension: "Extraversion", influencer: 88 },
    { dimension: "Conscientiousness", influencer: 50 },
    { dimension: "Agreeableness", influencer: 90 },
    { dimension: "Emotionality", influencer: 80 },
    { dimension: "Adaptability", influencer: 85 },
  ],
  strategist: [
    { dimension: "Openness", strategist: 70 },
    { dimension: "Extraversion", strategist: 45 },
    { dimension: "Conscientiousness", strategist: 95 },
    { dimension: "Agreeableness", strategist: 50 },
    { dimension: "Emotionality", strategist: 40 },
    { dimension: "Adaptability", strategist: 65 },
  ],
  investigator: [
    { dimension: "Openness", investigator: 92 },
    { dimension: "Extraversion", investigator: 30 },
    { dimension: "Conscientiousness", investigator: 75 },
    { dimension: "Agreeableness", investigator: 70 },
    { dimension: "Emotionality", investigator: 55 },
    { dimension: "Adaptability", investigator: 50 },
  ],
  mediator: [
    { dimension: "Openness", mediator: 60 },
    { dimension: "Extraversion", mediator: 55 },
    { dimension: "Conscientiousness", mediator: 65 },
    { dimension: "Agreeableness", mediator: 95 },
    { dimension: "Emotionality", mediator: 88 },
    { dimension: "Adaptability", mediator: 80 },
  ],
  guardian: [
    { dimension: "Openness", guardian: 45 },
    { dimension: "Extraversion", guardian: 40 },
    { dimension: "Conscientiousness", guardian: 98 },
    { dimension: "Agreeableness", guardian: 75 },
    { dimension: "Emotionality", guardian: 50 },
    { dimension: "Adaptability", guardian: 55 },
  ],
  integrator: [
    { dimension: "Openness", integrator: 65 },
    { dimension: "Extraversion", integrator: 65 },
    { dimension: "Conscientiousness", integrator: 65 },
    { dimension: "Agreeableness", integrator: 65 },
    { dimension: "Emotionality", integrator: 65 },
    { dimension: "Adaptability", integrator: 95 },
  ],
};

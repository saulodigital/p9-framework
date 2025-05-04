import React from "react";
import { Archetype } from "@/lib/archetypes";

interface InsightsProps {
  archetype: Archetype & { score?: number };
}

const PersonalizedInsights: React.FC<InsightsProps> = ({ archetype }) => {
  if (!archetype?.recommendations?.length) {
    return null;
  }
  return (
    <div className="mt-6 p-4 border rounded bg-green-50">
      <h4 className="text-xl font-semibold mb-2">Actionable Insights for You:</h4>
      <ul className="list-disc ml-6">
        {archetype.recommendations.map((rec, idx) => (
          <li key={idx} className="mb-1">
            {rec}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PersonalizedInsights;

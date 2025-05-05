import React from "react";

interface InsightsProps {
  recommendations: string[];
}

const PersonalizedInsights: React.FC<InsightsProps> = ({ recommendations }) => {
  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  return (
    <section
      className="mt-6 p-4 border rounded bg-green-50"
      aria-labelledby="insights-heading"
    >
      <h4 id="insights-heading" className="text-xl font-semibold mb-2">
        Actionable Insights for You:
      </h4>
      <ul className="list-disc ml-6">
        {recommendations.map((rec, idx) => (
          <li key={idx} className="mb-1">
            {rec}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PersonalizedInsights;

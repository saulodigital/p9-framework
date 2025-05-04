"use client";

import React, { useState } from "react";

interface LabelFeedbackProps {
  label: string;
}

const LabelFeedback: React.FC<LabelFeedbackProps> = ({ label }) => {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendFeedback = async (rating: 1 | 0) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/feedback/label", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label, rating }),
      });
      if (!res.ok) {
        throw new Error(`Server responded with status ${res.status}`);
      }
      setSubmitted(true);
    } catch (err: any) {
      console.error("Feedback submission error:", err);
      setError("Sorry, something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return <p className="mt-4 text-green-600">Thanks for your feedback!</p>;
  }

  return (
    <div className="mt-6 p-4 border rounded bg-gray-50">
      <p className="mb-2 font-medium">Was this label clear?</p>
      {error && <p className="mb-2 text-red-600">{error}</p>}
      <div className="flex space-x-4">
        <button
          onClick={() => sendFeedback(1)}
          disabled={isLoading}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          <span role="img" aria-label="yes" className="mr-2">
            👍
          </span>
          Yes
        </button>
        <button
          onClick={() => sendFeedback(0)}
          disabled={isLoading}
          className="flex items-center px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          <span role="img" aria-label="no" className="mr-2">
            👎
          </span>
          No
        </button>
      </div>
    </div>
  );
};

export default LabelFeedback;

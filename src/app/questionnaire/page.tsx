// app/questionnaire/page.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { track } from "@vercel/analytics";
import Question from "./components/Question";
import { questions } from "./components/questions";

export default function Questionnaire() {
  const router = useRouter();
  const total = questions.length;

  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAnswerChange = (id: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    const idx = questions.findIndex((q) => q.id === id);
    if (idx === currentIndex && currentIndex < total - 1) {
      setCurrentIndex((ci) => ci + 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(answers).length !== total) {
      alert("Please answer all questions before submitting.");
      return;
    }
    setIsSubmitting(true);

    // Save to localStorage + analytics
    try {
      localStorage.setItem("answers", JSON.stringify(answers));
      try {
        // fire-and-forget analytics; ignore errors
        track("Completed Questionnaire");
      } catch (e) {
        console.warn("Analytics track failed:", e);
      }
      router.push("/results");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Only questions up to current
  const visible = questions.slice(0, currentIndex + 1);

  const allAnswered = Object.keys(answers).length === total;

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Personality Assessment</h2>

      {/* Top bar: progress on left, submit on right */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-gray-600">
          Question {currentIndex + 1} of {total}
        </p>
        <button
          type="submit"
          disabled={!allAnswered || isSubmitting}
          className="px-4 py-2 rounded bg-blue-600 text-white disabled:bg-gray-300 disabled:text-gray-600 transition-opacity"
        >
          {isSubmitting ? "Submitting..." : "Submit Answers"}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {visible
          .slice()
          .reverse()
          .map((q, revIdx) => {
            const originalIdx = visible.length - 1 - revIdx;
            const isActive = originalIdx === currentIndex;

            return (
              <motion.div
                key={q.id}
                initial={{ y: isActive ? -10 : 0, opacity: isActive ? 1 : 0.6 }}
                animate={{ y: 0, opacity: isActive ? 1 : 0.5 }}
                exit={{ y: 10, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={isActive ? "mb-8" : "mb-4"}
              >
                <Question
                  id={q.id}
                  text={q.text}
                  value={answers[q.id] ?? 0}
                  onChange={handleAnswerChange}
                />
              </motion.div>
            );
          })}
      </AnimatePresence>
    </form>
  );
}

"use client";

import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { nanoid } from "nanoid";
import { track } from "@vercel/analytics";
import Question from "./components/Question";
import { questions } from "./components/questions";

const ANIM = { duration: 0.3 };
const STORAGE_ANS = "answers";
const STORAGE_IDX = "currentIndex";
const STORAGE_TEST = "testId";

export default function Questionnaire() {
  const router = useRouter();
  const total = questions.length;

  // Hydrate answers from localStorage
  const [answers, setAnswers] = useState<Record<string, number>>(() => {
    try {
      return JSON.parse(window.sessionStorage.getItem(STORAGE_ANS) || "{}");
    } catch {
      return {};
    }
  });

  // Hydrate currentIndex (clamp to [0, total-1])
  const [currentIndex, setCurrentIndex] = useState<number>(() => {
    const saved = parseInt(window.sessionStorage.getItem(STORAGE_IDX) || "", 10);
    if (!isNaN(saved) && saved >= 0 && saved < total) return saved;
    return 0;
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Whenever answers or index change, persist them
  useEffect(() => {
    window.sessionStorage.setItem(STORAGE_ANS, JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    window.sessionStorage.setItem(STORAGE_IDX, String(currentIndex));
  }, [currentIndex]);

  const handleAnswerChange = useCallback(
    (id: string, value: number) => {
      setAnswers((prev) => ({ ...prev, [id]: value }));
      const idx = questions.findIndex((q) => q.id === id);
      if (idx === currentIndex && currentIndex < total - 1) {
        setCurrentIndex(idx + 1);
      }
    },
    [currentIndex, total]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (Object.keys(answers).length !== total) {
        setFormError("Please answer all questions before submitting.");
        return;
      }
      setFormError(null);
      setIsSubmitting(true);

      try {
        // Generate and store testId once
        const testId = window.sessionStorage.getItem(STORAGE_TEST) || nanoid();
        window.sessionStorage.setItem(STORAGE_TEST, testId);

        // Analytics (fire-and-forget)
        try {
          track("Completed Questionnaire");
        } catch (err) {
          // Silently ignore analytics failures?
          console.warn("Analytics track failed:", err);
        }

        // Navigate to results
        router.push("/results");
      } finally {
        setIsSubmitting(false);
      }
    },
    [answers, router, total]
  );

  // Get only up to the current question
  const visible = questions.slice(0, currentIndex + 1);
  const allAnswered = Object.keys(answers).length === total;

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 max-w-2xl mx-auto"
      aria-invalid={!!formError}
    >
      <h2 className="text-2xl font-bold mb-4">P9 Assessment</h2>

      {/* Progress & Submit */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-gray-600" aria-live="polite">
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

      {/* Validation Error */}
      {formError && (
        <p className="mb-4 text-red-600" role="alert">
          {formError}
        </p>
      )}

      {/* Questions */}
      <AnimatePresence initial={false}>
        {visible
          .slice()
          .reverse()
          .map((q, revIdx) => {
            const idx = visible.length - 1 - revIdx;
            const isActive = idx === currentIndex;
            return (
              <motion.div
                key={q.id}
                initial={{ y: isActive ? -10 : 0, opacity: isActive ? 1 : 0.6 }}
                animate={{ y: 0, opacity: isActive ? 1 : 0.5 }}
                exit={{ y: 10, opacity: 0 }}
                transition={ANIM}
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

// app/questionnaire/components/Question.tsx
"use client";

import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";

export interface QuestionProps {
  id: string;
  text: string;
  value: number;
  onChange: (id: string, value: number) => void;
}

const ticks = [
  { value: 1, label: "Strongly Disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Slightly Disagree" },
  { value: 4, label: "Neutral" },
  { value: 5, label: "Slightly Agree" },
  { value: 6, label: "Agree" },
  { value: 7, label: "Strongly Agree" },
];

export default function Question({
  id,
  text,
  value,
  onChange,
}: QuestionProps) {
  return (
    <div className="mb-8">
      <label htmlFor={id} className="block mb-2 font-medium">
        {text}
      </label>

      <RadioGroup
        id={id}
        value={String(value)}
        onValueChange={(val) => onChange(id, Number(val))}
        className="grid grid-cols-7 gap-4"
        aria-label={text}
      >
        {ticks.map((t) => (
          <div key={t.value} className="flex flex-col items-center">
            <RadioGroupItem value={String(t.value)} />
            <span className="sr-only">{t.label}</span>
          </div>
        ))}
      </RadioGroup>

      {/* Descriptive labels */}
      <div className="mt-2 grid grid-cols-7 justify-items-center text-[9px] text-gray-500">
        {ticks.map((t) => (
          <div key={t.value} className="whitespace-nowrap">
            {t.label}
          </div>
        ))}
      </div>
    </div>
  );
}

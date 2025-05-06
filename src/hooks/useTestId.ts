"use client";

import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

export function useTestId(): string {
  const [ testId, setTestId ] = useState<string>("");

  useEffect(() => {
    // On mount, only once
    let id = window.localStorage.getItem("testId");
    if (!id) {
      id = nanoid();
      window.localStorage.setItem("testId", id);
    }
    setTestId(id);
  }, []);

  return testId;
};

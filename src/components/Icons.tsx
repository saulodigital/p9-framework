import React from "react";

export const ArchetypeIcon: Record<string, React.ReactNode> = {
  visionary: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      className="w-12 h-12"
    >
      <circle cx="32" cy="32" r="30" fill="#4F46E5" />
      <path
        d="M32 16v32M16 32h32"
        stroke="#FFF"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  ),
  innovator: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      className="w-12 h-12"
    >
      <rect x="12" y="12" width="40" height="40" fill="#059669" />
      <path
        d="M12 32h40M32 12v40"
        stroke="#FFF"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  ),
  commander: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      className="w-12 h-12"
    >
      <polygon
        points="32,8 8,56 56,56"
        fill="#DC2626"
      />
    </svg>
  ),
  influencer: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      className="w-12 h-12"
    >
      <circle cx="32" cy="24" r="12" fill="#F59E0B" />
      <path
        d="M16 56c0-8 16-8 16-8s16 0 16 8"
        fill="#FBBF24"
      />
    </svg>
  ),
  strategist: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      className="w-12 h-12"
    >
      <rect x="24" y="8" width="16" height="48" fill="#2563EB" />
      <path
        d="M8 32h48"
        stroke="#FFF"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  ),
  investigator: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      className="w-12 h-12"
    >
      <circle cx="32" cy="32" r="24" fill="#10B981" />
      <path
        d="M32 16v32M16 32h16"
        stroke="#FFF"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  ),
  mediator: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      className="w-12 h-12"
    >
      <path
        d="M8 32h48M32 8v48"
        stroke="#6366F1"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  ),
  guardian: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      className="w-12 h-12"
    >
      <rect x="16" y="16" width="32" height="32" fill="#EF4444" />
    </svg>
  ),
  integrator: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      className="w-12 h-12"
    >
      <circle cx="32" cy="32" r="30" fill="#8B5CF6" />
      <circle cx="32" cy="32" r="16" fill="#C084FC" />
    </svg>
  ),
};

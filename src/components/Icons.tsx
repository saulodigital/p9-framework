import React from "react";

export const Logomark = (props) => (
  <svg
    className="logomark darkmode"
    width="100%"
    height="100%"
    viewBox="0 0 189 256"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g stroke="#fff" strokeWidth="10" strokeLinejoin="round">
      <path d="M115.446 94.3634V251H5V94.3634C5 45.0429 45.0416 5 94.3621 5C143.683 5 183.726 45.0429 183.726 94.3634V182.72H73.2796V94.3634C73.2796 82.7266 82.7266 73.2796 94.3621 73.2796C105.999 73.2796 115.446 82.7266 115.446 94.3634Z"/>
      <path d="M149.585 94.3629V216.859H39.1392V94.3629C39.1392 63.8847 63.8834 39.1396 94.3617 39.1396C124.84 39.1396 149.585 63.8847 149.585 94.3629Z"/>
    </g>
  </svg>
)

export const LogomarkLightmode = (props) => (
  <svg
    className="logomark lightmode"
    width="100%"
    height="100%"
    viewBox="0 0 190 256"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g stroke="#000" strokeWidth="12" strokeLinejoin="round">
      <path d="M115.548 94.6369V250H6V94.6369C6 45.7173 45.716 6 94.6356 6C143.555 6 183.272 45.7173 183.272 94.6369V182.276H73.7244V94.6369C73.7244 83.0946 83.0947 73.7245 94.6356 73.7245C106.178 73.7245 115.548 83.0946 115.548 94.6369Z" />
      <path d="M149.41 94.6366V216.137H39.8617V94.6366C39.8617 64.4061 64.4048 39.8623 94.6353 39.8623C124.866 39.8623 149.41 64.4061 149.41 94.6366Z"/>
    </g>
  </svg>
)

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

/**
 * Line icons on a 24px grid, stroked with currentColor. sparkles, workflow and
 * layers come from the Figma mockup; server and cloud are drawn to match.
 * Inline on purpose: five paths do not justify an icon package.
 */
const PATHS = {
  sparkles:
    'M20 2v2m0 0v2m0-2h2m-2 0h-2M11.02 2.82a1 1 0 0 1 1.96 0l1.05 5.55a2 2 0 0 0 1.6 1.6l5.55 1.05a1 1 0 0 1 0 1.96l-5.55 1.05a2 2 0 0 0-1.6 1.6l-1.05 5.55a1 1 0 0 1-1.96 0l-1.05-5.55a2 2 0 0 0-1.6-1.6l-5.55-1.05a1 1 0 0 1 0-1.96l5.55-1.05a2 2 0 0 0 1.6-1.6zM6 20a2 2 0 1 1-4 0 2 2 0 0 1 4 0',
  workflow:
    'M7 11v4a2 2 0 0 0 2 2h4m-6-6h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2zm6 6v2a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2z',
  layers:
    'M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z',
  server:
    'M4 2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m0 12h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2M6 6h.01M6 18h.01',
  cloud: 'M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9',
}

export default function Icon({ name, className = 'h-6 w-6' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={PATHS[name]} />
    </svg>
  )
}

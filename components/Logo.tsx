/** Placeholder wordmark — replace with the real logo in /public/logo when available. */
export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className={`logo${inverted ? " logo-inverted" : ""}`}>
      <svg viewBox="0 0 40 32" width="40" height="32" aria-hidden="true">
        <path d="M2 30 L15 8 L22 19 L27 12 L38 30 Z" fill="currentColor" className="logo-peak" />
        <path d="M15 8 L18.5 14 L16 13 L13.5 15 Z" fill="#faf7f0" opacity=".9" />
      </svg>
      <span className="logo-text">
        <strong>ZENITH</strong>
        <small>Plumbing · Drain · Sewer · HVAC</small>
      </span>
    </span>
  );
}

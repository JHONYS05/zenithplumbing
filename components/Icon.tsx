const paths: Record<string, React.ReactNode> = {
  wrench: <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4 2.5-2.5z" />,
  drain: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="2" />
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
    </>
  ),
  pipe: <path d="M3 7h8a3 3 0 0 1 3 3v4a3 3 0 0 0 3 3h4M3 4v6M21 14v6" />,
  flame: <path d="M12 3c1 4 5 5.5 5 10a5 5 0 0 1-10 0c0-2.5 1.5-3.5 2-5 .8 1.5 1.5 2 2.5 2C11 7.5 11 5 12 3z" />,
  fan: (
    <>
      <circle cx="12" cy="12" r="1.5" />
      <path d="M12 10.5C12 6 13 3 15.5 3S18 6 12 10.5zM13.5 12c4.5 0 7.5 1 7.5 3.5S18 18 13.5 12zM12 13.5c0 4.5-1 7.5-3.5 7.5S6 18 12 13.5zM10.5 12C6 12 3 11 3 8.5S6 6 10.5 12z" />
    </>
  ),
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  pin: (
    <>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
};

export function Icon({ name, size = 24, className }: { name: string; size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name] ?? paths.wrench}
    </svg>
  );
}

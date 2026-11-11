/** Renders text typed in the admin: blank lines start a new paragraph, single line breaks are kept. */
export function Paragraphs({ text }: { text: string }) {
  const paras = text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  return (
    <>
      {paras.map((p, i) => (
        <p key={i} className="pre-line">
          {p}
        </p>
      ))}
    </>
  );
}

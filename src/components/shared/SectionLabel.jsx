// Small numbered/kicker label used above section headlines, e.g. "02 — Services".
export default function SectionLabel({ number, children }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      {number && <span className="label-eyebrow">{number}</span>}
      <span className="h-px w-10 bg-gold/60" aria-hidden="true" />
      <span className="label-eyebrow">{children}</span>
    </div>
  );
}

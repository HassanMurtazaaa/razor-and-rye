// Fixed, full-viewport subtle noise texture sitting above all content.
export default function GrainOverlay() {
  return (
    <div
      className="grain-texture pointer-events-none fixed inset-0 z-[90] opacity-[0.035]"
      aria-hidden="true"
    />
  );
}

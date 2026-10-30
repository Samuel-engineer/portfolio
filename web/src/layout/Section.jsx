/**
 * The single source of truth for section chrome, so spacing and rhythm stay in
 * sync. Sections are full width on the page background (no panel): the cards
 * inside carry the surfaces.
 *
 * `Section` is the frame (anchor id, vertical rhythm, reveal). `SectionHeading`
 * is the "01 / About" label, title and optional lead. They are separate so a
 * section can place its heading in a column next to other content.
 */
export default function Section({ id, children, className = '' }) {
  return (
    <section id={id} className={`py-12 sm:py-14 lg:py-16 ${className}`}>
      {children}
    </section>
  )
}

export function SectionHeading({ index, label, title, lead, className = '' }) {
  return (
    <div className={`reveal ${className}`}>
      <p className="eyebrow">
        {index} / {label}
      </p>
      <h2 className="mt-4 text-display sm:mt-6">{title}</h2>
      {lead && <p className="mt-4 max-w-[60ch] text-mute">{lead}</p>}
    </div>
  )
}

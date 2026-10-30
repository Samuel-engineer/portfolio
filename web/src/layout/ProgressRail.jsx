/**
 * Vertical scroll rail with one marker per section, shown from `xl`.
 *
 * Deliberately label-free: the page container is 1540px wide with a 64px
 * gutter, so a labelled rail would sit on top of the content column at common
 * desktop widths. The section names are already in the header nav; below `xl`
 * the hairline under the header carries the same progress.
 */
export default function ProgressRail({ sections, active }) {
  const last = Math.max(sections.length - 1, 1)

  return (
    <div className="fixed left-5 top-1/2 z-30 hidden -translate-y-1/2 xl:block" aria-hidden="true">
      <div className="relative h-48 w-px bg-white/15">
        <div className="rail-fill absolute inset-0 origin-top bg-gradient-to-b from-leaf via-sky to-amber" />

        {sections.map((section, i) => (
          <span
            key={section.id}
            style={{ top: `${(i / last) * 100}%` }}
            className={`absolute -left-[2.5px] -mt-[3px] h-1.5 w-1.5 rounded-full transition-all duration-300 ${
              active === section.id ? 'scale-[1.8] bg-leaf' : 'bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

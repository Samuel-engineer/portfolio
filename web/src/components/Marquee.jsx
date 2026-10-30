/**
 * Infinite tech strip. The track holds the list twice and the CSS animation
 * translates it by exactly -50%, so the loop is seamless.
 *
 * Spacing lives in the items (padding), never in a flex `gap`: a gap would make
 * the two copies differ by half a gap and the loop would visibly jump.
 */
export default function Marquee({ items }) {
  const doubled = [...items, ...items]

  return (
    <div className="marquee-mask reveal overflow-hidden border-y border-sky/16 py-3.5">
      <div className="marquee-track" aria-hidden="true">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center whitespace-nowrap text-sm text-mute">
            {item}
            <span className="px-5 text-leaf/40">◆</span>
          </span>
        ))}
      </div>
      <p className="sr-only">Toolbox: {items.join(', ')}.</p>
    </div>
  )
}

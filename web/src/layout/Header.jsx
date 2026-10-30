import { profile } from '../data.js'
import { CONTAINER } from './container.js'

/**
 * Sticky top bar. Doubles as the scroll progress indicator below `xl`, where
 * there is no room for the vertical rail.
 */
export default function Header({ sections, active }) {
  return (
    <header className="sticky top-0 z-40 border-b border-sky/16 bg-space/70 backdrop-blur-xl">
      <div className={`${CONTAINER} flex h-16 items-center justify-between gap-3 sm:h-[5.5rem]`}>
        <a href="#top" className="group flex min-w-0 items-center gap-2">
          <span
            className="h-2 w-2 flex-none rounded-full bg-leaf shadow-[0_0_14px_2px] shadow-leaf/60"
            aria-hidden="true"
          />
          <span className="truncate font-serif text-lg font-semibold sm:text-xl">{profile.name}</span>
        </a>

        <nav aria-label="Main" className="flex flex-none items-center gap-0.5 sm:gap-6">
          {sections.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? 'true' : undefined}
              className={`relative px-2 py-1.5 text-[0.8125rem] transition-colors after:absolute after:inset-x-2 after:bottom-0.5 after:h-px after:origin-left after:bg-leaf after:transition-transform after:duration-300 hover:text-leaf sm:px-3 sm:text-[0.9375rem] ${
                active === id ? 'text-leaf after:scale-x-100' : 'text-mute after:scale-x-0 hover:after:scale-x-100'
              }`}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>

      {/* Scroll progress: driven by useScrollScene, hidden where the rail shows. */}
      <div className="absolute inset-x-0 bottom-0 h-px overflow-hidden xl:hidden" aria-hidden="true">
        <div className="bar-fill h-full w-full origin-left bg-gradient-to-r from-leaf via-sky to-amber" />
      </div>
    </header>
  )
}

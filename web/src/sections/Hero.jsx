import GlobeStage from '../features/globe/GlobeStage.jsx'
import { profile } from '../data.js'

// `role` is authored as a single "A · B · C" line in data.js: the first part is
// the job title shown in the pill.
const [headline] = profile.role.split('·').map((s) => s.trim())

const ARROW_DOWN = (
  <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
    <path d="M8 3v10m-4-4 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const links = [
  { href: profile.github, label: 'GitHub' },
  { href: profile.linkedin, label: 'LinkedIn' },
]

/**
 * Two columns from `lg` (message left, globe right), with a footer line pinned
 * to the bottom of the first screen. Below `lg` the globe is a backdrop.
 */
export default function Hero() {
  return (
    <section className="hero relative isolate flex min-h-[min(88dvh,52rem)] flex-col pt-24 pb-8 lg:min-h-[min(calc(100dvh-5.5rem),60rem)] lg:pt-0">
      <div className="grid flex-1 items-center gap-8 lg:grid-cols-2">
        <div className="hero-text max-w-[40rem]">
          <p className="hero-eyebrow inline-flex items-center gap-2 rounded-full border border-sky/16 bg-sky/4 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em]">
            <span className="h-1.5 w-1.5 rounded-full bg-leaf" aria-hidden="true" />
            {headline}
          </p>

          <h1 className="hero-title mt-8 text-hero pb-2">{profile.name}</h1>

          <p className="hero-sub mt-4 max-w-[36rem] text-lead">{profile.tagline}</p>
          <p className="hero-sub mt-6 max-w-[40rem] text-mute">{profile.intro}</p>

          <div className="hero-sub mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href="#projects"
              className="group inline-flex h-12 items-center gap-4 rounded-xl bg-leaf px-6 font-semibold text-void transition-transform duration-300 hover:scale-[1.03]"
            >
              Explore projects
              <span className="transition-transform duration-300 group-hover:translate-y-0.5">{ARROW_DOWN}</span>
            </a>
            {links.map(({ href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex h-12 items-center gap-2 font-medium text-sky transition-colors hover:text-leaf"
              >
                {label}
                <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </div>

        <GlobeStage />
      </div>

      <div className="hero-sub mt-10 flex items-center justify-between gap-4 text-xs text-mute">
        <p className="flex items-center gap-2">
          <span aria-hidden="true" className="h-1 w-1 rounded-full bg-leaf" />
          {profile.motto}
        </p>
        <p className="hidden items-center gap-2 uppercase tracking-[0.12em] sm:flex">
          Scroll to explore
          <span className="nudge" aria-hidden="true">↓</span>
        </p>
      </div>
    </section>
  )
}

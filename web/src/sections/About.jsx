import Section, { SectionHeading } from '../layout/Section.jsx'
import { profile, places, principles } from '../data.js'

export default function About() {
  return (
    <Section id="about">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)]">
        <SectionHeading index="01" label="About" title={profile.aboutTitle} />

        <div className="reveal space-y-6 text-mute">
          <p className="text-lead">{profile.aboutLead}</p>
          {profile.about.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}

          {/* Ties the prose back to the arcs drawn on the globe. */}
          <ol className="flex flex-wrap items-center gap-2 pt-2 text-sm" aria-label="Journey">
            {places.map((place, i) => (
              <li key={place.label} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden="true" className="text-leaf/50">→</span>}
                <span className="chip">{place.label}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <ul className="mt-12 grid gap-6 sm:grid-cols-3 sm:gap-8">
        {principles.map((p) => (
          <li key={p.title} className="reveal border-t border-sky/16 pt-4">
            <p className="flex items-center gap-2 font-medium text-ink">
              <span aria-hidden="true" className="h-1 w-1 flex-none rounded-full bg-leaf" />
              {p.title}
            </p>
            <p className="mt-2 text-[0.8125rem] text-mute">{p.text}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}

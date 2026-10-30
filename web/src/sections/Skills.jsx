import Section, { SectionHeading } from '../layout/Section.jsx'
import AgentsMap from '../features/AgentsMap.jsx'
import Icon from '../components/Icon.jsx'
import { skills } from '../data.js'

/**
 * Heading and agent map side by side from `lg`, then one capability card per
 * domain on a 6-column track: the first three span 2 columns, the last two
 * span 3, so five cards still fill two even rows.
 */
export default function Skills() {
  return (
    <Section id="skills">
      <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <SectionHeading
          index="02"
          label="Skills"
          title="A connected stack, not a collection of tools."
          lead={`${skills.length} disciplines, one continuous path from idea to operation. Like agents around an orchestrator, each has its specialty and they exchange messages.`}
        />
        <div className="reveal">
          <AgentsMap />
        </div>
      </div>

      <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-6 lg:gap-8">
        {skills.map((s, i) => (
          <li
            key={s.group}
            className={`card reveal flex flex-col gap-6 p-6 transition-colors duration-300 hover:border-leaf/35 sm:p-8 ${
              i < 3 ? 'lg:col-span-2' : 'lg:col-span-3'
            } ${i === skills.length - 1 && skills.length % 2 ? 'md:col-span-2' : ''}`}
          >
            <div className="flex items-center justify-between text-leaf">
              <Icon name={s.icon} />
              <span className="text-[0.8125rem] text-mute">{String(i + 1).padStart(2, '0')}</span>
            </div>

            <div className="space-y-4">
              <h3 className="text-card">{s.group}</h3>
              <p className="font-medium leading-snug">{s.tagline}</p>
              <p className="text-mute">{s.desc}</p>
            </div>

            <ul className="mt-auto flex flex-wrap gap-2" aria-label={`${s.group} tools`}>
              {s.items.map((item) => (
                <li key={item} className="chip">{item}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Section>
  )
}

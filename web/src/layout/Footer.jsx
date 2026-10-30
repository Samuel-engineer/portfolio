import { profile } from '../data.js'
import { CONTAINER } from './container.js'

const links = [
  { href: profile.linkedin, label: "Let's compare notes on LinkedIn" },
  { href: profile.github, label: 'See the code on GitHub' },
]

// "AI/ML Engineer · GenAI · …": the specialties, without the job title.
const specialties = profile.role.split('·').slice(1).map((s) => s.trim()).join(' · ')

/** Closing invitation and page footer, full width on the darkest background. */
export default function Footer() {
  return (
    <footer className="relative z-10 mt-12 bg-void pb-28 pt-16 sm:pb-8 lg:pt-20">
      <div className={CONTAINER}>
        <div className="reveal grid items-center gap-8 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Next / A conversation</p>
            <p className="mt-6 font-serif text-closing font-semibold text-balance">
              Let's build something that cooperates.
            </p>
          </div>

          <div className="space-y-6">
            <p className="text-mute">
              Have a thoughtful AI problem in mind? I'd love to talk about what it could become, and what it needs
              to work in the real world.
            </p>
            <ul className="space-y-3">
              {links.map(({ href, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group inline-flex items-center gap-2 font-medium text-leaf transition-colors hover:text-ink"
                  >
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-leaf" />
                    {label}
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    >
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-sky/16 pt-6 text-[0.8125rem] sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 font-serif text-xl font-semibold">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-leaf" />
            {profile.name}
          </p>
          <p className="text-mute">{specialties}</p>
          <a href="#top" className="inline-flex items-center gap-2 text-sky transition-colors hover:text-leaf">
            Back to top
            <span aria-hidden="true">↑</span>
          </a>
        </div>

        <p className="mt-6 text-xs text-white/30">React · GSAP · WebGL globe · deployed on AWS with CDK.</p>
      </div>
    </footer>
  )
}

import Section, { SectionHeading } from '../layout/Section.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import { projects, achievements } from '../data.js'

export default function Projects() {
  return (
    <Section id="projects">
      <SectionHeading
        index="03"
        label="Projects & achievements"
        title="Systems I've been building."
        lead="Work-study, internship and personal projects at the intersection of intelligence, cooperation and reliability."
      />

      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:gap-8">
        {projects.map((project, i) => (
          <ProjectCard key={project.name} project={project} index={i} featured={i === 0} />
        ))}
      </div>

      <h3 className="reveal eyebrow mt-16">Achievements</h3>
      <ul className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((achievement) => (
          <li key={achievement} className="reveal flex gap-2.5 border-t border-sky/16 pt-4 text-sm text-ink/85">
            <span aria-hidden="true" className="flex-none text-leaf">✦</span>
            {achievement}
          </li>
        ))}
      </ul>
    </Section>
  )
}

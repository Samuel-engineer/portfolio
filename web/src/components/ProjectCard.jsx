import { useSpotlight } from '../hooks/useSpotlight.js'

const ARROW = (
  <svg viewBox="0 0 12 12" className="h-3 w-3 flex-none text-sky/70" aria-hidden="true">
    <path d="M2.5 6h7M6.5 3l3 3-3 3" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/** Shared object: hub on top, distributed to three roles, with a note. */
function Diagram({ diagram }) {
  return (
    <figure className="sketch flex flex-col items-center gap-5 sm:gap-6">
      <figcaption className="flex w-full items-center justify-between">
        <span className="sketch-label">{diagram.caption}</span>
        <span aria-hidden="true" className="h-1 w-1 rounded-full bg-leaf" />
      </figcaption>

      <p className="sketch-box w-full max-w-[15rem] bg-sky/4 px-4 py-3 text-sky">{diagram.hub}</p>

      {/* Connector: one stem from the hub, a bar, one drop per role. The bar
          ends at the centre of the outer columns, hence the calc on the gap. */}
      <div className="relative -my-5 h-6 w-full sm:-my-6" aria-hidden="true">
        <span className="absolute left-1/2 top-0 h-3 w-px bg-sky/30" />
        <span
          className="absolute top-3 h-px bg-sky/30"
          style={{ left: 'calc((100% - 2rem) / 6)', right: 'calc((100% - 2rem) / 6)' }}
        />
        <div className="absolute inset-x-0 top-3 grid grid-cols-3 gap-4">
          {diagram.nodes.map((n) => <span key={n} className="mx-auto block h-3 w-px bg-sky/30" />)}
        </div>
      </div>

      <ul className="grid w-full grid-cols-3 gap-4">
        {diagram.nodes.map((n) => (
          <li key={n} className="sketch-box min-h-16 flex-col gap-2 px-2 py-4">
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-leaf" />
            {n}
          </li>
        ))}
      </ul>

      <p className="flex items-center gap-2 text-[0.8125rem] text-mute">
        <svg viewBox="0 0 12 12" className="h-3 w-3 flex-none text-leaf" aria-hidden="true">
          <path d="M10 3 4.5 8.5 2 6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {diagram.note}
      </p>
    </figure>
  )
}

/** Three steps in a row; the last one is the outcome, in green. */
function Flow({ flow }) {
  return (
    <figure className="sketch space-y-4">
      <figcaption className="sketch-label">{flow.caption}</figcaption>
      <ol className="flex items-center gap-2">
        {flow.steps.map((step, i) => (
          <li key={step} className="flex min-w-0 flex-1 items-center gap-2">
            <span
              className={`sketch-box min-h-12 w-full min-w-0 px-2 py-2 ${
                i === flow.steps.length - 1 ? 'text-leaf' : 'text-mute'
              }`}
            >
              {step}
            </span>
            {i < flow.steps.length - 1 && ARROW}
          </li>
        ))}
      </ol>
    </figure>
  )
}

export default function ProjectCard({ project, index, featured = false }) {
  const onPointerMove = useSpotlight()

  const narrative = (
    <div className="flex min-w-0 flex-col gap-6">
      <p className="eyebrow">Project / {String(index + 1).padStart(2, '0')}</p>

      <div className="space-y-4">
        <h3 className={featured ? 'text-feature' : 'text-card'}>
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-start gap-1 underline decoration-leaf/40 underline-offset-4 hover:decoration-leaf"
            >
              {project.name}
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
            </a>
          ) : (
            project.name
          )}
        </h3>
        {project.kind && <p className="font-medium">{project.kind}</p>}
        <p className="text-mute">{project.desc}</p>
      </div>

      {!featured && project.flow && <Flow flow={project.flow} />}

      {project.question && <p className="text-[0.8125rem] text-sky">{project.question}</p>}

      <ul className="flex flex-wrap gap-2" aria-label="Stack">
        {project.tags.map((tag) => (
          <li key={tag} className="chip">{tag}</li>
        ))}
      </ul>
    </div>
  )

  return (
    <article
      onPointerMove={onPointerMove}
      className={`card spotlight reveal group transition duration-300 hover:-translate-y-1 hover:border-leaf/40 ${
        featured
          ? 'grid items-center gap-8 p-6 sm:p-8 md:col-span-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,34.5rem)] lg:gap-16 lg:p-10'
          : 'flex flex-col p-6 sm:p-8'
      }`}
    >
      {narrative}
      {featured && project.diagram && <Diagram diagram={project.diagram} />}
    </article>
  )
}

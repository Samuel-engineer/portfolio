import Globe from './Globe.jsx'

/**
 * Places the globe inside the hero: the only file that knows *where* the globe
 * lives, while Globe.jsx knows only *how* it renders.
 *
 * Below `lg`: a dimmed backdrop at the top of the hero, behind the text (there
 * is no room for a second column on a phone, and the text has to stay
 * readable). From `lg`: the right-hand column of the hero, with its caption.
 * It scrolls away with the hero instead of following the whole page.
 */
export default function GlobeStage() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 flex justify-center opacity-40 lg:static lg:z-0 lg:flex-col lg:items-center lg:opacity-100">
      <div className="globe-in w-[min(123vw,480px)] lg:w-[min(100%,600px)]">
        <div className="globe-scroll relative">
          <div className="globe-halo" aria-hidden="true" />
          <Globe />
        </div>
      </div>

      <p className="mt-2 hidden items-center gap-2 text-xs uppercase tracking-[0.12em] text-mute lg:flex">
        <span aria-hidden="true" className="h-1 w-1 rounded-full bg-amber" />
        Many coordinates. One connected world.
      </p>
    </div>
  )
}

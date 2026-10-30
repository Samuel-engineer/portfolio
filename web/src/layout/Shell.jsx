import Header from './Header.jsx'
import Footer from './Footer.jsx'
import ProgressRail from './ProgressRail.jsx'
import Starfield from '../features/Starfield.jsx'
import { CONTAINER } from './container.js'

/**
 * Page frame: one full-width column. The globe lives inside the hero
 * (sections/Hero.jsx → GlobeStage), so the sections below get the whole width.
 */
export default function Shell({ sections, active, children }) {
  return (
    <>
      <div className="aurora" aria-hidden="true" />
      <Starfield />

      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-void focus:px-4 focus:py-2"
      >
        Skip to content
      </a>

      <Header sections={sections} active={active} />
      <ProgressRail sections={sections} active={active} />

      <main id="top" className={`relative z-10 ${CONTAINER}`}>{children}</main>
      <Footer />
    </>
  )
}

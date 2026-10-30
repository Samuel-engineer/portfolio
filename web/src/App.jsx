import { useCallback, useRef, useState } from 'react'
import Shell from './layout/Shell.jsx'
import Hero from './sections/Hero.jsx'
import About from './sections/About.jsx'
import Skills from './sections/Skills.jsx'
import Projects from './sections/Projects.jsx'
import Marquee from './components/Marquee.jsx'
import Beacon from './components/Beacon.jsx'
import Constellation from './features/Constellation.jsx'
import { useSmoothScroll } from './hooks/useSmoothScroll.js'
import { useActiveSection } from './hooks/useActiveSection.js'
import { useIntro } from './hooks/useIntro.js'
import { useReveal } from './hooks/useReveal.js'
import { useScrollScene } from './hooks/useScrollScene.js'
import { skills } from './data.js'

const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
]

const SECTION_IDS = SECTIONS.map((s) => s.id)
const TOOLBOX = skills.flatMap((group) => group.items)

/**
 * Composition root: layout frame, sections, and the scroll/motion hooks scoped
 * to this subtree. All animation lives in ./hooks, all content in ./data.js.
 */
export default function App() {
  const scope = useRef(null)
  const [mapOpen, setMapOpen] = useState(false)
  const { stop, start } = useSmoothScroll()
  const active = useActiveSection(SECTION_IDS)

  useIntro(scope)
  useReveal(scope)
  useScrollScene(scope)

  // The page behind the star map is frozen. Stable callbacks, so the dialog's
  // own effects never re-run because of a new function identity.
  const openMap = useCallback(() => { stop(); setMapOpen(true) }, [stop])
  const closeMap = useCallback(() => { start(); setMapOpen(false) }, [start])

  return (
    <div ref={scope}>
      <Shell sections={SECTIONS} active={active}>
        <Hero />
        <Marquee items={TOOLBOX} />

        <About />
        <Skills />
        <Projects />
      </Shell>

      <Beacon onOpen={openMap} />
      {mapOpen && <Constellation onClose={closeMap} />}
    </div>
  )
}

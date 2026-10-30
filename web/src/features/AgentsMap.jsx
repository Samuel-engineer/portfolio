import { useLayoutEffect, useMemo, useRef } from 'react'
import { gsap, MQ } from '../lib/motion.js'
import { useMediaQuery } from '../hooks/useMediaQuery.js'
import { skills } from '../data.js'

/**
 * Two geometries for the same diagram. On a phone the previous single geometry
 * rendered 14px labels inside a 600-unit viewBox, i.e. ~8px on screen: the
 * compact variant trades orbit radius for node size and tightens the viewBox,
 * so labels stay legible instead of just scaling down.
 */
const GEOMETRY = {
  wide: { viewBox: '0 0 600 400', rx: 230, ry: 140, hub: 45, hubFont: 14, node: 34, nodeFont: 14 },
  compact: { viewBox: '56 14 488 372', rx: 185, ry: 118, hub: 58, hubFont: 17, node: 52, nodeFont: 21 },
}

const CENTER = { x: 300, y: 200 }

const nodesFor = (g) =>
  skills.map((group, i) => {
    const angle = (i / skills.length) * Math.PI * 2 - Math.PI / 2
    return {
      ...group,
      x: CENTER.x + g.rx * Math.cos(angle),
      y: CENTER.y + g.ry * Math.sin(angle),
    }
  })

/** Skills as a multi-agent system: one orchestrator, specialised agents, messages in flight. */
export default function AgentsMap() {
  const ref = useRef(null)
  const compact = useMediaQuery('(max-width: 639px)')
  const g = compact ? GEOMETRY.compact : GEOMETRY.wide
  const nodes = useMemo(() => nodesFor(g), [g])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add(MQ.motion, () => {
        const scrollTrigger = { trigger: ref.current, start: 'top 85%', end: 'center 55%', scrub: true }

        gsap.from('.wire', { strokeDashoffset: 1, stagger: 0.2, ease: 'none', scrollTrigger })
        gsap.from('.node', { scale: 0, opacity: 0, stagger: 0.18, ease: 'back.out(2)', scrollTrigger })
        gsap.to('.ring', {
          rotation: 360,
          svgOrigin: `${CENTER.x} ${CENTER.y}`,
          duration: 80,
          repeat: -1,
          ease: 'none',
        })

        // Message packets travelling out to each agent and back.
        nodes.forEach((n, i) =>
          gsap.fromTo(
            `.pk${i}`,
            { attr: { cx: CENTER.x, cy: CENTER.y } },
            {
              attr: { cx: n.x, cy: n.y },
              duration: 2,
              delay: i * 0.5,
              repeat: -1,
              yoyo: true,
              repeatDelay: 0.6,
              ease: 'power1.inOut',
            },
          ),
        )
      })

      return () => mm.kill()
    }, ref)

    return () => ctx.revert()
  }, [nodes])

  return (
    <svg
      ref={ref}
      viewBox={g.viewBox}
      className="mx-auto w-full max-w-2xl"
      aria-hidden="true"
    >
      <ellipse
        className="ring"
        cx={CENTER.x}
        cy={CENTER.y}
        rx={g.rx}
        ry={g.ry}
        fill="none"
        stroke="#6fb6ff"
        strokeOpacity=".25"
        strokeDasharray="4 8"
      />

      {nodes.map((n, i) => (
        <line key={`w${i}`} className="wire" pathLength="1" x1={CENTER.x} y1={CENTER.y} x2={n.x} y2={n.y} />
      ))}

      {nodes.map((n, i) => (
        <circle key={`p${i}`} className={`pk${i}`} r={compact ? 6 : 4} cx={CENTER.x} cy={CENTER.y} fill="#ffb454" />
      ))}

      <g className="node">
        <circle cx={CENTER.x} cy={CENTER.y} r={g.hub} fill="#0a1226" stroke="#6bd08a" strokeWidth="2" />
        <text
          x={CENTER.x}
          y={CENTER.y + g.hubFont * 0.36}
          textAnchor="middle"
          fill="#6bd08a"
          fontSize={g.hubFont}
        >
          Orchestrator
        </text>
      </g>

      {nodes.map((n) => (
        <g key={n.group} className="node">
          <circle cx={n.x} cy={n.y} r={g.node} fill="#0a1226" stroke="#6fb6ff" strokeWidth="1.5" />
          <text x={n.x} y={n.y + g.nodeFont * 0.36} textAnchor="middle" fill="#e9f0ea" fontSize={g.nodeFont}>
            {n.group}
          </text>
        </g>
      ))}
    </svg>
  )
}

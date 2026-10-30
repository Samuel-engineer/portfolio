import { useEffect, useRef } from 'react'

const DENSITY = 1 / 9000 // stars per CSS pixel of viewport area

/**
 * Canvas 2D starfield: three depth layers with scroll-linked parallax, plus the
 * occasional shooting star. One canvas, one RAF loop, no DOM per star.
 *
 * Static (single paint, no parallax) under reduced motion.
 */
export default function Starfield() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches

    let w = 0
    let h = 0
    let stars = []
    let shot = null
    let raf

    const build = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2)
      w = innerWidth
      h = innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.round(Math.min(Math.max(w * h * DENSITY, 70), 240))
      stars = Array.from({ length: count }, () => {
        const z = Math.random() * 0.8 + 0.2 // depth: drives size, speed, twinkle
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          z,
          r: z * 1.4,
          phase: Math.random() * 6.28,
          speed: Math.random() * 0.003 + 0.001,
        }
      })
    }

    const spawnShot = () => {
      const fromLeft = Math.random() > 0.35
      shot = {
        x: fromLeft ? -40 : w * Math.random(),
        y: Math.random() * h * 0.55,
        vx: (fromLeft ? 1 : -1) * (7 + Math.random() * 4),
        vy: 2.4 + Math.random() * 1.6,
        life: 1,
      }
    }

    const draw = (t = 0) => {
      ctx.clearRect(0, 0, w, h)
      const sy = still ? 0 : scrollY

      for (const s of stars) {
        // Wrap vertically so parallax never runs out of sky.
        const y = (((s.y - sy * s.z * 0.35) % h) + h) % h
        const alpha = still ? 0.7 : 0.4 + 0.5 * Math.sin(t * s.speed + s.phase)
        ctx.fillStyle = `rgba(232,240,255,${alpha})`
        ctx.beginPath()
        ctx.arc(s.x, y, s.r, 0, 6.283)
        ctx.fill()
      }

      if (!still) {
        if (!shot && Math.random() < 0.0022) spawnShot()
        if (shot) {
          shot.x += shot.vx
          shot.y += shot.vy
          shot.life -= 0.012
          const tail = 16
          const grad = ctx.createLinearGradient(
            shot.x, shot.y,
            shot.x - shot.vx * tail * 0.25, shot.y - shot.vy * tail * 0.25,
          )
          grad.addColorStop(0, `rgba(255,255,255,${Math.max(shot.life, 0)})`)
          grad.addColorStop(1, 'rgba(255,255,255,0)')
          ctx.strokeStyle = grad
          ctx.lineWidth = 1.4
          ctx.lineCap = 'round'
          ctx.beginPath()
          ctx.moveTo(shot.x, shot.y)
          ctx.lineTo(shot.x - shot.vx * tail * 0.25, shot.y - shot.vy * tail * 0.25)
          ctx.stroke()
          if (shot.life <= 0 || shot.x < -80 || shot.x > w + 80 || shot.y > h + 80) shot = null
        }
        raf = requestAnimationFrame(draw)
      }
    }

    // Mobile browsers fire `resize` when the URL bar collapses; rebuilding on
    // that would make every star jump mid-scroll.
    const onResize = () => {
      if (innerWidth === w && Math.abs(innerHeight - h) < 140) return
      build()
      if (still) draw()
    }

    build()
    draw()
    addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      removeEventListener('resize', onResize)
    }
  }, [])

  return <canvas ref={ref} className="pointer-events-none fixed inset-0 -z-20 h-full w-full" aria-hidden="true" />
}

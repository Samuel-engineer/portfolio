import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

/** Shared easing / duration vocabulary so motion feels like one system. */
export const EASE = {
  out: 'power3.out',
  expo: 'expo.out',
  back: 'back.out(1.7)',
  elastic: 'elastic.out(1, 0.4)',
}

export const DUR = { fast: 0.45, base: 0.8, slow: 1.6 }

/** Media queries used by gsap.matchMedia(). Everything motion-related is
 *  gated on `no-preference`, so reduced-motion visitors get a static page. */
export const MQ = {
  motion: '(prefers-reduced-motion: no-preference)',
  motionUp: '(prefers-reduced-motion: no-preference) and (min-width: 1024px)',
  motionDown: '(prefers-reduced-motion: no-preference) and (max-width: 1023px)',
  fine: '(pointer: fine)',
}

export const prefersStill = () => matchMedia('(prefers-reduced-motion: reduce)').matches

export { gsap, ScrollTrigger, SplitText }

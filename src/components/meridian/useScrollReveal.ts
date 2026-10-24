import { useEffect, type RefObject } from 'react'

const revealTargets = [
  '.mb-section-heading',
  '.mb-comparisons > article',
  '.mb-steps > article',
  '.mb-travel',
  '.mb-screening-card',
  '.mb-package-introduction',
  '.mb-screening-package',
  '.mb-pricing-card',
  '.mb-provider-cards > article',
  '.mb-expectations',
  '.mb-contact > .mb-contact-copy',
].join(', ')

export function useScrollReveal(root: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const element = root.current
    if (!element || !('IntersectionObserver' in window) || !('animate' in HTMLElement.prototype)) return
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const animations = new Set<Animation>()
    const visited = new WeakSet<Element>()
    const targets = Array.from(element.querySelectorAll<HTMLElement>(revealTargets))

    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting || visited.has(entry.target)) continue
        visited.add(entry.target)
        observer.unobserve(entry.target)
        const target = entry.target as HTMLElement
        target.dataset.revealed = 'true'
        if (motion.matches || target.contains(document.activeElement)) continue
        const animation = target.animate(
          [{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'translateY(0)' }],
          { duration: 560, easing: 'cubic-bezier(.22, 1, .36, 1)' },
        )
        animations.add(animation)
        animation.finished.then(() => animations.delete(animation), () => animations.delete(animation))
      }
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' })

    function finishAnimations() {
      for (const animation of animations) animation.finish()
      animations.clear()
    }
    function revealFocused(event: FocusEvent) {
      if (!(event.target instanceof Node)) return
      for (const target of targets) {
        if (!target.contains(event.target)) continue
        observer.unobserve(target)
        visited.add(target)
        target.dataset.revealed = 'true'
        for (const animation of target.getAnimations()) animation.finish()
      }
    }
    function updateMotion() {
      finishAnimations()
      observer.disconnect()
      if (!motion.matches) {
        for (const target of targets) if (!visited.has(target)) observer.observe(target)
      }
    }

    for (const target of targets) {
      if (target.getBoundingClientRect().top < window.innerHeight || motion.matches) {
        target.dataset.revealed = 'true'
        visited.add(target)
      } else {
        observer.observe(target)
      }
    }
    motion.addEventListener('change', updateMotion)
    element.addEventListener('focusin', revealFocused)
    window.addEventListener('hashchange', finishAnimations)
    return () => {
      observer.disconnect()
      for (const animation of animations) animation.cancel()
      motion.removeEventListener('change', updateMotion)
      element.removeEventListener('focusin', revealFocused)
      window.removeEventListener('hashchange', finishAnimations)
    }
  }, [root])
}

import { Children, useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from 'react'
import { Button } from '../ui/Button'

type RailState = { active: number; overflow: boolean; height: number | undefined }
type MobileCardRailProps = {
  children: ReactNode
  className: string
  label: string
  name: 'comparisons' | 'packages'
}

function RailChevron({ direction }: { direction: 'previous' | 'next' }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d={direction === 'next' ? 'M6 3.5L10.5 8L6 12.5' : 'M10 3.5L5.5 8L10 12.5'} stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function MobileCardRail({ children, className, label, name }: MobileCardRailProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const trackId = useId()
  const hintId = `${trackId}-hint`
  const count = Children.count(children)
  const [state, setState] = useState<RailState>({ active: 0, overflow: false, height: undefined })

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const mobile = window.matchMedia('(max-width: 760px)')
    let frame = 0
    const cards = Array.from(track.children).filter((child): child is HTMLElement => child instanceof HTMLElement)
    function measure() {
      frame = 0
      if (!track) return
      if (track.scrollTop !== 0) track.scrollTop = 0
      const overflow = mobile.matches && track.scrollWidth > track.clientWidth + 1
      let active = 0
      let height: number | undefined
      if (overflow && cards.length) {
        const left = track.getBoundingClientRect().left
        let distance = Infinity
        for (let index = 0; index < cards.length; index++) {
          const difference = Math.abs(cards[index].getBoundingClientRect().left - left)
          if (difference < distance) {
            distance = difference
            active = index
          }
        }
        if (track.scrollLeft >= track.scrollWidth - track.clientWidth - 2) active = cards.length - 1
        height = Math.ceil(cards[active].getBoundingClientRect().height) + 12
      }
      setState(previous => previous.active === active && previous.overflow === overflow && previous.height === height
        ? previous : { active, overflow, height })
    }
    function schedule() {
      if (!frame) frame = window.requestAnimationFrame(measure)
    }
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(schedule)
    observer?.observe(track)
    cards.forEach(card => observer?.observe(card))
    track.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    mobile.addEventListener('change', schedule)
    measure()
    return () => {
      window.cancelAnimationFrame(frame)
      observer?.disconnect()
      track.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      mobile.removeEventListener('change', schedule)
    }
  }, [count])

  function moveTo(index: number) {
    const track = trackRef.current
    const target = track?.children[Math.max(0, Math.min(count - 1, index))]
    if (!track || !(target instanceof HTMLElement)) return
    const left = target.getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    track.scrollTo({
      left: Math.max(0, Math.min(left, track.scrollWidth - track.clientWidth)),
      behavior: reducedMotion ? 'auto' : 'smooth',
    })
  }

  function handleKey(event: KeyboardEvent<HTMLDivElement>) {
    if (!state.overflow || event.target !== event.currentTarget) return
    const destination = {
      ArrowLeft: state.active - 1,
      ArrowRight: state.active + 1,
      Home: 0,
      End: count - 1,
    }[event.key]
    if (destination === undefined) return
    event.preventDefault()
    moveTo(destination)
  }

  return (
    <div className={`mb-card-rail mb-card-rail-${name}`} role="region" aria-label={label} data-card-rail={name}>
      <p id={hintId} className="mb-rail-instructions">Swipe horizontally, use the position control, or focus the cards and use the left and right arrow keys.</p>
      <div className="mb-card-rail-viewport">
        <div ref={trackRef} id={trackId} className={`${className} mb-card-rail-track`}
          role="group" aria-label={`${label} cards`}
          aria-describedby={state.overflow ? hintId : undefined}
          tabIndex={state.overflow ? 0 : undefined}
          onKeyDown={handleKey}
          style={state.overflow && state.height ? { height: state.height } : undefined}>
          {children}
        </div>
        {state.overflow && (
          <>
            <Button className="mb-rail-arrow mb-rail-arrow-previous" hidden={state.active === 0} aria-label={`Previous ${label.toLowerCase()} card`}
              aria-controls={trackId} onClick={() => moveTo(state.active - 1)}><RailChevron direction="previous" /></Button>
            <Button className="mb-rail-arrow mb-rail-arrow-next" hidden={state.active === count - 1} aria-label={`Next ${label.toLowerCase()} card`}
              aria-controls={trackId} onClick={() => moveTo(state.active + 1)}><RailChevron direction="next" /></Button>
          </>
        )}
      </div>
      <div className="mb-rail-controls" hidden={!state.overflow}>
        <input className="mb-rail-position" type="range" min="0" max={Math.max(0, count - 1)} step="1"
          value={state.active} aria-label={`Position in ${label.toLowerCase()}`}
          aria-valuetext={`${state.active + 1} of ${count}`} aria-controls={trackId}
          onChange={event => moveTo(Number(event.currentTarget.value))}
          style={{ '--mb-rail-thumb-width': `${100 / Math.max(1, count)}%` } as CSSProperties} />
        <span className="mb-rail-counter" aria-live="polite" aria-atomic="true">{state.active + 1} / {count}</span>
      </div>
    </div>
  )
}

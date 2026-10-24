import { useId, useState } from 'react'
import { Button } from '../ui/Button'
import { Icon } from './Shared'
import { screeningPackages, type ScreeningPackage } from './screeningPackageData'
import { MobileCardRail } from './MobileCardRail'

function ScreeningPackageCard({ screeningPackage }: { screeningPackage: ScreeningPackage }) {
  const [expanded, setExpanded] = useState(false)
  const id = useId()
  const headingId = `${id}-heading`
  const detailsId = `${id}-details`
  return (
    <article
      className={`mb-screening-package${screeningPackage.popular ? ' mb-screening-package-popular' : ''}`}
      data-package={screeningPackage.id}
      aria-labelledby={headingId}
      onKeyDown={event => {
        if (event.key === 'Escape' && expanded) {
          setExpanded(false)
          event.currentTarget.querySelector('button')?.focus()
        }
      }}>
      <div className="mb-package-badge-slot">
        {screeningPackage.popular && <span className="mb-package-badge">Most popular</span>}
      </div>
      <div className="mb-package-overview">
        <h4 id={headingId}>{screeningPackage.title}</h4>
        <p className="mb-package-price"><span>From approximately</span><strong>{screeningPackage.price}</strong></p>
        <p className="mb-package-summary">{screeningPackage.summary}</p>
      </div>
      <div className="mb-package-details" id={detailsId} hidden={!expanded}>
        <ul>
          {screeningPackage.inclusions.map(inclusion => (
            <li key={inclusion}><Icon name={screeningPackage.checkIcon} /><span>{inclusion}</span></li>
          ))}
        </ul>
        <p>{screeningPackage.description}</p>
      </div>
      <Button
        className="mb-package-toggle"
        aria-expanded={expanded}
        aria-controls={detailsId}
        aria-label={`${expanded ? 'Read less' : 'Read more'} about ${screeningPackage.title}`}
        onClick={() => setExpanded(value => !value)}>
        {expanded ? 'Read less' : 'Read more'}
      </Button>
    </article>
  )
}

export function ScreeningPackages() {
  const headingId = useId()
  return (
    <section className="mb-package-options" aria-labelledby={headingId}>
      <div className="mb-package-introduction">
        <h3 id={headingId}>Screening package options</h3>
        <p>Different providers offer different packages. Typical options include:</p>
      </div>
      <MobileCardRail name="packages" className="mb-package-grid" label="Screening packages">
        {screeningPackages.map(screeningPackage => <ScreeningPackageCard key={screeningPackage.id} screeningPackage={screeningPackage} />)}
      </MobileCardRail>
      <p className="mb-package-note">Package contents and prices vary by provider. These are illustrative options, not a personalized medical recommendation. Confirm test suitability with a qualified clinician and request a quote before booking. Meridian Bridge’s facilitation fee is separate.</p>
    </section>
  )
}

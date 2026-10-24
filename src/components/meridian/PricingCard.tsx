import { useId, useState } from 'react'
import { Button } from '../ui/Button'
import { Icon } from './Shared'
import { countries, type CountryCode } from './design'

const feeInclusions = [
  'Provider and package research',
  'Booking coordination',
  'Pre-trip preparation',
  'Payment and practical guidance',
  'In-trip logistical support',
  'Results and follow-up coordination',
]

export function PricingCard({ scenario, country }: { scenario: 'travelling' | 'already-going'; country: CountryCode }) {
  const [feeExpanded, setFeeExpanded] = useState(false)
  const home = countries.find(({ code }) => code === country) ?? countries[0]
  const panelId = useId()
  const headingId = `${panelId}-heading`
  const alreadyGoing = scenario === 'already-going'
  return (
    <article className={`mb-pricing-card${feeExpanded ? ' mb-pricing-card-expanded' : ''}`}
      id={alreadyGoing ? 'pricing-already-going' : undefined} data-scenario={scenario} aria-labelledby={headingId}
      onKeyDown={event => { if (event.key === 'Escape') setFeeExpanded(false) }}>
      <h3 id={headingId}>{alreadyGoing ? 'I’m already going to China' : 'I’m travelling to China specifically for the health screening'}</h3>
      {alreadyGoing && <p className="mb-pricing-subtitle">(add the screening to my trip)</p>}
      <dl>
        <div><dt>Health screening package</dt><dd>$300 – $1,000 USD</dd></div>
      </dl>
      <div className="mb-fee">
        {!feeExpanded && <div className="mb-fee-price"><p>Meridian Bridge fee</p><strong>$400 USD</strong></div>}
        <Button className="mb-fee-toggle" aria-expanded={feeExpanded} aria-controls={panelId}
          aria-label={`What does the $400 Meridian Bridge fee include? ${alreadyGoing ? 'Already going to China' : 'Travelling for screening'}`}
          onClick={() => setFeeExpanded(expanded => !expanded)}>
          <span className="mb-fee-toggle-icon" aria-hidden="true">
            <span className="mb-fee-icon-default"><Icon name="59113.svg" /></span>
            <span className="mb-fee-icon-hover"><Icon name="902e8.svg" /></span>
          </span>
          What does this fee include?
        </Button>
      </div>
      <div className="mb-fee-card-content">
        <section id={panelId} className="mb-facilitation-panel" hidden={!feeExpanded} aria-label="$400 USD facilitation fee inclusions">
          <div className="mb-facilitation-heading">
            <p>Meridian Bridge</p>
            <h4>$400 USD</h4>
            <strong>Flat facilitation fee</strong>
          </div>
          <ul>{feeInclusions.map(inclusion => <li key={inclusion}><span aria-hidden="true">✓</span>{inclusion}</li>)}</ul>
        </section>
        {!feeExpanded && (
          <>
            {!alreadyGoing && <dl className="mb-travel-costs">
              <div><dt>Flights (from {home.name}, est.)</dt><dd>{home.flights}</dd></div>
              <div><dt>Accommodation (2–3 nights)</dt><dd>~$300 – $600 USD</dd></div>
              <div><dt>Local transport & meals</dt><dd>~$100 – $300 USD</dd></div>
            </dl>}
            <div className="mb-total">
              <span>{alreadyGoing ? 'Screening + facilitation fee' : 'Planning your total'}</span>
              <strong>{alreadyGoing ? '$700 – $1,400 USD' : 'Request a personalized quote'}</strong>
            </div>
          </>
        )}
      </div>
      <p className="mb-pricing-note">{alreadyGoing
        ? 'Includes the illustrative screening package and $400 USD facilitation fee only. Existing travel costs and any extra tests or services are not included. Confirm your personalized quote before booking.'
        : home.currency === 'USD'
          ? 'Amounts are illustrative, not a quote. All amounts are shown in USD. Provider prices, travel costs, and availability may change.'
          : `Amounts are illustrative, not a quote. Flights are shown in ${home.currency}; other items are in USD. Convert all costs to one currency using current exchange rates before adding them. Provider prices, travel costs, and availability may change.`}</p>
    </article>
  )
}

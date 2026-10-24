import type { MouseEvent } from 'react'
import { ActionLink, ContentDialog, CountrySelect, FeatureGrid, Icon, SectionHeading } from './Shared'
import { asset, comparisons, countries, expectations, processSteps, providers, screeningTests, type CountryCode } from './design'
import { ScreeningPackages } from './ScreeningPackages'
import { MobileCardRail } from './MobileCardRail'
import { FounderStory } from './FounderStory'

function CountryCell({ home, wait, cost }: { home?: string; wait: string; cost: string }) {
  return (
    <div className={`mb-country${home ? ' mb-country-home' : ''}`}>
      <strong aria-live={home ? 'polite' : undefined}>{home ? `In ${home}` : 'In China'}</strong>
      <p className="mb-country-label"><Icon name={home ? 'e69fe.svg' : '6b9ed.svg'} />Wait time</p>
      <p>{wait}</p>
      <hr />
      <p className="mb-country-label"><Icon name={home ? '11c05.svg' : '3436b.svg'} />Cost</p>
      <p>{cost}</p>
    </div>
  )
}

type CountryProps = { country: CountryCode; onCountryChange: (country: CountryCode) => void }

export function WhyChina({ country, onCountryChange }: CountryProps) {
  const homeName = countries.find(({ code }) => code === country)?.name ?? 'Canada'
  return (
    <section id="why-china" className="mb-section mb-why">
      <SectionHeading title="Why China is becoming the destination?" aside={<CountrySelect country={country} onChange={onCountryChange} />}>
        Shorter wait times, more accessible pricing, and access to comprehensive screening.
      </SectionHeading>
      <MobileCardRail name="comparisons" className="mb-comparisons" label="Treatment comparisons">
        {comparisons.map((item, index) => (
          <article key={item.title}>
            <h3><Icon name={item.icon} />{item.title}</h3>
            <div className={`mb-comparison-body mb-comparison-${index}`}>
              <div className="mb-comparison-image"><img src={asset(item.image)} alt={item.imageAlt} width={item.imageWidth} height={item.imageHeight} loading="lazy" decoding="async" /></div>
              <CountryCell wait="Typically 1 – 7 days" cost="From ~$100 USD (¥700+)" />
              <CountryCell home={homeName} {...item.home[country]} />
            </div>
          </article>
        ))}
      </MobileCardRail>
      <p className="mb-footnote">* Prices and wait times are approximate and may vary by provider and location. China pricing reflects private clinic rates in major cities.</p>
    </section>
  )
}

function showAlreadyGoingPricing(event: MouseEvent<HTMLAnchorElement>) {
  const card = document.getElementById('pricing-already-going')
  if (!card) return
  event.preventDefault()
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  card.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'center' })
  history.replaceState(null, '', '#pricing')
  if (reducedMotion) return
  let done = false
  function pulse() {
    if (done || !card) return
    done = true
    window.removeEventListener('scrollend', pulse)
    card.animate(
      [{ transform: 'scale(1)' }, { transform: 'scale(1.035)', offset: .4 }, { transform: 'scale(1)' }],
      { duration: 900, easing: 'cubic-bezier(.22, 1, .36, 1)' },
    )
  }
  window.addEventListener('scrollend', pulse, { once: true })
  window.setTimeout(pulse, 1100)
}

export function HowItWorks() {
  return (
    <section id="how-it-works" className="mb-section mb-process">
      <SectionHeading title="How it works">A clear, straightforward process from first question to follow-up.</SectionHeading>
      <div className="mb-steps">
        {processSteps.map(([number, title, text]) => (
          <article key={number}>
            <span className="mb-step-number">{number}</span>
            <div className="mb-step-copy"><h3>{title}</h3><p>{text}</p></div>
          </article>
        ))}
        <article className="mb-meet-gordon">
          <img src={asset('gordon-zhang.jpeg')} alt="Gordon Zhang, founder of Meridian Bridge" width="800" height="800" loading="lazy" />
          <div className="mb-step-copy">
            <p className="mb-meet-question">Who will I be speaking to?</p>
            <h3>Meet Gordon</h3>
            <p>Your consultation is with Gordon Zhang, our founder. He has personally vetted our partner hospitals and has been through the screening himself.</p>
            <ContentDialog title="Gordon, the Founder" label="Read Gordon’s story" icon="e1e40.svg">
              <FounderStory />
              <ActionLink>Book a Free Consultation</ActionLink>
            </ContentDialog>
          </div>
        </article>
      </div>
      <div className="mb-travel">
        <div>
          <h2>Already going to China?</h2>
          <p className="mb-travel-subtitle">Make the screening part of your trip</p>
          <p>Many screening packages can be completed in a <strong>single morning,</strong> making it easy to include a full health check during a family visit, business trip or vacation.</p>
          <ActionLink href="#pricing" variant="mb-action-sand" icon="efa88.svg" onClick={showAlreadyGoingPricing}>Add a screening to your trip</ActionLink>
        </div>
        <img src={asset('145ea.png')} alt="Traditional Chinese pavilion and gardens beside a lake" loading="lazy" />
      </div>
    </section>
  )
}

export function HealthScreening() {
  return (
    <section id="screening" className="mb-section mb-screening">
      <SectionHeading title="What is a complete health check?" />
      <div className="mb-screening-layout">
        <article className="mb-screening-card">
          <h3>What can it include?</h3>
          <p>Tests vary by provider and package, but can include (and are not limited to):</p>
          <ul>{screeningTests.map(([icon, text]) => <li key={text}><Icon name={icon} /><span>{text}</span></li>)}</ul>
        </article>
        <ScreeningPackages />
      </div>
    </section>
  )
}

export function ProviderNetwork() {
  return (
    <section id="providers" className="mb-section mb-providers">
      <SectionHeading title="Our provider network">
        A thoughtfully curated network of established hospitals and healthcare providers in Guangdong.
      </SectionHeading>
      <div className="mb-provider-cards">
        {providers.map(([image, title, text]) => (
          <article key={title}><img src={asset(image)} alt={title} loading="lazy" /><div><h3>{title}</h3><p>{text}</p></div></article>
        ))}
      </div>
      <div className="mb-expectations"><h3>What you can expect</h3><FeatureGrid items={expectations} /></div>
    </section>
  )
}

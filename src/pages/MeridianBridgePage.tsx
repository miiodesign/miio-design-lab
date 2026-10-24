import { useRef, useState } from 'react'
import { SiteHeader, Hero, PatientContext } from '../components/meridian/HeaderHero'
import { WhyChina, HowItWorks, HealthScreening, ProviderNetwork } from '../components/meridian/CareSections'
import { PricingSection } from '../components/meridian/PricingSection'
import { AboutAndQuestions, SiteFooter } from '../components/meridian/AboutContact'
import { useScrollReveal } from '../components/meridian/useScrollReveal'
import type { CountryCode } from '../components/meridian/design'
import './MeridianBridge.css'
import './MeridianEditorial.css'
import './ScreeningPackages.css'
import './MobileCardRail.css'

export function MeridianBridgePage() {
  const pageRef = useRef<HTMLDivElement>(null)
  const [country, setCountry] = useState<CountryCode>('CA')
  useScrollReveal(pageRef)
  return (
    <div className="meridian" ref={pageRef}>
      <a className="mb-skip-link" href="#meridian-main">Skip to content</a>
      <SiteHeader />
      <main id="meridian-main">
        <Hero />
        <WhyChina country={country} onCountryChange={setCountry} />
        <PatientContext />
        <HowItWorks />
        <HealthScreening />
        <PricingSection country={country} onCountryChange={setCountry} />
        <ProviderNetwork />
        <AboutAndQuestions />
      </main>
      <SiteFooter />
    </div>
  )
}

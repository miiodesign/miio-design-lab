import { useId, useRef, type MouseEvent, type ReactNode } from 'react'
import { Button } from '../ui/Button'
import { asset, consultationUrl, countries, type CountryCode } from './design'

export function Icon({ name }: { name: string }) {
  return <img className="mb-icon" src={asset(name)} alt="" aria-hidden="true" />
}

export function Brand({ tone = 'evergreen' }: { tone?: 'evergreen' | 'ivory' }) {
  return (
    <a className="mb-brand" href="#/" aria-label="Meridian Bridge home">
      <Icon name={tone === 'ivory' ? '5ae22-ivory.svg' : '5ae22.svg'} />
      <span><strong>Meridian</strong><small>BRIDGE</small></span>
    </a>
  )
}

export function ActionLink({ children, href = consultationUrl, variant = '', icon = 'ee954.svg', onClick }: {
  children: ReactNode
  href?: string
  variant?: string
  icon?: string
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void
}) {
  const external = href.startsWith('https://')
  return (
    <a className={`mb-action ${variant}`} href={href} onClick={onClick}
      target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>
      {children}<Icon name={icon} />
    </a>
  )
}

export function SectionHeading({ title, children, aside }: {
  title: string
  children?: ReactNode
  aside?: ReactNode
}) {
  return (
    <div className="mb-section-heading">
      <h2>{title}</h2>
      {children && <p>{children}</p>}
      {aside}
    </div>
  )
}

export function CountrySelect({ country, onChange }: { country: CountryCode; onChange: (country: CountryCode) => void }) {
  const id = useId()
  return (
    <div className="mb-country-select">
      <label htmlFor={id}>Compare with</label>
      <span className="mb-country-select-field">
        <select id={id} value={country} onChange={event => onChange(event.currentTarget.value as CountryCode)}>
          {countries.map(({ code, name }) => <option key={code} value={code}>{name}</option>)}
        </select>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </div>
  )
}

export function ContentDialog({ title, label, children, icon }: { title: string; label: string; children: ReactNode; icon?: string }) {
  const ref = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  return (
    <>
      <Button className="mb-outline-button" onClick={() => ref.current?.showModal()}>{label}{icon && <Icon name={icon} />}</Button>
      <dialog className="mb-dialog" ref={ref} aria-labelledby={titleId}>
        <h2 id={titleId}>{title}</h2>
        <div>{children}</div>
        <Button className="mb-outline-button" onClick={() => ref.current?.close()}>Close</Button>
      </dialog>
    </>
  )
}

export function FeatureGrid({ items }: { items: readonly (readonly [string, string, string])[] }) {
  return (
    <div className="mb-feature-grid">
      {items.map(([icon, title, text]) => (
        <article key={title}><Icon name={icon} /><h3>{title}</h3><p>{text}</p></article>
      ))}
    </div>
  )
}

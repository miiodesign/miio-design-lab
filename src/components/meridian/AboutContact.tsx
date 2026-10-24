import { ActionLink, ContentDialog, Icon, SectionHeading } from './Shared'
import { inquiryUrl, questions } from './design'
import { PrivacyContent, TermsContent } from './LegalContent'
import { BrandPattern } from './BrandPattern'

export function AboutAndQuestions() {
  return (
    <section className="mb-section mb-about-questions">
      <div id="faq">
        <SectionHeading title="Frequently asked questions" />
        <div className="mb-faq">
          {questions.map(({ question, answer }) => (
            <details key={question}><summary>{question}<Icon name="ef6bf.svg" /></summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
      <div id="about" className="mb-about">
        <SectionHeading title="About Meridian Bridge" />
        <p>Meridian Bridge was founded to help English-speaking clients access high-quality health screening and diagnostic testing in China with more clarity, confidence and support. Based in Canada, we understand both cultures and work closely with trusted providers in Guangdong.</p>
      </div>
    </section>
  )
}

export function ContactSection() {
  return (
    <section id="inquiry" className="mb-contact">
      <div className="mb-contact-copy">
        <h2>Ready to explore your options?</h2>
        <p>Book a free 20-minute consultation, or send us what you’re looking for.</p>
        <div className="mb-actions">
          <ActionLink variant="mb-action-inverse">Book a Free Consultation</ActionLink>
          <ActionLink href={inquiryUrl} variant="mb-action-inverse">Send an Inquiry</ActionLink>
        </div>
        <p className="mb-inquiry-note">The inquiry form opens on Tally in a new tab. Please do not include medical records or sensitive health information.</p>
      </div>
    </section>
  )
}

export function SiteFooter() {
  return (
    <footer className="mb-footer">
      <BrandPattern />
      <ContactSection />
      <div className="mb-footer-bottom">
        <p>Meridian Bridge · Health screening, thoughtfully coordinated.</p>
        <div className="mb-legal">
          <ContentDialog title="Privacy" label="Privacy"><PrivacyContent /></ContentDialog>
          <span>·</span>
          <ContentDialog title="Terms" label="Terms"><TermsContent /></ContentDialog>
          <span>·</span><a href={inquiryUrl} target="_blank" rel="noopener noreferrer">Contact</a>
        </div>
      </div>
    </footer>
  )
}

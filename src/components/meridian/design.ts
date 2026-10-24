export const asset = (name: string) => `${import.meta.env.BASE_URL}meridian/${name}`
export const consultationUrl = 'https://calendly.com/gordon-meridianbridge/15min-consultation'
export const inquiryUrl = 'https://tally.so/r/7Rpe72'
export const siteUrl = 'https://meridianbridge.vercel.app/'

export const navigation = [
  ['Why China', 'why-china'],
  ['How it Works', 'how-it-works'],
  ["What's Included", 'screening'],
  ['Pricing', 'pricing'],
  ['Our Providers', 'providers'],
  ['About', 'about'],
  ['FAQ', 'faq'],
] as const

export const capabilities = [
  ['c2f85.svg', 'International departments', 'Dedicated services for foreign patients'],
  ['c8978.svg', 'Modern equipment', 'Western-standard MRI, CT, ultrasound and diagnostic systems'],
  ['1c73b.svg', 'Proven experience', 'Decades of care for international visitors'],
] as const

export const countries = [
  { code: 'CA', name: 'Canada', flights: '~$800 – $1,200 CAD', currency: 'CAD' },
  { code: 'US', name: 'United States', flights: '~$700 – $1,300 USD', currency: 'USD' },
  { code: 'UK', name: 'United Kingdom', flights: '~£550 – £950 GBP', currency: 'GBP' },
] as const

export type CountryCode = typeof countries[number]['code']

// Placeholder home-country figures until verified prices are supplied.
export const comparisons = [
  {
    title: 'MRI (private) *', icon: 'fa59d.svg', image: '3f753.png', imageAlt: 'An MRI scanner and patient table', imageWidth: 1500, imageHeight: 1000,
    home: {
      CA: { wait: '8 – 18 weeks', cost: '$400 – $1,200 CAD' },
      US: { wait: '1 – 4 weeks', cost: '$1,000 – $3,500 USD' },
      UK: { wait: '6 – 18 weeks', cost: '£350 – £1,000 GBP' },
    },
  },
  {
    title: 'CT Scan (private) *', icon: 'fa59d.svg', image: 'ct-scan.jpg', imageAlt: 'A CT scanner and patient table in a bright examination room', imageWidth: 554, imageHeight: 554,
    home: {
      CA: { wait: '4 – 12 weeks', cost: '$300 – $800 CAD' },
      US: { wait: '1 – 3 weeks', cost: '$500 – $3,000 USD' },
      UK: { wait: '4 – 10 weeks', cost: '£300 – £800 GBP' },
    },
  },
  {
    title: 'Complete Health Screening', icon: '2d269.svg', image: 'complete-health-screening.jpg', imageAlt: 'A sunlit healthcare room with a patient bed and comfortable seating', imageWidth: 1000, imageHeight: 600,
    home: {
      CA: { wait: 'Limited availability', cost: '$2,500 – $5,000+ CAD' },
      US: { wait: '2 – 6 weeks', cost: '$3,000 – $10,000+ USD' },
      UK: { wait: 'Limited availability', cost: '£1,500 – £4,000+ GBP' },
    },
  },
] as const

export const processSteps = [
  ['01', 'Start with a conversation', 'Tell us what you are looking for during a free consultation or through our inquiry form.'],
  ['02', 'Receive tailored options', 'We identify suitable providers and packages based on your needs.'],
  ['03', 'We coordinate the booking', 'We handle communication with the provider and appointment details.'],
  ['04', 'We prepare you for China', 'Practical guidance, payment preparation and on-trip support.'],
  ['05', 'Receive your results', 'We help with report logistics and guidance for your own physician.'],
] as const

export const screeningTests = [
  ['3a216.svg', 'Physical health assessment & body composition'],
  ['8ab5d.svg', 'Vision and eye examination'],
  ['ac093.svg', 'ECG and cardiovascular testing'],
  ['074ae.svg', 'X-ray, CT, MRI and ultrasound'],
  ['5d8b0.svg', 'Gastrointestinal screening'],
  ['d8181.svg', 'Tumour markers'],
  ['a7c4c.svg', 'Bone density'],
  ['e6860.svg', 'Female health specific tests'],
  ['6395f.svg', 'Thyroid, liver and kidney function'],
  ['e3fa5.svg', 'Other package-specific tests'],
  ['3bb3d.svg', 'Blood testing, diabetes screening'],
] as const

export const providers = [
  ['94db4.png', 'Major academic hospitals', 'Clinically renowned institutions with broad diagnostic and specialist capabilities.'],
  ['a8e95.png', 'International & private hospitals', 'High-quality service and dedicated international patient departments.'],
  ['770de.png', 'Specialist diagnostic providers', 'Focused on comprehensive screening and diagnostic services with specific strengths.'],
] as const

export const expectations = [
  ['13c26.svg', 'Western-standard equipment', 'Modern MRI, CT, ultrasound and diagnostic systems.'],
  ['1c73b.svg', 'Dedicated international departments', 'VIP and foreign-patient services.'],
  ['ba4f6.svg', 'Experienced teams', 'Decades of experience serving international patients.'],
  ['3ff93.svg', 'Streamlined patient journey', 'Registration, interpretation, imaging access and follow-up support.'],
] as const

export const questions = [
  {
    question: 'Can you help if I only want an MRI or specific test?',
    answer: 'You can ask about a specific scan or test as well as a full health screening. Tell us what you are looking for, and we can discuss suitable provider options and booking requirements. A qualified clinician should advise which tests are appropriate for you.',
  },
  {
    question: 'How do you choose which provider to recommend?',
    answer: 'We match your screening needs and travel plans with our network of hospitals and diagnostic providers in Guangdong. Relevant considerations include the services available, international-patient support, appointment availability, and pricing. We discuss the options with you before you decide.',
  },
  {
    question: 'Will the hospitals speak English?',
    answer: 'Language arrangements vary by hospital and department. Meridian Bridge offers English, Mandarin, and Cantonese coordination support. Before booking, we will discuss the provider’s language services and whether interpretation or translated reports need to be arranged.',
  },
  {
    question: 'How and when will I receive my results?',
    answer: 'Report timing, format, and language depend on the provider and the tests you choose. Confirm these arrangements before booking. We help coordinate report logistics so you can share the results with your own physician; we do not diagnose conditions or replace medical follow-up.',
  },
] as const

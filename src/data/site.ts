export const site = {
  name: 'Renju Nair',
  headline: 'QA Lead | Test Automation & CI/CD Quality Gates | AI-Assisted Testing',
  tagline: 'QA Lead and former Game Producer with 11+ years shipping and operating live mobile, PC, and live-service games.',
  location: 'Abu Dhabi, UAE',
  locationPublic: true,
  email: 'renjunair5041@gmail.com',
  phone: '+971 54 509 2964',
  phonePublic: true,
  linkedin: 'https://www.linkedin.com/in/renju-nair-574961119',
  github: 'https://github.com/R3njunair',
  languages: ['English', 'Hindi', 'Malayalam'],
  // Set to true and add the file at public/avatar.jpg to show a real photo
  // instead of the initials monogram. See CONTENT_GUIDE.md.
  hasPhoto: false,
  photoPath: '/avatar.jpg',
  photoAlt: 'Portrait of Renju Nair',
  atAGlance: [
    { label: '10+ years', detail: 'in QA and release delivery' },
    { label: '40% shorter', detail: 'regression cycles' },
    { label: '50%+ faster', detail: 'test-suite creation with AI-assisted generation' },
    { label: '35% fewer', detail: 'client crash reports and bot activity' },
    { label: 'Zero', detail: 'Play/App Store rejections and day-one rollbacks' },
  ],
  // Privacy-friendly, cookieless pageview counter (GoatCounter). Leave goatcounterCode
  // empty to ship with analytics fully disabled -- no script is rendered either way
  // until you create a free account at https://www.goatcounter.com/ and set this.
  // See DEPLOYMENT.md for setup steps.
  goatcounterCode: '',
  summary:
    'Lead QA engineer with 10+ years across mobile, PC, and live-service games, including Growtopia (10M+ Google Play downloads). ' +
    'Leads quality across three titles with 5 in-house QA and 20+ external QC at peak, using quality gates, CI-integrated automation ' +
    '(Playwright, Appium, Selenium, Python), and AI-assisted testing that cut test-suite creation time by more than 50%. ' +
    'Uses in-house telemetry, Grafana, Dynatrace, and Elasticsearch to monitor live titles and reduce crash reports and bot activity.',
} as const;

import pathlib

SEEDS = {
'src/templates/restaurant.tsx': '''export const seed: Partial<Record<SectionType, Record<string, unknown>>> = {
  navbar: { logo: "Ember and Oak", links: [{ label: "Menu", href: "#menu" }, { label: "About", href: "#about" }, { label: "Reservations", href: "#contact" }], cta: "" },
  hero: {
    eyebrow: "Wood-fired kitchen, Lazimpat, Est. 2016", title: "Fire-kissed and seasonal", subtitle: "",
    description: "A neighborhood dining room in Lazimpat built around oak fire, Kavre farms and Himalayan hospitality. Walk-ins welcome.",
    primaryCta: "Reserve a table", secondaryCta: "See the menu", image: "", stats: [],
  },
  about: {
    heading: "Our story", title: "Cooked over oak, served with warmth",
    body: "Ember and Oak began as a twelve-seat counter in Jhamsikhel with one wood oven. A decade later we still cook everything over fire, bread at dawn, tarkari at noon, whole kukhura on weekends.",
    image: "", bullets: ["Wood-fired everything", "Kavre farms within 50 km", "Local wine and chhyang list"],
  },
  menu: {
    heading: "The menu", title: "Eat and drink",
    groups: [
      { name: "To Start", items: [{ name: "Charred Sourdough", description: "Whipped ricotta, hot honey", price: "Rs. 550" }, { name: "Ember Beets", description: "Pistachio, citrus, herbs", price: "Rs. 495" }] },
      { name: "From the Fire", items: [{ name: "Chicken Sekuwa Plate", description: "Rosemary jus, grilled lemon, dhedo", price: "Rs. 1,150" }, { name: "Buff Sukuti Sizzler", description: "Smoked buff, timur, watercress", price: "Rs. 1,250" }] },
      { name: "To Finish", items: [{ name: "Juju Dhau", description: "Bhaktapur king curd, honey", price: "Rs. 350" }, { name: "Chiya Affogato", description: "Vanilla gelato, double milk chiya", price: "Rs. 300" }] },
    ],
  },
  gallery: { heading: "", title: "From the pass", images: ["", "", "", "", "", ""] },
  hours: {
    heading: "Find us", title: "Hours and location", address: "214 Lazimpat Road, Kathmandu", phone: "(01) 444-0114",
    rows: [{ day: "Tue to Thu", time: "11am to 10pm" }, { day: "Fri and Sat", time: "11am to 11pm" }, { day: "Sunday", time: "12pm to 9pm" }, { day: "Monday", time: "Oven rests" }],
  },
  testimonials: {
    heading: "", title: "Guest book",
    items: [
      { name: "Wave Magazine", role: "", company: "Best of Kathmandu", message: "The most exciting fire cooking in the valley right now.", photo: "" },
      { name: "Daniel R.", role: "", company: "Regular since 2017", message: "We have celebrated everything here. The sekuwa alone is worth moving to Lazimpat for.", photo: "" },
    ],
  },
  contact: { heading: "Reservations", title: "Join us at the table", email: "namaste@emberandoak.com.np", phone: "(01) 444-0114", location: "214 Lazimpat Road, Kathmandu", body: "Parties of 7 or more, please call. Full buyouts available on Mondays." },
  footer: { tagline: "Ember and Oak", copyright: "2026 Ember and Oak, Lazimpat, Kathmandu.", showSocial: true },
};''',
'src/templates/agency.tsx': '''export const seed: Partial<Record<SectionType, Record<string, unknown>>> = {
  navbar: { logo: "Studio Himal", links: [{ label: "Work", href: "#work" }, { label: "Studio", href: "#about" }, { label: "Contact", href: "#contact" }], cta: "Start a project" },
  hero: {
    eyebrow: "Booking projects for 2083", title: "We ship brands that win", subtitle: "",
    description: "Studio Himal is a senior-only design and engineering team in Lalitpur. Brand, website and product, under one roof, shipped in weeks.",
    primaryCta: "See the work", secondaryCta: "Our process", image: "",
    stats: [{ value: "60+", label: "Launches" }, { value: "9", label: "Awards" }, { value: "6 wks", label: "Avg. timeline" }],
  },
  services: {
    heading: "Capabilities", title: "Everything you need to launch", description: "Fixed-scope sprints with senior people only.",
    items: [
      { title: "Brand Identity", description: "Naming, logo, type and voice, a complete kit in three weeks.", icon: "", price: "from Rs. 3,50,000" },
      { title: "Web Design and Build", description: "Marketing sites and product UI, designed and shipped by the same team.", icon: "", price: "from Rs. 5,50,000" },
      { title: "Design Engineering", description: "Design systems and component libraries your team will actually use.", icon: "", price: "from Rs. 4,25,000" },
    ],
  },
  projects: {
    heading: "Case work", title: "Recent wins", description: "",
    items: [
      { title: "Sajilo Rentals", description: "Rebrand plus booking platform. Trial signups up 3x in 90 days.", image: "", tags: ["Brand", "Web", "Booking"], url: "#", github: "#" },
      { title: "Kumari Pay", description: "Product UI for a fintech scale-up. Onboarding completion doubled.", image: "", tags: ["Product", "Design system"], url: "#", github: "#" },
      { title: "Fern and Field", description: "E-commerce for a Jhamsikhel plant studio. Order value up 44 percent.", image: "", tags: ["E-commerce", "Brand"], url: "#", github: "#" },
    ],
  },
  process: {
    heading: "Process", title: "How we will work",
    steps: [
      { title: "Sprint 0", description: "Stakeholders, audit and a plan you can hold us to.", icon: "" },
      { title: "Design", description: "Weekly drops in Figma. Real content, Nepali and English.", icon: "" },
      { title: "Build", description: "Clean code, CMS, analytics and QA baked in.", icon: "" },
      { title: "Launch", description: "Ship, measure, and a 30-day tune-up included.", icon: "" },
    ],
  },
  team: {
    heading: "Team", title: "No juniors, no hand-offs",
    members: [
      { name: "Aayush Neupane", role: "Founder, Design", photo: "", bio: "Ex-agency CD. 10 years, 80 plus launches." },
      { name: "Sabin Shrestha", role: "Engineering Lead", photo: "", bio: "Full-stack. Ships fast, tests everything." },
      { name: "Prerana Karki", role: "Brand Director", photo: "", bio: "Identity systems with actual personality." },
    ],
  },
  testimonials: {
    heading: "Client proof", title: "Loved by founders",
    items: [
      { name: "Nina Shrestha", role: "CEO", company: "Sajilo Rentals", message: "They operate like co-founders. Best money we have spent.", photo: "" },
      { name: "Omar Shrestha", role: "Founder", company: "Kumari Pay", message: "Design quality you would expect at 3x the price.", photo: "" },
      { name: "Liv Chen", role: "CMO", company: "Fern and Field", message: "The site paid for itself before launch day ended.", photo: "" },
    ],
  },
  cta: { title: "Have something ambitious? Lets build it.", description: "Tell us where you are headed, we will reply within one business day.", primaryCta: "Start a project", secondaryCta: "" },
  footer: { tagline: "Lets build", copyright: "2026 Studio Himal, Jhamsikhel, Lalitpur.", showSocial: true },
};''',
'src/templates/saas-starter.tsx': '''export const seed: Partial<Record<SectionType, Record<string, unknown>>> = {
  navbar: { logo: "Sajilo", links: [{ label: "Features", href: "#work" }, { label: "Pricing", href: "#pricing" }, { label: "FAQ", href: "#faq" }], cta: "Get started" },
  hero: {
    eyebrow: "Sajilo 2.0 is live", title: "Analytics your whole team gets", subtitle: "",
    description: "Sajilo turns business data into decisions, dashboards, alerts and reports without the SQL. Built in Kathmandu, used across South Asia.",
    primaryCta: "Start free trial", secondaryCta: "", image: "",
    stats: [{ value: "900+", label: "teams" }, { value: "4.8/5", label: "rating" }, { value: "eSewa", label: "and Khalti ready" }],
  },
  services: {
    heading: "Features", title: "Everything you need to grow", description: "",
    items: [
      { title: "Live dashboards", description: "Metrics that update in real time, shareable with one link, in Nepali or English.", icon: "", price: "" },
      { title: "Smart alerts", description: "Get pinged on Viber or Slack the moment a metric moves.", icon: "", price: "" },
      { title: "Weekly reports", description: "Board-ready summaries generated every Monday morning.", icon: "", price: "" },
    ],
  },
  projects: {
    heading: "", title: "Loved by Nepali teams", description: "",
    items: [
      { title: "Sajilo Rentals", description: "Cut reporting time from 2 days to 20 minutes.", image: "", tags: [], url: "#", github: "#" },
      { title: "Himalayan Trails", description: "Found a Rs. 40 lakh churn leak in week one.", image: "", tags: [], url: "#", github: "#" },
      { title: "Momo Mart", description: "One dashboard replaced eleven spreadsheets.", image: "", tags: [], url: "#", github: "#" },
    ],
  },
  pricing: {
    heading: "", title: "Simple pricing",
    items: [
      { name: "Starter", price: "Rs. 0", period: "mo", description: "For side projects.", features: ["3 dashboards", "7-day retention", "Community support"], featured: false },
      { name: "Growth", price: "Rs. 2,900", period: "mo", description: "For teams finding fit.", features: ["Unlimited dashboards", "Viber alerts", "Priority support"], featured: true },
      { name: "Scale", price: "Rs. 9,500", period: "mo", description: "For companies at speed.", features: ["SSO and audit log", "Dedicated manager", "99.9% uptime"], featured: false },
    ],
  },
  faq: {
    heading: "", title: "Questions?",
    items: [
      { q: "Is there really a free plan?", a: "Yes, free forever for up to 3 dashboards. No credit card, no eSewa needed." },
      { q: "How long does setup take?", a: "Most teams connect a source and see first dashboards in under 15 minutes." },
      { q: "Can I pay with eSewa or Khalti?", a: "Yes, plus cards and bank transfer for annual plans with VAT bills." },
    ],
  },
  cta: { title: "See what your data is hiding.", description: "Join 900 plus Nepali teams making faster decisions with Sajilo.", primaryCta: "Start free trial", secondaryCta: "" },
  footer: { tagline: "Sajilo", copyright: "2026 Sajilo Inc., Kathmandu. Analytics for everyone.", showSocial: true },
};''',
}

for path, new_seed in SEEDS.items():
    p = pathlib.Path(path)
    s = p.read_text()
    start = s.index('export const seed')
    end = s.index('export const components')
    s = s[:start] + new_seed.strip() + '\n\n' + s[end:]
    p.write_text(s)
    print("ok", path)

import pathlib

SEEDS = {
'src/templates/creative-portfolio.tsx': '''export const seed: Partial<Record<SectionType, Record<string, unknown>>> = {
  navbar: { logo: "Prerana Gurung", links: [{ label: "Frames", href: "#work" }, { label: "About", href: "#about" }, { label: "Bookings", href: "#contact" }], cta: "" },
  hero: {
    eyebrow: "Wedding and travel photographer, Pokhara", title: "Light, honestly observed", subtitle: "",
    description: "I photograph weddings, treks and everyday life across Nepal, for couples, magazines and brands who hate posing.",
    primaryCta: "Enter the gallery", secondaryCta: "", image: "",
    stats: [{ value: "200+", label: "Weddings" }, { value: "9", label: "Years" }, { value: "14", label: "Districts covered" }],
  },
  gallery: { heading: "", title: "Selected frames", images: ["", "", "", "", ""] },
  about: {
    heading: "The photographer", title: "A patient eye",
    body: "My work starts with listening. Every shoot is unhurried, the best frames arrive when nobody is performing. Home base in Pokhara, available from Mechi to Mahakali.",
    image: "", bullets: ["Weddings and pre-wedding", "Treks and travel stories", "Prints and photo books"],
  },
  testimonials: {
    heading: "Field notes", title: "Kind words",
    items: [
      { name: "Aayush and Shreya", role: "Married", company: "Ghandruk", message: "We forgot the camera existed. The album makes our families cry every Dashain.", photo: "" },
      { name: "Binod Thapa", role: "Editor", company: "Nepali Traveller", message: "Prerana sees what the rest of us walk past. Our Mustang cover sold out.", photo: "" },
    ],
  },
  contact: { heading: "Bookings", title: "Lets make something honest", email: "namaste@prerana.photo", phone: "+977-98560-67890", location: "Pokhara, travels all over Nepal", body: "Wedding season (Nov-Feb) books out fast. Tell me your date and venue." },
  footer: { tagline: "Stay in the light.", copyright: "2026 Prerana Gurung Photography, Pokhara.", showSocial: true },
};''',
'src/templates/professional-business.tsx': '''export const seed: Partial<Record<SectionType, Record<string, unknown>>> = {
  navbar: { logo: "Himalaya Advisors", links: [{ label: "Practice", href: "#work" }, { label: "Results", href: "#results" }, { label: "FAQ", href: "#faq" }], cta: "Get in touch" },
  hero: {
    eyebrow: "Briefing 01, who we help", title: "Clarity for complex decisions", subtitle: "",
    description: "Himalaya Advisors helps Nepali founders cut through noise, pricing, hiring and growth strategy for companies doing Rs. 1-50 crore.",
    primaryCta: "Book a consultation", secondaryCta: "", image: "",
    stats: [{ value: "80+", label: "Engagements" }, { value: "92%", label: "Repeat clients" }, { value: "12 yrs", label: "In practice" }],
  },
  services: {
    heading: "Practice areas", title: "How we can help", description: "",
    items: [
      { title: "Growth Strategy", description: "A 4-week diagnostic ending in a sequenced 12-month plan with owners and metrics.", icon: "", price: "from Rs. 3,20,000" },
      { title: "Pricing and Packaging", description: "Research-backed repackaging that lifts average revenue without churning your base.", icon: "", price: "from Rs. 2,40,000" },
      { title: "Operator Coaching", description: "Monthly working sessions for founders stepping into the CEO role.", icon: "", price: "from Rs. 80,000/mo" },
    ],
  },
  process: {
    heading: "Engagement model", title: "A calm, senior-only process",
    steps: [
      { title: "Diagnose", description: "Stakeholder interviews and data review in week one, in Nepali or English.", icon: "" },
      { title: "Decide", description: "One focused workshop in Kathmandu to choose the highest-leverage moves.", icon: "" },
      { title: "Execute", description: "We stay in the room while your team ships the changes.", icon: "" },
      { title: "Review", description: "90-day check-in against the metrics we set together.", icon: "" },
    ],
  },
  testimonials: {
    heading: "Client record", title: "Results, in their words",
    items: [
      { name: "Dikshya Adhikari", role: "CEO", company: "Sajilo Rentals", message: "Himalaya found the pricing leak we had missed for two years. Revenue per customer is up 31 percent.", photo: "" },
      { name: "Prakash KC", role: "Founder", company: "Loop Pasal", message: "The rare consultant who argues with you, and is usually right.", photo: "" },
      { name: "Sneha Rana", role: "COO", company: "Northbeam Treks", message: "Our leadership team finally rows in the same direction.", photo: "" },
    ],
  },
  pricing: {
    heading: "Engagement options", title: "Work with us",
    items: [
      { name: "Diagnostic", price: "Rs. 1,90,000", period: "2 weeks", description: "Know exactly what is wrong.", features: ["Stakeholder interviews", "Data and funnel review", "Written findings"], featured: false },
      { name: "Advisory", price: "Rs. 2,60,000", period: "per month", description: "A senior partner in your corner.", features: ["Weekly working sessions", "Async review", "Quarterly planning"], featured: true },
      { name: "Embedded", price: "Custom", period: "per quarter", description: "We join the team.", features: ["On-site workshops", "Team coaching", "Board support"], featured: false },
    ],
  },
  faq: {
    heading: "Due diligence", title: "Fair questions",
    items: [
      { q: "How fast can we start?", a: "Diagnostics begin within two weeks of signing. Advisory slots are limited to four clients." },
      { q: "Do you work outside Kathmandu?", a: "Yes, we regularly travel to Pokhara, Chitwan and Biratnagar, remote works too." },
      { q: "What do you need from us?", a: "Access to your numbers, your team for interviews, and one decision-maker in the room." },
    ],
  },
  cta: { title: "One call could save you a quarter.", description: "A 30-minute conversation over chiya. If we are not a fit, we will tell you who is.", primaryCta: "Book a consultation", secondaryCta: "" },
  footer: { tagline: "Himalaya Business Advisors", copyright: "2026 Himalaya Advisors, Durbarmarg, Kathmandu.", showSocial: true },
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

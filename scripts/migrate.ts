/**
 * One-time content migration: seeds the Sanity dataset from the website's
 * existing hardcoded content (src/lib/site.ts, src/lib/projects.ts and the
 * service detail page). Run once with:
 *
 *   npx sanity exec scripts/migrate.ts --with-user-token
 *
 * Uses createOrReplace with deterministic _ids, so it is safe to re-run
 * (documents are replaced, not duplicated).
 */
import {createReadStream} from 'node:fs'
import {join} from 'node:path'
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2024-01-01'})

const IMAGES = join(process.cwd(), '..', 'aastha-enterprise', 'public', 'images')

async function uploadImage(relPath: string, filename: string) {
  const asset = await client.assets.upload(
    'image',
    createReadStream(join(IMAGES, relPath)),
    {filename}
  )
  return {
    _type: 'image' as const,
    asset: {_type: 'reference' as const, _ref: asset._id},
  }
}

// ---------------------------------------------------------------------------
// Contact & business details (singleton)
// ---------------------------------------------------------------------------
const siteSettings = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  businessName: 'Aastha Enterprise',
  descriptor: 'Engineers & Contractors',
  tagline: 'Twenty-five years of building trust.',
  established: 2000,
  owner: 'Hitesh Panchal',
  phoneDisplay: '098253 63015',
  phoneE164: '+919825363015',
  whatsappDisplay: '+91 79840 33895',
  whatsappE164: '+917984033895',
  email: 'aasthaenterprises098@gmail.com',
  addressLine1: 'AB-35/38, RBG Commercial Complex',
  addressLine2: 'Bahucharaji Road, Karelibaug',
  city: 'Vadodara',
  state: 'Gujarat',
  pincode: '390018',
  hoursDisplay: 'Mon–Sat, 10:00 AM – 6:30 PM',
  hoursClosed: 'Sunday closed',
  yearsOfWork: 25,
  clientCount: 28,
  googleRating: 4.8,
}

// ---------------------------------------------------------------------------
// Services (4) — base + specs + intro + process from the service detail page
// ---------------------------------------------------------------------------
const services = [
  {
    slug: 'aluminium-windows-doors',
    title: 'Aluminium Windows & Doors',
    short: 'Sliding and openable windows, doors, sections and partitions.',
    keyword: 'aluminium windows vadodara',
    intro:
      'From two-track sliding windows in a Vadodara home to full aluminium partition systems for institutional offices, every frame is fabricated in our own workshop and installed by our own team. Sections, hardware and glass are chosen for the opening and its exposure — not for what is lying in stock.',
    specs: [
      'Sliding & openable windows',
      'Sliding & automatic sliding doors',
      'Aluminium partitions',
      'Aluminium kitchen',
      'ACP (aluminium composite panel) work',
      'Mosquito-net (roll-up) windows',
      'Two & three-track windows',
      'Sections & profiles',
    ],
    process: [
      {step: 'Site visit & measurement', body: 'We measure every opening ourselves — plumb, level and brickwork tolerance — because a window is only as good as its measurement. The visit is free.'},
      {step: 'Section selection & quotation', body: 'We recommend the right aluminium sections, hardware and glass for the opening and your budget, then send a written quotation.'},
      {step: 'In-house fabrication', body: 'Frames are cut and assembled in our own Vadodara workshop — the same unit that has served our institutional clients since 2000.'},
      {step: 'Installation & handover', body: 'Our own team fits, seals and finishes the work, then walks it with you before handover. After-sales support stays a phone call away.'},
    ],
  },
  {
    slug: 'structural-glazing-curtain-wall',
    title: 'Structural Glazing & Curtain Wall',
    short: 'Structural glazing, curtain walls, spider glass and facades.',
    keyword: 'structural glazing vadodara',
    intro:
      "Structural glazing is unforgiving work: the facade carries wind load, weather and the building's public face at once. Our engineering team has delivered glazing for public infrastructure, hospitals and university campuses across Gujarat — work that is still standing and still sealed.",
    specs: [
      'Structural glazing',
      'Curtain walls',
      'Spider glass & suspended glass systems',
      'Glass facades',
      'Glass doors with patch fitting',
      'DGU windows',
      'Sound-proof windows',
    ],
    process: [
      {step: 'Site survey & feasibility', body: 'We survey the elevation, substrate and access, and confirm what the structure can carry before anything is promised.'},
      {step: 'System design & quotation', body: 'Glazing system, glass specification — DGU, toughened, sound-proof — and fixing details are worked out by our engineering team and priced in a written quotation.'},
      {step: 'Fabrication & staging', body: "Frames and fittings are prepared in-house and staged to the project's schedule — we work alongside builders on live sites."},
      {step: 'Installation & handover', body: 'Our experienced site team installs, seals and checks the facade, and stays accountable after handover.'},
    ],
  },
  {
    slug: 'furniture',
    title: 'Wooden & Modular Furniture',
    short: 'Office furniture, workstations, modular kitchens and interiors.',
    keyword: 'office furniture vadodara',
    intro:
      'From a single conference table to a complete office fit-out — workstations, reception counters, auditorium seating and modular kitchens — we build furniture for daily institutional use, made in the same workshop that serves our contracting clients.',
    specs: [
      'Wooden furniture',
      'Office furniture — reception, conference, cubicles',
      'Auditorium furniture',
      'Modular kitchens',
      'Industrial & computer furniture',
      'Furniture contracting & hire',
    ],
    process: [
      {step: 'Requirement & measurement', body: 'We visit, measure the space and understand how it will be used — workstations, storage, reception, conference or a full office.'},
      {step: 'Design & quotation', body: 'Layouts, materials and finishes are settled with you, then priced in a written quotation.'},
      {step: 'In-house fabrication', body: 'Every piece is built in our own workshop — wooden, modular and industrial furniture from one accountable team.'},
      {step: 'Delivery & installation', body: 'We deliver, install and level the furniture on site, and support it after handover.'},
    ],
  },
  {
    slug: 'false-ceiling-interior',
    title: 'False Ceiling & Interior Work',
    short: 'POP, false ceilings, blinds, SS railing and interior finishing.',
    keyword: 'false ceiling vadodara',
    intro:
      'Ceilings, blinds, railings and finishing are the last ten percent of a project that decide how finished it feels. We handle POP and false-ceiling work alongside S.S. railing fabrication and mini civil jobs, so one team closes out the site.',
    specs: [
      'POP & false ceilings',
      'Gypsum board ceilings',
      'Vertical & horizontal blinds',
      'Curtains',
      'S.S. railing & fabrication',
      'Bathroom doors',
      'Glass partitions (incl. bathroom / shower)',
      'FRP roof sheet',
      'Mini civil work',
    ],
    process: [
      {step: 'Site visit & scope', body: 'We walk the site with you and agree the exact scope — ceilings, blinds, railing, finishing — before quoting.'},
      {step: 'Written quotation', body: 'One itemised quotation for the full interior scope, so nothing falls between two vendors.'},
      {step: 'Execution', body: 'POP and false-ceiling work, S.S. railing fabrication and mini civil jobs run by our own crews, sequenced around your site.'},
      {step: 'Finishing & handover', body: 'We close out the details — edges, joints, cleanup — and hand over a finished space.'},
    ],
  },
]

// ---------------------------------------------------------------------------
// Projects (5)
// ---------------------------------------------------------------------------
const projects = [
  {name: 'Central Bus Station,', emphasis: 'Ved Transcube Plaza', scope: 'Structural glazing', location: 'Vadodara, Gujarat', type: 'Public infrastructure', image: 'central-bus-station.webp', alt: 'Structural glazing at Central Bus Station, Ved Transcube Plaza, Vadodara'},
  {name: 'H.J. Doshi', emphasis: 'Hospital', scope: 'Curtain wall', location: 'Rajkot, Gujarat', type: 'Healthcare', image: 'hj-doshi-hospital.webp', alt: 'Curtain wall at H.J. Doshi Hospital, Rajkot'},
  {name: 'Vapi', emphasis: 'Auditorium', scope: 'Spider glass fixing', location: 'Vapi, Gujarat', type: 'Public auditorium', image: 'vapi-auditorium.webp', alt: 'Spider glass facade at Vapi Auditorium'},
  {name: 'MEPRO', emphasis: '', scope: '12mm glass partition', location: 'Jarod, Gujarat', type: 'Commercial facility', image: 'mepro.webp', alt: '12mm glass partition work at MEPRO, Jarod'},
  {name: 'GFSU,', emphasis: 'Gandhinagar', scope: 'Curtain wall', location: 'Gandhinagar, Gujarat', type: 'University campus', image: 'gfsu-gandhinagar.webp', alt: 'Curtain wall at GFSU campus, Gandhinagar'},
]

// ---------------------------------------------------------------------------
// Clients (28) — full names; featured subset shows on the homepage strip
// ---------------------------------------------------------------------------
const FEATURED = new Set([
  'L&T Hydrocarbon Engineering',
  'Saint-Gobain India',
  'Zydus Cadila',
  'Lupin Pharmaceuticals',
  'Grasim Industries',
  'Alembic Real Estate',
  'Motilal Oswal',
  'India Infoline',
  'JP Iscon',
  'Glenmark',
])
const clients = [
  'L&T Hydrocarbon Engineering', 'Saint-Gobain India', 'Zydus Cadila',
  'Lupin Pharmaceuticals', 'Grasim Industries', 'Alembic Real Estate',
  'Motilal Oswal', 'India Infoline', 'JP Iscon', 'Safal Group',
  'Arvind & Smart Value Homes', 'Glenmark', 'Deepak Phenolics',
  'Aikya Chemical', 'AFC Elastomers', 'Cube Construction Engineering',
  'Katira Construction', 'Rohan Builders', 'Sharad Constructions',
  'Manglam Construction', 'National Builders Infrastructure',
  'Dipesh Construction', 'Stem Cell Hospital, Surat', 'T.B. Hospital, Gotri',
  'Stone Sapphire', 'Nirmal Bang', 'Applewoods Estate', 'APMC Bharuch',
]

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

async function run() {
  const tx = client.transaction()

  // Settings
  tx.createOrReplace(siteSettings)
  console.log('• Contact & Business Details')

  // Services (with images)
  for (let i = 0; i < services.length; i++) {
    const s = services[i]
    const image = await uploadImage(`services/${s.slug}.webp`, `${s.slug}.webp`)
    tx.createOrReplace({
      _id: `service-${s.slug}`,
      _type: 'service',
      title: s.title,
      slug: {_type: 'slug', current: s.slug},
      short: s.short,
      keyword: s.keyword,
      intro: s.intro,
      specs: s.specs,
      process: s.process.map((p, j) => ({_key: `p${j}`, ...p})),
      image,
      order: i + 1,
    })
    console.log(`• Service: ${s.title}`)
  }

  // Projects (with images)
  for (let i = 0; i < projects.length; i++) {
    const p = projects[i]
    const base = p.image.replace(/\.webp$/, '')
    const image = await uploadImage(`projects/${p.image}`, p.image)
    tx.createOrReplace({
      _id: `project-${base}`,
      _type: 'project',
      name: p.name,
      emphasis: p.emphasis || undefined,
      scope: p.scope,
      location: p.location,
      type: p.type,
      image,
      alt: p.alt,
      featured: true,
      order: i + 1,
    })
    console.log(`• Project: ${p.name} ${p.emphasis}`.trim())
  }

  // Clients
  clients.forEach((name, i) => {
    tx.createOrReplace({
      _id: `client-${slugify(name)}`,
      _type: 'client',
      name,
      featuredOnHomepage: FEATURED.has(name),
      order: i + 1,
    })
  })
  console.log(`• ${clients.length} clients`)

  console.log('\nCommitting…')
  await tx.commit()
  console.log('✓ Migration complete.')
}

run().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})

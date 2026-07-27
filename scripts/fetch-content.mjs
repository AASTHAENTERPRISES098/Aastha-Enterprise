/**
 * Build-time content fetch. Pulls the editable content from Sanity and writes
 * it to src/lib/content.generated.json in the shape the site already expects.
 *
 * Runs before `next build` (see package.json). The dataset is public, so no
 * token is needed. If Sanity is unreachable, the build keeps the last committed
 * snapshot rather than failing — the site never goes dark over a CMS hiccup.
 */
import {createClient} from '@sanity/client'
import {writeFileSync} from 'node:fs'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = join(__dirname, '..', 'src', 'lib', 'content.generated.json')

const client = createClient({
  projectId: 'ctud63ec',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // always fetch fresh at build time
})

// Sanity image CDN params — auto=format serves avif/webp, sized per usage.
const IMG_PROJECT = '?w=1800&q=75&auto=format'
const IMG_SERVICE = '?w=1200&q=75&auto=format'

const query = `{
  "settings": *[_type == "siteSettings"][0]{
    businessName, descriptor, tagline, established, owner,
    phoneDisplay, phoneE164, whatsappDisplay, whatsappE164, email,
    addressLine1, addressLine2, city, state, pincode,
    hoursDisplay, hoursClosed, yearsOfWork, clientCount, googleRating
  },
  "services": *[_type == "service"] | order(order asc){
    "slug": slug.current, title, short, keyword, intro, specs,
    process[]{step, body},
    "imageUrl": image.asset->url + "${IMG_SERVICE}"
  },
  "projects": *[_type == "project" && featured == true] | order(order asc){
    name, emphasis, scope, location, type, alt,
    "imageUrl": image.asset->url + "${IMG_PROJECT}"
  },
  "clients": *[_type == "client"] | order(order asc){
    name, "featured": featuredOnHomepage
  }
}`

async function main() {
  const data = await client.fetch(query)

  // Fail loudly only on clearly-broken data, so a bad fetch can't silently
  // ship an empty site.
  if (!data.settings) throw new Error('Sanity: siteSettings missing')
  if (!data.services?.length) throw new Error('Sanity: no services returned')
  if (!data.projects?.length) throw new Error('Sanity: no projects returned')
  if (!data.clients?.length) throw new Error('Sanity: no clients returned')

  writeFileSync(OUT, JSON.stringify(data, null, 2) + '\n')
  console.log(
    `✓ content.generated.json — ${data.services.length} services, ` +
      `${data.projects.length} projects, ${data.clients.length} clients`
  )
}

main().catch((err) => {
  console.error('✗ Content fetch failed:', err.message)
  process.exit(1)
})

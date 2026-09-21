import {defineType, defineField, defineArrayMember} from 'sanity'

/**
 * A blog / insights article. Written for SEO + AI-citation: the excerpt doubles
 * as the meta description and the summary an AI quotes, the FAQ block renders
 * both on-page and as FAQ schema, and the body is rich text so Hitesh can add
 * headings, lists, links and photos himself.
 */
export const post = defineType({
  name: 'post',
  title: 'Blog post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description:
        'Write it like a question or clear promise, e.g. “How much does structural glazing cost in Gujarat?” — that’s how people (and AI) search.',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL slug',
      description: 'The web address, e.g. /blog/structural-glazing-cost. Click “Generate” from the title.',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Summary (1–2 sentences)',
      description:
        'A direct, plain-English answer to the title. Shown on the blog list, used as the Google description AND the summary an AI is most likely to quote — so make it factual and self-contained. ~160 characters.',
      type: 'text',
      rows: 3,
      validation: (r) => r.required().max(240),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover photo',
      description: 'Shown at the top of the post and on the blog list. A real jobsite or detail shot works best.',
      type: 'image',
      options: {hotspot: true},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'coverAlt',
      title: 'Cover photo description (for accessibility & SEO)',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Glazing & Façades', value: 'Glazing & Façades'},
          {title: 'Windows & Doors', value: 'Windows & Doors'},
          {title: 'Interiors', value: 'Interiors'},
          {title: 'Buyer’s Guide', value: 'Buyer’s Guide'},
          {title: 'Project Story', value: 'Project Story'},
          {title: 'Company News', value: 'Company News'},
        ],
      },
      initialValue: 'Buyer’s Guide',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      description: 'Who wrote / stands behind this. A real name + credential is a strong trust signal for Google and AI.',
      type: 'object',
      options: {collapsed: false, collapsible: true},
      fields: [
        defineField({
          name: 'name',
          title: 'Name',
          type: 'string',
          initialValue: 'Hitesh Panchal',
          validation: (r) => r.required(),
        }),
        defineField({
          name: 'credential',
          title: 'Credential / role',
          description: 'e.g. “Founder, Aastha Enterprise — 15+ years in aluminium façades”',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published on',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'updatedAt',
      title: 'Last updated on (optional)',
      description: 'Set this when you meaningfully revise an old post — freshness helps rankings and AI trust.',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      title: 'Article',
      description:
        'The full post. Use Heading 2 / Heading 3 for sections, bullet lists for scannable points, and add photos between sections. Tip: open with a direct 2–3 sentence answer, then go deep.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Heading 2', value: 'h2'},
            {title: 'Heading 3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Bold', value: 'strong'},
              {title: 'Italic', value: 'em'},
            ],
            annotations: [
              defineArrayMember({
                name: 'link',
                title: 'Link',
                type: 'object',
                fields: [
                  defineField({
                    name: 'href',
                    title: 'URL',
                    type: 'url',
                    validation: (r) =>
                      r.uri({allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel']}),
                  }),
                ],
              }),
            ],
          },
        }),
        defineArrayMember({
          type: 'image',
          title: 'Photo',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Photo description (for accessibility & SEO)',
              type: 'string',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'caption',
              title: 'Caption (optional)',
              type: 'string',
            }),
          ],
        }),
      ],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs (optional but powerful)',
      description:
        'Common questions on this topic + short factual answers. These show on the page AND get marked up so Google and AI can pull them as direct answers. 2–5 works well.',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'faq',
          title: 'Q&A',
          type: 'object',
          fields: [
            defineField({name: 'q', title: 'Question', type: 'string', validation: (r) => r.required()}),
            defineField({name: 'a', title: 'Answer', type: 'text', rows: 3, validation: (r) => r.required()}),
          ],
          preview: {select: {title: 'q', subtitle: 'a'}},
        }),
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Show on site',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'Newest first',
      name: 'publishedDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {title: 'title', subtitle: 'category', media: 'coverImage'},
  },
})

import {defineType, defineField} from 'sanity'

/** One of the four service categories shown on /services and /services/[slug]. */
export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'short',
      title: 'Short description',
      description: 'One line shown on the services list',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'keyword',
      title: 'SEO keyword',
      description: 'e.g. "aluminium windows vadodara" — leave as-is unless sure',
      type: 'string',
    }),
    defineField({
      name: 'intro',
      title: 'Intro paragraph',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'specs',
      title: 'Sub-items / what this covers',
      description: 'The bullet list of things you do under this service',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'process',
      title: 'How we build it — steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'step', title: 'Step title', type: 'string'},
            {name: 'body', title: 'Step description', type: 'text', rows: 2},
          ],
          preview: {select: {title: 'step', subtitle: 'body'}},
        },
      ],
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
    }),
  ],
  orderings: [
    {
      title: 'Display order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {title: 'title', subtitle: 'short', media: 'image'},
  },
})

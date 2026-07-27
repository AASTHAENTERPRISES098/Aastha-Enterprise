import {defineType, defineField} from 'sanity'

/** A client name for the "Trusted by" wall. Text only — no logos. */
export const client = defineType({
  name: 'client',
  title: 'Client',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Client name',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'featuredOnHomepage',
      title: 'Show on homepage strip',
      description: 'The scrolling logos/names strip on the homepage',
      type: 'boolean',
      initialValue: false,
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
    select: {title: 'name', featured: 'featuredOnHomepage'},
    prepare: ({title, featured}) => ({
      title,
      subtitle: featured ? '★ On homepage' : '',
    }),
  },
})

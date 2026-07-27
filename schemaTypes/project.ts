import {defineType, defineField} from 'sanity'

/** A showcase project shown on the /projects page. */
export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Project name',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'emphasis',
      title: 'Name — italic part (optional)',
      description: 'The second half of the name shown in italics, e.g. "Hospital"',
      type: 'string',
    }),
    defineField({
      name: 'scope',
      title: 'Scope',
      description: 'e.g. Structural glazing, Curtain wall',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      description: 'e.g. Vadodara, Gujarat',
      type: 'string',
    }),
    defineField({
      name: 'type',
      title: 'Project type',
      description: 'e.g. Healthcare, Public infrastructure',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: {hotspot: true},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Photo description (for accessibility & SEO)',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Show on site',
      type: 'boolean',
      initialValue: true,
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
    select: {title: 'name', subtitle: 'scope', media: 'image'},
  },
})

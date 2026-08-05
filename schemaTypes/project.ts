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
      name: 'slug',
      title: 'URL slug',
      description: 'The web address for this project, e.g. /projects/sterling-hospital. Click "Generate" to make one from the name.',
      type: 'slug',
      options: {source: 'name', maxLength: 96},
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
      title: 'Cover photo',
      description: 'The main photo shown on the projects grid and homepage. Pick your strongest shot of this site.',
      type: 'image',
      options: {hotspot: true},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Cover photo description (for accessibility & SEO)',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'More photos of this site',
      description:
        'Extra photos shown on the project’s own page — different angles, before/after, detail shots. The cover photo above is shown first automatically, so add the other shots here.',
      type: 'array',
      of: [
        defineField({
          name: 'galleryItem',
          title: 'Photo',
          type: 'object',
          fields: [
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
              name: 'caption',
              title: 'Caption (optional)',
              description: 'e.g. “Curtain wall — east elevation”. Shown under the photo.',
              type: 'string',
            }),
          ],
          preview: {
            select: {title: 'caption', subtitle: 'alt', media: 'image'},
            prepare({title, subtitle, media}) {
              return {title: title || subtitle || 'Photo', subtitle: title ? subtitle : undefined, media}
            },
          },
        }),
      ],
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

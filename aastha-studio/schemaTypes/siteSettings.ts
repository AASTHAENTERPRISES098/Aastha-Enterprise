import {defineType, defineField} from 'sanity'

/**
 * Single "Contact & Business Details" document. Feeds the footer, contact page,
 * JSON-LD and meta descriptions on the website — so the fields are validated to
 * keep NAP (name/address/phone) consistent, which is the top local-SEO lever.
 */
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Contact & Business Details',
  type: 'document',
  groups: [
    {name: 'identity', title: 'Identity', default: true},
    {name: 'contact', title: 'Phone & Email'},
    {name: 'address', title: 'Address & Hours'},
    {name: 'numbers', title: 'Numbers'},
  ],
  fields: [
    defineField({
      name: 'businessName',
      title: 'Business name',
      type: 'string',
      group: 'identity',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'descriptor',
      title: 'Descriptor',
      description: 'e.g. "Engineers & Contractors"',
      type: 'string',
      group: 'identity',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      group: 'identity',
    }),
    defineField({
      name: 'established',
      title: 'Established year',
      type: 'number',
      group: 'identity',
      validation: (r) => r.min(1900).max(2100),
    }),
    defineField({
      name: 'owner',
      title: 'Owner / proprietor',
      type: 'string',
      group: 'identity',
    }),

    // ---- Phone & Email -----------------------------------------------------
    defineField({
      name: 'phoneDisplay',
      title: 'Phone — as shown',
      description: 'e.g. 098253 63015',
      type: 'string',
      group: 'contact',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'phoneE164',
      title: 'Phone — dialable',
      description: 'Must be +91 followed by 10 digits, e.g. +919825363015',
      type: 'string',
      group: 'contact',
      validation: (r) =>
        r
          .required()
          .regex(/^\+91\d{10}$/, {name: 'Indian number'})
          .error('Must be +91 followed by exactly 10 digits'),
    }),
    defineField({
      name: 'whatsappDisplay',
      title: 'WhatsApp — as shown',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'whatsappE164',
      title: 'WhatsApp — dialable',
      description: 'Must be +91 followed by 10 digits',
      type: 'string',
      group: 'contact',
      validation: (r) =>
        r
          .regex(/^\+91\d{10}$/, {name: 'Indian number'})
          .error('Must be +91 followed by exactly 10 digits'),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      group: 'contact',
      validation: (r) => r.required().email(),
    }),

    // ---- Address & Hours ---------------------------------------------------
    defineField({
      name: 'addressLine1',
      title: 'Address line 1',
      type: 'string',
      group: 'address',
    }),
    defineField({
      name: 'addressLine2',
      title: 'Address line 2',
      type: 'string',
      group: 'address',
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      group: 'address',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'state',
      title: 'State',
      type: 'string',
      group: 'address',
    }),
    defineField({
      name: 'pincode',
      title: 'Pincode',
      type: 'string',
      group: 'address',
      validation: (r) =>
        r.regex(/^\d{6}$/).error('Must be a 6-digit pincode'),
    }),
    defineField({
      name: 'hoursDisplay',
      title: 'Working hours',
      description: 'e.g. Mon–Sat, 10:00 AM – 6:30 PM',
      type: 'string',
      group: 'address',
    }),
    defineField({
      name: 'hoursClosed',
      title: 'Closed note',
      description: 'e.g. Sunday closed',
      type: 'string',
      group: 'address',
    }),

    // ---- Numbers -----------------------------------------------------------
    defineField({
      name: 'yearsOfWork',
      title: 'Years of work',
      type: 'number',
      group: 'numbers',
      validation: (r) => r.min(0),
    }),
    defineField({
      name: 'clientCount',
      title: 'Client count',
      type: 'number',
      group: 'numbers',
      validation: (r) => r.min(0),
    }),
    defineField({
      name: 'googleRating',
      title: 'Google rating',
      description: 'Out of 5',
      type: 'number',
      group: 'numbers',
      validation: (r) => r.min(0).max(5),
    }),
  ],
  preview: {
    prepare: () => ({title: 'Contact & Business Details'}),
  },
})

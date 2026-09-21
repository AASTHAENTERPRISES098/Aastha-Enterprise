import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

/** Document types that should exist exactly once (no "create new" list). */
const SINGLETONS = ['siteSettings']

export default defineConfig({
  name: 'default',
  title: 'Aastha Enterprise',

  projectId: 'ctud63ec',
  dataset: 'production',

  plugins: [
    structureTool({
      // Custom left-hand menu — clean labels for Hitesh, Settings pinned as a
      // single document rather than a list of one.
      structure: (S) =>
        S.list()
          .title('Website content')
          .items([
            S.listItem()
              .title('Contact & Business Details')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.divider(),
            S.documentTypeListItem('service').title('Services'),
            S.documentTypeListItem('project').title('Projects'),
            S.documentTypeListItem('client').title('Clients'),
            S.documentTypeListItem('post').title('Blog'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    // Hide singletons from the global "create new document" templates.
    templates: (templates) =>
      templates.filter((t) => !SINGLETONS.includes(t.schemaType)),
  },

  document: {
    // Singletons can't be duplicated or deleted — only edited/published.
    actions: (input, context) =>
      SINGLETONS.includes(context.schemaType)
        ? input.filter(
            ({action}) =>
              action &&
              ['publish', 'discardChanges', 'restore'].includes(action)
          )
        : input,
  },
})

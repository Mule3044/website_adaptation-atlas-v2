import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { apiVersion, dataset, projectId } from '@/lib/env'
// import { schema } from '@/schemas/sanity.schema'
import { BiCog } from "react-icons/bi"

import { type SchemaTypeDefinition } from 'sanity'

import page from './schemas/page.schema'
import home from './schemas/home.schema'
import spotlight from './schemas/spotlight.schema'
import settings from './schemas/settings.schema'

const schema: { types: SchemaTypeDefinition[] } = {
  types: [page, home, spotlight, settings],
}

export default defineConfig({
  name: 'ab-atlas',
  title: 'AB Atlas',
  basePath: '/admin',
  apiVersion,
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({
      structure: (S, context) => {
        console.log(context)
        return S.list()
          .title('Base')
          .items([
            // Add a site settings page
            S.listItem()
              .title('Settings')
              .icon(BiCog)
              .child(
                S.editor()
                  .id('settings')
                  .schemaType('settings')
                  .documentId('settings')
              ),
            // Add a visual divider
            S.divider(),
            // Data spotlights
            S.listItem()
              .title('Spotlights')
              .child(
                S.documentTypeList('spotlight')
              )
          ])
      }
    }),
    visionTool()
  ],
})

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { apiVersion, dataset, projectId } from '@/lib/env'
import { schema } from '@/schemas/sanity.schema'

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
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Pages')
              .child(
                // Create singleton pages for home and about
                // This allows you to add custom fields to each page
                // And prevents the user from creating multiple pages
                S.list()
                  .title('Pages')
                  .items([
                    S.listItem()
                      .title('Home')
                      .child(
                        S.editor()
                          .id('home')
                          .schemaType('home')
                          .documentId('home')
                      ),
                  ]),
              ),
          ])
    }),
    visionTool()
  ],
})

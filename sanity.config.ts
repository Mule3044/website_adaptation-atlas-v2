import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { apiVersion, dataset, projectId } from '@/lib/sanity.env'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'
// import { schema } from '@/schemas/sanity.schema'
import { BiCog } from 'react-icons/bi'

import { type SchemaTypeDefinition } from 'sanity'

import home from './schemas/home.schema'
import spotlightPost from './schemas/post-spotlight.schema'
import insightPost from './schemas/post-insight.schema'
import impactPost from './schemas/post-impact.schema'
import settings from './schemas/settings.schema'
import primaryTag from './schemas/tag-primary.schema'
import secondaryTag from './schemas/tag-secondary.schema'
import dataCard from './schemas/data-card.schema'
import contentText from './schemas/content-text.schema'
import contentPage from './schemas/content-page.schema'

const schema: { types: SchemaTypeDefinition[] } = {
  types: [home, spotlightPost, insightPost, impactPost, settings, primaryTag, secondaryTag, dataCard, contentText, contentPage],
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
          .title('Content')
          .items([
            // Site settings
            S.listItem()
              .title('Settings')
              .icon(BiCog)
              .child(
                S.editor()
                  .id('settings')
                  .schemaType('settings')
                  .documentId('settings')
              ),
            // Visual divider
            S.divider(),
            // Posts - these use orderable-document-list to order entries
            orderableDocumentListDeskItem({
              type: 'spotlight',
              title: 'Spotlights',
              S,
              context,
            }),
            orderableDocumentListDeskItem({
              type: 'insight',
              title: 'Data insights',
              S,
              context,
            }),
            orderableDocumentListDeskItem({
              type: 'impact',
              title: 'Data in practice',
              S,
              context,
            }),
            // Visual divider
            S.divider(),
            // Primary tags
            S.listItem()
              .title('Primary tags')
              .child(
                S.documentTypeList('primaryTag')
              ),
            // Secondary tags
            S.listItem()
              .title('Secondary tags')
              .child(
                S.documentTypeList('secondaryTag')
              ),
          ])
      }
    }),
    visionTool()
  ],
})

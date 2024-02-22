import { defineType } from 'sanity'
import VisualDivider from '@/components/sanity/divider'

export default defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  fieldsets: [
    {name: 'editorSettings', title: 'Sanity admin settings', options: {collapsible: true, collapsed: true}},
    {name: 'siteSettings', title: 'Site settings'}
  ],
  fields: [
    {
      name: 'siteTitle',
      title: 'Site title',
      type: 'string',
      fieldset: 'siteSettings'
    },
    {
      name: 'title',
      title: 'Settings editor title',
      type: 'string',
      fieldset: 'editorSettings',
      hidden: true
    },
  ],
})



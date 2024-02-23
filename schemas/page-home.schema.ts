import { defineType } from 'sanity'

export default defineType({
  name: 'home',
  type: 'document',
  title: 'Home',
  fields: [
    {
      name: 'title',
      title: 'Page title',
      type: 'string',
      hidden: true,
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      hidden: true,
    },
    {
      name: 'introText',
      title: 'Site introduction text',
      type: 'text',
    },
    {
      name: 'tout',
      title: 'Get involved tout',
      description: 'Content options for the "Get Involved" section at the bottom of the homepage.',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
        },
        {
          name: 'subtitle',
          title: 'Subtitle',
          type: 'string',
        },
        {
          name: 'descriptionHeader',
          title: 'Description header',
          type: 'string',
        },
        {
          name: 'descriptionBody',
          title: 'Description body',
          type: 'text',
        },
        {
          name: 'buttonLabel',
          title: 'Button label',
          description: 'The label that appears on the call-to-action button.',
          type: 'string',
        },
      ]
    }
  ],
})



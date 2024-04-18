import { defineType } from 'sanity'
// import { Rule } from '@sanity/types'

export default defineType({
  name: 'home',
  type: 'document',
  title: 'Home',
  fields: [
    {
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    },
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
          name: 'featuredImage',
          title: 'Featured image',
          type: 'image',
          description: 'This is the main image for the post. This image will be used in the post header and the gallery on the homepage.',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Alt',
              type: 'string',
              description: 'Provide a concise description of the image for SEO and accessibility purposes.',
            }
          ]
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



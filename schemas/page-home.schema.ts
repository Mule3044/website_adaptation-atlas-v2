import { Rule, defineType } from 'sanity'

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
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    },
    {
      name: 'introText',
      title: 'Site introduction text',
      type: 'text',
    },
    { 
      name: 'subTitle',
      title: 'Sub Title', 
      type: 'array', 
      of: [{type: 'block'}]
    },
    {
      name: 'ctaText',
      title: 'CTA button text',
      type: 'string',
    },
    {
      name: "heroImage",
      title: "Hero Image",
      type: "image"
    },
    {
      name: 'search',
      title: 'Search',
      description: 'Content options for the global search function.',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
        },
        {
          name: 'placeholder',
          title: 'Placeholder',
          type: 'string',
        },
        {
          name: 'placeholderShort',
          title: 'Placeholder (mobile)',
          type: 'string',
        },
        {
          name: 'noResultsMessage',
          title: 'No results message',
          type: 'string',
        },
      ]
    },
    {
      name: 'spotlightCarousel',
      title: 'Spotlight carousel',
      description: 'Content options for the spotlight carousel items.',
      type: 'object',
      fields: [
        {
          name: 'kicker',
          title: 'Kicker',
          type: 'string',
        },
        {
          name: 'buttonLabel',
          title: 'Button label',
          type: 'string',
        },
        {
          name: 'counterLabel',
          title: 'Counter label',
          type: 'string',
        },
      ]
    },
    {
      name: 'pageHeaders',
      title: 'Page headers and labels',
      description: 'Content options for homepage grid and carousels.',
      type: 'object',
      fields: [
        {
          name: 'spotlightTitle',
          title: 'Spotlight grid title',
          type: 'string',
        },
        {
          name: 'spotlightSubtitle',
          title: 'Spotlight grid subtitle',
          type: 'string',
        },
        {
          name: 'filterLabel',
          title: 'Filter label',
          type: 'string',
        },
        {
          name: 'searchPlaceholder',
          title: 'Search placeholder',
          type: 'string',
        },
        {
          name: 'noResultsMessage',
          title: 'No results message',
          type: 'string',
        },
        {
          name: 'comingSoonLabel',
          title: 'Coming soon label',
          type: 'string',
        },
        {
          name: 'upvoteLabel',
          title: 'Upvote label',
          type: 'string',
        },
        {
          name: 'notifyMeLabel',
          title: 'Notify me label',
          type: 'string',
        },
        {
          name: 'notifyMeLink',
          title: 'Notify me link',
          type: 'string',
        },
        {
          name: 'insightTitle',
          title: 'Data Insights carousel title',
          type: 'string',
        },
        {
          name: 'insightSubtitle',
          title: 'Data Insights carousel subtitle',
          type: 'string',
        },
        {
          name: 'impactTitle',
          title: 'Data in Practice carousel title',
          type: 'string',
        },
        {
          name: 'impactSubtitle',
          title: 'Data in Practice carousel subtitle',
          type: 'string',
        },
      ]
    },
    {
      name: 'relatedInfo',
      title: 'Related Information',
      description: 'Content options for the "Related Information" section at the bottom of the homepage.',
      type: 'object',
      fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'title1',
              title: 'SubTitle 1',
              type: 'string',
            },
            {
              name: 'content1',
              title: 'block content 1',
              description: 'Use this rich text input to edit titles, body text and images on the page.',
              type: 'contentText',
              validation: (rule: Rule) => rule.required(),
            },
            {
              name: 'title2',
              title: 'SubTitle 2',
              type: 'string',
            },
            {
              name: 'content2',
              title: 'block content 2',
              description: 'Use this rich text input to edit titles, body text and images on the page.',
              type: 'contentText',
              validation: (rule: Rule) => rule.required(),
            },
            {
              name: 'title3',
              title: 'SubTitle 3',
              type: 'string',
            },
            {
              name: 'content3',
              title: 'block content 3',
              description: 'Use this rich text input to edit titles, body text and images on the page.',
              type: 'contentText',
              validation: (rule: Rule) => rule.required(),
            },
            {
              name: 'title4',
              title: 'SubTitle 4',
              type: 'string',
            },
            {
              name: 'content4',
              title: 'block content 4',
              description: 'Use this rich text input to edit titles, body text and images on the page.',
              type: 'contentText',
              validation: (rule: Rule) => rule.required(),
            }
      ]
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



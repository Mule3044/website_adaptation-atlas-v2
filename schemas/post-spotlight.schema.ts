import { Rule } from '@sanity/types'
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'

const spotlightPost = {
  name: 'spotlight',
  title: 'Spotlights',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "spotlight", newItemPosition: "before" }),
    {
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Provide a concise and descriptive title for the spotlight. This title will appear in the spotlight page header and the spotlight gallery on the homepage.',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Click "Generate" to automatically create a slug from the page title or write a custom slug separated by hyphens. This will appear in the URL for this page.',
      options: { source: 'title' },
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'comingSoon',
      title: 'Coming Soon',
      description: 'Check this box if the spotlight is coming soon. This can be used to indicate upcoming content.',
      type: 'boolean',
    },
    {
      name: 'featuredImage',
      title: 'Featured image',
      type: 'image',
      description: 'This is the main image for the spotlight. Please choose a high-quality image with a central focus point. This image will be used in the spotlight page header and the spotlight gallery on the homepage.',
      options: { hotspot: true },
      validation: (rule: Rule) => rule.required(),
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
      title: 'Observable Notebook URL',
      name: 'url',
      type: 'url',
      description: 'Include an external link to the related Observable Notebook.',
    },
    {
      name: 'content',
      title: 'Content',
      description: 'Use this rich text input to edit titles, body text and images on the page.',
      type: 'contentText',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'dataCard',
      type: 'dataCard',
    },
    {
      name: 'tags',
      title: 'Tags',
      description: 'Choose primary and secondary tags related to this spotlight.',
      type: 'object',
      fields: [
        {
          name: 'featured',
          title: 'Featured tags',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'primaryTag' }] }],
          description: 'Select up to three featured tags for this spotlight. These will appear below the spotlight thumbnail on the homepage.',
          validation: (rule: Rule) => rule.max(3), // Enforces three maximum featured tags
        },
        {
          name: 'primary',
          title: 'Primary tags',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'primaryTag' }] }],
          description: 'Select primary tags for this spotlight. Primary tags appear on the homepage and spotlight detail page.',
        },
        {
          name: 'secondary',
          title: 'Secondary tags',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'secondaryTag' }] }],
          description: 'Select secondary tags for this spotlight. Secondary tags only appear on the spotlight detail page.',
        },
      ]
    },
    {
      name: 'carousel',
      title: 'Carousel content',
      description: 'Provide a title and description to use for this spotlight to be used on the homepage feature carousel.',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Carousel title',
          type: 'string',
        },
        {
          name: 'description',
          title: 'Carousel description',
          type: 'text',
        },
      ]
    },
    {
      name: 'relatedPosts',
      title: 'Related posts',
      description: 'Select up to five posts to feature in the "related posts" section below the content on the page.',
      type: 'array',
      of: [{
        type: 'reference', to: [
          { type: 'spotlight' },
          { type: 'insight' },
          { type: 'impact' },
        ]
      }],
      validation: (rule: Rule) => rule.max(5), // Enforces five maximum related posts
    },
  ]
}

export default spotlightPost
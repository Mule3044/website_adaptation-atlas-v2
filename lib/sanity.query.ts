import { groq } from 'next-sanity'
import { getClient } from './sanity.client'
import { Home, Page, Spotlight, Impact, Insight, Tag } from '@/types/sanity.types'

// Homepage content
export async function getHomeContent(): Promise<Home> {
  return getClient.fetch(
    groq`*[_type == 'home' && _id == 'home'][0] {
      _id,
      _createdAt,
      title,
      introText,
      'slug': slug.current,
      'tout': {
        ...tout,
        'featuredImage': tout.featuredImage.asset->url,
        'featuredImageAlt': tout.featuredImage.alt
      },
    }`,
    {},
    {next: {
      revalidate: 300 // look for updates to revalidate cache every hour
    }}
  )
}

// About page content
export async function getAboutContent(): Promise<Page> {
  return getClient.fetch(
    groq`*[_type == 'about' && _id == 'about'][0] {
      _id,
      _createdAt,
      title,
      'slug': slug.current,
      content,
    }`,
    {},
    {next: {
      revalidate: 300 // look for updates to revalidate cache every hour
    }}
  )
}

// Get involved page content
export async function getGetInvolvedContent(): Promise<Page> {
  return getClient.fetch(
    groq`*[_type == 'getInvolved' && _id == 'getInvolved'][0] {
      _id,
      _createdAt,
      title,
      'slug': slug.current,
      content,
    }`,
    {},
    {next: {
      revalidate: 300 // look for updates to revalidate cache every hour
    }}
  )
}

// Data spotlights
export async function getSpotlights(): Promise<Spotlight[]> {
  return getClient.fetch(
    groq`*[_type == 'spotlight' && language != 'fr']|order(orderRank) {
      _id,
      _createdAt,
      title,
      'carousel': carousel,
      'slug': slug.current,
      'featuredImage': featuredImage.asset->url,
      'featuredImageAlt': featuredImage.asset->alt,
      'featuredTags': tags.featured[]->{
        _id,
        name,
        slug,
      },
      'primaryTags': tags.primary[]->{
        _id,
        name,
        slug,
      },
      'secondaryTags': tags.secondary[]->{
        _id,
        name,
        slug,
      },
    }`,
    {},
    {next: {
      revalidate: 300 // look for updates to revalidate cache every hour
    }}
  )
}

// Get all data insights posts
export async function getInsights(): Promise<Insight[]> {
  return getClient.fetch(
    groq`*[_type == 'insight' && language != 'fr']|order(orderRank) {
      _id,
      _createdAt,
      title,
      'slug': slug.current,
      'featuredImage': featuredImage.asset->url,
      'featuredImageAlt': featuredImage.asset->alt,
    }`,
    {},
    {next: {
      revalidate: 300 // look for updates to revalidate cache every hour
    }}
  )
}

// Get all data in practice (impact) posts
export async function getImpacts(): Promise<Impact[]> {
  return getClient.fetch(
    groq`*[_type == 'impact' && language != 'fr']|order(orderRank) {
      _id,
      _createdAt,
      title,
      'slug': slug.current,
      'featuredImage': featuredImage.asset->url,
      'featuredImageAlt': featuredImage.asset->alt,
    }`,
    {},
    {next: {
      revalidate: 300 // look for updates to revalidate cache every hour
    }}
  )
}

// Function for getting a single spotlight post
export async function getSpotlightPost(slug: string): Promise<Spotlight> {
  return getClient.fetch(
    groq`*[_type == 'spotlight' && slug.current == $slug][0]{
      _id,
      _createdAt,
      title,
      'slug': slug.current,
      'featuredImage': featuredImage.asset->url,
      'featuredImageAlt': featuredImage.asset->alt,
      url,
      content,
      'dataCard': {
        ...dataCard,
        'featuredImage': dataCard.image.asset->url,
        'featuredImageAlt': dataCard.image.alt
      },
      'featuredTags': tags.featured[]->{
        _id,
        name,
        slug,
      },
      'primaryTags': tags.primary[]->{
        _id,
        name,
        slug,
      },
      'secondaryTags': tags.secondary[]->{
        _id,
        name,
        slug,
      },
    }`,
    { slug }
  )
}

// Function for getting a single data insight post
export async function getInsightPost(slug: string): Promise<Insight> {
  return getClient.fetch(
    groq`*[_type == 'insight' && slug.current == $slug][0]{
      _id,
      _createdAt,
      title,
      'slug': slug.current,
      'featuredImage': featuredImage.asset->url,
      'featuredImageAlt': featuredImage.asset->alt,
      content,
      methods,
    }`,
    { slug }
  )
}

// Function for getting a single data in practice (impact) post
export async function getImpactPost(slug: string): Promise<Impact> {
  return getClient.fetch(
    groq`*[_type == 'impact' && slug.current == $slug][0]{
      _id,
      _createdAt,
      title,
      'slug': slug.current,
      'featuredImage': featuredImage.asset->url,
      'featuredImageAlt': featuredImage.asset->alt,
      content,
    }`,
    { slug }
  )
}

// Primary tags
export async function getPrimaryTags(): Promise<Tag[]> {
  return getClient.fetch(
    groq`*[_type == 'primaryTag']|order(orderRank) {
      _id,
      _createdAt,
      name,
      'slug': slug.current,
    }`,
    {},
    {next: {
      revalidate: 300 // look for updates to revalidate cache every hour
    }}
  )
}

// Secondary tags
export async function getSecondaryTags(): Promise<Tag[]> {
  return getClient.fetch(
    groq`*[_type == 'secondaryTag']|order(orderRank) {
      _id,
      _createdAt,
      name,
      'slug': slug.current,
    }`,
    {},
    {next: {
      revalidate: 300 // look for updates to revalidate cache every hour
    }}
  )
}

import { groq } from 'next-sanity'
import { getClient } from './sanity.client'
import { Home, Spotlight, Tag } from '@/types/sanity.types'

// Homepage content
export async function getHomeContent(): Promise<Home> {
  return getClient.fetch(
    groq`*[_type == 'home' && _id == 'home'][0] {
      _id,
      _createdAt,
      title,
      introText,
      'slug': slug.current,
    }`
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
      }
    }`
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
    }`
  )
}

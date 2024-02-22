import { groq } from 'next-sanity'
import { getClient } from './sanity.client'
import { Home, Spotlight } from '@/types/sanity.types'

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
export async function getSpotlights(): Promise<Spotlight> {
  return getClient.fetch(
    groq`*[_type == 'spotlight' && _id == 'spotlight'][0] {
      _id,
      _createdAt,
      title,
      introText,
      'slug': slug.current,
    }`
  )
}

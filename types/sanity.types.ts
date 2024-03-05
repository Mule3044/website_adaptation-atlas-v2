// import { PortableTextBlock } from 'sanity'

export type Tag = {
  _id: string
  _createdAt: Date
  name: string
  slug: string
}

export type Home = {
  _id: string
  _createdAt: Date
  title: string
  slug: string
  introText: string
}

type Carousel = {
  title: string
  description: string
}

export type Spotlight = {
  _id: string
  _createdAt: Date
  title: string
  slug: string
  featuredImage: string
  featuredImageAlt: string
  carousel: Carousel
  featuredTags: Tag[]
}

export type Insight = {
  _id: string
  _createdAt: Date
  title: string
  slug: string
  featuredImage: string
  featuredImageAlt: string
}

export type Impact = {
  _id: string
  _createdAt: Date
  title: string
  slug: string
  featuredImage: string
  featuredImageAlt: string
}
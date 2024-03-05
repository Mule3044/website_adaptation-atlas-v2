// import { PortableTextBlock } from 'sanity'

export type Tag = {
  _id: string
  _createdAt: Date
  name: string
  slug: string
}

type Tout = {
  _id: string
  _createdAt: Date
  title: string
  subtitle: string
  featuredImage: string
  featuredImageAlt: string
  descriptionHeader: string
  descriptionBody: string
  buttonLabel: string
}

export type Home = {
  _id: string
  _createdAt: Date
  title: string
  slug: string
  introText: string
  tout: Tout
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
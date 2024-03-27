import { PortableTextBlock } from 'sanity'

export type Tag = {
  _id: string
  _createdAt: Date
  name: string
  slug: string
}

type Observable = {
  embedCode: string
  src: string
  height: number
}

export type DataCard = {
  title: string
  description: string
  observable: Observable
  featuredImage: string
  featuredImageAlt: string
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

export type Page = {
  _id: string
  _createdAt: Date
  title: string
  slug: string
  content: PortableTextBlock[]
}

type Carousel = {
  title: string
  description: string
}

export type SearchItem = {
  _id: string
  _type: string
  title: string
  slug: string
  featuredTags: Tag[]
  primaryTags: Tag[]
  secondaryTags: Tag[]
  content: PortableTextBlock[]
}

export type Spotlight = {
  _id: string
  _createdAt: Date
  title: string
  slug: string
  featuredImage: string
  featuredImageAlt: string
  url: string
  carousel: Carousel
  featuredTags: Tag[]
  primaryTags: Tag[]
  secondaryTags: Tag[]
  content: PortableTextBlock[]
  dataCard: DataCard
}

export type Insight = {
  _id: string
  _createdAt: Date
  title: string
  slug: string
  featuredImage: string
  featuredImageAlt: string
  content: PortableTextBlock[]
  methods: PortableTextBlock[]
}

export type Impact = {
  _id: string
  _createdAt: Date
  title: string
  slug: string
  featuredImage: string
  featuredImageAlt: string
  content: PortableTextBlock[]
}
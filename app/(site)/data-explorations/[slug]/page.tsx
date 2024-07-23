import Image from 'next/image'
import { getSpotlightPost } from '@/lib/sanity.query'
import { PortableText } from '@portabletext/react'
import { portableTextPost } from '@/components/sanity/portable-text-post'
import iconBars from '@/public/images/icon-bars.svg'
import RelatedPosts from '@/components/posts/related-posts'
import { Metadata } from 'next'
import { siteTitle } from '@/lib/constants'
import { useLanguageContext } from '@/contexts/language-context'
import SpotlightContent from '@/components/posts/spotlight-content'

type Props = {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  // read route params
  const id = params.slug

  // fetch data
  const post = await getSpotlightPost(params.slug)

  return {
    title: `${post.title} | ${siteTitle}`,
  }
}

export default async function SpotlightPost({ params }: Props) {
  const post = await getSpotlightPost(params.slug)

  return (
    <SpotlightContent post={post} />
  )
}

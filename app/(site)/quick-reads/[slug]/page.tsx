import { getInsightPost } from '@/lib/sanity.query'
import { PortableText } from '@portabletext/react'
import { portableTextPost } from '@/components/sanity/portable-text-post'
import iconBadge from '@/public/images/icon-badge.svg'
import RelatedPosts from '@/components/posts/related-posts'
import { Metadata } from 'next'
import { siteTitle } from '@/lib/constants'
import PostHeader from '@/components/posts/post-header'
import Methods from '@/components/posts/methods'

type Props = {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  // read route params
  const id = params.slug

  // fetch data
  const post = await getInsightPost(params.slug)

  return {
    title: `${post.title} | ${siteTitle}`,
  }
}

export default async function InsightPost({ params }: Props) {
  const post = await getInsightPost(params.slug)

  return (
    <div id='insight-post' className='p-5 mt-20 lg:mt-32'>
      <PostHeader type='insight' title={post.title} icon={iconBadge} iconAlt='Badge icon' />

      <div id='post-content' className='mb-20'>
        <PortableText value={post.content} components={portableTextPost} />
      </div>

      {post.methods &&
        <Methods post={post} />
      }
      
      {post.relatedPosts &&
        <RelatedPosts posts={post.relatedPosts} />
      }
    </div>
  )
}

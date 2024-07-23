import { getImpactPost } from '@/lib/sanity.query'
import { PortableText } from '@portabletext/react'
import { portableTextPost } from '@/components/sanity/portable-text-post'
import iconPage from '@/public/images/icon-page.svg'
import RelatedPosts from '@/components/posts/related-posts'
import { Metadata } from 'next'
import { siteTitle } from '@/lib/constants'
import PostHeader from '@/components/posts/post-header'

type Props = {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  // read route params
  const id = params.slug

  // fetch data
  const post = await getImpactPost(params.slug)

  return {
    title: `${post.title} | ${siteTitle}`,
  }
}

export default async function ImpactPost({ params }: Props) {
  const post = await getImpactPost(params.slug)

  return (
    <div id='impact-post' className='p-5 mt-20 lg:mt-32'>
      <PostHeader type='impact' title={post.title} icon={iconPage} iconAlt='Page icon' />

      <div id='post-content' className='mb-[100px]'>
        <PortableText value={post.content} components={portableTextPost} />
      </div>

      {post.relatedPosts &&
        <RelatedPosts posts={post.relatedPosts} />
      }
    </div>
  )
}

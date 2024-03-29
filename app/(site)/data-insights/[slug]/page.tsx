'use client'

import Image from 'next/image'
import { getInsightPost } from '@/lib/sanity.query'
import { PortableText } from '@portabletext/react'
import { portableTextPost } from '@/components/sanity/portable-text-post'
import iconBadge from '@/public/images/icon-badge.svg'

type Props = {
  params: { slug: string }
}

export default async function InsightPost({ params }: Props) {
  const post = await getInsightPost(params.slug)

  return (
    <div id='impact-post' className='p-5 mt-20 lg:mt-32'>
      <header className='max-w-[960px] mx-auto mb-16'>
        <div className='flex gap-3 items-end mb-3'>
          <div className='p-2 bg-black'>
            <Image
              src={iconBadge}
              alt={'Page icon'}
              width={15}
            />
          </div>
          <span className='uppercase leading-none font-medium'>Data Insight</span>
        </div>
        <h1 className='page-header'>{post.title}</h1>
      </header>

      <div id='post-content' className='mb-20'>
        <PortableText value={post.content} components={portableTextPost} />
      </div>

      {post.methods &&
        <div id='post-methods'>
          <h2 className='max-w-[960px] mx-auto text-2xl font-medium tracking-normal leading-[42px] mb-6'>Methods</h2>
          <PortableText value={post.methods} components={portableTextPost} />
        </div>
      }
    </div>
  )
}

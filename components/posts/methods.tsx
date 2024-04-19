'use client'

import { PortableText } from '@portabletext/react'
import { portableTextPost } from '@/components/sanity/portable-text-post'
import { useSanityData } from '@/contexts/data-context'
import { Insight } from '@/types/sanity.types'

type Props = {
  post: Insight
}

const Methods = ({ post }: Props) => {
  const {
    siteSettings,
  } = useSanityData()

  if (siteSettings) {
    return (
      <div id='post-methods'>
        <h2 className='max-w-[940px] mx-auto text-2xl font-medium tracking-normal leading-[42px] mb-6'>{siteSettings.postOptions.methodsTitle}</h2>
        <PortableText value={post.methods} components={portableTextPost} />
      </div>
    )
  }
}

export default Methods
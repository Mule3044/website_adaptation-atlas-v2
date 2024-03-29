import Image from 'next/image'
import { getImpactPost } from '@/lib/sanity.query'
import { PortableText } from '@portabletext/react'
import { portableTextPost } from '@/components/sanity/portable-text-post'
import iconPage from '@/public/images/icon-page.svg'

type Props = {
  params: { slug: string }
}

export default async function ImpactPost({ params }: Props) {
  const post = await getImpactPost(params.slug)

  return (
    <div id='impact-post' className='p-5 mt-32'>
      <header className='max-w-[960px] mx-auto mb-16'>
        <div className='flex gap-3 items-end mb-3'>
          <div className='p-2 bg-black'>
            <Image
              src={iconPage}
              alt={'Page icon'}
              width={15}
            />
          </div>
          <span className='uppercase leading-none font-medium'>Data in Practice</span>
        </div>
        <h1 className='page-header'>{post.title}</h1>
        {/* <h1 className='text-4xl text-brand-green font-semibold leading-tight mb-10'>{post.title}</h1> */}
      </header>

      <div id='post-content' className='mb-[100px]'>
        <PortableText value={post.content} components={portableTextPost} />
      </div>
    </div>
  )
}

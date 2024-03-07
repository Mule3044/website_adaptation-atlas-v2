import Image from 'next/image'
import Link from 'next/link'
import { getSpotlightPost } from '@/lib/sanity.query'
import { PortableText } from '@portabletext/react'
import { portableTextPost } from '@/components/sanity/portable-text-post'
import iconBars from '@/public/images/icon-bars.svg'

type Props = {
  params: { slug: string }
}

export default async function SpotlightPost({ params }: Props) {
  const post = await getSpotlightPost(params.slug)

  return (
    <div id='impact-post' className='p-5 mt-3'>
      <header className='relative w-full h-[800px] flex justify-center items-center mb-20'>
        <Image
          src={post.featuredImage}
          alt={post.featuredImageAlt}
          layout='fill'
          objectFit='cover'
        />
        <div className='relative h-[575px] w-[575px] p-[100px] flex justify-center items-center flex-col text-center rounded-full bg-white z-50'>
          <div className='inline-block p-2 mb-2 bg-black'>
            <Image
              src={iconBars}
              alt={'Page icon'}
              width={20}
            />
          </div>
          <span className='uppercase leading-none font-medium mb-5'>Data Spotlight</span>
          <h1 className='text-[28px] font-semibold leading-tight'>{post.title}</h1>
        </div>
      </header>

      {post.url &&
        <div id='observable-link' className='flex justify-center mb-20'>
          <Link
            href={post.url}
            className='relative w-[690px] flex items-center px-6 py-4 bg-brand-green'
          >
            <Image src={'/images/observable-logo.svg'} alt={'Page icon'} width={22} height={21} />
            <span className='text-2xl text-white pl-5'>Explore Spotlight on Observable</span>
            <Image className='absolute right-6' src={'/images/icon-link.svg'} alt={'Page icon'} width={14} height={14} />
          </Link>
        </div>
      }

      {(post.primaryTags || post.secondaryTags) &&
        <div id='key-concepts' className='mb-16'>
          <h2 className='max-w-[960px] mx-auto text-2xl font-medium tracking-normal leading-[42px] mb-6'>Key Concepts</h2>
          <ul className='max-w-[960px] mx-auto list-none leading-[42px]'>
            {post.primaryTags && post.primaryTags.map((tag, index) => {
              return (
                <li className='inline-block text-2xl font-normal tracking-normal'>{tag.name}<span className='px-3'>•</span></li>
              )
            })}
            {post.secondaryTags && post.secondaryTags.map((tag, index) => {
              return (
                <li className='inline-block text-2xl font-normal tracking-normal'>{tag.name}<span className='px-3'>•</span></li>
              )
            })}
          </ul>
        </div>
      }

      <div id='about-content' className='mb-[100px]'>
        <PortableText value={post.content} components={portableTextPost} />
      </div>
    </div>
  )
}

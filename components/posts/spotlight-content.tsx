'use client'

import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { portableTextPost } from '@/components/sanity/portable-text-post'
import iconBars from '@/public/images/icon-bars.svg'
import RelatedPosts from '@/components/posts/related-posts'
import { useSanityData } from '@/contexts/data-context'
import { Spotlight } from '@/types/sanity.types'

type Props = {
  post: Spotlight
}

const SpotlightContent = ({ post }: Props) => {
  const {
    siteSettings,
  } = useSanityData()

  if (siteSettings) {
    // Post options
    const options = siteSettings.postOptions
    // Post content elements
    const dataCardImage = post.dataCard?.featuredImage
    const dataCardAlt = post.dataCard?.featuredImageAlt
    const dataCardEmbedSrc = post.dataCard.observable?.src
    const dataCardEmbedHeight = post.dataCard.observable?.height

    return (
      <div id='spotlight-post' className='p-5 mt-2 mb-[60px] lg:mb-[100px]'>
        <header className='w-full mb-20'>
          <div id='featured-image' className='relative w-full h-[600px] lg:h-[800px] flex justify-center items-center'>
            <Image
              src={post.featuredImage}
              alt={(post.featuredImageAlt) ? post.featuredImageAlt : 'Featured image'}
              fill // fill available space
              priority // prioritize above the fold images
              style={{ objectFit: 'cover' }} // NextJS 13+ Image accepts style property
            />
            <div className='relative h-[340px] w-[340px] p-[40px] lg:h-[575px] lg:w-[575px] lg:p-[100px] flex justify-center items-center flex-col text-center rounded-full bg-white z-10'>
              <div className='inline-block p-2 mb-2 bg-black'>
                <Image
                  src={iconBars}
                  alt={'Page icon'}
                  width={20}
                  height={20}
                />
              </div>
              <span className='uppercase leading-none font-medium mb-5'>{siteSettings.contentTypes.spotlightsTitle}</span>
              {/* <h1 className='text-[28px] font-semibold leading-tight'>{post.title}</h1> */}
              <h2 className='mb-3'>{post.title}</h2>
            </div>
          </div>
          {/* Get image credit if it exists */}
          {post.featuredImageCredit &&
            <p id='image-credit' className='font-normal text-sm mt-3'><span className='font-semibold'>{options.creditLabel} </span>{post.featuredImageCredit}</p>
          }
        </header>

        {post.url &&
          <div id='observable-link' className='flex justify-center mb-20'>
            <a
              href={post.url}
              className='relative w-full max-w-[940px] flex items-center px-6 py-4 transition-colors bg-brand-green hover:bg-brand-dark-green'
              target='_blank'
              rel='noopener noreferrer'
            >
              <Image src={'/images/observable-logo.svg'} alt={'Page icon'} width={22} height={21} />
              <span className='text-xl lg:text-2xl text-white pl-5'>{options.exploreLinkLabel}</span>
              <Image className='absolute right-6' src={'/images/icon-link.svg'} alt={'Page icon'} width={14} height={14} />
            </a>
          </div>
        }

        {(post.primaryTags || post.secondaryTags) && (
          <div id='key-concepts' className='mb-16'>
            <h2 className='max-w-[940px] mx-auto mb-6'>{options.tagsTitle}</h2>
            <ul className='relative max-w-[940px] mx-auto list-none leading-[42px] -left-[30px]'>
              {[...(post.primaryTags || []), ...(post.secondaryTags || [])].map((tag, index, array) => {
                // Check if the current tag is the last in the array
                const isLastItem = index === array.length - 1;
                return (
                  <li key={tag._id} className='inline-block'>
                    {tag.name}
                    {/* Conditionally render the separator */}
                    {!isLastItem && <span className='px-3'>•</span>}
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        <div id='post-content'>
          <PortableText value={post.content} components={portableTextPost} />
        </div>

        {/* Data card with observable embed or preview image */}
        {(dataCardImage || dataCardEmbedSrc) &&
          <div id='data-card' className='max-w-[940px] mx-auto mb-[100px]'>
            <div className='mb-10'>
              <h2 className='mb-4'>{options.previewLabel} {post.dataCard.title}</h2>
              <p className='page-text'>{post.dataCard.description}</p>
            </div>
            <div className='mb-12 border border-grey-200'>
              {/* If observable embed exists, display embed */}
              {dataCardEmbedSrc &&
                <iframe width='100%' height={dataCardEmbedHeight} src={dataCardEmbedSrc}></iframe>
              }
              {/* If preview image exists and embed doesn't, display image */}
              {(dataCardImage && !dataCardEmbedSrc) &&
                <a
                  href={post.url}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Image
                    src={dataCardImage}
                    alt={dataCardAlt}
                    layout='responsive'
                    width={1920}
                    height={1080}
                  />
                </a>
              }
            </div>
            <a
              href={post.url}
              className='relative w-full flex items-center px-6 py-4 transition-colors bg-brand-green hover:bg-brand-dark-green'
              target='_blank'
              rel='noopener noreferrer'
            >
              <Image src={'/images/observable-logo.svg'} alt={'Page icon'} width={22} height={21} />
              <span className='text-xl lg:text-2xl text-white pl-5'>{options.ctaLinkLabel}</span>
              <Image className='absolute right-6' src={'/images/icon-link.svg'} alt={'Page icon'} width={14} height={14} />
            </a>
          </div>
        }

        {post.relatedPosts &&
          <RelatedPosts posts={post.relatedPosts} />
        }
      </div>
    )
  }
}

export default SpotlightContent
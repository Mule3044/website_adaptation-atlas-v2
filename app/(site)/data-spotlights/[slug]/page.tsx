import Image from 'next/image'
import { getSpotlightPost } from '@/lib/sanity.query'
import { PortableText } from '@portabletext/react'
import { portableTextPost } from '@/components/sanity/portable-text-post'
import iconBars from '@/public/images/icon-bars.svg'
import RelatedPosts from '@/components/posts/related-posts'
import { Metadata } from 'next'
import { siteTitle } from '@/lib/constants'

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
  const dataCardImage = post.dataCard?.featuredImage
  const dataCardAlt = post.dataCard?.featuredImageAlt
  const dataCardEmbedSrc = post.dataCard.observable?.src
  const dataCardEmbedHeight = post.dataCard.observable?.height
  // relatedPosts: [
  //   {
  //     title: 'On-farm Solutions for Today',
  //     slug: 'on-farm-solutions',
  //     _id: '1fe2aab8-12fb-4d99-815f-ed5d4f274d14',
  //     _type: 'spotlight'
  //   },
  //   {
  //     slug: 'economic-returns',
  //     _id: 'c8d356ea-a4c8-4e40-8544-e43f84c06749',
  //     _type: 'spotlight',
  //     title: 'Estimating Economic Returns on Adaptation'
  //   },
  //   {
  //     title: 'Prioritizing Livestock Investments',
  //     slug: 'livestock-investments',
  //     _id: '8ee33480-3337-452e-89c8-e1259bb13d4e',
  //     _type: 'spotlight'
  //   }
  // ],

  return (
    <div id='impact-post' className='p-5 mt-2 mb-[60px] lg:mb-[100px]'>
      <header className='relative w-full h-[600px] lg:h-[800px] flex justify-center items-center mb-20'>
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
          <span className='uppercase leading-none font-medium mb-5'>Data Spotlight</span>
          {/* <h1 className='text-[28px] font-semibold leading-tight'>{post.title}</h1> */}
          <h2 className='mb-3'>{post.title}</h2>
        </div>
      </header>

      {post.url &&
        <div id='observable-link' className='flex justify-center mb-20'>
          <a
            href={post.url}
            className='relative w-[690px] flex items-center px-6 py-4 transition-colors bg-brand-green hover:bg-brand-dark-green'
            target='_blank'
            rel='noopener noreferrer'
          >
            <Image src={'/images/observable-logo.svg'} alt={'Page icon'} width={22} height={21} />
            <span className='text-xl lg:text-2xl text-white pl-5'>Explore Spotlight on Observable</span>
            <Image className='absolute right-6' src={'/images/icon-link.svg'} alt={'Page icon'} width={14} height={14} />
          </a>
        </div>
      }

      {(post.primaryTags || post.secondaryTags) && (
        <div id='key-concepts' className='mb-16'>
          <h2 className='max-w-[960px] mx-auto mb-6'>Key Concepts</h2>
          <ul className='relative max-w-[960px] mx-auto list-none leading-[42px] -left-[30px]'>
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
        <div id='data-card' className='flex flex-col lg:flex-row gap-5 justify-between items-center'>
          <div className='w-full mb-12 lg:w-2/3 lg:mb-0 order-2 lg:order-1'>
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
          <div className='w-full lg:w-1/3 order-1 lg:order-2'>
            <h3 className='uppercase text-grey-600 font-medium mb-0.5'>Preview</h3>
            <h4 className='text-[28px] font-semibold mb-4'>{post.dataCard.title}</h4>
            <p className='text-[18px] mb-10'>{post.dataCard.description}</p>
            <a
              href={post.url}
              className='relative w-full flex items-center px-6 py-4 transition-colors bg-brand-green hover:bg-brand-dark-green'
              target='_blank'
              rel='noopener noreferrer'
            >
              <Image src={'/images/observable-logo.svg'} alt={'Page icon'} width={22} height={21} />
              <span className='text-xl lg:text-2xl text-white pl-5'>Explore Full Spotlight</span>
              <Image className='absolute right-6' src={'/images/icon-link.svg'} alt={'Page icon'} width={14} height={14} />
            </a>
          </div>
        </div>
      }

      {post.relatedPosts &&
        <RelatedPosts posts={post.relatedPosts} />
      }
    </div>
  )
}

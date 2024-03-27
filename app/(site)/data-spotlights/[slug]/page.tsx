import Image from 'next/image'
import { getSpotlightPost } from '@/lib/sanity.query'
import { PortableText } from '@portabletext/react'
import { portableTextPost } from '@/components/sanity/portable-text-post'
import iconBars from '@/public/images/icon-bars.svg'

type Props = {
  params: { slug: string }
}

export default async function SpotlightPost({ params }: Props) {
  const post = await getSpotlightPost(params.slug)
  const dataCardImage = post.dataCard?.featuredImage
  const dataCardAlt = post.dataCard?.featuredImageAlt
  const dataCardEmbedSrc = post.dataCard.observable?.src
  const dataCardEmbedHeight = post.dataCard.observable?.height

  return (
    <div id='impact-post' className='p-5 mt-2 mb-[100px]'>
      <header className='relative w-full h-[800px] flex justify-center items-center mb-20'>
        <Image
          src={post.featuredImage}
          alt={(post.featuredImageAlt) ? post.featuredImageAlt : 'Featured image'}
          fill // fill available space
          priority // prioritize above the fold images
          style={{ objectFit: "cover" }} // NextJS 13+ Image accepts style property
        />
        <div className='relative h-[575px] w-[575px] p-[100px] flex justify-center items-center flex-col text-center rounded-full bg-white z-10'>
          <div className='inline-block p-2 mb-2 bg-black'>
            <Image
              src={iconBars}
              alt={'Page icon'}
              width={20}
              height={20}
            />
          </div>
          <span className='uppercase leading-none font-medium mb-5'>Data Spotlight</span>
          <h1 className='text-[28px] font-semibold leading-tight'>{post.title}</h1>
        </div>
      </header>

      {post.url &&
        <div id='observable-link' className='flex justify-center mb-20'>
          <a
            href={post.url}
            className='relative w-[690px] flex items-center px-6 py-4 transition-colors bg-brand-green hover:bg-brand-dark-green'
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={'/images/observable-logo.svg'} alt={'Page icon'} width={22} height={21} />
            <span className='text-2xl text-white pl-5'>Explore Spotlight on Observable</span>
            <Image className='absolute right-6' src={'/images/icon-link.svg'} alt={'Page icon'} width={14} height={14} />
          </a>
        </div>
      }

      {(post.primaryTags || post.secondaryTags) && (
        <div id='key-concepts' className='mb-16'>
          <h2 className='max-w-[960px] mx-auto text-2xl font-medium tracking-normal leading-[42px] mb-6'>Key Concepts</h2>
          <ul className='relative max-w-[960px] mx-auto list-none leading-[42px] -left-[30px]'>
            {[...(post.primaryTags || []), ...(post.secondaryTags || [])].map((tag, index, array) => {
              // Check if the current tag is the last in the array
              const isLastItem = index === array.length - 1;
              return (
                <li key={tag._id} className='inline-block text-2xl font-normal tracking-normal'>
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
        <div id='data-card' className='flex gap-5 justify-between items-center'>
          <div className='w-2/3'>
            {/* If observable embed exists, display embed */}
            {dataCardEmbedSrc &&
              <iframe width="100%" height={dataCardEmbedHeight} src={dataCardEmbedSrc}></iframe>
            }
            {/* If preview image exists and embed doesn't, display image */}
            {(dataCardImage && !dataCardEmbedSrc) &&
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
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
          <div className='w-1/3'>
            <h3 className='uppercase text-grey-600 font-medium mb-0.5'>Preview</h3>
            <h4 className='text-[28px] font-semibold mb-4'>{post.dataCard.title}</h4>
            <p className='text-[18px] mb-10'>{post.dataCard.description}</p>
            <a
              href={post.url}
              className='relative w-full flex items-center px-6 py-4 transition-colors bg-brand-green hover:bg-brand-dark-green'
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={'/images/observable-logo.svg'} alt={'Page icon'} width={22} height={21} />
              <span className='text-2xl text-white pl-5'>Explore Full Spotlight</span>
              <Image className='absolute right-6' src={'/images/icon-link.svg'} alt={'Page icon'} width={14} height={14} />
            </a>
          </div>
        </div>
      }
    </div>
  )
}

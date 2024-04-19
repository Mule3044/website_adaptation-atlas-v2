import Image from 'next/image'
import { getClient } from '@/lib/sanity.client'
import imageUrlBuilder from '@sanity/image-url'
import { PortableText } from '@portabletext/react'

const builder = imageUrlBuilder(getClient);

function urlFor(source: any) {
  return builder.image(source)
}

const ImageComponent = ({ value }: any) => {
  // Directly access the '_ref' property of the asset object
  const imageRef = value.asset?._ref;
  // Use 'urlFor' to generate the URL from the reference
  const imageUrl = imageRef ? urlFor({ _type: 'reference', _ref: imageRef }).url() : '';

  // If image URL doesn't exist, don't render
  if (!imageUrl) return

  return (
    <div className='mb-20'>
      <Image
        src={imageUrl}
        alt={value.alt}
        layout='responsive'
        width={1440}
        height={1440}
      />
      {value.caption &&
        <div id='image-caption' className='caption'>
          <PortableText value={value.caption} />
        </div>
      }
    </div>
  )
}

const GalleryImageComponent = ({ value }: any) => {
  // Directly access the '_ref' property of the asset object
  const imageRef = value.asset?._ref;
  // Use 'urlFor' to generate the URL from the reference
  const imageUrl = imageRef ? urlFor({ _type: 'reference', _ref: imageRef }).url() : '';

  // If image URL doesn't exist, don't render
  if (!imageUrl) return

  return (
    <Image
      src={imageUrl}
      alt={value.alt}
      width={480}
      height={480}
      className={'w-[300px] h-fit'}
    />
  )
}

export const portableTextPage = {
  types: {
    image: ImageComponent,
    gallery: ({ value }: any) => {
      return (
        <div id='gallery' className='max-w-[940px] mx-auto mb-20 pt-[40px] flex justify-center flex-wrap items-center gap-4'>
          {value.images.map((image: any) => (
            GalleryImageComponent({
              value: image
            })
          ))}
        </div>
      )
    },
  },

  block: {
    h1: ({ children }: any) => <h1 className='max-w-[940px] mx-auto mb-8 page-header'>{children}</h1>,
    h2: ({ children }: any) => <h2 className='max-w-[940px] mx-auto mb-2'>{children}</h2>,
    normal: ({ children }: any) => {
      if (children[0]) {
        return <p className='page-text max-w-[940px] mx-auto'>{children}</p>
      } else {
        return <br />
      }
    },
  },

  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
      const target = !value.href.startsWith('/') ? '_blank' : undefined
      return (
        <a href={value.href} rel={rel} target={target} className='underline hover:text-brand-green transition-colors'>
          {children}
        </a>
      )
    },
  },
}


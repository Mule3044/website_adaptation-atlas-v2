import Image from 'next/image'
import { getClient } from '@/lib/sanity.client'
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(getClient);

function urlFor(source: any) {
  return builder.image(source)
}

const ImageComponent = ({ value }: any) => {
  const imageUrl = urlFor(value)

  return (
    <Image
      src={imageUrl.width(960).url()}
      alt={value.alt}
      layout='responsive'
      width={960}
      height={960}
      className={'mb-20'}
    />
  )
}

const GalleryImageComponent = ({ value }: any) => {
  const imageUrl = urlFor(value)

  return (
    <Image
      src={imageUrl.width(240).url()}
      alt={value.alt}
      width={240}
      height={240}
      className={'w-[200px] h-fit'}
    />
  )
}

export const portableTextPage = {
  types: {
    image: ImageComponent,
    gallery: ({ value }: any) => {
      return (
        <div id='gallery' className='max-w-[960px] mx-auto mb-20 flex justify-center flex-wrap items-center gap-20'>
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
    h1: ({ children }: any) => <h1 className='max-w-[960px] mx-auto text-4xl font-semibold tracking-normal leading-[42px] mb-8'>{children}</h1>,
    h2: ({ children }: any) => <h2 className='max-w-[960px] mx-auto text-2xl font-medium tracking-normal leading-[42px] mb-2'>{children}</h2>,
    normal: ({ children }: any) => {
      if (children[0]) {
        return <p className='max-w-[960px] mx-auto text-2xl font-normal tracking-normal leading-[42px] mb-16'>{children}</p>
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


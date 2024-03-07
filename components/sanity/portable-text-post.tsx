import Image from 'next/image'
import { getClient } from '@/lib/sanity.client'
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(getClient);

function urlFor(source: any) {
  return builder.image(source)
}

const ImageFullComponent = ({ value }: any) => {
  const imageUrl = urlFor(value)

  return (
    <div>
      <Image
        src={imageUrl.width(960).url()}
        alt={value.alt}
        layout='responsive'
        width={1200}
        height={1200}
        className={'mb-20'}
      />
    </div>
  )
}

const ImageCaptionComponent = ({ value }: any) => {
  const imageUrl = urlFor(value)

  return (
    <div>
      <Image
        src={imageUrl.width(960).url()}
        alt={value.alt}
        layout='responsive'
        width={960}
        height={960}
        className={'mb-20'}
      />
    </div>
  )
}

export const portableTextPost = {
  types: {
    imageFull: ImageFullComponent,
    imageCaption: ImageCaptionComponent,
  },

  block: {
    h2: ({ children }: any) => <h2 className='max-w-[960px] mx-auto text-2xl font-medium tracking-normal leading-[42px] mb-6'>{children}</h2>,
    blockquote: ({ children }: any) => <blockquote className='max-w-[960px] mx-auto text-2xl font-medium tracking-normal leading-[42px] mb-2'>{children}</blockquote>,
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


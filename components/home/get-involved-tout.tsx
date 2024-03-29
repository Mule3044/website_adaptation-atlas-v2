import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home } from '@/types/sanity.types'
import { LiaArrowRightSolid } from 'react-icons/lia'

type Props = {
  content: Home
}

const GetInvolvedTout = ({ content }: Props) => {

  return (
    <div id='get-involved-tout' className='pt-20 mb-20'>
      <div id='tout-header' className='mb-5'>
        <h1 className='mb-2'>{content.tout.title}</h1>
        <h3>{content.tout.subtitle}</h3>
      </div>
      <div className='flex flex-col lg:flex-row justify-between gap-5 items-center'>
        <Image
          src={content.tout.featuredImage}
          alt={content.tout.featuredImageAlt}
          width={940}
          height={800}
          className='basis-full lg:basis-2/3'
        />
        <div id='tout-description' className='basis-full lg:basis-1/3'>
          <h4 className='mb-4'>{content.tout.descriptionHeader}</h4>
          <p className='mb-3'>{content.tout.descriptionBody}</p>
          <Button variant={'link'} size={'md'} asChild className='group'>
            <div>
              <Link href='/get-involved'>{content.tout.buttonLabel}</Link>
              <LiaArrowRightSolid className='scale-125 ml-2 transition-transform group-hover:translate-x-2' />
            </div>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default GetInvolvedTout
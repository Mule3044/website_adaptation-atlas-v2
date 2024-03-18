'use client'

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
        <h2 className='text-4xl text-grey-600 font-semibold mb-2'>{content.tout.title}</h2>
        <h3 className='text-lg text-grey-600 font-medium'>{content.tout.subtitle}</h3>
      </div>
      <div className='flex justify-between gap-5 items-center'>
        <Image
          src={content.tout.featuredImage}
          alt={content.tout.featuredImageAlt}
          width={940}
          height={800}
          className='w-2/3'
        />
        <div id='tout-description' className='w-1/3'>
          <h4 className='text-[28px] font-semibold mb-4'>{content.tout.descriptionHeader}</h4>
          <p className='text-[18px] mb-3'>{content.tout.descriptionBody}</p>
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
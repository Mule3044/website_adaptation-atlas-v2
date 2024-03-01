'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Spotlight } from '@/types/sanity.types'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { LiaArrowRightSolid } from 'react-icons/lia';

type Props = {
  spotlights: Spotlight[]
}

const HomeCarousel = ({ spotlights }: Props) => {

  return (
    <div id='splash-carousel' className='h-[800px] mb-20'>
      <Carousel className='h-[800px]'>
        <CarouselContent className='h-[800px]'>
          {spotlights.map((spotlight: Spotlight) =>
            <CarouselItem key={spotlight._id} className='relative h-[800px] flex justify-center items-center'>
              <Image
                src={spotlight.featuredImage}
                alt={spotlight.featuredImageAlt}
                layout='fill'
                objectFit='cover'
              />
              <div id='carousel-content' className='relative h-[575px] w-[575px] p-[100px] flex justify-center items-center flex-col text-center rounded-full bg-white z-50'>
                <h3 className='uppercase text-grey-600 font-medium mb-0.5'>Discover</h3>
                <h2 className='text-[28px] text-grey-600 font-semibold mb-3'>{spotlight.carousel.title}</h2>
                <p className='text-lg text-grey-600 mb-5'>{spotlight.carousel.description}</p>
                <Button variant={'link'} size={'lg'} asChild className='group'>
                  <div>
                    <Link href={`/${spotlight.slug}`}>Explore what's at risk</Link>
                    <LiaArrowRightSolid className='scale-125 ml-2 transition-transform group-hover:translate-x-2' />
                  </div>
                </Button>

              </div>
            </CarouselItem>
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

export default HomeCarousel
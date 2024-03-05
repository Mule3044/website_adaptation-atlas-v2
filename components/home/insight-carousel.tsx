'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Insight } from '@/types/sanity.types'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

type Props = {
  insights: Insight[]
}

const InsightCarousel = ({ insights }: Props) => {

  return (
    <div id='insight-carousel' className='mb-20'>
      <div id='insight-carousel-header' className='mb-5'>
        <h2 className='text-4xl text-grey-600 font-semibold mb-2'>Data Insights</h2>
        <h3 className='text-lg text-grey-600 font-medium'>Read about how our work and data collection efforts have led to real-world change.</h3>
      </div>
      <Carousel>
        <CarouselContent className='-ml-5'>
          {insights.map((insight: Insight) =>
            <CarouselItem key={insight._id} className='relative md:basis-1/2 lg:basis-1/3 pl-5 transition-opacity hover:opacity-90'>
              <Link
                key={insight._id}
                href={`/${insight.slug}`}
                className='block'
              >
                <div className='h-[380px] mb-2 relative'>
                  <Image
                    src={insight.featuredImage}
                    alt={insight.featuredImageAlt}
                    layout='fill'
                    objectFit='cover'
                    className='object-center'
                  />
                </div>
                <h3 className='uppercase tracking-wide font-medium mb-2'>{insight.title}</h3>
              </Link>
            </CarouselItem>
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

export default InsightCarousel
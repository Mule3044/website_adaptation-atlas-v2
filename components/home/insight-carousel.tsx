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
import iconBadge from '@/public/images/icon-badge.svg'

type Props = {
  insights: Insight[]
}

const InsightCarousel = ({ insights }: Props) => {

  return (
    <div id='insight-carousel' className='pt-20'>
      <div id='insight-carousel-header' className='mb-5'>
        <h1 className='mb-2'>Data Insights</h1>
        <h3>Quick reads and key insights based on Atlas data.</h3>
      </div>
      <Carousel type='gallery' opts={{ align: 'start' }}>
        <CarouselContent className='-ml-5'>
          {insights.map((insight: Insight) =>
            <CarouselItem key={insight._id} className='relative basis-full md:basis-1/2 lg:basis-1/3 pl-5 transition-opacity hover:opacity-90'>
              <Link
                key={insight._id}
                href={`/data-insights/${insight.slug}`}
                className='block'
              >
                <div className='h-[380px] mb-2 relative'>
                  <div className='absolute z-10 flex justify-center items-center h-10 w-10 top-3 right-3 bg-grey-600'>
                    <Image // icon
                      src={iconBadge}
                      alt={'Bars icon'}
                      width={20}
                    />
                  </div>
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
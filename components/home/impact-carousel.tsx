import Image from 'next/image'
import Link from 'next/link'
import { Impact } from '@/types/sanity.types'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import iconPage from '@/public/images/icon-page.svg'

type Props = {
  impacts: Impact[]
}

const ImpactCarousel = ({ impacts }: Props) => {

  return (
    <div id='impact-carousel' className='pt-20'>
      <div id='impact-carousel-header' className='mb-5'>
        <h1 className='mb-2'>Data in Practice</h1>
        <h3>Read about how our work and data collection efforts have led to real-world change.</h3>
      </div>
      <Carousel type='gallery' opts={{ align: 'start' }}>
        <CarouselContent className='-ml-5'>
          {impacts.map((impact: Impact) =>
            <CarouselItem key={impact._id} className='relative basis-full md:basis-1/2 lg:basis-1/3 pl-5 transition-opacity hover:opacity-90'>
              <Link
                key={impact._id}
                href={`/data-in-practice/${impact.slug}`}
                className='block'
              >
                <div className='h-[380px] mb-2 relative'>
                  <div className='absolute z-10 flex justify-center items-center h-10 w-10 top-3 right-3 bg-grey-600'>
                    <Image // icon
                      src={iconPage}
                      alt={'Bars icon'}
                      width={17}
                    />
                  </div>
                  <Image
                    src={impact.featuredImage}
                    alt={impact.featuredImageAlt}
                    layout='fill'
                    objectFit='cover'
                    className='object-center'
                  />
                </div>
                <h3 className='uppercase tracking-wide font-medium mb-2'>{impact.title}</h3>
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

export default ImpactCarousel
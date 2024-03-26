'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Spotlight, Tag } from '@/types/sanity.types'
import Filter from '@/components/ui/filter'
import Tags from '@/components/ui/tags'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

type Props = {
  spotlights: Spotlight[]
  tags: Tag[]
}

const SpotlightGrid = ({ spotlights, tags }: Props) => {
  const [filteredSpotlights, setFilteredSpotlights] = useState(spotlights)
  // const [filterActive, setFilterActive] = useState(false)
  const [activeTags, setActiveTags] = useState<Tag[]>([])
  const [query, setQuery] = useState('')

  // Reset search query and show all items
  const resetFilter = () => {
    if (query.length) {
      setQuery('') // reset query if present
    }
  }

  // Reset the active tags and show all items
  const resetTags = () => {
    // setFilteredSpotlights(spotlights) // reset filter
    setActiveTags([])
  }

  return (
    <div id='spotlight-grid' className='pt-20'>
      <div id='spotlight-grid-header' className='mb-5'>
        <h2 className='text-4xl text-grey-600 font-semibold mb-2'>Data Spotlights</h2>
        <h3 className='text-lg text-grey-600 font-medium'>Explore interactive visualizations of data we’ve collected.</h3>
      </div>
      <div id='spotlight-filter-search' className='mb-5 -mx-2.5'>
        <h4 className='uppercase text-sm text-grey-600 mb-2 px-2.5'>Filter tools</h4>
        <div className='flex justify-between items-center'>
          <div id='spotlight-tags' className='w-3/4 px-2.5' >
            <Carousel type='tags'>
              <Tags
                data={spotlights}
                tags={tags}
                setFilteredData={setFilteredSpotlights}
                activeTags={activeTags}
                setActiveTags={setActiveTags}
                resetFilter={resetFilter}
              />
              {/* <CarouselPrevious /> */}
              <CarouselNext />
            </Carousel>

          </div>
          <div id='spotlight-search' className='w-1/4 px-3'>
            <Filter
              data={spotlights}
              query={query}
              setQuery={setQuery}
              setFilteredData={setFilteredSpotlights}
              placeholder='Search for a topic...'
              resetFilter={resetFilter}
              resetTags={resetTags}
            />
          </div>
        </div>
      </div>
      <div id='grid' className='flex flex-wrap -mx-3'>
        {filteredSpotlights && filteredSpotlights.map((spotlight: Spotlight) =>
          <Link
            key={spotlight._id}
            href={`/data-spotlights/${spotlight.slug}`}
            className='block transition-opacity hover:opacity-90 w-1/4 px-2.5 mb-10'
          >
            <div className='h-[160px] lg:h-[240px] xl:h-[280px] mb-2 relative'>
              <div className='absolute z-10 flex justify-center items-center h-10 w-10 top-3 right-3 bg-grey-600'>
                <Image // icon
                  src={'/images/icon-bars.svg'}
                  alt={'Bars icon'}
                  width={22}
                  height={22}
                />
              </div>
              <Image
                src={spotlight.featuredImage}
                alt={spotlight.featuredImageAlt}
                layout='fill'
                objectFit='cover'
                className='object-center'
              />
            </div>
            <h3 className='uppercase tracking-wide font-medium mb-2'>{spotlight.title}</h3>
            <div className='flex gap-3'>
              {spotlight.featuredTags && spotlight.featuredTags.map((tag) => {
                return <p key={tag._id} className='text-brand-green text-sm font-medium'>{tag.name}</p>
              }
              )}
            </div>
          </Link>
        )}
        {!filteredSpotlights.length &&
          <div className='mx-auto my-20'>
            <p className='text-base'>No results found</p>
          </div>
        }
      </div>
    </div>
  )
}

export default SpotlightGrid
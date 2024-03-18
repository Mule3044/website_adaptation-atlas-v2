'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Spotlight, Tag } from '@/types/sanity.types'
import { Button } from '@/components/ui/button'
import Search from '@/components/ui/search'
import iconBars from '@/public/images/icon-bars.svg'

type Props = {
  spotlights: Spotlight[]
  tags: Tag[]
}

const SpotlightGrid = ({ spotlights, tags }: Props) => {
  const [filteredSpotlights, setFilteredSpotlights] = useState(spotlights)
  const [activeTag, setActiveTag] = useState<string | null>(null)

  // Function to handle tag click
  const handleTagClick = (tagName: string) => {
    setActiveTag(activeTag => activeTag === tagName ? null : tagName);
  }

  // Effect to filter spotlights when activeTag changes
  useEffect(() => {
    if (activeTag) {
      setFilteredSpotlights(spotlights.filter(spotlight => {
        console.log(spotlight);
        return spotlight.primaryTags && Array.isArray(spotlight.primaryTags) && spotlight.primaryTags.some(tag => tag.name === activeTag)
      }))
    } else {
      setFilteredSpotlights(spotlights)
    }
  }, [activeTag, spotlights])

  return (
    <div id='spotlight-grid' className='pt-20'>
      <div id='spotlight-grid-header' className='mb-5'>
        <h2 className='text-4xl text-grey-600 font-semibold mb-2'>Data Spotlights</h2>
        <h3 className='text-lg text-grey-600 font-medium'>Explore interactive visualizations of data we’ve collected.</h3>
      </div>
      <div id='spotlight-filter-search' className='mb-5 -mx-2.5'>
        <h4 className='uppercase text-sm text-grey-600 mb-2 px-2.5'>Filter tools</h4>
        <div className='flex justify-between items-center'>
          <div id='spotlight-filters' className='flex gap-3 w-3/4 px-2.5'>
            {tags.map((tag: Tag) =>
              <Button
                key={tag._id}
                variant={'tag'}
                size={'sm'}
                onClick={() => handleTagClick(tag.name)}
              >
                {tag.name}
              </Button>
            )}
          </div>
          <div id='spotlight-search' className='w-1/4 px-3'>
            <Search size='sm' placeholder='Search for a topic...' />
          </div>
        </div>
      </div>
      <div id='grid' className='flex flex-wrap -mx-3'>
        {filteredSpotlights.map((spotlight: Spotlight) =>
          <Link
            key={spotlight._id}
            href={`/data-spotlights/${spotlight.slug}`}
            className='block transition-opacity hover:opacity-90 w-1/4 px-2.5 mb-10'
          >
            <div className='h-[160px] lg:h-[240px] xl:h-[280px] mb-2 relative'>
              <div className='absolute z-10 flex justify-center items-center h-10 w-10 top-3 right-3 bg-grey-600'>
                <Image // icon
                  src={iconBars}
                  alt={'Bars icon'}
                  width={22}
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
      </div>
    </div>
  )
}

export default SpotlightGrid
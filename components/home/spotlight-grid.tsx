'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Spotlight, Tag } from '@/types/sanity.types'
import { Button } from '@/components/ui/button'
import Search from '@/components/ui/search'

type Props = {
  spotlights: Spotlight[]
  tags: Tag[]
}

const SpotlightGrid = ({ spotlights, tags }: Props) => {

  return (
    <div id='spotlight-grid' className='mb-20'>
      <div id='spotlight-grid-header' className='mb-5'>
        <h2 className='text-4xl text-grey-600 font-semibold mb-2'>Data Spotlights</h2>
        <h3 className='text-lg text-grey-600 font-medium'>Explore interactive visualizations of data we’ve collected.</h3>
      </div>
      <div id='spotlight-filter-search' className='mb-5'>
        <h4 className='uppercase text-sm text-grey-600 mb-2'>Filter tools</h4>
        <div className='flex justify-between items-center gap-3'>
          <div id='spotlight-filters' className='flex gap-3 w-4/5'>
            {tags.map((tag: Tag) =>
              <Button
                key={tag._id}
                variant={'tag'}
                size={'sm'}
              >
                {tag.name}
              </Button>
            )}
          </div>
          <div id='spotlight-search' className='w-1/5'>
            <Search size='sm' placeholder='Search for a topic...' />
          </div>
        </div>
      </div>
      <div id='grid' className='grid grid-cols-4 gap-5'>
        {spotlights.map((spotlight: Spotlight) =>
          <Link
            key={spotlight._id}
            href={`/data-spotlights/${spotlight.slug}`}
            className='block transition-opacity hover:opacity-90'
          >
            <div className='h-[160px] mb-2 relative'>
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
              {spotlight.featuredTags.map((tag) => {
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
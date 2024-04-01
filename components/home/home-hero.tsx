'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { breakpoints } from '@/lib/constants'
import Search from '@/components/ui/search'
import atlasLogo from '@/public/images/atlas-logo.svg'
import { Home, SearchItem } from '@/types/sanity.types'
import cn from 'classnames'

type Props = {
  searchContent: SearchItem[]
  content: Home
}

const HomeHero = ({ searchContent, content }: Props) => {
  const [searchBoxActive, setSearchBoxActive] = useState(false)
  const isLgScreen = useMediaQuery(breakpoints.xl)
  const searchPlaceholder = isLgScreen ? 'Search for evidence-based research and data by keyword or phrase…' : 'Search for research and data…'

  const handleLinkClick = (e: any, target: any) => {
    e.preventDefault(); // Prevent default anchor behavior
    const scrollTarget = document.querySelector(target);

    if (scrollTarget) {
      scrollTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  return (
    <div id='hero' className='flex flex-wrap justify-between h-[480px] lg:h-[800px] mb-5'>
      <div id='intro-search' className='basis-full lg:basis-3/4 flex justify-center mt-[100px] lg:mt-[200px] gap-5'>
        <div className='basis-4/5 lg:basis-2/3'>
          <Image // logo
            src={atlasLogo}
            alt='Agriculture Adaptation Atlas logo'
            width={280}
            height={280}
            className='mb-7 w-[200px] lg:w-[280px]'
          />

          {content.introText && (
            <h1 className={cn(
              'max-w-[600px] text-grey-600 font-semibold leading-snug mb-10 lg:mb-20 transition-opacity',
              { 'opacity-0': searchBoxActive }
            )}>{content.introText}</h1>
          )}

          <div id='search-container' className={cn(
            'transition-transform',
            { '-translate-y-[140px] lg:-translate-y-[160px]': searchBoxActive } // TODO - make this dynamic
          )}>
            <p className='text-grey-600 text-lg font-medium mb-3'>Find specific information quickly</p>
            <Search data={searchContent} placeholder={searchPlaceholder} searchBoxActive={searchBoxActive} setSearchBoxActive={setSearchBoxActive} />
          </div>
        </div>
      </div>

      {/* <div id='intro-nav' className='w-1/4 h-[calc(100vh-40px)] flex flex-col gap-5'> */}
      <div id='intro-nav' className='hidden lg:flex flex-col gap-5 basis-full lg:basis-1/4 h-full'>
          <a
            href='#spotlight-grid'
            onClick={(e) => handleLinkClick(e, '#spotlight-grid')}
            className='flex items-center gap-3 px-10 relative w-full h-full transition-colors bg-brand-green hover:bg-brand-dark-green'
          >
            <span className='text-white text-xl text-medium uppercase'>Interact with data</span>
            <Image // arrow icon
              src={'/images/icon-arrow-right.svg'}
              alt='Right arrow icon'
              width={20}
              height={20}
            />
          </a>
      </div>
    </div>
  )
}

export default HomeHero
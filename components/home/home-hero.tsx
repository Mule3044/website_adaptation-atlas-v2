'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Transition } from '@headlessui/react';
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

  const handleLinkClick = (e: any, target: any) => {
    e.preventDefault(); // Prevent default anchor behavior
    const scrollTarget = document.querySelector(target);

    if (scrollTarget) {
      scrollTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  return (
    <div id='hero' className='flex justify-between h-[800px] mb-5'>
      <div id='intro-search' className='w-3/4 flex justify-center mt-[200px] gap-5'>
        <div className='w-2/3'>
          <Image // logo
            src={atlasLogo}
            alt='Agriculture Adaptation Atlas logo'
            width={280}
            height={280}
            className='mb-7'
          />

          {content.introText && (
            <h2 className={cn(
              'max-w-[600px] text-grey-600 text-4xl font-semibold leading-snug mb-20 transition-opacity',
              { 'opacity-0': searchBoxActive }
            )}>{content.introText}</h2>
          )}

          <div id='search-container' className={cn(
            'transition-transform',
            { '-translate-y-[220px]': searchBoxActive }
          )}>
            <p className='text-grey-600 text-lg font-medium mb-3'>Know what you’re looking for?</p>
            <Search data={searchContent} placeholder='Search for evidence-based research and data by keyword or phrase...' searchBoxActive={searchBoxActive} setSearchBoxActive={setSearchBoxActive} />
          </div>
        </div>
      </div>

      {/* <div id='intro-nav' className='w-1/4 h-[calc(100vh-40px)] flex flex-col gap-5'> */}
      <div id='intro-nav' className='w-1/4 h-full flex flex-col gap-5'>
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
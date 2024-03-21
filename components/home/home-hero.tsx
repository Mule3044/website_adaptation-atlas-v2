'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Transition } from '@headlessui/react';
import Search from '@/components/ui/search'
import atlasLogo from '@/public/images/atlas-logo.svg'
import iconBars from '@/public/images/icon-bars.svg'
import iconBadge from '@/public/images/icon-badge.svg'
import iconPage from '@/public/images/icon-page.svg'
import iconArrow from '@/public/images/icon-arrow-right.svg'
import { Home, SearchItem } from '@/types/sanity.types'
import cn from 'classnames'

type Props = {
  searchContent: SearchItem[]
  content: Home
}

const HomeHero = ({ searchContent, content }: Props) => {
  const [searchBoxActive, setSearchBoxActive] = useState(false)

  const links = [
    {
      id: 'home-splash-links-0',
      target: '#spotlight-grid',
      text: 'Explore our data',
      width: 'max-w-[100px]',
      image: iconBars,
      alt: 'Bars icon',
    },
    {
      id: 'home-splash-links-1',
      target: '#insight-carousel',
      text: 'Read about our data from experts',
      width: 'max-w-[200px]',
      image: iconBadge,
      alt: 'Badge icon',
    },
    {
      id: 'home-splash-links-2',
      target: '#impact-carousel',
      text: 'Read about our impact',
      width: 'max-w-[150px]',
      image: iconPage,
      alt: 'Page icon',
    },
  ]

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
            <Search data={searchContent} placeholder='Search for evidence-based research and data...' searchBoxActive={searchBoxActive} setSearchBoxActive={setSearchBoxActive} />
          </div>
        </div>
      </div>

      {/* <div id='intro-nav' className='w-1/4 h-[calc(100vh-40px)] flex flex-col gap-5'> */}
      <div id='intro-nav' className='w-1/4 h-full flex flex-col gap-5'>
        {links.map((link) =>
          <a
            key={link.id}
            href={link.target}
            onClick={(e) => handleLinkClick(e, link.target)}
            className='relative w-full h-1/3 transition-colors bg-brand-green hover:bg-brand-dark-green'
          >
            <Image // link icon
              src={link.image}
              alt={link.alt}
              width={20}
              className='absolute top-6 left-6'
            />
            <span className={`absolute ${link.width} bottom-6 left-6 text-white text-xl text-medium uppercase`}>{link.text}</span>
            <Image // arrow icon
              src={iconArrow}
              alt='Right arrow icon'
              width={20}
              className='absolute bottom-6 right-6'
            />
          </a>
        )}
      </div>
    </div>
  )
}

export default HomeHero
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import iconSearch from '@/public/images/icon-search.svg'
import cn from 'classnames'
import Fuse from 'fuse.js'
import { Combobox } from '@headlessui/react'
import iconBars from '@/public/images/icon-bars-dark.svg'
import iconArrow from '@/public/images/icon-arrow-dark.svg'
import { BiX } from 'react-icons/bi'
import { SearchItem } from '@/types/sanity.types'

type Props = {
  data: SearchItem[]
  placeholder: string
  size?: string
  searchBoxActive: boolean
  setSearchBoxActive: React.Dispatch<React.SetStateAction<boolean>>
}

const fuseOptions = {
  keys: [
    { name: "title", weight: 1 },
    { name: "featuredTags.name", weight: 1 },
    { name: "primaryTags.name", weight: 0.75 },
    { name: "secondaryTags.name", weight: 0.5 },
    { name: "searchableText", weight: 0.25 },
  ]
}

const searchPaths = [
  { type: 'spotlight', path: 'data-spotlights', image: '/images/icon-bars-dark.svg' },
  { type: 'insight', path: 'data-insights', image: '/images/icon-badge-dark.svg' },
  { type: 'impact', path: 'data-in-practice', image: '/images/icon-page-dark.svg' },
]

const Search = ({ data, placeholder, searchBoxActive, setSearchBoxActive }: Props) => {
  const [query, setQuery] = useState('')

  // Preprocess post data to include body text
  const processedData = data.map(post => ({
    ...post,
    searchableText: post.content
      .filter(block => block._type === 'block')
      .map((block: any) => block.children?.map((child: any) => child.text).join(' '))
      .join(' ')
  }));

  // Define fuse object and filter data by query
  const fuse = new Fuse(processedData, fuseOptions)
  const filteredData = fuse.search(query)

  console.log(filteredData)

  const focusSearchBox = () => {
    setSearchBoxActive(true)
  }

  const blurSearchBox = () => {
    setTimeout(() => {
      if (!query.length) {
        setSearchBoxActive(false) // Only close search box if no query is present
      }
      setQuery(''); // reset query
    }, 100); // Delay reset to allow for navigation event to fire
  }

  const resetSearchBox = () => {
    setSearchBoxActive(false)
    setQuery('')
  }

  return (
    <div id='search' className='w-full'>
      <Combobox
        value={query}
      >
        <div className='relative'>
          <div id='search-input' className='flex items-center gap-3 bg-grey-100 w-full py-3 px-4'>
            <Image
              src={iconSearch}
              alt='Search'
              width={15}
            />
            <Combobox.Input
              onChange={(event) => setQuery(event.target.value)}
              onFocus={focusSearchBox}
              onBlur={blurSearchBox}
              placeholder={placeholder}
              className='w-full bg-grey-100 outline-none text-lg'
            />
            {searchBoxActive &&
              <button
                className='absolute right-3'
                onClick={resetSearchBox}
              >
                <BiX className='text-grey-300 h-6 w-6' />
              </button>
            }
          </div>
          <Combobox.Options className='absolute bg-grey-100 w-full px-5 max-h-[320px] overflow-y-auto'>
            {filteredData.length > 0 && filteredData.map((post: any) => {
              const type = searchPaths.find((item: any) => item.type === post.item._type)
              return (
                <Combobox.Option
                  key={post.item.slug}
                  value={post.item.slug}
                  className='list-none cursor-pointer'
                >
                  <Link href={`/${type?.path}/${post.item.slug}`}>
                    <div className='group flex gap-3 text-base mb-3'>
                      <Image // icon
                        src={type!.image}
                        alt={'Icon'}
                        width={18}
                        height={18}
                      />
                      <span className='truncate'>{post.item.title}</span>
                      <Image // icon
                        src={iconArrow}
                        alt={'Arrow icon'}
                        width={22}
                        height={22}
                        className='scale-90 transition-transform group-hover:translate-x-2'
                      />
                    </div>
                  </Link>
                </Combobox.Option>
              )
            })}
            {(filteredData.length === 0 && query.length > 0) && <div className='text-base pb-5'>No results found</div>}
          </Combobox.Options>
        </div>
      </Combobox>
    </div>
  )
}

export default Search
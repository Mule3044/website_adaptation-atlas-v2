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
import { Spotlight } from '@/types/sanity.types'
import { useRouter, usePathname } from 'next/navigation'

type Props = {
  data: Spotlight[]
  placeholder: string
  size?: string
  searchBoxActive: boolean
  setSearchBoxActive: React.Dispatch<React.SetStateAction<boolean>>
}

const fuseOptions = {
  keys: [
    "title",
  ]
}

const Search = ({ data, placeholder, searchBoxActive, setSearchBoxActive }: Props) => {
  const [selectedPost, setSelectedPost] = useState(data[0])
  const [optionSelected, setOptionSelected] = useState(false)
  const [query, setQuery] = useState('')
  const router = useRouter()
  const pathname = usePathname()
  const fuse = new Fuse(data, fuseOptions)
  const filteredData = fuse.search(query)

  console.log(filteredData)

  const blurSearchBox = () => {
    // if (!optionSelected) { // Only reset if no option was selected
    //   // setSearchBoxActive(false);
    //   // setQuery('');
    // }
    setOptionSelected(false)
  }

  const resetSearchBox = () => {
    setSearchBoxActive(false)
    setQuery('')
    setOptionSelected(false)

  }

  return (
    <div id='search' className='w-full'>
      <Combobox
        value={query}
        onChange={(selectedSlug) => {
          router.push(`/data-spotlights/${selectedSlug}`)
          setOptionSelected(true)
          // setQuery(''); // Optionally reset query after selection
        }}
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
              onFocus={() => setSearchBoxActive(true)}
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
            {filteredData.length > 0 && filteredData.map((post: any) => (
              <Combobox.Option
                key={post.item.slug}
                value={post.item.slug}
                className='list-none cursor-pointer'
              >
                <div className='group flex gap-3 text-base mb-3'>
                  <Image // icon
                    src={iconBars}
                    alt={'Bars icon'}
                    width={22}
                  />
                  <span>{post.item.title}</span>
                  <Image // icon
                    src={iconArrow}
                    alt={'Arrow icon'}
                    width={22}
                    className='scale-90 transition-transform group-hover:translate-x-2'
                  />
                </div>
              </Combobox.Option>
            ))}
            {(filteredData.length === 0 && query.length > 0) && <div className='text-base pb-5'>No results found</div>}
          </Combobox.Options>
        </div>
      </Combobox>
    </div>
  )
}

export default Search
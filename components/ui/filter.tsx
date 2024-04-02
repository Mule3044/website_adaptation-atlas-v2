import { useEffect } from 'react'
import Image from 'next/image'
import Fuse from 'fuse.js'
import { Combobox } from '@headlessui/react'
import { BiX } from 'react-icons/bi'
import { Spotlight } from '@/types/sanity.types'

type Props = {
  data: Spotlight[]
  query: string
  setQuery: React.Dispatch<React.SetStateAction<string>>
  placeholder: string
  setFilteredData: React.Dispatch<React.SetStateAction<Spotlight[]>>
  resetFilter: () => void
  resetTags: () => void
}

const fuseOptions = {
  minMatchCharLength: 3, // Only the matches whose length exceeds this value will be returned
  threshold: 0.3, // A threshold of 0.0 requires a perfect match, a threshold of 1.0 would match anything
  keys: [
    { name: "title", weight: 1 },
    { name: "featuredTags.name", weight: 1 },
    { name: "primaryTags.name", weight: 0.75 },
    { name: "secondaryTags.name", weight: 0.5 },
  ]
}

const Filter = ({ data, query, setQuery, placeholder, setFilteredData, resetFilter, resetTags }: Props) => {
  

  // Define fuse object and filter data by query
  const fuse = new Fuse(data, fuseOptions)

  // update filtered data every time input changes
  useEffect(() => {
    const filtered = (query) ? fuse.search(query).map((item) => item.item) : data
    setFilteredData(filtered)
  }, [query])

  const focusSearchBox = () => {
    resetFilter() // clear query
    resetTags() // clear active tags
  }

  return (
    <div id='search' className='w-full'>
      <Combobox
        value={query}
      >
        <div className='relative'>
          <div id='search-input' className='flex items-center gap-3 bg-grey-100 w-full py-3 px-4'>
            <Image
              src={'/images/icon-search.svg'}
              alt='Search'
              width={15}
              height={15}
            />
            <Combobox.Input
              onChange={(event) => setQuery(event.target.value)}
              onFocus={focusSearchBox}
              // onBlur={resetFilter}
              placeholder={placeholder}
              className='w-full bg-grey-100 outline-none text-lg'
            />
            {query &&
              <button
                className='absolute right-3'
                onClick={resetFilter}
              >
                <BiX className='text-grey-300 h-6 w-6' />
              </button>
            }
          </div>
        </div>
      </Combobox>
    </div>
  )
}

export default Filter
'use client'

import { useState } from 'react'
import Image from 'next/image'
import iconSearch from '@/public/images/icon-search.svg'
import cn from 'classnames'
import Fuse from 'fuse.js'
import { Combobox } from '@headlessui/react'
import iconBars from '@/public/images/icon-bars-dark.svg'
import iconArrow from '@/public/images/icon-arrow-dark.svg'
import { BiX } from 'react-icons/bi'

type Props = {
  placeholder: string
  size?: string
  searchBoxActive: boolean
  setSearchBoxActive: React.Dispatch<React.SetStateAction<boolean>>
}

const books = [
  {
    "title": "Old Man's War",
    "author": {
      "firstName": "John",
      "lastName": "Scalzi"
    }
  },
  {
    "title": "The Lock Artist",
    "author": {
      "firstName": "Steve",
      "lastName": "Hamilton"
    }
  },
  {
    "title": "HTML5",
    "author": {
      "firstName": "Remy",
      "lastName": "Sharp"
    }
  },
  {
    "title": "Right Ho Jeeves",
    "author": {
      "firstName": "P.D",
      "lastName": "Woodhouse"
    }
  },
  {
    "title": "The Code of the Wooster",
    "author": {
      "firstName": "P.D",
      "lastName": "Woodhouse"
    }
  },
  {
    "title": "Thank You Jeeves",
    "author": {
      "firstName": "P.D",
      "lastName": "Woodhouse"
    }
  },
  {
    "title": "The DaVinci Code",
    "author": {
      "firstName": "Dan",
      "lastName": "Brown"
    }
  },
  {
    "title": "Angels & Demons",
    "author": {
      "firstName": "Dan",
      "lastName": "Brown"
    }
  },
  {
    "title": "The Silmarillion",
    "author": {
      "firstName": "J.R.R",
      "lastName": "Tolkien"
    }
  },
  {
    "title": "Syrup",
    "author": {
      "firstName": "Max",
      "lastName": "Barry"
    }
  },
  {
    "title": "The Lost Symbol",
    "author": {
      "firstName": "Dan",
      "lastName": "Brown"
    }
  },
  {
    "title": "The Book of Lies",
    "author": {
      "firstName": "Brad",
      "lastName": "Meltzer"
    }
  },
  {
    "title": "Lamb",
    "author": {
      "firstName": "Christopher",
      "lastName": "Moore"
    }
  },
  {
    "title": "Fool",
    "author": {
      "firstName": "Christopher",
      "lastName": "Moore"
    }
  },
  {
    "title": "Incompetence",
    "author": {
      "firstName": "Rob",
      "lastName": "Grant"
    }
  },
  {
    "title": "Fat",
    "author": {
      "firstName": "Rob",
      "lastName": "Grant"
    }
  },
  {
    "title": "Colony",
    "author": {
      "firstName": "Rob",
      "lastName": "Grant"
    }
  },
  {
    "title": "Backwards, Red Dwarf",
    "author": {
      "firstName": "Rob",
      "lastName": "Grant"
    }
  },
  {
    "title": "The Grand Design",
    "author": {
      "firstName": "Stephen",
      "lastName": "Hawking"
    }
  },
  {
    "title": "The Book of Samson",
    "author": {
      "firstName": "David",
      "lastName": "Maine"
    }
  },
  {
    "title": "The Preservationist",
    "author": {
      "firstName": "David",
      "lastName": "Maine"
    }
  },
  {
    "title": "Fallen",
    "author": {
      "firstName": "David",
      "lastName": "Maine"
    }
  },
  {
    "title": "Monster 1959",
    "author": {
      "firstName": "David",
      "lastName": "Maine"
    }
  }
]

const fuseOptions = {
  keys: [
    "title",
    "author.firstName"
  ]
}

const Search = ({ placeholder, searchBoxActive, setSearchBoxActive }: Props) => {
  const [selectedBook, setSelectedBook] = useState(books[0])
  const [query, setQuery] = useState('')

  const fuse = new Fuse(books, fuseOptions)

  const filteredBooks = fuse.search(query)

  const resetSearchBox = () => {
    setQuery('') // reset query
    setSearchBoxActive(false) // close search box
  }

  return (
    <div id='search' className='w-full'>
      <Combobox value={selectedBook} onChange={setSelectedBook}>
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
              onBlur={resetSearchBox}
              placeholder={placeholder}
              className='w-full bg-grey-100 outline-none text-lg'
            />
            {searchBoxActive &&
              <button
                className='absolute right-3'
                onClick={() => setSearchBoxActive(false)}
              >
                <BiX className='text-grey-300 h-6 w-6' />
              </button>
            }
          </div>
          <Combobox.Options className='absolute bg-grey-100 w-full px-5 max-h-[320px] overflow-y-auto'>
            {filteredBooks.length > 0 && filteredBooks.map((book: any) => (
              <Combobox.Option key={book.item.title} value={book.item.title} className='list-none cursor-pointer'>
                <div className='group flex gap-3 text-base mb-3'>
                  <Image // icon
                    src={iconBars}
                    alt={'Bars icon'}
                    width={22}
                  />
                  <span>{book.item.title}</span>
                  <Image // icon
                    src={iconArrow}
                    alt={'Arrow icon'}
                    width={22}
                    className='scale-90 transition-transform group-hover:translate-x-2'
                  />
                </div>
              </Combobox.Option>
            ))}
            {(filteredBooks.length === 0 && query.length > 0) && <div className='text-base pb-5'>No results found</div>}
          </Combobox.Options>
        </div>
      </Combobox>
    </div>
  )
}

export default Search
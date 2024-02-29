import Image from 'next/image'
import iconSearch from '@/public/images/icon-search.svg'

type Props = {
  placeholder: string
}

const Search = ({ placeholder }: Props) => {
  return (
    <div id='search' className='bg-grey-100 rounded-sm py-3 px-5'>
      <div id='search-input' className='flex items-center'>
        <Image
          src={iconSearch}
          alt='Search'
          width={15}
        />
        <span className='text-grey-400 text-lg italic font-medium pl-3'>{placeholder}</span>
      </div>
    </div>
  )
}

export default Search
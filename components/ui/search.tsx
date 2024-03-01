import Image from 'next/image'
import iconSearch from '@/public/images/icon-search.svg'
import cn from 'classnames'

type Props = {
  placeholder: string
  size?: string
}

const Search = ({ placeholder, size }: Props) => {
  return (
    <div id='search' className='w-full bg-grey-100 rounded-sm py-3 px-5'>
      <div id='search-input' className='flex items-center'>
        <Image
          src={iconSearch}
          alt='Search'
          width={15}
        />
        <span className={cn(
          'text-grey-400 italic pl-3',
          size === 'sm' ? 'text-sm' : 'text-lg'
        )}>{placeholder}</span>
      </div>
    </div>
  )
}

export default Search
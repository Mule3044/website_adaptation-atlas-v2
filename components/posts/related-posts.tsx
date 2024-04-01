import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home } from '@/types/sanity.types'
import { LiaArrowRightSolid } from 'react-icons/lia'
import { RelatedPost } from '@/types/sanity.types'

type Props = {
  posts: RelatedPost[]
}

const RelatedPosts = ({ posts }: Props) => {
  const paths = [
    { type: 'spotlight', path: 'data-spotlights' },
    { type: 'insight', path: 'data-insights' },
    { type: 'impact', path: 'data-in-practice' },
  ]

  return (
    <div id='related-posts' className='flex flex-col lg:flex-row justify-between gap-5 mt-20 mb-20'>
      <div className='basis-full lg:basis-1/3 mb-5'>
        <h2>Related Insights and Spotlights</h2>
      </div>
      <div className='basis-full lg:basis-2/3'>
        {posts.map((post: RelatedPost) => {
          const type = paths.find(type => type.type === post._type)
          const url = `/${type?.path}/${post.slug}`
          return (
            <Link href={url} className='flex justify-between items-center bg-grey-100 px-8 py-5 mb-5 w-full transition-colors hover:bg-brand-green hover:text-white group'>
              <p className='m-0'>{post.title}</p>
              <LiaArrowRightSolid className='scale-125 ml-2 transition-transform group-hover:translate-x-2' />
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default RelatedPosts
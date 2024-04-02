import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { LiaArrowRightSolid } from 'react-icons/lia'

export default function NotFound() {
  return (
    <div id='404-not-found' className='h-screen p-5 mt-20 lg:mt-32'>
      <header className='max-w-[960px] mx-auto mb-16'>
        <h1 className='page-header'>404: Page Not Found</h1>
      </header>
      <div id='page-content' className='max-w-[960px] mx-auto'>
        <Button variant={'link'} size={'md'} asChild className='group'>
          <div>
            <Link href='/'>Return to home page</Link>
            <LiaArrowRightSolid className='scale-125 ml-2 transition-transform group-hover:translate-x-2' />
          </div>
        </Button>
      </div>
    </div>
  )
}
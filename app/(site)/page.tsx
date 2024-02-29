import Image from 'next/image'
import Link from 'next/link'
import { getHomeContent } from '@/lib/sanity.query'
import atlasLogo from '@/public/images/atlas-logo.svg'
import Search from '@/components/interface/search'
import iconBars from '@/public/images/icon-bars.svg'
import iconBadge from '@/public/images/icon-badge.svg'
import iconPage from '@/public/images/icon-page.svg'
import iconArrow from '@/public/images/icon-arrow-right.svg'

export default async function Home() {
  // In next 13, components are server-side-rendered by default
  // Getting the projects here happens on the server side for SEO
  const content = await getHomeContent()

  const links = [
    {
      target: '/target',
      text: 'Explore our data',
      width: 'max-w-[100px]',
      image: iconBars,
      alt: 'Bars icon',
    },
    {
      target: '/target',
      text: 'Read about our data from experts',
      width: 'max-w-[200px]',
      image: iconBadge,
      alt: 'Badge icon',
    },
    {
      target: '/target',
      text: 'Read about our impact',
      width: 'max-w-[150px]',
      image: iconPage,
      alt: 'Page icon',
    },
  ]

  return (
    <div id='home' className='p-5'>
      <div id='hero' className='flex justify-between h-screen'>
        <div id='intro-search' className='w-3/4 flex justify-center items-center gap-5'>
          <div className='w-2/3'>
            <Image // logo
              src={atlasLogo}
              alt='Agriculture Adaptation Atlas logo'
              width={280}
              className='mb-7'
            />

            {content.introText && (
              <h2 className='max-w-[600px] text-grey-600 text-4xl font-semibold leading-snug mb-20'>{content.introText}</h2>
            )}

            <p className='text-grey-600 text-lg font-medium mb-3'>Know what you’re looking for?</p>
            <Search placeholder='Search for evidence-based research and data...' />
          </div>
        </div>

        <div id='intro-nav' className='w-1/4 h-[calc(100vh-40px)] flex flex-col gap-5'>
          {links.map((link) =>
            <Link href={link.target} className='relative w-full h-1/3 bg-brand-green'>
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
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

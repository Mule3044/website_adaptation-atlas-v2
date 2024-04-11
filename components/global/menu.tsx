import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import cn from 'classnames'
import Share from '@/components/ui/share'
import { BiX, BiMenu, BiChevronLeft } from 'react-icons/bi'
import atlasLogoLight from '@/public/images/atlas-logo-light.svg'
import { Spotlight, Insight, Impact } from '@/types/sanity.types'

type Props = {
  spotlights: Spotlight[]
  insights: Insight[]
  impacts: Impact[]
}

const Menu = ({ spotlights, insights, impacts }: Props) => {
  const [menuActive, setMenuActive] = useState<boolean>(false)
  // const [primaryMenuActive, setPrimaryMenuActive] = useState(false)
  // const [secondaryMenuActive, setSecondaryMenuActive] = useState(false)
  // const [tertiaryMenuActive, setTertiaryMenuActive] = useState(false)
  // const [thirdLevelMenuContent, setThirdLevelMenuContent] = useState('')
  const [menuLevelActive, setMenuLevelActive] = useState<'primary' | 'secondary' | 'tertiary'>('primary')
  const [tertiaryMenuActive, setTertiaryMenuActive] = useState<'spotlights' | 'insights' | 'impact'>('spotlights')
  const [tertiaryMenuContent, setTertiaryMenuContent] = useState<{
    id: string
    slug: string
    title: string
    posts: Spotlight[] | Insight[] | Impact[]
  } | undefined>()
  const menuClass = menuActive ? 'opacity-100 pointer-events-default' : 'opacity-0 pointer-events-none'
  const secondaryMenuLinks = [
    {
      id: 'spotlights',
      slug: 'data-spotlights',
      title: 'Data Spotlights',
      posts: spotlights,
    },
    {
      id: 'insights',
      slug: 'data-insights',
      title: 'Data Insights',
      posts: insights,
    },
    {
      id: 'impacts',
      slug: 'data-in-practice',
      title: 'Data in Practice',
      posts: impacts,
    },
  ]

  const handleToggleMenu = () => {
    setMenuActive(!menuActive)
    // Reset nested menus on main menu toggle
    setMenuLevelActive('primary')
    // setPrimaryMenuActive(true)
    // setSecondaryMenuActive(false)
    // setTertiaryMenuActive(false)
    // setThirdLevelMenuContent('')
  }

  const activatePrimaryMenu = () => {
    setMenuLevelActive('primary')
  }

  const activateSecondaryMenu = () => {
    setMenuLevelActive('secondary')
  }

  const activateTertiaryMenu = (menuType: any) => {
    setMenuLevelActive('tertiary')
    const menuContent = secondaryMenuLinks.find(item => item.id === menuType)
    setTertiaryMenuContent(menuContent)
  }

  // const renderThirdLevelMenuItems = () => {
  //   let items: any[] = []
  //   switch (thirdLevelMenuContent) {
  //     case 'Spotlights':
  //       items = spotlights
  //       break
  //     case 'Insights':
  //       items = insights
  //       break
  //     case 'Impacts':
  //       items = impacts
  //       break
  //     default:
  //       break
  //   }

  //   return items.map((item) => (
  //     <Link
  //       key={item.slug.current}
  //       href={`/${thirdLevelMenuContent.toLowerCase()}/${item.slug.current}`}
  //       className='text-white text-2xl md:text-4xl font-semibold tracking-wide'
  //     >
  //       {item.title}
  //     </Link>
  //   ))
  // }

  const menuLinks = [
    { id: 'our-work', link: '/#spotlight-grid', title: 'Our Work' },
    { id: 'about', link: '/about', title: 'About the Atlas' },
    { id: 'get-involved', link: '/get-involved', title: 'Get Involved' },
  ]

  const nestedMenuLinks = [
    { id: 'nested-menu-link-1', link: '/spotlights', title: 'Spotlights' },
    { id: 'nested-menu-link-2', link: '/insights', title: 'Insights' },
    { id: 'nested-menu-link-3', link: '/impacts', title: 'Impacts' },
  ]

  const year = new Date().getFullYear()

  return (
    <nav className='fixed z-50'>
      <button
        className={
          cn(
            'fixed top-5 left-5 bg-brand-green text-white p-2 rounded-full cursor-pointer',
            'hover:bg-grey-100 hover:text-brand-green transition-colors duration-300 ease-in-out',
          )
        }
        onClick={handleToggleMenu}
      >
        <BiMenu className='h-6 w-6' />
      </button>







      {/* Menu container */}
      <div
        className={cn(
          menuClass,
          'fixed z-50 top-0 right-0 bottom-0 left-0 bg-brand-green transition duration-400',
        )}
      >
        <div className='flex items-center h-full w-3/4 absolute top-0 ml-[45px] md:ml-[300px]'>
          {/* Primary menu */}
          <div className={cn(
            'absolute flex flex-col gap-7 md:gap-14',
            'transition-all duration-300 ease-in-out transform',
            { 'translate-x-[-100%] opacity-0 pointer-events-none': menuLevelActive !== 'primary', 'opacity-100 translate-x-0 pointer-events-auto': menuLevelActive === 'primary' },
          )}>
            {menuLinks.map((item) => (
              <div key={item.id} className='text-white text-2xl md:text-4xl font-semibold tracking-wide'>
                {/* Handle click for Our Work to toggle the nested menu */}
                {item.id === 'our-work' ? (
                  <button onClick={activateSecondaryMenu}>
                    {item.title}
                  </button>
                ) : (
                  <Link href={item.link} onClick={handleToggleMenu}>
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Secondary menu */}
          <div className={cn(
            'absolute flex flex-col gap-7 md:gap-14',
            'transition-all duration-300 ease-in-out transform',
            { 'opacity-100 translate-x-0 pointer-events-auto': menuLevelActive === 'secondary' },
            { 'translate-x-[100%] opacity-0 pointer-events-none': menuLevelActive === 'primary' },
            { '-translate-x-[100%] opacity-0 pointer-events-none': menuLevelActive === 'tertiary' },
          )}>
            <h2 className='text-white text-2xl md:text-4xl font-semibold tracking-wide opacity-70'>Our Work</h2>
            <button
              className='absolute -left-12 top-1 bg-white rounded-full transition-opacity opacity-70 hover:opacity-100'
              onClick={activatePrimaryMenu}
            >
              <BiChevronLeft className='text-brand-green h-8 w-8' />
            </button>

            {secondaryMenuLinks.map((item) => (
              <button
                key={item.id}
                className='text-white text-2xl md:text-4xl font-semibold tracking-wide text-left'
                onClick={() => activateTertiaryMenu(item.id)}
              >
                {item.title}
              </button>
            ))}
          </div>

          {/* Tertiary menu */}
          <div className={cn(
            'absolute flex flex-col gap-7 md:gap-14 menu-tertiary pt-[100px] pb-[200px] px-[100px] my-[100px] -ml-[100px] h-full w-full overflow-y-auto overflow-x-hidden',
            'transition-all duration-300 ease-in-out transform',
            {
              'translate-x-[100%] opacity-0 pointer-events-none': menuLevelActive !== 'tertiary',
              'opacity-100 translate-x-0 pointer-events-auto': menuLevelActive === 'tertiary'
            },
          )}>
            <div className='relative mt-[160px]'>
              <h2 className='text-white text-2xl md:text-4xl font-semibold tracking-wide opacity-70'>{tertiaryMenuContent?.title}</h2>
              <button
                className='absolute -left-12 top-1 bg-white rounded-full transition-opacity opacity-70 hover:opacity-100'
                onClick={activateSecondaryMenu}
              >
                <BiChevronLeft className='text-brand-green h-8 w-8' />
              </button>
            </div>

            {tertiaryMenuContent?.posts.map((item) => (
              <Link
                key={item.slug}
                href={`/${tertiaryMenuContent?.slug}/${item.slug}`}
                className='text-white text-2xl md:text-4xl font-semibold tracking-wide'
              >
                {item.title}
              </Link>
            ))}
          </div>

        </div>





        {/* Menu header */}
        <div id='menu-logo' className='relative z-50 flex items-center justify-center w-full pt-6'>
          <Link href='/' onClick={handleToggleMenu}>
            <Image
              src={atlasLogoLight}
              alt='Agriculture Adaptation Atlas logo'
              width={170}
            />
          </Link>
        </div>
        <button
          className='absolute z-50 top-5 left-5 hover:opacity-100 opacity-90 transition-opacity duration-300 ease-in-out'
          onClick={handleToggleMenu}
        >
          <BiX className='text-white h-10 w-10' />
        </button>

        {/* Menu footer */}
        <div className='fixed right-0 bottom-0 left-0 z-50'>
          <footer className='flex flex-col lg:flex-row justify-between w-full p-5 text-white'>
            <p className='order-2 lg:order-1'>© {year} AAA & CGIAR</p>
            <div className='relative flex flex-col lg:flex-row order-1 lg:order-2 gap-4 mb-5'>
              <a href='mailto:toddrosenstock@adaptationatlas.info' className='font-medium text-white opacity-90 hover:opacity-100 transition-opacity'>Join our mailing list</a>
              <a href='mailto:toddrosenstock@adaptationatlas.info' className='font-medium text-white opacity-90 hover:opacity-100 transition-opacity'>Provide feedback</a>
              <a href='mailto:toddrosenstock@adaptationatlas.info' className='font-medium text-white opacity-90 hover:opacity-100 transition-opacity'>Contact us</a>
              <Share type='light' />
            </div>
          </footer>
        </div>
      </div>
    </nav>
  )
}
export default Menu

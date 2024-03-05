import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import cn from 'classnames'
import Share from '@/components/ui/share'
import { BiX, BiMenu } from 'react-icons/bi'
import atlasLogoLight from '@/public/images/atlas-logo-light.svg'

const Menu = () => {
  const [menuActive, setMenuActive] = useState<boolean>(false)
  const menuClass = menuActive ? 'opacity-100 pointer-events-default' : 'opacity-0 pointer-events-none'
  const menuListClass = menuActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-15'

  const handleToggleMenu = () => {
    setMenuActive(!menuActive)
  }

  const menuLinks = [
    { id: 'menu-link-0', link: '/', title: 'Our Work' },
    { id: 'menu-link-1', link: '/about', title: 'About the Atlas' },
    { id: 'menu-link-2', link: '/get-involved', title: 'Get Involved' },
  ]

  const year = new Date().getFullYear()

  return (
    <nav className='fixed'>
      <button
        className={
          cn(
            'fixed top-5 left-5 bg-brand-green text-white p-2 rounded-full cursor-pointer',
            'hover:bg-grey-100 hover:text-brand-green transition-colors duration-300 ease-in-out'
          )
        }
        onClick={handleToggleMenu}
      >
        <BiMenu className='h-6 w-6' />
      </button>
      <div
        className={cn(
          menuClass,
          'fixed top-0 right-0 bottom-0 left-0 bg-brand-green transition duration-400',
        )}
      >
        <div className='flex items-center h-full w-full absolute top-0'>
          <ul className='flex flex-col gap-7 md:gap-14 ml-[45px] md:ml-[300px]'>
            {/* Menu Items */}
            {menuLinks.map((item, index) => (
              <li key={item.id} className={cn(
                menuListClass,
                'text-white text-2xl md:text-4xl bold uppercase tracking-wide',
                'transition duration-300 ease-in-out',
                { 'delay-[50ms]': index === 0, 'delay-[100ms]': index === 1, 'delay-[150ms]': index === 2, 'delay-[200ms]': index === 3 },
              )}>
                <Link href={item.link} onClick={handleToggleMenu} className='hover:opacity-100 opacity-90 transition-opacity duration-300 ease-in-out'>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div id='menu-logo' className='flex items-center justify-center w-full pt-8'>
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

        <div className='fixed right-0 bottom-0 left-0 z-50'>
          <footer className='flex justify-between w-full p-5 text-white'>
            <p>© {year} AAA & CGIAR</p>
            <div className='relative flex gap-4'>
              <Link href='mailto:t.rosenstock@cgiar.org' className='font-medium text-white opacity-90 hover:opacity-100 transition-opacity'>Sign up for our newsletter</Link>
              <Link href='mailto:t.rosenstock@cgiar.org' className='font-medium text-white opacity-90 hover:opacity-100 transition-opacity'>Contact us</Link>
              <Share type='light' />
            </div>
          </footer>
        </div>
      </div>
    </nav>
  )
}
export default Menu

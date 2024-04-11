'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { getSpotlights, getInsights, getImpacts, } from '@/lib/sanity.query'
import atlasLogo from '@/public/images/atlas-logo.svg'
import Menu from './menu'
import cn from 'classnames'

export default async function Header() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const headerClass = (isHome) ? 'absolute top-0' : 'relative'
  const spotlights = await getSpotlights()
  const insights = await getInsights()
  const impacts = await getImpacts()

  return (
    <header className={cn(
      headerClass,
      'flex items-center justify-center z-50'
    )}>
      {/* Render site logo on all other pages except home */}
      {!isHome && (
        <Link href='/'>
          <Image // logo
            src={atlasLogo}
            alt='Agriculture Adaptation Atlas logo'
            width={170}
            className='pt-6'
          />
        </Link>
      )}

      <Menu spotlights={spotlights} insights={insights} impacts={impacts} />
    </header>
  )
}

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import atlasLogo from '@/public/images/atlas-logo.svg'
import Menu from './menu'
import cn from 'classnames'
import LanguageSelect from '@/components/ui/language-select'
import { useLanguageContext } from '@/contexts/language-context'
import { useSanityData } from '@/contexts/data-context'

export default function Header() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const headerClass = (isHome) ? 'absolute top-0' : 'relative'
  const {
    spotlights,
    insights,
    impacts,
  } = useSanityData()
  const { locale, setLocale } = useLanguageContext()

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

      {(spotlights && insights && impacts) &&
        <Menu spotlights={spotlights} insights={insights} impacts={impacts} />
      }

      <LanguageSelect setLanguage={setLocale} isHome={isHome} />
    </header>
  )
}

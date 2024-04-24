'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Menu from './menu'
import cn from 'classnames'
import LanguageSelect from '@/components/ui/language-select'
import { useLanguageContext } from '@/contexts/language-context'
import { useSanityData } from '@/contexts/data-context'

type Props = {
  menuActive: boolean
  setMenuActive: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Header({ menuActive, setMenuActive }: Props) {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const headerClass = (isHome) ? 'absolute top-0' : 'relative'
  const {
    spotlights,
    insights,
    impacts,
    siteSettings,
  } = useSanityData()
  const { setLocale } = useLanguageContext()

  return (
    <header className={cn(
      headerClass,
      'flex items-center justify-center z-50'
    )}>
      {/* Render site logo on all other pages except home */}
      {!isHome && siteSettings && (
        <Link href='/'>
          <Image // logo
            src={siteSettings.logoDark}
            alt={siteSettings.logoDarkAlt}
            width={170}
            height={170}
            className='pt-6'
          />
        </Link>
      )}

      {(spotlights && insights && impacts && siteSettings) &&
        <Menu
          spotlights={spotlights}
          insights={insights}
          impacts={impacts}
          siteSettings={siteSettings}
          menuActive={menuActive}
          setMenuActive={setMenuActive}
        />
      }

      {/* localizationEnabled variable check temporarily disabled for the development site to preview French content */}
      {/* IMPORTANT: be sure to re-enable this when pushing to production */}
      {/* {siteSettings && siteSettings?.localiztionEnabled &&
        <LanguageSelect setLanguage={setLocale} isHome={isHome} />
      } */}

      {/* Temporarily enabled for the development site to preview French content */}
      {/* IMPORTANT: remove this line before pushing to production */}
      <LanguageSelect setLanguage={setLocale} isHome={isHome} />
    </header>
  )
}

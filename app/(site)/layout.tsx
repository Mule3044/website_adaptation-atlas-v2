'use client'

import { useState } from 'react'
import { IBM_Plex_Sans } from 'next/font/google'
import Header from '@/components/global/header'
import Footer from '@/components/global/footer'
import { LanguageProvider } from '@/contexts/language-context'
import { SanityDataProvider } from '@/contexts/data-context'

const ibmPlexSans = IBM_Plex_Sans({ weight: ['400', '500', '600', '700'], subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [menuActive, setMenuActive] = useState<boolean>(false)
  const bodyClass = (menuActive) ? 'overflow-hidden' : 'overflow-auto'

  return (
    <body className={`${ibmPlexSans.className} ${bodyClass}`}>
      <LanguageProvider>
        <SanityDataProvider>
          <Header menuActive={menuActive} setMenuActive={setMenuActive} />
          <main className='max-w-[1600px] mx-auto'>{children}</main>
          <Footer />
        </SanityDataProvider>
      </LanguageProvider>
    </body>
  )
}
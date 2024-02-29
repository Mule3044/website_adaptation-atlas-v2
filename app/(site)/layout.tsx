import { IBM_Plex_Sans } from 'next/font/google'
import Header from '@/components/global/header'
import Footer from '@/components/global/footer'

// const openSans = Open_Sans({ subsets: ['latin'] })
const ibmPlexSans = IBM_Plex_Sans({ weight: ['400', '500', '600', '700'], subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <body className={`${ibmPlexSans.className}`}>
      <Header />
      <main>{children}</main>
      <Footer />
    </body>
  )
}
import Image from 'next/image'
import Link from 'next/link'
import { getHomeContent } from '@/lib/sanity.query'
import Footer from '@/components/footer'

export default async function Home() {
  // In next 13, components are server-side-rendered by default
  // Getting the projects here happens on the server side for SEO
  const content = await getHomeContent()

  return (
    <div>
      <Footer />
    </div>
  )
}

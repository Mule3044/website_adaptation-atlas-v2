import HomeHero from '@/components/home/home-hero'
import SplashCarousel from '@/components/home/splash-carousel'
import { getHomeContent, getSpotlights } from '@/lib/sanity.query'

export default async function Home() {
  const homeContent = await getHomeContent()
  const spotlights = await getSpotlights()

  return (
    <div id='home' className='p-5'>
      <HomeHero content={homeContent} />
      <SplashCarousel spotlights={spotlights} />
    </div>
  )
}

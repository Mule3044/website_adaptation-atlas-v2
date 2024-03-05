import HomeHero from '@/components/home/home-hero'
import HomeCarousel from '@/components/home/home-carousel'
import { getHomeContent, getSpotlights, getInsights, getImpacts, getPrimaryTags } from '@/lib/sanity.query'
import SpotlightGrid from '@/components/home/spotlight-grid'
import InsightCarousel from '@/components/home/insight-carousel'
import ImpactCarousel from '@/components/home/impact-carousel'
import GetInvolvedTout from '@/components/home/get-involved-tout'

export default async function Home() {
  const homeContent = await getHomeContent()
  const spotlights = await getSpotlights()
  const primaryTags = await getPrimaryTags()
  const insights = await getInsights()
  const impacts = await getImpacts()

  return (
    <div id='home' className='p-5'>
      <HomeHero content={homeContent} />
      <HomeCarousel spotlights={spotlights} />
      <SpotlightGrid spotlights={spotlights} tags={primaryTags} />
      <InsightCarousel insights={insights} />
      <ImpactCarousel impacts={impacts} />
      <GetInvolvedTout content={homeContent} />
    </div>
  )
}

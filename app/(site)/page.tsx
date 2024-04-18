'use client'

import HomeHero from '@/components/home/home-hero'
import HomeCarousel from '@/components/home/home-carousel'
import SpotlightGrid from '@/components/home/spotlight-grid'
import InsightCarousel from '@/components/home/insight-carousel'
import ImpactCarousel from '@/components/home/impact-carousel'
import GetInvolvedTout from '@/components/home/get-involved-tout'
import { useSanityData } from '@/contexts/data-context'

export default function Home() {
  const {
    homeContent,
    spotlights,
    primaryTags,
    insights,
    impacts,
    searchContent,
  } = useSanityData()

  return (
    <div id='home' className='p-5'>
      {(homeContent && searchContent) && <HomeHero searchContent={searchContent} content={homeContent} />}
      {spotlights && <HomeCarousel spotlights={spotlights} />}
      {spotlights && primaryTags && <SpotlightGrid spotlights={spotlights} tags={primaryTags} />}
      {insights && <InsightCarousel insights={insights} />}
      {impacts && <ImpactCarousel impacts={impacts} />}
      {homeContent && <GetInvolvedTout content={homeContent} />}
    </div>
  )
}

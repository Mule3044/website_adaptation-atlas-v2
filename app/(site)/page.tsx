'use client'

import HomeHero from '@/components/home/home-hero'
import HomeCarousel from '@/components/home/home-carousel'
import SpotlightGrid from '@/components/home/spotlight-grid'
import InsightCarousel from '@/components/home/insight-carousel'
import ImpactCarousel from '@/components/home/impact-carousel'
import GetInvolvedTout from '@/components/home/get-involved-tout'
import { useSanityData } from '@/contexts/data-context'
import RelatedInfo from '@/components/home/related-info'

export default function Home() {
  const {
    homeContent,
    spotlights,
    primaryTags,
    searchContent,
    siteSettings,
  } = useSanityData()

  return (
    <div id='home' className='p-5'>
      {(homeContent && searchContent && siteSettings) && <HomeHero searchContent={searchContent} content={homeContent} settings={siteSettings} />}
      {/* <HomeCarousel /> */}
      {(spotlights && primaryTags && homeContent) && <SpotlightGrid spotlights={spotlights} tags={primaryTags} homeContent={homeContent} />}
      <RelatedInfo homeContent={homeContent}/>
      {/* <InsightCarousel /> */}
      {/* <ImpactCarousel /> */}
      {/* {homeContent && <GetInvolvedTout content={homeContent} />} */}
    </div>
  )
}

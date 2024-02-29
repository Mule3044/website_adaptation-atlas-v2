'use client'

import { Spotlight } from '@/types/sanity.types'

type Props = {
  spotlights: Spotlight[]
}

const SplashCarousel = ({ spotlights }: Props) => {

  return (
    <div id='splash-carousel'>
      {spotlights.map((spotlight: Spotlight) =>
        <div key={spotlight._id}>
          <h2>{spotlight.carousel.title}</h2>
          <h3>{spotlight.carousel.description}</h3>
        </div>
      )}
    </div>
  )
}

export default SplashCarousel
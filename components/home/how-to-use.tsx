'use client'

import { Home} from '@/types/sanity.types'
import '@/public/style.css'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { breakpoints } from '@/lib/constants'
type Props = {
  homeContent: Home
}

const HowToUse = ({ homeContent }: Props) => {
    const content = homeContent?.howToUse
    const isDesktop = useMediaQuery(breakpoints.xl)
  return (
  <div id='how-to-use' className={`${ isDesktop ? 'h-[60vw]' : 'h-[60vw]'} mt-20 mb-30 min-h-[325px] max-h-[920px]`}>
        <h1 className='mb-3'>{content?.title}</h1>
        <p className='font-[500] max-w-[720px]'>{content?.description}</p>
        {content?.video &&
            <iframe width='100%' height='100%' style={{display: 'flex', justifyItems: 'left', alignItems: 'start', margin: '10px 0px'}} src={content.video.src} id='video' title="Set up your first video" allow='autoplay; fullscreen; picture-in-picture; clipboard-write'></iframe>
        }
    </div>
  )
}

export default HowToUse
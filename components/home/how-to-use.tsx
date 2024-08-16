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
  return (
    <div id='how-to-use' className='my-20 h-[65vw] min-h-[325px] max-h-[1050px]'>
        <h1 className='mb-3'>{content?.title}</h1>
        <p className='mb-[20px] font-[500] max-w-[720px]'>{content?.description}</p>
        {content?.video &&
            <iframe width='100%' height='100%' style={{display: 'flex', justifyItems: 'left'}} src={content.video.src} id='video' title="Set up your first video" allow='autoplay; fullscreen; picture-in-picture; clipboard-write'></iframe>
        }
    </div>
  )
}

export default HowToUse
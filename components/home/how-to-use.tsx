'use client'

import { Home} from '@/types/sanity.types'
import '@/public/style.css'
type Props = {
  homeContent: Home
}

const HowToUse = ({ homeContent }: Props) => {
    const content = homeContent?.howToUse
  return (
    <div id='how-to-use' className='pt-20'>
        <h1 className='mb-3'>{content?.title}</h1>
        <p>{content?.description}</p>
        {content?.video &&
            <iframe width='100%' height='776' src={content.video.src} id='video' title="Set up your first video" allow='autoplay; fullscreen; picture-in-picture; clipboard-write'></iframe>
        }
    </div>
  )
}

export default HowToUse
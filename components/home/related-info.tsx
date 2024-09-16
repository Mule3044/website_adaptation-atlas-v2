'use client'

import { Home} from '@/types/sanity.types'
import { PortableText } from '@portabletext/react'
import '@/public/style.css'
type Props = {
  homeContent: Home
}

const RelatedInfo = ({ homeContent }: Props) => {
    const content = homeContent?.relatedInfo
  return (
    <div id='related-info' className='mt-[150px]'>
        <h1 className='mt-20 mb-3'>{content?.title}</h1>
        <div className='grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-4'> 
            <div>
                <h3 className='my-5'>{content?.title1}</h3>
                <div className='PortableText'><PortableText value={content?.content1} /></div>
            </div>
            <div>
                <h3 className='my-5'>{content?.title2}</h3>
                <span className='PortableText' ><PortableText value={content?.content2} /></span>
            </div>
            <div>
                <h3 className='my-5'>{content?.title3}</h3>
                <div className='PortableText'><PortableText value={content?.content3} /></div>
            </div>
            <div>
                <h3 className='my-5'>{content?.title4}</h3>
                <div className='PortableText'><PortableText value={content?.content4} /></div>
            </div>
        </div>
    </div>
  )
}

export default RelatedInfo
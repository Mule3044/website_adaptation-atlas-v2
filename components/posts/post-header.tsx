'use client'

import Image from 'next/image'
import { useSanityData } from '@/contexts/data-context'

type Props = {
  type: string
  title: string
  icon: string
  iconAlt: string
}

const PostHeader = ({ type, title, icon, iconAlt }: Props) => {
  const {
    siteSettings,
  } = useSanityData()

  if (siteSettings) {
    const kicker = (type === 'insight') ? siteSettings.contentTypes?.insightsTitle : siteSettings.contentTypes?.impactsTitle
    return (
      <header className='max-w-[940px] mx-auto mb-16'>
        <div className='flex gap-3 items-end mb-3'>
          <div className='p-2 bg-black'>
            <Image
              src={icon}
              alt={iconAlt}
              width={15}
              height={15}
            />
          </div>
          <span className='uppercase leading-none font-medium'>{kicker}</span>
        </div>
        <h1 className='page-header'>{title}</h1>
      </header>
    )
  }
}

export default PostHeader
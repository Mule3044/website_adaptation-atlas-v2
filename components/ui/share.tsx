'use client'

import { useState } from 'react'
import cn from 'classnames'

type Props = {
  type?: string
}

const Share = ({ type }: Props) => {
  const [tooltipVisible, setTooltipVisible] = useState(false)
  const handleCopyToClipboard = async () => {
    const url = window.location.origin  // Get the root URL of the application

    try {
      await navigator.clipboard.writeText(url)
      // Temporarily display a confirmation tooltip
      setTooltipVisible(true)
      setTimeout(() => {
        setTooltipVisible(false)
      }, 2000)
    } catch (err) {
      console.error('Failed to copy URL: ', err)
    }
  }

  return (
    <div className='relative'>
      <button
        onClick={handleCopyToClipboard}
        className={cn(
          'font-medium transition-all',
          type === 'light' ? 'text-white opacity-90 hover:opacity-100' : 'text-grey-600 hover:text-brand-green',
        )}
      >
        Share
      </button>
      <div className={cn(
        'absolute -top-8 left-1/2 transform -translate-x-1/2 pointer-events-none',
        'bg-grey-600 text-white text-xs rounded px-2 py-1',
        'transition-all duration-500 ease-in-out',
        tooltipVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3',
      )}>
        Copied
      </div>
    </div>
  )
}
export default Share
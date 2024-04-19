'use client'

import Share from '@/components/ui/share'
import { useSanityData } from '@/contexts/data-context'

const Footer = () => {
  const year = new Date().getFullYear()
  const {
    siteSettings,
  } = useSanityData()

  if (siteSettings) return (
    <footer className='flex flex-col lg:flex-row justify-between w-full p-5'>
      <p className='order-2 lg:order-1'>© {year} {siteSettings.footer.copyright}</p>
      <div className='relative flex flex-col lg:flex-row order-1 lg:order-2 gap-4 mb-5'>
        <a href={siteSettings.footer.mailingListLink} className='font-medium text-grey-600 hover:text-brand-green transition-colors'>{siteSettings.footer.mailingListLabel}</a>
        <a href={siteSettings.footer.feedbackLink} className='font-medium text-grey-600 hover:text-brand-green transition-colors'>{siteSettings.footer.feedbackLabel}</a>
        <a href={siteSettings.footer.contactLink} className='font-medium text-grey-600 hover:text-brand-green transition-colors'>{siteSettings.footer.contactLabel}</a>
        <Share />
      </div>
    </footer>
  )
}
export default Footer
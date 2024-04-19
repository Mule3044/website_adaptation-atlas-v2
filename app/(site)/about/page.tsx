import { Metadata } from 'next'
import { siteTitle } from '@/lib/constants'
import AboutContent from '@/components/pages/about-content'

export const metadata: Metadata = {
  title: `About the Atlas | ${siteTitle}`,
}

export default async function About() {
  return (
    <AboutContent />
  )
}

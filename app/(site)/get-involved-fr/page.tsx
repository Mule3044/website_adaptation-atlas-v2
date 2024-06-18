import { Metadata } from 'next'
import { siteTitle } from '@/lib/constants'
import GetInvolvedContent from '@/components/pages/get-involved-content'

export const metadata: Metadata = {
  title: `Get Involved | ${siteTitle}`,
}

export default async function GetInvolved() {
  return (
    <GetInvolvedContent />
  )
}

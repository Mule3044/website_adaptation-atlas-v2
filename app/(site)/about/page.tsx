import { getAboutContent } from '@/lib/sanity.query'
import { PortableText } from '@portabletext/react'
import { portableTextPage } from '@/components/sanity/portable-text-page'
import { Metadata } from 'next'
import { siteTitle } from '@/lib/constants'

export const metadata: Metadata = {
  title: `About the Atlas | ${siteTitle}`,
}

export default async function About() {
  const content = await getAboutContent()

  return (
    <div id='about' className='p-5 mt-20 lg:mt-32'>
      <header className='max-w-[960px] mx-auto mb-16'>
        <h1 className='page-header'>{content.title}</h1>
      </header>
      <div id='page-content' className='mb-[100px]'>
        <PortableText value={content.content} components={portableTextPage} />
      </div>
    </div>
  )
}

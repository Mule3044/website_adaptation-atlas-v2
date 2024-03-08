import { getGetInvolvedContent } from '@/lib/sanity.query'
import { PortableText } from '@portabletext/react'
import { portableTextPage } from '@/components/sanity/portable-text-page'

export default async function GetInvolved() {
  const content = await getGetInvolvedContent()

  return (
    <div id='get-involved' className='p-5 mt-32'>
      <header className='max-w-[960px] mx-auto mb-16'>
        <h1 className='text-4xl text-brand-green font-semibold'>{content.title}</h1>
      </header>
      <div id='page-content' className='mb-[100px]'>
        <PortableText value={content.content} components={portableTextPage} />
      </div>
    </div>
  )
}

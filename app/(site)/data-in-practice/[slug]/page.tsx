import { getImpactPost } from '@/lib/sanity.query'

type Props = {
  params: { slug: string }
}

export default async function ImpactPost({ params }: Props) {
  const post = await getImpactPost(params.slug)

  return (
    <div id='impact-post' className='p-5'>
      <h1>{post.title}</h1>
    </div>
  )
}

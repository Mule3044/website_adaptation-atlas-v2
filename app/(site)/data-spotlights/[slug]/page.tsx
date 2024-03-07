import { getSpotlightPost } from '@/lib/sanity.query'

type Props = {
  params: { slug: string }
}

export default async function SpotlightPost({ params }: Props) {
  const post = await getSpotlightPost(params.slug)

  return (
    <div id='spotlight-post' className='p-5'>
      <h1>{post.title}</h1>
    </div>
  )
}

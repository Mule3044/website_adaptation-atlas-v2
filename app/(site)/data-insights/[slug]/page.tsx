import { getInsightPost } from '@/lib/sanity.query'

type Props = {
  params: { slug: string }
}

export default async function InsightPost({ params }: Props) {
  const post = await getInsightPost(params.slug)

  return (
    <div id='insight-post' className='p-5'>
      <h1>{post.title}</h1>
    </div>
  )
}

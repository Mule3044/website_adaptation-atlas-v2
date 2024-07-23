"use client"

import Image from "next/image"
import Link from "next/link"
import { LiaArrowRightSolid } from "react-icons/lia"
import { RelatedPost } from "@/types/sanity.types"
import { useSanityData } from "@/contexts/data-context"

type Props = {
  posts: RelatedPost[]
}

const RelatedPosts = ({ posts }: Props) => {
  const { siteSettings } = useSanityData()
  const paths = [
    {
      type: "spotlight",
      path: "data-explorations",
      image: "/images/icon-bars-dark.svg",
    },
    {
      type: "insight",
      path: "quick-reads",
      image: "/images/icon-badge-dark.svg",
    },
    {
      type: "impact",
      path: "use-cases",
      image: "/images/icon-page-dark.svg",
    },
  ]

  if (siteSettings)
    return (
      <div id="related-posts" className="max-w-[940px] mx-auto mt-20 mb-20">
        <div className="mb-8">
          <h2>{siteSettings.postOptions.relatedTitle}</h2>
        </div>
        <div>
          {posts.map((post: RelatedPost) => {
            const type = paths.find((type) => type.type === post._type)
            const url = `/${type?.path}/${post.slug}`
            return (
              <Link
                href={url}
                className="relative flex justify-between items-center bg-grey-100 pl-6 pr-8 py-4 mb-4 w-full transition-colors hover:bg-brand-green hover:text-white group"
              >
                <Image // icon
                  src={type!.image}
                  alt={"Icon"}
                  width={18}
                  height={18}
                  className="absolute"
                />
                <p className="ml-8 mr-8 mb-0 text-[20px] truncate">
                  {post.title}
                </p>
                <LiaArrowRightSolid className="absolute right-6 h-7 w-7 ml-2 transition-transform group-hover:translate-x-2" />
              </Link>
            )
          })}
        </div>
      </div>
    )
}

export default RelatedPosts

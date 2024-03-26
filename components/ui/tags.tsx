'use client'

import { useState, useEffect, useContext } from 'react'
import { Button } from '@/components/ui/button'
import { BiX } from 'react-icons/bi'
import { Spotlight, Tag } from '@/types/sanity.types'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselContext,
} from '@/components/ui/carousel'

type Props = {
  data: Spotlight[]
  tags: Tag[]
  activeTags: Tag[]
  setActiveTags: React.Dispatch<React.SetStateAction<Tag[]>>
  setFilteredData: React.Dispatch<React.SetStateAction<Spotlight[]>>
  resetFilter: () => void
}

const Tags = ({ data, tags, activeTags, setActiveTags, setFilteredData, resetFilter }: Props) => {
  const carouselContext = useContext(CarouselContext)

  const handleTagClick = (clickedTag: string) => {
    // resetFilter() // clear search filter query
    setActiveTags(currentActiveTags => {
      const isTagActive = currentActiveTags.some(tag => tag.name === clickedTag)
      if (isTagActive) {
        return currentActiveTags.filter(tag => tag.name !== clickedTag)
      } else {
        const tagToAdd = tags.find(tag => tag.name === clickedTag)
        return tagToAdd ? [...currentActiveTags, tagToAdd] : currentActiveTags
      }
    })
    carouselContext?.scrollToStart() // Reset carousel to the start
  }

  useEffect(() => {
    // resetFilter() // clear search filter query
    if (activeTags.length > 0) {
      setFilteredData(data.filter(post =>
        activeTags.every(activeTag =>
          (post.primaryTags ?? []).some(tag => tag.name === activeTag.name)
        )
      ))
    } else {
      setFilteredData(data)
    }
  }, [activeTags, data, setFilteredData])

  // Sort tags array so that active tags come first
  const sortedTags = [...tags].sort((a, b) => {
    const aActive = activeTags.some(tag => tag.name === a.name)
    const bActive = activeTags.some(tag => tag.name === b.name)
    return aActive === bActive ? 0 : aActive ? -1 : 1
  })

  return (
    <CarouselContent className='mr-10'>
      {sortedTags.map((tag: Tag) => {
        const tagActive = activeTags.some(activeTag => activeTag.name === tag.name)
        return (
          <CarouselItem key={tag._id} className='basis-auto'>
            <Button
              variant={tagActive ? 'tagActive' : 'tag'}
              size={'sm'}
              onClick={() => handleTagClick(tag.name)}
            >
              {tag.name}{tagActive && <BiX className='scale-150 ml-2 -mr-1' />}
            </Button>
          </CarouselItem>
        )
      })}
    </CarouselContent>
  )
}

export default Tags
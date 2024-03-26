'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { BiX } from 'react-icons/bi'
import { Spotlight, Tag } from '@/types/sanity.types'

type Props = {
  data: Spotlight[]
  tags: Tag[]
  activeTags: Tag[]
  setActiveTags: React.Dispatch<React.SetStateAction<Tag[]>>
  setFilteredData: React.Dispatch<React.SetStateAction<Spotlight[]>>
  resetFilter: () => void
}

const Tags = ({ data, tags, activeTags, setActiveTags, setFilteredData, resetFilter }: Props) => {

  // Function to handle tag click
  const handleTagClick = (clickedTag: string) => {
    resetFilter() // clear search filter query
    setActiveTags(currentActiveTags => {
      const isTagActive = currentActiveTags.some(tag => tag.name === clickedTag);
      if (isTagActive) {
        // Remove the tag if it's already active
        return currentActiveTags.filter(tag => tag.name !== clickedTag);
      } else {
        // Add the tag if it's not already active
        // Find the full tag object to add
        const tagToAdd = tags.find(tag => tag.name === clickedTag);
        return tagToAdd ? [...currentActiveTags, tagToAdd] : currentActiveTags;
      }
    });
  };


  // Filter spotlights when activeTag changes
  useEffect(() => {
    resetFilter() // clear search filter query
    if (activeTags.length > 0) {
      setFilteredData(data.filter(post =>
        activeTags.every(activeTag =>
          // Ensure post.primaryTags is treated as an array even if it's undefined
          (post.primaryTags ?? []).some(tag => tag.name === activeTag.name)
        )
      ));
    } else {
      setFilteredData(data); // No tags are active, so don't filter
    }
  }, [activeTags, data, setFilteredData]);
  


  return (
    <div id='tags' className='flex gap-3'>
      {tags.map((tag: Tag) =>
        <Button
          key={tag._id}
          variant={activeTags.some(activeTag => activeTag.name === tag.name) ? 'tagActive' : 'tag'}
          size={'sm'}
          onClick={() => handleTagClick(tag.name)}
        >
          {tag.name}
        </Button>
      )}
    </div>
  )
}

export default Tags
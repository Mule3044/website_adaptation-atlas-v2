'use client'

import * as React from 'react'
import { IoChevronBackSharp } from 'react-icons/io5'
import { IoChevronForwardSharp } from 'react-icons/io5'
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from 'embla-carousel-react'

import cn from 'classnames'
import { Button } from '@/components/ui/button'

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: 'horizontal' | 'vertical'
  setApi?: (api: CarouselApi) => void
  type?: 'hero' | 'gallery' | 'tags'
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollToStart: () => void
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

export const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />')
  }

  return context
}

const ProgressBar = ({ progress }: any) => {
  return (
    <div className="w-full bg-gray-200 h-0.5 rounded-full overflow-hidden">
      <div
        className="bg-grey-600 h-full transition-all"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};


const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = 'horizontal',
      opts,
      setApi,
      type,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === 'horizontal' ? 'x' : 'y',
      },
      plugins
    )
    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)
    const [currentSlide, setCurrentSlide] = React.useState(0)
    const [totalSlides, setTotalSlides] = React.useState(0)

    // Calculate the progress for the progress bar
    const slidesVisible = 3; // Number of slides visible at once
    const totalUniqueFirstSlides = Math.max(1, totalSlides - slidesVisible + 1);
    const currentIndex = currentSlide - 1; // Adjust for zero-based indexing
    const progress = ((currentIndex / Math.max(1, totalUniqueFirstSlides - 1)) * 100).toFixed(2); // Ensure the division is safe

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return
      }

      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }, [])

    const scrollToStart = () => {
      api?.scrollTo(0)
    }

    const scrollPrev = React.useCallback(() => {
      if (!api) return

      // If it's the first slide, jump to the last slide
      if (api.canScrollPrev()) {
        api.scrollPrev()
      } else {
        api.scrollTo(api.slideNodes().length - 1) // Jump to the last slide
      }
    }, [api])

    const scrollNext = React.useCallback(() => {
      if (!api) return

      // If it's the last slide, jump back to the first slide
      if (api.canScrollNext()) {
        api.scrollNext()
      } else {
        api.scrollTo(0) // Jump back to the first slide
      }
    }, [api])

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'ArrowLeft') {
          event.preventDefault()
          scrollPrev()
        } else if (event.key === 'ArrowRight') {
          event.preventDefault()
          scrollNext()
        }
      },
      [scrollPrev, scrollNext]
    )

    React.useEffect(() => {
      if (!api || !setApi) {
        return
      }

      setApi(api)
    }, [api, setApi])

    

    React.useEffect(() => {
      if (!api) {
        return
      }

      // Set the total number of slides
      setTotalSlides(api.slideNodes().length)

      // Set the current slide
      setCurrentSlide(api.selectedScrollSnap() + 1)

      // Update the current slide on carousel select change
      const onSelect = () => {
        setCurrentSlide(api.selectedScrollSnap() + 1)
      }

      api.on('select', onSelect)

      return () => {
        api?.off('select', onSelect)
      }
    }, [api])

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          scrollToStart,
          type,
          opts,
          orientation:
            orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal'),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn('relative', className)}
          role='region'
          aria-roledescription='carousel'
          {...props}
        >
          {children}
          {/* Hero carousel current slide indicator */}
          {type === 'hero' &&
            <div id='carousel-indicator' className='absolute flex justify-center w-full text-white uppercase bottom-5'>
              {currentSlide} of {totalSlides}
            </div>
          }
          {/* Gallery carousel progress bar */}
          {type === 'gallery' && (
            <div className="py-5 mb-5">
              <ProgressBar progress={progress} />
            </div>
          )}
        </div>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = 'Carousel'

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div ref={carouselRef} className='overflow-hidden'>
      <div
        ref={ref}
        className={cn(
          'flex',
          orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col',
          className
        )}
        {...props}
      />
    </div>
  )
})
CarouselContent.displayName = 'CarouselContent'

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel()

  return (
    <div
      ref={ref}
      role='group'
      aria-roledescription='slide'
      className={cn(
        'min-w-0 shrink-0 grow-0 basis-full',
        orientation === 'horizontal' ? 'pl-4' : 'pt-4',
        className
      )}
      {...props}
    />
  )
})
CarouselItem.displayName = 'CarouselItem'

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = 'outline', size = 'icon', ...props }, ref) => {
  const { type, orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={'carousel'}
      size={size}
      className={cn(
        'absolute  h-8 w-8 rounded-full',
        'left-5 top-1/2 -translate-y-1/2',
        { 'top-[190px]': type === 'gallery' },
        { '-left-2 border border-grey-200 text-grey-300': type === 'tags' },
        className
      )}
      // disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <IoChevronBackSharp className='h-6 w-6 -ml-0.5' />
      <span className='sr-only'>Previous slide</span>
    </Button>
  )
})
CarouselPrevious.displayName = 'CarouselPrevious'

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = 'outline', size = 'icon', ...props }, ref) => {
  const { type, orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={'carousel'}
      size={size}
      className={cn(
        'absolute h-8 w-8 rounded-full',
        'right-5 top-1/2 -translate-y-1/2',
        { 'top-[190px]': type === 'gallery' },
        { '-right-1 border border-grey-200 text-grey-300': type === 'tags' },
        className
      )}
      // disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <IoChevronForwardSharp className='h-6 w-6 -mr-0.5' />
      <span className='sr-only'>Next slide</span>
    </Button>
  )
})
CarouselNext.displayName = 'CarouselNext'

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
}

'use client'
import { cn } from 'src/utilities/cn'
import React from 'react'
import type { Post } from '@/payload-types'
import { Card } from '@/components/Card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { type CarouselApi } from '@/components/ui/carousel'

// plugins
import Autoplay from 'embla-carousel-autoplay'

export type Props = {
  posts: Post[]
}

export const CollectionCarousel: React.FC<Props> = (props) => {
  const { posts } = props
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  // plugins
  const autoplayPlugin = React.useRef(Autoplay({ delay: 1895, stopOnInteraction: true }))

  return (
    <div className={cn('container')}>
      {/* options: https://www.embla-carousel.com/api/options/ */}
      <Carousel
        opts={{
          align: 'start',
          loop: false,
          direction: 'rtl',
        }}
        className="mx-auto w-4/5 md:w-full"
        setApi={setApi}
        plugins={[autoplayPlugin.current]}
        onMouseEnter={autoplayPlugin.current.stop}
        onMouseLeave={autoplayPlugin.current.reset}
      >
        {/* spacing: https://ui.shadcn.com/docs/components/carousel */}
        <CarouselContent className="-ml-1 rtl">
          {posts?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                // size: To set the size of the items, you can use the basis utility class on the CarouselItem.
                // 50% on small screens and 33% on larger screens.
                <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
                  <div className="h-full p-1">
                    <Card className="h-full" doc={result} relationTo="posts" showCategories />
                  </div>
                </CarouselItem>
              )
            }

            return null
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="py-2 text-center text-sm text-muted-foreground">
        اسلاید {current} از {count}{' '}
      </div>
    </div>
  )
}

import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
} from '@/components/ui/carousel'
import { Dispatch, SetStateAction, useMemo } from 'react'

//Modified from https://www.reddit.com/r/nextjs/comments/1cgktu9/shadcnui_image_carousel_with_thumbnail_images/
interface CarouselProps {
    listingImages: any
    current: number
    handleClick: (index: number) => void
    setApi: Dispatch<SetStateAction<CarouselApi>>
}

export default function ThumbnailCarousel({
    listingImages,
    current,
    handleClick,
    setApi,
}: CarouselProps) {
    const thumbnailImages = useMemo(
        () =>
            listingImages.map((image: string, index: number) => (
                <CarouselItem
                    key={index}
                    className="relative basis-1/4 shrink"
                    onClick={() => handleClick(index)}
                >
                    <div className="h-30 overflow-hidden flex aspect-square justify-center">
                        <img
                            className={`${
                                index === current
                                    ? 'border-2 h-full w-auto object-contain'
                                    : 'h-full w-auto object-contain'
                            }`}
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                        />
                    </div>
                </CarouselItem>
            )),
        [listingImages, current]
    )

    return (
        <Carousel
            className="mx-15 shrink flex justify-center"
            opts={{ loop: true }}
            setApi={setApi}
        >
            <CarouselContent>{thumbnailImages}</CarouselContent>
        </Carousel>
    )
}

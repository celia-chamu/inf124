import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    CarouselApi,
} from '@/components/ui/carousel'
import { Dispatch, SetStateAction, useMemo } from 'react'

//Modified from https://www.reddit.com/r/nextjs/comments/1cgktu9/shadcnui_image_carousel_with_thumbnail_images/
interface CarouselProps {
    listingImages: any
    setApi: Dispatch<SetStateAction<CarouselApi>>
}

export default function ListingCarousel({
    listingImages,
    setApi,
}: CarouselProps) {
    const mainImage = useMemo(
        () =>
            listingImages.map((image: string, index: number) => (
                <CarouselItem key={index}>
                    <div className="md:h-140 max-w-[55vw] overflow-hidden flex justify-center">
                        <img
                            src={image}
                            className="h-full w-auto object-contain"
                        />
                    </div>
                </CarouselItem>
            )),
        [listingImages]
    )

    return (
        <Carousel className="mx-15" setApi={setApi} opts={{ loop: true }}>
            <CarouselContent>{mainImage}</CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}

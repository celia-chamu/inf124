import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'
import { image } from '@/mockDatabase'

//Modified from https://www.reddit.com/r/nextjs/comments/1cgktu9/shadcnui_image_carousel_with_thumbnail_images/
interface CarouselProps {
    listingImages: any
}

export default function ListingCarousel({ listingImages }: CarouselProps) {
    return (
        <Carousel className="mx-15" opts={{ loop: true }}>
            <CarouselContent>
                {listingImages.map((image: image, index: number) => (
                    <CarouselItem key={index}>
                        <div className="h-140 max-w-[55vw] overflow-hidden flex justify-center">
                            <img
                                src={image.url}
                                className="h-full w-auto object-contain"
                            />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}
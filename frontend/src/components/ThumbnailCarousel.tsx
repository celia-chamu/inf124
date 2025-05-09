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

export default function ThumbnailCarousel({ listingImages }: CarouselProps) {
    return (
        <Carousel className="mx-15 shrink flex justify-center" opts={{ loop: true }}>
            <CarouselContent>
                {listingImages.map((image: image, index: number) => (
                    <CarouselItem key={index} className='relative basis-1/2'>
                        <div className="h-30 overflow-hidden flex aspect-square justify-center">
                            <img
                                src={image.url}
                                className="h-full w-auto object-contain"
                            />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    )
}
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'
import { listingType } from '@/mockDatabase'

interface CarouselProps {
    listing: listingType
}

export default function ListingCarousel({ listing }: CarouselProps) {
    return (
        <Carousel className = "mx-15" opts={{ loop: true }}>
            <CarouselContent>
                <CarouselItem>
                    <div className="h-140 max-w-[55vw] overflow-hidden flex justify-center">
                        <img
                            src={listing?.imageUrl}
                            className="h-full w-auto object-contain"
                        />
                    </div>
                </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}

import Link from 'next/link'
import ListingCard from './ListingCard'
import { fetchListingsByOwner, fetchOwnerByEmail } from '@/mockDatabase'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from './ui/button'


interface SellerInfoProps {
    email: string
}

export function formatMonthYear(dateString: string | undefined): string {
    const date = dateString ? new Date(dateString) : new Date()
    return date.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
    })
}

export default function SellerInfo({ email }: SellerInfoProps) {
    const sellerListings = fetchListingsByOwner(email)
    const seller = fetchOwnerByEmail(email)

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ListingZot" className="w-[8vw]">
                    View Seller
                </Button>
            </DialogTrigger>
            <DialogContent className="min-w-1/2">
                <DialogHeader>
                    <DialogTitle>Seller Info</DialogTitle>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-4">
                            <div className="rounded-full w-25 h-25 border border-gray-300 overflow-hidden">
                                <img
                                    className="w-full h-full object-cover inline-block"
                                    src={seller?.images[0].url}
                                />
                            </div>
                            <div className="flex flex-col">
                                <p className=" text-2xl">{seller?.name}</p>
                                <p className="text-lg">
                                    {formatMonthYear(seller?.joined)}
                                </p>
                                <p className="text-md">
                                    {' '}
                                    <b>Items Sold:</b> {sellerListings.length}
                                </p>
                            </div>
                        </div>

                        <p className="text-2xl font-bold my-4">Other Posts</p>

                        <div className="grid md:grid-cols-6 gap-4 overflow-y-auto max-h-[50vh]">
                            {sellerListings.map((sellerListings) => (
                                <Link
                                    key={sellerListings.id}
                                    href={`/market/${sellerListings.id}`}
                                    className="hover:cursor-pointer"
                                >
                                    <ListingCard
                                        id={sellerListings.id}
                                        imageUrl={sellerListings.images[0].url}
                                        title={sellerListings.title}
                                        price={sellerListings.price}
                                    />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

'use client'
import Link from 'next/link'
import ListingCard from './ListingCard'

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
import api from '@/app/api/api'
import { useEffect, useState } from 'react'

export interface listingType {
    id: string
    images: string
    title: string
    price: number
    seller: string
    category: string
    item_condition: string
    item_description: string
    created_at: string
    image?: string
}

interface SellerInfoProps {
    email: string
}

interface userType {
    uci_net_id: string
    reputation: number
    join_date: string
    full_name: string
    profile_pic: string
}

export function formatMonthYear(dateString: string | undefined): string {
    const date = dateString ? new Date(dateString) : new Date()
    return date.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
    })
}

export default function SellerInfo({ email }: SellerInfoProps) {
    const [listings, setListings] = useState<listingType[]>([])
    const [seller, setSeller] = useState<userType>()

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const listingResponse = await api.get(
                    'fetch-listings-sold-by',
                    {
                        params: { seller: email },
                    }
                )

                const rawListings = listingResponse.data

                const listingsWithImages = await Promise.all(
                    rawListings.map(async (listing: listingType) => {
                        try {
                            const imageRes = await api.get('/fetch-pictures', {
                                params: { listingid: listing.id },
                            })
                            listing.image =
                                imageRes.data?.[0]?.item_picture ||
                                'images/no-image.png'
                        } catch {
                            listing.image = 'images/no-image.png'
                        }
                        return listing
                    })
                )

                setListings(listingsWithImages)

                const sellerResponse = await api.get('check-user', {
                    params: { uci_net_id: email },
                })
                setSeller(sellerResponse.data)
            } catch (error) {
                console.error('Failed to fetch seller info or listings:', error)
            }
        }

        fetchListings()
    }, [email])

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ListingZot" className="sm:w-[8vw]">
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
                                    src={seller?.profile_pic}
                                />
                            </div>
                            <div className="flex flex-col">
                                <p className=" text-2xl">{seller?.full_name}</p>
                                <p className="text-lg">
                                    {formatMonthYear(seller?.join_date)}
                                </p>
                                <p className="text-md">
                                    {' '}
                                    <b>Items Posted:</b> {listings.length}
                                </p>
                            </div>
                        </div>

                        <p className="text-2xl font-bold my-4">Other Posts</p>

                        <div className="grid md:grid-cols-6 gap-4 overflow-y-auto max-h-[50vh]">
                            {listings.map((listings) => (
                                <Link
                                    key={listings.id}
                                    href={`/market/${listings.id}`}
                                    className="hover:cursor-pointer"
                                >
                                    <ListingCard
                                        id={listings.id}
                                        image={
                                            listings.image ??
                                            (listings.images
                                                ? listings.images
                                                      .split(',')
                                                      .map((img) =>
                                                          img.trim()
                                                      )[0] ||
                                                  'images/no-image.png'
                                                : 'images/no-image.png')
                                        }
                                        title={listings.title}
                                        price={listings.price}
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

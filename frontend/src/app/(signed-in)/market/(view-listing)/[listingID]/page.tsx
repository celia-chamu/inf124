'use client'

import ListingCard from '@/components/ListingCard'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useState } from 'react'
import { fetchListing } from '@/mockDatabase'
import { useParams } from 'next/navigation'
import ListingCarousel from '@/components/ListingCarousel'
import SellerInfo from '@/components/SellerInfo'
import ThumbnailCarousel from '@/components/ThumbnailCarousel'

export default function Page() {
    const pageparams = useParams<{ listingID: string }>()
    const listing = fetchListing(pageparams.listingID)

    return (
        <div className="w-full">
            <div className="flex gap-8">
                <div className="flex flex-col gap-4 w-full">
                    <ListingCarousel listingImages={listing?.images!} />
                    <ThumbnailCarousel listingImages={listing?.images!} />
                    <div className="flex gap-4">
                        <Button className="text-xl cursor-pointer h-8 w-[8vw]">
                            Save
                        </Button>
                        <Button className="text-xl cursor-pointer h-8 w-[8vw]">
                            Report
                        </Button>
                        <Button className="text-xl cursor-pointer h-8 w-[8vw]">
                            Share
                        </Button>
                    </div>
                </div>

                <div className="bg-gray-500 p-8 h-197 w-1/3 flex flex-col gap-10">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold">{listing?.title}</h1>
                        <p className="text-2xl font-bold">${listing?.price}</p>
                        <p className="text-2xl">Posted 1 hr ago</p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="text-2xl font-bold">Details</p>
                        <p className="text-2xl">
                            Category: {listing?.category}
                        </p>
                        <p className="text-2xl">
                            Condition: {listing?.condition}
                        </p>
                        <div className="bg-gray-300 rounded-lg text-2xl pl-2 h-60 w-full mt-2 mb-2">
                            {listing?.description}
                        </div>
                        <p className="text-2xl font-bold">Seller</p>
                        <p>{listing?.owner}</p>

                        <SellerInfo />
                    </div>
                    <Link href="/inbox">
                        <Button className="text-2xl cursor-pointer h-16 w-full font-bold">
                            Message
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

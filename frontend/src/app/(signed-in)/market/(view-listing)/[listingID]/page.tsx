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
        <div className="w-full m-0 bg-white shadow-lg rounded-md">
            <div className="flex gap-10">
                <div className="flex flex-col gap-5 w-full">
                    <ListingCarousel listingImages={listing?.images!} />
                    <ThumbnailCarousel listingImages={listing?.images!} />
                    <div className="p-5 flex gap-5">
                        <Button variant="ListingZot" className="w-[8vw]">
                            Save
                        </Button>
                        <Button variant="ListingZot" className="w-[8vw]">
                            Report
                        </Button>
                        <Button variant="ListingZot" className="w-[8vw]">
                            Share
                        </Button>
                    </div>
                </div>

                <div className="bg-(--sidebar-button-background) rounded-sm p-10 pb-25 h-full w-4/10 flex flex-col gap-2">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold">{listing?.title}</h1>
                        <p className="text-xl">${listing?.price}</p>
                        <p className="text-md">Posted 1 hr ago</p>
                    </div>

                    <div className="flex flex-col gap-2 mb-5">
                        <p className="text-xl font-bold">Details</p>

                        <p className="text-lg">
                            <b> Category: </b> {listing?.category}
                        </p>
                        <p className="text-lg">
                            <b> Condition: </b> {listing?.condition}
                        </p>

                        <div className="bg-white rounded-sm text-md pl-2 h-50 w-full mt-2 mb-2">
                            {listing?.description}
                        </div>
                        <Link href="/inbox">
                            <Button variant="ListingZot" className="w-full">
                                Message
                            </Button>
                        </Link>
                    </div>
                    <div className="pb-5 flex flex-col gap-5">
                        <div className="line"></div>
                        <p className="text-lg">
                            <b> Seller: </b> {listing?.owner}
                        </p>
                        {listing && <SellerInfo email={listing.owner} />}
                    </div>
                </div>
            </div>
        </div>
    )
}

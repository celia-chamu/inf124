'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import ListingCarousel from '@/components/ListingCarousel'
import SellerInfo from '@/components/SellerInfo'
import ThumbnailCarousel from '@/components/ThumbnailCarousel'
import { CarouselApi } from '@/components/ui/carousel'
import api from '@/app/api/api'
import { useSession } from 'next-auth/react'
import { listingType } from '@/mockDatabase'

export default function Page() {
    const pageparams = useParams<{ listingID: string }>()
    const [listing, setListing] = useState<listingType>()
    const [mainApi, setMainApi] = useState<CarouselApi>()
    const [thumbnailApi, setThumbnailApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const [index, setIndex] = useState<number>()
    const { data: session } = useSession()

    useEffect(() => {
        const fetchListing = async () => {
            const response = await api.get('fetch-listing', {
                params: { id: pageparams.listingID },
            })
            setListing(response.data)
        }
        fetchListing()
    }, [])

    useEffect(() => {
        if (!mainApi || !thumbnailApi) {
            return
        }

        if (index) {
            thumbnailApi.scrollTo(index)
            mainApi.scrollTo(index)
            setCurrent(index)
            setIndex(undefined)
        }

        const handleTopSelect = () => {
            const selected = mainApi.selectedScrollSnap()
            setCurrent(selected)
            thumbnailApi.scrollTo(selected)
        }

        const handleBottomSelect = () => {
            const selected = thumbnailApi.selectedScrollSnap()
            setCurrent(selected)
            mainApi.scrollTo(selected)
        }

        mainApi.on('select', handleTopSelect)
        thumbnailApi.on('select', handleBottomSelect)

        return () => {
            mainApi.off('select', handleTopSelect)
            thumbnailApi.off('select', handleBottomSelect)
        }
    }, [mainApi, thumbnailApi, index])

    const handleClick = (index: number) => {
        if (!mainApi || !thumbnailApi) {
            setIndex(index)
            setCurrent(index)
            return
        }
        thumbnailApi.scrollTo(index)
        mainApi.scrollTo(index)
        setCurrent(index)
    }

    const handleCheck = async () => {
        try {
            const response = await api.get('/conversation-exist', {
                params: {
                    seller: listing?.owner,
                    buyer: session?.user?.email,
                },
            })

            console.log('Conversation exists:', response.data)
        } catch (error: any) {
            if (error.response.status === 404) {
                try {
                    await api.post('/create-conversation', {
                        conversation_id: 0,
                        seller: listing?.owner,
                        buyer: session?.user?.email,
                        started_at: new Date(),
                        last_message_at: null,
                        last_message_preview: null,
                    })
                } catch (creationError) {
                    console.error('User creation failed:', creationError)
                }
            }
        }
    }
    if (!listing) {
        return <></>
    } else {
        console.log(listing)
    }

    return (
        <div className="w-full m-0 bg-white shadow-lg rounded-md">
            <div className="flex lg:flex-row flex-col gap-10">
                <div className="flex flex-col gap-5 w-full">
                    <ListingCarousel
                        listingImages={listing.images.split(', ')}
                        setApi={setMainApi}
                    />
                    <div className="hidden lg:block">
                        <ThumbnailCarousel
                            listingImages={listing.images.split(', ')}
                            current={current}
                            handleClick={handleClick}
                            setApi={setThumbnailApi}
                        />
                    </div>
                    <div className="p-5 flex gap-5">
                        <Button
                            variant="ListingZot"
                            className="lg:w-[8vw] w-[24vw]"
                        >
                            Save
                        </Button>
                        <Button
                            variant="ListingZot"
                            className="lg:w-[8vw] w-[24vw]"
                        >
                            Report
                        </Button>
                        <Button
                            variant="ListingZot"
                            className="lg:w-[8vw] w-[24vw]"
                        >
                            Share
                        </Button>
                    </div>
                </div>

                <div className="bg-(--sidebar-button-background) rounded-sm p-10 pb-25 h-full lg:w-4/10 w-full flex flex-col gap-2">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold">{listing.title}</h1>
                        <p className="text-xl">${listing.price}</p>
                        <p className="text-md">Posted 1 hr ago</p>
                    </div>

                    <div className="flex flex-col gap-2 mb-5">
                        <p className="text-xl font-bold">Details</p>

                        <p className="text-lg">
                            <b> Category: </b> {listing.category}
                        </p>
                        <p className="text-lg">
                            <b> Condition: </b> {listing.condition}
                        </p>

                        <div className="bg-white rounded-sm text-md pl-2 h-50 w-full mt-2 mb-2">
                            {listing?.description}
                        </div>
                        <Link href="/inbox">
                            <Button
                                variant="ListingZot"
                                className="w-full"
                                onClick={handleCheck}
                            >
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

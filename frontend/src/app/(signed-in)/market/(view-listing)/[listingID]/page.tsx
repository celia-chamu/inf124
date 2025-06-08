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

interface listingType {
    id: string
    images: string
    title: string
    price: number
    seller: string
    category: string
    item_condition: string
    item_description: string
    created_at: string
}

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
                    seller: listing?.seller,
                    buyer: session?.user?.email,
                },
            })

            console.log('Conversation exists:', response.data)
        } catch (error: any) {
            if (error.response.status === 404) {
                try {
                    await api.post('/create-conversation', {
                        conversation_id: 0,
                        seller: listing?.seller,
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

    const handleDelete = async () => {
        try {
            await api.delete(`/delete-listing/${listing.id}`)
            console.log('Listing deleted successfully')
        } catch (error) {
            console.error('Error deleting listing:', error)
        }
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
                            <b> Condition: </b> {listing.item_condition}
                        </p>

                        <div className="bg-white rounded-sm text-md pl-2 h-50 w-full mt-2 mb-2">
                            {listing?.item_description}
                        </div>
                        {session?.user?.email === listing?.seller ? (
                            <Link href="/market">
                                <Button
                                    variant="ListingZot"
                                    className="w-full"
                                    onClick={handleDelete}
                                >
                                Delete Listing
                                </Button>
                            </Link>
                        ):(
                            <Link href="/inbox">
                                <Button
                                    variant="ListingZot"
                                    className="w-full"
                                    onClick={handleCheck}
                                >
                                    Message
                                </Button>
                            </Link>
                        )}
                    </div>
                    <div className="pb-5 flex flex-col gap-5">
                        <div className="line"></div>
                        <p className="text-lg">
                            <b> Seller: </b> {listing?.seller}
                        </p>
                        {listing && <SellerInfo email={listing.seller} />}
                    </div>
                </div>
            </div>
        </div>
    )
}

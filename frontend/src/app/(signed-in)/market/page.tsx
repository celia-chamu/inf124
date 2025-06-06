'use client'
import Link from 'next/link'
import ListingCard from '@/components/ListingCard'
import SearchBar from '@/components/searchbar'
import { useState, useEffect } from 'react'
import api from '@/app/api/api'

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
}


export default function Page() {
    const [category, setCategory] = useState('')
    const [search, setSearch] = useState('')
    const [listings, setListings] = useState<listingType[]>([])

    useEffect(() => {
        const fetchListings = async () => {
            const response = await api.get('fetch-listings', {
                params: { search: search, category: category },
            })
            setListings(response.data)
        }
        fetchListings()
    }, [category, search])

    return (
        <div className="w-auto h-auto flex flex-col gap-4 grow">
            <SearchBar setCategory={setCategory} setSearch={setSearch} />
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                {listings.map((listing: listingType) => (
                    <Link
                        key={listing.id}
                        href={`/market/${listing.id}`}
                        className="hover:cursor-pointer"
                    >
                        <ListingCard
                            id={listing.id}
                            image={listing.images?.split(', ')[0] || "images/no-image.png"}
                            title={listing.title}
                            price={listing.price}
                        />
                    </Link>
                ))}
            </div>
        </div>
    )
}

'use client'

import { Input } from './ui/input'
import { SearchIcon } from 'lucide-react'
import { Filter } from 'lucide-react'
import { useState } from 'react'
import { useIsMobile } from '@/hooks/use-mobile'
import { fetchFilters } from '@/mockDatabase'
import { useEffect } from 'react'

interface Props {
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    setCategory: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchBar({setSearch, setCategory} : Props) {
    const [filterClick, setFilterClick] = useState(false)

    const filters = [
        "Category",
        "Furniture",
        "Clothing",
        "Shoes",
        "Vehicles",
        "Electronics",
        "Textbooks",
        "Appliances",
        "Services",
        "Art",
        "Meme",
        "Collectors",
        "Beauty",
        "Other"
    ]

    // Check to see if the filter has been clicked
    const handleFilterClick = () => {
        console.log('Set filter')
        setFilterClick(!filterClick)
        setCategory("")
    }

    // Check mobile size
    const isMobile = useIsMobile()

    // Lock scrolling when popup for mobile appears
    useEffect(() => {
        if (filterClick && isMobile) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
        }, [filterClick, isMobile]);

    return (
        <div className="flex flex-col items-center">
            {/* Search bar and filter button */}
            <div className="relative w-full flex items-center">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                    className="pl-10 pr-10 rounded-lg h-auto w-full"
                    placeholder="Search ZotMarket"
                    onChange={search => setSearch(search.target.value)}
                />
                <button
                    className="ml-2 text-gray-600"
                    onClick={handleFilterClick}
                >
                    <Filter className="w-6 h-6" />
                </button>
            </div>
            {filterClick ? (
                isMobile ? (
                    // Mobile filter popup
                    <div className="fixed inset-0 z-50 flex justify-center items-start pt-20 backdrop-blur-sm bg-white/30">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-sm">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold">
                                    Filter Options
                                </h2>
                                <button
                                    onClick={handleFilterClick}
                                    className="text-gray-500 text-sm"
                                >
                                    Close
                                </button>
                            </div>
                            <div className="flex flex-col gap-2">
                                {filters.map((filter) => (
                                    <button
                                        key={filter}
                                        className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 text-left"
                                    >
                                        {filter}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="mt-2 w-full bg-white border rounded-lg shadow p-2 flex flex-wrap gap-2">
                        {/* Test for now change later to another custom component */}
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded"
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                )
            ) : (
                <div></div>
            )}
        </div>
    )
}

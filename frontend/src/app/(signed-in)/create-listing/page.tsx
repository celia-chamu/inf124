'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { use, useState } from 'react'

function CreateListing() {
    const [preview, setPreview] = useState<string | null>(null)

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => setPreview(reader.result as string)
            reader.readAsDataURL(file)
        }
    }

    return (
        <div className="w-full flex flex-col">
            <div className="flex px-4 pl-0 lg:pl-[5vw] lg:ml-[6vw]">
                <div className="bg-(--sidebar-background) shadow-lg w-full md:w-[70vw] lg:w-[60vw] xl:w-[65vw] p-6 md:p-12 rounded-md">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex flex-col items-center justify-center gap-2 w-full md:w-auto">
                            {preview ? (
                                <div className="w-80 h-80 bg-gray-100 border border-gray-300 rounded-md overflow-hidden">
                                    <img
                                        src={preview}
                                        alt="Image Preview"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="w-80 h-80 bg-gray-100 border border-gray-300 rounded-md flex items-center justify-center text-gray-500">
                                    No Image
                                </div>
                            )}

                            <label className="cursor-pointer left-0 bg-(--primary) text-white px-4 py-2 font-bold rounded-md">
                                Upload Image
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </label>
                        </div>
                        <div className="flex flex-col gap-4 md:gap-12 w-full">
                            <input
                                type="text"
                                placeholder="Title"
                                className="bg-white rounded-md shadow-lg border-1 border-gray-400 w-[50vw] md:w-[18vw] lg:w-full border-black text-xl md:text-xl pl-2"
                            />
                            <input
                                type="text"
                                placeholder="Price"
                                className="bg-white rounded-md shadow-lg border-1 border-gray-400 w-[50vw] md:w-[18vw] lg:w-full border-black text-xl md:text-xl pl-2"
                            />
                            <select className="bg-white rounded-md shadow-lg border-1 border-gray-400 w-[50vw] md:w-[18vw] lg:w-full border-gray-400 text-xl md:text-xl pl-2">
                                <option value="">Category</option>
                                <option value="Furniture">Furniture</option>
                                <option value="Clothing">Clothing</option>
                                <option value="Shoes">Shoes</option>
                                <option value="Vehicles">Vehicles</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Textbooks">Textbooks</option>
                                <option value="Appliances">Appliances</option>
                                <option value="Services">Services</option>
                                <option value="Art">Art</option>
                                <option value="Meme">Meme</option>
                                <option value="Collectors">Collectors</option>
                                <option value="Beauty">Beauty</option>
                                <option value="Other">Other</option>
                            </select>
                            <select className="bg-white rounded-md shadow-lg border-1 border-gray-400 w-[50vw] md:w-[18vw] lg:w-full border-gray-400 text-xl md:text-xl pl-2">
                                <option value="">Condition</option>
                                <option value="pre-owned">Pre-Owned</option>
                                <option value="like-new">Like New</option>
                                <option value="new">New</option>
                            </select>
                        </div>
                    </div>
                    {/* Change vw if you want description box bigger ex. h-[20vw] -> h-[25vw]*/}
                    <textarea
                        placeholder="Description"
                        className="bg-white rounded-lg border border-gray-400 text-xl md:text-xl pl-2 mt-8 w-full h-[20vw] md:h-[10vw]"
                    />
                    <div className="flex justify-end">
                        <Link href="/market">
                            <Button
                                variant="ListingZot"
                                className="mt-4 sm:mt-5 md:mt-4"
                            >
                                Create New Listing
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateListing

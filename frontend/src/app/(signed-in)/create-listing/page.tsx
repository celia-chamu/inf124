'use client'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import api from '@/app/api/api'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

// Modified code from: https://stackoverflow.com/questions/55831213/uploading-multiple-images-with-react

function CreateListing() {
    const [preview, setPreview] = useState<string | null>(null)
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [condition, setCondition] = useState('')
    const [description, setDescription] = useState('')
    const { data: session } = useSession()
    const router = useRouter()

    type Upload = {
        file: File
        name: string
        type: string
        sizeMB: string
        status: string
    }

    const [uploads, setUploads] = useState<Upload[]>([])
    const MAX_MB = 10

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || [])

        const uploadsInit = files.map((file) => {
            const isTooLarge = file.size / 1024 / 1024 > MAX_MB
            return {
                file,
                name: file.name,
                type: file.type,
                sizeMB: (file.size / 1024 / 1024).toFixed(2),
                status: isTooLarge ? 'error' : 'pending',
            }
        })

        const firstValidImage = uploadsInit.find(
            (file) => file.status !== 'error'
        )?.file
        if (firstValidImage) {
            const reader = new FileReader()
            reader.onloadend = () => setPreview(reader.result as string)
            reader.readAsDataURL(firstValidImage)
        }
        setUploads((prev) => [...prev, ...uploadsInit])
    }

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (/^\d*\.?\d{0,2}$/.test(value)) {
            setPrice(value)
        }
    }

    const handleCreateListing = async () => {
        try {
            const listing = {
                id: 0,
                seller: session?.user?.email,
                title,
                price: parseFloat(price),
                category,
                item_condition: condition,
                item_description: description,
                created_at: new Date().toISOString(),
                images: '',
            }
            const listingRes = await api.post('/create-listing', listing)
            const newListingId = listingRes.data.id || 0
            const imageUploads = uploads.filter((img) => img.status !== 'error')
            for (const upload of imageUploads) {
                const reader = new FileReader()
                reader.onloadend = async () => {
                    try {
                        await api.post('/add-picture', {
                            id: Date.now(),
                            item_picture: reader.result,
                            listingid: newListingId,
                        })
                        setUploads((prev) =>
                            prev.map((u) =>
                                u.name === upload.name
                                    ? { ...u, status: 'done' }
                                    : u
                            )
                        )
                    } catch (error) {
                        console.error('Image upload failed:', error)
                        setUploads((prev) =>
                            prev.map((u) =>
                                u.name === upload.name
                                    ? { ...u, status: 'error' }
                                    : u
                            )
                        )
                    }
                }
                reader.readAsDataURL(upload.file)
            }
            alert('Listing Created successfully!')
            router.push('/market')
        } catch (err: any) {
            console.error('Upload failed:', err)
            alert('There was an error creating the listing.')
        }
    }

    return (
        <div className="w-full flex flex-col">
            <div className="flex px-4 pl-0 lg:pl-[5vw] lg:ml-[6vw]">
                <div className="bg-(--sidebar-background) shadow-lg w-[91vw] md:w-[70vw] lg:w-[60vw] xl:w-[65vw] p-6 md:p-12 rounded-md">
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

                            <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 font-bold rounded-md">
                                Upload Image(s)
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </label>
                            <div className="mt-4 w-80">
                                {uploads.map((upload, idx) => (
                                    <div
                                        key={idx}
                                        className={`rounded border border-white px-2 py-1 mb-2 `}
                                    >
                                        <div className="flex justify-between text-sm">
                                            <span>{upload.name}</span>
                                            <span>{upload.sizeMB} MB</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-4 md:gap-12 w-full">
                            <input
                                type="text"
                                placeholder="Title"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="bg-white rounded-md shadow-lg border-1 border-gray-400 w-[50vw] md:w-[18vw] lg:w-full text-xl md:text-xl pl-2"
                            />
                            <input
                                type="text"
                                inputMode="decimal"
                                required
                                step="0.01"
                                placeholder="Price"
                                value={price}
                                onChange={handlePriceChange}
                                className="bg-white rounded-md shadow-lg border-1 border-gray-400 w-[50vw] md:w-[18vw] lg:w-full text-xl md:text-xl pl-2"
                            />
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                required
                                className="bg-white rounded-md shadow-lg border-1 border-gray-400 w-[50vw] md:w-[18vw] lg:w-full text-xl md:text-xl pl-2"
                            >
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
                            <select
                                value={condition}
                                onChange={(e) => setCondition(e.target.value)}
                                className="bg-white rounded-md shadow-lg border-1 border-gray-400 w-[50vw] md:w-[18vw] lg:w-full text-xl md:text-xl pl-2"
                            >
                                <option value="">Condition</option>
                                <option value="pre-owned">Pre-Owned</option>
                                <option value="like-new">Like New</option>
                                <option value="new">New</option>
                            </select>
                        </div>
                    </div>
                    {/* Change vw if you want description box bigger ex. h-[20vw] -> h-[25vw]*/}
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                        className="bg-white rounded-lg border border-gray-400 text-xl md:text-xl pl-2 mt-8 w-full h-[20vw] md:h-[10vw]"
                    />
                    <div className="flex justify-center lg:justify-end">
                        <Button
                            variant="ListingZot"
                            className="mt-4 sm:mt-5 md:mt-4"
                            onClick={handleCreateListing}
                            disabled={
                                uploads.filter((u) => u.status !== 'error')
                                    .length === 0
                            }
                        >
                            Create New Listing
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateListing

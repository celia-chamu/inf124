'use client'
import { useState } from 'react'
import { fetchOwnerByEmail } from '@/mockDatabase'
import { useSession } from 'next-auth/react'

export default function AccountSettings() {
    const { data: session } = useSession()
    const UserEmail = session?.user?.email
    const seller = UserEmail ? fetchOwnerByEmail(UserEmail) : null
    const [preview, setPreview] = useState<string | null>(null)
    const [nameEdit, setNameEdit] = useState(false)
    const [emailEdit, setEmailEdit] = useState(false)
    const [name, setName] = useState(seller?.name ?? '')
    const [email, setEmail] = useState(seller?.email ?? '')

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => setPreview(reader.result as string)
            reader.readAsDataURL(file)
        }
    }
    return (
        <div className="flex flex-col items-center md:items-start w-full lg:ml-[20vw]">
            <div className="flex flex-col items-center justify-center gap-2 w-full md:w-auto">
                <div className="flex items-center gap-6 mb-8">
                    <div className="w-50 h-50 rounded-full overflow-hidden bg-gray-200 border border-gray-300 flex items-center justify-center">
                        <img
                            src={
                                preview ??
                                seller?.images?.[0]?.url ??
                                '/no_photo.png'
                            }
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-xl font-medium">
                            {seller?.name ?? 'First Name'}
                        </p>
                        <label className="cursor-pointer bg-blue-600 text-white px-4 py-1 font-bold rounded-md w-fit text-sm">
                            Upload Image
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </label>
                    </div>
                </div>
            </div>

            <h1 className="text-2xl font-bold pt-8 mb-8">Account</h1>
            <div className="flex flex-col gap-6 w-full max-w-xl">
                <div className="flex items-center justify-between">
                    {nameEdit ? (
                        <input
                            value={seller?.name}
                            onChange={(e) => setName(e.target.value)}
                            className="border-b-2 border-gray-400 text-lg w-full mr-4"
                        />
                    ) : (
                        <p className="text-lg border-b-2 border-gray-400 w-full mr-4">
                            {seller?.name}
                        </p>
                    )}
                    <button
                        onClick={() => setNameEdit((prev) => !prev)}
                        className="text-sm font-bold text-blue-600"
                    >
                        {nameEdit ? 'Save' : 'Edit'}
                    </button>
                </div>

                <div className="flex items-center justify-between">
                    {emailEdit ? (
                        <input
                            value={seller?.email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border-b-2 border-gray-400 text-lg w-full mr-4"
                        />
                    ) : (
                        <p className="text-lg border-b-2 border-gray-400 w-full mr-4 ">
                            {seller?.email}{' '}
                        </p>
                    )}
                    <button
                        onClick={() => setEmailEdit((prev) => !prev)}
                        className="text-sm font-bold text-blue-600"
                    >
                        {emailEdit ? 'Save' : 'Edit'}
                    </button>
                </div>
            </div>

            <h1 className="text-2xl font-bold pt-8 mb-8">Notifications</h1>

            <div className="flex">
                <div className=" h-40 inline-block w-2xs xs:w-sm sm:w-sm xl:w-xl lg:w-lg md:w-md">
                    <p className="text-lg">Notification Preference</p>
                    <div className="bg-gray-400 h-1" />
                </div>

                <div className=" h-40 inline-block w-[2vw]">
                    <button className="text-lg font-bold cursor-pointer">
                        Edit
                    </button>
                    <div className="bg-gray-400 h-1" />
                </div>
            </div>
        </div>
    )
}

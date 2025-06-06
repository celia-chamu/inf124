'use client'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import api from '@/app/api/api'

interface userType {
    uci_net_id: string
    reputation: number
    join_date: string
    full_name: string
    profile_pic: string
}

export default function AccountSettings() {
    const { data: session } = useSession()
    const [user, setUser] = useState<userType>()
    const [preview, setPreview] = useState<string | null>(null)

    useEffect(() => {
        if (!session) {
            return
        }
        const getPic = async () => {
            try {
                const response = await api.get('/fetch-profileImage', {
                    params: {
                        uci_net_id: session?.user?.email,
                    },
                })
                setPreview(response.data)
            } catch (err: any) {
                console.log('Error fetching image')
            }
        }
        const fetchUser = async () => {
            const sellerResponse = await api.get('check-user', {
                params: { uci_net_id: session?.user?.email },
            })
            setUser(sellerResponse.data)
        }
        getPic()
        fetchUser()
    }, [session])

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = async () => {
                const base64Image = reader.result as string
                setPreview(base64Image)

                try {
                    await api.put('/update-profileImage', {
                        uci_net_id: session?.user?.email,
                        image: base64Image, // ✅ send base64 string to backend
                    })
                } catch (err: any) {
                    console.log('Error changing image', err)
                }
            }
            reader.readAsDataURL(file)
        }
    }
    return (
        <div className="flex flex-col items-center md:items-start w-full lg:ml-[20vw]">
            <div className="flex flex-col items-center justify-center gap-2 w-full md:w-auto">
                <div className="flex items-center gap-6 mb-8">
                    <div className="w-50 h-50 rounded-full overflow-hidden bg-gray-200 border border-gray-300 flex items-center justify-center">
                        <img
                            src={preview ?? '/no_photo.png'}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-xl font-medium">
                            {user?.full_name ?? 'First Name'}
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
                    <p className="border-b-2 border-gray-400 text-lg w-full mr-4">
                        {' '}
                        {session?.user?.name || ''}{' '}
                    </p>
                </div>

                <div className="flex items-center justify-between">
                    <p className="border-b-2 border-gray-400 text-lg w-full mr-4">
                        {' '}
                        {session?.user?.email || ''}{' '}
                    </p>
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

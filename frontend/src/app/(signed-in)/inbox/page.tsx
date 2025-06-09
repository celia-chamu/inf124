'use client'
import Message from '@/components/Message'
import { MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import api from '@/app/api/api'

export interface Conversation {
    conversation_id: number
    seller: string
    buyer: string
    started_at: Date
    last_message_at?: Date
    last_message_preview?: string
}

function Inbox() {
    const [view, setView] = useState('buyers')
    const { data: session } = useSession()
    const [conversations, setConversations] = useState<Conversation[]>([])
    const [loading, setLoading] = useState(true)
    const [profilePictures, setProfilePictures] = useState<
        Record<string, string>
    >({})

    const fetchProfilePicture = async (id: string) => {
        const response = await api.get('/fetch-profileImage', {
            params: {
                uci_net_id: id,
            },
        })

        return response.data
    }
    useEffect(() => {
        const loadProfilePictures = async () => {
            const newPics: Record<string, string> = {}

            await Promise.all(
                conversations.map(async (convo) => {
                    const id = view === 'buyers' ? convo.seller : convo.buyer

                    if (!profilePictures[id]) {
                        try {
                            const url = await fetchProfilePicture(id)
                            newPics[id] = url
                        } catch {
                            newPics[id] = ''
                        }
                    }
                })
            )

            setProfilePictures((prev) => ({ ...prev, ...newPics }))
        }

        if (conversations.length > 0) {
            loadProfilePictures()
        }
    }, [conversations, view])
    useEffect(() => {
        const fetchConversations = async () => {
            setLoading(true)
            if (!session?.user?.email) return
            if (view === 'buyers') {
                try {
                    const response = await api.get('/fetch-conversations', {
                        params: {
                            user: session.user?.email,
                            type: 'buyer',
                        },
                    })
                    setConversations(response.data.flat())
                } catch (error) {
                    console.log('Error fetching conversations:', error)
                    setConversations([])
                }
            } else {
                try {
                    const response = await api.get('/fetch-conversations', {
                        params: {
                            user: session.user?.email,
                            type: 'seller',
                        },
                    })
                    setConversations(response.data.flat())
                } catch (error) {
                    console.log('Error fetching conversations:', error)
                    setConversations([])
                }
            }
            setLoading(false)
        }

        fetchConversations()
    }, [view, session?.user?.email])

    const messages = useMemo(() => {
        return conversations.map((convo) => {
            const id = view === 'buyers' ? convo.seller : convo.buyer
            const profileImage = (profilePictures[id] != "" ? profilePictures[id]:'https://i.fbcd.co/products/original/l010e-6-e02-mainpreview-3720591835ee8456a0067e9828c79295abd5810e798a532e1c013a3114580b44.jpg')

            return (
                <Link
                    key={convo.conversation_id}
                    href={`/message/${id.split('@')[0]}`}
                >
                    <Message
                        username={id}
                        textMessage={convo.last_message_preview ?? ''}
                        profilePicture={profileImage}
                    />
                </Link>
            )
        })
    }, [conversations, view, profilePictures])

    return (
        <div className="flex flex-col w-full">
            <div className="bg-(--sidebar-button-background) rounded-sm mt-4 p-4 gap-8 flex items-center">
                <Button
                    className="rounded-2x1 cursor-pointer grow"
                    onClick={() => setView('buyers')}
                    variant="ListingZot"
                >
                    Buyers
                </Button>
                <Button
                    className="rounded-2x1 cursor-pointer grow"
                    onClick={() => setView('sellers')}
                    variant="ListingZot"
                >
                    Sellers
                </Button>
            </div>
            {!loading ? (
                <div className="bg-(--sidebar-button-background) rounded-sm mt-4 p-8 h-180">
                    {messages.length > 0 ? (
                        messages
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full">
                            <MessageCircle className="h-32 w-32 sm:h-64 sm:w-64" />
                            <p className="text-2xl"> Inbox is empty ...</p>
                        </div>
                    )}
                </div>
            ) : (
                <div className="bg-(--sidebar-button-background) rounded-sm mt-4 p-8 h-180">
                    {' '}
                </div>
            )}
        </div>
    )
}
export default Inbox

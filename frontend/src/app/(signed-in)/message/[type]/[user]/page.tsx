// InboxMessage.tsx
'use client'

import { useState, useEffect, cache, useRef } from 'react'
import { useParams } from 'next/navigation'
import Message from '@/components/Message'
import MessageInput from '@/components/messageInput'
import { useSession } from 'next-auth/react'
import api from '@/app/api/api'
import useOnlineStatus from '@/hooks/onlineStatus'

export interface Message {
    message_id: number
    conversation_id: number
    sender: string
    content: string
    sent_at: Date
    has_read: boolean
}

export default function InboxMessage() {
    const query = useParams()
    const type = query.type
    const cacheMessageList = useRef<string[]>([])
    const [messages, setMessages] = useState<Message[]>([])
    const [conversationID, setConversationId] = useState(0)
    const { data: session } = useSession()
    const isOnline = useOnlineStatus()
    const [sendCache, setSendCache] = useState(false)
    const [profilePicUser, setProfilePicUser] = useState("")
    const [profilePicOther, setProfilePicOther] = useState("")

    const fetchProfilePicture = async (id: string) => {
        const response = await api.get('/fetch-profileImage', {
            params: {
                uci_net_id: id,
            },
        })

        return response.data
    }
    
    useEffect(() => {
        const getProfilePictures = async() =>{
            const user_response = await fetchProfilePicture(session?.user?.email || "")
            const other_response = await fetchProfilePicture(query.user + '@uci.edu'|| "")

             setProfilePicUser(user_response)
             setProfilePicOther(other_response)
        }
        getProfilePictures()
    }, []
    )
    // Store messages into a array if user is offline
    useEffect(() => {
        const sendStoredMessages = async() => {
            while(cacheMessageList.current.length > 0){
                const message = cacheMessageList.current.shift()
                try {
                await api.post('/create-message', {
                    message_id: 0,
                    conversation_id: conversationID,
                    sender: session?.user?.email,
                    content: message,
                    sent_at: new Date(),
                    has_read: false,
                    
                })
                await api.put('/update-last-message', {
                    conversation_id: conversationID,
                    seller: query.user + '@uci.edu',
                    buyer: session?.user?.email,
                    started_at: new Date(),
                    last_message_at: new Date(),
                    last_message_preview: message
                })
                await fetchMessages()
                } catch (error: any) {
                    console.error('Message creation failed', error)
                }
            }
        }
        if (isOnline && sendCache){
            sendStoredMessages()
            setSendCache(false)
        }
    }, [setSendCache, isOnline])
    // Initialize state to hold the messages for the current conversation
    useEffect(() => {
        const fetchConversationID = async () => {
            if (type == "buyingFrom"){
                try {
                const response = await api.get('/conversation-exist', {
                    params: {
                        seller: query.user + '@uci.edu',
                        buyer: session?.user?.email,
                    },
                })
                setConversationId(response.data[0][0])
            } catch (error: any) {
                if (error.response?.status === 404) {
                    return -1
                } else {
                    console.error('Failed to fetch conversation ID:', error)
                }
            }
            }
            else{
                try {
                const response = await api.get('/conversation-exist', {
                    params: {
                        seller: session?.user?.email,
                        buyer: query.user + '@uci.edu',
                    },
                })
                setConversationId(response.data[0][0])
            } catch (error: any) {
                if (error.response?.status === 404) {
                    return -1
                } else {
                    console.error('Failed to fetch conversation ID:', error)
                }
            }
            }
        }

        fetchConversationID()
    }, [])

    useEffect(() => {
        if (conversationID !== 0) {
            // only fetch if conversationID is valid
            fetchMessages()
        }
    }, [conversationID])

    const fetchMessages = async () => {
        try {
            const messages = await api.get('/fetch-messages', {
                params: {
                    conversation_id: conversationID,
                },
            })
            setMessages(messages.data.flat())
        } catch (error: any) {
            console.error('Error fetching message:', error)
        }
    }

    const handleSendMessage = async (newMessage: string) => {
        if (isOnline === false){
            setSendCache(true)
            cacheMessageList.current.push(newMessage)
        }
        else{
            try {
                await api.post('/create-message', {
                    message_id: 0,
                    conversation_id: conversationID,
                    sender: session?.user?.email,
                    content: newMessage,
                    sent_at: new Date(),
                    has_read: false,
                })
                await api.put('/update-last-message', {
                    conversation_id: conversationID,
                    seller: query.user + '@uci.edu',
                    buyer: session?.user?.email,
                    started_at: new Date(),
                    last_message_at: new Date(),
                    last_message_preview: newMessage
                })
            await fetchMessages()
            } catch (error: any) {
                console.error('Message creation failed', error)
            }
        }
    }

    return (
        <div className="flex flex-col w-full">
            <div className="bg-(--sidebar-button-background) rounded-sm mt-4 p-8 h-180 overflow-y-auto">
                {/* Loop through the messages */}
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex ${
                            message.sender != session?.user?.email
                                ? 'justify-end'
                                : 'justify-start'
                        } mb-4`}
                    >
                        <Message
                            key={index}
                            username={message.sender}
                            textMessage={message.content}
                            profilePicture={
                                message.sender != session?.user?.email
                                    ? (profilePicOther != "" ? profilePicOther : 'https://i.fbcd.co/products/original/l010e-6-e02-mainpreview-3720591835ee8456a0067e9828c79295abd5810e798a532e1c013a3114580b44.jpg')
                                    : (profilePicUser != "" ? profilePicUser : 'https://i.fbcd.co/products/original/l010e-6-e02-mainpreview-3720591835ee8456a0067e9828c79295abd5810e798a532e1c013a3114580b44.jpg')
                                }
                        />
                    </div>
                ))}
            </div>

            {/* Pass handleSendMessage to the input component */}
            <MessageInput handleSendMessage={handleSendMessage} />
        </div>
    )
}

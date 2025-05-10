// InboxMessage.tsx
'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { fetchMessages, addToMessages } from '@/mockDatabase'
import Message from '@/components/Message'
import MessageInput from '@/components/messageInput'
import { useSession } from "next-auth/react"


export default function InboxMessage() {
    const params = useParams()
    const messageId = parseInt(params.messageId as string)
    console.log(messageId)
    const { data: session } = useSession()
    // Initialize state to hold the messages for the current conversation
    const [messages, setMessages] = useState(fetchMessages(messageId)?.messages || [])
    
    const receiver = fetchMessages(messageId)?.receiver
    const sender = fetchMessages(messageId)?.sender

    console.log(receiver)
    console.log(sender)

    const handleSendMessage = (newMessage: string) => {
        const newMessageObject = {
            reciever: sender ?? "Null",
            sender: receiver ?? "Null",
            text: newMessage ?? "Null",
        }

        console.log(receiver)

        // Add the new message to the messages state
        setMessages(prevMessages => [
            ...prevMessages,
            newMessageObject // Add the new message to the end
        ])

        // Simulate adding the message to the "database"
        addToMessages(messageId, newMessageObject)
    }

    useEffect(() => {
        // Re-fetch messages if they change (or other state management can trigger re-fetching)
        setMessages(fetchMessages(messageId)?.messages || [])
    }, [messageId])

    return (
        <div className="flex flex-col w-full">
            <div className="bg-gray-500 mt-4 p-8 h-180">
                {/* Loop through the messages */}
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex ${message.sender === sender ? 'justify-end' : 'justify-start'} mb-4`}
                    >
                        <Message
                            key={index}
                            username={message.sender === sender ? sender ?? "Unable" : receiver ?? "Unable"}
                            textMessage={message.text}
                        />
                    </div>
                ))}
            </div>

            {/* Pass handleSendMessage to the input component */}
            <MessageInput handleSendMessage={handleSendMessage} />
        </div>
    )
}

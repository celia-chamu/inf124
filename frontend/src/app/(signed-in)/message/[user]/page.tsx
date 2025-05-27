// InboxMessage.tsx
'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { fetchMessages, addToMessages } from '@/mockDatabase'
import Message from '@/components/Message'
import MessageInput from '@/components/messageInput'
import { useSession } from 'next-auth/react'
import api from '@/app/api/api'

export default function InboxMessage() {
    const query = useParams()

    const { data: session } = useSession()
    // Initialize state to hold the messages for the current conversation

    const conversationID = async () => {
        try {
        const response = await api.get("/get_conversations", {
            params: {
                seller: query.user,
                buyer: session?.user?.email
            }
        });

        // Adjust this based on your API's response structure
        return response.data.conversation_id;
    } catch (error: any) {
        if (error.response?.status === 404) {
            return -1;
        }

    }
    }

    useEffect(() => {
        const fetchMessages = async() => {
            try {
                const messages = await api.get("/fetch-messages", {
                    params:{
                        conversation_id: conversationID
                    }
                })
            } catch (error:any){

            }
        }
    })


    const handleSendMessage = (newMessage: string) => {
        const newMessageObject = {
            reciever: sender ?? 'Null',
            sender: receiver ?? 'Null',
            text: newMessage ?? 'Null',
        }

        console.log(receiver)

        // Add the new message to the messages state
        setMessages((prevMessages) => [
            ...prevMessages,
            newMessageObject, // Add the new message to the end
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
            <div className="bg-(--sidebar-button-background) rounded-sm mt-4 p-8 h-180">
                {/* Loop through the messages */}
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex ${
                            message.sender === sender
                                ? 'justify-end'
                                : 'justify-start'
                        } mb-4`}
                    >
                        <Message
                            key={index}
                            username={
                                message.sender === sender
                                    ? sender ?? 'Unable'
                                    : receiver ?? 'Unable'
                            }
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

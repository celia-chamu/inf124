// InboxMessage.tsx
'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { fetchMessages, addToMessages } from '@/mockDatabase'
import Message from '@/components/Message'
import MessageInput from '@/components/messageInput'
import { useSession } from 'next-auth/react'
import api from '@/app/api/api'

export interface Message {
    message_id: number;
    conversation_id: number;
    sender: string;
    content: string;
    sent_at: Date;
    has_read: boolean;
}

export default function InboxMessage() {
    const query = useParams()
    const [messages, setMessages] = useState<Message[]>([])
    const [conversationID, setConversationId] = useState(0)
    const { data: session } = useSession()
    // Initialize state to hold the messages for the current conversation
useEffect(() => {
    const fetchConversationID = async () => {
        console.log(query.user);
        console.log(session?.user?.email);
        try {
            const response = await api.get("/conversation-exist", {
                params: {
                    seller: query.user + "@uci.edu",
                    buyer: session?.user?.email,
                },
            });
            console.log(response.data[0][0]);
            setConversationId(response.data[0][0]);
        } catch (error: any) {
            if (error.response?.status === 404) {
                return -1;
            } else {
                console.error("Failed to fetch conversation ID:", error);
            }
        }
    };

    fetchConversationID();
    }, []);

    useEffect(() => {
        if (conversationID !== 0) {  // only fetch if conversationID is valid
            fetchMessages();
        }
    }, [conversationID]);

    const fetchMessages = async() => {
            try {
                console.log("THIS IS FETCH MESSAGES" + conversationID)
                const messages = await api.get("/fetch-messages", {
                    params:{
                        conversation_id: conversationID
                    }
                }
                )
                setMessages(messages.data.flat())
            } catch (error:any){
                console.error("Error fetching message:", error);
            }
        }



    

    const handleSendMessage = async(newMessage: string) => {
        try{
            console.log(conversationID)
            console.log(query.user + "@uci.edu")
            console.log(newMessage)
            await api.post("/create-message", {
                message_id: 0,
                conversation_id: conversationID,
                sender: session?.user?.email,
                content: newMessage,
                sent_at: new Date(),
                has_read: false
            })
            await fetchMessages()
        } catch(error:any){
            console.error("Message creation failed", error)
        }
    }


    return (
        <div className="flex flex-col w-full">
            <div className="bg-(--sidebar-button-background) rounded-sm mt-4 p-8 h-180">
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
                            username={
                                message.sender
                            }
                            textMessage={message.content}
                        />
                    </div>
                ))}
            </div>

            {/* Pass handleSendMessage to the input component */}
            <MessageInput handleSendMessage={handleSendMessage} />
        </div>
    )
}

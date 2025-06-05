// MessageInput.tsx

import { useState } from 'react'
import { Button } from './ui/button'
import api from '@/app/api/api'
interface MessageInputProps {
    handleSendMessage: (newMessage: string) => void
}

export default function MessageInput({ handleSendMessage }: MessageInputProps) {
    const [text, setText] = useState('')

    const handleKeyEnter = (e: React.KeyboardEvent<HTMLInputElement>) =>  {
        if (e.key === "Enter"){
            e.preventDefault()
            handleSend()
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value)
    }

    const handleSend = () => {
        if (text.trim() === '') return // Don't send empty messages

        console.log('Message Sent: ', text)


        handleSendMessage(text)

        setText('')
    }

    return (
        <div className="w-full p-4">
            <div className="flex items-end space-x-2">
                <input
                    type="text"
                    value={text}
                    onChange={handleChange}
                    placeholder="Type your message..."
                    className="flex-1 border-2 border-(--primary) shadow-lg p-2 rounded-md"
                />
                <Button
                    className="text-white p-2 rounded-md"
                    onClick={handleSend}
                    variant="ListingZot"
                >
                    Send
                </Button>
            </div>
        </div>
    )
}

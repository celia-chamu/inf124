// MessageInput.tsx

import { useState } from "react";

interface MessageInputProps {
    handleSendMessage: (newMessage: string) => void;
}

export default function MessageInput({ handleSendMessage }: MessageInputProps) {
    const [text, setText] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    };

    const handleSend = () => {
        if (text.trim() === '') return; // Don't send empty messages

        console.log("Message Sent: ", text);

        // Call the parent function passed as a prop
        handleSendMessage(text);

        // Clear the text input after sending
        setText('');
    };

    return (
        <div className="flex flex-col w-full mt-4 p-4">
            <input
                type="text"
                value={text}
                onChange={handleChange}
                placeholder="Type your message..."
                className="border p-2 rounded-md mb-4"
            />
            <button
                onClick={handleSend}
                className="bg-blue-500 text-white p-2 rounded-md"
            >
                Send
            </button>
        </div>
    );
}

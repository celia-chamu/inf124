'use client'
import Message from '@/components/Message'
import { Button } from '@/components/ui/button'
import { fetchBuyers, fetchSellers } from '@/mockDatabase'
import { useSession } from 'next-auth/react'
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import api from '@/app/api/api'

export interface Conversation {
  conversation_id: number;
  seller: string;
  buyer: string;
  started_at: Date;
  last_message_at?: Date; 
  last_message_preview?: string;
}

function Inbox() {
    const [view, setView] = useState('buyers')
    const { data: session } = useSession()
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchConversations = async () => {
            setLoading(true)
            if (!session?.user?.email) return;
            if (view === 'buyers') {
                try {
                    const response = await api.get("/fetch-conversations", {
                        params: {
                            user: session.user?.email,
                            type: "buyer"
                        }
                    });
                    setConversations(response.data.flat());
                } catch (error) {
                    console.error("Error fetching conversations:", error);
                }
            }
            else{
                try {
                    const response = await api.get("/fetch-conversations", {
                        params: {
                            user: session.user?.email,
                            type: "seller"
                        }
                    });
                    setConversations(response.data.flat());
                } catch (error) {
                    console.error("Error fetching conversations:", error);
                }
            }
            setLoading(false)
        };

        fetchConversations();
        }, [view, session?.user?.email]);

    const messages = useMemo(() => {
        return conversations.map((convo) => view === "buyers" ? (
            <Link key={convo.conversation_id} href={`/message/${convo.seller.split('@')[0]}`}>
            <Message
                key={convo.seller}
                username={view === 'buyers' ? convo.seller : convo.buyer}
                textMessage={convo.last_message_preview ?? ""}
            />
            </Link>
        ): (
            <Link key={convo.conversation_id} href={`/message/${convo.buyer.split('@')[0]}`}>
            <Message
                key={convo.seller}
                username={view === 'buyers' ? convo.seller : convo.buyer}
                textMessage={convo.last_message_preview ?? ""}
            />
            </Link>
        ))
    }, [conversations, view]);

    return (
        <div className="flex flex-col w-full">
            <div className="bg-(--sidebar-button-background) rounded-sm mt-4 p-4 gap-8 flex items-center">
                <Button
                    className="rounded-2x1 cursor-pointer"
                    onClick={() => setView('buyers')}
                    variant="ListingZot"
                >
                    Buyers
                </Button>
                <Button
                    className="rounded-2x1 cursor-pointer"
                    onClick={() => setView('sellers')}
                    variant="ListingZot"
                >
                    Sellers
                </Button>
            </div>
            {!loading ? 
            (<div className="bg-(--sidebar-button-background) rounded-sm mt-4 p-8 h-180">
                {messages}
            </div>): <div className="bg-(--sidebar-button-background) rounded-sm mt-4 p-8 h-180"> </div>
            }
        </div>
    )
}
export default Inbox

'use client'
import Message from '@/components/Message'
import { Button } from '@/components/ui/button'
import { fetchBuyers, fetchSellers } from '@/mockDatabase'
import { useSession } from 'next-auth/react'
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
function Inbox() {
    const [view, setView] = useState('buyers')
    const { data: session } = useSession()
    console.log(session!.user!.email!)
    const messages = useMemo(() => {
        if (!session) {
            return <div />
        }

        return view === 'buyers'
            ? fetchBuyers(session!.user!.email!).map((message, index) => (
                <Link key={message.messageId} href={`/message/buyer/${message.messageId}`}>
                    <Message
                      key={index}
                      username={message.receiver}
                      textMessage={
                          message.messages[0].sender +
                          ': ' +
                          message.messages[0].text
                      }
                  />
                </Link>
              ))
            : fetchSellers(session!.user!.email!).map((message, index) => (
                <Link key={message.messageId} href={`/message/seller/${message.messageId}`}>
                    <Message
                      key={index}
                      username={message.receiver}
                      textMessage={
                          message.messages[0].sender +
                          ': ' +
                          message.messages[0].text
                      }
                  />
                </Link>
              ))
    }, [view, session])

    return (
        <div className="flex flex-col w-full">
            <div className="bg-gray-500 mt-4 p-4 gap-8 flex items-center">
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

            <div className="bg-gray-500 mt-4 p-8 h-180">{messages}</div>
        </div>
    )
}

export default Inbox

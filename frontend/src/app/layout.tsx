'use client'

import './globals.css'
import Header from '@/components/Header'
import { useEffect, useState } from 'react'
import { SessionProvider } from 'next-auth/react'

export default function RootLayout({ children }: propTypes) {
    const [screenWidth, setScreenWidth] = useState(0)

    useEffect(() => {
        setScreenWidth(window.innerWidth)

        const handleResize = () => setScreenWidth(window.innerWidth)
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <html className="overscroll-none">
            <body className="min-h-screen overflow-y-scroll overscroll-x-none">
                <SessionProvider>
                    <Header />
                </SessionProvider>
                {children}
            </body>
        </html>
    )
}

type propTypes = {
    children: React.ReactNode
}

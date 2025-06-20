'use client'

import NavMenu from '@/components/NavMenu'
import '@/app/globals.css'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

import { useState, useEffect } from 'react'
import { SessionProvider } from 'next-auth/react'

function Layout({ children }: propTypes) {
    const [screenWidth, setScreenWidth] = useState(0)
    useEffect(() => {
        setScreenWidth(window.innerWidth)

        const handleResize = () => setScreenWidth(window.innerWidth)
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <div>
            <SessionProvider>
                <SidebarProvider>
                    <NavMenu />
                    <div className="flex justify-center grow m-4">
                        {children}
                    </div>
                </SidebarProvider>
            </SessionProvider>
        </div>
    )
}

type propTypes = {
    children: React.ReactNode
}

export default Layout

import Link from 'next/link'
import { Button } from './ui/button'
import { signOut } from 'next-auth/react'

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar'

// Menu items.
const items = [
    {
        title: 'Home',
        url: '/market',
        //   icon: ""  (To add icon picture place icon into here)
    },
    {
        title: 'Create New Listing',
        url: '/create-listing',
    },
    {
        title: 'Account Settings',
        url: '/account-settings',
    },
    {
        title: 'Inbox',
        url: '/inbox',
    },
]

function NavMenu() {
    return (
        <div>
            <nav className="hidden p-4 md:flex h-screen flex-col gap-4 bg-(--sidebar-background) items-center">
                <Link className="w-full" href="/market">
                    <Button
                        variant="Menuzot"
                        className="rounded-2x1 cursor-pointer w-full"
                    >
                        <p>Home</p>
                    </Button>
                </Link>

                <Link className="w-full" href="/create-listing">
                    <Button
                        variant="Menuzot"
                        className="rounded-2x1 cursor-pointer w-full"
                    >
                        <p className="w-auto">Create Listing</p>
                    </Button>
                </Link>

                <Link className="w-full" href="/account-settings">
                    <Button
                        variant="Menuzot"
                        className="rounded-2x1 cursor-pointer w-full"
                    >
                        <p>Account Settings</p>
                    </Button>
                </Link>

                <Link className="w-full" href="/inbox">
                    <Button
                        variant="Menuzot"
                        className="rounded-2x1 cursor-pointer w-full"
                    >
                        <p>Inbox</p>
                    </Button>
                </Link>
            </nav>

            <SidebarProvider className="md:hidden">
                <div className="flex">
                    {/* Sidebar Trigger Button */}
                    <SidebarTrigger className="fixed top-0 left-0 z-50 p-10 text-black text-100xl"></SidebarTrigger>

                    <Sidebar>
                        <SidebarContent>
                            <SidebarGroup>
                                <SidebarGroupLabel>ZotMarket</SidebarGroupLabel>
                                <SidebarGroupContent>
                                    <SidebarMenu>
                                        <>
                                            {items.map((item) => (
                                                <SidebarMenuItem
                                                    key={item.title}
                                                >
                                                    <SidebarMenuButton asChild>
                                                        <a href={item.url}>
                                                            <span>
                                                                {item.title}
                                                            </span>
                                                        </a>
                                                    </SidebarMenuButton>
                                                </SidebarMenuItem>
                                            ))}
                                            <SidebarMenuItem key="Sign Out">
                                                <SidebarMenuButton asChild>
                                                    <button
                                                        onClick={() =>
                                                            signOut({
                                                                callbackUrl:
                                                                    'http://localhost:3000',
                                                            })
                                                        }
                                                    >
                                                        <span>Sign Out</span>
                                                    </button>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        </>
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </SidebarGroup>
                        </SidebarContent>
                    </Sidebar>
                </div>
            </SidebarProvider>
        </div>
    )
}

export default NavMenu

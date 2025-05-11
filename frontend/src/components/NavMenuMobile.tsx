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
    SidebarTrigger
  } from "@/components/ui/sidebar"

import { Menu } from "lucide-react";
import { handleSignIn, handleSignOut } from "@/lib/auth";
import { signOut, useSession } from "next-auth/react";
  // Menu items.
const items = [
    {
      title: "Home",
      url: "/market"
    //   icon: ""  (To add icon picture place icon into here)
    },
    {
      title: "Create New Listing",
      url: "/create-listing",
    },
    {
        title: "Account Settings",
        url: "/account-settings",
      },
    {
        title: "Inbox",
        url: "/inbox",
      },
  ]

export default function NavMenuMobile(){
    const {data:session} = useSession()
    return(
        <SidebarProvider>
        <div className="flex">
            {/* Sidebar Trigger Button */}
            <SidebarTrigger className="fixed top-0 left-0 z-50 p-8 w-12 h-12 text-2xl">
                <Menu className="text-2xl"/>
            </SidebarTrigger>
                
            <Sidebar>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>ZotMarket</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>

                                {/* Conditionally render anchor or button based on whether onClick exists */}
                                {!session ? (
                                    <SidebarMenuItem key="Sign In">
                                        <SidebarMenuButton asChild>
                                            <button onClick={handleSignIn}>
                                                <span>Sign In</span>
                                            </button>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ): (
                                    <>
                                    {items.map((item) => (
                                        <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <a href={item.url}>
                                                <span>{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                    <SidebarMenuItem key="Sign Out">
                                        <SidebarMenuButton asChild>
                                            <button onClick={() => signOut( { callbackUrl: 'http://localhost:3000' } )}>
                                                <span>Sign Out</span>
                                            </button>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    </>
                                )}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
        </div>
        </SidebarProvider>
    );
}
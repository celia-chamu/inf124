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
import { handleSignIn } from "@/lib/auth";
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
      {
        title:"Sign In",
        onClick: () => handleSignIn(),
      }
  ]

export default function NavMenuMobile(){
    return(
        <SidebarProvider>
        <div className="flex">
            {/* Sidebar Trigger Button */}
            <SidebarTrigger className="fixed top-0 left-0 z-50 p-8 w-12 h-12 text-2xl bg-blue-500 ">
                <Menu className="text-2xl"/>
            </SidebarTrigger>
                
            <Sidebar>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>ZotMarket</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        {/* Conditionally render anchor or button based on whether onClick exists */}
                                        {item.onClick ? (
                                        <button onClick={item.onClick}>
                                            <span>{item.title}</span>
                                        </button>
                                        ) : (
                                        <a href={item.url}>
                                            <span>{item.title}</span>
                                        </a>
                                        )}
                                    </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
        </div>
        </SidebarProvider>
    );
}
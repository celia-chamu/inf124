"use client";

import NavMenu from "@/components/NavMenu";
import "@/app/globals.css";
import NavMenuMobile from "@/components/NavMenuMobile";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { useState, useEffect } from "react";

function Layout({children}: propTypes) {
  const [screenWidth, setScreenWidth] = useState(0);
  useEffect(() => {
    setScreenWidth(window.innerWidth);

    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (screenWidth > 768){
    return (
      <div className = "flex">
          <NavMenu/>
          <div>
            {children}
          </div>
      </div>
    );
  }
  return (
    <SidebarProvider>
      <NavMenuMobile />
      <div>
        {children}
      </div>
    </SidebarProvider>


  );
}

type propTypes = {
  children: React.ReactNode
};

export default Layout
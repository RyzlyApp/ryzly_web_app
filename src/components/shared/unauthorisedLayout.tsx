"use client"
import { ExploreNavbar } from "../explore";

export default function UnauthorisedLayout({ children }: { children: React.ReactNode }) {
    
    return ( 
        <div className=" w-full flex flex-col gap-6 p-6 h-screen overflow-y-auto bg-[#EBE6E8] " >
            <div className=" w-full h-fit " >
                <ExploreNavbar />
            </div>
            {children}
        </div>
    )
}
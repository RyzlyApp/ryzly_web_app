"use client"
import { ExploreNavbar } from "../explore";

export default function UnauthorisedLayout({ children, main }: { children: React.ReactNode, main?: boolean }) {
    
    return ( 
        <div className={` w-full flex flex-col ${main ? "  " : " px-6 gap-6 "} `} >
            <div className={` ${main ? " fixed " : " sticky mb-4 "}  top-4 z-40 w-full h-fit `} >
                <ExploreNavbar />
            </div>
            {children}
        </div>
    )
}
"use client";
import { ExploreNavbar } from "../explore";
import Footer from "../main-landing-page/Footer";

export default function UnauthorisedLayout({
    children,
    main,
    footer,
}: {
    children: React.ReactNode;
    main?: boolean;
    footer?: boolean;
}) {

    return (
        <div
            className={` w-full flex-1 min-h-[100vh] flex flex-col bg-[#EBE6E8] ${main ? "  " : " px-6 gap-6 "} `}
        >
            <div
                className={` ${main ? " fixed " : " sticky mb-4 "}  top-4 z-40 w-full h-fit `}
            >
                <ExploreNavbar />
            </div>
            {children}
            {footer && (
                <div className=" w-full mt-auto ">
                    <Footer />
                </div>
            )}
        </div>
    );
}

"use client";

import { Spinner } from "@heroui/react";
import { ReactNode } from "react";

interface LoaderProps {
    loading: boolean;
    children: ReactNode;
    lenght?: number,
    bgColor?: boolean
}

export default function LoadingLayout({ loading, children, lenght = 1, bgColor = true }: LoaderProps) {
    return (
        <>
            {/* Wrapped content */}
            {(!loading && lenght > 0) && (
                <>
                    {children}
                </>
            )}

            {(!loading && lenght === 0) && (
                <div className=" w-full flex flex-col justify-center items-center py-7 " >
                    <p className=" text-sm font-semibold " >No Records Found</p>
                </div>
            )}
 
            {/* Overlay when loading */}
            {loading && (
                <div className={` py-8 flex items-center justify-center ${bgColor ? " bg-white/70 " : "  "}  backdrop-blur-sm z-10`}>
                    <Spinner size="lg" color="primary" />
                </div>
            )}
        </>
    );
}

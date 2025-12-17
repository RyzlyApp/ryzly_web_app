"use client";
import { CgFileDocument } from "react-icons/cg";

import { Spinner } from "@heroui/react";
import { ReactNode } from "react";

interface LoaderProps {
    loading: boolean;
    children: ReactNode;
    lenght?: number,
    bgColor?: boolean,
    text?: string
}

export default function LoadingLayout({ loading, children, lenght = 1, bgColor = true, text = 'No Records Found' }: LoaderProps) {
    return (
        <>
            {/* Wrapped content */}
            {(!loading && lenght > 0) && (
                <>
                    {children}
                </>
            )}

            {(!loading && lenght === 0) && (
                <div className=" w-full flex flex-col justify-center items-center gap-3 py-7 " >
                    <CgFileDocument size={"30px"} />
                    <p className=" text-xs font-semibold max-w-[80%] text-center " >{text}</p>
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

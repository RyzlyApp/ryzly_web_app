"use client"; 
import { useState } from "react";

export default function HowToUse() {

    const [currentTab, setCurrentTab] = useState<string>("talents");
    const handleTabChange = (tab: string) => {
        setCurrentTab(tab);
    }
    return (
        <div className=" bg-gray-50 pt-26 lg:pt-32 pb-20 px-[5%] lg:px-[10%]">
            <div className="2xl:container mx-auto flex lg:flex-row flex-col gap-6 ">
                <div className=" w-fit "  >
                    <div className=" w-[200px] flex flex-col bg-white rounded-xl shadow-sm p-6 " >
                        <p className=" text-2xl font-bold text-gray-900 " >How to Use</p>
                        <button onClick={() => handleTabChange("talents")} disabled={currentTab === "talents"} className={` w-full h-[34px] ${currentTab === "talents" ? "bg-neonblue-50 text-gray-900" : " text-gray-500"} rounded-lg text-sm text-left px-4 `} >For talents</button>
                        <button onClick={() => handleTabChange("coaches")} disabled={currentTab === "coaches"} className={` w-full h-[34px] ${currentTab === "coaches" ? "bg-neonblue-50 text-gray-900" : " text-gray-500"} rounded-lg text-sm text-left px-4 `} >For coaches</button>
                    </div>
                </div>
                <div className=" w-full h-[80vh] flex flex-col bg-white rounded-xl shadow-sm lg:max-w-[80%] max-w-full " >
                    {currentTab === "talents" ? (
                        <iframe 
                            src="https://docs.google.com/document/d/e/2PACX-1vS96LZNuq274Sdd15dAUh6KkgefpVtN9edsjV0j8Zpy6rRHf-7v84ogpYqcKiy2st3BTWXJD-uhoHT3/pub?embedded=true"
                            className="w-full h-full py-4"
                            allow="autoplay"
                        ></iframe>
                    ) : currentTab === "coaches" ? (
                        <iframe
                            src="https://docs.google.com/document/d/e/2PACX-1vRs6yMa4Je47hAmcpLi6jEPmsfuS7K4nWdp_oHK6UnTp_oGxuDDft-ALhQGxs4XtIDlgc1mkn5ZOJ29/pub?embedded=true"
                            className="w-full h-full py-4"
                            allow="autoplay"
                        ></iframe>
                    ) : null}
                </div>
            </div>
        </div>
    )
}
"use client"
import { RiDownload2Line } from "react-icons/ri";
import { CustomButton } from "../custom";
import { CertificateCard, ModalLayout } from "../shared";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { capitalizeFLetter } from "@/helper/utils/capitalLetter";

export default function Certificates() {

    const [isOpen, setIsOpen] = useState(false)

    const contentRef = useRef<HTMLDivElement>(null);
    const reactToPrintFn = useReactToPrint({
        contentRef,
        documentTitle: capitalizeFLetter("Certificate "),
        pageStyle: `
          @page {
    /* Custom size in points (1 inch = 72pt), millimeters (mm), or centimeters (cm) */
    size: 16in 10in; /* wider and taller than Legal landscape */
    margin: 0;
          }   
        `,
    });

    const Card = ({ get }: { get: boolean }) => {
        return (
            <div className=" w-full flex justify-between items-center border border-violet-50 px-3 rounded-2xl h-[94px] gap-4 " >
                <div className=" w-full flex items-center gap-4 " >
                    <div className=" w-[56px] h-[62px] rounded bg-gray-100 " ></div>
                    <div className=" flex flex-col gap-1 " >
                        <p className=" font-bold " >Designing for Dark Mode</p>
                        <p className=" text-xs font-medium text-violet-300 " >25 Aug 2025</p>
                    </div>
                </div>
                {!get && (
                    <div className=" flex items-center gap-4 " >
                        <RiDownload2Line size={"20px"} className=" text-violet-500 " />
                        <CustomButton onClick={() => setIsOpen(true)} >Share</CustomButton>
                    </div>
                )}
                {get && (
                    <div className=" flex items-center gap-4 " >
                        <CustomButton variant="auth" onClick={() => setIsOpen(true)} >Get</CustomButton>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className=" w-full rounded-2xl bg-white flex gap-4 p-4 " >
            <div className=" w-full grid grid-cols-2 gap-4 " >
                <Card get={true} />
                <Card get={true} />
                <Card get={true} />
                <Card get={true} />
                <Card get={true} />
                <Card get={true} />
            </div> 
            <ModalLayout isOpen={isOpen} size="5xl" onClose={() => setIsOpen(false)}  >
                <div className=" w-full flex flex-col relative overflow-hidden " >
                    <div className=" w-full sticky top-0 bg-white z-10 pb-4 "  >
                        <p className=" text-3xl font-bold " >Mastering Mobile App Wireframes</p>
                        <p className=" text-xs text-violet-300 " >25 Aug 2025</p>
                    </div>
                    <div ref={contentRef} className=" w-full relative h-full overflow-y-auto " >
                        <CertificateCard />
                    </div>
                    <div className=" w-full flex justify-end gap-3 py-4 " >
                        <button className=" px-5 " onClick={() => reactToPrintFn()} >
                            <RiDownload2Line size={"20px"} />
                        </button>
                        <CustomButton >Share</CustomButton>
                    </div>
                </div>
            </ModalLayout>
        </div>
    )
}
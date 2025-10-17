"use client" 
import { CustomImage } from "../custom";

export default function CertificateCard() {

    return (
        <div className=" w-full p-4 " >
            <div className=" w-full max-w-[1060px] flex flex-col bg-white h-full pt-8" >
                <div className=" w-full flex px-12 relative z-10 -mb-12 " >
                    <div className=" w-full flex items-center flex-col " >
                        <div className=" w-[100%] flex flex-col " >
                            <CustomImage alt="logo" src={"/images/cert.png"} width={199} height={48} />
                            <div className=" w-full flex flex-col gap-1 items-center mt-10 " >
                                <p className=" font-extrabold text-[70px] " >CERTIFICATE</p>
                                <div className=" bg-[#FFBC0A] rounded-4xl py-3 flex justify-center items-center w-full text-3xl " >
                                    of Achievement
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" w-full flex items-center flex-col " >
                        <CustomImage alt="logo" src={"/images/ribbon.png"} className=" relative z-10 " width={130} height={48} />
                        <div style={{ backgroundColor: "#1D1348" }} className=" w-[80%] rounded-t-[80px] text-white gap-2 -mt-[116px] pt-40 pb-12 flex flex-col items-center " >
                            <p className=" text-xl " >Proudly presented to</p>
                            <p className=" text-5xl max-w-[80%] font-semibold text-center " >Dorathy Guilermo</p>
                            <p className=" max-w-[80%] text-center " >for solving the <span className=" font-bold " >Design for FinTech</span> challenge. </p>
                        </div>
                    </div>
                </div>
                <div style={{ backgroundColor: "#C9E366" }} className=" w-full rounded-t-[60px] text-white pt-8 " >
                    <div style={{ backgroundColor: "#1D1348" }} className=" w-full rounded-t-[60px] py-10 flex justify-between items-center px-12  " >
                        <div className=" flex flex-col gap-10 " >
                            <div className=" flex flex-col w-[200px] items-center gap-4 " >
                                <CustomImage alt="logo" src={"/images/signed.png"} className=" relative z-10 " width={160} height={48} />
                                <div className=" border-t w-full flex flex-col items-center  " >
                                    <p className=" text-lg font-bold " >Gloria Ojukwu</p>
                                    <p className=" font-medium text-sm " >Founder, Ryzly</p>
                                </div>
                            </div>
                            <div className=" flex flex-col w-[200px] items-center gap-1 " >
                                <p >COACH</p>
                                <div className=" border-t w-full flex flex-col items-center  " >
                                    <p className=" text-lg font-bold " >Victoria Okonkwo</p>
                                </div>
                            </div>
                        </div>

                        <div className=" w-[120px] mt-auto flex gap-1 flex-col " >
                            <div className=" w-full h-[120px] bg-amber-500 " >

                            </div>
                            <div className=" w-full h-[45px] text-sm bg-black flex justify-center items-center  " >
                                Verify Here
                            </div>
                        </div>

                        <div className=" flex flex-col w-[200px] mt-auto items-center gap-1 " >
                            <p >DATE OF ISSUE</p>
                            <div className=" border-t w-full flex flex-col items-center  " >
                                <p className=" text-lg font-bold " >2/23/2025</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
"use client"
import { ICertificate } from "@/helper/model/challenge";
import { CustomImage } from "../custom";
import { dateFormatDashboad } from "@/helper/utils/dateFormat"; 
import { QRCodeCanvas } from "qrcode.react"; 
import { capitalizeFLetter } from "@/helper/utils/capitalLetter";
import { textLimit } from "@/helper/utils/textlimit";
import { userAtom } from "@/helper/atom/user";
import { useAtom } from "jotai";

export default function CertificateCard(
    { item }: { item: ICertificate }
) {

    const [ userState ] = useAtom(userAtom);    
    const user = userState?.data;

    return (
        <div className=" w-full h-fit flex justify-center p-4 " >
            <div className=" w-[1060px] flex flex-col bg-white border-2 border-[#1D1348] rounded-2xl h-full pt-8" >
                <div className=" w-full flex px-12 relative z-10 -mb-12 " >
                    <div className=" w-full flex items-center flex-col " >
                        <div className=" w-[100%] flex flex-col " >
                            <CustomImage alt="logo" src={"/images/cert.png"} width={199} height={48} />
                            <div className=" w-full h-[400px] flex flex-col gap-1 items-center mt-10 " >
                                <p className=" font-extrabold text-[70px] h-fit " >CERTIFICATE</p>
                                <div className=" bg-[#FFBC0A] justify-center h-fit rounded-4xl py-3 flex font-medium w-full text-2xl " >
                                    <p className=" text-center " >of Achievement</p>
                                </div>
                                <div className=" pt-4 w-full h-fit flex flex-col justify-center  " >
                                    <p className=" font-bold text-sm " >Career Track: <span className=" font-medium text-xs " >{item?.tracks[0]}</span></p>

                                    <p className=" font-bold text-sm " >Level: <span className=" font-medium text-xs " >{item?.level}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" w-full flex items-center flex-col " >
                        <CustomImage alt="logo" src={"/images/ribbon.png"} className=" relative z-10 " width={130} height={48} />
                        <div style={{ backgroundColor: "#1D1348" }} className=" w-[80%] h-[450px] rounded-t-[80px] text-white gap-2 -mt-[116px] pt-40 pb-12 flex flex-col items-center " >
                            <p className=" text-xl " >Proudly presented to</p>
                            <p className=" text-3xl max-w-[80%] font-semibold text-center capitalize " >{capitalizeFLetter(user?.fullName+"")}</p>
                            <p className=" max-w-[80%] text-center " >for solving the <span className=" font-bold capitalize " >{item?.challengeName}</span> challenge. </p>
                        </div>
                    </div>
                </div>
                <div style={{ backgroundColor: "#C9E366" }} className=" w-full rounded-t-[60px] rounded-b-2xl text-white pt-8 " >
                    <div style={{ backgroundColor: "#1D1348" }} className=" w-full rounded-t-[60px] rounded-b-2xl py-10 flex justify-between items-center px-12  " >
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
                                    <p className=" text-lg font-bold " >{item?.creator}</p>
                                </div>
                            </div>
                        </div>

                        <div className=" w-[120px] mt-auto flex gap-1 flex-col " >
                            <div className=" w-full h-[120px]" >
                                <QRCodeCanvas
                                    value={item?._id}
                                    size={120} // pixel size
                                    bgColor="#ffffff"
                                    fgColor="#000000"
                                    level="H" // error correction level: L, M, Q, H
                                    includeMargin={true}
                                />
                                {/* <p className="mt-4">Scan to visit our site</p> */}
                            </div>
                            <div className=" w-full h-[45px] text-sm bg-black flex justify-center items-center  " >
                                Verify Here
                            </div>
                        </div>

                        <div className=" flex flex-col w-[200px] mt-auto items-center gap-1 " >
                            <p >DATE OF ISSUE</p>
                            <div className=" border-t w-full flex flex-col items-center  " >
                                <p className=" text-lg font-bold " >{dateFormatDashboad(item?.createdAt)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
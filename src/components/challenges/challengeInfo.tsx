import { IChallenge } from "@/helper/model/challenge";
import { formatNumber } from "@/helper/utils/numberFormat";
import { CustomButton, CustomImage } from "../custom"; 
import { ModalLayout } from "../shared"; 
import { formatNumberWithK } from "@/helper/utils/formatNumberWithK";
import useChallenge from "@/hook/useChallenge";
import { Switch } from "@heroui/react"; 

export default function ChallengeInfo(
    { item, isCoach }: { item: IChallenge, isCoach: boolean }
) { 

    const { joinChallenge, isOpen, setIsOpen } = useChallenge(item?._id)

    return (
        <div className=" w-full rounded-3xl flex flex-col bg-white " >
            <div className=" w-full h-[244px] rounded-t-3xl bg-white p-2 " >
                {item.url?.includes("http") && (
                    <CustomImage
                        src={item?.url}
                        alt="blue"
                        fillContainer
                        style={{ borderRadius: "8px" }}
                    />
                )}
            </div>
            <div className=" w-full flex lg:flex-row flex-col gap-4 pb-4 items-center " >
                <div className=" w-full flex p-4 pb-0 flex-col gap-3 " >
                    <div className="  " >

                    </div>
                    <p className=" text-3xl font-bold " >{item?.title}</p> 
                    <div className=" text-xs font-medium text-violet-300 " dangerouslySetInnerHTML={{ __html: item?.description }} />
                    {/* <p className=" text-violet-300 text-sm font-medium " >{item?.description}</p> */}
                    <p className=" text-violet-300 text-xs font-medium " >Participation Fee: <span className=" font-bold " >{formatNumber(item?.participationFee)}</span></p>
                </div>
                {(!item?.joined && !isCoach) && (
                    <div className=" w-full lg:w-fit px-4 " >
                        <CustomButton onClick={() => setIsOpen(true)} isLoading={joinChallenge?.isPending} fullWidth >
                            Join Challenge
                        </CustomButton>
                    </div>
                )}

                <ModalLayout isOpen={isOpen} onClose={() => setIsOpen(false)} >
                    <div className=" w-full flex flex-col items-center gap-4 " >
                        <p className=" text-5xl font-bold text-center " >{formatNumberWithK(item?.participationFee)}</p>
                        <p className=" font-medium  " >Participation Fee</p>
                        <div className=" w-full p-4 bg-warning-50 rounded-2xl border-1 border-warning-400 " >
                            <p className=" text-warning-900 font-medium text-xs " >{`The participation fee is a one-time payment set by the challenge host, required before you can join the challenge. Please note that this fee is non-refundable once payment is completed. Be sure you're ready to take on the challenge before proceeding.`}</p>
                        </div>
                        <p className=" text-lg font-semibold " >Payment method</p>
                        <div className=" w-full flex bg-neonblue-50 justify-between rounded-2xl p-4 " >
                            <div className=" flex flex-col text-sm " >
                                <p className=" font-semibold " >Prize won</p>
                                <p className=" font-medium text-violet-300 " >$0.00</p>
                            </div>
                            <Switch />
                        </div>
                        <div className=" w-full flex justify-end " >
                            <CustomButton onClick={() => joinChallenge?.mutate({ data: item?._id })} isLoading={joinChallenge?.isPending} >
                                Pay
                            </CustomButton>
                        </div>
                    </div>
                </ModalLayout>
            </div>
        </div>
    )
}
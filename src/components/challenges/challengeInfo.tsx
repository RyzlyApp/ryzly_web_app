import { IChallenge } from "@/helper/model/challenge";
import { formatNumber } from "@/helper/utils/numberFormat";
import { CustomButton, CustomImage } from "../custom";
import { LoadingLayout, ModalLayout } from "../shared";
import { formatNumberWithK } from "@/helper/utils/formatNumberWithK";
import useChallenge from "@/hook/useChallenge";
import { Switch } from "@heroui/react";

export default function ChallengeInfo(
    { item, isCoach, refetching }: { item: IChallenge, isCoach: boolean, refetching: boolean }
) {

    const { joinChallenge, isOpen, setIsOpen } = useChallenge(item?._id)

    console.log(item);


    return (
        <div className=" w-full rounded-3xl flex flex-col bg-white " >
            <LoadingLayout loading={refetching} >
                <div className=" w-full h-[244px] rounded-t-3xl bg-white p-2 " >
                    {item?.url?.includes("http") && (
                        <CustomImage
                            src={item?.url}
                            alt="blue"
                            fillContainer
                            style={{ borderRadius: "8px" }}
                        />
                    )}
                </div>
            </LoadingLayout>
            <div className=" w-full flex lg:flex-row flex-col gap-4 pb-4 items-center " >
                <div className=" w-full flex p-4 pb-0 flex-col gap-3 " >
                    <div className=" flex flex-col gap-2 " >
                        <div className=" w-full flex flex-wrap gap-3 " >
                            <div className=" w-fit px-2 text-xs font-medium text-coral-900 rounded-3xl flex justify-center items-center h-[22px] bg-coral-100 " >
                                {item?.industry?.name}
                            </div>
                            <div className=" w-fit px-2 text-xs font-medium text-neonblue-900 rounded-3xl flex justify-center items-center h-[22px] bg-neonblue-100 " >
                                {item?.level?.name}
                            </div>
                            <div className=" w-fit px-2 text-xs font-medium text-pear-900 rounded-3xl flex justify-center items-center h-[22px] bg-pear-100 " >
                                {item?.tracks[0]?.name}
                            </div>
                        </div>
                        <div className=" flex flex-wrap gap-2 " >
                            {item?.tags?.map((item) => {
                                return (
                                    <div key={item} className=" w-fit px-2 text-xs font-medium bg-violet-500 rounded-3xl flex justify-center items-center h-[22px] text-violet-100 " >
                                        {item}
                                    </div>
                                )
                            })}
                        </div>
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

                {(new Date() === new Date(item?.endDate) && isCoach) && (
                    <div className=" w-full lg:w-fit px-4 " >
                        <CustomButton onClick={() => setIsOpen(true)} isLoading={joinChallenge?.isPending} fullWidth >
                            End Challenge
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
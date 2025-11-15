"use client"
import { ModalLayout } from "../../shared";
import { CustomButton, CustomInput } from "../../custom";
import useChallenge from "@/hook/useChallenge";
import React, { useState } from "react";
import { RadioGroup, Radio, cn } from "@heroui/react";


export default function ReportChallengeModal(
    { isOpen, onClose }: { isOpen: boolean, onClose: (by: boolean) => void }
) {

    const { reportChallengeMutate } = useChallenge()
    const [reasons, setReasons] = useState("")
    const [others, setOther] = useState("")

    const clickHandler = () => {
        reportChallengeMutate.mutate({
            reasons: [reasons],
            others: others
        }, {
            onSuccess: () => onClose(false),
        });
    };

    const list = [
        "Plagiarized or copied material",
        "Unclear or misleading brief",
        "Broken links or missing assets",
        "Spam or promotional-only content",
        "Others"
    ] 

    return (
        <>
            <ModalLayout size="sm" title="Report challenge" isOpen={isOpen} onClose={() => onClose(false)} >
                <div className=" flex flex-col gap-4 w-full " >
                    <div className=" w-full flex flex-col gap-4 items-center " >
                        <p className=" font-semibold max-w-[200px] text-sm text-center " >Why are you reporting this challenge?</p>
                        <div className=" w-full flex text-sm flex-col gap-2 " >
                            <RadioGroup label="Select your favorite city" value={reasons} onValueChange={setReasons}>
                                {list?.map((item) => {
                                    return (
                                        <Radio value={item} key={item} >
                                            <p className=" text-xs " >{item}</p>
                                        </Radio>
                                    )
                                })}
                            </RadioGroup>
                        </div>
                    </div>
                    {reasons === "Others" && (
                        <CustomInput textarea name={"other"} notform setLocalValue={setOther} localValue={others} />
                    )}
                    <div className=" flex w-full flex-col gap-2 py-3 " >
                        <CustomButton onClick={clickHandler} isDisabled={!reasons ? true : (reasons === "Others" && !others) ? true : false } isLoading={reportChallengeMutate?.isPending} >Submit</CustomButton> 
                    </div>
                </div>
            </ModalLayout>
        </>
    )
}
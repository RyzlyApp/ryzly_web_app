"use client"
import { RiAddLine, RiCheckboxFill } from "react-icons/ri";
import { CustomButton } from "../custom";
import { userAtom } from "@/helper/atom/user";
import { useAtom } from "jotai";
import CustomModal from "../shared/modalLayout";
import useChallenge from "@/hook/useChallenge";
import { ApplicationForm, ChallengeForm } from "../forms"; 

export default function CreateChallengeBtn() {

    const [userState] = useAtom(userAtom);
    const { data: user } = userState;

    const { isOpen, setIsOpen, formik, formikChallenge, tab, setTab, applyForCoach, createChallenge, uploadImage } = useChallenge()

    return (
        <>
            <div className=" lg:block hidden " >
                <CustomButton onClick={() => setIsOpen(true)} height="36px" >Create Challenge</CustomButton>
            </div>
            <button onClick={() => setIsOpen(true)} className=" lg:hidden flex cursor-pointer " >
                <RiAddLine size={"17px"} />
            </button>

            <CustomModal size={user?.isCoach ? "2xl" : "lg"} title={user?.isCoach ? "Create Challenge" : tab === 1 ? "Become a coach" : ""} isOpen={isOpen} onClose={() => { setIsOpen(false), setTab(0) }} >
                {!user?.isCoach && (
                    <>
                        {tab === 0 && (
                            <div className=" w-full flex flex-col gap-3 " >
                                <div className=" w-full h-[196px] rounded-lg bg-pear-200 " >

                                </div>
                                <p className=" text-2xl font-bold text-center " >Unlock Coach Mode</p>
                                <p className=" text-xs text-center " >{`You're about to access features reserved for coaches. As a coach, you can create challenges, build communities, and guide learners with your expertise. Step up, inspire others, and grow your own impact.`}</p>
                                <div className=" flex flex-col gap-2 " >
                                    <div className=" flex items-center gap-1 " >
                                        <RiCheckboxFill className=" text-neonblue-500 " size={"16px"} />
                                        <p className=" text-sm font-medium " >Create and host your own challenges</p>
                                    </div>
                                    <div className=" flex items-center gap-1 " >
                                        <RiCheckboxFill className=" text-neonblue-500 " size={"16px"} />
                                        <p className=" text-sm font-medium " >Build communities and lead discussions</p>
                                    </div>
                                    <div className=" flex items-center gap-1 " >
                                        <RiCheckboxFill className=" text-neonblue-500 " size={"16px"} />
                                        <p className=" text-sm font-medium " >Share resources, feedback, and insights</p>
                                    </div>
                                    <div className=" flex items-center gap-1 " >
                                        <RiCheckboxFill className=" text-neonblue-500 " size={"16px"} />
                                        <p className=" text-sm font-medium " >Gain recognition for your mentorship</p>
                                    </div>
                                    <div className=" flex items-center gap-1 " >
                                        <RiCheckboxFill className=" text-neonblue-500 " size={"16px"} />
                                        <p className=" text-sm font-medium " >Inspire and support learners worldwide</p>
                                    </div>
                                </div>
                                <CustomButton onClick={() => setTab(1)} >Become a Coach</CustomButton>
                            </div>
                        )}
                        {tab === 1 && (
                            <ApplicationForm isLoading={applyForCoach.isPending} formik={formik} />
                        )}
                    </>
                )}
                {user?.isCoach && (
                    <ChallengeForm isLoading={createChallenge.isPending || uploadImage?.isPending} formik={formikChallenge} />
                )}
            </CustomModal>
        </>
    )
}
"use client"
import useChallenge from "@/hook/useChallenge"
import { CustomButton } from "../custom"
import { ModalLayout } from "."
import CoachDetails from "./coachDetails"
import { ApplicationForm } from "../forms"
import { userAtom } from "@/helper/atom/user"
import { useAtom } from "jotai"
import { useRouter } from "next/navigation"
import { FaArrowRight } from "react-icons/fa6"


export default function CoachBtn(
    {
        type
    }: {
        type?: "first" | "second"
    }
) {

    const { applyForCoach, formik: formikApplication, isOpen: show, setIsOpen: setShow, tab, setTab } = useChallenge()
    const [userState] = useAtom(userAtom);

    const { data, isLoading } = userState
    const router = useRouter()

    const clickHandler = () => {
        if (data?._id) {
            setShow(true)
        } else {
            router.push("/auth")
        }
    }

    const clickHandlerMobile = () => {
        if (data?._id) {
            router.push("/dashboard/challenges/create")
        } else {
            router.push("/auth")
        }
    }

    return (
        <>
            {!isLoading && (
                <div className={` ${(data?.isCoach) ? " hidden " : "  "} `} >
                    {!type && (
                        <>
                            <div className=" lg:flex hidden " >
                                <CustomButton onClick={() => clickHandler()} variant="outline" >Become A Coach</CustomButton>
                            </div>
                            <div className=" lg:hidden " >
                                <CustomButton onClick={() => clickHandlerMobile()} variant="outline" >Become A Coach</CustomButton>
                            </div>
                        </>
                    )}

                    {type && (
                        <>
                            <button onClick={() => clickHandler()} className="text-xs lg:flex hidden gap-1 items-center bg-[#99A3FF] rounded-full py-3 px-4 border border-white/20 mt-8">
                                Get Started <FaArrowRight />
                            </button>
                            <button onClick={() => clickHandlerMobile()} className="text-xs lg:hidden flex gap-1 items-center bg-[#99A3FF] rounded-full py-3 px-4 border border-white/20 mt-8">
                                Get Started <FaArrowRight />
                            </button>
                        </>
                    )}
                    <ModalLayout title="Become A Coach" isOpen={show} onClose={() => setShow(false)} >
                        <div className="w-full flex flex-col gap-4 items-center">
                            {tab === 0 && (
                                <CoachDetails setTab={setTab} />
                            )}
                            {tab === 1 && (
                                <ApplicationForm isLoading={applyForCoach.isPending} formik={formikApplication} />
                            )}
                        </div>
                    </ModalLayout>
                </div>
            )}
        </>
    )
}
"use client"
import useChallenge from "@/hook/useChallenge"
import { CustomButton } from "../custom"
import { ModalLayout } from "."
import CoachDetails from "./coachDetails"
import { ApplicationForm } from "../forms"
import { userAtom } from "@/helper/atom/user"
import { useAtom } from "jotai"
import { useRouter } from "next/navigation"


export default function CoachBtn() {

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
                    <div className=" lg:flex hidden " >
                        <CustomButton onClick={() => clickHandler()} variant="outline" >Become A Coach</CustomButton>
                    </div>
                    <div className=" lg:hidden " >
                        <CustomButton onClick={() => clickHandlerMobile()} variant="outline" >Become A Coach</CustomButton>
                    </div>
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
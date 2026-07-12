"use client"
import { RiAddLine } from "react-icons/ri";
import { CustomButton } from "../custom";
import { userAtom } from "@/helper/atom/user";
import { useAtom } from "jotai";
import CustomModal from "../shared/modalLayout";
import useChallenge from "@/hook/useChallenge";
import { ApplicationForm, ChallengeForm } from "../forms";
import { LoadingLayout } from "../shared";
import { useParams, useRouter } from "next/navigation";
import { useFetchData } from "@/hook/useFetchData";
import { IApplicationData } from "@/helper/model/application";
import { useEffect } from "react";
import CoachDetails from "../shared/coachDetails";

export default function CreateChallengeBtn() {

    const [userState] = useAtom(userAtom);
    const { data: user, isLoading } = userState;
    const param = useParams();
    const organisationId = param.organisationId;

    const { data = [], isLoading: loading } = useFetchData<IApplicationData[]>({ name: "application" + user?._id, endpoint: `/application/user/${user?._id}`, enable: user?._id ? true : false });
 
    const router = useRouter()

    const { isOpen, setIsOpen, formik, formikChallenge, tab, setTab, applyForCoach, createChallenge, uploadImage, image, setImage } = useChallenge()

    const clickHanlder = () => {
        setIsOpen(false)
        setTab(0)
    }

    useEffect(() => {
        if (data?.length > 0 && !formik?.values?.expertise && !loading) {
            formik.setValues(
                {
                    focusArea: data[0]?.focusArea,
                    expertise: data[0]?.expertise,
                    yearsOfExperience: data[0]?.yearsOfExperience,
                    linkedInUrl: data[0]?.linkedInUrl,
                    portfolioUrl: data[0]?.portfolioUrl,
                }
            )
            setTab(1)
        }
    }, [data])

    const clickHandler = () => {
        // if(!user?.isCoach && user?.userType !== "organization") {
        //     setIsOpen(true)
        // } else {
            router.push(`/dashboard/challenges/create${user?.userType === "organization" ? "?user=organization" : ""}`)
        // }
    }

    return (
        <>
            <div className=" lg:block hidden " >
                <CustomButton onClick={clickHandler} height="36px" >Create Challenge</CustomButton>
            </div>
            <button onClick={() => router.push(organisationId ? `/organisation/${organisationId}/challenges/create` : `/dashboard/challenges/create${user?.userType === "organization" ? "?user=organization" : ""}`)} className=" lg:hidden flex cursor-pointer " >
                <RiAddLine size={"17px"} />
            </button>
            <CustomModal size={user?.isCoach ? "2xl" : "lg"} title={user?.isCoach ? "Create Challenge" : tab === 1 ? "Become a coach" : ""} isOpen={isOpen} onClose={clickHanlder} >
                <LoadingLayout loading={isLoading || loading} >
                    {(!user?.isCoach && user?.userType !== "organization") && (
                        <>
                            {tab === 0 && (
                                <CoachDetails setTab={setTab} />
                            )}
                            {tab === 1 && (
                                <ApplicationForm isLoading={applyForCoach.isPending} formik={formik} />
                            )}
                        </>
                    )}
                    {/* {(user?.isCoach || user?.userType === "organization") && (
                        <ChallengeForm image={image} setImage={setImage} isLoading={createChallenge.isPending || uploadImage?.isPending} formik={formikChallenge} />
                    )} */}
                </LoadingLayout>
            </CustomModal>
        </>
    )
}
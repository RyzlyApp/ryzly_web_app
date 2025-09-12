import { CustomButton, CustomInput } from "../custom"
import useAuth from "@/hook/useAuth"
import { FormikProvider } from "formik"
import { useRouter } from "next/navigation"

export default function FullNameForm() {

    const { formik } = useAuth()
    const router = useRouter()

    return (
        <FormikProvider value={formik}>
            <div className=" w-full flex flex-col items-center justify-center gap-10 " >
                <div className=" w-full flex flex-col gap-3 items-center " >
                    <div className=" w-10 h-10 " >
                        <img className=" w-full h-full " src={"/images/blue.png"} alt="blue" />
                    </div>
                    <p className=" text-violet-300 " >Hey Ryzer!</p>
                    <p className=" text-4xl font-bold " >{`Let's get to know you.`}</p>
                </div>
                <div className=" w-full max-w-[500px] flex gap-4 " >
                    <CustomInput placeholder="Enter your full name" label="What your name?" name={"email"} />
                </div>
                <div className=" w-full flex justify-between items-center " >
                    <CustomButton variant="flat" onClick={() => router.push("/auth/onboarding?type=project")} >
                        {`Skip`}
                    </CustomButton>
                    <CustomButton onClick={() => router.push("/auth/onboarding?type=project")} >
                        {`Continue`}
                    </CustomButton>
                </div>
            </div>
        </FormikProvider>
    )
}
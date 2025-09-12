"use client"
import { usePathname, useRouter } from "next/navigation";
import { CustomButton } from "../custom";

export default function AuthNavbar() {

    const pathname = usePathname()
    const router = useRouter()

    return (
        <div className=" w-full max-w-[1280px] px-4 h-[96px] bg-white rounded-3xl shadow flex justify-between items-center " >
            <img src={"/images/logo.png"} className=" w-[140px] " alt="logo" />
            {pathname === "/auth" && (
                <div className=" flex gap-2 items-center " >
                   {` Don't have an account?`}
                    <CustomButton onClick={()=> router.push("/auth/onboarding")} variant="auth" rounded="full" >
                        Sign up
                    </CustomButton>
                </div>
            )}
            {pathname !== "/auth" && (
                <div className=" flex gap-2 items-center " >
                    Already have an account?
                    <CustomButton onClick={()=> router.push("/auth/onboarding")} variant="auth" rounded="full" >
                        Login
                    </CustomButton>
                </div>
            )}
        </div>
    )
}
"use client"
import { usePathname, useRouter } from "next/navigation"
import { CustomButton, CustomImage } from "../custom" // 👈 use your CustomImage wrapper

export default function AuthNavbar() {
    const pathname = usePathname()
    const router = useRouter()

    const isAuthPage = pathname === "/auth"

    return (
        <div className="w-full max-w-[1280px] px-4 h-[96px] bg-white rounded-3xl shadow flex justify-between items-center">
            <CustomImage
                src="/images/logo.png"
                alt="logo"
                width={140}
                height={40}
                className="w-[140px] h-auto"
            />

            {isAuthPage ? (
                <div className="flex gap-2 items-center text-sm">
                    <span>Don&apos;t have an account?</span>
                    <CustomButton
                        onClick={() => router.push("/auth/onboarding")}
                        variant="auth"
                        rounded="full"
                    >
                        Sign up
                    </CustomButton>
                </div>
            ) : (
                <div className="flex gap-2 items-center text-sm">
                    <span>Already have an account?</span>
                    <CustomButton
                        onClick={() => router.push("/auth")}
                        variant="auth"
                        rounded="full"
                    >
                        Login
                    </CustomButton>
                </div>
            )}
        </div>
    )
}

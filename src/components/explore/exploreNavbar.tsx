import { useRouter } from "next/navigation";
import { CustomButton, CustomImage } from "../custom";

export default function ExploreChallengeNavbar() {

    const router = useRouter()

    const linkdata = [
        {
            name: "Challenges",
            link: "/challenges"
        },
        {
            name: "Portfolio",
            link: "/portfolio"
        },
        {
            name: "Why Rhyzly",
            link: "/whyrhyzly"
        },
    ]

    return (
        <div className="w-full mx-auto max-w-[80%] px-4 h-[68px] lg:h-[96px] bg-white rounded-3xl shadow flex justify-between items-center">
            <CustomImage
                src="/images/logo.png"
                alt="logo"
                width={140}
                height={40}
                className="w-[140px] h-auto"
            />
            <div className=" flex items-center gap-4 " > 
                {linkdata?.map((MenuItem, index) => {
                    return (
                        <button key={index} className=" font-medium text-violet- text-sm flex " >{MenuItem?.name}</button>
                    )
                })}
            </div>
            <div className="flex gap-4 items-center text-sm">
                <button className=" font-medium text-violet-500 flex " >Login</button>
                <CustomButton
                    onClick={() => router.push("/auth/signup")}
                    variant="auth"
                    rounded="full"
                >
                    Get Started
                </CustomButton>
            </div>
        </div>
    )
}
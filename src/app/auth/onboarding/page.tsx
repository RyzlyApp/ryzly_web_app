"use client"
import { FullNameForm, Indicator, ProjectTrack, SelectPath, SignupForm } from "@/components/onboarding";
import InterestedForm from "@/components/onboarding/InterestedForm";
import { useSearchParams } from "next/navigation";


export default function Onboarding() {

    const query = useSearchParams();
    const type = query?.get('type') as string;

    return(
        <div className=" w-full max-w-[950px] gap-10 bg-white text-violet-300 rounded-3xl pt-4 p-[80px] flex flex-col " >
            <Indicator type={type} />
            {!type && (
                <SelectPath />
            )}
            {type === "fullname" && (
                <FullNameForm />
            )}
            {type === "project" && (
                <InterestedForm />
            )}
            {type === "interested" && (
                <ProjectTrack />
            )}
            {type === "signup" && (
                <SignupForm />
            )}
        </div>
    )
}
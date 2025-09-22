"use client"
import { CustomButton } from "@/components/custom";
import { ChallengeCard, Loader } from "@/components/shared";
import { IChallenge } from "@/helper/model/challenge";
import { useFetchData } from "@/hook/useFetchData";

export default function Challenges() {

    const { data, isLoading } = useFetchData<IChallenge[]>({ endpoint: "/challenge" })
 
    return (
        <div className="w-full rounded-2xl bg-white overflow-hidden flex flex-col gap-4 p-4">

            {/* Tabs */}
            <div className="relative overflow-x-auto scroll-smooth w-full ">
                <div
                    className="flex gap-4 w-fit pb-2"
                >
                    <CustomButton height="35px" fontSize="12px">
                        All
                    </CustomButton>
                    <CustomButton variant="outline" height="35px" fontSize="12px">
                        Frontend
                    </CustomButton>
                    <CustomButton variant="outline" height="35px" fontSize="12px">
                        UI/UX
                    </CustomButton>
                    <CustomButton variant="outline" height="35px" fontSize="12px">
                        Full Stack
                    </CustomButton>
                    <CustomButton variant="outline" height="35px" fontSize="12px">
                        Product Strategy & Management
                    </CustomButton>
                </div>
            </div>
            <div className=" w-full grid gap-4 grid-cols-1 lg:grid-cols-3 " >
                <Loader loading={isLoading} >
                    {data?.map((item, index) => {
                        return (
                            <ChallengeCard key={index} data={item} />
                        )
                    })}
                </Loader>
            </div>
        </div>
    )
}
import { CustomButton } from "../custom";

export default function AchievementHeader() {
    return (
        <div className=" w-full h-[300px] p-4 rounded-2xl bg-white flex flex-col gap-4 " >
            <div className=" w-full flex justify-between items-center " >
                <p className=" font-semibold " >Finance</p>
                <p className=" text-neonblue-600 text-xs " >See History</p>
            </div>
            <div className=" w-full h-full border border-gray-200 rounded-2xl flex flex-col gap-6 justify-center items-center " >
                <div className=" w-fit flex gap-8 " >
                    <div className=" flex flex-col items-center gap-1 " >
                        <p className=" text-xs font-medium text-violet-300 " >Total earnings</p>
                        <p className=" text-2xl font-semibold " >$0.00</p>
                    </div>
                    <div className=" flex flex-col items-center gap-1 " >
                        <p className=" text-xs font-medium text-violet-300 " >Total prizes won</p>
                        <p className=" text-2xl font-semibold " >$0.00</p>
                    </div>
                    <div className=" flex flex-col items-center gap-1 " >
                        <p className=" text-xs font-medium text-violet-300 " >Available balance</p>
                        <p className=" text-2xl font-semibold " >$0.00</p>
                    </div>
                </div>
                <div className=" flex gap-6 " >
                    <div className=" w-[140px] " >
                        <CustomButton fullWidth variant="outline" >Request Payout</CustomButton>
                    </div>
                    <div className=" w-[140px] " >
                        <CustomButton fullWidth >Add Money</CustomButton>
                    </div>
                </div>
            </div>
        </div>
    )
}
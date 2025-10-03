import { IUser } from "@/helper/model/user";
import { Avatar } from "@heroui/react";


export default function UserCard({ item, showCoach = true }: { item: IUser, showCoach?: boolean }) {
    return (
        <div className=" flex gap-2 items-center " >
            <Avatar src={item?.profilePicture} name={item?.fullName} />
            <div className=" flex flex-col " >
                <div className=" flex items-center gap-1 " >
                    <p className=" text-sm font-semibold " >{item?.fullName}</p>
                    {(showCoach && item?.isCoach) && (
                        <div className=" px-2 rounded-full bg-neonblue-600 text-white font-semibold h-[18px] flex justify-center items-center text-xs " >
                            Coach
                        </div>
                    )}
                </div>
                <p className=" text-violet-300 text-xs " >UI/UX Designer</p>
            </div>
        </div>
    )
}
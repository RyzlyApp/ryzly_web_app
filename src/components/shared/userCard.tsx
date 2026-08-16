"use client";
import { IOrganisationDetails, IUser } from "@/helper/model/user";
import { Avatar } from "@heroui/react";
import { useRouter } from "next/navigation";

const isUser = (data: IUser): data is IUser => {
    return "firstName" in data;
};

export default function UserCard({
    item,
    showCoach = true,
}: {
    item: IUser;
    showCoach?: boolean;
}) {
    const router = useRouter();

    const profilePicture = item?.profilePicture;
    const displayName = item?.companyName ? item?.companyName :  isUser(item)
        ? `${item.firstName ?? ""} ${item.lastName ?? ""}`.trim() || item.fullName
        : "";

    return (
        <button
            onClick={() => router.push(`/dashboard/profile/${item?._id}`)}
            className=" flex gap-2 items-center "
        >
            <Avatar src={profilePicture} name={displayName} />
            <div className=" flex flex-col items-start ">
                <div className=" flex items-center gap-1 ">
                    <p className=" text-sm capitalize font-semibold ">
                        {displayName}
                    </p>
                    {showCoach && isUser(item) && item?.isCoach && (
                        <div className=" px-2 rounded-full bg-neonblue-600 text-white font-semibold h-[18px] flex justify-center items-center text-xs ">
                            Coach
                        </div>
                    )}
                    {item?.userType.toLocaleLowerCase() === "organization" && (
                        <div className=" px-2 rounded-full bg-neonblue-600 text-white font-semibold h-[18px] flex justify-center items-center text-xs ">
                            Host
                        </div>
                    )}
                </div>
            </div>
        </button>
    );
}

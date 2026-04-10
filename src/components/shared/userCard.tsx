"use client";
import { IOrganisationDetails, IUser } from "@/helper/model/user";
import { Avatar } from "@heroui/react";
import { useRouter } from "next/navigation";

export default function UserCard({
    item,
    showCoach = true,
}: {
    item: IUser | IOrganisationDetails;
    showCoach?: boolean;
}) {
    const router = useRouter();

    // ✅ Type guards
    const isUser = (data: IUser | IOrganisationDetails): data is IUser => {
        return "firstName" in data;
    };

    const name = isUser(item)
        ? `${item.firstName} ${item.lastName}`
        : item.name; // assuming organisation has `name`

    const profilePicture = item?.profilePicture;

    const isCoach = isUser(item) ? item.isCoach : item?.name ? true : false;

    return (
        <button
            onClick={() => router.push(`/dashboard/profile/${item?._id}`)}
            className=" flex gap-2 items-center "
        >
            <Avatar src={profilePicture} name={name} />
            <div className=" flex flex-col items-start ">
                <div className=" flex items-center gap-1 ">
                    <p className=" text-sm font-semibold ">
                        {name}
                    </p>
                    {showCoach && isCoach && (
                        <div className=" px-2 rounded-full bg-neonblue-600 text-white font-semibold h-[18px] flex justify-center items-center text-xs ">
                            Coach
                        </div>
                    )}
                </div>
            </div>
        </button>
    );
}

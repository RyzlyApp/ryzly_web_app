import { userAtom } from "@/helper/atom/user";
import { bottombarlink } from "@/helper/utils/databank";
import { Avatar } from "@heroui/react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";

export default function BottomBar() {

    const [userState] = useAtom(userAtom);
    const { data: user } = userState;

    const router = useRouter()

    return (
        <div className=" h-[56px] w-full flex justify-between items-center " >
            {bottombarlink?.map((item, index) => {
                return (
                    <button onClick={()=> router.push(item?.link)} key={index} className=" w-full h-full flex flex-col justify-center items-center cursor-pointer " >
                        {item?.label !== "Profile" && (
                            <item.icon size={"24px"} />
                        )}
                        {item?.label === "Profile" && (
                            <Avatar src={user?.profilePicture} size="sm" name={user?.fullName} />
                        )}
                        <p className=" text-[10px] " >{item?.label}</p>
                    </button>
                )
            })}
        </div>
    )
}
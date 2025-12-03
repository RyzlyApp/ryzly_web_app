"use client"
import { IUser } from "@/helper/model/user";
import { Avatar, AvatarGroup } from "@heroui/react";
// import { CustomImage } from "../custom";

const RenderParticipants = ({
    participants,
    maxDisplay,
    totalParticipants
}:{
    participants: IUser[],
    maxDisplay: number,
    totalParticipants: number
}) => {
    const displayedParticipants = participants.slice(0, maxDisplay); 

    return (
        <div className="flex items-center">  
            <AvatarGroup isBordered>
                {displayedParticipants?.map((item, index) => {
                    return (
                        <Avatar size="sm" key={index} src={item?.profilePicture} name={item?.firstName} />
                        // <div className=" w-5 h-5 rounded-full bg-gray-400 " >
                        //     {item?.profilePicture?.includes() && (
                        //         <CustomImage src={item?.profilePicture} fillContainer alt={"profil"} />
                        //     )}
                        // </div>
                    )
                })}
                {totalParticipants > 4 && (
                    <Avatar size="sm" name={"+"+(totalParticipants - 4)+""} />
                )}
            </AvatarGroup>
        </div>
    );
};

export default RenderParticipants
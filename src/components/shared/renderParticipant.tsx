import { IUser } from "@/helper/model/user";
import { Avatar, AvatarGroup } from "@heroui/react";
import { CustomImage } from "../custom";

const RenderParticipants = ({
    participants,
    maxDisplay
}:{
    participants: IUser[],
    maxDisplay: number
}) => {
    const displayedParticipants = participants.slice(0, maxDisplay);
    const remainingCount = participants.length - maxDisplay;

    return (
        <div className="flex items-center">  
            <AvatarGroup isBordered>
                {displayedParticipants?.map((item, index) => {
                    return (
                        <Avatar size="sm" key={index} src={item?.profilePicture} name={item?.fullName} />
                        // <div className=" w-5 h-5 rounded-full bg-gray-400 " >
                        //     {item?.profilePicture?.includes() && (
                        //         <CustomImage src={item?.profilePicture} fillContainer alt={"profil"} />
                        //     )}
                        // </div>
                    )
                })}
                {remainingCount > 0 && (
                    <Avatar size="sm" name={"+"+remainingCount+""} />
                )}
            </AvatarGroup>
        </div>
    );
};

export default RenderParticipants
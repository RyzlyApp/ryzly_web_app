import { IUser } from "@/helper/model/user";
import { Avatar, AvatarGroup } from "@heroui/react";

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
                    )
                })}
                {remainingCount > 0 && (
                    <Avatar size="sm" name={remainingCount+""} />
                )}
            </AvatarGroup>
        </div>
    );
};

export default RenderParticipants
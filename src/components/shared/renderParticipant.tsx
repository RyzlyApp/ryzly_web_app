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
            {/* <div className="flex -space-x-2">
                {displayedParticipants.map((participant, index) => (
                    <div
                        key={participant._id}
                        className="relative w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden"
                        style={{ zIndex: displayedParticipants.length - index }}
                    >
                        <Avatar showFallback src="https://images.unsplash.com/broken" />
                    </div>
                ))}
            </div>
            {remainingCount > 0 && (
                <span className=" text-xs bg-[#596AFE] px-2 py-1 text-white rounded-full">
                    +{remainingCount}
                </span>
            )} */}

            <AvatarGroup isBordered>
                {displayedParticipants?.map((item, index) => {
                    return (
                        <Avatar key={index} src={item?.profilePicture} name={item?.fullName} />
                    )
                })}
                {remainingCount > 0 && (
                    <Avatar name={remainingCount+""} />
                )}
            </AvatarGroup>
        </div>
    );
};

export default RenderParticipants